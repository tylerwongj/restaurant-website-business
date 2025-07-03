# Template Development Specifications

Technical specifications and standards for developing restaurant website templates.

## Template Architecture

### File Structure
Each template must include:
```
template-name/
├── index.html          # Homepage with all sections
├── menu.html          # Dedicated menu page (optional for some)
├── styles.css         # All styling with CSS variables
└── script.js          # Interactive functionality
```

### Required Sections (index.html)
1. **Navigation** - Fixed header with logo and menu links
2. **Hero Section** - Main banner with call-to-action
3. **About/Experience** - Restaurant story and features
4. **Menu Preview** - Highlighted dishes with pricing
5. **Location/Hours** - Contact information and hours
6. **Contact/Reservations** - Contact form and map
7. **Footer** - Additional info and social media

### CSS Variable System
Templates use CSS custom properties for easy customization:

```css
:root {
  /* Color Scheme Variables */
  --primary-color: #value;
  --secondary-color: #value;
  --accent-color: #value;
  --text-dark: #value;
  --text-light: #value;
  --background-dark: #value;
  --background-light: #value;
}
```

### Color Schemes Available
- **warm** (default) - Orange/brown/cream tones
- **classic** - Black/white/gray professional
- **business** - Navy/blue/white corporate
- **cool** - Teal/green/white fresh
- **bold** - Purple/pink/black vibrant

## Placeholder Variables

### Required Placeholders
```html
{{RESTAURANT_NAME}}      # Business name
{{TAGLINE}}             # Business tagline/slogan
{{PHONE}}               # Phone number
{{EMAIL}}               # Email address
{{FULL_ADDRESS}}        # Complete address
{{GOOGLE_MAPS_EMBED}}   # Google Maps iframe src
{{HERO_IMAGE}}          # Main banner image
{{LOGO_URL}}            # Logo image path
```

### Menu Item Placeholders
```html
{{MENU_ITEM_1}}         # Dish name
{{MENU_DESCRIPTION_1}}  # Dish description
{{PRICE_1}}             # Dish price (no $ symbol)
```

### Social Media (Optional)
```html
{{FACEBOOK_URL}}        # Facebook page URL
{{INSTAGRAM_URL}}       # Instagram profile URL
{{YELP_URL}}           # Yelp business page URL
```

## Image Requirements

### Image Placeholders
```html
{{HERO_IMAGE}}          # 1200x800px minimum
{{INTERIOR_IMAGE_1}}    # 800x600px interior photo
{{FOOD_IMAGE_1}}        # 500x400px food photos
{{FOOD_IMAGE_2}}        # (up to 4 food images)
{{FOOD_IMAGE_3}}
{{FOOD_IMAGE_4}}
```

### Image Specifications
- **Logo**: PNG with transparent background, 200x100px flexible
- **Hero**: JPEG/PNG, 1200x800px minimum, <500KB
- **Interior**: JPEG, 800x600px, <400KB
- **Food Photos**: JPEG, 500x400px each, <300KB

## Responsive Design Standards

### Breakpoints
```css
/* Mobile */
@media (max-width: 768px) { }

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1025px) { }
```

### Mobile Requirements
- Touch-friendly navigation (hamburger menu)
- Readable text without zooming
- Properly sized buttons and links
- Optimized images for mobile bandwidth

## JavaScript Functionality

### Required Features
```javascript
// Mobile navigation toggle
// Smooth scrolling for anchor links
// Contact form validation
// Image lazy loading (optional)
```

### Performance Standards
- Vanilla JavaScript (no external dependencies)
- Minimal script size (<10KB compressed)
- Non-blocking execution
- Progressive enhancement

## Template Categories

### Casual Family
- Warm, welcoming design
- Family-friendly imagery
- Comfortable typography
- Moderate pricing display

### Fine Dining
- Elegant, sophisticated design
- Dark color schemes preferred
- Serif typography for headings
- Premium presentation

### Fast Casual
- Modern, clean design
- Bright, energetic colors
- Sans-serif typography
- Clear pricing and menu focus

### Cafe & Bistro
- Cozy, intimate design
- Natural color palettes
- Mixed typography styles
- Coffee/breakfast focus

## Quality Standards

### Performance
- Page load time <3 seconds
- Optimized images and CSS
- Minimal HTTP requests
- Mobile-optimized delivery

### Accessibility
- Semantic HTML structure
- Alt text for all images
- Proper heading hierarchy
- Keyboard navigation support
- Color contrast compliance

### SEO
- Proper meta tags
- Structured heading hierarchy
- Clean URL structure
- Schema markup (optional)

## Testing Checklist

### Cross-Browser Testing
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

### Device Testing
- ✅ Mobile phones (iOS/Android)
- ✅ Tablets (iPad/Android)
- ✅ Desktop (1920x1080+)
- ✅ Large screens (4K)

### Functionality Testing
- ✅ Navigation works on all devices
- ✅ Forms submit properly
- ✅ Images load correctly
- ✅ Links are functional
- ✅ Contact information displays

## Development Workflow

### 1. Template Creation
- Start with base HTML structure
- Implement responsive CSS with variables
- Add JavaScript functionality
- Insert placeholder variables

### 2. Testing
- Test across all required browsers/devices
- Validate HTML and CSS
- Check accessibility compliance
- Verify all placeholders work

### 3. Documentation
- Update template catalog
- Add to configuration files
- Create usage examples
- Document any special features

### 4. Integration
- Add to automation scripts
- Test with generation system
- Verify customization works
- Add to client selection options