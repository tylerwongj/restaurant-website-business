const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const restaurants = [
  // Steakhouse & Grill Specialties
  { name: 'peter-luger', url: 'https://www.peterluger.com', category: 'steakhouse' },
  { name: 'cut-wolfgang-puck', url: 'https://www.wolfgangpuck.com/dining/cut-beverly-hills', category: 'steakhouse' },
  { name: 'st-elmo-steak-house', url: 'https://www.stelmos.com', category: 'steakhouse' },
  
  // Seafood & Coastal Cuisine
  { name: 'le-bernardin', url: 'https://www.le-bernardin.com', category: 'seafood-coastal' },
  { name: 'swan-oyster-depot', url: 'https://www.swanoysterdepot.com', category: 'seafood-coastal' },
  { name: 'the-optimist', url: 'https://www.theoptimistrestaurant.com', category: 'seafood-coastal' },
  
  // Additional Italian (alternative URLs)
  { name: 'il-mulino-backup', url: 'https://ilmulino.com', category: 'italian' },
  
  // Additional French (alternative URLs)
  { name: 'bouchon-bistro-backup', url: 'https://www.thomaskeller.com/bouchonbistro', category: 'french' },
  
  // Additional Asian Fusion
  { name: 'redfarm-backup', url: 'https://redfarmnyc.com', category: 'asian-fusion' }
];

async function captureScreenshots() {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  const results = {
    timestamp: new Date().toISOString(),
    batch: 3,
    total_restaurants: restaurants.length,
    successful_captures: 0,
    failed_captures: 0,
    results: []
  };

  // Create category directories
  const categories = [...new Set(restaurants.map(r => r.category))];
  for (const category of categories) {
    const categoryDir = path.join(__dirname, 'images', category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }
  }

  for (const restaurant of restaurants) {
    try {
      console.log(`Capturing ${restaurant.name}...`);
      
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 800 });
      
      // Set timeout and user agent
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      const response = await page.goto(restaurant.url, { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });
      
      // Wait for additional content to load
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const filename = `${restaurant.category}/${restaurant.name}-screenshot.png`;
      const filepath = path.join(__dirname, 'images', filename);
      
      await page.screenshot({ 
        path: filepath,
        fullPage: false // Capture above-the-fold content
      });
      
      console.log(`✓ Successfully captured ${restaurant.name}`);
      
      results.successful_captures++;
      results.results.push({
        name: restaurant.name,
        url: restaurant.url,
        category: restaurant.category,
        status: 'success',
        filename: filename,
        status_code: response.status()
      });
      
      await page.close();
      
    } catch (error) {
      console.error(`✗ Failed to capture ${restaurant.name}: ${error.message}`);
      
      results.failed_captures++;
      results.results.push({
        name: restaurant.name,
        url: restaurant.url,
        category: restaurant.category,
        status: 'failed',
        error: error.message
      });
    }
    
    // Small delay between captures
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  await browser.close();

  // Save results summary
  const summaryPath = path.join(__dirname, 'images', 'capture-summary-batch-3.json');
  fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));

  console.log('\n=== BATCH 3 CAPTURE SUMMARY ===');
  console.log(`Total restaurants: ${results.total_restaurants}`);
  console.log(`Successful captures: ${results.successful_captures}`);
  console.log(`Failed captures: ${results.failed_captures}`);
  console.log(`Success rate: ${((results.successful_captures / results.total_restaurants) * 100).toFixed(1)}%`);
  console.log(`\nSummary saved to: ${summaryPath}`);
}

// Run the capture
captureScreenshots().catch(console.error);