#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class WebsiteGenerator {
  constructor() {
    this.configPath = path.join(__dirname, '../config');
    this.clientProjectsPath = path.join(__dirname, '../client-projects');
    this.templatesPath = path.join(__dirname, '../templates');
    
    // Load configurations
    this.templates = JSON.parse(fs.readFileSync(path.join(this.configPath, 'templates.json'), 'utf8'));
    this.colorSchemes = JSON.parse(fs.readFileSync(path.join(this.configPath, 'color-schemes.json'), 'utf8'));
    this.imageSpecs = JSON.parse(fs.readFileSync(path.join(this.configPath, 'image-specs.json'), 'utf8'));
    
    this.placeholderPattern = /\{\{([A-Z_]+)\}\}/g;
  }

  generateWebsite(clientName) {
    try {
      const clientFolder = this.sanitizeClientName(clientName);
      const clientPath = path.join(this.clientProjectsPath, clientFolder);
      
      if (!fs.existsSync(clientPath)) {
        throw new Error(`Client '${clientFolder}' not found. Run create-client.js first.`);
      }

      console.log(`🔄 Generating website for ${clientName}...`);
      
      // Load client configuration
      const config = this.loadClientConfig(clientPath);
      const clientData = this.loadClientData(clientPath);
      
      // Validate template exists
      const templatePath = path.join(this.templatesPath, config.project.template);
      if (!fs.existsSync(templatePath)) {
        throw new Error(`Template '${config.project.template}' not found at ${templatePath}`);
      }

      // Clear and recreate generated folder
      const generatedPath = path.join(clientPath, 'generated/website');
      if (fs.existsSync(generatedPath)) {
        fs.rmSync(generatedPath, { recursive: true });
      }
      fs.mkdirSync(generatedPath, { recursive: true });

      // Copy and customize template files
      this.copyAndCustomizeTemplate(templatePath, generatedPath, clientData, config);
      
      // Process images
      this.processImages(clientPath, generatedPath);
      
      // Apply color scheme
      this.applyColorScheme(generatedPath, config.project.colorScheme);
      
      // Update project config
      this.updateProjectConfig(clientPath);
      
      // Update business status
      this.updateBusinessStatus(clientPath);
      
      // Validate output
      const validation = this.validateWebsite(generatedPath, clientData);
      
      console.log(`✅ Website generated successfully!`);
      console.log(`📁 Location: ${generatedPath}`);
      console.log(`🎨 Template: ${this.templates.templates[config.project.template].name}`);
      console.log(`🌈 Color scheme: ${this.colorSchemes[config.project.colorScheme].name}`);
      
      if (validation.warnings.length > 0) {
        console.log(`\n⚠️  Warnings:`);
        validation.warnings.forEach(warning => console.log(`   ${warning}`));
      }
      
      if (validation.errors.length > 0) {
        console.log(`\n❌ Errors:`);
        validation.errors.forEach(error => console.log(`   ${error}`));
      }
      
      console.log(`\n📋 Next steps:`);
      console.log(`1. Review generated website in: ${generatedPath}`);
      console.log(`2. Test in browser: open ${generatedPath}/index.html`);
      console.log(`3. Package for delivery: node scripts/package-delivery.js "${clientName}"`);
      
      return generatedPath;
      
    } catch (error) {
      console.error('❌ Error generating website:', error.message);
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

  loadClientConfig(clientPath) {
    const configFile = path.join(clientPath, 'source/config.json');
    if (!fs.existsSync(configFile)) {
      throw new Error('Client config.json not found. Run create-client.js first.');
    }
    return JSON.parse(fs.readFileSync(configFile, 'utf8'));
  }

  loadClientData(clientPath) {
    const dataFile = path.join(clientPath, 'source/client-data.json');
    if (!fs.existsSync(dataFile)) {
      throw new Error('Client client-data.json not found. Run create-client.js first.');
    }
    return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  }

  copyAndCustomizeTemplate(templatePath, outputPath, clientData, config) {
    const items = fs.readdirSync(templatePath);
    let totalReplacements = 0;
    
    items.forEach(item => {
      const sourcePath = path.join(templatePath, item);
      const targetPath = path.join(outputPath, item);
      
      if (fs.statSync(sourcePath).isDirectory()) {
        fs.mkdirSync(targetPath, { recursive: true });
        this.copyAndCustomizeTemplate(sourcePath, targetPath, clientData, config);
      } else {
        const replacements = this.copyAndCustomizeFile(sourcePath, targetPath, clientData);
        totalReplacements += replacements;
      }
    });
    
    console.log(`📝 ${totalReplacements} placeholders replaced across all files`);
  }

  copyAndCustomizeFile(sourcePath, targetPath, clientData) {
    const content = fs.readFileSync(sourcePath, 'utf8');
    let replacements = 0;
    
    // Replace placeholders
    const customizedContent = content.replace(this.placeholderPattern, (match, key) => {
      if (clientData[key] !== undefined) {
        replacements++;
        return clientData[key];
      }
      
      // Check for fallback values
      if (this.imageSpecs.fallbacks[key.toLowerCase()]) {
        replacements++;
        return this.imageSpecs.fallbacks[key.toLowerCase()];
      }
      
      return match; // Keep unreplaced placeholders
    });
    
    fs.writeFileSync(targetPath, customizedContent);
    
    if (replacements > 0) {
      const filename = path.basename(sourcePath);
      console.log(`   📄 ${filename}: ${replacements} replacements`);
    }
    
    return replacements;
  }

  processImages(clientPath, generatedPath) {
    const sourceImagesPath = path.join(clientPath, 'source/images');
    const targetImagesPath = path.join(generatedPath, 'images');
    
    // Create images directory in generated website
    fs.mkdirSync(targetImagesPath, { recursive: true });
    
    if (!fs.existsSync(sourceImagesPath)) {
      console.log('⚠️  No source images found, using fallback images');
      this.copyFallbackImages(targetImagesPath);
      return;
    }

    // Copy client images
    const imageFiles = fs.readdirSync(sourceImagesPath);
    let copiedImages = 0;
    
    imageFiles.forEach(file => {
      const sourcePath = path.join(sourceImagesPath, file);
      const targetPath = path.join(targetImagesPath, file);
      
      if (fs.statSync(sourcePath).isFile()) {
        fs.copyFileSync(sourcePath, targetPath);
        copiedImages++;
      }
    });
    
    console.log(`📸 ${copiedImages} images copied to website`);
    
    // Check for missing required images and provide fallbacks
    this.provideFallbackImages(targetImagesPath);
  }

  copyFallbackImages(targetImagesPath) {
    const fallbacks = this.imageSpecs.fallbacks;
    let fallbacksCopied = 0;
    
    Object.entries(fallbacks).forEach(([type, fallbackPath]) => {
      if (Array.isArray(fallbackPath)) {
        // Handle food images array
        fallbackPath.forEach((imgPath, index) => {
          const targetFile = `food-${index + 1}.jpg`;
          this.copyFallbackImage(imgPath, path.join(targetImagesPath, targetFile));
          fallbacksCopied++;
        });
      } else {
        // Handle single images
        const filename = type === 'logo' ? 'logo.png' : `${type}.jpg`;
        this.copyFallbackImage(fallbackPath, path.join(targetImagesPath, filename));
        fallbacksCopied++;
      }
    });
    
    console.log(`📸 ${fallbacksCopied} fallback images provided`);
  }

  copyFallbackImage(fallbackPath, targetPath) {
    const sourcePath = path.join(__dirname, '..', fallbackPath);
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }

  provideFallbackImages(targetImagesPath) {
    const requiredImages = ['logo.png', 'hero.jpg', 'interior.jpg', 'food-1.jpg', 'food-2.jpg', 'food-3.jpg', 'food-4.jpg'];
    
    requiredImages.forEach(filename => {
      const imagePath = path.join(targetImagesPath, filename);
      if (!fs.existsSync(imagePath)) {
        // Provide fallback
        const type = filename.split('.')[0].replace(/-\d+$/, '');
        const fallback = this.imageSpecs.fallbacks[type];
        
        if (fallback) {
          if (Array.isArray(fallback)) {
            const index = parseInt(filename.match(/\d+/)?.[0] || '1') - 1;
            if (fallback[index]) {
              this.copyFallbackImage(fallback[index], imagePath);
            }
          } else {
            this.copyFallbackImage(fallback, imagePath);
          }
        }
      }
    });
  }

  applyColorScheme(generatedPath, colorSchemeId) {
    const styleSheetPath = path.join(generatedPath, 'styles.css');
    if (!fs.existsSync(styleSheetPath)) {
      return;
    }

    let styles = fs.readFileSync(styleSheetPath, 'utf8');
    
    // Replace default theme class in CSS if needed
    const scheme = this.colorSchemes[colorSchemeId];
    if (scheme && scheme.cssClass !== 'theme-warm') {
      styles = styles.replace(/theme-warm/g, scheme.cssClass);
    }
    
    fs.writeFileSync(styleSheetPath, styles);
    
    // Update HTML body class
    const indexPath = path.join(generatedPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      let html = fs.readFileSync(indexPath, 'utf8');
      html = html.replace(/<body[^>]*>/i, `<body class="${scheme.cssClass}">`);
      fs.writeFileSync(indexPath, html);
    }
    
    console.log(`🌈 Applied color scheme: ${scheme.name}`);
  }

  updateProjectConfig(clientPath) {
    const configPath = path.join(clientPath, 'source/config.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    
    config.project.lastGenerated = new Date().toISOString();
    
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  }

  updateBusinessStatus(clientPath) {
    const statusPath = path.join(clientPath, '_business/status.json');
    if (!fs.existsSync(statusPath)) return;
    
    const status = JSON.parse(fs.readFileSync(statusPath, 'utf8'));
    
    if (status.status.current === 'setup' || status.status.current === 'dataCollection') {
      status.status.current = 'development';
      status.status.phases.development.completed = new Date().toISOString();
    }
    
    fs.writeFileSync(statusPath, JSON.stringify(status, null, 2));
  }

  validateWebsite(generatedPath, clientData) {
    const validation = { errors: [], warnings: [] };
    
    // Check for unreplaced placeholders
    const htmlFiles = ['index.html', 'menu.html'].filter(file => 
      fs.existsSync(path.join(generatedPath, file))
    );
    
    htmlFiles.forEach(file => {
      const content = fs.readFileSync(path.join(generatedPath, file), 'utf8');
      const unreplaced = content.match(this.placeholderPattern);
      
      if (unreplaced) {
        validation.warnings.push(`${file}: ${unreplaced.length} unreplaced placeholders found`);
      }
    });
    
    // Check for missing images
    const requiredImages = ['logo.png', 'hero.jpg'];
    requiredImages.forEach(image => {
      if (!fs.existsSync(path.join(generatedPath, 'images', image))) {
        validation.errors.push(`Missing required image: ${image}`);
      }
    });
    
    // Check for empty required fields
    const requiredFields = ['RESTAURANT_NAME', 'PHONE', 'EMAIL'];
    requiredFields.forEach(field => {
      if (!clientData[field] || clientData[field].trim() === '') {
        validation.errors.push(`Missing required field: ${field}`);
      }
    });
    
    return validation;
  }
}

// CLI Usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🍽️  Restaurant Website Generator

Usage:
  node generate-website.js <client-name>

Examples:
  node generate-website.js "Mario's Italian Kitchen"
  node generate-website.js "joe-diner"

This script:
1. Loads client data and configuration
2. Customizes template with client information
3. Processes and optimizes images
4. Applies selected color scheme
5. Validates final output
`);
    process.exit(1);
  }

  const generator = new WebsiteGenerator();
  const [clientName] = args;
  
  generator.generateWebsite(clientName);
}

module.exports = WebsiteGenerator;