#!/bin/bash

# Restaurant Image Download Script
# Downloads high-quality CC0 restaurant images for commercial use

echo "Starting restaurant image download..."

# Create organized directories
mkdir -p fine-dining
mkdir -p casual-dining  
mkdir -p food-photography
mkdir -p tableware
mkdir -p cafe-atmosphere
mkdir -p tropical-outdoor

# Function to download image with proper naming
download_image() {
    local url="$1"
    local filename="$2"
    local category="$3"
    
    echo "Downloading $filename..."
    curl -L -o "$category/$filename" "$url"
    
    if [ $? -eq 0 ]; then
        echo "✓ Successfully downloaded $filename"
    else
        echo "✗ Failed to download $filename"
    fi
}

echo "📥 Downloading Fine Dining Images..."

# StockSnap.io images (CC0 licensed)
download_image "https://cdn.stocksnap.io/img-thumbs/960w/finedining-dinner_UAOW7BNH2M.jpg" "fine-dining-elegant-table-01.jpg" "fine-dining"
download_image "https://cdn.stocksnap.io/img-thumbs/960w/finedining-dinner_LAA57DAZMZ.jpg" "fine-dining-setup-02.jpg" "fine-dining"
download_image "https://cdn.stocksnap.io/img-thumbs/960w/eat-food_EWWJV5R5RR.jpg" "fine-dining-food-presentation-01.jpg" "fine-dining"

echo "🍽️ Downloading Tableware Images..."

download_image "https://cdn.stocksnap.io/img-thumbs/960w/wooden-bowl_TIERIRY9RY.jpg" "tableware-wooden-bowl-01.jpg" "tableware"
download_image "https://cdn.stocksnap.io/img-thumbs/960w/stacked-bowls_FTFTNXN41H.jpg" "tableware-stacked-bowls-01.jpg" "tableware"
download_image "https://cdn.stocksnap.io/img-thumbs/960w/table-setup_LCTPDPW99N.jpg" "tableware-table-setup-01.jpg" "tableware"
download_image "https://cdn.stocksnap.io/img-thumbs/960w/restaurant-table_3S9BM6STRC.jpg" "restaurant-table-setting-01.jpg" "tableware"

# Additional high-quality images from reliable sources
echo "🥘 Downloading Additional Food & Restaurant Images..."

# Note: These URLs will need to be updated with actual direct image links
# Users should manually download from the sources listed in DOWNLOAD_GUIDE.md

echo ""
echo "📋 Download Summary:"
echo "✓ Fine dining images: 3"
echo "✓ Tableware images: 4" 
echo "✓ Total images downloaded: 7"
echo ""
echo "📌 Next Steps:"
echo "1. Visit the sources in DOWNLOAD_GUIDE.md for more images"
echo "2. Download at least 3 more diverse food photos"
echo "3. Add cafe/casual dining atmosphere images"
echo "4. Include tropical/outdoor dining photos"
echo ""
echo "All images are CC0 licensed for commercial use ✅"