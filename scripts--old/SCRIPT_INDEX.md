# Complete Scripts Index

Comprehensive overview of all scripts organized by category and function.

## 📁 Directory Structure

```
scripts/
├── README.md                           # Main documentation (you are here)
├── SCRIPT_INDEX.md                     # This file - complete script index
│
├── core-workflow/                      # Main automation workflow
│   ├── README.md                       # Core workflow documentation
│   ├── create-client.js               # Initialize new client projects
│   ├── generate-website.js            # Generate websites from templates
│   ├── validate-website.js            # Quality assurance and validation
│   ├── package-delivery.js            # Create delivery packages
│   └── preview-server.js              # Local development server
│
├── configuration/                      # Template & project configuration
│   ├── README.md                       # Configuration documentation
│   ├── customize-template.js          # Replace template placeholders
│   └── change-config.js               # Modify project settings
│
├── business-management/                # Client & business tracking
│   ├── README.md                       # Business management documentation
│   ├── business-manager.js            # Status, billing, revenue tracking
│   └── track-revision.js              # Revision requests and billing
│
├── image-management/                   # Image processing & organization
│   ├── README.md                       # Image management documentation
│   ├── optimize-images.js             # Client image optimization
│   ├── download-food-images.js        # Stock image downloads
│   ├── categorize-images.js           # Auto-categorize image library
│   ├── audit-and-fix-images.js        # Image library health checks
│   └── find-duplicates.js             # Duplicate image detection
│
├── maintenance-utilities/              # System maintenance & cleanup
│   ├── README.md                       # Maintenance documentation
│   ├── clean-restaurant-library.sh    # Library cleanup and maintenance
│   ├── execute-categorization.sh      # Batch image categorization
│   ├── fix-misnamed-images.sh         # Fix image naming conventions
│   └── remove-duplicates.sh           # Advanced duplicate removal
│
└── [Legacy files remain in root for compatibility]
```

## 🎯 Quick Reference by Function

### Client Project Management
| Script | Purpose | Usage |
|--------|---------|-------|
| `create-client.js` | Initialize new projects | `node core-workflow/create-client.js "Client Name"` |
| `business-manager.js` | Track status & billing | `node business-management/business-manager.js list` |
| `track-revision.js` | Manage revisions | `node business-management/track-revision.js list "Client"` |

### Website Development
| Script | Purpose | Usage |
|--------|---------|-------|
| `generate-website.js` | Create websites | `node core-workflow/generate-website.js "Client Name"` |
| `customize-template.js` | Template customization | `node configuration/customize-template.js scan template/` |
| `change-config.js` | Modify settings | `node configuration/change-config.js "Client" --view` |

### Quality Assurance
| Script | Purpose | Usage |
|--------|---------|-------|
| `validate-website.js` | Quality checks | `node core-workflow/validate-website.js "Client Name"` |
| `preview-server.js` | Development preview | `node core-workflow/preview-server.js "Client" --open` |
| `package-delivery.js` | Final packaging | `node core-workflow/package-delivery.js "Client Name"` |

### Image Operations
| Script | Purpose | Usage |
|--------|---------|-------|
| `optimize-images.js` | Image optimization | `node image-management/optimize-images.js "Client"` |
| `categorize-images.js` | Auto-categorization | `node image-management/categorize-images.js` |
| `find-duplicates.js` | Duplicate detection | `node image-management/find-duplicates.js` |

### System Maintenance
| Script | Purpose | Usage |
|--------|---------|-------|
| `clean-restaurant-library.sh` | Library cleanup | `./maintenance-utilities/clean-restaurant-library.sh` |
| `remove-duplicates.sh` | Duplicate removal | `./maintenance-utilities/remove-duplicates.sh` |
| `fix-misnamed-images.sh` | Naming fixes | `./maintenance-utilities/fix-misnamed-images.sh` |

## 🔄 Common Workflows

### New Client Setup
```bash
# 1. Initialize project
node core-workflow/create-client.js "Mario's Italian Kitchen" casual-family warm

# 2. Edit client data and add images to source/images/

# 3. Generate website
node core-workflow/generate-website.js "Mario's Italian Kitchen"

# 4. Preview and test
node core-workflow/preview-server.js "Mario's Italian Kitchen" --open

# 5. Validate quality
node core-workflow/validate-website.js "Mario's Italian Kitchen"

# 6. Package for delivery
node core-workflow/package-delivery.js "Mario's Italian Kitchen"
```

### Project Modification
```bash
# Change template or colors
node configuration/change-config.js "Client Name" --template fine-dining --color bold

# Regenerate with new settings
node core-workflow/generate-website.js "Client Name"

# Validate changes
node core-workflow/validate-website.js "Client Name"
```

### Revision Management
```bash
# Create revision request
node business-management/track-revision.js create "Client" "Update menu prices"

# Update status as work progresses
node business-management/track-revision.js update "Client" 2 --status completed

# Track business status
node business-management/business-manager.js status "Client"
```

### Library Maintenance
```bash
# Regular maintenance routine
./maintenance-utilities/clean-restaurant-library.sh
node image-management/categorize-images.js
node image-management/find-duplicates.js --interactive
./maintenance-utilities/fix-misnamed-images.sh images/ --rename
```

## 🚀 Performance & Automation

### Time Savings
- **Manual Process**: 8-12 hours per website
- **Automated Process**: 2-3 hours per website
- **Savings**: 70-80% time reduction

### Automation Level
- **Fully Automated**: Template customization, image processing, validation
- **Semi-Automated**: Quality assurance, client communication, delivery
- **Manual**: Design decisions, client interaction, content review

### Scalability
- Supports 2-3 websites per week target
- Parallel processing for multiple clients
- Automated maintenance and cleanup
- Revenue tracking and business analytics

## 🔧 Legacy Compatibility

Original scripts remain in the root `/scripts/` directory for backward compatibility. New development should use the categorized structure in subdirectories.

### Migration Notes
- All scripts function identically in new locations
- Root-level scripts are copies, not moves
- Update any automation scripts to use new paths
- Documentation reflects new organized structure

---

**For detailed information about any script category, see the README.md file in each subdirectory.**