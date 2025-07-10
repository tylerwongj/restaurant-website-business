# 🍽️ Restaurant Template Dashboard

A high-performance visual dashboard for browsing and managing 500+ restaurant website templates with automated screenshot generation, smart filtering, and favorites system.

> **🚀 Major Performance Update**: Now uses lightning-fast screenshot previews instead of resource-heavy iframes for 90%+ performance improvement!

## ✨ Features

### 🖼️ **Visual Previews**
- **Automated Screenshots**: Lightning-fast image previews of all templates
- **Smart Generation**: Auto-detects missing/outdated screenshots
- **File Modification Tracking**: Regenerates when templates are updated
- **Background Processing**: Screenshots generate without blocking dashboard

### ⚡ **Performance & Navigation**
- **90%+ Faster Loading**: Screenshot previews vs heavy iframe loading
- **Keyboard Shortcuts**: (←/→ arrows) to cycle through templates in modal
- **Lazy Loading**: Images load only when scrolled into view
- **Scalable**: Handles 500+ templates without browser lag

### 🎯 **Smart Filtering & Search**
- **⭐ Star Rating**: Click to rate and favorite templates (1-5 stars)
- **🔍 Search**: Template name and category search
- **📂 Category Filter**: Filter by cuisine type (casual, fine-dining, etc.)
- **✅ Completeness Filter**: Filter by template status (complete/partial/empty)
- **⭐ Favorites Filter**: Show only starred templates

### 🛠️ **Management Features**
- **📱 Responsive Design**: Works on desktop, tablet, and mobile
- **💾 Persistent Storage**: Ratings saved in browser localStorage
- **📤 Export Favorites**: Download favorites list for Upwork proposals
- **🔄 Auto-Updates**: Detects template changes and updates screenshots

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   cd template-dashboard
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```
   *The server will automatically:
   - Start the dashboard on http://localhost:3000
   - Check for missing screenshots
   - Generate screenshots in background (first run: ~5-10 minutes for 500+ templates)*

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

### 📸 Screenshot Management

**Automatic (Recommended):**
- Screenshots auto-generate on server startup
- Missing/outdated screenshots detected via file modification time
- Background processing doesn't block dashboard usage

**Manual Control:**
```bash
# Generate all screenshots manually
npm run generate-screenshots

# View current status
ls screenshots/ | wc -l  # Count existing screenshots
```

## 🎮 How to Use

### Template Browsing
- **Grid View**: Browse templates in a responsive grid layout
- **Click Any Template**: Opens full-screen modal preview
- **Hover Effects**: See template info and preview overlay

### Modal Navigation
- **Keyboard Shortcuts**:
  - `←/→` Arrow keys: Navigate between templates
  - `ESC`: Close modal
  - `Enter/Space`: Open template in new tab
- **Mouse Controls**: Use navigation buttons or click outside to close

### Rating & Favorites
- **Star Rating**: Click 1-5 stars on any template
- **Favorites Filter**: Toggle to show only starred templates
- **Export**: Download your favorites as JSON file

### Search & Filter
- **Search Bar**: Type to search template names and categories
- **Category Filter**: Select specific cuisine types
- **Grid Size**: Toggle between large and small preview sizes

## 🏗️ Technical Architecture

```
template-dashboard/
├── index.html              # Main dashboard interface
├── styles.css              # Modern CSS with grid layout
├── script.js               # Vanilla JS functionality
├── server.js               # Express server + screenshot integration
├── package.json            # Node.js dependencies
├── screenshots/            # Generated template screenshots (auto-created)
├── scripts/
│   └── generate-screenshots.js  # Puppeteer screenshot generator
└── README.md              # This documentation
```

### Key Technologies
- **Frontend**: Vanilla JavaScript, CSS Grid, Modern CSS
- **Backend**: Node.js + Express for template serving
- **Screenshot Generation**: Puppeteer for automated template capture
- **Storage**: localStorage for favorites persistence  
- **Performance**: Lazy loading, intersection observer, image optimization
- **Design**: Modern responsive design with animations
- **File Tracking**: Node.js fs.statSync for modification time detection

## 📊 Template Categories

The dashboard automatically categorizes templates:

- **Casual Family**: Family-friendly restaurants
- **Fine Dining**: Upscale, elegant restaurants  
- **Fast Casual**: Quick service, modern dining
- **Cafe & Bistro**: Coffee shops, casual dining
- **Pizza & Italian**: Pizza shops, Italian cuisine
- **Asian Cuisine**: Asian restaurants, sushi bars
- **Steakhouse**: Premium steakhouses
- **Seafood**: Coastal and seafood restaurants
- **Sports Bar**: Sports bars, pubs, gastropubs

## 🔧 Configuration

### Server Settings
- **Port**: Default 3000 (configurable via PORT env var)
- **Template Directories**: `templates/`, `templates-new/`, `templates-business/`
- **CORS**: Enabled for iframe previews

### Performance Features
- **Screenshot Previews**: Ultra-fast image loading vs slow iframe rendering
- **Lazy Loading**: Images load only when scrolled into view
- **Intersection Observer**: Efficient scroll-based loading
- **Smart Caching**: Screenshots cached until template files change
- **Background Generation**: Non-blocking screenshot creation
- **Memory Efficient**: Lightweight images vs heavy iframe DOM trees
- **File Modification Detection**: Only regenerates changed templates
- **Puppeteer Optimization**: Headless browser with performance tuning

## 📤 Export Features

The dashboard can export your favorites in JSON format:

```json
{
  "exported_at": "2024-01-15T10:30:00.000Z",
  "total_favorites": 5,
  "templates": [
    {
      "name": "casual-family-modern",
      "category": "casual-family",
      "path": "templates/casual-family-modern",
      "rating": 5,
      "url": "http://localhost:3000/templates/casual-family-modern/index.html"
    }
  ]
}
```

## 🚀 Development

### Adding New Templates
1. Add template directory to `templates/` folder
2. Include `index.html` file (required)
3. Optional: `styles.css`, `script.js`, `menu.html`
4. Restart server → screenshot auto-generates
5. Template appears in dashboard with completeness status

### Template Update Workflow
1. **Edit template files** (index.html, styles.css, etc.)
2. **Restart server** → Detects changes via file modification time
3. **Auto-regeneration** → Only changed templates get new screenshots
4. **Dashboard updates** → New previews appear automatically

### Customizing Categories
Edit the `categorizeTemplate()` function in `script.js` to modify automatic categorization.

### Screenshot Configuration
Edit `scripts/generate-screenshots.js` to modify:
- Screenshot dimensions (default: 1200x800)
- Image format (PNG/JPEG)
- Timeout settings
- Puppeteer options

### Styling
All styles are in `styles.css` using CSS custom properties for easy theming.

## 🎯 Use Cases

### For Restaurant Website Business
- **Template Selection**: Lightning-fast browsing of 500+ restaurant templates
- **Client Presentations**: Smooth, professional template showcases
- **Upwork Proposals**: Export top-rated templates for proposal attachments
- **Quality Assessment**: Rate templates and filter by completeness status
- **Portfolio Management**: Organize templates by category and rating

### For Development Workflow
- **Template Development**: Auto-screenshot generation for new templates
- **Quality Control**: Completeness filter shows which templates need work
- **Performance Testing**: Fast preview system for large template libraries
- **Change Tracking**: Automatic detection and preview updates

## 🌟 Performance Tips

### Dashboard Usage
- **Grid Size**: Use small grid for overview, large for detailed preview
- **Favorites Filter**: Focus on highest-rated templates
- **Completeness Filter**: Show only complete templates for client use
- **Keyboard Navigation**: Fastest way to browse in modal view
- **Search**: Use keywords like "modern", "elegant", "casual" for quick filtering

### Screenshot Management
- **First Run**: Allow 5-10 minutes for initial screenshot generation
- **Template Updates**: Screenshots auto-regenerate when files change
- **Manual Regeneration**: Use `npm run generate-screenshots` if needed
- **Storage**: Screenshots stored in `/screenshots` directory (~500MB for 500 templates)

## 📊 System Requirements

- **Node.js**: 14.0.0 or higher
- **Memory**: 2GB+ RAM recommended for Puppeteer
- **Storage**: ~1GB for 500+ template screenshots
- **Browser**: Modern browser with ES6 support

## 🔧 Troubleshooting

### Common Issues

**"Screenshot pending..." showing:**
- Screenshots still generating in background
- Refresh page after a few minutes
- Check console for generation progress

**Missing screenshots:**
- Run `npm run generate-screenshots` manually
- Check template accessibility at `http://localhost:3000/templates/[name]`
- Ensure template has valid `index.html`

**Performance issues:**
- Clear browser cache
- Check available memory (Puppeteer needs 2GB+)
- Reduce concurrent screenshot generation if needed

**404 errors in console:**
- Normal for templates with placeholder image URLs
- Doesn't affect screenshot generation or functionality
- Templates use `{{PLACEHOLDER}}` variables for client customization

---

**Built for the Restaurant Website Business** 🍽️  
**High-performance template management for 500+ restaurant website templates**

*Streamline template selection, client presentations, and development workflow with automated screenshot generation and smart filtering.*