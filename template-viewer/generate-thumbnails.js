#!/usr/bin/env node

/**
 * Template Thumbnail Generator
 * Automatically generates screenshots of all templates for the gallery
 */

const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

class ThumbnailGenerator {
    constructor() {
        this.browser = null;
        this.templates = {};
        this.outputDir = path.join(__dirname, 'thumbnails');
        this.baseUrl = 'http://localhost:3000';
        this.screenshotOptions = {
            width: 1200,
            height: 800,
            thumbnailWidth: 400,
            thumbnailHeight: 267,
            quality: 80
        };
    }
    
    async init() {
        console.log('🚀 Initializing Template Thumbnail Generator...');
        
        // Create output directory
        await this.ensureOutputDirectory();
        
        // Load template database
        await this.loadTemplateDatabase();
        
        // Launch browser
        this.browser = await puppeteer.launch({
            headless: 'new',
            defaultViewport: {
                width: this.screenshotOptions.width,
                height: this.screenshotOptions.height
            }
        });
        
        console.log(`📊 Found ${Object.keys(this.templates).length} templates to process`);
    }
    
    async ensureOutputDirectory() {
        try {
            await fs.mkdir(this.outputDir, { recursive: true });
            console.log(`📁 Output directory: ${this.outputDir}`);
        } catch (error) {
            console.error('❌ Failed to create output directory:', error);
            process.exit(1);
        }
    }
    
    async loadTemplateDatabase() {
        try {
            // Try local copy first, then main location
            let databasePath = path.join(__dirname, 'data', 'template-database.json');
            
            try {
                await fs.access(databasePath);
            } catch {
                databasePath = path.join(__dirname, 'data', 'template-database.json');
            }
            
            const data = await fs.readFile(databasePath, 'utf8');
            const database = JSON.parse(data);
            
            this.templates = database.templates;
            console.log(`📚 Loaded template database from: ${databasePath}`);
            
        } catch (error) {
            console.error('❌ Failed to load template database:', error);
            console.log('💡 Make sure the template database exists at: data/template-database.json');
            process.exit(1);
        }
    }
    
    async generateAllThumbnails(options = {}) {
        const {
            force = false,           // Regenerate existing thumbnails
            filter = null,           // Filter function for templates
            maxConcurrent = 3,       // Max concurrent screenshots
            completeOnly = false     // Only complete templates
        } = options;
        
        console.log('\n🖼️  Starting thumbnail generation...');
        
        // Filter templates
        let templatesToProcess = Object.values(this.templates);
        
        if (completeOnly) {
            templatesToProcess = templatesToProcess.filter(t => t.status === 'complete');
            console.log(`🎯 Processing only complete templates: ${templatesToProcess.length}`);
        }
        
        if (filter) {
            templatesToProcess = templatesToProcess.filter(filter);
        }
        
        // Check existing thumbnails
        if (!force) {
            const existingThumbnails = await this.getExistingThumbnails();
            templatesToProcess = templatesToProcess.filter(template => 
                !existingThumbnails.includes(`${template.name}.jpg`)
            );
            console.log(`⏭️  Skipping ${Object.keys(this.templates).length - templatesToProcess.length} existing thumbnails`);
        }
        
        if (templatesToProcess.length === 0) {
            console.log('✅ All thumbnails already exist. Use --force to regenerate.');
            return;
        }
        
        console.log(`📸 Generating ${templatesToProcess.length} thumbnails...`);
        
        // Process templates in batches
        const batches = this.createBatches(templatesToProcess, maxConcurrent);
        let processed = 0;
        
        for (let i = 0; i < batches.length; i++) {
            const batch = batches[i];
            console.log(`\n📦 Processing batch ${i + 1}/${batches.length} (${batch.length} templates)`);
            
            const promises = batch.map(template => this.captureTemplateScreenshot(template));
            const results = await Promise.allSettled(promises);
            
            // Log results
            results.forEach((result, index) => {
                processed++;
                const template = batch[index];
                
                if (result.status === 'fulfilled') {
                    console.log(`✅ [${processed}/${templatesToProcess.length}] ${template.name}`);
                } else {
                    console.log(`❌ [${processed}/${templatesToProcess.length}] ${template.name}: ${result.reason}`);
                }
            });
        }
        
        console.log(`\n🎉 Thumbnail generation complete! Generated ${processed} thumbnails.`);
        console.log(`📁 Thumbnails saved to: ${this.outputDir}`);
    }
    
    async captureTemplateScreenshot(template) {
        const page = await this.browser.newPage();
        
        try {
            // Set viewport
            await page.setViewport({
                width: this.screenshotOptions.width,
                height: this.screenshotOptions.height
            });
            
            // Navigate to template
            const templateUrl = `${this.baseUrl}/${template.path}/index.html`;
            
            await page.goto(templateUrl, {
                waitUntil: 'networkidle0',
                timeout: 30000
            });
            
            // Wait a bit for any animations/fonts to load
            await page.waitForTimeout(2000);
            
            // Take screenshot
            const screenshotPath = path.join(this.outputDir, `${template.name}.jpg`);
            
            await page.screenshot({
                path: screenshotPath,
                type: 'jpeg',
                quality: this.screenshotOptions.quality,
                fullPage: false // Capture viewport only
            });
            
            // Generate thumbnail version
            await this.generateThumbnailVersion(screenshotPath);
            
            return screenshotPath;
            
        } catch (error) {
            throw new Error(`Failed to capture ${template.name}: ${error.message}`);
        } finally {
            await page.close();
        }
    }
    
    async generateThumbnailVersion(originalPath) {
        // This would require an image processing library like Sharp
        // For now, we'll just use the original screenshot
        // In the future, you could add image resizing here
        return originalPath;
    }
    
    async getExistingThumbnails() {
        try {
            const files = await fs.readdir(this.outputDir);
            return files.filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
        } catch {
            return [];
        }
    }
    
    createBatches(array, batchSize) {
        const batches = [];
        for (let i = 0; i < array.length; i += batchSize) {
            batches.push(array.slice(i, i + batchSize));
        }
        return batches;
    }
    
    async generateSpecificTemplates(templateNames) {
        console.log(`🎯 Generating thumbnails for specific templates: ${templateNames.join(', ')}`);
        
        const templates = templateNames.map(name => this.templates[name]).filter(Boolean);
        
        if (templates.length === 0) {
            console.log('❌ No valid templates found with those names');
            return;
        }
        
        for (const template of templates) {
            try {
                await this.captureTemplateScreenshot(template);
                console.log(`✅ Generated thumbnail for: ${template.name}`);
            } catch (error) {
                console.log(`❌ Failed to generate thumbnail for ${template.name}: ${error.message}`);
            }
        }
    }
    
    async generateByCategory(category) {
        console.log(`🏷️  Generating thumbnails for category: ${category}`);
        
        const categoryTemplates = Object.values(this.templates).filter(t => t.category === category);
        
        if (categoryTemplates.length === 0) {
            console.log(`❌ No templates found for category: ${category}`);
            return;
        }
        
        await this.generateAllThumbnails({
            filter: template => template.category === category
        });
    }
    
    async cleanup() {
        if (this.browser) {
            await this.browser.close();
        }
    }
    
    async generateManifest() {
        console.log('📋 Generating thumbnail manifest...');
        
        const existingThumbnails = await this.getExistingThumbnails();
        const manifest = {};
        
        existingThumbnails.forEach(filename => {
            const templateName = filename.replace(/\.(jpg|png)$/, '');
            const template = this.templates[templateName];
            
            if (template) {
                manifest[templateName] = {
                    filename: filename,
                    path: `thumbnails/${filename}`,
                    template: {
                        name: template.name,
                        category: template.category,
                        status: template.status,
                        rating: template.ratings.overall
                    },
                    generated: new Date().toISOString()
                };
            }
        });
        
        const manifestPath = path.join(this.outputDir, 'manifest.json');
        await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
        
        console.log(`📋 Manifest saved: ${manifestPath}`);
        console.log(`🖼️  Total thumbnails: ${Object.keys(manifest).length}`);
        
        return manifest;
    }
}

// CLI Interface
async function main() {
    const args = process.argv.slice(2);
    const generator = new ThumbnailGenerator();
    
    try {
        await generator.init();
        
        if (args.includes('--help') || args.includes('-h')) {
            console.log(`
Template Thumbnail Generator

Usage:
  node generate-thumbnails.js [options] [command]

Commands:
  all                    Generate all thumbnails (default)
  category <name>        Generate thumbnails for specific category
  template <name...>     Generate thumbnails for specific templates
  manifest              Generate thumbnail manifest file

Options:
  --force               Regenerate existing thumbnails
  --complete-only       Only process complete templates
  --concurrent <n>      Max concurrent screenshots (default: 3)
  --help, -h           Show this help

Examples:
  node generate-thumbnails.js all --complete-only
  node generate-thumbnails.js category fine-dining
  node generate-thumbnails.js template casual-family modern-bistro
  node generate-thumbnails.js manifest

Note: Make sure the test server is running on port 3000 before generating thumbnails.
            `);
            return;
        }
        
        const command = args[0] || 'all';
        const force = args.includes('--force');
        const completeOnly = args.includes('--complete-only');
        const concurrentIndex = args.indexOf('--concurrent');
        const maxConcurrent = concurrentIndex >= 0 ? parseInt(args[concurrentIndex + 1]) || 3 : 3;
        
        switch (command) {
            case 'all':
                await generator.generateAllThumbnails({ force, completeOnly, maxConcurrent });
                break;
                
            case 'category':
                const category = args[1];
                if (!category) {
                    console.log('❌ Please specify a category name');
                    return;
                }
                await generator.generateByCategory(category);
                break;
                
            case 'template':
                const templateNames = args.slice(1).filter(arg => !arg.startsWith('--'));
                if (templateNames.length === 0) {
                    console.log('❌ Please specify template names');
                    return;
                }
                await generator.generateSpecificTemplates(templateNames);
                break;
                
            case 'manifest':
                await generator.generateManifest();
                break;
                
            default:
                console.log(`❌ Unknown command: ${command}`);
                console.log('Use --help for usage information');
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    } finally {
        await generator.cleanup();
    }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n👋 Shutting down gracefully...');
    process.exit(0);
});

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = ThumbnailGenerator;