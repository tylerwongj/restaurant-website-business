const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// First batch of 10 restaurants
const restaurants = [
  { name: 'katzs-delicatessen', url: 'https://katzsdelicatessen.com/', category: 'specialty' },
  { name: 'momofuku', url: 'https://www.momofuku.com/', category: 'specialty' },
  { name: 'russ-daughters', url: 'https://www.russanddaughters.com/', category: 'specialty' },
  { name: 'joes-pizza', url: 'https://www.joespizzanyc.com/', category: 'specialty' },
  { name: 'peter-luger', url: 'https://peterluger.com/', category: 'specialty' },
  { name: 'panera-bread', url: 'https://www.panerabread.com/', category: 'fast-casual' },
  { name: 'dig', url: 'https://www.diginn.com/', category: 'fast-casual' },
  { name: 'cava', url: 'https://cava.com/', category: 'fast-casual' },
  { name: 'blue-bottle-coffee', url: 'https://bluebottlecoffee.com/', category: 'cafes' },
  { name: 'stumptown-coffee', url: 'https://www.stumptowncoffee.com/', category: 'cafes' }
];

async function captureScreenshots() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  // Create category directories
  const categories = ['specialty', 'fast-casual', 'cafes'];
  categories.forEach(category => {
    const categoryDir = path.join(__dirname, 'images', category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }
  });
  
  console.log(`🚀 Starting screenshot capture for ${restaurants.length} restaurants...`);
  
  for (let i = 0; i < restaurants.length; i++) {
    const restaurant = restaurants[i];
    const filename = `${restaurant.category}-${restaurant.name}-screenshot.png`;
    const filepath = path.join(__dirname, 'images', restaurant.category, filename);
    
    try {
      console.log(`📸 Capturing ${i + 1}/${restaurants.length}: ${restaurant.name}`);
      
      await page.goto(restaurant.url, { 
        waitUntil: 'networkidle0', 
        timeout: 20000 
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
  console.log('\n🎉 Screenshot capture complete!');
}

// Run the capture
captureScreenshots().catch(console.error);