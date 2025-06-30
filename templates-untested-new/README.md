# New Restaurant Website Templates

This directory contains 10 new restaurant website templates specifically designed to showcase the generated images from `images/test/`. Each template incorporates the food images in different ways to create unique visual experiences.

## Template Overview

### 1. Gallery Showcase (`gallery-showcase/`)
**Focus**: Visual gallery experience with prominent food image displays
**Key Features**:
- Hero section with main hero image + grid of food images
- Dedicated gallery section with filtering (All, Food, Appetizers, Desserts, Drinks)
- Interactive hover overlays showing dish names, descriptions, and prices
- Lightbox functionality for enlarged image viewing
- Menu preview with integrated food images

**Image Integration**:
- Uses `hero/hero-image.jpg` as main hero background
- Displays all 6 food images (`food-image-1.jpg` through `food-image-6.jpg`) in gallery grid
- Each food image has overlay with pricing and description placeholders

### 2. Hero Immersive (`hero-immersive/`)
**Focus**: Full-screen hero experience with immersive background imagery
**Key Features**:
- Full viewport hero with parallax background effects
- Feature cards with glass morphism effects
- Experience showcase with hover-reveal overlays
- Full-width image separator sections
- Background hero images in contact section

**Image Integration**:
- `hero/hero-image.jpg` as full-screen hero background and contact background
- Food images 1-6 used in experience showcase and menu sections
- Parallax scrolling effects on background images
- Image-based menu section headers

### 3. Food Grid Modern (`food-grid-modern/`)
**Focus**: Clean, modern grid layout showcasing food imagery
**Key Features**:
- Masonry-style food grid layout
- Category-based organization
- Hover animations and transformations
- Interactive filtering system
- Modern card-based design

**Image Integration**:
- All 6 food images displayed in responsive grid
- Category-based filtering and organization
- Hover effects revealing detailed information
- Image-first design approach

### 4. Story Narrative (`story-narrative/`)
**Focus**: Storytelling approach combining food images with restaurant narrative
**Key Features**:
- Story-driven layout with image-text combinations
- Timeline-style presentation
- Behind-the-scenes imagery integration
- Chef's journey narrative
- Process and ingredient showcases

**Image Integration**:
- Food images woven into storytelling sections
- Hero image as story backdrop
- Sequential image reveals as user scrolls
- Images support narrative flow

### 5. Visual Menu Showcase (`visual-menu-showcase/`)
**Focus**: Menu-centric design with integrated food photography
**Key Features**:
- Image-heavy menu presentation
- Interactive menu categories
- Dish photography with detailed descriptions
- Price displays integrated with images
- Visual hierarchy emphasizing food imagery

**Image Integration**:
- Each food image represents a menu category or featured dish
- Hero image as menu backdrop
- Food images as primary navigation elements
- Visual menu cards with integrated photography

### 6. Masonry Pinterest (`masonry-pinterest/`)
**Focus**: Pinterest-style masonry layout with dynamic food image grid
**Key Features**:
- Pinterest-inspired masonry layout in hero section
- Interactive discovery section with filtering
- Card-based design with detailed overlays
- Dynamic grid arrangements
- Social media-style visual presentation

**Image Integration**:
- Hero masonry grid using all 6 food images in various sizes
- Discovery section with expandable cards
- Dynamic filtering by food categories
- Modal views for detailed image viewing

### 7. Split Screen (`split-screen/`)
**Focus**: Split-screen layout with food images prominently on one side
**Key Features**:
- Fixed split-screen design with image panel
- Scrolling content on one side, static images on other
- Minimalist content presentation
- Large format image display
- Modern asymmetrical design

**Image Integration**:
- Large format food images take up 50% of screen
- Hero image as fixed background panel
- Food images rotate as user scrolls through content
- Image-driven navigation

### 8. Carousel Showcase (`carousel-showcase/`)
**Focus**: Rotating carousel displays with multiple food image sliders
**Key Features**:
- Multiple carousel sections throughout site
- Auto-rotating hero carousel
- Category-based image carousels
- Touch/swipe navigation support
- Smooth transition animations

**Image Integration**:
- Hero carousel featuring all food images
- Menu category carousels
- Customer favorite rotating displays
- Interactive carousel controls

### 9. Minimal Clean (`minimal-clean/`)
**Focus**: Clean, minimal design with strategic food image placement
**Key Features**:
- Whitespace-heavy design
- Strategic image placement
- Typography-focused content
- Subtle animations
- Clean grid systems

**Image Integration**:
- Selected food images used sparingly for maximum impact
- Hero image as subtle background
- Menu items with carefully chosen food photography
- Minimal overlay approach

### 10. Dark Dramatic (`dark-dramatic/`)
**Focus**: Dark theme with dramatic lighting effects on food imagery
**Key Features**:
- Dark color scheme throughout
- Dramatic lighting and shadow effects
- High-contrast design elements
- Moody atmospheric presentation
- Premium/upscale aesthetic

**Image Integration**:
- Food images with enhanced contrast and dramatic lighting
- Dark overlays and atmospheric effects
- Hero images with cinematic presentation
- Restaurant photography with premium feel

## Technical Specifications

### Color Schemes
All templates include 5 color scheme variations:
- **Classic**: Black, white, gray tones
- **Business**: Navy, blue, white professional colors
- **Warm**: Orange, brown, cream (default)
- **Cool**: Teal, green, white fresh colors
- **Bold**: Purple, pink, black vibrant colors

### Responsive Design
- Mobile-first responsive design
- Hamburger navigation for mobile
- Flexible grid systems
- Optimized touch interactions
- Viewport-based scaling

### Performance Features
- Lazy loading for images
- CSS animations and transitions
- Optimized image loading
- Smooth scrolling
- Parallax effects where appropriate

## File Structure
Each template contains:
- `index.html` - Main homepage with placeholder variables
- `styles.css` - Complete CSS with color scheme variations
- `script.js` - Interactive functionality and animations

## Placeholder Variables
Templates use these variables for client customization:
- `{{RESTAURANT_NAME}}` - Restaurant name
- `{{TAGLINE}}` - Restaurant tagline/slogan
- `{{DESCRIPTION}}` - Restaurant description
- `{{LOGO_URL}}` - Logo image path
- `{{HERO_IMAGE}}` - Hero section image
- `{{PHONE}}` - Phone number
- `{{EMAIL}}` - Email address
- `{{ADDRESS}}` - Physical address
- `{{HOURS}}` - Operating hours
- `{{FOOD_NAME_X}}` - Individual dish names
- `{{FOOD_DESCRIPTION_X}}` - Dish descriptions
- `{{FOOD_PRICE_X}}` - Menu item prices
- Social media URLs and other business details

## Image Assets Used
Templates incorporate these test images:
- `../../images/test/hero/hero-image.jpg` - Main hero backgrounds
- `../../images/test/food/food-image-1.jpg` through `food-image-6.jpg` - Menu items and gallery
- Additional placeholder paths for client-specific images

## Development Notes
- Templates are built with vanilla HTML, CSS, and JavaScript
- No external dependencies or frameworks required
- Easy to customize and deploy
- Cross-browser compatible
- SEO-friendly structure
- Accessible design patterns

## Usage Instructions
1. Choose appropriate template based on client needs and image content
2. Replace placeholder variables with client-specific content
3. Apply preferred color scheme by changing body class
4. Replace image paths with client-provided assets
5. Test responsiveness and functionality
6. Deploy to client's hosting environment

These templates provide diverse options for showcasing restaurant food imagery while maintaining professional design standards and optimal user experience.