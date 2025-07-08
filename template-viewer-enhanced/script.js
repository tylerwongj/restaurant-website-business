/**
 * Enhanced Template Gallery - Auto-scanning and Quality Analysis
 */

class EnhancedTemplateGallery {
    constructor() {
        this.templates = {};
        this.filteredTemplates = [];
        this.currentView = 'grid';
        this.currentSort = 'quality';
        this.currentFilters = {
            search: '',
            category: '',
            quality: '',
            status: ''
        };
        this.portfolioSelection = new Set();
        this.portfolioMode = false;
        
        this.init();
    }
    
    async init() {
        try {
            console.log('🚀 Initializing Enhanced Template Gallery...');
            this.showLoading(true);
            await this.scanAndAnalyzeTemplates();
            console.log('✅ Templates scanned successfully');
            this.initializeEventListeners();
            console.log('✅ Event listeners initialized');
            this.applyFilters();
            console.log('✅ Filters applied');
            this.updateStats();
            console.log('✅ Stats updated');
            this.showLoading(false);
            console.log('✅ Gallery initialization complete');
        } catch (error) {
            console.error('❌ Failed to initialize gallery:', error);
            this.showError(`Failed to load templates: ${error.message}`);
        }
    }
    
    async scanAndAnalyzeTemplates() {
        console.log('🔍 Scanning template directories...');
        
        // Use predefined templates to avoid directory listing issues
        const allTemplates = this.getKnownTemplateNames('templates');
        
        console.log(`📊 Processing ${allTemplates.length} known templates`);
        
        for (const name of allTemplates) {
            try {
                const template = await this.analyzeTemplate('templates', name);
                if (template) {
                    this.templates[template.id] = template;
                }
            } catch (error) {
                console.warn(`⚠️  Could not analyze template: ${name}`, error);
            }
        }
        
        const totalFound = Object.keys(this.templates).length;
        console.log(`✅ Found ${totalFound} templates total`);
        
        if (totalFound === 0) {
            throw new Error('No templates found - check template names');
        }
        
        this.filteredTemplates = Object.values(this.templates);
    }
    
    async scanTemplateDirectory(dir) {
        const templates = {};
        
        try {
            // Use predefined template names since directory listing isn't working reliably
            console.log(`  Scanning ${dir} with known template names`);
            const templateNames = this.getKnownTemplateNames(dir);
            
            console.log(`  Found ${templateNames.length} known templates in ${dir}`);
            
            // Analyze each template
            for (const name of templateNames) {
                const template = await this.analyzeTemplate(dir, name);
                if (template) {
                    templates[template.id] = template;
                }
            }
        } catch (error) {
            console.warn(`Could not scan ${dir}:`, error);
        }
        
        return templates;
    }
    
    getKnownTemplateNames(dir) {
        // Return template names that we know exist from the directory listing
        return [
            'casual-family',
            'casual-family-modern',
            'casual-family-grid',
            'casual-family-minimalist',
            'casual-family-rustic',
            'cafe-bistro',
            'fine-dining-elegant',
            'fine-dining-contemporary',
            'fast-casual-modern',
            'artisan-bakery',
            'asian-fusion-modern',
            'pizza-parlor-modern',
            'sports-bar-grill'
        ];
    }
    
    extractTemplateNames(html) {
        // Extract directory names from server directory listing
        const matches = html.match(/href="([^"]+\/)"[^>]*>\s*([^<]+)/g) || [];
        return matches
            .map(match => {
                const nameMatch = match.match(/href="([^"]+)\/"/);
                return nameMatch ? nameMatch[1] : null;
            })
            .filter(name => name && !name.startsWith('.') && name !== 'images' && name !== 'data')
            .slice(0, 100); // Limit for performance
    }
    
    async analyzeTemplate(dir, name) {
        const path = `${dir}/${name}`;
        const id = `${dir}_${name}`;
        
        try {
            // Simplified analysis - assume files exist for now
            const files = {
                index: true,
                menu: true,
                styles: true,
                script: true
            };
            
            const category = this.categorizeTemplate(name);
            const quality = this.scoreTemplateQuality(name, files, category);
            
            return {
                id,
                name,
                path,
                directory: dir,
                category,
                status: 'complete', // Assume complete for now
                files,
                quality_score: quality,
                upwork_potential: this.getUpworkPotential(quality, category),
                features: this.detectFeatures(name, files),
                last_analyzed: new Date().toISOString()
            };
        } catch (error) {
            console.warn(`Could not analyze ${path}:`, error);
            return null;
        }
    }
    
    async checkTemplateFiles(path) {
        const files = {
            index: false,
            menu: false,
            styles: false,
            script: false
        };
        
        const checks = [
            { key: 'index', file: 'index.html' },
            { key: 'menu', file: 'menu.html' },
            { key: 'styles', file: 'styles.css' },
            { key: 'script', file: 'script.js' }
        ];
        
        // Check files sequentially to avoid overwhelming the server
        for (const { key, file } of checks) {
            try {
                const response = await fetch(`/${path}/${file}`, { 
                    method: 'HEAD',
                    cache: 'no-cache'
                });
                files[key] = response.ok;
            } catch (error) {
                files[key] = false;
            }
        }
        
        return files;
    }
    
    categorizeTemplate(name) {
        const nameLower = name.toLowerCase();
        
        const categories = {
            'fine-dining': ['fine', 'elegant', 'luxury', 'premium', 'upscale', 'sophisticated'],
            'casual-dining': ['casual', 'family', 'cozy', 'home', 'comfort'],
            'fast-casual': ['fast', 'quick', 'modern', 'fresh', 'clean', 'healthy'],
            'cafe-bistro': ['cafe', 'bistro', 'coffee', 'brunch', 'breakfast'],
            'pizza-italian': ['pizza', 'italian', 'pasta', 'trattoria'],
            'asian-cuisine': ['asian', 'sushi', 'japanese', 'chinese', 'thai', 'korean', 'ramen'],
            'mexican': ['mexican', 'taco', 'cantina', 'latin'],
            'seafood': ['seafood', 'coastal', 'maritime', 'ocean', 'fish'],
            'steakhouse-bbq': ['steakhouse', 'steak', 'bbq', 'grill', 'smokehouse'],
            'sports-bar': ['sports', 'bar', 'pub', 'tavern', 'grill'],
            'bakery-dessert': ['bakery', 'dessert', 'pastry', 'cake'],
            'farm-to-table': ['farm', 'organic', 'local', 'sustainable', 'garden']
        };
        
        for (const [category, keywords] of Object.entries(categories)) {
            if (keywords.some(keyword => nameLower.includes(keyword))) {
                return category;
            }
        }
        
        return 'other';
    }
    
    scoreTemplateQuality(name, files, category) {
        let score = 0;
        
        // File completeness (40% of score)
        if (files.index) score += 3;
        if (files.styles) score += 2;
        if (files.menu) score += 1.5;
        if (files.script) score += 1;
        
        // Name quality indicators (30% of score)
        const nameLower = name.toLowerCase();
        const qualityKeywords = {
            'modern': 1.5,
            'elegant': 1.5,
            'luxury': 1,
            'premium': 1,
            'clean': 0.5,
            'minimal': 0.5,
            'professional': 0.5,
            'contemporary': 1,
            'sophisticated': 1
        };
        
        for (const [keyword, points] of Object.entries(qualityKeywords)) {
            if (nameLower.includes(keyword)) {
                score += points;
            }
        }
        
        // Category market appeal (20% of score)
        const highDemandCategories = ['casual-dining', 'fast-casual', 'fine-dining', 'cafe-bistro'];
        if (highDemandCategories.includes(category)) {
            score += 1;
        }
        
        // Penalize incomplete/test templates (10% of score)
        const negativeKeywords = ['test', 'copy', 'draft', 'template', 'example', 'demo'];
        if (negativeKeywords.some(keyword => nameLower.includes(keyword))) {
            score -= 2;
        }
        
        // Version indicators (bonus points)
        if (nameLower.match(/v[1-9]/)) {
            score += 0.5;
        }
        
        return Math.max(0, Math.min(10, score));
    }
    
    getUpworkPotential(quality, category) {
        if (quality >= 8) return 'high';
        if (quality >= 6) return 'medium';
        return 'low';
    }
    
    detectFeatures(name, files) {
        const features = [];
        const nameLower = name.toLowerCase();
        
        // Standard features for complete templates
        if (files.index && files.styles) {
            features.push('responsive-design', 'navigation-menu');
        }
        
        if (files.menu) {
            features.push('menu-section');
        }
        
        if (files.script) {
            features.push('interactive-elements');
        }
        
        // Feature detection from name
        const featureKeywords = {
            'gallery': 'image-gallery',
            'booking': 'online-booking',
            'reservation': 'reservation-system',
            'social': 'social-media',
            'contact': 'contact-form',
            'modern': 'modern-design',
            'mobile': 'mobile-optimized'
        };
        
        for (const [keyword, feature] of Object.entries(featureKeywords)) {
            if (nameLower.includes(keyword)) {
                features.push(feature);
            }
        }
        
        return features;
    }
    
    initializeEventListeners() {
        // Search
        const searchInput = document.getElementById('search-input');
        const clearSearch = document.getElementById('clear-search');
        
        searchInput.addEventListener('input', (e) => {
            this.currentFilters.search = e.target.value.toLowerCase();
            this.applyFilters();
        });
        
        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            this.currentFilters.search = '';
            this.applyFilters();
        });
        
        // Filters
        document.getElementById('category-filter').addEventListener('change', (e) => {
            this.currentFilters.category = e.target.value;
            this.applyFilters();
        });
        
        document.getElementById('quality-filter').addEventListener('change', (e) => {
            this.currentFilters.quality = e.target.value;
            this.applyFilters();
        });
        
        document.getElementById('status-filter').addEventListener('change', (e) => {
            this.currentFilters.status = e.target.value;
            this.applyFilters();
        });
        
        document.getElementById('sort-filter').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.applyFilters();
        });
        
        // View controls
        document.getElementById('grid-view').addEventListener('click', () => {
            this.setView('grid');
        });
        
        document.getElementById('list-view').addEventListener('click', () => {
            this.setView('list');
        });
        
        document.getElementById('portfolio-mode').addEventListener('click', () => {
            this.togglePortfolioMode();
        });
    }
    
    applyFilters() {
        let filtered = Object.values(this.templates);
        
        // Search filter
        if (this.currentFilters.search) {
            filtered = filtered.filter(template => 
                template.name.toLowerCase().includes(this.currentFilters.search) ||
                template.category.toLowerCase().includes(this.currentFilters.search)
            );
        }
        
        // Category filter
        if (this.currentFilters.category) {
            filtered = filtered.filter(template => template.category === this.currentFilters.category);
        }
        
        // Quality filter
        if (this.currentFilters.quality) {
            const minQuality = {
                'high': 8,
                'good': 6,
                'decent': 4
            };
            filtered = filtered.filter(template => template.quality_score >= minQuality[this.currentFilters.quality]);
        }
        
        // Status filter
        if (this.currentFilters.status) {
            filtered = filtered.filter(template => template.status === this.currentFilters.status);
        }
        
        // Sort
        filtered.sort((a, b) => {
            switch (this.currentSort) {
                case 'quality':
                    return b.quality_score - a.quality_score;
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'category':
                    return a.category.localeCompare(b.category);
                default:
                    return b.quality_score - a.quality_score;
            }
        });
        
        this.filteredTemplates = filtered;
        this.renderTemplates();
        this.updateResultsCount();
    }
    
    renderTemplates() {
        const container = document.getElementById('templates-container');
        const noResults = document.getElementById('no-results');
        
        if (this.filteredTemplates.length === 0) {
            container.style.display = 'none';
            noResults.style.display = 'block';
            return;
        }
        
        container.style.display = 'grid';
        noResults.style.display = 'none';
        
        container.innerHTML = this.filteredTemplates.map(template => 
            this.createTemplateCard(template)
        ).join('');
    }
    
    createTemplateCard(template) {
        const qualityStars = '★'.repeat(Math.round(template.quality_score)) + 
                           '☆'.repeat(5 - Math.round(template.quality_score));
        
        const isSelected = this.portfolioSelection.has(template.id);
        const thumbnailUrl = `thumbnails/desktop/${template.id}.jpg`;
        
        return `
            <div class="template-card ${this.currentView} ${isSelected ? 'selected' : ''}" 
                 onclick="previewTemplate('${template.id}')">
                <div class="thumbnail-container">
                    <img src="${thumbnailUrl}" 
                         alt="${template.name} thumbnail" 
                         class="template-thumbnail"
                         loading="lazy"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIFRodW1ibmFpbDwvdGV4dD48L3N2Zz4='; this.onerror=null;">
                    <div class="thumbnail-overlay">
                        <div class="quality-badge-overlay">
                            <span class="quality-score">${template.quality_score.toFixed(1)}</span>
                            <div class="quality-stars">${qualityStars}</div>
                        </div>
                        ${template.status === 'complete' ? '<div class="status-badge complete">✓</div>' : '<div class="status-badge incomplete">⚠</div>'}
                    </div>
                </div>
                
                <div class="card-header">
                    <div class="template-info">
                        <h3 class="template-name">${template.name}</h3>
                        <span class="template-category">${template.category.replace('-', ' ')}</span>
                    </div>
                </div>
                
                <div class="card-body">
                    <div class="template-stats">
                        <span class="status-badge ${template.status}">${template.status}</span>
                        <span class="upwork-badge ${template.upwork_potential}">${template.upwork_potential} potential</span>
                    </div>
                    
                    <div class="file-indicators">
                        <span class="file-indicator ${template.files.index ? 'available' : 'missing'}">
                            <i class="fas fa-file-code"></i> HTML
                        </span>
                        <span class="file-indicator ${template.files.styles ? 'available' : 'missing'}">
                            <i class="fas fa-palette"></i> CSS
                        </span>
                        <span class="file-indicator ${template.files.script ? 'available' : 'missing'}">
                            <i class="fas fa-code"></i> JS
                        </span>
                        <span class="file-indicator ${template.files.menu ? 'available' : 'missing'}">
                            <i class="fas fa-utensils"></i> Menu
                        </span>
                    </div>
                    
                    <div class="template-features">
                        ${template.features.slice(0, 3).map(feature => 
                            `<span class="feature-tag">${feature.replace('-', ' ')}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="card-actions">
                    <button class="btn btn-primary" onclick="event.stopPropagation(); openTemplate('${template.id}')">
                        <i class="fas fa-external-link-alt"></i> Open
                    </button>
                    <button class="btn btn-secondary" onclick="event.stopPropagation(); previewTemplate('${template.id}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                    ${this.portfolioMode ? `
                        <button class="btn ${isSelected ? 'btn-warning' : 'btn-success'}" 
                                onclick="event.stopPropagation(); togglePortfolioSelection('${template.id}')">
                            <i class="fas ${isSelected ? 'fa-minus' : 'fa-plus'}"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    setView(view) {
        this.currentView = view;
        
        document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${view}-view`).classList.add('active');
        
        const container = document.getElementById('templates-container');
        container.className = `templates-container ${view}-view`;
        
        this.renderTemplates();
    }
    
    updateStats() {
        const total = Object.keys(this.templates).length;
        const complete = Object.values(this.templates).filter(t => t.status === 'complete').length;
        const highQuality = Object.values(this.templates).filter(t => t.quality_score >= 8).length;
        
        document.getElementById('total-templates').textContent = total;
        document.getElementById('complete-templates').textContent = complete;
        document.getElementById('high-quality').textContent = highQuality;
    }
    
    updateResultsCount() {
        // Could add a results counter here
    }
    
    togglePortfolioMode() {
        this.portfolioMode = !this.portfolioMode;
        
        const portfolioBtn = document.getElementById('portfolio-mode');
        const portfolioPanel = document.getElementById('portfolio-panel');
        
        if (this.portfolioMode) {
            portfolioBtn.classList.add('active');
            portfolioPanel.classList.add('active');
        } else {
            portfolioBtn.classList.remove('active');
            portfolioPanel.classList.remove('active');
        }
        
        this.renderTemplates();
        this.updatePortfolioPanel();
    }
    
    updatePortfolioPanel() {
        const portfolioList = document.getElementById('portfolio-list');
        const portfolioCount = document.querySelector('.portfolio-count');
        
        portfolioCount.textContent = `${this.portfolioSelection.size} selected`;
        
        if (this.portfolioSelection.size === 0) {
            portfolioList.innerHTML = '<p class="empty-portfolio">No templates selected</p>';
            return;
        }
        
        const selectedTemplates = Array.from(this.portfolioSelection)
            .map(id => this.templates[id])
            .filter(Boolean);
        
        portfolioList.innerHTML = selectedTemplates.map(template => `
            <div class="portfolio-item">
                <span class="portfolio-name">${template.name}</span>
                <span class="portfolio-quality">${template.quality_score.toFixed(1)}★</span>
                <button onclick="togglePortfolioSelection('${template.id}')" class="remove-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }
    
    showLoading(show) {
        const loadingState = document.getElementById('loading-state');
        const container = document.getElementById('templates-container');
        
        if (show) {
            loadingState.style.display = 'flex';
            container.style.display = 'none';
        } else {
            loadingState.style.display = 'none';
            container.style.display = 'grid';
        }
    }
    
    showError(message) {
        const container = document.getElementById('templates-container');
        container.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error Loading Templates</h3>
                <p>${message}</p>
            </div>
        `;
    }
}

// Global functions for HTML onclick handlers
let templateGallery;

function previewTemplate(templateId) {
    const template = templateGallery.templates[templateId];
    if (!template) return;
    
    const modal = document.getElementById('preview-modal');
    const iframe = document.getElementById('template-iframe');
    
    // Update modal content
    document.getElementById('modal-title').textContent = template.name;
    
    const details = `
        <p><strong>Category:</strong> ${template.category.replace('-', ' ')}</p>
        <p><strong>Status:</strong> ${template.status}</p>
        <p><strong>Directory:</strong> ${template.directory}</p>
        <p><strong>Features:</strong> ${template.features.join(', ')}</p>
    `;
    document.getElementById('modal-details').innerHTML = details;
    
    const qualityStars = '★'.repeat(Math.round(template.quality_score)) + 
                        '☆'.repeat(5 - Math.round(template.quality_score));
    const quality = `
        <div class="quality-display">
            <span class="score">${template.quality_score.toFixed(1)}/10</span>
            <div class="stars">${qualityStars}</div>
            <span class="potential ${template.upwork_potential}">${template.upwork_potential} Upwork potential</span>
        </div>
    `;
    document.getElementById('modal-quality').innerHTML = quality;
    
    // Load template in iframe
    iframe.src = `/${template.path}/index.html`;
    
    // Store current template
    templateGallery.currentPreviewTemplate = template;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openTemplate(templateId) {
    const template = templateGallery.templates[templateId];
    if (template) {
        window.open(`/${template.path}/index.html`, '_blank');
    }
}

function openCurrentTemplate() {
    if (templateGallery.currentPreviewTemplate) {
        window.open(`/${templateGallery.currentPreviewTemplate.path}/index.html`, '_blank');
    }
}

function closeModal() {
    const modal = document.getElementById('preview-modal');
    const iframe = document.getElementById('template-iframe');
    
    modal.classList.remove('active');
    iframe.src = 'about:blank';
    document.body.style.overflow = '';
}

function addToPortfolio() {
    if (templateGallery.currentPreviewTemplate) {
        templateGallery.portfolioSelection.add(templateGallery.currentPreviewTemplate.id);
        templateGallery.updatePortfolioPanel();
        
        if (!templateGallery.portfolioMode) {
            templateGallery.togglePortfolioMode();
        }
    }
}

function togglePortfolioSelection(templateId) {
    if (templateGallery.portfolioSelection.has(templateId)) {
        templateGallery.portfolioSelection.delete(templateId);
    } else {
        templateGallery.portfolioSelection.add(templateId);
    }
    
    templateGallery.renderTemplates();
    templateGallery.updatePortfolioPanel();
}

function clearPortfolio() {
    if (confirm('Clear all selected templates?')) {
        templateGallery.portfolioSelection.clear();
        templateGallery.renderTemplates();
        templateGallery.updatePortfolioPanel();
    }
}

function exportPortfolio() {
    const selectedTemplates = Array.from(templateGallery.portfolioSelection)
        .map(id => templateGallery.templates[id])
        .filter(Boolean);
    
    if (selectedTemplates.length === 0) {
        alert('No templates selected for portfolio');
        return;
    }
    
    const portfolioData = {
        export_date: new Date().toISOString(),
        total_selected: selectedTemplates.length,
        templates: selectedTemplates.map(template => ({
            name: template.name,
            path: template.path,
            category: template.category,
            quality_score: template.quality_score,
            upwork_potential: template.upwork_potential,
            features: template.features,
            url: `${window.location.origin}/${template.path}/index.html`
        }))
    };
    
    // Download as JSON
    const blob = new Blob([JSON.stringify(portfolioData, null, 2)], {
        type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `upwork-portfolio-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    console.log('Portfolio exported:', portfolioData);
}

// Helper functions for thumbnail management

async function loadThumbnailIndex() {
    try {
        const response = await fetch('thumbnails/thumbnail-index.json');
        if (response.ok) {
            const thumbnailIndex = await response.json();
            console.log('📸 Loaded thumbnail index with', Object.keys(thumbnailIndex.thumbnails).length, 'thumbnails');
            return thumbnailIndex;
        }
    } catch (error) {
        console.log('📸 No thumbnail index found - run thumbnail generator');
    }
    return { thumbnails: {} };
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    templateGallery = new EnhancedTemplateGallery();
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('preview-modal');
    if (e.target === modal) {
        closeModal();
    }
});