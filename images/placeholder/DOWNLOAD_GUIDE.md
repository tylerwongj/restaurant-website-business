# Restaurant Image Download Guide

## 🚀 Quick Start: Essential Images to Download First

### Step 1: Visit These Direct URLs

**Pexels Collections (Free Commercial Use):**
- Food: https://www.pexels.com/search/food/
- Restaurant: https://www.pexels.com/search/restaurant/
- Restaurant Food: https://www.pexels.com/search/restaurant%20food/
- Food Photography: https://www.pexels.com/search/food%20photography/

**Unsplash Collections:**
- Restaurant: https://unsplash.com/s/photos/restaurant
- Food: https://unsplash.com/s/photos/food
- Dining: https://unsplash.com/s/photos/dining

### Step 2: Priority Download List (First 50 Images)

## HERO IMAGES (5 images) - For main website headers
```
Search: "restaurant interior elegant"
Download to: /restaurant-interiors/
- hero-dining-elegant-001.jpg
- hero-dining-casual-002.jpg  
- hero-dining-cozy-003.jpg
- hero-patio-outdoor-004.jpg
- hero-bar-modern-005.jpg
```

## FOOD DISHES (20 images) - For menu sections
```
Search: "delicious food plate restaurant"
Download to: /food-dishes/

MAIN COURSES (8):
- main-pasta-italian-001.jpg
- main-steak-grilled-002.jpg
- main-salmon-grilled-003.jpg
- main-chicken-roasted-004.jpg
- main-burger-gourmet-005.jpg
- main-pizza-margherita-006.jpg
- main-ramen-asian-007.jpg
- main-tacos-mexican-008.jpg

APPETIZERS (6):
- appetizer-bruschetta-001.jpg
- appetizer-shrimp-002.jpg
- appetizer-calamari-003.jpg
- appetizer-wings-004.jpg
- appetizer-cheese-board-005.jpg
- appetizer-soup-006.jpg

SALADS (3):
- salad-caesar-001.jpg
- salad-greek-002.jpg
- salad-garden-fresh-003.jpg

SIDES (3):
- side-fries-golden-001.jpg
- side-bread-artisan-002.jpg
- side-vegetables-grilled-003.jpg
```

## DRINKS (8 images) - For beverage menu
```
Search: "drinks cocktails wine coffee"
Download to: /drinks-beverages/
- drink-wine-red-001.jpg
- drink-beer-craft-002.jpg
- drink-cocktail-martini-003.jpg
- drink-coffee-latte-004.jpg
- drink-smoothie-fruit-005.jpg
- drink-wine-white-006.jpg
- drink-cocktail-mojito-007.jpg
- drink-tea-herbal-008.jpg
```

## DESSERTS (5 images) - For dessert menu
```
Search: "dessert cake chocolate restaurant"
Download to: /desserts/
- dessert-chocolate-cake-001.jpg
- dessert-tiramisu-002.jpg
- dessert-ice-cream-003.jpg
- dessert-cheesecake-004.jpg
- dessert-fruit-tart-005.jpg
```

## RESTAURANT INTERIORS (7 images) - For about/atmosphere sections
```
Search: "restaurant interior dining room"
Download to: /restaurant-interiors/
- interior-dining-room-001.jpg
- interior-bar-area-002.jpg
- interior-kitchen-open-003.jpg
- interior-private-dining-004.jpg
- interior-outdoor-patio-005.jpg
- interior-entrance-006.jpg
- interior-wine-cellar-007.jpg
```

## STAFF & PEOPLE (5 images) - For team/about sections
```
Search: "chef cooking restaurant staff"
Download to: /staff-people/
- staff-chef-cooking-001.jpg
- staff-server-friendly-002.jpg
- staff-bartender-003.jpg
- staff-kitchen-team-004.jpg
- staff-manager-welcoming-005.jpg
```

### Step 3: Download Commands

**Option A: Manual Download (Recommended)**
1. Visit the Pexels/Unsplash URLs above
2. Search for the specific terms
3. Click "Free Download" 
4. Choose "Large" size (usually 1920x1280 or similar)
5. Save to appropriate folder with our naming convention

**Option B: Batch Download Tool**
```bash
# Install wget if not available
brew install wget

# Example download (replace URL with actual image URL)
wget -O /Users/tyler/p2/restaurant-website-business/images/placeholder/food-dishes/main-pasta-italian-001.jpg "https://images.pexels.com/photos/[id]/pexels-photo-[id].jpeg"
```

### Step 4: Image Optimization
After downloading, optimize for web:

```bash
# Navigate to images directory
cd /Users/tyler/p2/restaurant-website-business/images/placeholder

# Install imagemagick if needed
brew install imagemagick

# Resize and optimize all images
find . -name "*.jpg" -exec mogrify -resize 1200x800^ -gravity center -crop 1200x800+0+0 {} \;

# Compress file sizes
find . -name "*.jpg" -exec jpegoptim --max=85 {} \;
```

### Step 5: Template Integration

Update your templates to use these images:
```html
<!-- Hero Image -->
<img src="images/placeholder/restaurant-interiors/hero-dining-elegant-001.jpg" alt="{{RESTAURANT_NAME}}">

<!-- Menu Items -->
<img src="images/placeholder/food-dishes/main-pasta-italian-001.jpg" alt="{{MENU_ITEM_1}}">

<!-- About Section -->
<img src="images/placeholder/staff-people/staff-chef-cooking-001.jpg" alt="Our Chef">
```

## ⚡ Pro Tips for Fast Collection Building

1. **Start with Pexels** - Easier interface, consistent quality
2. **Use specific search terms** - "gourmet burger" vs just "burger"
3. **Download largest available size** - You can always resize down
4. **Maintain consistent style** - Choose images with similar lighting/mood
5. **Organize immediately** - Use our folder structure as you download

## 📱 Mobile-First Considerations

Ensure images work well on mobile:
- High contrast for small screens
- Clear subject matter (not too busy)
- Readable text if any exists in images
- Good cropping at different aspect ratios

## 🎯 Template-Specific Recommendations

**Casual Family Templates:**
- Bright, colorful food photography
- Families dining together
- Comfortable, welcoming interiors

**Fine Dining Templates:**
- Artistic plating and presentation
- Elegant table settings
- Sophisticated interior design
- Wine and cocktail focus

**Fast Casual Templates:**
- Fresh, healthy ingredients
- Quick-service style presentation
- Modern, clean aesthetics
- Mobile/takeout friendly imagery

**Cafe/Bistro Templates:**
- Coffee and pastry focus
- Cozy, intimate settings
- Outdoor seating areas
- Artisanal food presentation

Start with downloading the Priority List above - these 50 images will cover 80% of your template needs!