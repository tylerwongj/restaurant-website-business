#!/usr/bin/env node

/**
 * Template Thumbnail Generator
 * Automatically captures screenshots of all restaurant website templates
 */

const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

class ThumbnailGenerator {
    constructor() {
        this.browser = null;
        this.baseUrl = 'http://localhost:3000';
        this.thumbnailDir = path.join(__dirname, 'thumbnails');
        this.templates = {};
        this.processedCount = 0;
        this.totalCount = 0;
        this.errors = [];
    }
    
    async init() {
        console.log('🚀 Template Thumbnail Generator v1.0.0');
        console.log('');
        
        // Create thumbnails directory
        await this.ensureThumbnailDirectory();
        
        // Launch browser
        await this.launchBrowser();
        
        // Start local server check
        await this.checkServer();
        
        // Scan templates
        await this.scanTemplates();
        
        console.log(`📊 Found ${this.totalCount} templates to process`);
        console.log('');
    }
    
    async ensureThumbnailDirectory() {
        try {
            await fs.access(this.thumbnailDir);
            console.log(`📁 Thumbnails directory exists: ${this.thumbnailDir}`);
        } catch {
            await fs.mkdir(this.thumbnailDir, { recursive: true });
            console.log(`📁 Created thumbnails directory: ${this.thumbnailDir}`);
        }
        
        // Create subdirectories
        const subdirs = ['desktop', 'mobile', 'hero'];
        for (const subdir of subdirs) {
            const subdirPath = path.join(this.thumbnailDir, subdir);
            try {
                await fs.access(subdirPath);
            } catch {
                await fs.mkdir(subdirPath, { recursive: true });
                console.log(`📁 Created subdirectory: ${subdir}/`);
            }
        }
    }
    
    async launchBrowser() {
        console.log('🌐 Launching headless browser...');
        this.browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu'
            ]
        });
        console.log('✅ Browser launched successfully');
    }
    
    async checkServer() {
        try {
            const page = await this.browser.newPage();
            await page.goto(this.baseUrl, { timeout: 5000 });
            await page.close();
            console.log(`✅ Server is running at ${this.baseUrl}`);
        } catch (error) {
            console.error('❌ Server not running. Please start the server first:');
            console.error('   node test-server.js');
            process.exit(1);
        }
    }
    
    async scanTemplates() {
        console.log('🔍 Scanning template directories...');
        
        const templateDirs = [
            'templates',
            'templates-new',
            'templates-incomplete', 
            'templates-business'
        ];
        
        for (const dir of templateDirs) {
            try {
                console.log(`  📁 Scanning: ${dir}`);
                const templates = await this.scanTemplateDirectory(dir);
                Object.assign(this.templates, templates);
            } catch (error) {
                console.warn(`  ⚠️  Could not scan directory: ${dir}`);
            }
        }
        
        this.totalCount = Object.keys(this.templates).length;
    }
    
    async scanTemplateDirectory(dir) {
        const templates = {};
        
        try {
            // Use predefined template names for now since directory listing isn't working
            console.log(`    Using predefined template names for ${dir}`);
            const templateNames = this.getKnownTemplateNames();
            
            console.log(`    Found ${templateNames.length} known templates`);
            
            for (const name of templateNames) {
                const templateId = `${dir}_${name}`;
                templates[templateId] = {
                    id: templateId,
                    name,
                    path: `${dir}/${name}`,
                    directory: dir
                };
            }
        } catch (error) {
            console.warn(`Could not scan ${dir}:`, error.message);
        }
        
        return templates;
    }
    
    extractTemplateNames(html) {
        // For Apache/Nginx directory listings
        let matches = html.match(/href="([^"]+\/)"[^>]*>/g) || [];
        let names = matches
            .map(match => {
                const nameMatch = match.match(/href="([^"]+)\/"/);
                return nameMatch ? nameMatch[1] : null;
            })
            .filter(name => name && !name.startsWith('.') && name !== 'images' && name !== 'data');
            
        // If no directory listing found, try common template names
        if (names.length === 0) {
            console.log('    No directory listing found, using predefined template names');
            names = this.getKnownTemplateNames();
        }
        
        return names.slice(0, 50); // Limit for testing
    }
    
    getKnownTemplateNames() {
        // Common template names found in your directories
        return [
            'casual-family',
            'casual-family-modern',
            'casual-family-grid',
            'fine-dining-elegant',
            'fine-dining-contemporary',
            'fast-casual-modern',
            'cafe-bistro',
            'pizza-parlor-modern',
            'asian-fusion-modern',
            'steakhouse-premium'
        ];
    }
    
    async generateAllThumbnails(options = {}) {
        const {
            force = false,
            limit = null,
            skipExisting = true
        } = options;
        
        const templates = Object.values(this.templates);
        const templatesToProcess = limit ? templates.slice(0, limit) : templates;
        
        console.log(`🎬 Starting thumbnail generation for ${templatesToProcess.length} templates`);
        console.log('');
        
        for (const template of templatesToProcess) {
            try {
                // Check if thumbnails already exist
                if (skipExisting && !force) {
                    const desktopExists = await this.thumbnailExists(template.id, 'desktop');
                    if (desktopExists) {
                        console.log(`⏭️  Skipping ${template.name} (thumbnail exists)`);
                        this.processedCount++;
                        continue;
                    }
                }
                
                await this.generateTemplateThumbnails(template);
                this.processedCount++;
                
                // Progress update
                const progress = Math.round((this.processedCount / templatesToProcess.length) * 100);
                console.log(`📊 Progress: ${this.processedCount}/${templatesToProcess.length} (${progress}%)`);
                
            } catch (error) {
                console.error(`❌ Failed to generate thumbnail for ${template.name}:`, error.message);
                this.errors.push({
                    template: template.name,
                    error: error.message
                });
            }
        }
        
        await this.cleanup();
        await this.generateSummaryReport();
    }
    
    async generateTemplateThumbnails(template) {
        const templateUrl = `${this.baseUrl}/${template.path}/index.html`;
        
        console.log(`📸 Capturing: ${template.name}`);
        
        const page = await this.browser.newPage();
        
        try {
            // Navigate to template
            await page.goto(templateUrl, { 
                waitUntil: 'networkidle0',
                timeout: 30000
            });
            
            // Wait for any dynamic content
            await page.waitForFunction(() => document.readyState === 'complete');
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Generate desktop thumbnail
            await page.setViewport({ width: 1200, height: 800 });
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const desktopPath = path.join(this.thumbnailDir, 'desktop', `${template.id}.jpg`);
            await page.screenshot({
                path: desktopPath,
                type: 'jpeg',
                quality: 85,
                fullPage: false
            });
            
            // Generate mobile thumbnail
            await page.setViewport({ width: 375, height: 667 });
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const mobilePath = path.join(this.thumbnailDir, 'mobile', `${template.id}.jpg`);
            await page.screenshot({
                path: mobilePath,
                type: 'jpeg',
                quality: 85,
                fullPage: false
            });
            
            // Generate hero section screenshot
            await page.setViewport({ width: 1200, height: 600 });
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const heroPath = path.join(this.thumbnailDir, 'hero', `${template.id}.jpg`);
            await page.screenshot({
                path: heroPath,
                type: 'jpeg',
                quality: 90,
                fullPage: false
            });
            
            console.log(`  ✅ Generated thumbnails for ${template.name}`);
            
        } catch (error) {
            console.error(`  ❌ Error capturing ${template.name}:`, error.message);
            throw error;
        } finally {
            await page.close();
        }
    }
    
    async thumbnailExists(templateId, type = 'desktop') {
        try {
            const thumbnailPath = path.join(this.thumbnailDir, type, `${templateId}.jpg`);
            await fs.access(thumbnailPath);
            return true;
        } catch {
            return false;
        }
    }
    
    async cleanup() {
        if (this.browser) {
            await this.browser.close();
            console.log('🔄 Browser closed');
        }
    }
    
    async generateSummaryReport() {
        console.log('');
        console.log('📊 THUMBNAIL GENERATION SUMMARY');
        console.log('════════════════════════════════════════');
        console.log(`✅ Successfully processed: ${this.processedCount}`);
        console.log(`❌ Errors encountered: ${this.errors.length}`);
        console.log(`📁 Thumbnails saved to: ${this.thumbnailDir}`);
        
        if (this.errors.length > 0) {
            console.log('');
            console.log('❌ ERRORS:');
            this.errors.forEach(error => {
                console.log(`  • ${error.template}: ${error.error}`);
            });
        }
        
        // Generate thumbnail index
        await this.generateThumbnailIndex();
        
        console.log('');
        console.log('🎉 Thumbnail generation complete!');
        console.log('💡 Use the enhanced template viewer to see thumbnails');
    }
    
    async generateThumbnailIndex() {
        const thumbnailIndex = {
            generated_at: new Date().toISOString(),
            total_thumbnails: this.processedCount,
            errors: this.errors.length,
            thumbnails: {}
        };
        
        for (const template of Object.values(this.templates)) {
            const desktopExists = await this.thumbnailExists(template.id, 'desktop');
            const mobileExists = await this.thumbnailExists(template.id, 'mobile');
            const heroExists = await this.thumbnailExists(template.id, 'hero');
            
            if (desktopExists || mobileExists || heroExists) {
                thumbnailIndex.thumbnails[template.id] = {
                    name: template.name,
                    path: template.path,
                    desktop: desktopExists ? `thumbnails/desktop/${template.id}.jpg` : null,
                    mobile: mobileExists ? `thumbnails/mobile/${template.id}.jpg` : null,
                    hero: heroExists ? `thumbnails/hero/${template.id}.jpg` : null
                };
            }
        }
        
        const indexPath = path.join(this.thumbnailDir, 'thumbnail-index.json');
        await fs.writeFile(indexPath, JSON.stringify(thumbnailIndex, null, 2));
        
        console.log(`📋 Thumbnail index saved: ${indexPath}`);
    }
}

// CLI Interface
async function main() {
    const args = process.argv.slice(2);
    const options = {};
    
    // Parse command line arguments
    if (args.includes('--force')) options.force = true;
    if (args.includes('--no-skip')) options.skipExisting = false;
    
    const limitArg = args.find(arg => arg.startsWith('--limit='));
    if (limitArg) {
        options.limit = parseInt(limitArg.split('=')[1]);
    }
    
    const generator = new ThumbnailGenerator();
    
    try {
        await generator.init();
        await generator.generateAllThumbnails(options);
    } catch (error) {
        console.error('💥 Fatal error:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = ThumbnailGenerator;