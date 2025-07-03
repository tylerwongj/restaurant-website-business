# Image Management Scripts

Tools for processing, organizing, and managing restaurant images for templates and client projects.

## Scripts Overview

### `optimize-images.js`
**Purpose**: Optimize client images for web delivery with size and format recommendations.

**Usage**:
```bash
node optimize-images.js "Client Name" [--verbose]
node optimize-images.js --guide "Client Name"
```

**What it does**:
- Analyzes client images for web optimization
- Provides size and format recommendations
- Creates optimized versions in `source/images-optimized/`
- Checks image dimensions against requirements
- Generates optimization reports with savings
- Creates client-specific optimization guides

**Image Requirements**:
- **Logo**: PNG transparent, 400x200px max, <100KB
- **Hero**: JPEG, 1200x800px min, <500KB
- **Interior**: JPEG, 800x600px, <400KB
- **Food photos**: JPEG, 500x400px each, <300KB

### `download-food-images.js`
**Purpose**: Download high-quality stock food images for template placeholders.

**Usage**:
```bash
node download-food-images.js [cuisine-type] [--count N]
```

**What it does**:
- Downloads professional food photography from Unsplash
- Organizes images by cuisine type (Italian, American, etc.)
- Ensures proper licensing (CC0/Unsplash license)
- Optimizes downloads for web use
- Maintains image metadata and attribution
- Provides fallback images for templates

### `categorize-images.js`
**Purpose**: Automatically organize images in the library by category and type.

**Usage**:
```bash
node categorize-images.js [--dry-run] [--verbose]
```

**What it does**:
- Scans image library and categorizes by filename keywords
- Organizes into folders: restaurant-interiors, food-dishes, drinks-beverages, staff-people, exteriors-atmosphere
- Moves images to appropriate category folders
- Handles duplicate names and conflicts
- Provides detailed categorization reports
- Supports dry-run mode for preview

**Categories**:
- **restaurant-interiors**: dining rooms, bar areas, cafe interiors
- **food-dishes**: pasta, pizza, entrees, appetizers, plated dishes
- **drinks-beverages**: cocktails, wine, coffee, craft beverages
- **staff-people**: chefs, servers, team photos
- **exteriors-atmosphere**: storefronts, patios, outdoor seating

### `audit-and-fix-images.js`
**Purpose**: Comprehensive image library audit and repair tool.

**Usage**:
```bash
node audit-and-fix-images.js [--fix] [--report-only]
```

**What it does**:
- Scans entire image library for issues
- Detects corrupted or invalid image files
- Finds images with naming convention problems
- Identifies oversized files that need optimization
- Reports missing alt text or metadata
- Provides automated fixes for common issues

### `find-duplicates.js`
**Purpose**: Detect and report duplicate images using content analysis.

**Usage**:
```bash
node find-duplicates.js [--delete-duplicates] [--interactive]
```

**What it does**:
- Calculates MD5 hashes to find exact duplicates
- Compares file sizes and dimensions
- Detects similar filenames (file.jpg vs file_1.jpg)
- Provides detailed duplicate reports
- Offers interactive deletion with preview
- Maintains original file preferences

## Image Library Structure

```
images/
├── placeholder/           # Template placeholder images
│   ├── restaurant-interiors/
│   ├── food-dishes/
│   ├── drinks-beverages/
│   ├── staff-people/
│   └── exteriors-atmosphere/
├── real/                 # Production-ready client images
└── test/                 # Development and testing images
```

## Client Image Workflow

### 1. Asset Collection
- Clients provide raw images via upload or delivery
- Images stored in `client-projects/[client]/source/images/`
- Requirements guide generated automatically

### 2. Optimization Process
```bash
# Optimize client images
node optimize-images.js "Mario's Italian Kitchen" --verbose

# Generate optimization guide
node optimize-images.js --guide "Mario's Italian Kitchen"
```

### 3. Integration
- Optimized images used in website generation
- Fallback to placeholder images if client images missing
- Automatic resizing and format conversion

## Library Maintenance

### Regular Maintenance Tasks
```bash
# Categorize new images
node categorize-images.js

# Find and remove duplicates
node find-duplicates.js --interactive

# Audit library health
node audit-and-fix-images.js --report-only

# Download fresh stock images
node download-food-images.js italian --count 20
```

### Quality Standards
- All images web-optimized (<500KB each)
- Professional food photography preferred
- Consistent naming conventions
- Proper categorization and metadata
- Regular duplicate removal

## Integration Notes

These scripts integrate with the core workflow:
- `optimize-images.js` called by `generate-website.js`
- Placeholder images used when client images unavailable
- Image requirements enforced during validation
- Optimization guides included in client documentation