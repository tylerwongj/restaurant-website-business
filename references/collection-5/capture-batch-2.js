const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Second batch of restaurants
const restaurants = [
  { name: 'guelaguetza', url: 'https://www.ilovemole.com/', category: 'specialty' },
  { name: 'republique', url: 'https://www.republiquela.com/', category: 'specialty' },
  { name: 'zahav', url: 'https://www.zahavrestaurant.com/', category: 'specialty' },
  { name: 'ippudo', url: 'https://www.ippudony.com/', category: 'specialty' },
  { name: 'xian-famous-foods', url: 'https://www.xianfoods.com/', category: 'specialty' },
  { name: 'mendocino-farms', url: 'https://www.mendocinofarms.com/', category: 'fast-casual' },
  { name: 'flower-child', url: 'https://www.flowerchild.com/', category: 'fast-casual' },
  { name: 'honeygrow', url: 'https://honeygrow.com/', category: 'fast-casual' },
  { name: 'noodles-company', url: 'https://www.noodles.com/', category: 'fast-casual' },
  { name: 'tender-greens', url: 'https://www.tendergreens.com/', category: 'fast-casual' }
];

async function captureScreenshots() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log(`🚀 Starting screenshot capture batch 2 for ${restaurants.length} restaurants...`);
  
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
  console.log('\n🎉 Screenshot capture batch 2 complete!');
}

// Run the capture
captureScreenshots().catch(console.error);