# Restaurant Website Business - Scripts Documentation

Automated scripts for the restaurant website development workflow. All scripts are organized by functionality and purpose.

## 📁 Script Categories

### 🚀 Core Workflow Scripts
Main scripts for the automated website generation process:

- **`create-client.js`** - Initialize new client projects with folder structure and templates
- **`generate-website.js`** - Generate complete websites from client data and templates  
- **`validate-website.js`** - Quality assurance and validation checks before delivery
- **`package-delivery.js`** - Create final delivery packages with documentation
- **`preview-server.js`** - Local development server for testing websites

### ⚙️ Configuration & Customization
Scripts for template and project configuration:

- **`customize-template.js`** - Replace placeholder variables with client data
- **`change-config.js`** - Modify project settings (templates, colors, optimizations)

### 💼 Business Management
Client and project management tools:

- **`business-manager.js`** - Track client status, billing, and project phases
- **`track-revision.js`** - Manage revision requests and billing

### 🖼️ Image Management
Image processing and organization tools:

- **`optimize-images.js`** - Optimize client images for web delivery
- **`download-food-images.js`** - Download stock food images for templates
- **`categorize-images.js`** - Automatically organize images by category
- **`audit-and-fix-images.js`** - Check and repair image issues
- **`find-duplicates.js`** - Detect duplicate images in the library

### 🧹 Maintenance & Utilities
Maintenance and cleanup scripts:

- **`clean-restaurant-library.sh`** - Clean up image library and remove unused files
- **`execute-categorization.sh`** - Batch image categorization process
- **`fix-misnamed-images.sh`** - Fix image naming conventions
- **`remove-duplicates.sh`** - Remove duplicate images from library

## 🔄 Standard Workflow

### 1. Client Setup
```bash
# Initialize new client project
node scripts/create-client.js "Mario's Italian Kitchen" casual-family warm

# View available templates and colors
node scripts/create-client.js --list-templates
node scripts/create-client.js --list-colors
```

### 2. Website Generation
```bash
# Generate website from client data
node scripts/generate-website.js "Mario's Italian Kitchen"

# Preview website locally
node scripts/preview-server.js "Mario's Italian Kitchen" --open
```

### 3. Quality Assurance
```bash
# Validate website before delivery
node scripts/validate-website.js "Mario's Italian Kitchen"

# Package for client delivery
node scripts/package-delivery.js "Mario's Italian Kitchen"
```

### 4. Business Management
```bash
# Track project status
node scripts/business-manager.js status "Mario's Italian Kitchen"

# List all clients
node scripts/business-manager.js list

# Handle revision requests
node scripts/track-revision.js create "Mario's Italian Kitchen" "Update menu prices"
```

## ⚡ Quick Commands

### Image Management
```bash
# Optimize client images
node scripts/optimize-images.js "Mario's Italian Kitchen"

# Categorize image library
node scripts/categorize-images.js

# Find duplicate images
node scripts/find-duplicates.js
```

### Configuration Changes
```bash
# Change template
node scripts/change-config.js "Mario's Italian" --template fine-dining

# Change color scheme
node scripts/change-config.js "Mario's Italian" --color bold

# View current configuration
node scripts/change-config.js "Mario's Italian" --view
```

## 💡 Script Usage Tips

### Common Patterns
- All client names should be quoted: `"Mario's Italian Kitchen"`
- Scripts auto-sanitize names: `"Mario's Italian"` → `marios-italian`
- Use `--help` flag for detailed usage info on any script
- Scripts validate inputs and provide clear error messages

### Development Workflow
1. **Setup**: `create-client.js` → Edit client data → Add images
2. **Generate**: `generate-website.js` → `preview-server.js`
3. **Validate**: `validate-website.js` → Fix issues → Repeat
4. **Deliver**: `package-delivery.js` → Update business status

### Error Recovery
- Scripts include built-in validation and error handling
- Check `client-projects/[client]/generated/` for output files
- Use `validate-website.js` to identify specific issues
- Business status tracking helps resume interrupted workflows

## 📋 File Locations

- **Scripts**: `/scripts/` (this folder)
- **Client Projects**: `/client-projects/[client-name]/`
- **Templates**: `/templates/[template-name]/`
- **Images**: `/images/` and `/client-projects/[client]/source/images/`
- **Configuration**: `/config/` and `/client-projects/[client]/source/config.json`

## 🔧 Advanced Usage

See individual script files for detailed options and advanced features. Each script includes comprehensive CLI help and usage examples.

---

**Time Savings**: Automated workflow reduces website development from 8-12 hours to 2-3 hours per project.