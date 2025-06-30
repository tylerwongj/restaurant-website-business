# Template Customization System

Automated system for replacing placeholder variables in restaurant templates with real client data.

## Quick Start

1. **Scan a template** to see all placeholders:
```bash
node scripts/customize-template.js scan templates/casual-family
```

2. **Create client data file** (copy from `client-data-example.json`):
```bash
cp client-data-example.json client-projects/marios-kitchen-data.json
```

3. **Customize template** with client data:
```bash
node scripts/customize-template.js customize templates/casual-family client-projects/marios-kitchen-data.json client-projects/marios-kitchen
```

## Workflow

### Step 1: Client Data Collection
- Copy `client-data-example.json` for each new client
- Fill in all required placeholder values
- Choose color scheme: `classic`, `business`, `warm`, `cool`, or `bold`

### Step 2: Template Customization
```bash
# Create client project folder
mkdir client-projects/[client-name]

# Customize template
node scripts/customize-template.js customize \
  templates/casual-family \
  [client-name]-data.json \
  client-projects/[client-name]
```

### Step 3: Manual Finishing
- Replace placeholder images with client-provided images
- Test responsiveness and functionality
- Apply color scheme if different from default
- Package for delivery

## Color Scheme Application

Templates use CSS variables for easy color switching. Change the `<body>` class:

```html
<!-- Default warm scheme -->
<body class="theme-warm">

<!-- Other schemes -->
<body class="theme-classic">
<body class="theme-business"> 
<body class="theme-cool">
<body class="theme-bold">
```

## File Structure

```
client-projects/
├── marios-kitchen/
│   ├── index.html          # Customized homepage
│   ├── menu.html           # Customized menu page
│   ├── styles.css          # CSS with color variables
│   └── script.js           # Interactive functionality
└── marios-kitchen-data.json # Client data file
```

## Common Placeholders

| Placeholder | Example | Required |
|-------------|---------|----------|
| `{{RESTAURANT_NAME}}` | "Mario's Italian Kitchen" | ✅ |
| `{{PHONE}}` | "(555) 123-4567" | ✅ |
| `{{EMAIL}}` | "info@restaurant.com" | ✅ |
| `{{FULL_ADDRESS}}` | "123 Main St, City, State" | ✅ |
| `{{TAGLINE}}` | "Authentic Italian cuisine" | ✅ |
| `{{HERO_IMAGE}}` | "images/hero.jpg" | ✅ |
| `{{GOOGLE_MAPS_EMBED}}` | Google Maps iframe src | ✅ |
| `{{FACEBOOK_URL}}` | Social media links | ❌ |

## Time Savings

- **Before**: 2-3 hours manual find/replace
- **After**: 5-10 minutes automated + image replacement
- **Result**: 80%+ time reduction on template customization