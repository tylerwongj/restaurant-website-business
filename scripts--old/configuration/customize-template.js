#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class TemplateCustomizer {
  constructor() {
    this.placeholderPattern = /\{\{([A-Z_]+)\}\}/g;
  }

  customizeTemplate(templatePath, clientDataPath, outputPath) {
    try {
      // Read client data
      const clientData = JSON.parse(fs.readFileSync(clientDataPath, 'utf8'));
      
      // Create output directory
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }

      // Copy and customize all template files
      this.copyAndCustomizeDirectory(templatePath, outputPath, clientData);
      
      console.log(`✅ Template customized successfully!`);
      console.log(`📁 Output: ${outputPath}`);
      console.log(`🎨 Color scheme: ${clientData.COLOR_SCHEME || 'warm'}`);
      
    } catch (error) {
      console.error('❌ Error customizing template:', error.message);
      process.exit(1);
    }
  }

  copyAndCustomizeDirectory(sourceDir, targetDir, clientData) {
    const items = fs.readdirSync(sourceDir);
    
    items.forEach(item => {
      const sourcePath = path.join(sourceDir, item);
      const targetPath = path.join(targetDir, item);
      
      if (fs.statSync(sourcePath).isDirectory()) {
        fs.mkdirSync(targetPath, { recursive: true });
        this.copyAndCustomizeDirectory(sourcePath, targetPath, clientData);
      } else {
        this.copyAndCustomizeFile(sourcePath, targetPath, clientData);
      }
    });
  }

  copyAndCustomizeFile(sourcePath, targetPath, clientData) {
    const content = fs.readFileSync(sourcePath, 'utf8');
    
    // Replace placeholders
    const customizedContent = content.replace(this.placeholderPattern, (match, key) => {
      return clientData[key] || match;
    });
    
    fs.writeFileSync(targetPath, customizedContent);
    
    // Log replacements for verification
    const matches = content.match(this.placeholderPattern);
    if (matches) {
      const filename = path.basename(sourcePath);
      console.log(`📝 ${filename}: ${matches.length} placeholders replaced`);
    }
  }

  listPlaceholders(templatePath) {
    const placeholders = new Set();
    
    const scanDirectory = (dir) => {
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const itemPath = path.join(dir, item);
        
        if (fs.statSync(itemPath).isDirectory()) {
          scanDirectory(itemPath);
        } else if (item.endsWith('.html') || item.endsWith('.css') || item.endsWith('.js')) {
          const content = fs.readFileSync(itemPath, 'utf8');
          const matches = content.match(this.placeholderPattern);
          
          if (matches) {
            matches.forEach(match => {
              const key = match.replace(/[{}]/g, '');
              placeholders.add(key);
            });
          }
        }
      });
    };
    
    scanDirectory(templatePath);
    return Array.from(placeholders).sort();
  }
}

// CLI Usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🍽️  Restaurant Template Customizer

Usage:
  node customize-template.js <command> [options]

Commands:
  customize <template> <data.json> <output>  Customize template with client data
  scan <template>                           List all placeholders in template

Examples:
  node customize-template.js customize templates/casual-family client-data.json client-projects/marios-kitchen
  node customize-template.js scan templates/casual-family
`);
    process.exit(1);
  }

  const customizer = new TemplateCustomizer();
  const command = args[0];

  if (command === 'customize') {
    const [, templatePath, clientDataPath, outputPath] = args;
    
    if (!templatePath || !clientDataPath || !outputPath) {
      console.error('❌ Missing required arguments for customize command');
      process.exit(1);
    }
    
    customizer.customizeTemplate(templatePath, clientDataPath, outputPath);
    
  } else if (command === 'scan') {
    const [, templatePath] = args;
    
    if (!templatePath) {
      console.error('❌ Missing template path for scan command');
      process.exit(1);
    }
    
    const placeholders = customizer.listPlaceholders(templatePath);
    
    console.log(`\n📋 Found ${placeholders.length} placeholders in ${templatePath}:\n`);
    placeholders.forEach(placeholder => {
      console.log(`  {{${placeholder}}}`);
    });
    console.log('');
    
  } else {
    console.error(`❌ Unknown command: ${command}`);
    process.exit(1);
  }
}

module.exports = TemplateCustomizer;