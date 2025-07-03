# Restaurant Website Screenshot Capture

This folder contains scripts to automatically capture screenshots of 30 restaurant websites for design reference.

## Quick Start

1. **Install Puppeteer:**
   ```bash
   ./scripts/screenshot-capture/install-puppeteer.sh
   ```

2. **Capture Screenshots:**
   ```bash
   # For collection-1 (original 30 sites)
   node scripts/screenshot-capture/capture-reference-screenshots.js collection-1
   
   # For collection-2 (new 30 sites)
   node scripts/screenshot-capture/capture-reference-screenshots.js collection-2
   ```

3. **View Results:**
   ```bash
   # View collection-1 screenshots
   open references/collection-1/images/
   
   # View collection-2 screenshots  
   open references/collection-2/images/
   ```

## What This Does

The script automatically:
- Opens each of the 30 restaurant websites
- Takes full-page screenshots (1920x1080 viewport)
- Saves them as PNG files in `references/images/`
- Generates a summary report
- Handles errors gracefully

## Output Files

Screenshots are saved with descriptive names:
- `luxury-eleven-madison-park.png`
- `casual-olive-garden.png` 
- `fastfood-mcdonalds.png`

## Collections Available

### Collection-1 (Original Collection)
**Luxury/Fine Dining**: Eleven Madison Park, The French Laundry, Le Bernardin, Alinea, Daniel NYC, The Modern, Blue Hill, Gramercy Tavern  
**Casual Dining**: Cheesecake Factory, Olive Garden, Applebee's, TGI Friday's, Red Lobster, Outback Steakhouse, P.F. Chang's, California Pizza Kitchen, BJ's Restaurant, Cracker Barrel  
**Fast Food**: McDonald's, Popeyes, Burger King, KFC, Taco Bell, Subway, Domino's, Pizza Hut, Chipotle, In-N-Out  
**Success Rate**: 28/30 (93%)

### Collection-2 (New Collection)
**Luxury/Fine Dining**: Nobu, Joel Robuchon, Gordon Ramsay, Masa, Osteria Francescana, Noma, Chez Panisse, Canlis, Inn at Little Washington, Atelier Crenn  
**Casual Dining**: Denny's, IHOP, Texas Roadhouse, Chili's, Ruby Tuesday, LongHorn Steakhouse, Bahama Breeze, Yard House, Seasons 52, Maggiano's  
**Fast Food**: Wendy's, Arby's, Five Guys, Shake Shack, Whataburger, Carl's Jr., Jack in the Box, White Castle, Sonic, Culver's  
**Success Rate**: 30/30 (100%)

## Features

- **Automatic popup dismissal** - Handles cookie banners and overlays
- **Respectful delays** - 1 second between requests, 3 second page load wait
- **Error handling** - Continues if individual sites fail
- **Progress reporting** - Shows real-time capture progress
- **Summary report** - JSON report with success/failure details

## Troubleshooting

**If screenshots fail:**
1. Check internet connection
2. Some sites may block automated browsers
3. Run script again - temporary failures often resolve

**If Puppeteer fails to install:**
1. Update Node.js to latest version
2. Clear npm cache: `npm cache clean --force`
3. Try installing globally: `npm install -g puppeteer`

## Technical Details

- Uses headless Chrome via Puppeteer
- Full-page screenshots at 90% quality
- 1920x1080 viewport for desktop view
- Handles single-page apps and dynamic content
- Saves to PNG format for best quality

## Time Required

- Installation: ~2-3 minutes
- Screenshot capture: ~10-15 minutes for all 30 sites
- Total process: ~15-20 minutes

The captured screenshots provide valuable design reference for creating authentic restaurant website templates.