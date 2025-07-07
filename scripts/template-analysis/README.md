# Template Analysis & Rating System

A comprehensive JSON-based system for managing, rating, and organizing your 500+ restaurant website templates.

## 🚀 Quick Start

### 1. Scan Templates
```bash
node scripts/template-analysis/scan-templates.js
```
**What it does:** Discovers all templates, analyzes features, creates database

### 2. Rate Templates
```bash
node scripts/template-analysis/rate-templates.js --complete-only
```
**What it does:** Interactive rating interface for templates

### 3. Find Top Templates
```bash
node scripts/template-analysis/query-templates.js --top 10 --min-rating 4
```
**What it does:** Find and display your best templates

## 📊 Current Database Status

- **Total Templates:** 501 discovered
- **Complete Templates:** 327 (have CSS + HTML)
- **Categories:** 13 different restaurant types
- **Rating Progress:** 0% (ready for you to start rating!)

## 🔧 System Components

### 1. Template Scanner (`scan-templates.js`)
- **Purpose:** Automatically discover and catalog all templates
- **Output:** JSON database with template metadata
- **Features:** 
  - Scans multiple template directories
  - Analyzes file completeness
  - Detects features (mobile responsive, navigation, etc.)
  - Categorizes by restaurant type

### 2. Rating Interface (`rate-templates.js`)
- **Purpose:** Interactive tool to rate and review templates
- **Features:**
  - Rate templates 1-5 stars (overall, technical, visual, Upwork potential)
  - Add notes and tags
  - Mark Upwork readiness
  - Open templates in browser for preview
  - Progress tracking

### 3. Query Tool (`query-templates.js`)
- **Purpose:** Search, filter, and export template data
- **Features:**
  - Find top-rated templates
  - Filter by category, rating, status
  - Export results for Upwork portfolio
  - Generate statistics

## 📋 Template Categories

The system automatically categorizes templates:

- **casual-dining** (41 templates) - Family restaurants, general dining
- **fine-dining** (62 templates) - Upscale, elegant restaurants  
- **fast-casual** (36 templates) - Quick service, modern casual
- **pizza-italian** (19 templates) - Pizza shops, Italian restaurants
- **asian-cuisine** (24 templates) - Asian restaurants, sushi bars
- **mexican** (17 templates) - Mexican restaurants, tacos
- **seafood** (19 templates) - Seafood restaurants, coastal dining
- **steakhouse-bbq** (33 templates) - Steakhouses, BBQ restaurants
- **cafe-bistro** (48 templates) - Coffee shops, cafes, bistros
- **bakery-dessert** (9 templates) - Bakeries, dessert shops
- **sports-bar** (32 templates) - Sports bars, pubs
- **farm-to-table** (12 templates) - Organic, farm restaurants
- **other** (149 templates) - Miscellaneous/specialty

## ⭐ Rating System

### Overall Rating (1-5 stars)
- **5 stars:** Excellent, top choice for Upwork
- **4 stars:** Very good, strong option
- **3 stars:** Good, decent option  
- **2 stars:** Fair, might work with modifications
- **1 star:** Poor, not recommended
- **0 stars:** Not rated/skip

### Detailed Ratings
- **Technical:** Code quality, responsiveness, completeness
- **Visual:** Design quality, modern appearance, professionalism
- **Upwork Potential:** Market demand, client appeal, customization ease

## 🎯 Upwork Workflow

### Step 1: Rate Your Best Templates
```bash
# Start with complete templates only
node rate-templates.js --complete-only

# Focus on popular categories first
node rate-templates.js --category casual-dining --complete-only
node rate-templates.js --category fast-casual --complete-only
node rate-templates.js --category cafe-bistro --complete-only
```

### Step 2: Find Top Candidates
```bash
# Find top 15 overall
node query-templates.js --top 15 --min-rating 4

# Find Upwork-ready templates
node query-templates.js --upwork-ready

# Export for portfolio
node query-templates.js --top 10 --export upwork-portfolio.json
```

### Step 3: Create Portfolio
- Use top-rated templates for Upwork portfolio
- Screenshot the best ones
- Create live demos
- Target new restaurant owners

## 📁 File Structure

```
scripts/template-analysis/
├── README.md                    # This file
├── scan-templates.js           # Template discovery & analysis
├── rate-templates.js           # Interactive rating interface  
├── query-templates.js          # Search & export tool
└── data/
    ├── template-database.json  # Main template database
    └── exported-results/       # Query exports
```

## 🔍 Usage Examples

### Find Casual Dining Templates
```bash
node query-templates.js --category casual-dining --complete-only --top 10
```

### Rate Only Unrated Templates  
```bash
node rate-templates.js --unrated-only --complete-only
```

### Export Upwork Portfolio
```bash
node query-templates.js --min-rating 4 --upwork-ready --export portfolio.json
```

### Show Database Statistics
```bash
node query-templates.js --stats
```

## 💡 Pro Tips

1. **Start Small:** Rate 20-30 templates first to get a feel for the system
2. **Focus on Complete:** Use `--complete-only` to skip incomplete templates
3. **Category Focus:** Rate one category at a time for consistency
4. **Regular Exports:** Export results frequently for backup
5. **Browser Preview:** Use option 5 in rating tool to preview templates

## 🎯 Recommended Rating Workflow

1. **Quick Scan:** `node query-templates.js --stats` (see what you have)
2. **Rate Core Categories:** Start with casual-dining, fast-casual, cafe-bistro
3. **Find Winners:** `node query-templates.js --top 10 --min-rating 4` 
4. **Mark Upwork Ready:** Use rating tool to set Upwork status
5. **Export Portfolio:** `node query-templates.js --upwork-ready --export`

## 🚀 Next Steps

After rating your templates:
1. Screenshot top 10-15 templates
2. Create portfolio showcase site
3. Write Upwork proposals
4. Target new restaurant owners
5. Start generating revenue!

---

**The goal:** Identify your best 10-15 templates from 500+ options to focus your Upwork efforts and start generating $8k-12k/month revenue.