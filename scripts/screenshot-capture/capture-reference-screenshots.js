#!/usr/bin/env node

/**
 * Restaurant Website Screenshot Capture Script
 * 
 * This script automatically captures screenshots of restaurant websites
 * from a specified collection and saves them with proper naming.
 * 
 * Requirements: npm install puppeteer
 * Usage: 
 *   node scripts/screenshot-capture/capture-reference-screenshots.js collection-1
 *   node scripts/screenshot-capture/capture-reference-screenshots.js collection-2
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Screenshot configuration
const screenshotConfig = {
  viewport: { width: 1920, height: 1080 },
  fullPage: true,
  quality: 90,
  delay: 3000 // Wait 3 seconds for page to load
};

class ScreenshotCapture {
  constructor(collectionName = 'collection-1') {
    this.browser = null;
    this.collectionName = collectionName;
    this.outputDir = path.join(__dirname, `../../references/${collectionName}/images`);
    this.dataFile = path.join(__dirname, `../../references/${collectionName}/restaurant-data.json`);
    this.successCount = 0;
    this.failCount = 0;
    this.results = [];
    this.restaurants = null;
  }

  loadRestaurantData() {
    try {
      const data = JSON.parse(fs.readFileSync(this.dataFile, 'utf8'));
      this.restaurants = data.restaurants;
      console.log(`📋 Loaded restaurant data from: ${this.collectionName}`);
      console.log(`📄 Collection: ${data.collection} - ${data.description}\n`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to load restaurant data from ${this.dataFile}`);
      console.error(`   Error: ${error.message}`);
      return false;
    }
  }

  async initialize() {
    console.log(`🚀 Starting ${this.collectionName} screenshot capture...\n`);
    
    // Load restaurant data
    if (!this.loadRestaurantData()) {
      throw new Error('Failed to load restaurant data');
    }
    
    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
      console.log(`📁 Created output directory: ${this.outputDir}\n`);
    }

    // Launch browser
    console.log('🌐 Launching browser...');
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });
    console.log('✅ Browser launched successfully\n');
  }

  async captureScreenshot(restaurant, category) {
    const page = await this.browser.newPage();
    
    try {
      // Set viewport and user agent
      await page.setViewport(screenshotConfig.viewport);
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      
      console.log(`📸 Capturing: ${restaurant.name} (${category})`);
      console.log(`   URL: ${restaurant.url}`);
      
      // Navigate to page with timeout
      await page.goto(restaurant.url, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      
      // Wait for page to fully load
      await new Promise(resolve => setTimeout(resolve, screenshotConfig.delay));
      
      // Try to dismiss any cookie banners or popups
      try {
        await page.evaluate(() => {
          // Common cookie banner selectors
          const selectors = [
            '[id*="cookie"]', '[class*="cookie"]',
            '[id*="gdpr"]', '[class*="gdpr"]',
            '[id*="consent"]', '[class*="consent"]',
            '.popup', '.modal', '.overlay'
          ];
          
          selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
              if (el.style) el.style.display = 'none';
            });
          });
        });
      } catch (e) {
        // Ignore errors dismissing popups
      }
      
      // Generate filename
      const filename = `${category}-${restaurant.name}.png`;
      const filepath = path.join(this.outputDir, filename);
      
      // Take screenshot
      await page.screenshot({
        path: filepath,
        fullPage: screenshotConfig.fullPage
      });
      
      this.successCount++;
      this.results.push({
        name: restaurant.name,
        category,
        url: restaurant.url,
        filename,
        status: 'success'
      });
      
      console.log(`   ✅ Saved: ${filename}\n`);
      
    } catch (error) {
      this.failCount++;
      this.results.push({
        name: restaurant.name,
        category,
        url: restaurant.url,
        status: 'failed',
        error: error.message
      });
      
      console.log(`   ❌ Failed: ${error.message}\n`);
    } finally {
      await page.close();
    }
  }

  async captureAll() {
    await this.initialize();
    
    const totalSites = Object.values(this.restaurants).reduce((sum, category) => sum + category.length, 0);
    console.log(`📊 Capturing screenshots for ${totalSites} restaurant websites...\n`);
    
    // Process each category
    for (const [category, sites] of Object.entries(this.restaurants)) {
      console.log(`🍽️  Processing ${category.toUpperCase()} restaurants (${sites.length} sites):`);
      console.log('─'.repeat(60));
      
      for (const restaurant of sites) {
        await this.captureScreenshot(restaurant, category);
        
        // Small delay between requests to be respectful
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    await this.cleanup();
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
    
    console.log(`🎉 ${this.collectionName} screenshot capture completed!`);
    console.log('═'.repeat(60));
    console.log(`✅ Successful: ${this.successCount}`);
    console.log(`❌ Failed: ${this.failCount}`);
    console.log(`📁 Output directory: ${this.outputDir}`);
    console.log('═'.repeat(60));
    
    // Generate summary report
    this.generateReport();
  }

  generateReport() {
    const reportContent = {
      collection: this.collectionName,
      timestamp: new Date().toISOString(),
      summary: {
        total: this.successCount + this.failCount,
        successful: this.successCount,
        failed: this.failCount
      },
      results: this.results,
      categories: {
        luxury: this.results.filter(r => r.category === 'luxury'),
        casual: this.results.filter(r => r.category === 'casual'),
        fastfood: this.results.filter(r => r.category === 'fastfood')
      }
    };
    
    const reportPath = path.join(this.outputDir, `screenshot-report-${this.collectionName}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(reportContent, null, 2));
    console.log(`📋 Report saved: ${reportPath}\n`);
  }
}

// Main execution
async function main() {
  // Get collection name from command line argument
  const collectionName = process.argv[2] || 'collection-1';
  
  console.log(`📋 Using collection: ${collectionName}`);
  
  const capture = new ScreenshotCapture(collectionName);
  
  try {
    await capture.captureAll();
  } catch (error) {
    console.error('💥 Fatal error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = ScreenshotCapture;