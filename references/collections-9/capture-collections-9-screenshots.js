const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Load restaurant data
const restaurantData = JSON.parse(fs.readFileSync('./restaurant-data.json', 'utf8'));

async function captureScreenshots() {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  // Create images directory if it doesn't exist
  const imagesDir = path.join(__dirname, 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  let captureResults = {
    collection: 'collections-9',
    timestamp: new Date().toISOString(),
    totalAttempted: 0,
    successful: 0,
    failed: 0,
    screenshots: []
  };

  // Process all categories
  for (const [category, restaurants] of Object.entries(restaurantData.restaurants)) {
    console.log(`\n📸 Capturing ${category} restaurants...`);
    
    for (const restaurant of restaurants) {
      const filename = `${category}-${restaurant.name}-screenshot.png`;
      const filepath = path.join(imagesDir, filename);
      
      captureResults.totalAttempted++;
      
      try {
        console.log(`Capturing: ${restaurant.name} (${restaurant.url})`);
        
        // Set longer timeout for slow sites
        await page.goto(restaurant.url, { 
          waitUntil: 'networkidle2', 
          timeout: 30000 
        });
        
        // Wait a bit more for any lazy-loaded content
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        await page.screenshot({ 
          path: filepath,
          fullPage: false,
          type: 'png'
        });
        
        captureResults.successful++;
        captureResults.screenshots.push({
          name: restaurant.name,
          category: category,
          url: restaurant.url,
          filename: filename,
          status: 'success'
        });
        
        console.log(`✅ Successfully captured: ${filename}`);
        
      } catch (error) {
        captureResults.failed++;
        captureResults.screenshots.push({
          name: restaurant.name,
          category: category,
          url: restaurant.url,
          filename: filename,
          status: 'failed',
          error: error.message
        });
        
        console.log(`❌ Failed to capture ${restaurant.name}: ${error.message}`);
      }
      
      // Small delay between captures
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  await browser.close();

  // Save capture report
  const reportPath = path.join(__dirname, 'images', 'screenshot-report-collections-9.json');
  fs.writeFileSync(reportPath, JSON.stringify(captureResults, null, 2));

  console.log(`\n📊 Capture Complete!`);
  console.log(`Total attempted: ${captureResults.totalAttempted}`);
  console.log(`Successful: ${captureResults.successful}`);
  console.log(`Failed: ${captureResults.failed}`);
  console.log(`Success rate: ${((captureResults.successful / captureResults.totalAttempted) * 100).toFixed(1)}%`);
  console.log(`Report saved: ${reportPath}`);
}

// Run the capture
captureScreenshots().catch(console.error);