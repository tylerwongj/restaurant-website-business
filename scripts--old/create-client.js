#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class ClientCreator {
  constructor() {
    this.configPath = path.join(__dirname, '../config');
    this.clientProjectsPath = path.join(__dirname, '../client-projects');
    
    // Load configurations
    this.templates = JSON.parse(fs.readFileSync(path.join(this.configPath, 'templates.json'), 'utf8'));
    this.colorSchemes = JSON.parse(fs.readFileSync(path.join(this.configPath, 'color-schemes.json'), 'utf8'));
    this.imageSpecs = JSON.parse(fs.readFileSync(path.join(this.configPath, 'image-specs.json'), 'utf8'));
  }

  createClient(clientName, templateId = 'casual-family', colorScheme = 'warm') {
    try {
      // Validate inputs
      if (!this.templates.templates[templateId]) {
        throw new Error(`Template '${templateId}' not found. Available: ${Object.keys(this.templates.templates).join(', ')}`);
      }
      
      if (!this.colorSchemes[colorScheme]) {
        throw new Error(`Color scheme '${colorScheme}' not found. Available: ${Object.keys(this.colorSchemes).join(', ')}`);
      }

      // Create client folder structure
      const clientFolder = this.sanitizeClientName(clientName);
      const clientPath = path.join(this.clientProjectsPath, clientFolder);
      
      if (fs.existsSync(clientPath)) {
        throw new Error(`Client '${clientFolder}' already exists`);
      }

      // Create directory structure
      this.createDirectoryStructure(clientPath);
      
      // Create configuration files
      this.createClientDataTemplate(clientPath, clientName);
      this.createProjectConfig(clientPath, templateId, colorScheme);
      this.createBusinessTracking(clientPath, clientName);
      
      // Create image specifications guide
      this.createImageGuide(clientPath);
      
      console.log(`✅ Client project created: ${clientFolder}`);
      console.log(`📁 Location: ${clientPath}`);
      console.log(`🎨 Template: ${this.templates.templates[templateId].name}`);
      console.log(`🌈 Color scheme: ${this.colorSchemes[colorScheme].name}`);
      console.log('');
      console.log('📋 Next steps:');
      console.log(`1. Edit source/client-data.json with business information`);
      console.log(`2. Add client images to source/images/`);
      console.log(`3. Run: node scripts/generate-website.js "${clientName}"`);
      
      return clientPath;
      
    } catch (error) {
      console.error('❌ Error creating client:', error.message);
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

  createDirectoryStructure(clientPath) {
    const directories = [
      'source',
      'source/images',
      'generated',
      'generated/website',
      'revisions',
      '_business'
    ];
    
    directories.forEach(dir => {
      fs.mkdirSync(path.join(clientPath, dir), { recursive: true });
    });
  }

  createClientDataTemplate(clientPath, clientName) {
    const template = {
      // Basic Information
      "RESTAURANT_NAME": clientName,
      "TAGLINE": "Delicious food, exceptional service",
      "DESCRIPTION": "A welcoming restaurant serving fresh, quality meals",
      "CUISINE_TYPE": "American",
      
      // Contact Information
      "PHONE": "(555) 123-4567",
      "EMAIL": "info@restaurant.com",
      "FULL_ADDRESS": "123 Main Street, City, State 12345",
      
      // Hours
      "HOURS_MON": "11:00 AM - 9:00 PM",
      "HOURS_TUE": "11:00 AM - 9:00 PM",
      "HOURS_WED": "11:00 AM - 9:00 PM", 
      "HOURS_THU": "11:00 AM - 9:00 PM",
      "HOURS_FRI": "11:00 AM - 10:00 PM",
      "HOURS_SAT": "11:00 AM - 10:00 PM",
      "HOURS_SUN": "12:00 PM - 8:00 PM",
      "WEEKDAY_HOURS": "Monday - Thursday: 11:00 AM - 9:00 PM",
      "WEEKEND_HOURS": "Friday - Saturday: 11:00 AM - 10:00 PM",
      "SUNDAY_HOURS": "Sunday: 12:00 PM - 8:00 PM",
      
      // About Section
      "ABOUT_DESCRIPTION": "Our family-owned restaurant has been serving the community with pride for years. We believe in using fresh, locally-sourced ingredients to create memorable dining experiences for our guests.",
      
      // Location & Maps
      "GOOGLE_MAPS_URL": "https://maps.google.com/?q=123+Main+Street+City+State",
      "GOOGLE_MAPS_EMBED": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.733!2d-118.123456!3d34.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDA3JzI0LjQiTiAxMTjCsDA3JzI0LjQiVw!5e0!3m2!1sen!2sus!4v1234567890",
      
      // Social Media (optional)
      "FACEBOOK_URL": "",
      "INSTAGRAM_URL": "",
      "YELP_URL": "",
      
      // Menu Items
      "MENU_ITEM_1": "Signature Pasta",
      "MENU_DESCRIPTION_1": "Fresh pasta with our house-made sauce and seasonal vegetables",
      "PRICE_1": "18.95",
      
      "MENU_ITEM_2": "Grilled Salmon",
      "MENU_DESCRIPTION_2": "Atlantic salmon with lemon herb butter and roasted vegetables",
      "PRICE_2": "24.95",
      
      "MENU_ITEM_3": "Classic Burger",
      "MENU_DESCRIPTION_3": "Grass-fed beef with lettuce, tomato, and our special sauce",
      "PRICE_3": "16.95",
      
      "MENU_ITEM_4": "Garden Salad",
      "MENU_DESCRIPTION_4": "Mixed greens with fresh vegetables and house vinaigrette",
      "PRICE_4": "12.95",
      
      // Image Paths (relative to generated website)
      "HERO_IMAGE": "images/hero.jpg",
      "LOGO_URL": "images/logo.png",
      "INTERIOR_IMAGE_1": "images/interior.jpg",
      "FOOD_IMAGE_1": "images/food-1.jpg",
      "FOOD_IMAGE_2": "images/food-2.jpg", 
      "FOOD_IMAGE_3": "images/food-3.jpg",
      "FOOD_IMAGE_4": "images/food-4.jpg",
      
      "_INSTRUCTIONS": {
        "NOTE": "Replace all placeholder values with actual client information",
        "REQUIRED_IMAGES": "Add client images to source/images/ folder",
        "IMAGE_FILENAMES": "Use exact filenames: logo.png, hero.jpg, interior.jpg, food-1.jpg, food-2.jpg, food-3.jpg, food-4.jpg",
        "SOCIAL_MEDIA": "Leave URLs empty if not used",
        "GOOGLE_MAPS": "Get embed code from Google Maps > Share > Embed a map"
      }
    };
    
    fs.writeFileSync(
      path.join(clientPath, 'source/client-data.json'),
      JSON.stringify(template, null, 2)
    );
  }

  createProjectConfig(clientPath, templateId, colorScheme) {
    const config = {
      "project": {
        "template": templateId,
        "colorScheme": colorScheme,
        "created": new Date().toISOString(),
        "lastGenerated": null
      },
      "settings": {
        "imageOptimization": true,
        "mobileOptimization": true,
        "seoOptimization": true
      }
    };
    
    fs.writeFileSync(
      path.join(clientPath, 'source/config.json'),
      JSON.stringify(config, null, 2)
    );
  }

  createBusinessTracking(clientPath, clientName) {
    const business = {
      "client": {
        "name": clientName,
        "projectName": this.sanitizeClientName(clientName),
        "created": new Date().toISOString()
      },
      "status": {
        "current": "setup",
        "phases": {
          "setup": { "completed": new Date().toISOString() },
          "dataCollection": { "completed": null },
          "development": { "completed": null },
          "delivery": { "completed": null }
        }
      },
      "billing": {
        "basePrice": 1000,
        "paid": false,
        "deliveryDate": null,
        "revisions": {
          "included": 1,
          "used": 0,
          "additional": []
        }
      },
      "notes": []
    };
    
    fs.writeFileSync(
      path.join(clientPath, '_business/status.json'),
      JSON.stringify(business, null, 2)
    );
  }

  createImageGuide(clientPath) {
    const guide = `# Image Requirements for ${path.basename(clientPath)}

## Required Images

Add these images to the \`source/images/\` folder:

### 🏢 Logo
- **Filename**: \`logo.png\`
- **Format**: PNG with transparent background
- **Size**: 200x100px (flexible)
- **Usage**: Navigation, business cards

### 🖼️ Hero Image  
- **Filename**: \`hero.jpg\`
- **Format**: JPG or PNG
- **Size**: 1200x800px minimum
- **Usage**: Main banner image
- **Tips**: High-quality restaurant interior or signature dish

### 🏠 Interior
- **Filename**: \`interior.jpg\`
- **Format**: JPG or PNG  
- **Size**: 600x400px
- **Usage**: About section
- **Tips**: Well-lit dining area

### 🍽️ Food Photos (4 required)
- **Filenames**: \`food-1.jpg\`, \`food-2.jpg\`, \`food-3.jpg\`, \`food-4.jpg\`
- **Format**: JPG or PNG
- **Size**: 400x300px each
- **Usage**: Menu highlights
- **Tips**: Professional food photography

## Guidelines

- Use natural lighting when possible
- Keep file sizes under 2MB each
- Save in web-optimized quality
- Test images on mobile devices

## Next Steps

1. ✅ Add all required images to \`source/images/\`
2. ✅ Edit \`source/client-data.json\` with business details
3. ✅ Run: \`node scripts/generate-website.js "${path.basename(clientPath)}"\`
`;

    fs.writeFileSync(path.join(clientPath, 'source/IMAGE_REQUIREMENTS.md'), guide);
  }

  listAvailableTemplates() {
    console.log('🎨 Available Templates:\n');
    
    Object.entries(this.templates.templates).forEach(([id, template]) => {
      console.log(`📋 ${id}`);
      console.log(`   Name: ${template.name}`);
      console.log(`   Category: ${template.category}`);
      console.log(`   Description: ${template.description}`);
      console.log(`   Best for: ${template.bestFor.join(', ')}`);
      console.log('');
    });
  }

  listAvailableColorSchemes() {
    console.log('🌈 Available Color Schemes:\n');
    
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
🍽️  Restaurant Client Creator

Usage:
  node create-client.js <client-name> [template] [color-scheme]
  node create-client.js --list-templates
  node create-client.js --list-colors

Examples:
  node create-client.js "Mario's Italian Kitchen"
  node create-client.js "Joe's Diner" fast-casual business
  node create-client.js "The Wine Bar" fine-dining bold

Options:
  --list-templates    Show available templates
  --list-colors      Show available color schemes
`);
    process.exit(1);
  }

  const creator = new ClientCreator();

  if (args[0] === '--list-templates') {
    creator.listAvailableTemplates();
    process.exit(0);
  }

  if (args[0] === '--list-colors') {
    creator.listAvailableColorSchemes();
    process.exit(0);
  }

  const [clientName, templateId, colorScheme] = args;
  creator.createClient(clientName, templateId, colorScheme);
}

module.exports = ClientCreator;