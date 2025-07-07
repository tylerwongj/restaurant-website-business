const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Restaurant websites from collection-5
const restaurants = [
  // Specialty Cuisine / Ethnic Restaurants
  { name: 'katzs-delicatessen', url: 'https://katzsdelicatessen.com/', category: 'specialty' },
  { name: 'momofuku', url: 'https://www.momofuku.com/', category: 'specialty' },
  { name: 'russ-daughters', url: 'https://www.russanddaughters.com/', category: 'specialty' },
  { name: 'joes-pizza', url: 'https://www.joespizzanyc.com/', category: 'specialty' },
  { name: 'peter-luger', url: 'https://peterluger.com/', category: 'specialty' },
  { name: 'guelaguetza', url: 'https://www.ilovemole.com/', category: 'specialty' },
  { name: 'republique', url: 'https://www.republiquela.com/', category: 'specialty' },
  { name: 'zahav', url: 'https://www.zahavrestaurant.com/', category: 'specialty' },
  { name: 'ippudo', url: 'https://www.ippudony.com/', category: 'specialty' },
  { name: 'xian-famous-foods', url: 'https://www.xianfoods.com/', category: 'specialty' },
  
  // Modern Fast-Casual / Counter Service
  { name: 'panera-bread', url: 'https://www.panerabread.com/', category: 'fast-casual' },
  { name: 'dig', url: 'https://www.diginn.com/', category: 'fast-casual' },
  { name: 'cava', url: 'https://cava.com/', category: 'fast-casual' },
  { name: 'mendocino-farms', url: 'https://www.mendocinofarms.com/', category: 'fast-casual' },
  { name: 'flower-child', url: 'https://www.flowerchild.com/', category: 'fast-casual' },
  { name: 'honeygrow', url: 'https://honeygrow.com/', category: 'fast-casual' },
  { name: 'noodles-company', url: 'https://www.noodles.com/', category: 'fast-casual' },
  { name: 'lemonade', url: 'https://lemonadela.com/', category: 'fast-casual' },
  { name: 'roti-mediterranean', url: 'https://roti.com/', category: 'fast-casual' },
  { name: 'tender-greens', url: 'https://www.tendergreens.com/', category: 'fast-casual' },
  
  // Cafes / Coffee Shops / Breakfast
  { name: 'blue-bottle-coffee', url: 'https://bluebottlecoffee.com/', category: 'cafes' },
  { name: 'intelligentsia-coffee', url: 'https://www.intelligentsia.com/', category: 'cafes' },
  { name: 'stumptown-coffee', url: 'https://www.stumptowncoffee.com/', category: 'cafes' },
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
        waitUntil: 'networkidle2', 
        timeout: 30000 
      });
      
      // Wait for content to load
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Take screenshot
      await page.screenshot({ 
        path: filepath, 
        fullPage: true,
        type: 'png'
      });
      
      console.log(`✅ Saved: ${filename}`);
      
    } catch (error) {
      console.error(`❌ Failed to capture ${restaurant.name}: ${error.message}`);
      
      // Take a screenshot anyway if the page loaded partially
      try {
        await page.screenshot({ 
          path: filepath, 
          fullPage: true,
          type: 'png'
        });
        console.log(`⚠️  Partial screenshot saved: ${filename}`);
      } catch (screenshotError) {
        console.error(`❌ Screenshot failed completely: ${screenshotError.message}`);
      }
    }
    
    // Brief pause between captures
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  await browser.close();
  console.log('\n🎉 Screenshot capture complete!');
  
  // Generate summary
  const summary = {
    total_captured: restaurants.length,
    categories: {
      specialty: restaurants.filter(r => r.category === 'specialty').length,
      'fast-casual': restaurants.filter(r => r.category === 'fast-casual').length,
      cafes: restaurants.filter(r => r.category === 'cafes').length
    },
    timestamp: new Date().toISOString()
  };
  
  fs.writeFileSync(
    path.join(__dirname, 'images', 'capture-summary.json'),
    JSON.stringify(summary, null, 2)
  );
  
  console.log('\n📊 Summary:');
  console.log(`   • Total screenshots: ${summary.total_captured}`);
  console.log(`   • Specialty cuisine: ${summary.categories.specialty}`);
  console.log(`   • Fast-casual: ${summary.categories['fast-casual']}`);
  console.log(`   • Cafes/Coffee: ${summary.categories.cafes}`);
  console.log(`   • Images saved in: ./images/[category]/`);
}

// Run the capture
captureScreenshots().catch(console.error);