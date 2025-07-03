# 🍽️ Restaurant Website Business - Complete Workflow Guide

## 🚀 Quick Start Workflow

### 1. Create New Client Project
```bash
node scripts/create-client.js "Restaurant Name" [template] [color-scheme]
```
**Example**: `node scripts/create-client.js "Mario's Italian Kitchen"`

**What it creates**:
- Complete client folder structure
- Business tracking system
- Configuration files
- Image requirements guide

### 2. Collect Client Assets
**Client provides**:
- Logo (PNG with transparency)
- Hero image (1200x800px)
- Interior photo (600x400px)
- 4 food photos (400x300px each)
- Business information (menu, contact, hours)

**Your actions**:
- Add images to `client-projects/[client]/source/images/`
- Edit `client-projects/[client]/source/client-data.json`

### 3. Generate Website
```bash
node scripts/generate-website.js "Restaurant Name"
```

**What it does**:
- Replaces all placeholders with client data
- Optimizes and copies images
- Applies color scheme
- Creates production-ready website

### 4. Quality Assurance
```bash
node scripts/validate-website.js "Restaurant Name"
```

**Checks**:
- All placeholders replaced
- Images present and optimized
- Mobile responsiveness
- SEO fundamentals
- Accessibility basics

### 5. Client Preview (Optional)
```bash
node scripts/preview-server.js "Restaurant Name" --open
```

**Use for**:
- Client demos
- Mobile testing
- Stakeholder approval
- Cross-browser verification

### 6. Package for Delivery
```bash
node scripts/package-delivery.js "Restaurant Name"
```

**Creates**:
- ZIP package with website files
- Client setup documentation
- Hosting instructions
- Maintenance guide

## 🔧 Advanced Operations

### Change Template or Color Scheme
```bash
# View current configuration
node scripts/change-config.js "Restaurant Name" --view

# Change template
node scripts/change-config.js "Restaurant Name" --template fine-dining

# Change color scheme
node scripts/change-config.js "Restaurant Name" --color bold

# Regenerate after changes
node scripts/generate-website.js "Restaurant Name"
```

### Revision Management
```bash
# Create revision request
node scripts/track-revision.js create "Restaurant Name" "Update menu prices, change hero image"

# Update revision status
node scripts/track-revision.js update "Restaurant Name" 2 --status completed

# List all revisions
node scripts/track-revision.js list "Restaurant Name"
```

### Business Management
```bash
# View client status
node scripts/business-manager.js status "Restaurant Name"

# Update project status
node scripts/business-manager.js status "Restaurant Name" delivery --paid

# Add client note
node scripts/business-manager.js note "Restaurant Name" "Client approved design"

# List all clients
node scripts/business-manager.js list

# Generate invoice
node scripts/business-manager.js invoice "Restaurant Name"
```

### Image Optimization
```bash
# Optimize client images
node scripts/optimize-images.js "Restaurant Name"

# Create optimization guide
node scripts/optimize-images.js --guide "Restaurant Name"
```

## 📊 Business Workflow

### Standard Project Timeline

1. **Setup** (5 minutes)
   - Create client project
   - Send asset requirements

2. **Data Collection** (Client: 1-2 days)
   - Client provides images and information
   - You add to project folder

3. **Development** (15-30 minutes)
   - Generate website
   - Run quality checks
   - Make any adjustments

4. **Delivery** (5 minutes)
   - Package final deliverable
   - Update business tracking
   - Send to client

### Revenue Tracking

**Base Project**: $1000 (includes 1 revision)
**Additional Revisions**: $100 each

**Monthly Target**: 8-12 websites = $8k-12k revenue

### Quality Standards

- **Score**: 90%+ validation score before delivery
- **Performance**: <3 second load time
- **Mobile**: Fully responsive design
- **SEO**: Title, meta description, headings
- **Images**: All optimized, proper alt tags

## 🎯 Available Templates

### Casual Dining
- `casual-family` - Base family restaurant (default)
- `casual-family-grid` - Grid layout with cards
- `casual-family-modern` - Contemporary with sliders
- `casual-family-minimalist` - Clean minimal design
- `casual-family-rustic` - Warm rustic theme
- `casual-family-vibrant` - Colorful family-friendly

### Fine Dining
- `fine-dining` - Elegant upscale template
- `fine-dining-elegant` - Sophisticated presentations

### Fast Casual
- `fast-casual` - Modern quick-service template

### Cafe & Coffee
- `cafe-bistro` - Coffee shop template
- `cafe-cozy` - Warm cafe atmosphere

## 🌈 Color Schemes

- `classic` - Timeless black, white, gray
- `business` - Professional navy blue
- `warm` - Inviting orange, brown, cream (default)
- `cool` - Fresh teal, green, white
- `bold` - Vibrant purple, pink, black

## 📂 File Structure

```
client-projects/restaurant-name/
├── source/                    # Client data & assets (YOU EDIT)
│   ├── client-data.json       # Business info
│   ├── config.json            # Template & settings
│   ├── images/                # Client photos
│   └── IMAGE_REQUIREMENTS.md  # Asset guide
├── generated/                 # Auto-generated files (DON'T TOUCH)
│   ├── website/               # Final website
│   ├── client-docs/           # Handoff documentation
│   └── delivery.zip           # Final package
├── revisions/                 # Revision tracking
│   ├── revision-1/            # Initial delivery
│   └── revision-2/            # Additional revisions
└── _business/                 # Business tracking
    └── status.json            # Project status & billing
```

## 🛠️ Troubleshooting

### Common Issues

**Validation Errors**:
- Check all required images are present
- Verify client data completeness
- Ensure no {{PLACEHOLDER}} remain

**Template Not Found**:
- Check available templates: `node scripts/change-config.js --list-templates`
- Verify spelling and case sensitivity

**Images Not Loading**:
- Confirm images in `source/images/` folder
- Check filenames match requirements
- Regenerate website after adding images

**Business Tracking Issues**:
- Ensure client created with `create-client.js`
- Check `_business/status.json` exists
- Update status manually if needed

## 🎉 Success Metrics

- **Development Time**: 15-30 minutes per website
- **Client Satisfaction**: Professional delivery package
- **Quality Score**: 90%+ validation rating
- **Revenue Goal**: $8k-12k/month (8-12 sites)

---

**Next Steps**: Use this workflow to build your $100k+/year restaurant website business! 🚀