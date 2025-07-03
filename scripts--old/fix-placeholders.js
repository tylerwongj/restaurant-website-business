#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fixPlaceholders(clientName) {
  const clientPath = path.join(__dirname, '../client-projects', clientName);
  const generatedPath = path.join(clientPath, 'generated/website');
  const clientDataPath = path.join(clientPath, 'source/client-data.json');
  
  // Load client data
  const clientData = JSON.parse(fs.readFileSync(clientDataPath, 'utf8'));
  
  // Get HTML files
  const htmlFiles = ['index.html', 'menu.html'];
  
  htmlFiles.forEach(filename => {
    const filePath = path.join(generatedPath, filename);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      let replacements = 0;
      
      // Replace all placeholders
      content = content.replace(/\{\{([A-Z_]+)\}\}/g, (match, key) => {
        if (clientData[key] !== undefined) {
          replacements++;
          return clientData[key];
        }
        return match;
      });
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed ${replacements} placeholders in ${filename}`);
    }
  });
}

const clientName = process.argv[2];
if (!clientName) {
  console.error('Usage: node fix-placeholders.js <client-name>');
  process.exit(1);
}

fixPlaceholders(clientName);