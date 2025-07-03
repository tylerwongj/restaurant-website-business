# Configuration & Customization Scripts

Scripts for template customization and project configuration management.

## Scripts Overview

### `customize-template.js`
**Purpose**: Replace placeholder variables in templates with real client data.

**Usage**:
```bash
node customize-template.js customize <template-path> <data.json> <output-path>
node customize-template.js scan <template-path>
```

**What it does**:
- Scans templates to find all placeholder variables ({{VARIABLE_NAME}})
- Replaces placeholders with client-specific data
- Copies entire template directory structure
- Preserves file relationships and directory organization
- Provides detailed replacement report
- Handles nested directories and multiple file types

**Examples**:
```bash
# Scan template for placeholders
node customize-template.js scan templates/casual-family

# Customize template with client data
node customize-template.js customize templates/casual-family client-data.json output/
```

### `change-config.js`
**Purpose**: Modify project settings including templates, colors, and optimization features.

**Usage**:
```bash
node change-config.js "Client Name" [options]
node change-config.js "Client Name" --view
node change-config.js --list-templates
node change-config.js --list-colors
```

**Options**:
- `--template <id>` - Change template (casual-family, fine-dining, fast-casual, etc.)
- `--color <id>` - Change color scheme (warm, cool, business, classic, bold)
- `--image-opt <true/false>` - Enable/disable image optimization
- `--mobile-opt <true/false>` - Enable/disable mobile optimization  
- `--seo-opt <true/false>` - Enable/disable SEO optimization
- `--view` - Display current configuration

**What it does**:
- Updates project configuration files
- Validates template and color scheme availability
- Modifies optimization settings
- Tracks configuration change history
- Provides before/after comparison
- Updates project timestamps

**Examples**:
```bash
# Change template and color scheme
node change-config.js "Mario's Italian" --template fine-dining --color bold

# View current configuration
node change-config.js "The Wine Bar" --view

# List available options
node change-config.js --list-templates
node change-config.js --list-colors
```

## Template Customization Process

### Placeholder System
Templates use double-brace placeholders for dynamic content:
- `{{RESTAURANT_NAME}}` - Business name
- `{{PHONE}}` - Contact phone number
- `{{EMAIL}}` - Contact email address
- `{{FULL_ADDRESS}}` - Complete business address
- `{{TAGLINE}}` - Restaurant tagline/slogan
- `{{HERO_IMAGE}}` - Main banner image path
- `{{MENU_ITEM_1}}` - Menu item names
- `{{PRICE_1}}` - Menu item prices

### Color Scheme System
Templates support 5 color schemes:
- **warm** (default) - Orange/brown/cream tones
- **classic** - Black/white/gray professional
- **business** - Navy/blue/white corporate
- **cool** - Teal/green/white fresh
- **bold** - Purple/pink/black vibrant

### Configuration Management
Each client project maintains:
- `source/config.json` - Project settings and preferences
- `source/client-data.json` - Business information and content
- Configuration change history and timestamps
- Template and color scheme tracking

## Integration Notes

These scripts integrate with the core workflow:
- `customize-template.js` is called by `generate-website.js`
- `change-config.js` modifies settings used by `generate-website.js`
- Configuration changes trigger regeneration recommendations
- All changes are tracked for revision management