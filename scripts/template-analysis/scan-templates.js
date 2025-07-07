#!/usr/bin/env node

/**
 * Template Scanner & Database Builder
 * 
 * Scans all template directories and creates a comprehensive JSON database
 * for rating and managing restaurant website templates.
 * 
 * Usage: node scripts/template-analysis/scan-templates.js
 */

const fs = require('fs');
const path = require('path');

class TemplateScanner {
  constructor() {
    this.projectRoot = path.join(__dirname, '../..');
    this.databasePath = path.join(__dirname, 'data/template-database.json');
    this.templates = {};
    this.stats = {
      total: 0,
      complete: 0,
      incomplete: 0,
      directories: []
    };
  }

  // Scan all template directories
  scanTemplateDirectories() {
    const templateDirs = [
      'templates',
      'templates-new', 
      'templates-incomplete',
      'templates-business',
      'templates-untested',
      'templates-untested-2',
      'templates-untested-3',
      'templates-untested-new'
    ];

    console.log('🔍 Scanning template directories...\n');

    templateDirs.forEach(dirName => {
      const dirPath = path.join(this.projectRoot, dirName);
      if (fs.existsSync(dirPath)) {
        console.log(`📁 Scanning: ${dirName}`);
        this.scanDirectory(dirPath, dirName);
        this.stats.directories.push(dirName);
      } else {
        console.log(`⚠️  Directory not found: ${dirName}`);
      }
    });
  }

  // Scan individual directory for templates
  scanDirectory(dirPath, parentDir) {
    try {
      const items = fs.readdirSync(dirPath);
      let count = 0;

      items.forEach(item => {
        const itemPath = path.join(dirPath, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory() && !item.startsWith('.')) {
          const templateData = this.analyzeTemplate(itemPath, item, parentDir);
          if (templateData) {
            this.templates[item] = templateData;
            this.stats.total++;
            count++;
            
            if (templateData.status === 'complete') {
              this.stats.complete++;
            } else {
              this.stats.incomplete++;
            }
          }
        }
      });

      console.log(`   Found ${count} templates`);
    } catch (error) {
      console.error(`   Error scanning ${dirPath}: ${error.message}`);
    }
  }

  // Analyze individual template
  analyzeTemplate(templatePath, templateName, parentDir) {
    try {
      const files = fs.readdirSync(templatePath);
      
      // Check for required files
      const hasIndex = files.includes('index.html');
      const hasStyles = files.includes('styles.css');
      const hasScript = files.includes('script.js');
      const hasMenu = files.includes('menu.html');

      // Skip if no index.html (not a valid template)
      if (!hasIndex) {
        return null;
      }

      // Analyze template content
      const analysis = this.analyzeTemplateContent(templatePath, files);
      
      // Determine template category from name
      const category = this.categorizeTemplate(templateName);
      
      // Determine completion status
      const status = hasIndex && hasStyles ? 'complete' : 'incomplete';

      return {
        name: templateName,
        path: `${parentDir}/${templateName}`,
        category: category,
        status: status,
        files: {
          index_html: hasIndex,
          styles_css: hasStyles,
          script_js: hasScript,
          menu_html: hasMenu,
          total_files: files.length
        },
        features: {
          estimated_mobile_responsive: analysis.hasMobileCSS,
          has_navigation: analysis.hasNavigation,
          has_contact_form: analysis.hasContactForm,
          has_menu_section: analysis.hasMenuSection,
          uses_css_variables: analysis.usesCSSVariables
        },
        ratings: {
          overall: 0,
          technical: 0,
          visual: 0,
          upwork_potential: 0
        },
        metadata: {
          file_size: analysis.totalSize,
          created_date: new Date().toISOString().split('T')[0],
          last_modified: analysis.lastModified
        },
        tags: [],
        notes: "",
        reviewed: false,
        upwork_ready: null,
        upwork_priority: 'unknown'
      };
    } catch (error) {
      console.error(`   Error analyzing ${templateName}: ${error.message}`);
      return null;
    }
  }

  // Analyze template content for features
  analyzeTemplateContent(templatePath, files) {
    let analysis = {
      hasMobileCSS: false,
      hasNavigation: false,
      hasContactForm: false,
      hasMenuSection: false,
      usesCSSVariables: false,
      totalSize: 0,
      lastModified: null
    };

    try {
      // Analyze index.html
      const indexPath = path.join(templatePath, 'index.html');
      if (fs.existsSync(indexPath)) {
        const indexContent = fs.readFileSync(indexPath, 'utf8');
        const indexStat = fs.statSync(indexPath);
        
        analysis.hasNavigation = /nav|navigation|menu-toggle|hamburger/i.test(indexContent);
        analysis.hasContactForm = /form|contact|email|phone/i.test(indexContent);
        analysis.hasMenuSection = /menu|food|dish|price/i.test(indexContent);
        analysis.totalSize += indexStat.size;
        analysis.lastModified = indexStat.mtime.toISOString().split('T')[0];
      }

      // Analyze styles.css
      const stylesPath = path.join(templatePath, 'styles.css');
      if (fs.existsSync(stylesPath)) {
        const stylesContent = fs.readFileSync(stylesPath, 'utf8');
        const stylesStat = fs.statSync(stylesPath);
        
        analysis.hasMobileCSS = /@media|mobile|responsive|flex|grid/i.test(stylesContent);
        analysis.usesCSSVariables = /--[a-zA-Z]|var\(/i.test(stylesContent);
        analysis.totalSize += stylesStat.size;
      }

      // Calculate total file sizes
      files.forEach(file => {
        try {
          const filePath = path.join(templatePath, file);
          const stat = fs.statSync(filePath);
          if (stat.isFile()) {
            analysis.totalSize += stat.size;
          }
        } catch (e) {
          // Skip files that can't be read
        }
      });

    } catch (error) {
      console.error(`Error analyzing content: ${error.message}`);
    }

    return analysis;
  }

  // Categorize template based on name patterns
  categorizeTemplate(templateName) {
    const name = templateName.toLowerCase();
    
    if (name.includes('fine-dining') || name.includes('luxury') || name.includes('elegant')) {
      return 'fine-dining';
    } else if (name.includes('fast-casual') || name.includes('quick') || name.includes('mobile')) {
      return 'fast-casual';
    } else if (name.includes('casual') || name.includes('family')) {
      return 'casual-dining';
    } else if (name.includes('pizza') || name.includes('italian')) {
      return 'pizza-italian';
    } else if (name.includes('asian') || name.includes('sushi') || name.includes('ramen')) {
      return 'asian-cuisine';
    } else if (name.includes('mexican') || name.includes('taco') || name.includes('cantina')) {
      return 'mexican';
    } else if (name.includes('seafood') || name.includes('coastal')) {
      return 'seafood';
    } else if (name.includes('steakhouse') || name.includes('bbq')) {
      return 'steakhouse-bbq';
    } else if (name.includes('cafe') || name.includes('coffee') || name.includes('bistro')) {
      return 'cafe-bistro';
    } else if (name.includes('bakery') || name.includes('dessert')) {
      return 'bakery-dessert';
    } else if (name.includes('sports') || name.includes('bar') || name.includes('pub')) {
      return 'sports-bar';
    } else if (name.includes('farm') || name.includes('organic')) {
      return 'farm-to-table';
    } else {
      return 'other';
    }
  }

  // Generate database
  generateDatabase() {
    const database = {
      metadata: {
        total_templates: this.stats.total,
        complete_templates: this.stats.complete,
        incomplete_templates: this.stats.incomplete,
        scanned_directories: this.stats.directories,
        last_updated: new Date().toISOString(),
        version: "1.0.0"
      },
      categories: this.generateCategoryStats(),
      templates: this.templates
    };

    return database;
  }

  // Generate category statistics
  generateCategoryStats() {
    const categories = {};
    
    Object.values(this.templates).forEach(template => {
      const category = template.category;
      if (!categories[category]) {
        categories[category] = {
          count: 0,
          complete: 0,
          incomplete: 0
        };
      }
      
      categories[category].count++;
      if (template.status === 'complete') {
        categories[category].complete++;
      } else {
        categories[category].incomplete++;
      }
    });

    return categories;
  }

  // Save database to file
  saveDatabase() {
    try {
      const database = this.generateDatabase();
      
      // Ensure data directory exists
      const dataDir = path.dirname(this.databasePath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // Write database file
      fs.writeFileSync(this.databasePath, JSON.stringify(database, null, 2));
      
      console.log(`\n💾 Database saved to: ${this.databasePath}`);
      return true;
    } catch (error) {
      console.error(`❌ Error saving database: ${error.message}`);
      return false;
    }
  }

  // Display summary
  displaySummary() {
    console.log('\n' + '═'.repeat(60));
    console.log('📊 TEMPLATE SCAN SUMMARY');
    console.log('═'.repeat(60));
    console.log(`📁 Directories scanned: ${this.stats.directories.length}`);
    console.log(`📄 Total templates found: ${this.stats.total}`);
    console.log(`✅ Complete templates: ${this.stats.complete}`);
    console.log(`⚠️  Incomplete templates: ${this.stats.incomplete}`);
    
    console.log('\n📋 BY CATEGORY:');
    const categories = this.generateCategoryStats();
    Object.entries(categories)
      .sort(([,a], [,b]) => b.count - a.count)
      .forEach(([category, stats]) => {
        console.log(`   ${category}: ${stats.count} (${stats.complete} complete)`);
      });
    
    console.log('\n🎯 NEXT STEPS:');
    console.log('   1. Review templates: node rate-templates.js');
    console.log('   2. Query top templates: node query-templates.js --top 10');
    console.log('   3. Export for Upwork: node query-templates.js --upwork-ready');
    console.log('═'.repeat(60));
  }

  // Main execution
  async run() {
    console.log('🚀 Template Database Scanner v1.0.0\n');
    
    this.scanTemplateDirectories();
    
    if (this.stats.total === 0) {
      console.log('❌ No templates found. Check directory structure.');
      return false;
    }
    
    const saved = this.saveDatabase();
    if (saved) {
      this.displaySummary();
      return true;
    }
    
    return false;
  }
}

// Run if called directly
if (require.main === module) {
  const scanner = new TemplateScanner();
  scanner.run().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = TemplateScanner;