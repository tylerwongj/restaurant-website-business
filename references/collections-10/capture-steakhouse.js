const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const restaurants = [
  { name: 'peter-luger', url: 'https://peterluger.com/', category: 'steakhouse' },
  { name: 'smith-wollensky', url: 'https://www.smithandwollensky.com/', category: 'steakhouse' },
  { name: 'capital-grille', url: 'https://www.thecapitalgrille.com/', category: 'steakhouse' },
  { name: 'mortons', url: 'https://www.mortons.com/', category: 'steakhouse' },
  { name: 'ruths-chris', url: 'https://www.ruthschris.com/', category: 'steakhouse' },
  { name: 'joe-allen', url: 'https://www.joeallenrestaurant.com/', category: 'steakhouse' },
  { name: 'franklin-barbecue', url: 'https://franklinbbq.com/', category: 'steakhouse' },
  { name: 'hill-country-bbq', url: 'https://www.hillcountryny.com/', category: 'steakhouse' },
  { name: 'joes-kansas-city', url: 'https://joeskc.com/', category: 'steakhouse' },
  { name: 'lockhart-smokehouse', url: 'https://lockhartsmokehouse.com/', category: 'steakhouse' }
];

async function captureScreenshots() {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  const results = {
    timestamp: new Date().toISOString(),
    category: 'steakhouse',
    total_restaurants: restaurants.length,
    successful_captures: 0,
    failed_captures: 0,
    results: []
  };

  // Create category directory
  const categoryDir = path.join(__dirname, 'images', 'steakhouse');
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

  const summaryPath = path.join(__dirname, 'images', 'capture-summary-steakhouse.json');
  fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));

  console.log('\n=== STEAKHOUSE CAPTURE SUMMARY ===');
  console.log(`Total restaurants: ${results.total_restaurants}`);
  console.log(`Successful captures: ${results.successful_captures}`);
  console.log(`Failed captures: ${results.failed_captures}`);
  console.log(`Success rate: ${((results.successful_captures / results.total_restaurants) * 100).toFixed(1)}%`);
}

captureScreenshots().catch(console.error);