const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Third batch - remaining restaurants
const restaurants = [
  { name: 'lemonade', url: 'https://lemonadela.com/', category: 'fast-casual' },
  { name: 'roti-mediterranean', url: 'https://roti.com/', category: 'fast-casual' },
  { name: 'intelligentsia-coffee', url: 'https://www.intelligentsia.com/', category: 'cafes' },
  { name: 'counter-culture-coffee', url: 'https://counterculturecoffee.com/', category: 'cafes' },
  { name: 'philz-coffee', url: 'https://www.philzcoffee.com/', category: 'cafes' },
  { name: 'original-pancake-house', url: 'https://www.originalpancakehouse.com/', category: 'cafes' },
  { name: 'snooze', url: 'https://www.snoozeeatery.com/', category: 'cafes' },
  { name: 'first-watch', url: 'https://www.firstwatch.com/', category: 'cafes' },
  { name: 'yolk', url: 'https://www.eatyolk.com/', category: 'cafes' },
  { name: 'hash-house-a-go-go', url: 'https://www.hashhouseagogo.com/', category: 'cafes' }
];

async function captureScreenshots() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log(`🚀 Starting screenshot capture batch 3 for ${restaurants.length} restaurants...`);
  
  for (let i = 0; i < restaurants.length; i++) {
    const restaurant = restaurants[i];
    const filename = `${restaurant.category}-${restaurant.name}-screenshot.png`;
    const filepath = path.join(__dirname, 'images', restaurant.category, filename);
    
    try {
      console.log(`📸 Capturing ${i + 1}/${restaurants.length}: ${restaurant.name}`);
      
      await page.goto(restaurant.url, { 
        waitUntil: 'networkidle0', 
        timeout: 15000 
      });
      
      // Wait for content to load
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Take screenshot
      await page.screenshot({ 
        path: filepath, 
        fullPage: true,
        type: 'png'
      });
      
      console.log(`✅ Saved: ${filename}`);
      
    } catch (error) {
      console.error(`❌ Failed to capture ${restaurant.name}: ${error.message}`);
    }
    
    // Brief pause between captures
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  await browser.close();
  console.log('\n🎉 Screenshot capture batch 3 complete!');
}

// Run the capture
captureScreenshots().catch(console.error);