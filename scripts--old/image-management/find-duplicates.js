#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const imagesDir = path.join(__dirname, '..', 'images');

function calculateMD5(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash('md5');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
}

function getFileSize(filePath) {
    return fs.statSync(filePath).size;
}

function findDuplicates() {
    const files = fs.readdirSync(imagesDir)
        .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
        .map(file => path.join(imagesDir, file));

    console.log(`Analyzing ${files.length} image files for duplicates...`);

    const fileMap = new Map();
    const duplicates = [];
    const potentialNameDuplicates = [];

    files.forEach(filePath => {
        const fileName = path.basename(filePath);
        const fileSize = getFileSize(filePath);
        const md5Hash = calculateMD5(filePath);
        
        const key = `${fileSize}-${md5Hash}`;
        
        if (fileMap.has(key)) {
            duplicates.push({
                original: fileMap.get(key),
                duplicate: fileName,
                size: fileSize,
                hash: md5Hash
            });
        } else {
            fileMap.set(key, fileName);
        }

        // Check for potential name-based duplicates (e.g., file.jpg vs file_1.jpg)
        const baseName = fileName.replace(/_1(\.[^.]+)$/, '$1');
        if (baseName !== fileName) {
            const originalPath = path.join(imagesDir, baseName);
            if (fs.existsSync(originalPath)) {
                potentialNameDuplicates.push({
                    original: baseName,
                    duplicate: fileName,
                    originalPath,
                    duplicatePath: filePath
                });
            }
        }
    });

    console.log('\n=== EXACT DUPLICATES (same file content) ===');
    if (duplicates.length === 0) {
        console.log('No exact duplicates found.');
    } else {
        duplicates.forEach(dup => {
            console.log(`${dup.original} === ${dup.duplicate} (${dup.size} bytes)`);
        });
    }

    console.log('\n=== POTENTIAL NAME-BASED DUPLICATES ===');
    if (potentialNameDuplicates.length === 0) {
        console.log('No name-based duplicates found.');
    } else {
        potentialNameDuplicates.forEach(dup => {
            const originalHash = calculateMD5(dup.originalPath);
            const duplicateHash = calculateMD5(dup.duplicatePath);
            const identical = originalHash === duplicateHash;
            
            console.log(`${dup.original} ${identical ? '===' : '≠≠≠'} ${dup.duplicate} ${identical ? '(IDENTICAL)' : '(DIFFERENT)'}`);
        });
    }

    // Generate removal commands for identical files
    console.log('\n=== REMOVAL COMMANDS ===');
    
    // Remove exact duplicates (keep first occurrence)
    duplicates.forEach(dup => {
        console.log(`rm "images/${dup.duplicate}"`);
    });

    // Remove identical name-based duplicates (keep original, remove _1 version)
    potentialNameDuplicates.forEach(dup => {
        const originalHash = calculateMD5(dup.originalPath);
        const duplicateHash = calculateMD5(dup.duplicatePath);
        if (originalHash === duplicateHash) {
            console.log(`rm "images/${dup.duplicate}"`);
        }
    });

    const totalDuplicates = duplicates.length + potentialNameDuplicates.filter(dup => {
        const originalHash = calculateMD5(dup.originalPath);
        const duplicateHash = calculateMD5(dup.duplicatePath);
        return originalHash === duplicateHash;
    }).length;

    console.log(`\nTotal duplicates to remove: ${totalDuplicates}`);
    console.log(`Files remaining after cleanup: ${files.length - totalDuplicates}`);
}

findDuplicates();