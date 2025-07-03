#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class RevisionTracker {
  constructor() {
    this.clientProjectsPath = path.join(__dirname, '../client-projects');
  }

  createRevision(clientName, changes, options = {}) {
    try {
      const clientFolder = this.sanitizeClientName(clientName);
      const clientPath = path.join(this.clientProjectsPath, clientFolder);
      
      if (!fs.existsSync(clientPath)) {
        throw new Error(`Client '${clientFolder}' not found`);
      }

      const revisionPath = path.join(clientPath, 'revisions');
      fs.mkdirSync(revisionPath, { recursive: true });

      // Get next revision number
      const revisionNumber = this.getNextRevisionNumber(revisionPath);
      const revisionFolder = path.join(revisionPath, `revision-${revisionNumber}`);
      fs.mkdirSync(revisionFolder);

      // Create revision record
      const revisionData = {
        revisionNumber,
        type: options.type || 'client-requested',
        requestDate: new Date().toISOString(),
        changes: Array.isArray(changes) ? changes : [changes],
        status: 'requested',
        billable: revisionNumber > 1, // First revision (initial delivery) is free
        cost: revisionNumber > 1 ? 100 : 0,
        estimatedHours: options.estimatedHours || this.estimateHours(changes),
        priority: options.priority || 'normal',
        clientNotes: options.clientNotes || '',
        internalNotes: options.internalNotes || ''
      };

      fs.writeFileSync(
        path.join(revisionFolder, 'revision-info.json'),
        JSON.stringify(revisionData, null, 2)
      );

      // Update business tracking
      this.updateBusinessTracking(clientPath, revisionData);

      console.log(`✅ Revision ${revisionNumber} created for ${clientName}`);
      console.log(`📁 Location: ${revisionFolder}`);
      console.log(`💰 Cost: $${revisionData.cost} ${revisionData.billable ? '(billable)' : '(included)'}`);
      console.log(`⏱️  Estimated time: ${revisionData.estimatedHours} hours`);
      
      console.log('\n📝 Changes requested:');
      revisionData.changes.forEach((change, index) => {
        console.log(`   ${index + 1}. ${change}`);
      });

      return revisionData;

    } catch (error) {
      console.error('❌ Error creating revision:', error.message);
      process.exit(1);
    }
  }

  updateRevisionStatus(clientName, revisionNumber, status, options = {}) {
    try {
      const clientFolder = this.sanitizeClientName(clientName);
      const clientPath = path.join(this.clientProjectsPath, clientFolder);
      const revisionFolder = path.join(clientPath, 'revisions', `revision-${revisionNumber}`);
      
      if (!fs.existsSync(revisionFolder)) {
        throw new Error(`Revision ${revisionNumber} not found for client '${clientFolder}'`);
      }

      const revisionInfoPath = path.join(revisionFolder, 'revision-info.json');
      const revisionData = JSON.parse(fs.readFileSync(revisionInfoPath, 'utf8'));

      // Update status and timestamps
      revisionData.status = status;
      
      switch (status) {
        case 'in-progress':
          revisionData.startDate = new Date().toISOString();
          break;
        case 'completed':
          revisionData.completedDate = new Date().toISOString();
          if (options.deliveryPath) {
            revisionData.deliveryPath = options.deliveryPath;
          }
          break;
        case 'delivered':
          revisionData.deliveredDate = new Date().toISOString();
          break;
        case 'cancelled':
          revisionData.cancelledDate = new Date().toISOString();
          revisionData.cancellationReason = options.reason || '';
          break;
      }

      if (options.actualHours) {
        revisionData.actualHours = options.actualHours;
      }

      if (options.internalNotes) {
        revisionData.internalNotes += `\n[${new Date().toISOString()}] ${options.internalNotes}`;
      }

      fs.writeFileSync(revisionInfoPath, JSON.stringify(revisionData, null, 2));

      // Update business tracking
      this.updateBusinessTracking(clientPath, revisionData);

      console.log(`✅ Revision ${revisionNumber} status updated to: ${status}`);
      
      if (status === 'completed' && revisionData.billable) {
        console.log(`💰 Payment due: $${revisionData.cost}`);
      }

      return revisionData;

    } catch (error) {
      console.error('❌ Error updating revision status:', error.message);
      process.exit(1);
    }
  }

  listRevisions(clientName) {
    try {
      const clientFolder = this.sanitizeClientName(clientName);
      const clientPath = path.join(this.clientProjectsPath, clientFolder);
      const revisionPath = path.join(clientPath, 'revisions');
      
      if (!fs.existsSync(revisionPath)) {
        console.log(`📋 No revisions found for ${clientName}`);
        return [];
      }

      const revisions = [];
      const revisionFolders = fs.readdirSync(revisionPath)
        .filter(folder => folder.startsWith('revision-'))
        .sort((a, b) => {
          const numA = parseInt(a.split('-')[1]);
          const numB = parseInt(b.split('-')[1]);
          return numA - numB;
        });

      console.log(`\n📋 Revision History for ${clientName}\n`);

      revisionFolders.forEach(folder => {
        const revisionInfoPath = path.join(revisionPath, folder, 'revision-info.json');
        if (fs.existsSync(revisionInfoPath)) {
          const revision = JSON.parse(fs.readFileSync(revisionInfoPath, 'utf8'));
          revisions.push(revision);

          const statusIcon = this.getStatusIcon(revision.status);
          const billableFlag = revision.billable ? ` ($${revision.cost})` : ' (included)';
          
          console.log(`${statusIcon} Revision ${revision.revisionNumber}${billableFlag}`);
          console.log(`   Type: ${revision.type}`);
          console.log(`   Status: ${revision.status}`);
          console.log(`   Requested: ${new Date(revision.requestDate).toLocaleDateString()}`);
          
          if (revision.completedDate) {
            console.log(`   Completed: ${new Date(revision.completedDate).toLocaleDateString()}`);
          }
          
          console.log(`   Changes: ${revision.changes.length} items`);
          revision.changes.forEach((change, index) => {
            console.log(`     ${index + 1}. ${change}`);
          });
          
          if (revision.estimatedHours) {
            console.log(`   Time: ${revision.actualHours || revision.estimatedHours} hours`);
          }
          
          console.log('');
        }
      });

      // Summary
      const totalCost = revisions.reduce((sum, rev) => sum + (rev.billable ? rev.cost : 0), 0);
      const paidRevisions = revisions.filter(rev => rev.billable && rev.status === 'delivered').length;
      const pendingRevisions = revisions.filter(rev => rev.status === 'requested' || rev.status === 'in-progress').length;

      console.log('📊 Summary:');
      console.log(`   Total revisions: ${revisions.length}`);
      console.log(`   Pending: ${pendingRevisions}`);
      console.log(`   Total billable cost: $${totalCost}`);
      console.log(`   Paid revisions: ${paidRevisions}`);

      return revisions;

    } catch (error) {
      console.error('❌ Error listing revisions:', error.message);
      process.exit(1);
    }
  }

  getNextRevisionNumber(revisionPath) {
    if (!fs.existsSync(revisionPath)) {
      return 1;
    }

    const revisionFolders = fs.readdirSync(revisionPath)
      .filter(folder => folder.startsWith('revision-'))
      .map(folder => parseInt(folder.split('-')[1]))
      .filter(num => !isNaN(num));

    return revisionFolders.length > 0 ? Math.max(...revisionFolders) + 1 : 1;
  }

  estimateHours(changes) {
    if (!Array.isArray(changes)) {
      changes = [changes];
    }

    let totalHours = 0;
    
    changes.forEach(change => {
      const lowerChange = change.toLowerCase();
      
      // Simple estimation based on keywords
      if (lowerChange.includes('color') || lowerChange.includes('scheme')) {
        totalHours += 0.5;
      } else if (lowerChange.includes('image') || lowerChange.includes('photo')) {
        totalHours += 1;
      } else if (lowerChange.includes('menu') || lowerChange.includes('price')) {
        totalHours += 1.5;
      } else if (lowerChange.includes('layout') || lowerChange.includes('design')) {
        totalHours += 3;
      } else if (lowerChange.includes('page') || lowerChange.includes('section')) {
        totalHours += 2;
      } else {
        totalHours += 1; // Default
      }
    });

    return Math.max(0.5, Math.round(totalHours * 2) / 2); // Round to nearest 0.5
  }

  getStatusIcon(status) {
    const icons = {
      'requested': '🔵',
      'in-progress': '🟡',
      'completed': '🟢',
      'delivered': '✅',
      'cancelled': '❌'
    };
    return icons[status] || '⚪';
  }

  updateBusinessTracking(clientPath, revisionData) {
    const statusPath = path.join(clientPath, '_business/status.json');
    if (!fs.existsSync(statusPath)) return;
    
    const status = JSON.parse(fs.readFileSync(statusPath, 'utf8'));
    
    // Update revision tracking in business status
    if (!status.billing.revisions.additional) {
      status.billing.revisions.additional = [];
    }

    // Find existing revision or add new one
    const existingIndex = status.billing.revisions.additional.findIndex(
      rev => rev.revisionNumber === revisionData.revisionNumber
    );

    const revisionSummary = {
      revisionNumber: revisionData.revisionNumber,
      requestDate: revisionData.requestDate,
      status: revisionData.status,
      cost: revisionData.cost,
      billable: revisionData.billable,
      changes: revisionData.changes.length
    };

    if (existingIndex >= 0) {
      status.billing.revisions.additional[existingIndex] = revisionSummary;
    } else {
      status.billing.revisions.additional.push(revisionSummary);
    }

    // Update revision count
    if (revisionData.billable && revisionData.status === 'delivered') {
      status.billing.revisions.used = status.billing.revisions.additional.filter(
        rev => rev.billable && rev.status === 'delivered'
      ).length;
    }

    fs.writeFileSync(statusPath, JSON.stringify(status, null, 2));
  }

  sanitizeClientName(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
}

// CLI Usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🍽️  Restaurant Revision Tracker

Usage:
  node track-revision.js <command> <client-name> [options]

Commands:
  create <client-name> "<changes>"     Create new revision request
  update <client-name> <revision#>     Update revision status
  list <client-name>                   List all revisions

Examples:
  node track-revision.js create "Mario's Italian" "Change hero image, update menu prices"
  node track-revision.js update "Mario's Italian" 2 --status completed
  node track-revision.js list "Mario's Italian"

Options for create:
  --type <type>           Type: client-requested, internal, urgent
  --priority <priority>   Priority: low, normal, high
  --hours <number>        Estimated hours override
  --notes "<text>"        Internal notes

Options for update:
  --status <status>       Status: requested, in-progress, completed, delivered, cancelled
  --hours <number>        Actual hours worked
  --notes "<text>"        Additional notes
  --delivery "<path>"     Path to delivery package
`);
    process.exit(1);
  }

  const tracker = new RevisionTracker();
  const command = args[0];
  const clientName = args[1];

  if (command === 'create') {
    const changes = args[2];
    if (!changes) {
      console.error('❌ Changes description required');
      process.exit(1);
    }

    // Parse options
    const options = {};
    for (let i = 3; i < args.length; i++) {
      switch (args[i]) {
        case '--type':
          options.type = args[++i];
          break;
        case '--priority':
          options.priority = args[++i];
          break;
        case '--hours':
          options.estimatedHours = parseFloat(args[++i]);
          break;
        case '--notes':
          options.internalNotes = args[++i];
          break;
      }
    }

    tracker.createRevision(clientName, changes, options);

  } else if (command === 'update') {
    const revisionNumber = parseInt(args[2]);
    if (!revisionNumber) {
      console.error('❌ Revision number required');
      process.exit(1);
    }

    // Parse options
    const options = {};
    let status = null;

    for (let i = 3; i < args.length; i++) {
      switch (args[i]) {
        case '--status':
          status = args[++i];
          break;
        case '--hours':
          options.actualHours = parseFloat(args[++i]);
          break;
        case '--notes':
          options.internalNotes = args[++i];
          break;
        case '--delivery':
          options.deliveryPath = args[++i];
          break;
      }
    }

    if (!status) {
      console.error('❌ Status required (--status <status>)');
      process.exit(1);
    }

    tracker.updateRevisionStatus(clientName, revisionNumber, status, options);

  } else if (command === 'list') {
    tracker.listRevisions(clientName);

  } else {
    console.error(`❌ Unknown command: ${command}`);
    process.exit(1);
  }
}

module.exports = RevisionTracker;