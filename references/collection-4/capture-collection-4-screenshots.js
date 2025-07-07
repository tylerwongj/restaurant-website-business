const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Load restaurant data
const restaurantData = JSON.parse(fs.readFileSync('./restaurant-data.json', 'utf8'));

async function captureScreenshots() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  const results = [];
  const categories = ['luxury', 'casual', 'fastfood'];
  
  for (const category of categories) {
    const websites = restaurantData.categories[category].websites;
    
    for (const website of websites) {
      try {
        console.log(`Capturing: ${website.name} (${website.url})`);
        
        // Navigate to website
        await page.goto(website.url, { 
          waitUntil: 'networkidle2', 
          timeout: 30000 
        });
        
        // Wait a bit for any dynamic content to load
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Generate filename
        const filename = `${category}-${website.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
        const filepath = path.join(__dirname, 'images', filename);
        
        // Take screenshot
        await page.screenshot({ 
          path: filepath, 
          fullPage: false 
        });
        
        results.push({
          name: website.name,
          url: website.url,
          category: category,
          filename: filename,
          status: 'success',
          timestamp: new Date().toISOString()
        });
        
        console.log(`✓ Saved: ${filename}`);
        
      } catch (error) {
        console.error(`✗ Failed to capture ${website.name}: ${error.message}`);
        results.push({
          name: website.name,
          url: website.url,
          category: category,
          filename: null,
          status: 'failed',
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
      
      // Wait between requests to be respectful
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  await browser.close();
  
  // Generate report
  const report = {
    collection: 'collection-4',
    total_websites: results.length,
    successful: results.filter(r => r.status === 'success').length,
    failed: results.filter(r => r.status === 'failed').length,
    timestamp: new Date().toISOString(),
    results: results
  };
  
  // Save report
  fs.writeFileSync('./images/screenshot-report-collection-4.json', JSON.stringify(report, null, 2));
  
  console.log(`\n=== CAPTURE COMPLETE ===`);
  console.log(`Total: ${report.total_websites}`);
  console.log(`Success: ${report.successful}`);
  console.log(`Failed: ${report.failed}`);
  console.log(`Report saved: images/screenshot-report-collection-4.json`);
}

// Run the capture
captureScreenshots().catch(console.error);