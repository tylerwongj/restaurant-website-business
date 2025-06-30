# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **restaurant website development business** designed to generate $100k+/year revenue through template-based website development. The business model focuses on:

- **Service**: Custom HTML/CSS/JS restaurant websites using templates
- **Pricing**: $1,000 per website ($800-900 minimum)
- **Delivery**: 48-72 hours turnaround
- **Target**: 2-3 websites/week for $8k-12k/month revenue

## Template Architecture

### Current Template System
- **Primary Template**: `templates/casual-family/` (production-ready)
- **Template Structure**: Each template contains:
  - `index.html` - Main homepage with placeholder variables ({{RESTAURANT_NAME}}, {{PHONE}}, etc.)
  - `menu.html` - Dedicated menu page
  - `styles.css` - CSS with 5 color scheme variations using CSS variables
  - `script.js` - Interactive functionality (mobile nav, smooth scrolling, forms)

### Template Customization Process
1. Use CSS variables in `:root` for easy color scheme switching
2. Replace placeholder variables with client-specific content
3. Apply chosen color scheme by changing CSS class on `<body>`
4. Optimize and replace images according to asset specifications

### Color Schemes Available
- Classic (black/white/gray)
- Business (navy/blue/white) 
- Warm (orange/brown/cream) - Default
- Cool (teal/green/white)
- Bold (purple/pink/black)

## Business Operations Architecture

### Client Workflow Process
1. **Pre-Project**: Service agreement → Asset specifications → Payment
2. **Asset Collection**: Intake form → Image/content delivery → Validation
3. **Development**: Template selection → Customization → Testing → Delivery
4. **Post-Delivery**: One revision round included → Additional revisions $100 each

### Key Business Documents Structure
- `business-docs/` - Legal and operational frameworks
  - `service-agreement.md` - Contract template with clear boundaries
  - `revision-policy.md` - Defines $100 revision scope
  - `asset-specifications.md` - Exact image and content requirements
  - `pricing-sheet.md` - Complete pricing strategy
- `client-onboarding/` - Streamlined client process
  - `intake-form.md` - Comprehensive client information gathering
  - `domain-hosting-guide.md` - Client technical setup
- `operations/` - Development workflow
  - `workflow-checklist.md` - Step-by-step 2-3 hour development process
- `sales-materials/` - Revenue generation
  - `upwork-proposals.md` - 6 proven proposal templates

## Development Commands

### Template Development
```bash
# Open template for editing
open templates/casual-family/index.html

# Test template locally  
# (Use live server or simple HTTP server to view)
python3 -m http.server 8000
# Navigate to localhost:8000/templates/casual-family/
```

### Client Project Workflow
```bash
# 1. Create client project folder
mkdir client-projects/[client-name]
cp -r templates/casual-family/ client-projects/[client-name]/

# 2. Customize template
# - Replace {{PLACEHOLDER}} variables with client data
# - Apply chosen color scheme
# - Optimize and replace images
# - Test responsiveness and functionality

# 3. Package for delivery
zip -r [client-name]-website.zip client-projects/[client-name]/
```

## Template Development Guidelines

### Code Standards
- **No frameworks**: Pure HTML/CSS/JS for fast loading
- **Mobile-first**: Responsive design with mobile optimization
- **Performance**: Fast-loading, optimized images and CSS
- **Template Variables**: Use {{VARIABLE_NAME}} format for client customization
- **CSS Architecture**: Use CSS custom properties for color schemes

### Template Requirements
- Responsive navigation with mobile hamburger menu
- Hero section with call-to-action buttons
- About/story section
- Menu integration (link to menu.html)
- Contact section with form and Google Maps
- Social media integration
- Fast loading (<3 seconds)
- Mobile optimization
- Cross-browser compatibility

### Client Asset Requirements
Templates expect specific image formats and sizes (defined in `business-docs/asset-specifications.md`):
- Logo: PNG with transparent background
- Hero image: 1200x800px minimum
- Menu items: 400x300px each
- About section images: 600x400px

## Business Rules & Boundaries

### Scope Limitations
- **One revision round included** in base price
- **$100 per additional revision** after delivery
- **No ongoing support** - clean handoff
- **No custom development** - template-based only
- **48-72 hour delivery** timeline after assets received

### Revenue Protection
- **Minimum price**: $800 (negotiate down from $1000)
- **Asset delays**: Client responsibility, timer pauses
- **Scope creep**: Refer to service agreement boundaries
- **Payment**: Required before development begins

## Future Development Priorities

### Template Expansion
1. **Fine-dining template** - Elegant, dark theme for upscale restaurants  
2. **Fast-casual template** - Bold, mobile-first for quick-service
3. **Portfolio showcase site** - Live demos for sales

### Business Scaling
1. **Referral system** development  
2. **Local SEO add-on** service
3. **Automated client onboarding** system

## Quality Standards

- All templates must be mobile-responsive
- Loading speed under 3 seconds
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Professional appearance matching template category
- Working contact forms and navigation
- Optimized images and clean code structure