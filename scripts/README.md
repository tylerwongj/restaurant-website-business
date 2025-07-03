# Restaurant Website Scripts

This folder contains utility scripts for managing restaurant website projects.

## Available Scripts

### 🌐 Website Management
- **`quick-open.sh`** - Opens all client project websites in browser tabs
- **`open-all-websites.sh`** - Detailed version with status output

### 🔧 Fix & Repair Scripts  
- **`fix-logo-link.sh`** - Fixes logo links and paths across all projects
- **`fix-navigation-clickability.py`** - Fixes navigation and clickability issues
- **`fix-demo.js`** - Original demo site variable replacement (legacy)
- **`fix-demo-improved.js`** - Enhanced demo site processor with better error handling

## Usage Examples

```bash
# Open all client websites for review
./scripts/quick-open.sh

# Fix logo issues across all projects  
./scripts/fix-logo-link.sh

# Fix navigation clickability issues
python3 ./scripts/fix-navigation-clickability.py

# Process demo site with custom data
node ./scripts/fix-demo-improved.js demo-templates/ output/
```

## Script Descriptions

### quick-open.sh & open-all-websites.sh
These scripts automatically find and open all client project websites in your default browser. Useful for:
- Quick visual review of all projects
- Testing after making global changes
- Client presentations

**Locations searched:**
- `client-projects/*/generated/website/index.html`
- `client-projects/*/generated/website-fixed/index.html`

### fix-logo-link.sh
Bash script that fixes common logo issues:
- ✅ Corrects logo image src paths to `images/logo.png`
- ✅ Updates alt text with proper restaurant names  
- ✅ Reports logos that need clickable link wrappers
- ⚠️ Manual review needed for logo positioning/styling

### fix-navigation-clickability.py
Python script that fixes navigation and interaction issues:
- ✅ Adds missing href attributes to nav links
- ✅ Wraps logos in home page links
- ✅ Makes phone numbers clickable with tel: links
- ✅ Adds proper accessibility attributes (role, tabindex)
- ✅ Checks for missing anchor link targets
- ⚠️ Notes where JavaScript handlers are needed

### fix-demo.js / fix-demo-improved.js
Node.js scripts for processing demo templates:
- **Original**: Basic placeholder replacement for demo-site/
- **Improved**: Enhanced with error handling, flexible I/O, better reporting

## Project Structure Expected

```
client-projects/
├── restaurant-name/
│   ├── generated/
│   │   ├── website/
│   │   │   ├── index.html
│   │   │   ├── menu.html
│   │   │   └── images/logo.png
│   │   └── website-fixed/ (alternative location)
│   └── source/
│       └── client-data.json
```

## Requirements

- **Bash**: For shell scripts (.sh files)
- **Python 3**: For Python scripts (.py files)  
- **Node.js**: For JavaScript scripts (.js files)
- **macOS**: Scripts use `open` command (can modify for Linux/Windows)

## Old Scripts

Previous scripts have been moved to `scripts--old/` for reference. The new scripts in this folder provide:
- Better error handling
- Cleaner output formatting  
- More flexible usage patterns
- Improved documentation

## Contributing

When adding new scripts:
1. Make them executable: `chmod +x script-name`
2. Add usage documentation to this README
3. Include error handling and helpful output messages
4. Test with all current client projects