#!/usr/bin/env node

/**
 * Restaurant Image Library Audit & Fix Script
 * 
 * This script helps systematically audit and fix misnamed images in the restaurant business library.
 * Critical for maintaining professional $1000 website business standards.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Base directory for images
const BASE_DIR = path.join(__dirname, '../images/general');

// Suspected problematic images based on initial audit
const SUSPECTED_MISNAMED = [
    {
        current: 'staff-people/chef-plating-009.jpg',
        actualContent: 'Restaurant interior dining area from overhead view',
        suggestedCategory: 'restaurant-interiors',
        suggestedName: 'interior-dining-overhead-view-001.jpg'
    },
    {
        current: 'staff-people/customers-dining-007.jpg',
        actualContent: 'Office meeting with business team',
        suggestedCategory: 'business-services',
        suggestedName: 'business-meeting-team-001.jpg'
    },
    {
        current: 'staff-people/staff-server-friendly-002.jpg',
        actualContent: 'Office meeting with woman presenting',
        suggestedCategory: 'business-services',
        suggestedName: 'business-meeting-presentation-002.jpg'
    }
];

// Restaurant-appropriate categories
const VALID_CATEGORIES = [
    'customer-emotions',
    'food-presentation', 
    'restaurant-atmosphere',
    'service-excellence',
    'seasonal-content',
    'behind-scenes'
];

// Image validation rules
const VALIDATION_RULES = {
    'food-dishes': {
        description: 'Must show actual restaurant food dishes',
        keywords: ['food', 'dish', 'meal', 'plate', 'restaurant'],
        reject: ['office', 'meeting', 'business', 'computer']
    },
    'desserts': {
        description: 'Must show desserts, sweets, or pastries',
        keywords: ['dessert', 'cake', 'pastry', 'sweet', 'chocolate'],
        reject: ['savory', 'main course', 'office']
    },
    'drinks-beverages': {
        description: 'Must show beverages, cocktails, coffee, etc.',
        keywords: ['drink', 'beverage', 'cocktail', 'coffee', 'wine'],
        reject: ['food', 'office', 'meeting']
    },
    'restaurant-interiors': {
        description: 'Must show restaurant interior spaces',
        keywords: ['dining', 'restaurant', 'tables', 'seating', 'kitchen'],
        reject: ['office', 'conference', 'business meeting', 'corporate']
    },
    'staff-people': {
        description: 'Must show restaurant staff or customers in restaurant setting',
        keywords: ['chef', 'server', 'waiter', 'customer', 'dining'],
        reject: ['office', 'business meeting', 'conference room', 'corporate']
    }
};

/**
 * Get all image files in a directory
 */
function getImageFiles(directory) {
    try {
        const fullPath = path.join(BASE_DIR, directory);
        if (!fs.existsSync(fullPath)) {
            console.log(`Directory does not exist: ${fullPath}`);
            return [];
        }
        
        return fs.readdirSync(fullPath)
            .filter(file => file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg'))
            .map(file => path.join(directory, file));
    } catch (error) {
        console.error(`Error reading directory ${directory}:`, error.message);
        return [];
    }
}

/**
 * Get all directories in the general images folder
 */
function getImageDirectories() {
    try {
        return fs.readdirSync(BASE_DIR, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
    } catch (error) {
        console.error('Error reading base directory:', error.message);
        return [];
    }
}

/**
 * Generate audit report for manual review
 */
function generateAuditReport() {
    console.log('🔍 GENERATING RESTAURANT IMAGE AUDIT REPORT\n');
    
    const directories = getImageDirectories();
    const auditResults = [];
    
    directories.forEach(dir => {
        console.log(`📁 Auditing directory: ${dir}`);
        const images = getImageFiles(dir);
        
        images.forEach(imagePath => {
            const filename = path.basename(imagePath);
            const category = path.dirname(imagePath);
            
            auditResults.push({
                path: imagePath,
                filename: filename,
                category: category,
                needsReview: isLikelyMisnamed(filename, category)
            });
        });
    });
    
    // Generate report
    const reportPath = path.join(__dirname, '../images/AUDIT_RESULTS.md');
    let reportContent = '# Restaurant Image Library Audit Results\n\n';
    reportContent += `## Summary\n`;
    reportContent += `- Total Images: ${auditResults.length}\n`;
    reportContent += `- Suspected Issues: ${auditResults.filter(r => r.needsReview).length}\n\n`;
    
    reportContent += '## Images Requiring Manual Review\n\n';
    reportContent += '| File Path | Issue | Recommendation |\n';
    reportContent += '|-----------|-------|----------------|\n';
    
    auditResults.filter(r => r.needsReview).forEach(item => {
        reportContent += `| ${item.path} | Filename/category mismatch | Manual review required |\n`;
    });
    
    reportContent += '\n## All Images by Category\n\n';
    directories.forEach(dir => {
        const categoryImages = auditResults.filter(r => r.category === dir);
        reportContent += `### ${dir} (${categoryImages.length} images)\n`;
        categoryImages.forEach(img => {
            const status = img.needsReview ? '⚠️' : '✅';
            reportContent += `- ${status} ${img.filename}\n`;
        });
        reportContent += '\n';
    });
    
    fs.writeFileSync(reportPath, reportContent);
    console.log(`\n📋 Audit report generated: ${reportPath}`);
    
    return auditResults;
}

/**
 * Check if filename likely doesn't match content based on patterns
 */
function isLikelyMisnamed(filename, category) {
    const rules = VALIDATION_RULES[category];
    if (!rules) return false;
    
    const lowerFilename = filename.toLowerCase();
    
    // Check for reject keywords (strong indicators of wrong category)
    return rules.reject.some(keyword => lowerFilename.includes(keyword));
}

/**
 * Interactive image review process
 */
async function interactiveReview() {
    console.log('🎯 INTERACTIVE IMAGE REVIEW\n');
    console.log('This will help you manually review and fix suspected misnamed images.\n');
    
    for (const item of SUSPECTED_MISNAMED) {
        console.log(`\n📸 Reviewing: ${item.current}`);
        console.log(`Actual Content: ${item.actualContent}`);
        console.log(`Suggested: ${item.suggestedCategory}/${item.suggestedName}`);
        
        const answer = await askQuestion('Action: (r)ename, (m)ove, (k)eep, (d)elete, (s)kip: ');
        
        switch (answer.toLowerCase()) {
            case 'r':
                await renameImage(item);
                break;
            case 'm':
                await moveImage(item);
                break;
            case 'd':
                await deleteImage(item);
                break;
            case 'k':
                console.log('✅ Keeping as-is');
                break;
            case 's':
                console.log('⏭️ Skipping');
                break;
            default:
                console.log('❌ Invalid option, skipping');
        }
    }
}

/**
 * Helper function to ask questions
 */
function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

/**
 * Rename an image file
 */
async function renameImage(item) {
    const currentPath = path.join(BASE_DIR, item.current);
    const newName = await askQuestion('Enter new filename: ') || item.suggestedName;
    const newPath = path.join(path.dirname(currentPath), newName);
    
    try {
        fs.renameSync(currentPath, newPath);
        console.log(`✅ Renamed: ${item.current} → ${newName}`);
    } catch (error) {
        console.error(`❌ Rename failed: ${error.message}`);
    }
}

/**
 * Move an image to different category
 */
async function moveImage(item) {
    const currentPath = path.join(BASE_DIR, item.current);
    const newCategory = await askQuestion('Enter target category: ') || item.suggestedCategory;
    const newName = await askQuestion('Enter new filename: ') || item.suggestedName;
    
    const targetDir = path.join(BASE_DIR, newCategory);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }
    
    const newPath = path.join(targetDir, newName);
    
    try {
        fs.renameSync(currentPath, newPath);
        console.log(`✅ Moved: ${item.current} → ${newCategory}/${newName}`);
    } catch (error) {
        console.error(`❌ Move failed: ${error.message}`);
    }
}

/**
 * Delete an image file
 */
async function deleteImage(item) {
    const confirm = await askQuestion('Confirm delete? (y/N): ');
    if (confirm.toLowerCase() === 'y') {
        const currentPath = path.join(BASE_DIR, item.current);
        try {
            fs.unlinkSync(currentPath);
            console.log(`✅ Deleted: ${item.current}`);
        } catch (error) {
            console.error(`❌ Delete failed: ${error.message}`);
        }
    } else {
        console.log('❌ Delete cancelled');
    }
}

/**
 * Main execution
 */
async function main() {
    console.log('🍽️ RESTAURANT IMAGE LIBRARY AUDIT TOOL\n');
    console.log('This tool helps maintain professional image standards for your $1000 website business.\n');
    
    const action = await askQuestion('Choose action: (a)udit report, (r)eview suspected, (q)uit: ');
    
    switch (action.toLowerCase()) {
        case 'a':
            generateAuditReport();
            break;
        case 'r':
            await interactiveReview();
            break;
        case 'q':
            console.log('👋 Goodbye!');
            break;
        default:
            console.log('❌ Invalid option');
    }
    
    rl.close();
}

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = {
    generateAuditReport,
    getImageFiles,
    getImageDirectories,
    VALIDATION_RULES
};