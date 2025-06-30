# Template Integration Guide

## 🔗 How to Use Placeholder Images in Your Templates

### Image Path Structure
```
images/placeholder/
├── restaurant-interiors/     # Hero sections, about pages
├── food-dishes/             # Menu items, featured dishes
├── drinks-beverages/        # Bar menu, drink specials
├── desserts/               # Dessert menu, sweet treats
├── staff-people/           # Team pages, chef profiles
├── exteriors-atmosphere/   # Storefront, outdoor dining
├── logos-branding/         # Logo placeholders, icons
├── events-occasions/       # Private dining, events
├── ingredients-prep/       # Farm-to-table, process
└── specialty-cuisine/      # Cultural dishes, specialties
```

## 📝 Template Variable Replacement

### Current Template Variables → New Image Paths

**Hero Section Images:**
```html
<!-- OLD -->
<img src="{{HERO_IMAGE}}" alt="{{RESTAURANT_NAME}}">

<!-- NEW -->
<img src="images/placeholder/restaurant-interiors/hero-dining-elegant-001.jpg" 
     alt="{{RESTAURANT_NAME}} - Fine Dining Experience">
```

**Menu Item Images:**
```html
<!-- OLD -->
<img src="{{FOOD_IMAGE_1}}" alt="{{MENU_ITEM_1}}">

<!-- NEW -->
<img src="images/placeholder/food-dishes/main-pasta-italian-001.jpg" 
     alt="{{MENU_ITEM_1}} - Fresh Italian Pasta">
```

**About Section Images:**
```html
<!-- OLD -->
<img src="{{INTERIOR_IMAGE_1}}" alt="Restaurant Interior">

<!-- NEW -->
<img src="images/placeholder/restaurant-interiors/interior-dining-room-001.jpg" 
     alt="{{RESTAURANT_NAME}} Interior - Elegant Dining Room">
```

### Complete Template Image Set

## Casual Family Templates
```html
<!-- Hero -->
<img src="images/placeholder/restaurant-interiors/hero-cafe-cozy-003.jpg">

<!-- Menu Items -->
<img src="images/placeholder/food-dishes/main-burger-gourmet-004.jpg">
<img src="images/placeholder/food-dishes/main-pizza-margherita-005.jpg">
<img src="images/placeholder/food-dishes/appetizer-bruschetta-001.jpg">
<img src="images/placeholder/food-dishes/salad-caesar-001.jpg">

<!-- Drinks -->
<img src="images/placeholder/drinks-beverages/drink-smoothie-fruit-005.jpg">
<img src="images/placeholder/drinks-beverages/drink-coffee-latte-004.jpg">

<!-- Desserts -->
<img src="images/placeholder/desserts/dessert-ice-cream-003.jpg">

<!-- Staff -->
<img src="images/placeholder/staff-people/staff-server-friendly-002.jpg">
```

## Fine Dining Templates
```html
<!-- Hero -->
<img src="images/placeholder/restaurant-interiors/interior-fine-dining-005.jpg">

<!-- Menu Items -->
<img src="images/placeholder/food-dishes/main-steak-grilled-002.jpg">
<img src="images/placeholder/food-dishes/main-salmon-grilled-003.jpg">
<img src="images/placeholder/specialty-cuisine/specialty-sushi-japanese-001.jpg">

<!-- Drinks -->
<img src="images/placeholder/drinks-beverages/drink-wine-red-001.jpg">
<img src="images/placeholder/drinks-beverages/drink-cocktail-martini-003.jpg">

<!-- Desserts -->
<img src="images/placeholder/desserts/dessert-chocolate-cake-001.jpg">
<img src="images/placeholder/desserts/dessert-tiramisu-002.jpg">

<!-- Staff -->
<img src="images/placeholder/staff-people/staff-chef-cooking-001.jpg">
```

## Fast Casual Templates
```html
<!-- Hero -->
<img src="images/placeholder/restaurant-interiors/hero-bar-modern-002.jpg">

<!-- Menu Items -->
<img src="images/placeholder/food-dishes/main-burger-gourmet-004.jpg">
<img src="images/placeholder/food-dishes/main-tacos-mexican-007.jpg">
<img src="images/placeholder/food-dishes/salad-caesar-001.jpg">

<!-- Drinks -->
<img src="images/placeholder/drinks-beverages/drink-beer-craft-002.jpg">
<img src="images/placeholder/drinks-beverages/drink-smoothie-fruit-005.jpg">

<!-- Staff -->
<img src="images/placeholder/staff-people/staff-kitchen-team-004.jpg">
```

## Cafe/Bistro Templates
```html
<!-- Hero -->
<img src="images/placeholder/restaurant-interiors/hero-cafe-cozy-003.jpg">

<!-- Menu Items -->
<img src="images/placeholder/food-dishes/appetizer-bruschetta-001.jpg">
<img src="images/placeholder/food-dishes/appetizer-soup-002.jpg">
<img src="images/placeholder/desserts/dessert-cheesecake-004.jpg">

<!-- Drinks -->
<img src="images/placeholder/drinks-beverages/drink-coffee-latte-004.jpg">

<!-- Staff -->
<img src="images/placeholder/staff-people/staff-bartender-003.jpg">
```

## 🔄 Automated Image Integration Script

Create this script to quickly update all your templates:

```bash
#!/bin/bash
# update-template-images.sh

TEMPLATES_DIR="/Users/tyler/p2/restaurant-website-business/templates"
IMAGE_BASE="images/placeholder"

echo "🔄 Updating template images..."

# Function to update images in a template
update_template() {
    local template_dir="$1"
    local template_type="$2"
    
    echo "📝 Updating $template_dir ($template_type)"
    
    # Update index.html
    if [ -f "$template_dir/index.html" ]; then
        # Replace hero image placeholder
        sed -i '' 's|{{HERO_IMAGE}}|'"$IMAGE_BASE"'/restaurant-interiors/hero-dining-elegant-001.jpg|g' "$template_dir/index.html"
        
        # Replace food images
        sed -i '' 's|{{FOOD_IMAGE_1}}|'"$IMAGE_BASE"'/food-dishes/main-pasta-italian-001.jpg|g' "$template_dir/index.html"
        sed -i '' 's|{{FOOD_IMAGE_2}}|'"$IMAGE_BASE"'/food-dishes/main-steak-grilled-002.jpg|g' "$template_dir/index.html"
        sed -i '' 's|{{FOOD_IMAGE_3}}|'"$IMAGE_BASE"'/food-dishes/main-burger-gourmet-004.jpg|g' "$template_dir/index.html"
        sed -i '' 's|{{FOOD_IMAGE_4}}|'"$IMAGE_BASE"'/food-dishes/main-pizza-margherita-005.jpg|g' "$template_dir/index.html"
        
        # Replace interior images
        sed -i '' 's|{{INTERIOR_IMAGE_1}}|'"$IMAGE_BASE"'/restaurant-interiors/interior-dining-room-001.jpg|g' "$template_dir/index.html"
        
        # Replace chef/staff images
        sed -i '' 's|{{CHEF_IMAGE}}|'"$IMAGE_BASE"'/staff-people/staff-chef-cooking-001.jpg|g' "$template_dir/index.html"
    fi
    
    # Update menu.html
    if [ -f "$template_dir/menu.html" ]; then
        # Add menu-specific image updates here
        echo "  ✅ Updated menu.html"
    fi
}

# Update all template types
for template in "$TEMPLATES_DIR"/*; do
    if [ -d "$template" ]; then
        template_name=$(basename "$template")
        
        # Determine template type and update accordingly
        case "$template_name" in
            "casual-family"*)
                update_template "$template" "casual-family"
                ;;
            "fine-dining"*)
                update_template "$template" "fine-dining"
                ;;
            "fast-casual"*)
                update_template "$template" "fast-casual"
                ;;
            "cafe"*)
                update_template "$template" "cafe"
                ;;
            *)
                update_template "$template" "general"
                ;;
        esac
    fi
done

echo "✅ Template image updates complete!"
```

## 📱 Responsive Image Implementation

### HTML with Multiple Sizes
```html
<picture>
    <source media="(max-width: 768px)" 
            srcset="images/placeholder/food-dishes/main-pasta-italian-001.jpg">
    <source media="(min-width: 769px)" 
            srcset="images/placeholder/food-dishes/main-pasta-italian-001.jpg">
    <img src="images/placeholder/food-dishes/main-pasta-italian-001.jpg" 
         alt="{{MENU_ITEM_1}}" 
         loading="lazy">
</picture>
```

### CSS Background Images
```css
.hero-section {
    background-image: url('images/placeholder/restaurant-interiors/hero-dining-elegant-001.jpg');
    background-size: cover;
    background-position: center;
}

@media (max-width: 768px) {
    .hero-section {
        background-image: url('images/placeholder/restaurant-interiors/hero-cafe-cozy-003.jpg');
    }
}
```

## 🎯 Template-Specific Recommendations

### Casual Family Templates
- Use bright, welcoming food photography
- Include family-friendly dining scenes
- Showcase comfort food and kid-friendly options
- Warm, inviting interior shots

### Fine Dining Templates  
- Emphasize elegant plating and presentation
- Include wine and cocktail photography
- Showcase sophisticated interior design
- Professional chef and service photography

### Fast Casual Templates
- Focus on fresh, healthy ingredients
- Quick-service style food presentation
- Modern, clean interior aesthetics
- Active kitchen and prep photography

### Cafe/Bistro Templates
- Coffee and pastry focus
- Cozy, intimate interior settings
- Artisanal food presentation
- Relaxed dining atmosphere

## 🚀 Quick Implementation

1. **Download images:** Run `./download-images.sh`
2. **Update templates:** Run the update script above
3. **Test locally:** Open templates in browser
4. **Optimize:** Compress images if needed
5. **Deploy:** Copy image folder to your hosting

Your restaurant templates now have professional, high-quality placeholder images ready for client customization!