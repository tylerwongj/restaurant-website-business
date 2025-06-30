# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **automated restaurant website development business** designed to generate $100k+/year revenue through template-based website automation. The business model focuses on:

- **Service**: Fully automated website generation from client data collection to delivery
- **Pricing**: $1,000 per website ($800-900 minimum)
- **Delivery**: 48-72 hours automated turnaround
- **Target**: 2-3 websites/week for $8k-12k/month revenue

## Main Mission & Automated Workflow

**See `MAIN_MISSION.md` for complete vision and implementation details.**

### Core Automation Vision
1. **Client Data Collection**: Complete upfront data gathering via validated website form
2. **Asset Requirements**: All images and content provided before work begins  
3. **Automated Generation**: Scripts process client data → inject into templates → generate complete websites
4. **Package Delivery**: Complete website + documentation + hosting guides delivered
5. **Strict Boundaries**: One revision included, $100 additional revisions, no ongoing support

### Key Automation Principles
- **No work without 100% complete data** - timer doesn't start until everything provided
- **Script-driven website generation** - minimal manual intervention required
- **Complete package delivery** - client receives everything needed for hosting
- **Future multi-industry expansion** - same system scales beyond restaurants

## Template Architecture

### Complete Template Library (120+ Templates)

**Production-Ready Templates (`templates/`):**
- `templates/casual-family/` - Base family restaurant template
- `templates/casual-family-grid/` - Grid-based layout with info cards
- `templates/casual-family-modern/` - Contemporary design with hero sliders
- `templates/casual-family-minimalist/` - Clean minimal white space design
- `templates/casual-family-rustic/` - Warm rustic theme with wood textures
- `templates/casual-family-vibrant/` - Colorful family-friendly design
- `templates/fine-dining/` - Elegant upscale restaurant template
- `templates/fine-dining-elegant/` - Sophisticated course presentations
- `templates/fine-dining/v1-v5/` - 5 additional elegant variations
- `templates/fast-casual/` - Modern quick-service template
- `templates/fast-casual/v1-v5/` - 5 modern quick-service variations
- `templates/cafe-bistro/` - Coffee shop & bistro template
- `templates/cafe-cozy/` - Cozy coffee shop atmosphere

**Extended Template Library (`templates-untested/`):**
- **Asian Cuisine**: `asian-fusion-v1/` through `asian-fusion-v5/`
- **Bakery & Dessert**: `bakery-dessert-v1/` through `bakery-dessert-v5/`
- **Cafe Variations**: `cafe-bistro-v1/` through `cafe-bistro-v5/`
- **Casual Family**: `casual-family-v1/` through `casual-family-v5/`
- **Fast Casual**: `fast-casual-v1/` through `fast-casual-v5/`
- **Fine Dining**: `fine-dining-v1/` through `fine-dining-v5/`
- **Mexican**: `mexican-v1/` through `mexican-v5/`
- **Pizza**: `pizza-italian-v1/` through `pizza-italian-v5/`
- **Seafood**: `seafood-v1/` through `seafood-v5/`
- **Steakhouse**: `steakhouse-v1/` through `steakhouse-v5/`
- **Sports Bar**: `sports-bar-v1/` and `sports-bar-v2/`
- **Specialty**: `artisan-bakery/`, `mediterranean-coastal/`, `modern-steakhouse/`, `wine-bar-elegant/`

**Multi-Niche Business Templates (`templates-business-multi-niche/`):**
- `beauty-spa/` - Spa and wellness services
- `fitness-wellness/` - Gym and wellness centers
- `medical-healthcare/` - Healthcare clinics
- `photography-portfolio/` - Photography services
- `real-estate-modern/` - Real estate agencies

**Experimental Templates (`templates-untested-2/`, `templates-untested-3/`, `templates-untested-new/`):**
- Advanced layout experiments
- Modern design patterns
- Specialty cuisine variations
- Business service templates

**Template Structure**: Each template contains:
  - `index.html` - Main homepage with placeholder variables ({{RESTAURANT_NAME}}, {{PHONE}}, etc.)
  - `menu.html` - Dedicated menu page (restaurant templates)
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

## Image Asset Management

### Image Library Structure (`images/`)

**Placeholder Images (`images/placeholder/`):**
- `restaurant-interiors/` - Hero sections, dining rooms, bar areas, patios
- `food-dishes/` - Appetizers, main courses, salads, pizza, international cuisine
- `drinks-beverages/` - Coffee, wine, cocktails, beer, non-alcoholic
- `desserts/` - Cakes, pastries, ice cream, seasonal desserts
- `staff-people/` - Chefs, servers, kitchen teams, customer photos
- `exteriors-atmosphere/` - Storefronts, street views, signage, entrances
- `logos-branding/` - Logo concepts, food icons, badge designs
- `events-occasions/` - Private parties, wine tastings, cooking classes
- `ingredients-prep/` - Fresh ingredients, cooking processes, plating
- `specialty-cuisine/` - Italian, Asian, Mexican, Mediterranean specialties

**Client-Ready Images (`images/real/`):**
- Production-quality images organized by category
- Optimized for web use (<500KB each)
- Professional food photography and restaurant interiors

**Test Images (`images/test/`):**
- Template testing and development images
- Quick integration for template validation

### Image Integration System
- **Template Variables**: {{HERO_IMAGE}}, {{FOOD_IMAGE_1}}, etc.
- **Automated Scripts**: `images/placeholder/download-images.sh`
- **Integration Guide**: `images/placeholder/TEMPLATE_INTEGRATION.md`
- **Specifications**: Technical requirements and optimization guidelines

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

## Automation System Architecture

### Data Collection & Validation System
- **Client Website Form**: Comprehensive data gathering with validation logic
- **Asset Upload System**: Image requirements enforced with size/format validation
- **Completeness Validation**: No work begins until 100% data provided
- **Image Specifications**: Automatic validation against requirements (logo PNG, hero 1200x800px, etc.)

### Automated Website Generation Pipeline
```bash
# Automated generation process
1. Data intake → client-projects/[client-name]/source/client-data.json
2. Template selection → cp templates/[chosen]/ client-projects/[client-name]/
3. Content injection → scripts/generate-website.js (replace {{VARIABLES}})
4. Image processing → scripts/optimize-images.js (resize, compress, place)
5. Quality validation → scripts/test-website.js (responsive, performance)
6. Package creation → scripts/package-delivery.js (zip with docs)
```

### Required Automation Scripts (Future Development)
- `scripts/validate-client-data.js` - Ensure completeness before processing
- `scripts/generate-website.js` - Template variable replacement and customization
- `scripts/optimize-images.js` - Image processing and placement
- `scripts/test-website.js` - Automated quality assurance testing
- `scripts/package-delivery.js` - Final website packaging with documentation

### Client Asset Requirements Enforcement
- **Logo**: PNG transparent background, validated on upload
- **Hero Images**: 1200x800px minimum, automatically validated
- **Menu Photos**: 400x300px each, batch validation
- **All Assets Required**: Website generation blocked until complete

### Automated Quality Standards
- **Performance Testing**: Scripts validate <3 second loading
- **Responsive Testing**: Automated mobile/desktop compatibility checks
- **Form Testing**: Contact forms and navigation validation
- **Image Optimization**: Automatic compression and format optimization

## Future Development Priorities

### Phase 1: Core Automation (Immediate Priority)
1. **Client Data Collection Website** - Form with validation logic and asset upload
2. **Website Generation Scripts** - Automated template processing and content injection
3. **Quality Assurance Automation** - Testing and validation scripts
4. **Package Delivery System** - Automated final package creation

### Phase 2: Business Scaling
1. **Portfolio showcase site** - Live demos of all 120+ templates
2. **Multi-industry expansion** - Templates beyond restaurants (spa, fitness, medical, etc.)
3. **Referral system** development  
4. **Local SEO add-on** service
5. **Advanced automation features** - AI-enhanced content generation

### Template Automation System (Planned)
1. **Template Generator**: Auto-generate templates from specifications
2. **Client Selection Interface**: Dropdown-based template customization
3. **Configuration Management**: Centralized template specifications
4. **Bulk Operations**: Mass template updates and maintenance

### Template Expansion (Future)
1. **Additional cuisine specialties** - Already have 100+ variations built
2. **Multi-language variations** 
3. **Industry-specific features** - Online ordering, reservations, etc.
4. **Advanced customization options** - Dynamic color schemes, layout variations

## Quality Standards

- All templates must be mobile-responsive
- Loading speed under 3 seconds
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Professional appearance matching template category
- Working contact forms and navigation
- Optimized images and clean code structure

## Template Automation & Generation (Future Feature)

### Automated Template Generation System
Future enhancement to create templates from specifications:

**Configuration-Driven Templates:**
```yaml
# template-config.yml (example)
template_type: "casual-family"
color_scheme: "warm"
layout_style: "grid"
sections:
  - hero: true
  - menu: true
  - about: true
  - contact: true
features:
  - mobile_responsive: true
  - color_variations: 5
  - image_placeholders: true
```

**Client Selection Interface:**
- Dropdown menus for template type, color scheme, layout
- Real-time preview generation
- Automatic image assignment from library
- One-click template generation

**Benefits:**
- Reduce development time from 2-3 hours to 15-30 minutes
- Ensure consistency across all templates
- Enable client self-service template selection
- Streamline bulk template updates and maintenance