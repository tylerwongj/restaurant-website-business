#!/usr/bin/env node

/**
 * Template Dashboard Server
 * Serves the dashboard and all restaurant templates
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const ScreenshotGenerator = require('./scripts/generate-screenshots');

const app = express();
const PORT = process.env.PORT || 3000;

// Base directory for the project
const BASE_DIR = path.resolve(__dirname, '..');
const DASHBOARD_DIR = __dirname;

console.log('🚀 Starting Template Dashboard Server...');
console.log(`📁 Base directory: ${BASE_DIR}`);
console.log(`📊 Dashboard directory: ${DASHBOARD_DIR}`);

// Middleware for CORS and headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('X-Frame-Options', 'SAMEORIGIN');
    next();
});

// Serve dashboard static files (CSS, JS, etc.) at root level
app.use(express.static(DASHBOARD_DIR));

// Serve screenshots directory
const screenshotsPath = path.join(DASHBOARD_DIR, 'screenshots');
if (!fs.existsSync(screenshotsPath)) {
    fs.mkdirSync(screenshotsPath, { recursive: true });
}
app.use('/screenshots', express.static(screenshotsPath));
console.log(`📸 Serving /screenshots from ${screenshotsPath}`);

// Serve template directories (only existing directories)
const templateDirs = [
    'templates', 
    'templates-new', 
    'templates-business',
    'templates-incomplete'
];

templateDirs.forEach(dir => {
    const templatePath = path.join(BASE_DIR, dir);
    if (fs.existsSync(templatePath)) {
        app.use(`/${dir}`, express.static(templatePath));
        console.log(`📂 Serving /${dir} from ${templatePath}`);
    }
});

// Serve images directory
const imagesPath = path.join(BASE_DIR, 'images');
if (fs.existsSync(imagesPath)) {
    app.use('/images', express.static(imagesPath));
    console.log(`🖼️  Serving /images from ${imagesPath}`);
}

// API endpoint to list templates
app.get('/api/templates', (req, res) => {
    try {
        const allTemplates = [];
        
        templateDirs.forEach(dir => {
            const dirPath = path.join(BASE_DIR, dir);
            if (fs.existsSync(dirPath)) {
                const items = fs.readdirSync(dirPath, { withFileTypes: true });
                const templates = items
                    .filter(item => item.isDirectory())
                    .map(item => {
                        const templatePath = path.join(dirPath, item.name);
                        
                        // Check for required files to determine completeness
                        const files = {
                            'index.html': fs.existsSync(path.join(templatePath, 'index.html')),
                            'styles.css': fs.existsSync(path.join(templatePath, 'styles.css')),
                            'script.js': fs.existsSync(path.join(templatePath, 'script.js')),
                            'menu.html': fs.existsSync(path.join(templatePath, 'menu.html'))
                        };
                        
                        // Calculate completeness percentage
                        const completeness = Object.values(files).filter(Boolean).length / Object.keys(files).length;
                        
                        // Determine status
                        let status = 'empty';
                        if (files['index.html']) {
                            status = completeness >= 0.75 ? 'complete' : 'partial';
                        }
                        
                        return {
                            id: `${dir}_${item.name}`,
                            name: item.name,
                            directory: dir,
                            path: `${dir}/${item.name}`,
                            url: `/${dir}/${item.name}/index.html`,
                            files: files,
                            completeness: Math.round(completeness * 100),
                            status: status
                        };
                    });
                
                allTemplates.push(...templates);
            }
        });
        
        res.json({
            success: true,
            count: allTemplates.length,
            templates: allTemplates
        });
        
    } catch (error) {
        console.error('Error listing templates:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to list templates'
        });
    }
});

// API endpoint to list templates in a specific directory
app.get('/api/templates/:dir', (req, res) => {
    try {
        const { dir } = req.params;
        const dirPath = path.join(BASE_DIR, dir);
        
        if (!fs.existsSync(dirPath)) {
            return res.status(404).json({
                success: false,
                error: `Directory ${dir} not found`
            });
        }
        
        const items = fs.readdirSync(dirPath, { withFileTypes: true });
        const templates = items
            .filter(item => item.isDirectory())
            .map(item => {
                const templatePath = path.join(dirPath, item.name);
                
                // Check for required files to determine completeness
                const files = {
                    'index.html': fs.existsSync(path.join(templatePath, 'index.html')),
                    'styles.css': fs.existsSync(path.join(templatePath, 'styles.css')),
                    'script.js': fs.existsSync(path.join(templatePath, 'script.js')),
                    'menu.html': fs.existsSync(path.join(templatePath, 'menu.html'))
                };
                
                // Calculate completeness percentage
                const completeness = Object.values(files).filter(Boolean).length / Object.keys(files).length;
                
                // Determine status
                let status = 'empty';
                if (files['index.html']) {
                    status = completeness >= 0.75 ? 'complete' : 'partial';
                }
                
                return {
                    name: item.name,
                    files: files,
                    completeness: Math.round(completeness * 100),
                    status: status
                };
            });
        
        // Return just template names for compatibility, but with completeness data
        res.json(templates.map(t => t.name));
        
    } catch (error) {
        console.error(`Error listing templates in ${req.params.dir}:`, error);
        res.status(500).json({
            success: false,
            error: 'Failed to list directory templates'
        });
    }
});

// API endpoint to check template health
app.get('/api/templates/:dir/:name/health', (req, res) => {
    const { dir, name } = req.params;
    const templatePath = path.join(BASE_DIR, dir, name);
    
    if (!fs.existsSync(templatePath)) {
        return res.status(404).json({
            success: false,
            error: 'Template not found'
        });
    }
    
    const files = {
        'index.html': fs.existsSync(path.join(templatePath, 'index.html')),
        'styles.css': fs.existsSync(path.join(templatePath, 'styles.css')),
        'script.js': fs.existsSync(path.join(templatePath, 'script.js')),
        'menu.html': fs.existsSync(path.join(templatePath, 'menu.html'))
    };
    
    const completeness = Object.values(files).filter(Boolean).length / Object.keys(files).length;
    
    res.json({
        success: true,
        template: `${dir}/${name}`,
        files,
        completeness: Math.round(completeness * 100),
        status: completeness >= 0.75 ? 'complete' : 'incomplete'
    });
});

// Dashboard route - redirect to dashboard
app.get('/', (req, res) => {
    res.sendFile(path.join(DASHBOARD_DIR, 'index.html'));
});

// Dashboard route - serve dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(DASHBOARD_DIR, 'index.html'));
});

// Catch-all for template routes
app.get('/:dir/:template', (req, res) => {
    const { dir, template } = req.params;
    const templatePath = path.join(BASE_DIR, dir, template);
    const indexPath = path.join(templatePath, 'index.html');
    
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send(`
            <html>
                <head><title>Template Not Found</title></head>
                <body style="font-family: Arial, sans-serif; text-align: center; padding: 2rem;">
                    <h1>🔍 Template Not Found</h1>
                    <p>The template <strong>${dir}/${template}</strong> could not be found.</p>
                    <a href="/" style="color: #6366f1; text-decoration: none;">← Back to Dashboard</a>
                </body>
            </html>
        `);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).send(`
        <html>
            <head><title>404 - Not Found</title></head>
            <body style="font-family: Arial, sans-serif; text-align: center; padding: 2rem;">
                <h1>🔍 Page Not Found</h1>
                <p>The requested page <strong>${req.path}</strong> could not be found.</p>
                <a href="/" style="color: #6366f1; text-decoration: none;">← Back to Dashboard</a>
            </body>
        </html>
    `);
});

// Initialize screenshot generation on server start
async function initializeScreenshots() {
    try {
        console.log('📸 Checking screenshots...');
        const generator = new ScreenshotGenerator();
        await generator.init();
        
        // Get all templates and check for updates
        const templates = await generator.getAllTemplates();
        const needsUpdate = await generator.checkTemplateUpdates(templates);
        
        if (needsUpdate.length > 0) {
            console.log(`🔄 Found ${needsUpdate.length} templates needing screenshots`);
            console.log('Generating screenshots in background...');
            
            // Generate screenshots in background without blocking server
            generator.generateAll(needsUpdate).then(() => {
                console.log('✅ Background screenshot generation completed');
                generator.cleanup();
            }).catch(error => {
                console.error('❌ Background screenshot generation failed:', error);
                generator.cleanup();
            });
        } else {
            console.log('✅ All screenshots are up to date');
            await generator.cleanup();
        }
    } catch (error) {
        console.error('❌ Screenshot initialization failed:', error);
    }
}

// Start server
const server = app.listen(PORT, async () => {
    console.log('');
    console.log('✅ Template Dashboard Server is running!');
    console.log('');
    console.log(`🌐 Dashboard: http://localhost:${PORT}/`);
    console.log(`📊 Templates: http://localhost:${PORT}/templates/`);
    console.log(`🔗 API: http://localhost:${PORT}/api/templates`);
    console.log(`📸 Screenshots: http://localhost:${PORT}/screenshots/`);
    console.log('');
    console.log('📝 Available routes:');
    console.log('   / → Dashboard');
    console.log('   /dashboard → Dashboard');
    console.log('   /templates/[name] → Template preview');
    console.log('   /api/templates → Template list API');
    console.log('');
    console.log('Press Ctrl+C to stop the server');
    
    // Initialize screenshots after server starts
    await initializeScreenshots();
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\\n🛑 Shutting down server...');
    server.close(() => {
        console.log('✅ Server stopped gracefully');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('\\n🛑 Received SIGTERM, shutting down...');
    server.close(() => {
        console.log('✅ Server stopped gracefully');
        process.exit(0);
    });
});

module.exports = app;