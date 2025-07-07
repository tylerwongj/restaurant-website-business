const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const restaurants = [
  { name: 'clinton-street-baking', url: 'https://clintonstreetbaking.com/', category: 'brunch' },
  { name: 'sarabeths', url: 'https://www.sarabeths.com/', category: 'brunch' },
  { name: 'bubbys', url: 'https://www.bubbys.com/', category: 'brunch' },
  { name: 'yolk', url: 'https://www.eatyolk.com/', category: 'brunch' },
  { name: 'hash-house-a-go-go', url: 'https://www.hashhouseagogo.com/', category: 'brunch' },
  { name: 'original-pancake-house', url: 'https://www.originalpancakehouse.com/', category: 'brunch' },
  { name: 'snooze', url: 'https://snoozeeatery.com/', category: 'brunch' },
  { name: 'first-watch', url: 'https://www.firstwatch.com/', category: 'brunch' },
  { name: 'rubys-diner', url: 'https://www.rubys.com/', category: 'brunch' },
  { name: 'kekes-breakfast', url: 'https://www.kekes.com/', category: 'brunch' }
];

async function captureScreenshots() {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  const results = {
    timestamp: new Date().toISOString(),
    category: 'brunch',
    total_restaurants: restaurants.length,
    successful_captures: 0,
    failed_captures: 0,
    results: []
  };

  // Create category directory
  const categoryDir = path.join(__dirname, 'images', 'brunch');
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
  }

  for (const restaurant of restaurants) {
    try {
      console.log(`Capturing ${restaurant.name}...`);
      
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 800 });
      
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      const response = await page.goto(restaurant.url, { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const filename = `${restaurant.category}/${restaurant.name}-screenshot.png`;
      const filepath = path.join(__dirname, 'images', filename);
      
      await page.screenshot({ 
        path: filepath,
        fullPage: false
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
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  await browser.close();

  const summaryPath = path.join(__dirname, 'images', 'capture-summary-brunch.json');
  fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));

  console.log('\n=== BRUNCH CAPTURE SUMMARY ===');
  console.log(`Total restaurants: ${results.total_restaurants}`);
  console.log(`Successful captures: ${results.successful_captures}`);
  console.log(`Failed captures: ${results.failed_captures}`);
  console.log(`Success rate: ${((results.successful_captures / results.total_restaurants) * 100).toFixed(1)}%`);
}

captureScreenshots().catch(console.error);