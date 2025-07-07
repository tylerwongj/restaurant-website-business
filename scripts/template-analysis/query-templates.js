#!/usr/bin/env node

/**
 * Template Query & Export Tool
 * 
 * Query, filter, and export template data for various purposes.
 * Find top-rated templates, export for Upwork, generate reports.
 * 
 * Usage:
 *   node scripts/template-analysis/query-templates.js --top 10
 *   node scripts/template-analysis/query-templates.js --upwork-ready
 *   node scripts/template-analysis/query-templates.js --category casual-dining --min-rating 4
 *   node scripts/template-analysis/query-templates.js --stats
 */

const fs = require('fs');
const path = require('path');

class TemplateQuery {
  constructor() {
    this.databasePath = path.join(__dirname, 'data/template-database.json');
    this.database = null;
    this.args = this.parseArguments();
  }

  // Parse command line arguments
  parseArguments() {
    const args = process.argv.slice(2);
    const parsed = {
      top: null,
      category: null,
      minRating: null,
      upworkReady: false,
      completeOnly: false,
      stats: false,
      export: null,
      help: false
    };

    for (let i = 0; i < args.length; i++) {
      switch (args[i]) {
        case '--top':
          parsed.top = parseInt(args[++i]) || 10;
          break;
        case '--category':
          parsed.category = args[++i];
          break;
        case '--min-rating':
          parsed.minRating = parseInt(args[++i]) || 0;
          break;
        case '--upwork-ready':
          parsed.upworkReady = true;
          break;
        case '--complete-only':
          parsed.completeOnly = true;
          break;
        case '--stats':
          parsed.stats = true;
          break;
        case '--export':
          parsed.export = args[++i] || 'results.json';
          break;
        case '--help':
          parsed.help = true;
          break;
      }
    }

    return parsed;
  }

  // Load database
  loadDatabase() {
    try {
      if (!fs.existsSync(this.databasePath)) {
        console.log('❌ Template database not found. Run scan-templates.js first.');
        return false;
      }

      const data = fs.readFileSync(this.databasePath, 'utf8');
      this.database = JSON.parse(data);
      return true;
    } catch (error) {
      console.error(`❌ Error loading database: ${error.message}`);
      return false;
    }
  }

  // Apply filters to templates
  filterTemplates() {
    let templates = Object.entries(this.database.templates);

    // Filter by category
    if (this.args.category) {
      templates = templates.filter(([name, template]) => 
        template.category === this.args.category
      );
    }

    // Filter by completion status
    if (this.args.completeOnly) {
      templates = templates.filter(([name, template]) => 
        template.status === 'complete'
      );
    }

    // Filter by minimum rating
    if (this.args.minRating) {
      templates = templates.filter(([name, template]) => 
        template.ratings.overall >= this.args.minRating
      );
    }

    // Filter by Upwork readiness
    if (this.args.upworkReady) {
      templates = templates.filter(([name, template]) => 
        template.upwork_ready === true
      );
    }

    return templates;
  }

  // Sort templates by various criteria
  sortTemplates(templates) {
    return templates.sort(([nameA, templateA], [nameB, templateB]) => {
      // Primary sort: Overall rating (highest first)
      if (templateB.ratings.overall !== templateA.ratings.overall) {
        return templateB.ratings.overall - templateA.ratings.overall;
      }
      
      // Secondary sort: Upwork potential
      if (templateB.ratings.upwork_potential !== templateA.ratings.upwork_potential) {
        return templateB.ratings.upwork_potential - templateA.ratings.upwork_potential;
      }
      
      // Tertiary sort: Technical + Visual average
      const avgA = (templateA.ratings.technical + templateA.ratings.visual) / 2;
      const avgB = (templateB.ratings.technical + templateB.ratings.visual) / 2;
      if (avgB !== avgA) {
        return avgB - avgA;
      }
      
      // Final sort: Complete templates first, then alphabetical
      if (templateA.status !== templateB.status) {
        return templateA.status === 'complete' ? -1 : 1;
      }
      
      return nameA.localeCompare(nameB);
    });
  }

  // Display template list
  displayTemplateList(templates, title = 'Templates') {
    console.log(`\n📋 ${title.toUpperCase()}`);
    console.log('═'.repeat(100));
    
    if (templates.length === 0) {
      console.log('   No templates match your criteria.');
      return;
    }

    console.log('RANK | TEMPLATE NAME'.padEnd(35) + ' | CAT'.padEnd(15) + ' | RATING | U-POT | TECH | VIS | STATUS | UPWORK');
    console.log('─'.repeat(100));

    templates.forEach(([name, template], index) => {
      const rank = `${index + 1}.`.padEnd(5);
      const templateName = name.length > 30 ? name.substring(0, 27) + '...' : name;
      const category = template.category.length > 12 ? template.category.substring(0, 9) + '...' : template.category;
      const overall = this.formatRatingShort(template.ratings.overall);
      const upwork = this.formatRatingShort(template.ratings.upwork_potential);
      const technical = this.formatRatingShort(template.ratings.technical);
      const visual = this.formatRatingShort(template.ratings.visual);
      const status = template.status === 'complete' ? '✅' : '⚠️';
      const upworkReady = template.upwork_ready === true ? '🎯' : template.upwork_ready === false ? '❌' : '❓';

      console.log(
        rank + 
        templateName.padEnd(30) + ' | ' +
        category.padEnd(12) + ' | ' +
        overall.padEnd(6) + ' | ' +
        upwork.padEnd(5) + ' | ' +
        technical.padEnd(4) + ' | ' +
        visual.padEnd(3) + ' | ' +
        status.padEnd(6) + ' | ' +
        upworkReady
      );
    });

    console.log('─'.repeat(100));
    console.log(`Total: ${templates.length} templates`);
  }

  // Format rating for short display
  formatRatingShort(rating) {
    if (rating === 0) return '-';
    return '★'.repeat(rating);
  }

  // Display detailed template info
  displayTemplateDetails(templates) {
    templates.forEach(([name, template], index) => {
      console.log(`\n${index + 1}. 🎯 ${name.toUpperCase()}`);
      console.log('─'.repeat(60));
      console.log(`📁 Path: ${template.path}`);
      console.log(`📂 Category: ${template.category}`);
      console.log(`📊 Status: ${template.status}`);
      
      console.log('\n⭐ Ratings:');
      console.log(`   Overall: ${this.formatRatingLong(template.ratings.overall)}`);
      console.log(`   Technical: ${this.formatRatingLong(template.ratings.technical)}`);
      console.log(`   Visual: ${this.formatRatingLong(template.ratings.visual)}`);
      console.log(`   Upwork Potential: ${this.formatRatingLong(template.ratings.upwork_potential)}`);
      
      if (template.upwork_ready !== null) {
        console.log(`\n🎯 Upwork Ready: ${template.upwork_ready ? 'Yes' : 'No'}`);
        if (template.upwork_ready && template.upwork_priority !== 'unknown') {
          console.log(`📊 Priority: ${template.upwork_priority}`);
        }
      }
      
      if (template.tags.length > 0) {
        console.log(`\n🏷️  Tags: ${template.tags.join(', ')}`);
      }
      
      if (template.notes) {
        console.log(`\n📝 Notes: ${template.notes}`);
      }
    });
  }

  // Format rating for long display
  formatRatingLong(rating) {
    if (rating === 0) return 'Not rated';
    return '★'.repeat(rating) + '☆'.repeat(5 - rating) + ` (${rating}/5)`;
  }

  // Generate statistics
  generateStats() {
    const templates = Object.values(this.database.templates);
    const total = templates.length;
    const reviewed = templates.filter(t => t.reviewed).length;
    const upworkReady = templates.filter(t => t.upwork_ready === true).length;
    const complete = templates.filter(t => t.status === 'complete').length;

    // Rating distribution
    const ratingDist = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    templates.forEach(t => {
      ratingDist[t.ratings.overall]++;
    });

    // Category stats
    const categoryStats = {};
    templates.forEach(t => {
      if (!categoryStats[t.category]) {
        categoryStats[t.category] = { total: 0, reviewed: 0, upwork_ready: 0 };
      }
      categoryStats[t.category].total++;
      if (t.reviewed) categoryStats[t.category].reviewed++;
      if (t.upwork_ready === true) categoryStats[t.category].upwork_ready++;
    });

    // Top categories by count
    const topCategories = Object.entries(categoryStats)
      .sort(([,a], [,b]) => b.total - a.total)
      .slice(0, 10);

    return {
      overview: {
        total,
        reviewed,
        upworkReady,
        complete,
        reviewProgress: Math.round((reviewed / total) * 100)
      },
      ratings: ratingDist,
      categories: categoryStats,
      topCategories
    };
  }

  // Display statistics
  displayStats() {
    const stats = this.generateStats();
    
    console.log('\n📊 TEMPLATE DATABASE STATISTICS');
    console.log('═'.repeat(60));
    
    console.log('\n📋 OVERVIEW:');
    console.log(`   Total templates: ${stats.overview.total}`);
    console.log(`   Reviewed: ${stats.overview.reviewed} (${stats.overview.reviewProgress}%)`);
    console.log(`   Complete: ${stats.overview.complete}`);
    console.log(`   Upwork Ready: ${stats.overview.upworkReady}`);
    
    console.log('\n⭐ RATING DISTRIBUTION:');
    Object.entries(stats.ratings).forEach(([rating, count]) => {
      const stars = rating === '0' ? 'Unrated' : '★'.repeat(parseInt(rating));
      const percent = Math.round((count / stats.overview.total) * 100);
      console.log(`   ${stars}: ${count} (${percent}%)`);
    });
    
    console.log('\n📂 TOP CATEGORIES:');
    stats.topCategories.forEach(([category, data]) => {
      const reviewPercent = data.total > 0 ? Math.round((data.reviewed / data.total) * 100) : 0;
      console.log(`   ${category}: ${data.total} total, ${data.reviewed} reviewed (${reviewPercent}%), ${data.upwork_ready} upwork-ready`);
    });
  }

  // Export results
  exportResults(templates, filename) {
    const exportData = {
      generated: new Date().toISOString(),
      filters: this.args,
      total_results: templates.length,
      templates: templates.map(([name, template]) => ({
        name,
        path: template.path,
        category: template.category,
        status: template.status,
        ratings: template.ratings,
        upwork_ready: template.upwork_ready,
        upwork_priority: template.upwork_priority,
        tags: template.tags,
        notes: template.notes
      }))
    };

    try {
      const exportPath = path.join(__dirname, 'data', filename);
      fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2));
      console.log(`\n💾 Results exported to: ${exportPath}`);
      return true;
    } catch (error) {
      console.error(`❌ Export failed: ${error.message}`);
      return false;
    }
  }

  // Display help
  displayHelp() {
    console.log(`
🔍 Template Query Tool

USAGE:
  node query-templates.js [options]

OPTIONS:
  --top [number]        Show top N templates (default: 10)
  --category [name]     Filter by category
  --min-rating [1-5]    Minimum overall rating
  --upwork-ready        Only show Upwork-ready templates
  --complete-only       Only show complete templates
  --stats               Show database statistics
  --export [filename]   Export results to JSON file
  --help               Show this help

EXAMPLES:
  node query-templates.js --top 5
  node query-templates.js --category casual-dining --min-rating 4
  node query-templates.js --upwork-ready --export upwork-templates.json
  node query-templates.js --stats

CATEGORIES:
  casual-dining, fine-dining, fast-casual, pizza-italian,
  asian-cuisine, mexican, seafood, steakhouse-bbq,
  cafe-bistro, bakery-dessert, sports-bar, farm-to-table, other
`);
  }

  // Main execution
  run() {
    if (this.args.help) {
      this.displayHelp();
      return;
    }

    console.log('🔍 Template Query Tool v1.0.0\n');
    
    if (!this.loadDatabase()) {
      return;
    }

    if (this.args.stats) {
      this.displayStats();
      return;
    }

    // Get and filter templates
    let templates = this.filterTemplates();
    templates = this.sortTemplates(templates);

    // Apply top limit
    if (this.args.top) {
      templates = templates.slice(0, this.args.top);
    }

    // Display results
    const title = this.args.upworkReady ? 'Upwork-Ready Templates' : 
                  this.args.top ? `Top ${this.args.top} Templates` : 
                  'Query Results';
    
    this.displayTemplateList(templates, title);
    
    // Show details for top 5 if showing top templates
    if (this.args.top && templates.length > 0 && this.args.top <= 10) {
      console.log('\n📋 DETAILED INFO (Top 5):');
      this.displayTemplateDetails(templates.slice(0, 5));
    }

    // Export if requested
    if (this.args.export) {
      this.exportResults(templates, this.args.export);
    }

    // Show filter summary
    console.log('\n🔍 Applied filters:', Object.entries(this.args)
      .filter(([k, v]) => v && k !== 'help' && k !== 'export')
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ') || 'None');
  }
}

// Run if called directly
if (require.main === module) {
  const query = new TemplateQuery();
  query.run();
}

module.exports = TemplateQuery;