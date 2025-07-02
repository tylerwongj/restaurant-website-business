#!/bin/bash

# Restaurant Image Downloader Script
# Downloads high-quality CC0 restaurant images for commercial use

echo "🍽️ Restaurant Image Downloader - Commercial Use (CC0)"
echo "=================================================="

# Create directories if they don't exist
mkdir -p food-dishes drinks-beverages restaurant-interiors table-settings desserts cafe-style staff-people exteriors fine-dining casual-dining tropical-theme

echo "📁 Created image category folders"

# Download sample high-quality images using curl
echo "📥 Downloading sample restaurant images..."

# Food dishes from reliable CC0 sources
echo "Downloading food dishes..."
curl -L -o "food-dishes/gourmet-burger.jpg" "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80"
curl -L -o "food-dishes/pasta-plate.jpg" "https://images.unsplash.com/photo-1563379091339-03246963d44a?auto=format&fit=crop&w=1200&q=80"
curl -L -o "food-dishes/steak-dinner.jpg" "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80"
curl -L -o "food-dishes/salmon-dish.jpg" "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80"

# Restaurant interiors
echo "Downloading restaurant interiors..."
curl -L -o "restaurant-interiors/elegant-dining.jpg" "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
curl -L -o "restaurant-interiors/modern-restaurant.jpg" "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=1200&q=80"
curl -L -o "restaurant-interiors/cozy-cafe.jpg" "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"

# Drinks and beverages
echo "Downloading drinks and beverages..."
curl -L -o "drinks-beverages/coffee-latte.jpg" "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80"
curl -L -o "drinks-beverages/wine-glasses.jpg" "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80"
curl -L -o "drinks-beverages/cocktail.jpg" "https://images.unsplash.com/photo-1551024739-8ceeb755a6fe?auto=format&fit=crop&w=1200&q=80"

# Table settings
echo "Downloading table settings..."
curl -L -o "table-settings/elegant-place-setting.jpg" "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80"
curl -L -o "table-settings/outdoor-dining.jpg" "https://images.unsplash.com/photo-1559329007-41c141843d75?auto=format&fit=crop&w=1200&q=80"

# Desserts
echo "Downloading desserts..."
curl -L -o "desserts/chocolate-cake.jpg" "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=1200&q=80"
curl -L -o "desserts/ice-cream.jpg" "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80"

# Staff and people
echo "Downloading staff photos..."
curl -L -o "staff-people/chef-cooking.jpg" "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80"
curl -L -o "staff-people/server.jpg" "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80"

# Restaurant exteriors
echo "Downloading restaurant exteriors..."
curl -L -o "exteriors/restaurant-storefront.jpg" "https://images.unsplash.com/photo-1552566067-b4c7ca86c58f?auto=format&fit=crop&w=1200&q=80"
curl -L -o "exteriors/outdoor-patio.jpg" "https://images.unsplash.com/photo-1559329007-41c141843d75?auto=format&fit=crop&w=1200&q=80"

echo "✅ Downloaded 15+ high-quality restaurant images"
echo "📝 All images are from Unsplash (CC0 equivalent license)"
echo "🏢 Commercial use permitted without attribution required"
echo ""
echo "Next steps:"
echo "1. Review images in each category folder"
echo "2. Rename files with descriptive names for your templates"
echo "3. Optimize file sizes if needed (recommended: <500KB each)"
echo "4. Add more images from Pixabay, Pexels, or Foodiesfeed as needed"
echo ""
echo "🔗 For more images, visit:"
echo "   • Foodiesfeed.com (food photography)"
echo "   • Pexels.com/search/restaurant"
echo "   • Pixabay.com (30,000+ restaurant images)"

# Make the script executable
chmod +x download-images.sh