#!/usr/bin/env node

/**
 * Demo Site Variable Replacement Script
 * 
 * This script replaces placeholder variables in demo template files
 * Usage: node fix-demo.js [template-dir] [output-dir]
 * Default: Processes demo-site/ directory
 */

const fs = require('fs');
const path = require('path');

// Demo restaurant data
const restaurantData = {
    RESTAURANT_NAME: 'Demo Restaurant',
    CUISINE_TYPE: 'Italian',
    DESCRIPTION: 'Authentic Italian cuisine in a warm, family-friendly atmosphere',
    TAGLINE: 'Authentic Italian Cuisine Since 1985',
    PHONE: '(555) 123-4567',
    EMAIL: 'info@demorestaurant.com',
    LOGO_URL: 'images/logo.png',
    HERO_IMAGE: 'images/hero.jpg',
    ABOUT_DESCRIPTION: 'Family-owned since 1985, Demo Restaurant brings authentic Italian flavors to your table. Our chefs use traditional recipes passed down through generations, featuring fresh ingredients and time-honored cooking techniques.',
    INTERIOR_IMAGE_1: 'images/interior.jpg',
    
    // Menu items  
    FOOD_IMAGE_1: 'images/food-1.jpg',
    MENU_ITEM_1: 'Margherita Pizza',
    MENU_DESCRIPTION_1: 'Fresh mozzarella, basil, and tomato sauce on our house-made dough',
    PRICE_1: '16.95',
    
    FOOD_IMAGE_2: 'images/food-2.jpg', 
    MENU_ITEM_2: 'Seafood Risotto',
    MENU_DESCRIPTION_2: 'Creamy arborio rice with fresh shrimp, scallops, and mussels',
    PRICE_2: '26.95',
    
    FOOD_IMAGE_3: 'images/food-3.jpg',
    MENU_ITEM_3: 'Chicken Parmigiana',
    MENU_DESCRIPTION_3: 'Breaded chicken breast with marinara sauce and melted mozzarella',
    PRICE_3: '22.95',
    
    FOOD_IMAGE_4: 'images/food-4.jpg',
    MENU_ITEM_4: 'Fettuccine Alfredo',
    MENU_DESCRIPTION_4: 'House-made fettuccine in rich cream sauce with Parmigiano-Reggiano',
    PRICE_4: '19.95',
    
    // Hours
    HOURS_MON: '5:00 PM - 10:00 PM',
    HOURS_TUE: '5:00 PM - 10:00 PM', 
    HOURS_WED: '5:00 PM - 10:00 PM',
    HOURS_THU: '5:00 PM - 10:00 PM',
    HOURS_FRI: '5:00 PM - 11:00 PM',
    HOURS_SAT: '4:00 PM - 11:00 PM',
    HOURS_SUN: '4:00 PM - 9:00 PM',
    
    WEEKDAY_HOURS: '5:00 PM - 10:00 PM',
    WEEKEND_HOURS: '4:00 PM - 11:00 PM',
    SUNDAY_HOURS: '4:00 PM - 9:00 PM',
    
    // Contact
    FULL_ADDRESS: '123 Main Street, Downtown, CA 90210',
    GOOGLE_MAPS_URL: 'https://maps.google.com/?q=123+Main+Street+Downtown+CA',
    GOOGLE_MAPS_EMBED: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.0!2d-74.0!3d40.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1',
    
    // Social media
    FACEBOOK_URL: 'https://facebook.com/demorestaurant',
    INSTAGRAM_URL: 'https://instagram.com/demorestaurant', 
    YELP_URL: 'https://yelp.com/demorestaurant'
};

function processFile(filePath, outputPath) {
    try {
        console.log(`📄 Processing: ${path.basename(filePath)}`);
        
        // Read template file
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Replace all variables
        let replacements = 0;
        Object.keys(restaurantData).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            const matches = content.match(regex);
            if (matches) {
                content = content.replace(regex, restaurantData[key]);
                replacements += matches.length;
            }
        });
        
        // Write fixed file
        fs.writeFileSync(outputPath, content);
        console.log(`  ✅ ${replacements} placeholder(s) replaced`);
        
        return replacements;
    } catch (error) {
        console.log(`  ❌ Error processing ${filePath}: ${error.message}`);
        return 0;
    }
}

function main() {
    console.log('🔧 Demo Site Variable Replacement');
    console.log('=================================');
    
    // Get arguments
    const args = process.argv.slice(2);
    const templateDir = args[0] || 'demo-site';
    const outputDir = args[1] || templateDir;
    
    if (!fs.existsSync(templateDir)) {
        console.log(`❌ Template directory not found: ${templateDir}`);
        console.log('💡 Usage: node fix-demo.js [template-dir] [output-dir]');
        return;
    }
    
    console.log(`📁 Template directory: ${templateDir}`);
    console.log(`📁 Output directory: ${outputDir}`);
    console.log('');
    
    let totalReplacements = 0;
    let filesProcessed = 0;
    
    // Process all HTML files in the directory
    const files = fs.readdirSync(templateDir).filter(file => file.endsWith('.html'));
    
    for (const file of files) {
        const inputPath = path.join(templateDir, file);
        const outputPath = path.join(outputDir, file);
        
        const replacements = processFile(inputPath, outputPath);
        totalReplacements += replacements;
        filesProcessed++;
    }
    
    console.log('');
    console.log('=================================');
    console.log(`✅ Demo site processing completed!`);
    console.log(`📊 Files processed: ${filesProcessed}`);
    console.log(`🔄 Total replacements: ${totalReplacements}`);
    
    if (totalReplacements === 0) {
        console.log('💡 No placeholder variables found to replace');
    }
}

if (require.main === module) {
    main();
}