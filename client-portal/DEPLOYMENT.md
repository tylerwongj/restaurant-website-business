# Client Portal Deployment Guide

## Overview
This client portal collects restaurant information and generates JSON files for automated website development. The portal runs as a static web application.

## Local Testing

### Quick Start
```bash
# Navigate to portal directory
cd client-portal

# Start local server (Python 3)
python3 -m http.server 8000

# Or with Node.js
npx serve .

# Or with PHP
php -S localhost:8000
```

Visit: `http://localhost:8000`

## Production Deployment

### Option 1: Static Hosting (Recommended)
**Netlify/Vercel/GitHub Pages**
1. Create new repository or use existing
2. Upload `client-portal/` folder contents to root
3. Deploy via platform interface
4. Custom domain optional

**File Structure for Deployment:**
```
/
├── index.html
├── assets/
│   ├── css/styles.css
│   └── js/
│       ├── form.js
│       ├── validation.js
│       └── imageUpload.js
└── DEPLOYMENT.md
```

### Option 2: Web Server (Apache/Nginx)
**Apache:**
```apache
<VirtualHost *:80>
    ServerName portal.yourdomain.com
    DocumentRoot /var/www/portal
    
    <Directory "/var/www/portal">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

**Nginx:**
```nginx
server {
    listen 80;
    server_name portal.yourdomain.com;
    root /var/www/portal;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

### Option 3: Business Integration
**Custom Domain Setup:**
1. Point subdomain to hosting: `portal.yourbusiness.com`
2. SSL certificate via Let's Encrypt or CloudFlare
3. Optional: Password protection for client access

## Portal Features

### Multi-Step Form
- **Step 1:** Restaurant basics (name, cuisine, description)
- **Step 2:** Contact information (phone, email, address, social)
- **Step 3:** Operating hours (7-day schedule)
- **Step 4:** Menu items (6-12 dishes with descriptions/prices)
- **Step 5:** Image uploads (logo, hero, interior, food photos)
- **Step 6:** Review and submit

### Validation System
- Real-time field validation
- Character count limits
- Phone number formatting: `(555) 123-4567`
- Price formatting: `12.95`
- Image file validation (5MB max, JPEG/PNG/WebP)
- Required field enforcement

### Auto-Save Functionality
- Progress saved every 30 seconds to localStorage
- Manual save/load buttons
- Session recovery after browser close
- Data persistence across form steps

### JSON Export
- Downloads as: `{restaurant-name}-client-data.json`
- Compatible with restaurant automation scripts
- Base64 encoded images included
- Metadata and timestamp included

## Client Workflow

### For Clients
1. **Access Portal:** Visit provided URL
2. **Complete Form:** Follow 6-step process (15-20 minutes)
3. **Upload Images:** Logo, hero, interior, food photos
4. **Review Data:** Final verification step
5. **Download JSON:** Automatic download upon submission
6. **Send to Developer:** Email JSON file for website creation

### For Business
1. **Send Portal Link:** Direct clients to hosted portal
2. **Receive JSON Files:** Clients email completed data files
3. **Process with Scripts:** Use existing automation system
4. **Deliver Website:** 48-72 hour turnaround maintained

## Technical Requirements

### Browser Support
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

### Client Device Support
- Desktop/laptop computers
- Tablets (iPad, Android)
- Mobile phones (responsive design)
- Minimum screen width: 320px

### File Limitations
- Maximum file size: 5MB per image
- Supported formats: JPEG, PNG, WebP
- Total upload limit: ~50MB (browser dependent)

## Security Considerations

### Data Protection
- No server-side storage (client-side only)
- Files downloaded locally to client
- No data transmission to external servers
- HTTPS recommended for production

### Access Control (Optional)
```html
<!-- Add basic auth if needed -->
<script>
if (!sessionStorage.getItem('authorized')) {
    const password = prompt('Enter access code:');
    if (password !== 'YOUR_CLIENT_CODE') {
        document.body.innerHTML = 'Access Denied';
    } else {
        sessionStorage.setItem('authorized', 'true');
    }
}
</script>
```

## Customization

### Branding Updates
**Logo/Colors (`assets/css/styles.css`):**
```css
:root {
    --primary-color: #your-brand-color;
    --primary-hover: #your-hover-color;
}

.logo h1 {
    color: var(--primary-color);
}
```

**Business Information (`index.html`):**
```html
<div class="logo">
    <h1>🍽️ Your Business Name</h1>
    <p>Your tagline here</p>
</div>
```

### Contact Information
**Success Message (`assets/js/form.js` line 578):**
```javascript
<p>Questions? Contact us at <strong>your-email@domain.com</strong></p>
```

## Troubleshooting

### Common Issues
**Portal Won't Load:**
- Check file permissions (755 for directories, 644 for files)
- Verify all JavaScript files are present
- Check browser console for errors

**Form Validation Errors:**
- Ensure all required fields completed
- Check phone format: (555) 123-4567
- Verify email format is valid
- Check image file sizes under 5MB

**JSON Download Fails:**
- Try different browser
- Disable popup blockers
- Check available disk space
- Clear browser cache

**Images Won't Upload:**
- Check file format (JPEG/PNG/WebP only)
- Verify file size under 5MB
- Try resizing images if needed
- Check browser permissions

### Browser Console Debugging
```javascript
// Check form data
console.log(formManager.formData);

// Check uploaded images
console.log(imageManager.getUploadedImages());

// Check validation errors
console.log(validator.getValidationSummary());
```

## Performance Optimization

### Image Optimization
- Compress images before upload
- Use WebP format when possible
- Resize to recommended dimensions
- Consider automated compression

### Loading Speed
- Portal loads in under 2 seconds
- Form validation is real-time
- Auto-save every 30 seconds
- No external dependencies

## Support & Maintenance

### Regular Updates
- Monitor browser compatibility
- Update validation rules as needed
- Refresh styling for modern trends
- Test on new devices/browsers

### Client Support
- Provide portal URL and instructions
- Offer phone/email support during completion
- Create video tutorial if needed
- Maintain FAQ document

## Integration with Restaurant Business

### Workflow Integration
1. **Upwork Proposal:** Include portal link
2. **Client Onboarding:** Send portal access
3. **Data Processing:** Use JSON with existing scripts
4. **Website Generation:** 48-72 hour delivery maintained
5. **Revenue Goals:** $8k-12k/month with 2-3 sites/week

This portal streamlines client data collection, reduces back-and-forth communication, and maintains the professional $1000 pricing model while delivering efficient service.