#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class ImageOptimizer {
  constructor() {
    this.clientProjectsPath = path.join(__dirname, '../client-projects');
    this.supportedFormats = ['.jpg', '.jpeg', '.png', '.webp'];
    this.maxSizes = {
      logo: { width: 400, height: 200 },
      hero: { width: 1200, height: 800 },
      interior: { width: 800, height: 600 },
      food: { width: 500, height: 400 }
    };
  }

  optimizeClientImages(clientName, options = {}) {
    try {
      const clientFolder = this.sanitizeClientName(clientName);
      const clientPath = path.join(this.clientProjectsPath, clientFolder);
      
      if (!fs.existsSync(clientPath)) {
        throw new Error(`Client '${clientFolder}' not found`);
      }

      const sourceImagesPath = path.join(clientPath, 'source/images');
      if (!fs.existsSync(sourceImagesPath)) {
        throw new Error('Source images folder not found');
      }

      console.log(`🖼️  Optimizing images for ${clientName}...`);

      const results = {
        processed: 0,
        errors: 0,
        warnings: [],
        sizeSavings: 0
      };

      // Create optimized folder if it doesn't exist
      const optimizedPath = path.join(clientPath, 'source/images-optimized');
      if (!fs.existsSync(optimizedPath)) {
        fs.mkdirSync(optimizedPath, { recursive: true });
      }

      // Process all images
      const imageFiles = fs.readdirSync(sourceImagesPath)
        .filter(file => this.supportedFormats.includes(path.extname(file).toLowerCase()));

      imageFiles.forEach(file => {
        try {
          this.processImage(sourceImagesPath, optimizedPath, file, results, options);
        } catch (error) {
          results.errors++;
          console.log(`❌ Error processing ${file}: ${error.message}`);
        }
      });

      // Display results
      this.displayOptimizationResults(results, options);

      return results;

    } catch (error) {
      console.error('❌ Error optimizing images:', error.message);
      process.exit(1);
    }
  }

  processImage(sourcePath, targetPath, filename, results, options) {
    const sourceFile = path.join(sourcePath, filename);
    const targetFile = path.join(targetPath, filename);
    
    const sourceStats = fs.statSync(sourceFile);
    const originalSize = sourceStats.size;

    // For now, we'll do basic file operations
    // In a production system, you'd use sharp, imagemin, or similar
    this.basicImageOptimization(sourceFile, targetFile, filename, results);

    const targetStats = fs.statSync(targetFile);
    const newSize = targetStats.size;
    const sizeDiff = originalSize - newSize;

    results.processed++;
    results.sizeSavings += Math.max(0, sizeDiff);

    // Check image dimensions and provide recommendations
    this.analyzeImageDimensions(filename, results);

    const sizeReduction = originalSize > 0 ? ((sizeDiff / originalSize) * 100).toFixed(1) : 0;
    
    if (options.verbose) {
      console.log(`   📸 ${filename}: ${this.formatBytes(originalSize)} → ${this.formatBytes(newSize)} (${sizeReduction}% reduction)`);
    }
  }

  basicImageOptimization(sourceFile, targetFile, filename, results) {
    // Basic optimization: copy file and provide recommendations
    fs.copyFileSync(sourceFile, targetFile);

    const stats = fs.statSync(sourceFile);
    const sizeInMB = stats.size / (1024 * 1024);

    // Check file size
    if (sizeInMB > 2) {
      results.warnings.push(`${filename}: Large file size (${sizeInMB.toFixed(1)}MB) - consider compressing`);
    }

    // Check filename for type
    const imageType = this.getImageType(filename);
    if (imageType) {
      const maxSize = this.maxSizes[imageType];
      if (maxSize) {
        // Note: In production, you'd check actual dimensions here
        results.warnings.push(`${filename}: Recommended max size for ${imageType}: ${maxSize.width}x${maxSize.height}px`);
      }
    }
  }

  getImageType(filename) {
    const name = filename.toLowerCase();
    
    if (name.includes('logo')) return 'logo';
    if (name.includes('hero')) return 'hero';
    if (name.includes('interior')) return 'interior';
    if (name.includes('food')) return 'food';
    
    return null;
  }

  analyzeImageDimensions(filename, results) {
    // Placeholder for dimension analysis
    // In production, you'd use a library like sharp to get actual dimensions
    const type = this.getImageType(filename);
    
    if (type && this.maxSizes[type]) {
      const rec = this.maxSizes[type];
      results.warnings.push(`${filename}: Optimize for ${rec.width}x${rec.height}px for best ${type} display`);
    }
  }

  displayOptimizationResults(results, options) {
    console.log('\n📊 Image Optimization Results\n');
    
    console.log(`✅ Processed: ${results.processed} images`);
    
    if (results.sizeSavings > 0) {
      console.log(`💾 Size savings: ${this.formatBytes(results.sizeSavings)}`);
    }
    
    if (results.errors > 0) {
      console.log(`❌ Errors: ${results.errors}`);
    }

    if (results.warnings.length > 0) {
      console.log('\n⚠️  Optimization Recommendations:');
      results.warnings.forEach(warning => {
        console.log(`   ${warning}`);
      });
    }

    console.log('\n💡 Optimization Tips:');
    console.log('   • Use JPEG for photos, PNG for logos with transparency');
    console.log('   • Keep file sizes under 500KB for web use');
    console.log('   • Consider WebP format for better compression');
    console.log('   • Use descriptive filenames (e.g., hero-dining-room.jpg)');
  }

  createImageGuide(clientName) {
    try {
      const clientFolder = this.sanitizeClientName(clientName);
      const clientPath = path.join(this.clientProjectsPath, clientFolder);
      
      if (!fs.existsSync(clientPath)) {
        throw new Error(`Client '${clientFolder}' not found`);
      }

      const guide = `# Image Optimization Guide for ${clientName}

## 📸 Image Requirements

### Logo
- **Format**: PNG with transparent background
- **Size**: 400x200px maximum
- **File size**: Under 100KB
- **Filename**: logo.png

### Hero Image
- **Format**: JPEG or PNG
- **Size**: 1200x800px minimum
- **File size**: Under 500KB
- **Filename**: hero.jpg
- **Tips**: High-quality restaurant interior or signature dish

### Interior Photo
- **Format**: JPEG
- **Size**: 800x600px
- **File size**: Under 400KB
- **Filename**: interior.jpg
- **Tips**: Well-lit dining area showing atmosphere

### Food Photos (4 required)
- **Format**: JPEG
- **Size**: 500x400px each
- **File size**: Under 300KB each
- **Filenames**: food-1.jpg, food-2.jpg, food-3.jpg, food-4.jpg
- **Tips**: Professional food photography with good lighting

## 🛠️ Optimization Tools

### Online Tools (Free)
- **TinyPNG** (tinypng.com) - PNG/JPEG compression
- **Squoosh** (squoosh.app) - Google's image compressor
- **Kraken.io** - Image optimization service

### Desktop Tools
- **ImageOptim** (Mac) - Drag and drop optimization
- **RIOT** (Windows) - Radical Image Optimization Tool
- **GIMP** (Free) - Full-featured image editor

## 📏 Quick Sizing Guide

1. **Take photos at highest quality**
2. **Resize to required dimensions**
3. **Compress for web (80-85% quality)**
4. **Check file size is under limits**
5. **Use descriptive filenames**

## ✅ Pre-Upload Checklist

- [ ] All images under 500KB
- [ ] Correct dimensions for each type
- [ ] Descriptive filenames used
- [ ] Logo has transparent background
- [ ] Food photos show actual dishes
- [ ] Images are bright and well-lit
- [ ] No blurry or low-quality images

## 🚀 Upload Process

1. Place optimized images in \`source/images/\` folder
2. Run: \`node scripts/generate-website.js "${clientName}"\`
3. Images will be automatically integrated into website

---

Need help optimizing? Run: \`node scripts/optimize-images.js "${clientName}"\`
`;

      const guidePath = path.join(clientPath, 'source/IMAGE_OPTIMIZATION.md');
      fs.writeFileSync(guidePath, guide);

      console.log(`✅ Image optimization guide created: ${guidePath}`);

      return guidePath;

    } catch (error) {
      console.error('❌ Error creating image guide:', error.message);
      process.exit(1);
    }
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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
🍽️  Restaurant Image Optimizer

Usage:
  node optimize-images.js <client-name> [options]
  node optimize-images.js --guide <client-name>

Options:
  --verbose     Show detailed processing info
  --guide       Create image optimization guide

Examples:
  node optimize-images.js "Mario's Italian Kitchen"
  node optimize-images.js "Joe's Diner" --verbose
  node optimize-images.js --guide "The Wine Bar"

Features:
  - Analyzes image sizes and formats
  - Provides optimization recommendations
  - Creates optimized versions
  - Generates sizing guidelines
  - Checks for common issues

Note: For production use, install image optimization libraries like 'sharp' or 'imagemin'
`);
    process.exit(1);
  }

  const optimizer = new ImageOptimizer();

  if (args[0] === '--guide') {
    const clientName = args[1];
    if (!clientName) {
      console.error('❌ Client name required for guide');
      process.exit(1);
    }
    optimizer.createImageGuide(clientName);
  } else {
    const clientName = args[0];
    const options = {
      verbose: args.includes('--verbose')
    };
    
    optimizer.optimizeClientImages(clientName, options);
  }
}

module.exports = ImageOptimizer;