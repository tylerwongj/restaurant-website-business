#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'images');

// Category mapping based on keywords in filenames
const categories = {
    'restaurant-interiors': [
        'interior', 'dining-room', 'restaurant-interior', 'cozy-restaurant', 'elegant-dining',
        'cozy-dining', 'modern-restaurant', 'casual-restaurant', 'fine-dining-interior',
        'elegant-restaurant', 'luxury-restaurant', 'modern-dining', 'rustic-dining',
        'farmhouse-dining', 'industrial-chic', 'candlelit-dining', 'romantic-lighting',
        'cozy-bar-atmosphere', 'warm-restaurant-lighting', 'cafe-interior', 'bistro-seating',
        'coffee-shop-interior', 'cozy-cafe', 'cafe-atmosphere', 'modern-cafe',
        'cozy-coffee-shop', 'cafe-brunch', 'bar-area', 'bar-counter', 'modern-bar'
    ],
    'food-dishes': [
        'pasta', 'pizza', 'burger', 'salmon', 'steak', 'chicken', 'seafood', 'salad',
        'soup', 'appetizer', 'entree', 'gourmet', 'plated', 'dish', 'meal', 'food',
        'grilled', 'seared', 'roasted', 'butternut-squash', 'caesar-salad', 'greek-salad',
        'mediterranean', 'taco', 'burrito', 'sushi', 'sashimi', 'dosas', 'indian-cuisine',
        'tikka-masala', 'skewers', 'shrimp', 'sliced-lamb', 'duck-breast', 'cauliflower-salad',
        'avocado-egg-toast', 'pancakes', 'breakfast', 'brunch', 'wings', 'mozzarella-sticks',
        'artisan-bread', 'artisan-pizza', 'asian-ramen', 'asian-sushi', 'cheese-board',
        'charcuterie', 'mixed-appetizer', 'bread-basket', 'fresh-salad', 'italian-pasta',
        'mexican-taco', 'mexican-tacos'
    ],
    'drinks-beverages': [
        'cocktail', 'wine', 'beer', 'coffee', 'espresso', 'latte', 'drink', 'beverage',
        'juice', 'tea', 'champagne', 'martini', 'mojito', 'craft-cocktail', 'wine-glass',
        'wine-glasses', 'coffee-cup', 'coffee-cups', 'latte-art', 'fresh-orange-juice',
        'ginger-lemon-tea', 'tea-selection', 'wine-bottle', 'wine-cocktail', 'wine-dining',
        'wine-dinner', 'wine-selection', 'wine-tasting', 'craft-cocktails', 'tropical-cocktail',
        'tropical-coconut', 'tropical-drink', 'tropical-fruit', 'tropical-smoothie'
    ],
    'staff-people': [
        'chef', 'server', 'waiter', 'staff', 'team-photo', 'chef-cooking', 'chef-plating',
        'chef-portrait', 'restaurant-server', 'waiter-service', 'staff-manager',
        'barista', 'sushi-chef'
    ],
    'exteriors-atmosphere': [
        'exterior', 'storefront', 'outdoor', 'patio', 'terrace', 'seating', 'beach-cafe',
        'beach-dining', 'tropical-beach', 'tropical-beachside', 'tropical-outdoor',
        'outdoor-cafe', 'outdoor-dining', 'outdoor-patio', 'outdoor-terrace',
        'outdoor-tropical', 'palm-tree', 'beachside-dining', 'tropical-cafe'
    ],
    'table-settings': [
        'table-setting', 'silverware', 'plates', 'napkin', 'cutlery', 'elegant-place',
        'fine-china', 'ceramic-plates', 'linen-napkin', 'cloth-napkins', 'napkin-fold',
        'silverware-set', 'plates-cutlery', 'tablecloth', 'table-linens', 'wine-glass-napkin',
        'elegant-silverware', 'elegant-table', 'place-setting'
    ],
    'logos-branding': [
        'logo', 'icon', 'badge', 'brand', 'restaurant-logo', 'chef-hat', 'fork-knife',
        'wine-glass-003', 'circle-badge', 'elegant-rectangle', 'modern-minimal',
        'vintage-classic', 'premium-quality'
    ],
    'ingredients-prep': [
        'ingredient', 'vegetable', 'seasoning', 'fresh-berry', 'farm-to-table',
        'ingredients-vegetables'
    ]
};

// Special handling for desserts (subcategory of food)
const dessertKeywords = [
    'dessert', 'cake', 'chocolate', 'cheesecake', 'tiramisu', 'gelato', 'ice-cream',
    'macarons', 'tart', 'mango-cheesecake', 'chocolate-cake', 'chocolate-dessert',
    'chocolate-lava', 'chocolate-raspberry', 'fresh-berry-tart', 'strawberry-oats'
];

function categorizeImage(filename) {
    const name = filename.toLowerCase();
    
    // Check for desserts first (these go to food-dishes but could be subcategorized)
    for (const keyword of dessertKeywords) {
        if (name.includes(keyword)) {
            return 'food-dishes';
        }
    }
    
    // Check other categories
    for (const [category, keywords] of Object.entries(categories)) {
        for (const keyword of keywords) {
            if (name.includes(keyword)) {
                return category;
            }
        }
    }
    
    // Default categorization based on common patterns
    if (name.includes('menu-item')) return 'food-dishes';
    if (name.includes('contact-location')) return 'exteriors-atmosphere';
    if (name.includes('about-restaurant')) return 'restaurant-interiors';
    
    return 'uncategorized';
}

function organizeImages() {
    const files = fs.readdirSync(imagesDir)
        .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file) && !fs.statSync(path.join(imagesDir, file)).isDirectory());

    console.log(`Categorizing ${files.length} images...`);

    const categorization = {};
    const uncategorized = [];

    files.forEach(file => {
        const category = categorizeImage(file);
        if (category === 'uncategorized') {
            uncategorized.push(file);
        } else {
            if (!categorization[category]) categorization[category] = [];
            categorization[category].push(file);
        }
    });

    // Display categorization results
    console.log('\n=== CATEGORIZATION RESULTS ===');
    Object.entries(categorization).forEach(([category, files]) => {
        console.log(`\n${category.toUpperCase()} (${files.length} files):`);
        files.slice(0, 5).forEach(file => console.log(`  ${file}`));
        if (files.length > 5) console.log(`  ... and ${files.length - 5} more`);
    });

    if (uncategorized.length > 0) {
        console.log(`\nUNCATEGORIZED (${uncategorized.length} files):`);
        uncategorized.forEach(file => console.log(`  ${file}`));
    }

    // Generate move commands
    console.log('\n=== MOVE COMMANDS ===');
    Object.entries(categorization).forEach(([category, files]) => {
        files.forEach(file => {
            console.log(`mv "images/${file}" "images/${category}/${file}"`);
        });
    });

    console.log(`\nSummary: ${files.length} total images`);
    console.log(`Categorized: ${files.length - uncategorized.length}`);
    console.log(`Uncategorized: ${uncategorized.length}`);
}

organizeImages();