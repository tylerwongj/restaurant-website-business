#!/bin/bash

# Restaurant Image Collection Script
# Downloads free-to-use images from Unsplash and Pexels APIs

echo "🍽️  Starting Restaurant Image Collection..."

# Create directories if they don't exist
mkdir -p restaurant-interiors food-dishes drinks-beverages desserts staff-people
mkdir -p exteriors-atmosphere logos-branding events-occasions ingredients-prep specialty-cuisine

# Set download directory
BASE_DIR="/Users/tyler/p2/restaurant-website-business/images/placeholder"
cd "$BASE_DIR"

echo "📁 Created directory structure"

# Function to download from Unsplash
download_unsplash() {
    local query="$1"
    local filename="$2"
    local category="$3"
    
    echo "📥 Downloading: $filename"
    
    # Unsplash Source API (provides random images by search term)
    curl -L "https://source.unsplash.com/1200x800/?$query" \
         -o "$category/$filename" \
         --silent --show-error
    
    if [ $? -eq 0 ]; then
        echo "✅ Downloaded: $category/$filename"
    else
        echo "❌ Failed: $category/$filename"
    fi
    
    # Rate limiting - wait 1 second between downloads
    sleep 1
}

# Function to optimize images
optimize_images() {
    echo "🔧 Optimizing images..."
    
    # Check if imagemagick is installed
    if command -v mogrify &> /dev/null; then
        find . -name "*.jpg" -exec mogrify -quality 85 -resize 1200x800^ -gravity center {} \;
        echo "✅ Images optimized"
    else
        echo "⚠️  ImageMagick not found. Install with: brew install imagemagick"
    fi
}

echo "🚀 Starting downloads..."

# HERO/INTERIOR IMAGES
echo "🏠 Downloading restaurant interiors..."
download_unsplash "restaurant,interior,dining" "hero-dining-elegant-001.jpg" "restaurant-interiors"
download_unsplash "restaurant,bar,modern" "hero-bar-modern-002.jpg" "restaurant-interiors"
download_unsplash "cafe,interior,cozy" "hero-cafe-cozy-003.jpg" "restaurant-interiors"
download_unsplash "restaurant,patio,outdoor" "hero-patio-outdoor-004.jpg" "restaurant-interiors"
download_unsplash "fine,dining,elegant" "interior-fine-dining-005.jpg" "restaurant-interiors"

# FOOD DISHES
echo "🍝 Downloading food dishes..."
download_unsplash "pasta,italian,delicious" "main-pasta-italian-001.jpg" "food-dishes"
download_unsplash "steak,grilled,restaurant" "main-steak-grilled-002.jpg" "food-dishes"
download_unsplash "salmon,fish,gourmet" "main-salmon-grilled-003.jpg" "food-dishes"
download_unsplash "burger,gourmet,restaurant" "main-burger-gourmet-004.jpg" "food-dishes"
download_unsplash "pizza,margherita,italian" "main-pizza-margherita-005.jpg" "food-dishes"
download_unsplash "ramen,asian,noodles" "main-ramen-asian-006.jpg" "food-dishes"
download_unsplash "tacos,mexican,street" "main-tacos-mexican-007.jpg" "food-dishes"
download_unsplash "bruschetta,appetizer" "appetizer-bruschetta-001.jpg" "food-dishes"
download_unsplash "caesar,salad,fresh" "salad-caesar-001.jpg" "food-dishes"
download_unsplash "soup,restaurant,bowl" "appetizer-soup-002.jpg" "food-dishes"

# DRINKS
echo "🍷 Downloading beverages..."
download_unsplash "wine,red,glass" "drink-wine-red-001.jpg" "drinks-beverages"
download_unsplash "craft,beer,restaurant" "drink-beer-craft-002.jpg" "drinks-beverages"
download_unsplash "cocktail,martini,bar" "drink-cocktail-martini-003.jpg" "drinks-beverages"
download_unsplash "coffee,latte,art" "drink-coffee-latte-004.jpg" "drinks-beverages"
download_unsplash "smoothie,healthy,fruit" "drink-smoothie-fruit-005.jpg" "drinks-beverages"

# DESSERTS
echo "🍰 Downloading desserts..."
download_unsplash "chocolate,cake,dessert" "dessert-chocolate-cake-001.jpg" "desserts"
download_unsplash "tiramisu,italian,dessert" "dessert-tiramisu-002.jpg" "desserts"
download_unsplash "ice,cream,dessert" "dessert-ice-cream-003.jpg" "desserts"
download_unsplash "cheesecake,restaurant" "dessert-cheesecake-004.jpg" "desserts"

# STAFF & PEOPLE
echo "👨‍🍳 Downloading staff images..."
download_unsplash "chef,cooking,kitchen" "staff-chef-cooking-001.jpg" "staff-people"
download_unsplash "waiter,server,restaurant" "staff-server-friendly-002.jpg" "staff-people"
download_unsplash "bartender,cocktail,bar" "staff-bartender-003.jpg" "staff-people"
download_unsplash "kitchen,team,restaurant" "staff-kitchen-team-004.jpg" "staff-people"

# INGREDIENTS & PREP
echo "🥬 Downloading ingredient images..."
download_unsplash "fresh,vegetables,ingredients" "ingredients-vegetables-001.jpg" "ingredients-prep"
download_unsplash "olive,oil,mediterranean" "ingredients-olive-oil-002.jpg" "ingredients-prep"
download_unsplash "herbs,fresh,cooking" "ingredients-herbs-003.jpg" "ingredients-prep"
download_unsplash "knife,cutting,prep" "prep-chopping-001.jpg" "ingredients-prep"

# SPECIALTY CUISINE
echo "🌎 Downloading specialty cuisine..."
download_unsplash "sushi,japanese,restaurant" "specialty-sushi-japanese-001.jpg" "specialty-cuisine"
download_unsplash "pasta,making,italian" "specialty-pasta-italian-002.jpg" "specialty-cuisine"
download_unsplash "dim,sum,chinese" "specialty-dimsum-chinese-003.jpg" "specialty-cuisine"
download_unsplash "paella,spanish,seafood" "specialty-paella-spanish-004.jpg" "specialty-cuisine"

# EVENTS & OCCASIONS
echo "🎉 Downloading event images..."
download_unsplash "wine,tasting,restaurant" "event-wine-tasting-001.jpg" "events-occasions"
download_unsplash "private,dining,party" "event-private-dining-002.jpg" "events-occasions"
download_unsplash "birthday,celebration,restaurant" "event-birthday-003.jpg" "events-occasions"

echo "⚡ Download complete! Optimizing images..."
optimize_images

echo "📊 Summary:"
echo "Total files downloaded: $(find . -name "*.jpg" | wc -l)"
echo "Total size: $(du -sh . | cut -f1)"

echo ""
echo "✅ Restaurant image collection complete!"
echo "📁 Images saved to: $BASE_DIR"
echo ""
echo "Next steps:"
echo "1. Review downloaded images"
echo "2. Remove any unsuitable images"
echo "3. Add more specific images as needed"
echo "4. Update template IMG src paths"
echo ""
echo "🚀 Ready to use in your restaurant templates!"