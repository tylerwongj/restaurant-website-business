#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class WebsiteValidator {
  constructor() {
    this.clientProjectsPath = path.join(__dirname, '../client-projects');
  }

  validateWebsite(clientName, options = {}) {
    try {
      const clientFolder = this.sanitizeClientName(clientName);
      const clientPath = path.join(this.clientProjectsPath, clientFolder);
      
      if (!fs.existsSync(clientPath)) {
        throw new Error(`Client '${clientFolder}' not found`);
      }

      const generatedPath = path.join(clientPath, 'generated/website');
      if (!fs.existsSync(generatedPath)) {
        throw new Error(`Generated website not found. Run generate-website.js first.`);
      }

      console.log(`🔍 Validating website for ${clientName}...`);

      const results = {
        errors: [],
        warnings: [],
        passed: [],
        score: 0,
        maxScore: 0
      };

      // Run validation checks
      this.validateRequiredFiles(generatedPath, results);
      this.validatePlaceholders(generatedPath, results);
      this.validateImages(generatedPath, results);
      this.validateLinks(generatedPath, results);
      this.validateClientData(clientPath, results);
      this.validateMobileOptimization(generatedPath, results);
      this.validateSEO(generatedPath, results);
      this.validatePerformance(generatedPath, results);
      this.validateAccessibility(generatedPath, results);

      // Calculate score
      results.score = Math.round((results.passed.length / results.maxScore) * 100);

      // Display results
      this.displayResults(results, options);

      return results;

    } catch (error) {
      console.error('❌ Error validating website:', error.message);
      process.exit(1);
    }
  }

  validateRequiredFiles(generatedPath, results) {
    const requiredFiles = [
      { file: 'index.html', description: 'Homepage' },
      { file: 'styles.css', description: 'Stylesheet' },
      { file: 'script.js', description: 'JavaScript functionality' }
    ];

    const optionalFiles = [
      { file: 'menu.html', description: 'Menu page' }
    ];

    requiredFiles.forEach(({ file, description }) => {
      results.maxScore++;
      if (fs.existsSync(path.join(generatedPath, file))) {
        results.passed.push(`Required file exists: ${file}`);
      } else {
        results.errors.push(`Missing required file: ${file} (${description})`);
      }
    });

    optionalFiles.forEach(({ file, description }) => {
      if (fs.existsSync(path.join(generatedPath, file))) {
        results.passed.push(`Optional file present: ${file}`);
      } else {
        results.warnings.push(`Optional file missing: ${file} (${description})`);
      }
    });
  }

  validatePlaceholders(generatedPath, results) {
    const placeholderPattern = /\{\{[A-Z_]+\}\}/g;
    const htmlFiles = fs.readdirSync(generatedPath).filter(file => file.endsWith('.html'));

    results.maxScore++;
    let hasUnreplacedPlaceholders = false;

    htmlFiles.forEach(file => {
      const content = fs.readFileSync(path.join(generatedPath, file), 'utf8');
      const placeholders = content.match(placeholderPattern);
      
      if (placeholders) {
        hasUnreplacedPlaceholders = true;
        results.errors.push(`${file}: Unreplaced placeholders found: ${placeholders.join(', ')}`);
      }
    });

    if (!hasUnreplacedPlaceholders) {
      results.passed.push('All placeholders properly replaced');
    }
  }

  validateImages(generatedPath, results) {
    const imagesPath = path.join(generatedPath, 'images');
    
    results.maxScore += 2; // Required images + image directory

    if (!fs.existsSync(imagesPath)) {
      results.errors.push('Images directory missing');
      return;
    } else {
      results.passed.push('Images directory exists');
    }

    const requiredImages = [
      'logo.png',
      'hero.jpg'
    ];

    const recommendedImages = [
      'interior.jpg',
      'food-1.jpg',
      'food-2.jpg',
      'food-3.jpg',
      'food-4.jpg'
    ];

    let requiredImagesFound = 0;
    
    requiredImages.forEach(image => {
      if (fs.existsSync(path.join(imagesPath, image))) {
        requiredImagesFound++;
      } else {
        results.errors.push(`Missing required image: ${image}`);
      }
    });

    if (requiredImagesFound === requiredImages.length) {
      results.passed.push('All required images present');
    }

    recommendedImages.forEach(image => {
      if (!fs.existsSync(path.join(imagesPath, image))) {
        results.warnings.push(`Missing recommended image: ${image}`);
      }
    });

    // Check image file sizes
    if (fs.existsSync(imagesPath)) {
      const imageFiles = fs.readdirSync(imagesPath);
      imageFiles.forEach(image => {
        const imagePath = path.join(imagesPath, image);
        const stats = fs.statSync(imagePath);
        const sizeInMB = stats.size / (1024 * 1024);
        
        if (sizeInMB > 2) {
          results.warnings.push(`Large image file: ${image} (${sizeInMB.toFixed(1)}MB) - consider optimizing`);
        }
      });
    }
  }

  validateLinks(generatedPath, results) {
    const htmlFiles = fs.readdirSync(generatedPath).filter(file => file.endsWith('.html'));
    
    results.maxScore++;
    let brokenLinks = 0;

    htmlFiles.forEach(file => {
      const content = fs.readFileSync(path.join(generatedPath, file), 'utf8');
      
      // Check for internal links
      const localLinks = content.match(/href="(?!http|mailto|tel)([^"#]+)"/g) || [];
      
      localLinks.forEach(link => {
        const href = link.match(/href="([^"]+)"/)[1];
        const linkedFile = href.startsWith('/') ? href.slice(1) : href;
        
        if (!fs.existsSync(path.join(generatedPath, linkedFile))) {
          results.errors.push(`${file}: Broken internal link to ${href}`);
          brokenLinks++;
        }
      });

      // Check for image sources
      const imageSources = content.match(/src="([^"]+)"/g) || [];
      
      imageSources.forEach(src => {
        const srcPath = src.match(/src="([^"]+)"/)[1];
        if (!srcPath.startsWith('http') && !srcPath.startsWith('data:')) {
          const imageFile = srcPath.startsWith('/') ? srcPath.slice(1) : srcPath;
          if (!fs.existsSync(path.join(generatedPath, imageFile))) {
            results.errors.push(`${file}: Missing image ${srcPath}`);
            brokenLinks++;
          }
        }
      });
    });

    if (brokenLinks === 0) {
      results.passed.push('No broken internal links found');
    }
  }

  validateClientData(clientPath, results) {
    const clientDataPath = path.join(clientPath, 'source/client-data.json');
    
    results.maxScore++;

    if (!fs.existsSync(clientDataPath)) {
      results.errors.push('Client data file missing');
      return;
    }

    const clientData = JSON.parse(fs.readFileSync(clientDataPath, 'utf8'));
    
    const requiredFields = [
      'RESTAURANT_NAME',
      'PHONE',
      'EMAIL',
      'FULL_ADDRESS'
    ];

    const missingFields = requiredFields.filter(field => 
      !clientData[field] || clientData[field].trim() === ''
    );

    if (missingFields.length === 0) {
      results.passed.push('All required client data fields completed');
    } else {
      results.errors.push(`Missing required client data: ${missingFields.join(', ')}`);
    }

    // Validate email format
    if (clientData.EMAIL) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(clientData.EMAIL)) {
        results.warnings.push('Email format appears invalid');
      }
    }

    // Validate phone format
    if (clientData.PHONE) {
      const phoneRegex = /[\d\s\-\(\)\+]/;
      if (!phoneRegex.test(clientData.PHONE)) {
        results.warnings.push('Phone format may need review');
      }
    }
  }

  validateMobileOptimization(generatedPath, results) {
    const indexPath = path.join(generatedPath, 'index.html');
    
    results.maxScore++;

    if (!fs.existsSync(indexPath)) {
      return;
    }

    const content = fs.readFileSync(indexPath, 'utf8');
    
    // Check viewport meta tag
    if (content.includes('viewport')) {
      results.passed.push('Mobile viewport meta tag present');
    } else {
      results.errors.push('Missing mobile viewport meta tag');
    }

    // Check for responsive design indicators
    const styleContent = fs.existsSync(path.join(generatedPath, 'styles.css')) 
      ? fs.readFileSync(path.join(generatedPath, 'styles.css'), 'utf8')
      : '';

    if (styleContent.includes('@media') || styleContent.includes('responsive')) {
      results.passed.push('Responsive design CSS detected');
    } else {
      results.warnings.push('Limited responsive design CSS detected');
    }
  }

  validateSEO(generatedPath, results) {
    const indexPath = path.join(generatedPath, 'index.html');
    
    results.maxScore += 2;

    if (!fs.existsSync(indexPath)) {
      return;
    }

    const content = fs.readFileSync(indexPath, 'utf8');
    
    // Check title tag
    if (content.includes('<title>') && !content.includes('<title>Template')) {
      results.passed.push('Custom page title present');
    } else {
      results.errors.push('Missing or generic page title');
    }

    // Check meta description
    if (content.includes('meta name="description"')) {
      results.passed.push('Meta description present');
    } else {
      results.warnings.push('Missing meta description for SEO');
    }

    // Check heading structure
    if (content.includes('<h1>')) {
      results.passed.push('Main heading (H1) present');
    } else {
      results.warnings.push('Missing main heading (H1) for SEO');
    }

    // Check alt attributes on images
    const images = content.match(/<img[^>]*>/g) || [];
    const imagesWithoutAlt = images.filter(img => !img.includes('alt='));
    
    if (imagesWithoutAlt.length === 0 && images.length > 0) {
      results.passed.push('All images have alt attributes');
    } else if (imagesWithoutAlt.length > 0) {
      results.warnings.push(`${imagesWithoutAlt.length} images missing alt attributes`);
    }
  }

  validatePerformance(generatedPath, results) {
    results.maxScore++;

    const cssPath = path.join(generatedPath, 'styles.css');
    const jsPath = path.join(generatedPath, 'script.js');
    
    let totalSize = 0;
    let fileCount = 0;

    [cssPath, jsPath].forEach(filePath => {
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        totalSize += stats.size;
        fileCount++;
      }
    });

    // Check image sizes
    const imagesPath = path.join(generatedPath, 'images');
    if (fs.existsSync(imagesPath)) {
      const imageFiles = fs.readdirSync(imagesPath);
      imageFiles.forEach(image => {
        const imagePath = path.join(imagesPath, image);
        const stats = fs.statSync(imagePath);
        totalSize += stats.size;
        fileCount++;
      });
    }

    const totalSizeInMB = totalSize / (1024 * 1024);
    
    if (totalSizeInMB < 5) {
      results.passed.push(`Good total file size: ${totalSizeInMB.toFixed(1)}MB`);
    } else {
      results.warnings.push(`Large total file size: ${totalSizeInMB.toFixed(1)}MB - consider optimization`);
    }
  }

  validateAccessibility(generatedPath, results) {
    const indexPath = path.join(generatedPath, 'index.html');
    
    results.maxScore++;

    if (!fs.existsSync(indexPath)) {
      return;
    }

    const content = fs.readFileSync(indexPath, 'utf8');
    
    // Check lang attribute
    if (content.includes('lang=')) {
      results.passed.push('Language attribute present');
    } else {
      results.warnings.push('Missing language attribute for accessibility');
    }

    // Check for skip links or navigation
    if (content.includes('skip') || content.includes('nav')) {
      results.passed.push('Navigation structure detected');
    }

    // Basic color contrast check (simplified)
    const styleContent = fs.existsSync(path.join(generatedPath, 'styles.css'))
      ? fs.readFileSync(path.join(generatedPath, 'styles.css'), 'utf8')
      : '';
    
    if (styleContent.includes('color') && styleContent.includes('background')) {
      results.passed.push('Color styling applied');
    }
  }

  displayResults(results, options = {}) {
    console.log('\n📊 Validation Results\n');
    
    // Score display
    const scoreColor = results.score >= 90 ? '🟢' : results.score >= 70 ? '🟡' : '🔴';
    console.log(`${scoreColor} Overall Score: ${results.score}% (${results.passed.length}/${results.maxScore} checks passed)\n`);

    // Errors
    if (results.errors.length > 0) {
      console.log('❌ Errors (Must Fix):');
      results.errors.forEach(error => console.log(`   ${error}`));
      console.log('');
    }

    // Warnings
    if (results.warnings.length > 0) {
      console.log('⚠️  Warnings (Recommended):');
      results.warnings.forEach(warning => console.log(`   ${warning}`));
      console.log('');
    }

    // Passed checks (if verbose)
    if (options.verbose && results.passed.length > 0) {
      console.log('✅ Passed Checks:');
      results.passed.forEach(passed => console.log(`   ${passed}`));
      console.log('');
    }

    // Summary
    console.log('📋 Summary:');
    console.log(`   ✅ Passed: ${results.passed.length}`);
    console.log(`   ⚠️  Warnings: ${results.warnings.length}`);
    console.log(`   ❌ Errors: ${results.errors.length}`);
    
    if (results.errors.length === 0) {
      console.log('\n🎉 Website ready for delivery!');
    } else {
      console.log('\n🔧 Please fix errors before delivery');
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
}

// CLI Usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🍽️  Restaurant Website Validator

Usage:
  node validate-website.js <client-name> [options]

Options:
  --verbose     Show all passed checks
  --score-only  Show only the score

Examples:
  node validate-website.js "Mario's Italian Kitchen"
  node validate-website.js "Joe's Diner" --verbose
  node validate-website.js "The Wine Bar" --score-only

Validation Categories:
  - Required files and structure
  - Placeholder replacement
  - Image optimization and presence
  - Internal link validation
  - Client data completeness
  - Mobile optimization
  - SEO fundamentals
  - Performance basics
  - Accessibility basics
`);
    process.exit(1);
  }

  const validator = new WebsiteValidator();
  const clientName = args[0];
  
  const options = {
    verbose: args.includes('--verbose'),
    scoreOnly: args.includes('--score-only')
  };
  
  const results = validator.validateWebsite(clientName, options);
  
  if (options.scoreOnly) {
    console.log(results.score);
  }
  
  // Exit with error code if validation failed
  process.exit(results.errors.length > 0 ? 1 : 0);
}

module.exports = WebsiteValidator;