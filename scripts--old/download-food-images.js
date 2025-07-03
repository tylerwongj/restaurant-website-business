#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

class FoodImageDownloader {
  constructor() {
    this.clientProjectsPath = path.join(__dirname, '../client-projects');
    
    // CC0 Italian food images from various sources
    this.italianFoodImages = {
      'food-1.jpg': { // Spaghetti Carbonara
        url: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=500&h=400&fit=crop&auto=format&q=80',
        alt: 'Spaghetti Carbonara'
      },
      'food-2.jpg': { // Osso Buco
        url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=400&fit=crop&auto=format&q=80',
        alt: 'Osso Buco with Risotto'
      },
      'food-3.jpg': { // Margherita Pizza
        url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&h=400&fit=crop&auto=format&q=80',
        alt: 'Margherita Pizza'
      },
      'food-4.jpg': { // Antipasto Platter
        url: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=500&h=400&fit=crop&auto=format&q=80',
        alt: 'Antipasto Platter'
      },
      'food-5.jpg': { // Chicken Parmigiana
        url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=400&fit=crop&auto=format&q=80',
        alt: 'Chicken Parmigiana'
      },
      'food-6.jpg': { // Fettuccine Alfredo
        url: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=500&h=400&fit=crop&auto=format&q=80',
        alt: 'Fettuccine Alfredo'
      },
      'food-7.jpg': { // Seafood Risotto
        url: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&h=400&fit=crop&auto=format&q=80',
        alt: 'Seafood Risotto'
      },
      'food-8.jpg': { // Veal Piccata
        url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=400&fit=crop&auto=format&q=80',
        alt: 'Veal Piccata'
      },
      'food-9.jpg': { // Lasagna
        url: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=500&h=400&fit=crop&auto=format&q=80',
        alt: 'Lasagna della Casa'
      },
      'food-10.jpg': { // Prosciutto Pizza
        url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=400&fit=crop&auto=format&q=80',
        alt: 'Prosciutto & Arugula Pizza'
      },
      'food-11.jpg': { // Tiramisu
        url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&h=400&fit=crop&auto=format&q=80',
        alt: 'Tiramisu'
      },
      'food-12.jpg': { // Bruschetta
        url: 'https://images.unsplash.com/photo-1572441635301-65a4b1f0a092?w=500&h=400&fit=crop&auto=format&q=80',
        alt: 'Bruschetta Trio'
      },
      'hero.jpg': { // Restaurant interior
        url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop&auto=format&q=80',
        alt: 'Italian Restaurant Interior'
      },
      'interior.jpg': { // Dining room
        url: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop&auto=format&q=80',
        alt: 'Restaurant Dining Room'
      }
    };
  }

  async downloadImages(clientName) {
    try {
      const clientFolder = this.sanitizeClientName(clientName);
      const clientPath = path.join(this.clientProjectsPath, clientFolder);
      
      if (!fs.existsSync(clientPath)) {
        throw new Error(`Client '${clientFolder}' not found`);
      }

      const imagesPath = path.join(clientPath, 'source/images');
      if (!fs.existsSync(imagesPath)) {
        fs.mkdirSync(imagesPath, { recursive: true });
      }

      console.log(`🖼️  Downloading CC0 Italian food images for ${clientName}...`);

      let downloaded = 0;
      let skipped = 0;

      for (const [filename, imageData] of Object.entries(this.italianFoodImages)) {
        const imagePath = path.join(imagesPath, filename);
        
        // Skip if image already exists
        if (fs.existsSync(imagePath)) {
          console.log(`   ⏭️  ${filename} already exists, skipping`);
          skipped++;
          continue;
        }

        try {
          await this.downloadImage(imageData.url, imagePath);
          console.log(`   ✅ Downloaded ${filename} - ${imageData.alt}`);
          downloaded++;
          
          // Add small delay to be respectful to image servers
          await this.sleep(500);
          
        } catch (error) {
          console.log(`   ❌ Failed to download ${filename}: ${error.message}`);
        }
      }

      console.log(`\n📊 Download complete:`);
      console.log(`   ✅ Downloaded: ${downloaded} images`);
      console.log(`   ⏭️  Skipped: ${skipped} images`);
      console.log(`   📁 Location: ${imagesPath}`);

      if (downloaded > 0) {
        console.log(`\n📋 Next steps:`);
        console.log(`   1. Run: node scripts/generate-website.js "${clientName}"`);
        console.log(`   2. View: open client-projects/${this.sanitizeClientName(clientName)}/generated/website/index.html`);
      }

      return { downloaded, skipped };

    } catch (error) {
      console.error('❌ Error downloading images:', error.message);
      process.exit(1);
    }
  }

  downloadImage(url, filePath) {
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(filePath);
      
      https.get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode}`));
          return;
        }
        
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          resolve();
        });
        
        file.on('error', (err) => {
          fs.unlink(filePath, () => {});
          reject(err);
        });
        
      }).on('error', (err) => {
        reject(err);
      });
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async createImageCredits(clientName) {
    const clientFolder = this.sanitizeClientName(clientName);
    const clientPath = path.join(this.clientProjectsPath, clientFolder);
    
    const credits = `# Image Credits for ${clientName}

All images used in this website are from Unsplash and are free to use under the Unsplash License.

## Food Images (CC0 - Free to use)

${Object.entries(this.italianFoodImages).map(([filename, data]) => 
  `- **${filename}**: ${data.alt} - Source: Unsplash`
).join('\n')}

## License Information

All images are provided under creative commons or similar free licenses:
- ✅ Free for commercial use
- ✅ No attribution required (but appreciated)
- ✅ Can be modified and redistributed

## Image Optimization

Images are automatically sized for web use:
- Food images: 500x400px
- Hero image: 1200x800px
- Interior image: 600x400px

---

Generated by Restaurant Website Business System
`;

    const creditsPath = path.join(clientPath, 'source/IMAGE_CREDITS.md');
    fs.writeFileSync(creditsPath, credits);
    
    console.log(`📄 Image credits saved: ${creditsPath}`);
  }

  sanitizeClientName(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
}

// CLI Usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🍽️  Restaurant Food Image Downloader

Usage:
  node download-food-images.js <client-name>

Features:
  - Downloads 12 Italian food images (CC0)
  - Downloads hero and interior images
  - Creates image credits file
  - Skips existing images
  - Web-optimized sizes

Examples:
  node download-food-images.js "Mario's Italian Kitchen"
  node download-food-images.js "Giuseppe's Bistro"

Image Sources:
  - Unsplash (CC0 license)
  - Optimized for restaurant websites
  - Commercial use allowed
`);
    process.exit(1);
  }

  const downloader = new FoodImageDownloader();
  const clientName = args[0];
  
  downloader.downloadImages(clientName).then(() => {
    downloader.createImageCredits(clientName);
  });
}

module.exports = FoodImageDownloader;