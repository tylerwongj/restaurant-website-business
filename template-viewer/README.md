# Restaurant Template Gallery

A comprehensive visual browser for all 534+ restaurant website templates in your collection.

## Features

- **Visual Gallery**: Browse all templates in grid or list view
- **Advanced Filtering**: Filter by category, status, rating, features
- **Smart Search**: Search templates by name, category, or features  
- **Live Preview**: Preview templates in modal with iframe
- **Template Details**: View ratings, features, file status, and metadata
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Theme**: Professional dark interface optimized for browsing

## Quick Start

### 1. Ensure Template Database Exists

The gallery requires the template analysis database. If it doesn't exist:

```bash
cd ../scripts/template-analysis/
node scan-templates.js
```

### 2. Start Test Server

```bash
cd template-viewer/
node test-server.js
```

### 3. Open in Browser

Navigate to: http://localhost:3000/template-viewer/

## Gallery Features

### Search & Filtering

- **Search Bar**: Search by template name, category, or features
- **Category Filter**: Filter by restaurant type (13 categories available)
- **Status Filter**: Show only complete or incomplete templates
- **Rating Filter**: Filter by minimum star rating
- **Feature Filter**: Filter by specific features (mobile responsive, contact forms, etc.)

### Template Cards

Each template card displays:
- Template name and category
- Completion status (complete/incomplete)
- Star rating (1-5 stars)
- Available files (HTML, CSS, JS, Menu)
- Feature indicators
- Quick action buttons (Open, Preview)

### Preview Modal

Click any template to open the preview modal with:
- Full template details and metadata
- Live iframe preview of the template
- Feature and file status indicators
- Direct link to open template in new tab

### View Options

- **Grid View**: Card-based layout for visual browsing
- **List View**: Compact table layout for quick scanning
- **Sorting**: Sort by name, category, rating, status, date, or file size

## Template Statistics

The gallery shows real-time statistics:
- Total templates in collection
- Complete vs incomplete templates  
- Number of rated templates
- Templates marked as Upwork-ready

## Categories Supported

- **Casual Dining** (41 templates)
- **Fine Dining** (62 templates)  
- **Fast Casual** (36 templates)
- **Cafe & Bistro** (48 templates)
- **Pizza & Italian** (19 templates)
- **Asian Cuisine** (24 templates)
- **Mexican** (17 templates)
- **Seafood** (19 templates)
- **Steakhouse & BBQ** (33 templates)
- **Sports Bar** (32 templates)
- **Bakery & Dessert** (9 templates)
- **Farm to Table** (12 templates)
- **Other** (149 templates)

## Integration with Template Analysis System

The gallery integrates seamlessly with your existing template analysis tools:

- **Database**: Reads from `../scripts/template-analysis/data/template-database.json`
- **Ratings**: Displays ratings from the rating system
- **Categories**: Uses auto-detected categories
- **Features**: Shows analyzed template features
- **Status**: Displays complete/incomplete status

## File Structure

```
template-viewer/
├── index.html          # Main gallery interface
├── styles.css          # Comprehensive styling
├── script.js           # JavaScript functionality
├── test-server.js      # Development server
├── README.md           # This file
└── data/
    └── template-database.json  # Local copy of database
```

## Development

### Local Testing

1. Start the test server: `node test-server.js`
2. Open browser to http://localhost:3000/template-viewer/
3. Make changes to HTML/CSS/JS files
4. Refresh browser to see changes

### Database Updates

If you update templates or run the rating system:

1. The gallery will automatically read the latest database
2. Refresh the page to see updates
3. Or copy the updated database: `cp ../scripts/template-analysis/data/template-database.json data/`

### Adding Features

The JavaScript is modular and easy to extend:

- **New filters**: Add to `currentFilters` object and `applyFilters()` method
- **New sorting**: Add to `applySorting()` method
- **New template data**: Extend `createTemplateCard()` method
- **New views**: Add to `setView()` method

## Troubleshooting

### Database Not Loading

If templates don't appear:

1. Check that `template-database.json` exists in `../scripts/template-analysis/data/`
2. Run `node scan-templates.js` from the template analysis directory
3. Check browser console for error messages
4. Ensure the test server is running

### Templates Not Previewing

If template previews don't work:

1. Ensure template paths are correct in the database
2. Check that template files exist at the specified paths
3. Verify templates have `index.html` files
4. Try opening templates directly in browser

### Server Issues

If the test server won't start:

1. Check that port 3000 is available
2. Try a different port by editing `test-server.js`
3. Ensure you're in the `template-viewer/` directory
4. Check Node.js is installed

## Production Deployment

For production use:

1. Use a proper web server (Apache, Nginx, etc.)
2. Ensure proper MIME types are configured
3. Set up appropriate security headers
4. Consider adding HTTPS
5. Optimize images and assets

## Next Steps

After setting up the gallery:

1. **Rate Templates**: Use the rating system to identify top templates
2. **Create Portfolio**: Use top-rated templates for Upwork portfolio
3. **Client Demos**: Use the gallery to show templates to clients
4. **Template Selection**: Quickly find the right template for each project

---

**The Template Gallery gives you a powerful visual interface to manage and showcase your 534+ restaurant website templates for maximum business efficiency.**