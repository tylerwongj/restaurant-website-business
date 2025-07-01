#!/bin/bash

# Restaurant Image Library - Clean Non-Restaurant Images
# Removes categories not relevant to restaurant website business

echo "🍽️ CLEANING RESTAURANT IMAGE LIBRARY"
echo "====================================="

BASE_DIR="/Users/tyler/p2/restaurant-website-business/images/general"
REMOVED_DIR="/Users/tyler/p2/restaurant-website-business/images/REMOVED_NON_RESTAURANT"

# Create directory for removed items
mkdir -p "$REMOVED_DIR"

echo "📦 Moving non-restaurant categories to REMOVED_NON_RESTAURANT/..."

# Move non-restaurant directories
if [ -d "$BASE_DIR/professional-office" ]; then
    mv "$BASE_DIR/professional-office" "$REMOVED_DIR/"
    echo "✅ Moved professional-office/ (5 images)"
fi

if [ -d "$BASE_DIR/wellness-spa" ]; then
    mv "$BASE_DIR/wellness-spa" "$REMOVED_DIR/"
    echo "✅ Moved wellness-spa/ (5 images)"
fi

if [ -d "$BASE_DIR/retail-commercial" ]; then
    mv "$BASE_DIR/retail-commercial" "$REMOVED_DIR/"
    echo "✅ Moved retail-commercial/ (5 images)"
fi

# Keep business-services as it might be useful for corporate restaurant events
echo "📋 Keeping business-services/ - useful for corporate dining events"

echo ""
echo "🎯 CURRENT RESTAURANT-FOCUSED CATEGORIES:"
echo "========================================"

# List remaining directories
for dir in "$BASE_DIR"/*; do
    if [ -d "$dir" ]; then
        dirname=$(basename "$dir")
        count=$(find "$dir" -name "*.jpg" -o -name "*.jpeg" | wc -l)
        echo "📁 $dirname/ ($count images)"
    fi
done

echo ""
echo "🔥 PRIORITY: Generate Missing Restaurant Images"
echo "=============================================="
echo "Based on IMAGE_EXPANSION_STRATEGY.md, you need:"
echo ""
echo "🎯 HIGH IMPACT CATEGORIES (Generate First):"
echo "- customer-emotions/ (30 images) - Date nights, family celebrations, business dinners"
echo "- food-trends-modern/ (40 images) - Plant-based, Instagram-worthy, craft beverages"
echo "- seasonal-content/ (60 images) - Spring, summer, fall, winter themes"
echo "- behind-scenes/ (25 images) - Kitchen prep, farm sourcing, authenticity"
echo ""
echo "💰 PREMIUM CATEGORIES (Generate Second):"
echo "- private-events/ (30 images) - Catering, weddings, corporate events"
echo "- service-excellence/ (25 images) - Wine service, fine dining standards"
echo "- technology-integration/ (20 images) - QR menus, contactless payment"
echo ""
echo "📱 MOBILE-OPTIMIZED (Generate Third):"
echo "- mobile-vertical/ (40 images) - Stories-ready, action shots, close-ups"
echo ""

echo "🚀 USE AI PROMPTS FROM:"
echo "- AI_IMAGE_GENERATION_PROMPTS.md (220 specific prompts ready)"
echo "- Tools: Midjourney, DALL-E 3, Adobe Firefly, Stable Diffusion"

echo ""
echo "📊 LIBRARY STATUS:"
echo "=================="
restaurant_images=$(find "$BASE_DIR" -name "*.jpg" -o -name "*.jpeg" | wc -l)
echo "✅ Current restaurant images: $restaurant_images"
echo "🎯 Target restaurant images: 500+"
echo "📈 Need to generate: ~$((500 - restaurant_images)) more images"

echo ""
echo "✅ Restaurant library cleanup complete!"
echo "🎯 Ready for strategic image generation!"