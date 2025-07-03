#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class ConfigChanger {
  constructor() {
    this.configPath = path.join(__dirname, '../config');
    this.clientProjectsPath = path.join(__dirname, '../client-projects');
    
    // Load configurations
    this.templates = JSON.parse(fs.readFileSync(path.join(this.configPath, 'templates.json'), 'utf8'));
    this.colorSchemes = JSON.parse(fs.readFileSync(path.join(this.configPath, 'color-schemes.json'), 'utf8'));
  }

  changeConfig(clientName, options = {}) {
    try {
      const clientFolder = this.sanitizeClientName(clientName);
      const clientPath = path.join(this.clientProjectsPath, clientFolder);
      
      if (!fs.existsSync(clientPath)) {
        throw new Error(`Client '${clientFolder}' not found. Run create-client.js first.`);
      }

      const configPath = path.join(clientPath, 'source/config.json');
      if (!fs.existsSync(configPath)) {
        throw new Error(`Config file not found for client '${clientFolder}'`);
      }

      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      const originalConfig = JSON.parse(JSON.stringify(config)); // Deep clone
      
      let changes = [];

      // Update template
      if (options.template) {
        if (!this.templates.templates[options.template]) {
          throw new Error(`Template '${options.template}' not found. Available: ${Object.keys(this.templates.templates).join(', ')}`);
        }
        
        config.project.template = options.template;
        changes.push(`Template: ${originalConfig.project.template} → ${options.template}`);
      }

      // Update color scheme
      if (options.colorScheme) {
        if (!this.colorSchemes[options.colorScheme]) {
          throw new Error(`Color scheme '${options.colorScheme}' not found. Available: ${Object.keys(this.colorSchemes).join(', ')}`);
        }
        
        config.project.colorScheme = options.colorScheme;
        changes.push(`Color scheme: ${originalConfig.project.colorScheme} → ${options.colorScheme}`);
      }

      // Update settings
      if (options.imageOptimization !== undefined) {
        config.settings.imageOptimization = options.imageOptimization;
        changes.push(`Image optimization: ${originalConfig.settings.imageOptimization} → ${options.imageOptimization}`);
      }

      if (options.mobileOptimization !== undefined) {
        config.settings.mobileOptimization = options.mobileOptimization;
        changes.push(`Mobile optimization: ${originalConfig.settings.mobileOptimization} → ${options.mobileOptimization}`);
      }

      if (options.seoOptimization !== undefined) {
        config.settings.seoOptimization = options.seoOptimization;
        changes.push(`SEO optimization: ${originalConfig.settings.seoOptimization} → ${options.seoOptimization}`);
      }

      if (changes.length === 0) {
        console.log('ℹ️  No changes requested');
        return;
      }

      // Update last modified timestamp
      config.project.lastModified = new Date().toISOString();

      // Save updated config
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

      console.log(`✅ Configuration updated for ${clientName}`);
      console.log('\n📝 Changes made:');
      changes.forEach(change => console.log(`   ${change}`));
      
      console.log('\n📋 Next steps:');
      console.log(`   Run: node scripts/generate-website.js "${clientName}"`);
      console.log('   This will regenerate the website with new settings');

      return config;

    } catch (error) {
      console.error('❌ Error changing configuration:', error.message);
      process.exit(1);
    }
  }

  viewConfig(clientName) {
    try {
      const clientFolder = this.sanitizeClientName(clientName);
      const clientPath = path.join(this.clientProjectsPath, clientFolder);
      
      if (!fs.existsSync(clientPath)) {
        throw new Error(`Client '${clientFolder}' not found`);
      }

      const configPath = path.join(clientPath, 'source/config.json');
      if (!fs.existsSync(configPath)) {
        throw new Error(`Config file not found for client '${clientFolder}'`);
      }

      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      const template = this.templates.templates[config.project.template];
      const colorScheme = this.colorSchemes[config.project.colorScheme];

      console.log(`\n📋 Configuration for ${clientName}\n`);
      
      console.log('🎨 Template:');
      console.log(`   ID: ${config.project.template}`);
      console.log(`   Name: ${template?.name || 'Unknown'}`);
      console.log(`   Category: ${template?.category || 'Unknown'}`);
      console.log(`   Description: ${template?.description || 'No description'}`);
      
      console.log('\n🌈 Color Scheme:');
      console.log(`   ID: ${config.project.colorScheme}`);
      console.log(`   Name: ${colorScheme?.name || 'Unknown'}`);
      console.log(`   Description: ${colorScheme?.description || 'No description'}`);
      
      console.log('\n⚙️  Settings:');
      console.log(`   Image Optimization: ${config.settings.imageOptimization}`);
      console.log(`   Mobile Optimization: ${config.settings.mobileOptimization}`);
      console.log(`   SEO Optimization: ${config.settings.seoOptimization}`);
      
      console.log('\n📅 Timestamps:');
      console.log(`   Created: ${new Date(config.project.created).toLocaleString()}`);
      if (config.project.lastGenerated) {
        console.log(`   Last Generated: ${new Date(config.project.lastGenerated).toLocaleString()}`);
      }
      if (config.project.lastModified) {
        console.log(`   Last Modified: ${new Date(config.project.lastModified).toLocaleString()}`);
      }

      return config;

    } catch (error) {
      console.error('❌ Error viewing configuration:', error.message);
      process.exit(1);
    }
  }

  sanitizeClientName(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  listAvailableTemplates() {
    console.log('\n🎨 Available Templates:\n');
    
    const categories = {};
    Object.entries(this.templates.templates).forEach(([id, template]) => {
      if (!categories[template.category]) {
        categories[template.category] = [];
      }
      categories[template.category].push({ id, ...template });
    });

    Object.entries(categories).forEach(([category, templates]) => {
      const categoryInfo = this.templates.categories[category];
      console.log(`📂 ${categoryInfo?.name || category}`);
      if (categoryInfo?.description) {
        console.log(`   ${categoryInfo.description}`);
      }
      console.log('');
      
      templates.forEach(template => {
        console.log(`   📋 ${template.id}`);
        console.log(`      Name: ${template.name}`);
        console.log(`      Description: ${template.description}`);
        console.log(`      Best for: ${template.bestFor.join(', ')}`);
        console.log('');
      });
    });
  }

  listAvailableColorSchemes() {
    console.log('\n🌈 Available Color Schemes:\n');
    
    Object.entries(this.colorSchemes).forEach(([id, scheme]) => {
      const defaultFlag = scheme.default ? ' (default)' : '';
      console.log(`🎨 ${id}${defaultFlag}`);
      console.log(`   Name: ${scheme.name}`);
      console.log(`   Description: ${scheme.description}`);
      console.log(`   Preview: ${scheme.preview}`);
      console.log('');
    });
  }
}

// CLI Usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🍽️  Restaurant Configuration Manager

Usage:
  node change-config.js <client-name> [options]
  node change-config.js <client-name> --view
  node change-config.js --list-templates
  node change-config.js --list-colors

Options:
  --template <id>           Change template
  --color <id>              Change color scheme
  --image-opt <true/false>  Enable/disable image optimization
  --mobile-opt <true/false> Enable/disable mobile optimization  
  --seo-opt <true/false>    Enable/disable SEO optimization
  --view                    View current configuration

Examples:
  node change-config.js "Mario's Italian" --template fine-dining --color bold
  node change-config.js "Joe's Diner" --color business
  node change-config.js "The Wine Bar" --view
  node change-config.js "Cafe Luna" --image-opt false --mobile-opt true
`);
    process.exit(1);
  }

  const changer = new ConfigChanger();

  // Handle global options
  if (args[0] === '--list-templates') {
    changer.listAvailableTemplates();
    process.exit(0);
  }

  if (args[0] === '--list-colors') {
    changer.listAvailableColorSchemes();
    process.exit(0);
  }

  const clientName = args[0];
  
  // Parse options
  const options = {};
  let viewMode = false;
  
  for (let i = 1; i < args.length; i++) {
    switch (args[i]) {
      case '--view':
        viewMode = true;
        break;
      case '--template':
        options.template = args[++i];
        break;
      case '--color':
        options.colorScheme = args[++i];
        break;
      case '--image-opt':
        options.imageOptimization = args[++i] === 'true';
        break;
      case '--mobile-opt':
        options.mobileOptimization = args[++i] === 'true';
        break;
      case '--seo-opt':
        options.seoOptimization = args[++i] === 'true';
        break;
    }
  }

  if (viewMode) {
    changer.viewConfig(clientName);
  } else {
    changer.changeConfig(clientName, options);
  }
}

module.exports = ConfigChanger;