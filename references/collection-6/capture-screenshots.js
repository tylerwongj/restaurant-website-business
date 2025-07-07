const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Read the restaurant data
const restaurantData = JSON.parse(fs.readFileSync('./restaurant-data.json', 'utf8'));

async function captureScreenshots() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const results = {
        captureDate: new Date().toISOString(),
        totalWebsites: restaurantData.websites.length,
        successful: 0,
        failed: 0,
        results: []
    };

    // Create category directories
    const categories = ['food_trucks', 'sports_bars', 'breweries'];
    categories.forEach(category => {
        const dir = `./images/${category}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });

    for (const restaurant of restaurantData.websites) {
        try {
            console.log(`📸 Capturing ${restaurant.name} (${restaurant.url})...`);
            
            const page = await browser.newPage();
            await page.setViewport({ width: 1200, height: 800 });
            
            // Set user agent to avoid bot detection
            await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
            
            // Navigate to the page with timeout
            await page.goto(restaurant.url, { 
                waitUntil: 'networkidle2', 
                timeout: 30000 
            });

            // Wait a bit for any lazy loading
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Generate filename
            const sanitizedName = restaurant.name.toLowerCase()
                .replace(/[^a-z0-9\s]/g, '')
                .replace(/\s+/g, '-');
            const filename = `${restaurant.category}-${sanitizedName}-screenshot.png`;
            const filepath = `./images/${restaurant.category}/${filename}`;

            // Take screenshot
            await page.screenshot({
                path: filepath,
                fullPage: false,
                type: 'png'
            });

            await page.close();

            results.successful++;
            results.results.push({
                id: restaurant.id,
                name: restaurant.name,
                url: restaurant.url,
                category: restaurant.category,
                filename: filename,
                status: 'success',
                timestamp: new Date().toISOString()
            });

            console.log(`✅ Successfully captured ${restaurant.name}`);

        } catch (error) {
            console.error(`❌ Failed to capture ${restaurant.name}: ${error.message}`);
            
            results.failed++;
            results.results.push({
                id: restaurant.id,
                name: restaurant.name,
                url: restaurant.url,
                category: restaurant.category,
                status: 'failed',
                error: error.message,
                timestamp: new Date().toISOString()
            });
        }

        // Small delay between captures
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    await browser.close();

    // Save results
    fs.writeFileSync('./images/capture-summary.json', JSON.stringify(results, null, 2));

    console.log('\n📊 Capture Summary:');
    console.log(`✅ Successful: ${results.successful}`);
    console.log(`❌ Failed: ${results.failed}`);
    console.log(`📁 Results saved to ./images/capture-summary.json`);

    return results;
}

// Run the capture
if (require.main === module) {
    captureScreenshots().catch(console.error);
}

module.exports = captureScreenshots;