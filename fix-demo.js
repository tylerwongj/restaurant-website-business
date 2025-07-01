const fs = require('fs');

// Demo restaurant data
const restaurantData = {
    RESTAURANT_NAME: 'Bella Vista',
    CUISINE_TYPE: 'Italian',
    DESCRIPTION: 'Authentic Italian cuisine in a warm, family-friendly atmosphere',
    TAGLINE: 'Authentic Italian Cuisine Since 1985',
    PHONE: '555-123-4567',
    EMAIL: 'info@bellavista.com',
    LOGO_URL: '../images/general/logo/restaurant-logo.png',
    HERO_IMAGE: '../images/general/hero/restaurant-interior-hero.jpg',
    ABOUT_DESCRIPTION: 'Family-owned since 1985, Bella Vista brings authentic Italian flavors to your table. Our chefs use traditional recipes passed down through generations, featuring fresh ingredients and time-honored cooking techniques.',
    INTERIOR_IMAGE_1: '../images/general/interior/dining-room.jpg',
    
    // Menu items  
    FOOD_IMAGE_3: '../images/general/food/pizza-dish.jpg',
    MENU_ITEM_3: 'Margherita Pizza',
    MENU_DESCRIPTION_3: 'Fresh mozzarella, basil, and tomato sauce on our house-made dough',
    PRICE_3: '16.95',
    
    FOOD_IMAGE_4: '../images/general/food/seafood-dish.jpg', 
    MENU_ITEM_4: 'Seafood Risotto',
    MENU_DESCRIPTION_4: 'Creamy arborio rice with fresh shrimp, scallops, and mussels',
    PRICE_4: '26.95',
    
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
    GOOGLE_MAPS_URL: 'https://maps.google.com',
    GOOGLE_MAPS_EMBED: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.0!2d-74.0!3d40.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1',
    
    // Social media
    FACEBOOK_URL: 'https://facebook.com/bellavista',
    INSTAGRAM_URL: 'https://instagram.com/bellavista', 
    YELP_URL: 'https://yelp.com/bellavista'
};

// Read template file
let html = fs.readFileSync('demo-site/index.html', 'utf8');

// Replace all variables
Object.keys(restaurantData).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    html = html.replace(regex, restaurantData[key]);
});

// Write fixed file
fs.writeFileSync('demo-site/index.html', html);
console.log('Demo site fixed! All placeholder variables replaced.');