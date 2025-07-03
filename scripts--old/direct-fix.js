#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const clientName = process.argv[2];
if (!clientName) {
  console.error('Usage: node direct-fix.js <client-name>');
  process.exit(1);
}

const clientPath = path.join(__dirname, '../client-projects', clientName);
const generatedPath = path.join(clientPath, 'generated/website');
const clientDataPath = path.join(clientPath, 'source/client-data.json');

// Load client data
const clientData = JSON.parse(fs.readFileSync(clientDataPath, 'utf8'));
console.log('Sample data keys:', Object.keys(clientData).slice(0, 10));

// Fix index.html
const indexPath = path.join(generatedPath, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');
console.log('Original placeholders found:', (indexContent.match(/\{\{[A-Z_]+\}\}/g) || []).length);

// Replace all placeholders
Object.keys(clientData).forEach(key => {
  if (key !== '_INSTRUCTIONS' && typeof clientData[key] === 'string') {
    const placeholder = `{{${key}}}`;
    const value = clientData[key];
    indexContent = indexContent.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), value);
  }
});

console.log('Remaining placeholders:', (indexContent.match(/\{\{[A-Z_]+\}\}/g) || []).length);
fs.writeFileSync(indexPath, indexContent, 'utf8');

// Fix menu.html
const menuPath = path.join(generatedPath, 'menu.html');
if (fs.existsSync(menuPath)) {
  let menuContent = fs.readFileSync(menuPath, 'utf8');
  Object.keys(clientData).forEach(key => {
    if (key !== '_INSTRUCTIONS' && typeof clientData[key] === 'string') {
      const placeholder = `{{${key}}}`;
      const value = clientData[key];
      menuContent = menuContent.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), value);
    }
  });
  fs.writeFileSync(menuPath, menuContent, 'utf8');
}

console.log('✅ Direct replacement completed');