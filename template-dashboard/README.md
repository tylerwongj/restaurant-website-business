# 🍽️ Restaurant Template Dashboard

A modern, visual dashboard for browsing and managing restaurant website templates with live previews, keyboard navigation, and favorites system.

## ✨ Features

- **🖼️ Visual Previews**: Live iframe previews of each template
- **⚡ Fast Navigation**: Keyboard shortcuts (←/→ arrows) to cycle through templates  
- **⭐ Star Rating**: Click to rate and favorite templates (1-5 stars)
- **🔍 Smart Search**: Search by template name or category
- **🎯 Category Filters**: Filter by cuisine type and template style
- **📱 Responsive Design**: Works on desktop, tablet, and mobile
- **💾 Persistent Favorites**: Ratings saved in browser localStorage
- **📤 Export Favorites**: Download favorites list for Upwork proposals

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

3. **Open in browser:**
   ```
   http://localhost:3000
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
├── index.html          # Main dashboard interface
├── styles.css          # Modern CSS with grid layout
├── script.js           # Vanilla JS functionality
├── server.js           # Express server for template serving
├── package.json        # Node.js dependencies
└── README.md          # This file
```

### Key Technologies
- **Frontend**: Vanilla JavaScript, CSS Grid, Modern CSS
- **Backend**: Node.js + Express for template serving
- **Storage**: localStorage for favorites persistence
- **Performance**: Lazy loading, intersection observer
- **Design**: Modern responsive design with animations

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
- **Lazy Loading**: Iframes load only when visible
- **Intersection Observer**: Efficient scroll-based loading
- **Tab Visibility**: Pauses loading when tab is hidden
- **Memory Management**: Unloads iframes when not needed

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
2. Include `index.html` file
3. Template will auto-appear in dashboard

### Customizing Categories
Edit the `categorizeTemplate()` function in `script.js` to modify automatic categorization.

### Styling
All styles are in `styles.css` using CSS custom properties for easy theming.

## 🎯 Use Cases

- **Template Selection**: Quickly browse 100+ restaurant templates
- **Client Presentations**: Show template options to clients
- **Upwork Proposals**: Export favorites for proposal attachments  
- **Quality Assessment**: Rate templates for future reference
- **Category Browsing**: Find templates by cuisine type

## 🌟 Performance Tips

- **Grid Size**: Use small grid for overview, large for detailed preview
- **Favorites Filter**: Focus on highest-rated templates
- **Keyboard Navigation**: Fastest way to browse in modal view
- **Search**: Use keywords like "modern", "elegant", "casual" for quick filtering

---

**Built for the Restaurant Website Business** 🍽️
Streamline template selection and client presentations with visual browsing.