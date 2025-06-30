#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class BusinessManager {
  constructor() {
    this.clientProjectsPath = path.join(__dirname, '../client-projects');
  }

  updateStatus(clientName, status, options = {}) {
    try {
      const clientFolder = this.sanitizeClientName(clientName);
      const clientPath = path.join(this.clientProjectsPath, clientFolder);
      
      if (!fs.existsSync(clientPath)) {
        throw new Error(`Client '${clientFolder}' not found`);
      }

      const statusPath = path.join(clientPath, '_business/status.json');
      if (!fs.existsSync(statusPath)) {
        throw new Error(`Business tracking not found for client '${clientFolder}'`);
      }

      const businessStatus = JSON.parse(fs.readFileSync(statusPath, 'utf8'));
      const oldStatus = businessStatus.status.current;

      // Update status
      businessStatus.status.current = status;

      // Update phase completion
      if (businessStatus.status.phases[status]) {
        businessStatus.status.phases[status].completed = new Date().toISOString();
      }

      // Handle billing updates
      if (options.paid !== undefined) {
        businessStatus.billing.paid = options.paid;
        if (options.paid) {
          businessStatus.billing.paidDate = new Date().toISOString();
        }
      }

      if (options.basePrice !== undefined) {
        businessStatus.billing.basePrice = options.basePrice;
      }

      // Add notes if provided
      if (options.note) {
        businessStatus.notes.push({
          date: new Date().toISOString(),
          note: options.note,
          type: options.noteType || 'general'
        });
      }

      fs.writeFileSync(statusPath, JSON.stringify(businessStatus, null, 2));

      console.log(`✅ Status updated for ${clientName}`);
      console.log(`   ${oldStatus} → ${status}`);
      
      if (options.note) {
        console.log(`   Note added: ${options.note}`);
      }

      return businessStatus;

    } catch (error) {
      console.error('❌ Error updating status:', error.message);
      process.exit(1);
    }
  }

  addNote(clientName, note, noteType = 'general') {
    try {
      const clientFolder = this.sanitizeClientName(clientName);
      const clientPath = path.join(this.clientProjectsPath, clientFolder);
      
      if (!fs.existsSync(clientPath)) {
        throw new Error(`Client '${clientFolder}' not found`);
      }

      const statusPath = path.join(clientPath, '_business/status.json');
      if (!fs.existsSync(statusPath)) {
        throw new Error(`Business tracking not found for client '${clientFolder}'`);
      }

      const businessStatus = JSON.parse(fs.readFileSync(statusPath, 'utf8'));

      businessStatus.notes.push({
        date: new Date().toISOString(),
        note: note,
        type: noteType
      });

      fs.writeFileSync(statusPath, JSON.stringify(businessStatus, null, 2));

      console.log(`✅ Note added for ${clientName}`);
      console.log(`   Type: ${noteType}`);
      console.log(`   Note: ${note}`);

      return businessStatus;

    } catch (error) {
      console.error('❌ Error adding note:', error.message);
      process.exit(1);
    }
  }

  viewStatus(clientName) {
    try {
      const clientFolder = this.sanitizeClientName(clientName);
      const clientPath = path.join(this.clientProjectsPath, clientFolder);
      
      if (!fs.existsSync(clientPath)) {
        throw new Error(`Client '${clientFolder}' not found`);
      }

      const statusPath = path.join(clientPath, '_business/status.json');
      if (!fs.existsSync(statusPath)) {
        throw new Error(`Business tracking not found for client '${clientFolder}'`);
      }

      const businessStatus = JSON.parse(fs.readFileSync(statusPath, 'utf8'));

      console.log(`\n📊 Business Status: ${clientName}\n`);

      // Client info
      console.log('👤 Client Information:');
      console.log(`   Name: ${businessStatus.client.name}`);
      console.log(`   Project: ${businessStatus.client.projectName}`);
      console.log(`   Created: ${new Date(businessStatus.client.created).toLocaleDateString()}`);

      // Current status
      console.log('\n📋 Project Status:');
      console.log(`   Current Phase: ${businessStatus.status.current}`);
      
      console.log('\n   Phase Timeline:');
      Object.entries(businessStatus.status.phases).forEach(([phase, data]) => {
        const status = data.completed ? '✅' : '⏳';
        const date = data.completed ? new Date(data.completed).toLocaleDateString() : 'Pending';
        console.log(`   ${status} ${phase}: ${date}`);
      });

      // Billing
      console.log('\n💰 Billing Information:');
      console.log(`   Base Price: $${businessStatus.billing.basePrice}`);
      console.log(`   Paid: ${businessStatus.billing.paid ? '✅ Yes' : '❌ No'}`);
      
      if (businessStatus.billing.paidDate) {
        console.log(`   Paid Date: ${new Date(businessStatus.billing.paidDate).toLocaleDateString()}`);
      }
      
      if (businessStatus.billing.deliveryDate) {
        console.log(`   Delivered: ${new Date(businessStatus.billing.deliveryDate).toLocaleDateString()}`);
      }

      // Revisions
      console.log('\n🔄 Revision Tracking:');
      console.log(`   Included: ${businessStatus.billing.revisions.included}`);
      console.log(`   Used: ${businessStatus.billing.revisions.used}`);
      
      if (businessStatus.billing.revisions.additional && businessStatus.billing.revisions.additional.length > 0) {
        console.log(`   Additional Revisions: ${businessStatus.billing.revisions.additional.length}`);
        
        const totalAdditionalCost = businessStatus.billing.revisions.additional
          .filter(rev => rev.billable)
          .reduce((sum, rev) => sum + rev.cost, 0);
        
        if (totalAdditionalCost > 0) {
          console.log(`   Additional Revenue: $${totalAdditionalCost}`);
        }
      }

      // Notes
      if (businessStatus.notes && businessStatus.notes.length > 0) {
        console.log('\n📝 Notes:');
        businessStatus.notes.slice(-5).forEach(note => { // Show last 5 notes
          const date = new Date(note.date).toLocaleDateString();
          const type = note.type !== 'general' ? ` [${note.type}]` : '';
          console.log(`   ${date}${type}: ${note.note}`);
        });
        
        if (businessStatus.notes.length > 5) {
          console.log(`   ... and ${businessStatus.notes.length - 5} more notes`);
        }
      }

      return businessStatus;

    } catch (error) {
      console.error('❌ Error viewing status:', error.message);
      process.exit(1);
    }
  }

  listClients(options = {}) {
    try {
      if (!fs.existsSync(this.clientProjectsPath)) {
        console.log('📋 No clients found');
        return [];
      }

      const clientFolders = fs.readdirSync(this.clientProjectsPath);
      const clients = [];

      console.log('\n📊 Client Overview\n');

      clientFolders.forEach(folder => {
        const statusPath = path.join(this.clientProjectsPath, folder, '_business/status.json');
        
        if (fs.existsSync(statusPath)) {
          try {
            const businessStatus = JSON.parse(fs.readFileSync(statusPath, 'utf8'));
            clients.push(businessStatus);

            // Display summary
            const statusIcon = this.getStatusIcon(businessStatus.status.current);
            const paidIcon = businessStatus.billing.paid ? '💰' : '💸';
            
            console.log(`${statusIcon} ${businessStatus.client.name}`);
            console.log(`   Status: ${businessStatus.status.current}`);
            console.log(`   ${paidIcon} $${businessStatus.billing.basePrice} ${businessStatus.billing.paid ? '(paid)' : '(unpaid)'}`);
            
            if (businessStatus.billing.revisions.additional && businessStatus.billing.revisions.additional.length > 0) {
              const additionalRevenue = businessStatus.billing.revisions.additional
                .filter(rev => rev.billable)
                .reduce((sum, rev) => sum + rev.cost, 0);
              
              if (additionalRevenue > 0) {
                console.log(`   🔄 +$${additionalRevenue} revisions`);
              }
            }
            
            console.log(`   📅 ${new Date(businessStatus.client.created).toLocaleDateString()}`);
            console.log('');

          } catch (error) {
            console.log(`⚠️  ${folder}: Error reading business data`);
          }
        }
      });

      // Summary statistics
      if (clients.length > 0) {
        const totalRevenue = clients.reduce((sum, client) => {
          const baseRevenue = client.billing.paid ? client.billing.basePrice : 0;
          const additionalRevenue = (client.billing.revisions.additional || [])
            .filter(rev => rev.billable && rev.status === 'delivered')
            .reduce((sum, rev) => sum + rev.cost, 0);
          return sum + baseRevenue + additionalRevenue;
        }, 0);

        const pendingRevenue = clients.reduce((sum, client) => {
          const baseRevenue = !client.billing.paid ? client.billing.basePrice : 0;
          const additionalRevenue = (client.billing.revisions.additional || [])
            .filter(rev => rev.billable && rev.status !== 'delivered')
            .reduce((sum, rev) => sum + rev.cost, 0);
          return sum + baseRevenue + additionalRevenue;
        }, 0);

        console.log('📈 Business Summary:');
        console.log(`   Total Clients: ${clients.length}`);
        console.log(`   Revenue Collected: $${totalRevenue}`);
        console.log(`   Revenue Pending: $${pendingRevenue}`);
        console.log(`   Total Pipeline: $${totalRevenue + pendingRevenue}`);

        const statusCounts = {};
        clients.forEach(client => {
          statusCounts[client.status.current] = (statusCounts[client.status.current] || 0) + 1;
        });

        console.log('\n📊 Status Breakdown:');
        Object.entries(statusCounts).forEach(([status, count]) => {
          console.log(`   ${this.getStatusIcon(status)} ${status}: ${count} clients`);
        });
      }

      return clients;

    } catch (error) {
      console.error('❌ Error listing clients:', error.message);
      process.exit(1);
    }
  }

  generateInvoice(clientName, options = {}) {
    try {
      const clientFolder = this.sanitizeClientName(clientName);
      const clientPath = path.join(this.clientProjectsPath, clientFolder);
      
      if (!fs.existsSync(clientPath)) {
        throw new Error(`Client '${clientFolder}' not found`);
      }

      const statusPath = path.join(clientPath, '_business/status.json');
      const businessStatus = JSON.parse(fs.readFileSync(statusPath, 'utf8'));
      const clientData = JSON.parse(fs.readFileSync(path.join(clientPath, 'source/client-data.json'), 'utf8'));

      const invoice = this.createInvoiceData(businessStatus, clientData, options);
      
      // Save invoice
      const invoicePath = path.join(clientPath, '_business', `invoice-${Date.now()}.json`);
      fs.writeFileSync(invoicePath, JSON.stringify(invoice, null, 2));

      // Display invoice
      this.displayInvoice(invoice);

      console.log(`\n💾 Invoice saved: ${invoicePath}`);

      return invoice;

    } catch (error) {
      console.error('❌ Error generating invoice:', error.message);
      process.exit(1);
    }
  }

  createInvoiceData(businessStatus, clientData, options) {
    const invoice = {
      invoiceNumber: options.invoiceNumber || `INV-${Date.now()}`,
      date: new Date().toISOString(),
      dueDate: options.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      
      client: {
        name: businessStatus.client.name,
        email: clientData.EMAIL,
        phone: clientData.PHONE,
        address: clientData.FULL_ADDRESS
      },
      
      items: [],
      
      subtotal: 0,
      tax: 0,
      total: 0,
      
      status: 'pending',
      notes: options.notes || ''
    };

    // Add base website cost
    if (!businessStatus.billing.paid) {
      invoice.items.push({
        description: 'Restaurant Website Development',
        quantity: 1,
        rate: businessStatus.billing.basePrice,
        amount: businessStatus.billing.basePrice
      });
    }

    // Add revision costs
    if (businessStatus.billing.revisions.additional) {
      businessStatus.billing.revisions.additional
        .filter(rev => rev.billable && rev.status === 'completed')
        .forEach(rev => {
          invoice.items.push({
            description: `Website Revision #${rev.revisionNumber}`,
            quantity: 1,
            rate: rev.cost,
            amount: rev.cost,
            details: `${rev.changes} changes`
          });
        });
    }

    // Calculate totals
    invoice.subtotal = invoice.items.reduce((sum, item) => sum + item.amount, 0);
    invoice.tax = options.taxRate ? invoice.subtotal * options.taxRate : 0;
    invoice.total = invoice.subtotal + invoice.tax;

    return invoice;
  }

  displayInvoice(invoice) {
    console.log('\n📄 Invoice Generated\n');
    
    console.log(`Invoice #: ${invoice.invoiceNumber}`);
    console.log(`Date: ${new Date(invoice.date).toLocaleDateString()}`);
    console.log(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`);
    
    console.log('\n👤 Bill To:');
    console.log(`   ${invoice.client.name}`);
    console.log(`   ${invoice.client.email}`);
    console.log(`   ${invoice.client.phone}`);
    console.log(`   ${invoice.client.address}`);
    
    console.log('\n📋 Items:');
    invoice.items.forEach(item => {
      console.log(`   ${item.description}`);
      console.log(`   Qty: ${item.quantity} × $${item.rate} = $${item.amount}`);
      if (item.details) {
        console.log(`   Details: ${item.details}`);
      }
      console.log('');
    });
    
    console.log(`Subtotal: $${invoice.subtotal}`);
    if (invoice.tax > 0) {
      console.log(`Tax: $${invoice.tax}`);
    }
    console.log(`Total: $${invoice.total}`);
    
    if (invoice.notes) {
      console.log(`\nNotes: ${invoice.notes}`);
    }
  }

  getStatusIcon(status) {
    const icons = {
      'setup': '🔧',
      'dataCollection': '📝',
      'development': '👨‍💻',
      'delivery': '📦',
      'completed': '✅',
      'cancelled': '❌'
    };
    return icons[status] || '⚪';
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
🍽️  Restaurant Business Manager

Usage:
  node business-manager.js <command> [options]

Commands:
  status <client-name> [new-status]     View/update client status
  note <client-name> "<note>"           Add note to client
  list                                  List all clients with summary
  invoice <client-name>                 Generate invoice

Status Options:
  setup, dataCollection, development, delivery, completed, cancelled

Examples:
  node business-manager.js status "Mario's Italian"
  node business-manager.js status "Mario's Italian" delivery --paid
  node business-manager.js note "Mario's Italian" "Client requested menu changes"
  node business-manager.js list
  node business-manager.js invoice "Mario's Italian" --due-days 14

Options for status:
  --paid                Mark as paid
  --unpaid              Mark as unpaid
  --price <amount>      Update base price
  --note "<text>"       Add note with status change

Options for note:
  --type <type>         Note type: general, technical, billing, communication

Options for invoice:
  --due-days <days>     Days until due (default: 7)
  --tax-rate <rate>     Tax rate (e.g., 0.08 for 8%)
  --notes "<text>"      Invoice notes
`);
    process.exit(1);
  }

  const manager = new BusinessManager();
  const command = args[0];

  if (command === 'list') {
    manager.listClients();

  } else if (command === 'status') {
    const clientName = args[1];
    const newStatus = args[2];

    if (!clientName) {
      console.error('❌ Client name required');
      process.exit(1);
    }

    if (!newStatus) {
      manager.viewStatus(clientName);
    } else {
      // Parse options
      const options = {};
      for (let i = 3; i < args.length; i++) {
        switch (args[i]) {
          case '--paid':
            options.paid = true;
            break;
          case '--unpaid':
            options.paid = false;
            break;
          case '--price':
            options.basePrice = parseFloat(args[++i]);
            break;
          case '--note':
            options.note = args[++i];
            break;
        }
      }

      manager.updateStatus(clientName, newStatus, options);
    }

  } else if (command === 'note') {
    const clientName = args[1];
    const note = args[2];

    if (!clientName || !note) {
      console.error('❌ Client name and note required');
      process.exit(1);
    }

    let noteType = 'general';
    for (let i = 3; i < args.length; i++) {
      if (args[i] === '--type') {
        noteType = args[++i];
      }
    }

    manager.addNote(clientName, note, noteType);

  } else if (command === 'invoice') {
    const clientName = args[1];

    if (!clientName) {
      console.error('❌ Client name required');
      process.exit(1);
    }

    // Parse options
    const options = {};
    for (let i = 2; i < args.length; i++) {
      switch (args[i]) {
        case '--due-days':
          const days = parseInt(args[++i]);
          options.dueDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
          break;
        case '--tax-rate':
          options.taxRate = parseFloat(args[++i]);
          break;
        case '--notes':
          options.notes = args[++i];
          break;
      }
    }

    manager.generateInvoice(clientName, options);

  } else {
    console.error(`❌ Unknown command: ${command}`);
    process.exit(1);
  }
}

module.exports = BusinessManager;