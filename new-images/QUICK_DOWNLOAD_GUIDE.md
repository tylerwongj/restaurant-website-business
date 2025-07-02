# Quick CC0 Restaurant Image Download Guide

## Instant Download Commands

### 1. Unsplash Downloads (Replace IMAGE_ID with actual IDs)
```bash
# Elegant table setting
curl -o "elegant-table-setting-new.jpg" "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200"

# Coffee shop interior
curl -o "coffee-shop-modern.jpg" "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200"

# Fine dining wine glasses
curl -o "wine-glasses-elegant.jpg" "https://images.unsplash.com/photo-1472162314819-b6cd0579db75?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200"

# Restaurant kitchen chef
curl -o "chef-cooking-professional.jpg" "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200"

# Tropical restaurant patio
curl -o "tropical-patio-dining.jpg" "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200"
```

### 2. Browser Download Method
1. **Unsplash.com** - Go to unsplash.com/s/photos/restaurant
2. **Pexels.com** - Go to pexels.com/search/restaurant/
3. **Pixabay.com** - Go to pixabay.com/images/search/restaurant/

## High-Priority Missing Categories

### Tablecloths & Linens (Search: "table linens restaurant")
- White tablecloths
- Colored fabric napkins  
- Linen textures
- Formal place settings

### Coffee Equipment (Search: "espresso machine cafe")
- Espresso machines
- Coffee grinders
- Barista tools
- Coffee cup arrangements

### Glassware Collection (Search: "restaurant glassware")
- Wine glass sets
- Cocktail glasses
- Water glasses
- Specialty drink glasses

### Tropical Theme (Search: "tropical restaurant bamboo")
- Bamboo decor
- Palm leaf arrangements
- Tiki bar elements
- Outdoor tropical dining

## Quick Expansion Strategy

### Phase 1: Download 15 Key Images
1. 3 Tablecloth/linen images
2. 3 Coffee equipment images  
3. 3 Glassware collection images
4. 3 Tropical restaurant images
5. 3 Staff/service images

### Phase 2: Category Completion
Focus on filling gaps in existing categories with 2-3 more images each.

## Automated Download Script Template
```bash
#!/bin/bash
# Create this as download-restaurant-images.sh

echo "Downloading restaurant images from CC0 sources..."

# Create categories if they don't exist
mkdir -p table-linens coffee-equipment glassware-collection tropical-theme staff-service

# Unsplash downloads (replace with actual image IDs)
curl -o "table-linens/white-tablecloth.jpg" "UNSPLASH_URL_1"
curl -o "coffee-equipment/espresso-machine.jpg" "UNSPLASH_URL_2" 
curl -o "glassware-collection/wine-glasses.jpg" "UNSPLASH_URL_3"
curl -o "tropical-theme/bamboo-restaurant.jpg" "UNSPLASH_URL_4"
curl -o "staff-service/chef-portrait.jpg" "UNSPLASH_URL_5"

echo "Download complete! Check folders for new images."
```

## Usage Rights Verification
✅ Unsplash: Free commercial use, no attribution required
✅ Pexels: Free commercial use, no attribution required  
✅ Pixabay: Free commercial use, no attribution required
✅ All images suitable for restaurant website templates