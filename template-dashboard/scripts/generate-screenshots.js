#!/usr/bin/env node

/**
 * Screenshot Generation Script
 * Automatically generates screenshots for all restaurant templates
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class ScreenshotGenerator {
    constructor() {
        this.baseDir = path.resolve(__dirname, '../..');
        this.dashboardDir = path.resolve(__dirname, '..');
        this.screenshotDir = path.join(this.dashboardDir, 'screenshots');
        this.browser = null;
        this.page = null;
        
        // Screenshot settings
        this.screenshotConfig = {
            width: 1200,
            height: 800,
            type: 'png',
            quality: 90,
            fullPage: false
        };
        
        // Template directories to scan
        this.templateDirs = [
            'templates',
            'templates-new', 
            'templates-business',
            'templates-incomplete'
        ];
    }
    
    async init() {
        console.log('🚀 Initializing Screenshot Generator...');
        console.log(`📁 Base directory: ${this.baseDir}`);
        console.log(`📸 Screenshot directory: ${this.screenshotDir}`);
        
        // Create screenshots directory if it doesn't exist
        if (!fs.existsSync(this.screenshotDir)) {
            fs.mkdirSync(this.screenshotDir, { recursive: true });
            console.log('📁 Created screenshots directory');
        }
        
        // Initialize Puppeteer
        this.browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu'
            ]
        });
        
        this.page = await this.browser.newPage();
        await this.page.setViewport({
            width: this.screenshotConfig.width,
            height: this.screenshotConfig.height
        });
        
        console.log('✅ Puppeteer initialized');
    }
    
    async getAllTemplates() {
        const allTemplates = [];
        
        for (const dir of this.templateDirs) {
            const dirPath = path.join(this.baseDir, dir);
            if (fs.existsSync(dirPath)) {
                const items = fs.readdirSync(dirPath, { withFileTypes: true });
                const templates = items
                    .filter(item => item.isDirectory())
                    .map(item => {
                        const templatePath = path.join(dirPath, item.name);
                        const indexPath = path.join(templatePath, 'index.html');
                        
                        // Check if template has index.html
                        if (fs.existsSync(indexPath)) {
                            return {
                                id: `${dir}_${item.name}`,
                                name: item.name,
                                directory: dir,
                                path: templatePath,
                                url: `http://localhost:3000/${dir}/${item.name}/index.html`,
                                screenshotPath: path.join(this.screenshotDir, `${dir}_${item.name}.png`)
                            };
                        }
                        return null;
                    })
                    .filter(Boolean);
                
                allTemplates.push(...templates);
            }
        }
        
        return allTemplates;
    }
    
    async checkTemplateUpdates(templates) {
        const needsUpdate = [];
        
        for (const template of templates) {
            const screenshotPath = template.screenshotPath;
            
            if (!fs.existsSync(screenshotPath)) {
                // No screenshot exists - needs generation
                needsUpdate.push({
                    ...template,
                    reason: 'missing'
                });
                continue;
            }
            
            // Check if any template file is newer than screenshot
            const templateFiles = ['index.html', 'styles.css', 'script.js'];
            const screenshotTime = fs.statSync(screenshotPath).mtime;
            
            const isOutdated = templateFiles.some(file => {
                const filePath = path.join(template.path, file);
                if (fs.existsSync(filePath)) {
                    const fileTime = fs.statSync(filePath).mtime;
                    return fileTime > screenshotTime;
                }
                return false;
            });
            
            if (isOutdated) {
                needsUpdate.push({
                    ...template,
                    reason: 'outdated'
                });
            }
        }
        
        return needsUpdate;
    }
    
    async generateScreenshot(template) {
        try {
            console.log(`📸 Generating screenshot for ${template.name}...`);
            
            // Navigate to template
            await this.page.goto(template.url, {
                waitUntil: 'networkidle2',
                timeout: 30000
            });
            
            // Wait for any animations or loading
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Take screenshot
            const screenshotOptions = {
                path: template.screenshotPath,
                type: this.screenshotConfig.type,
                fullPage: this.screenshotConfig.fullPage
            };
            
            // Only add quality for JPEG screenshots
            if (this.screenshotConfig.type === 'jpeg') {
                screenshotOptions.quality = this.screenshotConfig.quality;
            }
            
            await this.page.screenshot(screenshotOptions);
            
            console.log(`✅ Screenshot saved: ${path.basename(template.screenshotPath)}`);
            return true;
            
        } catch (error) {
            console.error(`❌ Failed to generate screenshot for ${template.name}:`, error.message);
            return false;
        }
    }
    
    async generateAll(templates = null) {
        if (!templates) {
            templates = await this.getAllTemplates();
        }
        
        console.log(`📊 Found ${templates.length} templates`);
        
        // Check which templates need updates
        const needsUpdate = await this.checkTemplateUpdates(templates);
        
        if (needsUpdate.length === 0) {
            console.log('✅ All screenshots are up to date!');
            return;
        }
        
        console.log(`🔄 Generating ${needsUpdate.length} screenshots...`);
        
        let successful = 0;
        let failed = 0;
        
        for (let i = 0; i < needsUpdate.length; i++) {
            const template = needsUpdate[i];
            const progress = `[${i + 1}/${needsUpdate.length}]`;
            
            console.log(`${progress} Processing ${template.name} (${template.reason})`);
            
            const success = await this.generateScreenshot(template);
            if (success) {
                successful++;
            } else {
                failed++;
            }
            
            // Small delay to prevent overwhelming the system
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        console.log('');
        console.log('📊 Screenshot Generation Summary:');
        console.log(`✅ Successful: ${successful}`);
        console.log(`❌ Failed: ${failed}`);
        console.log(`📸 Total templates: ${templates.length}`);
        console.log(`🔄 Attempted: ${needsUpdate.length}`);
        
        if (failed > 0) {
            console.log('');
            console.log('⚠️  Some screenshots failed to generate. You can:');
            console.log('   1. Restart the server to retry failed screenshots');
            console.log('   2. Run: npm run generate-screenshots');
            console.log('   3. Check if templates load properly in browser');
        }
    }
    
    async cleanup() {
        if (this.browser) {
            await this.browser.close();
            console.log('🧹 Puppeteer cleanup completed');
        }
    }
}

// Main execution
async function main() {
    const generator = new ScreenshotGenerator();
    
    try {
        await generator.init();
        await generator.generateAll();
        console.log('✅ Screenshot generation completed successfully!');
    } catch (error) {
        console.error('❌ Screenshot generation failed:', error);
        process.exit(1);
    } finally {
        await generator.cleanup();
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = ScreenshotGenerator;