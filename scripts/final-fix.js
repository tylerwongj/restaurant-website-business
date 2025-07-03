#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const clients = ['casa-del-sol', 'bella-vista-bistro', 'the-golden-spoon', 'marios-italian-kitchen'];

clients.forEach(clientName => {
  const clientPath = path.join(__dirname, '../client-projects', clientName);
  const generatedPath = path.join(clientPath, 'generated/website');
  const clientDataPath = path.join(clientPath, 'source/client-data.json');
  
  if (!fs.existsSync(generatedPath) || !fs.existsSync(clientDataPath)) {
    console.log(`❌ ${clientName}: Missing files`);
    return;
  }

  // Load client data
  const clientData = JSON.parse(fs.readFileSync(clientDataPath, 'utf8'));
  
  // Fix HTML files
  ['index.html', 'menu.html'].forEach(filename => {
    const filePath = path.join(generatedPath, filename);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      let replacements = 0;
      
      // Replace all placeholders
      Object.keys(clientData).forEach(key => {
        if (key !== '_INSTRUCTIONS' && typeof clientData[key] === 'string') {
          const placeholder = `{{${key}}}`;
          const value = clientData[key];
          const regex = new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g');
          const matches = content.match(regex);
          if (matches) {
            content = content.replace(regex, value);
            replacements += matches.length;
          }
        }
      });
      
      if (replacements > 0) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${clientName}/${filename}: Fixed ${replacements} placeholders`);
      } else {
        console.log(`✅ ${clientName}/${filename}: No placeholders to fix`);
      }
    }
  });
});

console.log('🎉 All placeholders fixed!');