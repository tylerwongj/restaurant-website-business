# Test Images Reference Guide

This guide maps template placeholders to the appropriate test images in the `/images/test/` directory.

## Image Placeholder Mapping

### Logo
- `{{LOGO_URL}}` → `images/test/logo/logo.png`

### Hero Images
- `{{HERO_IMAGE}}` → `images/test/hero/hero-image.jpg`
- `{{HERO_IMAGE_1}}` → `images/test/hero/hero-image.jpg`

### Food Images (Main Dishes)
- `{{FOOD_IMAGE_1}}` → `images/test/food/food-image-1.jpg` (Grilled Salmon)
- `{{FOOD_IMAGE_2}}` → `images/test/food/food-image-2.jpg` (Pasta Primavera)
- `{{FOOD_IMAGE_3}}` → `images/test/food/food-image-3.jpg` (Steak Dinner)
- `{{FOOD_IMAGE_4}}` → `images/test/food/food-image-4.jpg` (Caesar Salad)
- `{{FOOD_IMAGE_5}}` → `images/test/food/food-image-5.jpg` (Chicken Parmesan)
- `{{FOOD_IMAGE_6}}` → `images/test/food/food-image-6.jpg` (Seafood Risotto)

### Appetizer Images
- `{{APPETIZER_IMAGE_1}}` → `images/test/appetizers/appetizer-image-1.jpg` (Bruschetta)
- `{{APPETIZER_IMAGE_2}}` → `images/test/appetizers/appetizer-image-2.jpg` (Calamari)
- `{{APPETIZER_IMAGE_3}}` → `images/test/appetizers/appetizer-image-3.jpg` (Wings)
- `{{APPETIZER_IMAGE_4}}` → `images/test/appetizers/appetizer-image-4.jpg` (Nachos)

### Dessert Images
- `{{DESSERT_IMAGE_1}}` → `images/test/desserts/dessert-image-1.jpg` (Chocolate Cake)
- `{{DESSERT_IMAGE_2}}` → `images/test/desserts/dessert-image-2.jpg` (Tiramisu)

### Drink Images
- `{{DRINK_IMAGE_1}}` → `images/test/drinks/drink-image-1.jpg` (House Wine)
- `{{DRINK_IMAGE_2}}` → `images/test/drinks/drink-image-2.jpg` (Signature Cocktail)

### Interior Images
- `{{INTERIOR_IMAGE_1}}` → `images/test/interior/interior-image-1.jpg` (Dining Room)
- `{{INTERIOR_IMAGE_2}}` → `images/test/interior/interior-image-2.jpg` (Bar Area)
- `{{INTERIOR_IMAGE_3}}` → `images/test/interior/interior-image-3.jpg` (Private Room)

### Staff & Team Images
- `{{CHEF_IMAGE}}` → `images/test/staff/chef-image.jpg`
- `{{FAMILY_IMAGE}}` → `images/test/staff/family-image.jpg`

### Kitchen Images
- `{{KITCHEN_IMAGE}}` → `images/test/kitchen/kitchen-image.jpg`

### Specialty Images
- `{{RESTAURANT_IMAGE}}` → `images/test/specialty/restaurant-image.jpg`
- `{{WINE_IMAGE}}` → `images/test/specialty/wine-image.jpg`
- `{{FEATURED_DISH_IMAGE}}` → `images/test/specialty/featured-dish.jpg`
- `{{EVENT_IMAGE}}` → `images/test/specialty/event-image.jpg`

### Popular/Featured Items (reuse food images)
- `{{POPULAR_DISH_1_IMAGE}}` → `images/test/food/food-image-1.jpg`
- `{{POPULAR_DISH_2_IMAGE}}` → `images/test/food/food-image-2.jpg`
- `{{POPULAR_DISH_3_IMAGE}}` → `images/test/food/food-image-3.jpg`
- `{{FAVORITE_1_IMAGE}}` → `images/test/food/food-image-4.jpg`
- `{{FAVORITE_2_IMAGE}}` → `images/test/food/food-image-5.jpg`
- `{{FAVORITE_3_IMAGE}}` → `images/test/food/food-image-6.jpg`

### Fun/Activity Images (reuse interior images)
- `{{FUN_IMAGE_1}}` → `images/test/interior/interior-image-1.jpg`
- `{{FUN_IMAGE_2}}` → `images/test/interior/interior-image-2.jpg`
- `{{FUN_IMAGE_3}}` → `images/test/interior/interior-image-3.jpg`

## Image Specifications

### Generated Image Sizes
- **Logo**: 300x100px (PNG with white background)
- **Hero**: 1920x800px (JPG)
- **Food/Appetizers/Desserts/Drinks**: 800x600px (JPG)
- **Interior/Kitchen/Specialty**: 1200x800px (JPG)
- **Staff**: 600x400px (JPG)

## Usage Instructions

1. **For template testing**: Copy the file paths from this guide directly into your template files
2. **For client projects**: Use this as a reference for the types and sizes of images needed
3. **For development**: All images are placeholder content with clear labels for easy identification

## Template Integration

When testing templates, replace placeholders like:
```html
<img src="{{FOOD_IMAGE_1}}" alt="Menu Item">
```

With:
```html
<img src="images/test/food/food-image-1.jpg" alt="Menu Item">
```

Or use relative paths based on your template location:
```html
<img src="../../images/test/food/food-image-1.jpg" alt="Menu Item">
```