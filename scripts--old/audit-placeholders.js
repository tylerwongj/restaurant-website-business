#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class PlaceholderAuditor {
  constructor() {
    this.clientProjectsPath = path.join(__dirname, '../client-projects');
    this.allPlaceholders = new Set();
    this.clientPlaceholders = {};
    this.missingData = {};
  }

  scanForPlaceholders(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const placeholders = content.match(/\{\{([A-Z_]+)\}\}/g) || [];
    return placeholders.map(p => p.replace(/[{}]/g, ''));
  }

  auditClient(clientName) {
    const clientPath = path.join(this.clientProjectsPath, clientName);
    const generatedPath = path.join(clientPath, 'generated/website');
    const dataPath = path.join(clientPath, 'source/client-data.json');
    
    if (!fs.existsSync(generatedPath) || !fs.existsSync(dataPath)) {
      console.log(`❌ ${clientName}: Missing generated website or client data`);
      return;
    }

    // Load client data
    const clientData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const dataKeys = new Set(Object.keys(clientData).filter(k => k !== '_INSTRUCTIONS'));

    // Scan HTML files for placeholders
    const htmlFiles = ['index.html', 'menu.html'].filter(file => 
      fs.existsSync(path.join(generatedPath, file))
    );

    const foundPlaceholders = new Set();
    htmlFiles.forEach(file => {
      const filePath = path.join(generatedPath, file);
      const placeholders = this.scanForPlaceholders(filePath);
      placeholders.forEach(p => {
        foundPlaceholders.add(p);
        this.allPlaceholders.add(p);
      });
    });

    // Find missing data
    const missingKeys = [...foundPlaceholders].filter(key => !dataKeys.has(key));
    
    this.clientPlaceholders[clientName] = {
      foundPlaceholders: [...foundPlaceholders],
      dataKeys: [...dataKeys],
      missingKeys: missingKeys,
      hasIssues: missingKeys.length > 0
    };

    console.log(`\n📊 ${clientName}:`);
    console.log(`   Found placeholders: ${foundPlaceholders.size}`);
    console.log(`   Data keys: ${dataKeys.size}`);
    if (missingKeys.length > 0) {
      console.log(`   ❌ Missing: ${missingKeys.join(', ')}`);
    } else {
      console.log(`   ✅ All placeholders have data`);
    }

    return { foundPlaceholders, missingKeys };
  }

  generateMissingData() {
    console.log('\n🔧 Generating missing data templates...\n');
    
    Object.keys(this.clientPlaceholders).forEach(clientName => {
      const { missingKeys } = this.clientPlaceholders[clientName];
      if (missingKeys.length === 0) return;

      console.log(`📝 ${clientName} needs:`);
      const suggestions = {};
      
      missingKeys.forEach(key => {
        suggestions[key] = this.generateDataSuggestion(key, clientName);
        console.log(`   ${key}: "${suggestions[key]}"`);
      });
      
      this.missingData[clientName] = suggestions;
    });
  }

  generateDataSuggestion(key, clientName) {
    // Generate appropriate data based on key name
    if (key.includes('APPETIZER') && key.includes('NAME')) {
      const appetizers = [
        'Mediterranean Bruschetta', 'Seafood Crostini', 'Artisan Cheese Board',
        'Stuffed Mushrooms', 'Calamari Rings', 'Spinach Artichoke Dip'
      ];
      return appetizers[Math.floor(Math.random() * appetizers.length)];
    }
    if (key.includes('APPETIZER') && key.includes('DESCRIPTION')) {
      return 'Fresh ingredients prepared with traditional techniques and modern presentation';
    }
    if (key.includes('APPETIZER') && key.includes('PRICE')) {
      return (Math.random() * 8 + 8).toFixed(2); // $8-16
    }
    
    if (key.includes('SOUP') && key.includes('NAME')) {
      return 'Seasonal Soup of the Day';
    }
    if (key.includes('SOUP') && key.includes('DESCRIPTION')) {
      return 'Chef\'s daily creation using fresh, seasonal ingredients';
    }
    if (key.includes('SOUP') && key.includes('PRICE')) {
      return (Math.random() * 4 + 8).toFixed(2); // $8-12
    }

    if (key.includes('SALAD') && key.includes('NAME')) {
      return 'House Mixed Greens';
    }
    if (key.includes('SALAD') && key.includes('DESCRIPTION')) {
      return 'Fresh seasonal greens with house-made vinaigrette';
    }
    if (key.includes('SALAD') && key.includes('PRICE')) {
      return (Math.random() * 6 + 10).toFixed(2); // $10-16
    }

    if (key.includes('MAIN') && key.includes('NAME')) {
      const mains = [
        'Grilled Salmon', 'Braised Short Ribs', 'Roasted Chicken',
        'Pan-Seared Duck', 'Herb-Crusted Lamb', 'Seafood Pasta'
      ];
      return mains[Math.floor(Math.random() * mains.length)];
    }
    if (key.includes('MAIN') && key.includes('DESCRIPTION')) {
      return 'Expertly prepared with seasonal accompaniments and signature sauces';
    }
    if (key.includes('MAIN') && key.includes('PRICE')) {
      return (Math.random() * 15 + 25).toFixed(2); // $25-40
    }

    if (key.includes('DESSERT') && key.includes('NAME')) {
      const desserts = [
        'Chocolate Lava Cake', 'Seasonal Fruit Tart', 'Crème Brûlée',
        'House-Made Gelato', 'Apple Crisp', 'Cheesecake'
      ];
      return desserts[Math.floor(Math.random() * desserts.length)];
    }
    if (key.includes('DESSERT') && key.includes('DESCRIPTION')) {
      return 'Decadent house-made dessert crafted by our pastry chef';
    }
    if (key.includes('DESSERT') && key.includes('PRICE')) {
      return (Math.random() * 4 + 8).toFixed(2); // $8-12
    }

    if (key.includes('WINE') && key.includes('NAME')) {
      return 'House Selection';
    }
    if (key.includes('WINE') && key.includes('DESCRIPTION')) {
      return 'Carefully curated wine selection by our sommelier';
    }
    if (key.includes('WINE') && key.includes('PRICE')) {
      return (Math.random() * 8 + 12).toFixed(2); // $12-20
    }

    if (key.includes('COCKTAIL') && key.includes('NAME')) {
      return 'Signature Cocktail';
    }
    if (key.includes('COCKTAIL') && key.includes('DESCRIPTION')) {
      return 'House specialty crafted with premium spirits';
    }
    if (key.includes('COCKTAIL') && key.includes('PRICE')) {
      return (Math.random() * 6 + 12).toFixed(2); // $12-18
    }

    if (key.includes('CHEF_NAME')) return 'Executive Chef';
    if (key.includes('CHEF_EXPERIENCE')) return '15';
    if (key.includes('TASTING_MENU_PRICE')) return '95.00';
    if (key.includes('WINE_PAIRING_PRICE')) return '55.00';

    // Default fallback
    return `[${key.toLowerCase().replace(/_/g, ' ')}]`;
  }

  run() {
    console.log('🔍 Auditing all client projects for placeholder completeness...\n');
    
    const clientDirs = fs.readdirSync(this.clientProjectsPath).filter(dir => 
      fs.statSync(path.join(this.clientProjectsPath, dir)).isDirectory()
    );

    clientDirs.forEach(clientName => {
      this.auditClient(clientName);
    });

    console.log(`\n📋 Summary:`);
    console.log(`   Total clients: ${clientDirs.length}`);
    console.log(`   Unique placeholders found: ${this.allPlaceholders.size}`);
    
    const clientsWithIssues = Object.values(this.clientPlaceholders).filter(c => c.hasIssues).length;
    console.log(`   Clients needing updates: ${clientsWithIssues}`);

    if (clientsWithIssues > 0) {
      this.generateMissingData();
      
      console.log('\n💾 Generated suggestions saved to audit-results.json');
      fs.writeFileSync(
        path.join(__dirname, 'audit-results.json'),
        JSON.stringify({
          summary: {
            totalClients: clientDirs.length,
            uniquePlaceholders: this.allPlaceholders.size,
            clientsWithIssues: clientsWithIssues
          },
          clientDetails: this.clientPlaceholders,
          suggestedData: this.missingData,
          allPlaceholders: [...this.allPlaceholders].sort()
        }, null, 2)
      );
    }
  }
}

const auditor = new PlaceholderAuditor();
auditor.run();