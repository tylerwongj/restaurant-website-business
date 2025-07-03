#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class DeliveryPackager {
  constructor() {
    this.clientProjectsPath = path.join(__dirname, '../client-projects');
    this.templatesPath = path.join(__dirname, '../templates');
  }

  packageDelivery(clientName, options = {}) {
    try {
      const clientFolder = this.sanitizeClientName(clientName);
      const clientPath = path.join(this.clientProjectsPath, clientFolder);
      
      if (!fs.existsSync(clientPath)) {
        throw new Error(`Client '${clientFolder}' not found. Run create-client.js first.`);
      }

      const generatedPath = path.join(clientPath, 'generated/website');
      if (!fs.existsSync(generatedPath)) {
        throw new Error(`Generated website not found. Run generate-website.js first.`);
      }

      console.log(`📦 Packaging delivery for ${clientName}...`);

      // Run quality assurance checks
      const qaResults = this.runQualityAssurance(generatedPath, clientPath);
      
      if (qaResults.errors.length > 0 && !options.force) {
        console.log('\n❌ Quality assurance failed:');
        qaResults.errors.forEach(error => console.log(`   ${error}`));
        console.log('\nUse --force flag to package anyway');
        process.exit(1);
      }

      // Create client handoff documentation
      this.createClientDocumentation(clientPath, generatedPath);
      
      // Create delivery package
      const deliveryPath = this.createDeliveryPackage(clientPath, generatedPath, options);
      
      // Update business status
      this.updateBusinessStatus(clientPath);
      
      // Create revision tracking
      this.createRevisionTracking(clientPath, deliveryPath);

      console.log(`✅ Delivery package created successfully!`);
      console.log(`📁 Package: ${deliveryPath}`);
      
      if (qaResults.warnings.length > 0) {
        console.log('\n⚠️  Warnings (please review):');
        qaResults.warnings.forEach(warning => console.log(`   ${warning}`));
      }

      // Display package contents
      this.displayPackageContents(deliveryPath);
      
      console.log('\n📋 Delivery checklist:');
      console.log('   ✅ Website files packaged');
      console.log('   ✅ Client documentation included');
      console.log('   ✅ Setup instructions provided');
      console.log('   ✅ Revision tracking initialized');
      
      return deliveryPath;

    } catch (error) {
      console.error('❌ Error packaging delivery:', error.message);
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

  runQualityAssurance(generatedPath, clientPath) {
    const results = { errors: [], warnings: [] };

    // Check for unreplaced placeholders
    const htmlFiles = fs.readdirSync(generatedPath).filter(file => file.endsWith('.html'));
    const placeholderPattern = /\{\{[A-Z_]+\}\}/g;

    htmlFiles.forEach(file => {
      const content = fs.readFileSync(path.join(generatedPath, file), 'utf8');
      const placeholders = content.match(placeholderPattern);
      
      if (placeholders) {
        results.errors.push(`${file}: Contains unreplaced placeholders: ${placeholders.join(', ')}`);
      }
    });

    // Check required files exist
    const requiredFiles = ['index.html', 'styles.css', 'script.js'];
    requiredFiles.forEach(file => {
      if (!fs.existsSync(path.join(generatedPath, file))) {
        results.errors.push(`Missing required file: ${file}`);
      }
    });

    // Check required images exist
    const requiredImages = ['images/logo.png', 'images/hero.jpg'];
    requiredImages.forEach(image => {
      if (!fs.existsSync(path.join(generatedPath, image))) {
        results.warnings.push(`Missing recommended image: ${image}`);
      }
    });

    // Check for broken internal links
    htmlFiles.forEach(file => {
      const content = fs.readFileSync(path.join(generatedPath, file), 'utf8');
      const localLinks = content.match(/href="(?!http|mailto|tel)([^"]+)"/g) || [];
      
      localLinks.forEach(link => {
        const href = link.match(/href="([^"]+)"/)[1];
        const linkedFile = href.startsWith('#') ? file : href;
        
        if (!href.startsWith('#') && !fs.existsSync(path.join(generatedPath, linkedFile))) {
          results.warnings.push(`${file}: Broken internal link to ${href}`);
        }
      });
    });

    // Check client data completeness
    const clientDataPath = path.join(clientPath, 'source/client-data.json');
    if (fs.existsSync(clientDataPath)) {
      const clientData = JSON.parse(fs.readFileSync(clientDataPath, 'utf8'));
      const requiredFields = ['RESTAURANT_NAME', 'PHONE', 'EMAIL', 'FULL_ADDRESS'];
      
      requiredFields.forEach(field => {
        if (!clientData[field] || clientData[field].trim() === '') {
          results.errors.push(`Missing required client data: ${field}`);
        }
      });
    }

    console.log(`🔍 Quality assurance: ${results.errors.length} errors, ${results.warnings.length} warnings`);
    return results;
  }

  createClientDocumentation(clientPath, generatedPath) {
    const clientDocsPath = path.join(clientPath, 'generated/client-docs');
    fs.mkdirSync(clientDocsPath, { recursive: true });

    // Load client data for personalized instructions
    const clientData = JSON.parse(fs.readFileSync(path.join(clientPath, 'source/client-data.json'), 'utf8'));
    const businessName = clientData.RESTAURANT_NAME || 'Your Restaurant';

    // Create hosting setup guide
    const hostingGuide = `# Website Setup Guide for ${businessName}

## 📁 Your Website Files

You've received a complete website package containing:
- \`index.html\` - Your homepage
- \`menu.html\` - Your menu page
- \`styles.css\` - Visual styling
- \`script.js\` - Interactive features
- \`images/\` - All your photos and graphics

## 🌐 Publishing Your Website

### Option 1: Simple Web Hosting (Recommended)
1. **Choose a hosting provider** (we recommend):
   - Bluehost, SiteGround, or HostGator for beginners
   - Netlify or Vercel for free hosting
   
2. **Upload your files**:
   - Log into your hosting control panel
   - Find "File Manager" or "FTP"
   - Upload all files to the \`public_html\` or \`www\` folder
   
3. **Your website is live!**
   - Visit your domain to see the website

### Option 2: Free Hosting (Netlify)
1. Go to [netlify.com](https://netlify.com)
2. Sign up for a free account
3. Drag and drop your website folder
4. Get a free .netlify.app domain instantly

## 📧 Contact Form Setup

Your contact form needs email configuration:

1. **Find this line in your HTML**:
   \`<form action="mailto:${clientData.EMAIL}" method="post">\`

2. **For better functionality, consider**:
   - Formspree.io (free form handling)
   - EmailJS (client-side email sending)
   - Your hosting provider's form tools

## 🔧 Making Simple Changes

### Changing Text
- Open any .html file in a text editor
- Find the text you want to change
- Save and re-upload the file

### Changing Images
- Replace images in the \`images/\` folder
- Keep the same filenames
- Recommended sizes: Logo (200x100), Hero (1200x800), Food (400x300)

### Changing Colors
- The website uses a pre-selected color scheme
- For advanced changes, edit \`styles.css\`

## 📱 Mobile Optimization

Your website is already mobile-friendly and will work perfectly on:
- Smartphones and tablets
- All major browsers
- Desktop computers

## 🔒 Security & Maintenance

- Keep regular backups of your website files
- Update content seasonally (menu changes, new photos)
- Monitor website performance monthly

## 📞 Support

**Website Revisions**: Additional changes beyond the initial delivery are available for $100 per revision round.

**Technical Questions**: Consult your hosting provider for server-related issues.

---

Congratulations on your new website! 🎉
`;

    fs.writeFileSync(path.join(clientDocsPath, 'SETUP_GUIDE.md'), hostingGuide);

    // Create domain setup guide
    const domainGuide = `# Domain & Hosting Setup for ${businessName}

## 🌐 Getting Your Domain Name

### If you don't have a domain yet:
1. **Choose a domain registrar**:
   - Namecheap, GoDaddy, or Google Domains
   
2. **Pick your domain name**:
   - yourrestaurantname.com
   - Keep it short and memorable
   - Avoid hyphens and numbers

3. **Purchase the domain** (typically $10-15/year)

## 🏠 Connecting Domain to Hosting

### If using traditional hosting:
1. **Get nameservers from your hosting provider**
   - Usually something like: ns1.hostingcompany.com
   
2. **Update domain DNS**:
   - Log into your domain registrar
   - Find "DNS" or "Nameservers" settings
   - Update to your hosting provider's nameservers
   
3. **Wait 24-48 hours** for DNS propagation

### If using Netlify (free option):
1. **Custom domain setup**:
   - Go to Site settings > Domain management
   - Add your domain name
   - Follow Netlify's DNS instructions

## 📧 Email Setup

Set up professional email addresses:
- info@${businessName.toLowerCase().replace(/\s+/g, '')}.com
- orders@${businessName.toLowerCase().replace(/\s+/g, '')}.com

### Options:
- **Google Workspace** ($6/month per user)
- **Your hosting provider** (often included)
- **Zoho Mail** (free tier available)

## ✅ Go-Live Checklist

- [ ] Domain purchased and configured
- [ ] Hosting account set up
- [ ] Website files uploaded
- [ ] Email addresses configured
- [ ] Test website on mobile and desktop
- [ ] Submit to Google My Business
- [ ] Add to social media profiles

---

Need help? Most hosting providers offer free setup assistance!
`;

    fs.writeFileSync(path.join(clientDocsPath, 'DOMAIN_SETUP.md'), domainGuide);

    // Create maintenance guide
    const maintenanceGuide = `# Website Maintenance Guide for ${businessName}

## 🔄 Regular Updates (Monthly)

### Menu Updates
1. Open \`menu.html\` in a text editor
2. Update prices, items, or descriptions
3. Save and re-upload to your hosting

### Photo Updates
1. Replace images in the \`images/\` folder
2. Keep the same filenames for automatic updates
3. Optimize images for web (under 500KB each)

### Hours & Contact Info
1. Edit \`index.html\` 
2. Find the contact section
3. Update hours, phone, or address
4. Save and re-upload

## 📊 Performance Monitoring

### Monthly Checks
- [ ] Website loads quickly (under 3 seconds)
- [ ] All images display properly
- [ ] Contact form works correctly
- [ ] Mobile version looks good
- [ ] Check Google My Business listing

### Tools for Monitoring
- **Google PageSpeed Insights** (free speed test)
- **GTmetrix** (performance analysis)
- **Google Analytics** (visitor tracking)

## 🔒 Security Best Practices

- Keep hosting account password secure
- Regular backups (monthly)
- Monitor for broken links
- Update contact information promptly

## 📈 SEO & Marketing

### Simple SEO Tips
- Keep content fresh with seasonal updates
- Add new photos regularly
- Respond to online reviews
- Post on social media weekly

### Google My Business
- Keep hours updated
- Post photos of new dishes
- Respond to customer reviews
- Add special offers or events

## 🆘 Common Issues & Solutions

### Website Not Loading
1. Check domain/hosting account status
2. Verify DNS settings
3. Contact hosting provider

### Images Not Showing
1. Check image file names match HTML
2. Verify images uploaded to correct folder
3. Ensure images aren't too large (under 2MB)

### Contact Form Not Working
1. Verify email address in form code
2. Check hosting provider's form settings
3. Consider upgrading to hosted form solution

---

**Remember**: Your website is designed to work reliably with minimal maintenance. Focus on keeping content fresh and engaging for your customers!
`;

    fs.writeFileSync(path.join(clientDocsPath, 'MAINTENANCE.md'), maintenanceGuide);

    console.log('📚 Client documentation created');
  }

  createDeliveryPackage(clientPath, generatedPath, options) {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const clientFolder = path.basename(clientPath);
    const deliveryFileName = `${clientFolder}-website-${timestamp}.zip`;
    const deliveryPath = path.join(clientPath, 'generated', deliveryFileName);

    // Create temporary packaging directory
    const tempDir = path.join(clientPath, 'generated/temp-package');
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true });
    }
    fs.mkdirSync(tempDir, { recursive: true });

    // Copy website files
    this.copyDirectory(generatedPath, path.join(tempDir, 'website'));
    
    // Copy client documentation
    const clientDocsPath = path.join(clientPath, 'generated/client-docs');
    if (fs.existsSync(clientDocsPath)) {
      this.copyDirectory(clientDocsPath, path.join(tempDir, 'setup-guides'));
    }

    // Create README for client
    const readmeContent = `# ${path.basename(clientPath)} Website Delivery

## 📁 Package Contents

- \`website/\` - Your complete website files
- \`setup-guides/\` - Step-by-step setup instructions

## 🚀 Quick Start

1. Read \`setup-guides/SETUP_GUIDE.md\` first
2. Choose your hosting option (recommendations included)
3. Upload all files from the \`website/\` folder
4. Configure your domain and email

## 📞 Support

- **Included**: One revision round if needed
- **Additional revisions**: $100 per round
- **Technical hosting support**: Contact your hosting provider

## ✅ Delivery Checklist

- [ ] Website files complete and tested
- [ ] Setup guides provided
- [ ] Domain/hosting recommendations included
- [ ] Contact form configured
- [ ] Mobile optimization verified

---

Thank you for choosing our services! 🎉

Generated on: ${new Date().toLocaleString()}
Package: ${deliveryFileName}
`;

    fs.writeFileSync(path.join(tempDir, 'README.md'), readmeContent);

    // Create ZIP package
    try {
      const zipCommand = `cd "${path.dirname(tempDir)}" && zip -r "${deliveryFileName}" "${path.basename(tempDir)}"`;
      execSync(zipCommand, { stdio: 'pipe' });
      
      // Clean up temp directory
      fs.rmSync(tempDir, { recursive: true });
      
    } catch (error) {
      console.log('⚠️  ZIP creation failed, using folder delivery instead');
      // Rename temp directory as final package
      fs.renameSync(tempDir, path.join(clientPath, 'generated', `${clientFolder}-website-${timestamp}`));
      return path.join(clientPath, 'generated', `${clientFolder}-website-${timestamp}`);
    }

    return deliveryPath;
  }

  copyDirectory(source, destination) {
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    const items = fs.readdirSync(source);
    
    items.forEach(item => {
      const sourcePath = path.join(source, item);
      const destPath = path.join(destination, item);
      
      if (fs.statSync(sourcePath).isDirectory()) {
        this.copyDirectory(sourcePath, destPath);
      } else {
        fs.copyFileSync(sourcePath, destPath);
      }
    });
  }

  updateBusinessStatus(clientPath) {
    const statusPath = path.join(clientPath, '_business/status.json');
    if (!fs.existsSync(statusPath)) return;
    
    const status = JSON.parse(fs.readFileSync(statusPath, 'utf8'));
    
    status.status.current = 'delivery';
    status.status.phases.delivery.completed = new Date().toISOString();
    status.billing.deliveryDate = new Date().toISOString();
    
    fs.writeFileSync(statusPath, JSON.stringify(status, null, 2));
  }

  createRevisionTracking(clientPath, deliveryPath) {
    const revisionPath = path.join(clientPath, 'revisions');
    const revisionNumber = fs.readdirSync(revisionPath).length + 1;
    const revisionFolder = path.join(revisionPath, `revision-${revisionNumber}`);
    
    fs.mkdirSync(revisionFolder, { recursive: true });
    
    const revisionData = {
      revisionNumber,
      type: 'initial-delivery',
      deliveryDate: new Date().toISOString(),
      packagePath: path.relative(clientPath, deliveryPath),
      changes: ['Initial website delivery'],
      billable: false
    };
    
    fs.writeFileSync(
      path.join(revisionFolder, 'revision-info.json'),
      JSON.stringify(revisionData, null, 2)
    );
    
    // Copy delivery package to revision folder
    if (fs.existsSync(deliveryPath)) {
      fs.copyFileSync(deliveryPath, path.join(revisionFolder, path.basename(deliveryPath)));
    }
  }

  displayPackageContents(packagePath) {
    console.log('\n📦 Package contents:');
    
    if (packagePath.endsWith('.zip')) {
      console.log(`   📁 ${path.basename(packagePath)} (ZIP archive)`);
      console.log('   ├── website/ (all website files)');
      console.log('   ├── setup-guides/ (hosting instructions)');
      console.log('   └── README.md (quick start guide)');
    } else {
      // Display directory contents
      if (fs.existsSync(packagePath)) {
        const contents = fs.readdirSync(packagePath);
        contents.forEach((item, index) => {
          const isLast = index === contents.length - 1;
          const prefix = isLast ? '   └──' : '   ├──';
          console.log(`${prefix} ${item}`);
        });
      }
    }
  }
}

// CLI Usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🍽️  Restaurant Delivery Packager

Usage:
  node package-delivery.js <client-name> [options]

Options:
  --force     Package even if quality assurance fails

Examples:
  node package-delivery.js "Mario's Italian Kitchen"
  node package-delivery.js "Joe's Diner" --force

This script:
1. Runs quality assurance checks
2. Creates client documentation
3. Packages website for delivery
4. Updates business tracking
5. Initializes revision system
`);
    process.exit(1);
  }

  const packager = new DeliveryPackager();
  const clientName = args[0];
  const options = {
    force: args.includes('--force')
  };
  
  packager.packageDelivery(clientName, options);
}

module.exports = DeliveryPackager;