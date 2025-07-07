#!/usr/bin/env node

/**
 * Interactive Template Rating Tool
 * 
 * Allows you to rate and review templates from the database.
 * Supports batch rating, filtering, and progress tracking.
 * 
 * Usage: 
 *   node scripts/template-analysis/rate-templates.js
 *   node scripts/template-analysis/rate-templates.js --category casual-dining
 *   node scripts/template-analysis/rate-templates.js --complete-only
 *   node scripts/template-analysis/rate-templates.js --unrated-only
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

class TemplateRater {
  constructor() {
    this.databasePath = path.join(__dirname, 'data/template-database.json');
    this.database = null;
    this.currentTemplate = null;
    this.totalRated = 0;
    this.sessionRatings = 0;
    
    // Command line arguments
    this.args = this.parseArguments();
    
    // Setup readline interface
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  // Parse command line arguments
  parseArguments() {
    const args = process.argv.slice(2);
    const parsed = {
      category: null,
      completeOnly: false,
      unratedOnly: false,
      help: false
    };

    for (let i = 0; i < args.length; i++) {
      switch (args[i]) {
        case '--category':
          parsed.category = args[++i];
          break;
        case '--complete-only':
          parsed.completeOnly = true;
          break;
        case '--unrated-only':
          parsed.unratedOnly = true;
          break;
        case '--help':
          parsed.help = true;
          break;
      }
    }

    return parsed;
  }

  // Load database
  loadDatabase() {
    try {
      if (!fs.existsSync(this.databasePath)) {
        console.log('❌ Template database not found. Run scan-templates.js first.');
        return false;
      }

      const data = fs.readFileSync(this.databasePath, 'utf8');
      this.database = JSON.parse(data);
      
      console.log(`📋 Loaded ${this.database.metadata.total_templates} templates from database`);
      return true;
    } catch (error) {
      console.error(`❌ Error loading database: ${error.message}`);
      return false;
    }
  }

  // Save database
  saveDatabase() {
    try {
      this.database.metadata.last_updated = new Date().toISOString();
      fs.writeFileSync(this.databasePath, JSON.stringify(this.database, null, 2));
      return true;
    } catch (error) {
      console.error(`❌ Error saving database: ${error.message}`);
      return false;
    }
  }

  // Get filtered template list
  getFilteredTemplates() {
    let templates = Object.entries(this.database.templates);

    // Apply filters
    if (this.args.category) {
      templates = templates.filter(([name, template]) => 
        template.category === this.args.category
      );
    }

    if (this.args.completeOnly) {
      templates = templates.filter(([name, template]) => 
        template.status === 'complete'
      );
    }

    if (this.args.unratedOnly) {
      templates = templates.filter(([name, template]) => 
        !template.reviewed || template.ratings.overall === 0
      );
    }

    return templates;
  }

  // Display template info
  displayTemplateInfo(templateName, template) {
    console.clear();
    console.log('═'.repeat(80));
    console.log(`🎯 RATING TEMPLATE: ${templateName}`);
    console.log('═'.repeat(80));
    console.log(`📁 Path: ${template.path}`);
    console.log(`📂 Category: ${template.category}`);
    console.log(`📊 Status: ${template.status}`);
    
    console.log('\n📋 FILES:');
    console.log(`   ✅ index.html: ${template.files.index_html ? 'Yes' : 'No'}`);
    console.log(`   🎨 styles.css: ${template.files.styles_css ? 'Yes' : 'No'}`);
    console.log(`   ⚡ script.js: ${template.files.script_js ? 'Yes' : 'No'}`);
    console.log(`   🍽️  menu.html: ${template.files.menu_html ? 'Yes' : 'No'}`);
    console.log(`   📁 Total files: ${template.files.total_files}`);

    console.log('\n🔧 FEATURES:');
    console.log(`   📱 Mobile responsive: ${template.features.estimated_mobile_responsive ? 'Likely' : 'Unknown'}`);
    console.log(`   🧭 Navigation: ${template.features.has_navigation ? 'Yes' : 'No'}`);
    console.log(`   📞 Contact form: ${template.features.has_contact_form ? 'Yes' : 'No'}`);
    console.log(`   🍽️  Menu section: ${template.features.has_menu_section ? 'Yes' : 'No'}`);
    console.log(`   🎨 CSS variables: ${template.features.uses_css_variables ? 'Yes' : 'No'}`);

    console.log('\n⭐ CURRENT RATINGS:');
    console.log(`   Overall: ${this.formatRating(template.ratings.overall)}`);
    console.log(`   Technical: ${this.formatRating(template.ratings.technical)}`);
    console.log(`   Visual: ${this.formatRating(template.ratings.visual)}`);
    console.log(`   Upwork Potential: ${this.formatRating(template.ratings.upwork_potential)}`);
    
    if (template.notes) {
      console.log(`\n📝 Notes: ${template.notes}`);
    }
    
    if (template.tags.length > 0) {
      console.log(`\n🏷️  Tags: ${template.tags.join(', ')}`);
    }
    
    console.log('\n' + '─'.repeat(80));
  }

  // Format rating for display
  formatRating(rating) {
    if (rating === 0) return 'Not rated';
    return '★'.repeat(rating) + '☆'.repeat(5 - rating) + ` (${rating}/5)`;
  }

  // Get rating from user
  async getRating(prompt, currentValue = 0) {
    return new Promise((resolve) => {
      const currentDisplay = currentValue > 0 ? ` (current: ${currentValue})` : '';
      this.rl.question(`${prompt}${currentDisplay}: `, (answer) => {
        const rating = parseInt(answer.trim());
        if (isNaN(rating) || rating < 0 || rating > 5) {
          console.log('⚠️  Please enter a number between 0-5 (0 = skip/not rated)');
          resolve(this.getRating(prompt, currentValue));
        } else {
          resolve(rating);
        }
      });
    });
  }

  // Get yes/no answer
  async getYesNo(prompt, defaultValue = null) {
    return new Promise((resolve) => {
      const defaultDisplay = defaultValue !== null ? ` (current: ${defaultValue ? 'Yes' : 'No'})` : '';
      this.rl.question(`${prompt} (y/n)${defaultDisplay}: `, (answer) => {
        const response = answer.trim().toLowerCase();
        if (response === 'y' || response === 'yes') {
          resolve(true);
        } else if (response === 'n' || response === 'no') {
          resolve(false);
        } else if (response === '' && defaultValue !== null) {
          resolve(defaultValue);
        } else {
          console.log('⚠️  Please enter y/yes or n/no');
          resolve(this.getYesNo(prompt, defaultValue));
        }
      });
    });
  }

  // Get text input
  async getTextInput(prompt, currentValue = '') {
    return new Promise((resolve) => {
      const currentDisplay = currentValue ? ` (current: "${currentValue}")` : '';
      this.rl.question(`${prompt}${currentDisplay}: `, (answer) => {
        const text = answer.trim();
        resolve(text || currentValue);
      });
    });
  }

  // Rate a single template
  async rateTemplate(templateName, template) {
    this.displayTemplateInfo(templateName, template);
    
    console.log('\n🎯 RATING OPTIONS:');
    console.log('   1. Rate this template');
    console.log('   2. Add/edit notes');
    console.log('   3. Add/edit tags');
    console.log('   4. Mark Upwork ready status');
    console.log('   5. View template in browser');
    console.log('   6. Skip to next');
    console.log('   7. Save and exit');
    console.log('   8. Exit without saving');

    const choice = await this.getTextInput('\nChoose an option (1-8)');

    switch (choice) {
      case '1':
        await this.rateTemplateRatings(templateName, template);
        break;
      case '2':
        await this.editNotes(templateName, template);
        break;
      case '3':
        await this.editTags(templateName, template);
        break;
      case '4':
        await this.setUpworkStatus(templateName, template);
        break;
      case '5':
        await this.openTemplate(templateName, template);
        break;
      case '6':
        return 'next';
      case '7':
        return 'save_exit';
      case '8':
        return 'exit';
      default:
        console.log('⚠️  Invalid choice. Please try again.');
        return this.rateTemplate(templateName, template);
    }

    // Show the template again after any action
    return this.rateTemplate(templateName, template);
  }

  // Rate template ratings
  async rateTemplateRatings(templateName, template) {
    console.log('\n⭐ RATE TEMPLATE (0-5 stars, 0 = not rated):');
    
    const overall = await this.getRating('Overall rating (0-5)', template.ratings.overall);
    const technical = await this.getRating('Technical quality (0-5)', template.ratings.technical);
    const visual = await this.getRating('Visual design (0-5)', template.ratings.visual);
    const upwork = await this.getRating('Upwork potential (0-5)', template.ratings.upwork_potential);

    // Update ratings
    template.ratings.overall = overall;
    template.ratings.technical = technical;
    template.ratings.visual = visual;
    template.ratings.upwork_potential = upwork;
    template.reviewed = true;

    this.sessionRatings++;
    console.log('\n✅ Ratings saved!');
    
    // Auto-save after rating
    this.saveDatabase();
  }

  // Edit notes
  async editNotes(templateName, template) {
    console.log('\n📝 EDIT NOTES:');
    const notes = await this.getTextInput('Notes/comments', template.notes);
    template.notes = notes;
    console.log('✅ Notes updated!');
  }

  // Edit tags
  async editTags(templateName, template) {
    console.log('\n🏷️  EDIT TAGS:');
    console.log('Current tags:', template.tags.join(', ') || 'None');
    console.log('Suggested tags: mobile-responsive, upwork-ready, professional, simple, complex, modern, rustic');
    
    const tagsInput = await this.getTextInput('Tags (comma-separated)', template.tags.join(', '));
    template.tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
    console.log('✅ Tags updated!');
  }

  // Set Upwork status
  async setUpworkStatus(templateName, template) {
    console.log('\n🎯 UPWORK READINESS:');
    const upworkReady = await this.getYesNo('Is this template ready for Upwork?', template.upwork_ready);
    template.upwork_ready = upworkReady;
    
    if (upworkReady) {
      console.log('\n📊 Priority level:');
      console.log('   1. High priority (top choice)');
      console.log('   2. Medium priority (good option)');
      console.log('   3. Low priority (backup option)');
      
      const priority = await this.getTextInput('Priority (1-3)');
      const priorityMap = { '1': 'high', '2': 'medium', '3': 'low' };
      template.upwork_priority = priorityMap[priority] || 'medium';
    }
    
    console.log('✅ Upwork status updated!');
  }

  // Open template in browser
  async openTemplate(templateName, template) {
    const templatePath = path.join(__dirname, '../../', template.path, 'index.html');
    if (fs.existsSync(templatePath)) {
      console.log(`\n🌐 Opening template in browser...`);
      console.log(`File: ${templatePath}`);
      
      // Open in default browser (macOS)
      require('child_process').exec(`open "${templatePath}"`);
      
      console.log('Press Enter to continue...');
      await this.getTextInput('');
    } else {
      console.log('❌ Template file not found!');
      await this.getTextInput('Press Enter to continue...');
    }
  }

  // Display progress
  displayProgress(current, total) {
    const percent = Math.round((current / total) * 100);
    const ratedCount = Object.values(this.database.templates).filter(t => t.reviewed).length;
    
    console.log(`\n📊 Progress: ${current}/${total} (${percent}%) | Total rated: ${ratedCount} | Session: ${this.sessionRatings}`);
  }

  // Main rating loop
  async rateTemplates() {
    const templates = this.getFilteredTemplates();
    
    if (templates.length === 0) {
      console.log('❌ No templates match your filters.');
      return;
    }

    console.log(`\n🎯 Found ${templates.length} templates to rate`);
    console.log('Filters:', Object.entries(this.args).filter(([k,v]) => v).map(([k,v]) => `${k}: ${v}`).join(', ') || 'None');
    
    const startRating = await this.getYesNo('\nStart rating templates?');
    if (!startRating) {
      console.log('👋 Goodbye!');
      return;
    }

    for (let i = 0; i < templates.length; i++) {
      const [templateName, template] = templates[i];
      
      this.displayProgress(i + 1, templates.length);
      
      const result = await this.rateTemplate(templateName, template);
      
      if (result === 'save_exit') {
        console.log('\n💾 Saving and exiting...');
        this.saveDatabase();
        break;
      } else if (result === 'exit') {
        console.log('\n👋 Exiting without saving...');
        break;
      }
    }

    console.log(`\n✅ Session complete! Rated ${this.sessionRatings} templates.`);
  }

  // Display help
  displayHelp() {
    console.log(`
🎯 Template Rating Tool

USAGE:
  node rate-templates.js [options]

OPTIONS:
  --category [name]     Only rate templates in specific category
  --complete-only       Only rate complete templates (with CSS/JS)
  --unrated-only        Only rate templates that haven't been rated
  --help               Show this help

EXAMPLES:
  node rate-templates.js --category casual-dining --complete-only
  node rate-templates.js --unrated-only
  node rate-templates.js

RATING SCALE:
  5 stars = Excellent, top choice for Upwork
  4 stars = Very good, strong option
  3 stars = Good, decent option
  2 stars = Fair, might work with modifications
  1 star  = Poor, not recommended
  0 stars = Not rated / skip

CATEGORIES:
  casual-dining, fine-dining, fast-casual, pizza-italian,
  asian-cuisine, mexican, seafood, steakhouse-bbq,
  cafe-bistro, bakery-dessert, sports-bar, farm-to-table, other
`);
  }

  // Main execution
  async run() {
    if (this.args.help) {
      this.displayHelp();
      this.rl.close();
      return;
    }

    console.log('🎯 Template Rating Tool v1.0.0\n');
    
    if (!this.loadDatabase()) {
      this.rl.close();
      return;
    }

    try {
      await this.rateTemplates();
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
    } finally {
      this.rl.close();
    }
  }
}

// Run if called directly
if (require.main === module) {
  const rater = new TemplateRater();
  rater.run();
}

module.exports = TemplateRater;