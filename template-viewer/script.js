/**
 * Restaurant Template Gallery - Main JavaScript
 * Handles template loading, filtering, search, and preview functionality
 */

class TemplateGallery {
    constructor() {
        this.templates = {};
        this.metadata = {};
        this.categories = {};
        this.filteredTemplates = [];
        this.currentView = 'grid'; // 'grid' or 'list'
        this.currentSort = 'name';
        this.currentFilters = {
            search: '',
            category: '',
            status: '',
            rating: '',
            feature: ''
        };
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadTemplateDatabase();
            this.initializeEventListeners();
            this.renderTemplates();
            this.updateStatistics();
            this.populateFooterCategories();
        } catch (error) {
            console.error('Failed to initialize template gallery:', error);
            this.showError('Failed to load template database. Please check the file path.');
        }
    }
    
    async loadTemplateDatabase() {
        try {
            // Try to load from the template analysis directory first
            let response = await fetch('../scripts/template-analysis/data/template-database.json');
            
            // If that fails, try the local data directory
            if (!response.ok) {
                console.log('Primary database location failed, trying local copy...');
                response = await fetch('data/template-database.json');
            }
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (!data.templates || !data.metadata || !data.categories) {
                throw new Error('Invalid database format');
            }
            
            this.templates = data.templates;
            this.metadata = data.metadata;
            this.categories = data.categories;
            this.filteredTemplates = Object.values(this.templates);
            
            console.log(`Loaded ${Object.keys(this.templates).length} templates from database`);
            
        } catch (error) {
            console.error('Database loading error:', error);
            // Fallback: show error and provide example data structure
            this.showDatabaseError();
            throw error;
        }
    }
    
    initializeEventListeners() {
        // Search functionality
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
        
        // Filter controls
        const filters = ['category-filter', 'status-filter', 'rating-filter', 'feature-filter'];
        filters.forEach(filterId => {
            const element = document.getElementById(filterId);
            element.addEventListener('change', (e) => {
                const filterKey = filterId.replace('-filter', '');
                this.currentFilters[filterKey] = e.target.value;
                this.applyFilters();
            });
        });
        
        // Reset filters button
        document.getElementById('reset-filters').addEventListener('click', () => {
            this.resetFilters();
        });
        
        document.getElementById('clear-all-filters').addEventListener('click', () => {
            this.resetFilters();
        });
        
        // Sort functionality
        document.getElementById('sort-by').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.applySorting();
            this.renderTemplates();
        });
        
        // View toggle
        document.getElementById('grid-view').addEventListener('click', () => {
            this.setView('grid');
        });
        
        document.getElementById('list-view').addEventListener('click', () => {
            this.setView('list');
        });
        
        // Modal controls
        document.getElementById('close-modal').addEventListener('click', () => {
            this.closeModal();
        });
        
        document.getElementById('open-template').addEventListener('click', () => {
            this.openCurrentTemplate();
        });
        
        // Close modal when clicking outside
        document.getElementById('preview-modal').addEventListener('click', (e) => {
            if (e.target.id === 'preview-modal') {
                this.closeModal();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
    
    applyFilters() {
        const { search, category, status, rating, feature } = this.currentFilters;
        
        this.filteredTemplates = Object.values(this.templates).filter(template => {
            // Search filter
            if (search && !this.matchesSearch(template, search)) {
                return false;
            }
            
            // Category filter
            if (category && template.category !== category) {
                return false;
            }
            
            // Status filter
            if (status && template.status !== status) {
                return false;
            }
            
            // Rating filter
            if (rating && template.ratings.overall < parseInt(rating)) {
                return false;
            }
            
            // Feature filter
            if (feature && !this.hasFeature(template, feature)) {
                return false;
            }
            
            return true;
        });
        
        this.applySorting();
        this.renderTemplates();
        this.updateResultsCount();
    }
    
    matchesSearch(template, searchTerm) {
        const searchFields = [
            template.name,
            template.category,
            template.path,
            Object.keys(template.features).join(' '),
            template.tags.join(' '),
            template.notes
        ].join(' ').toLowerCase();
        
        return searchFields.includes(searchTerm);
    }
    
    hasFeature(template, featureKey) {
        switch (featureKey) {
            case 'mobile-responsive':
                return template.features.estimated_mobile_responsive;
            case 'has-menu':
                return template.features.has_menu_section;
            case 'has-contact-form':
                return template.features.has_contact_form;
            case 'css-variables':
                return template.features.uses_css_variables;
            case 'upwork-ready':
                return template.upwork_ready === true;
            default:
                return false;
        }
    }
    
    applySorting() {
        this.filteredTemplates.sort((a, b) => {
            switch (this.currentSort) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'category':
                    return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
                case 'rating':
                    return (b.ratings.overall || 0) - (a.ratings.overall || 0) || a.name.localeCompare(b.name);
                case 'status':
                    return (a.status === 'complete' ? 0 : 1) - (b.status === 'complete' ? 0 : 1) || a.name.localeCompare(b.name);
                case 'date':
                    return new Date(b.metadata.last_modified) - new Date(a.metadata.last_modified);
                case 'size':
                    return (b.metadata.file_size || 0) - (a.metadata.file_size || 0);
                default:
                    return 0;
            }
        });
    }
    
    renderTemplates() {
        const grid = document.getElementById('templates-grid');
        const loading = document.getElementById('loading');
        const emptyState = document.getElementById('empty-state');
        
        // Hide loading
        loading.style.display = 'none';
        
        // Show/hide empty state
        if (this.filteredTemplates.length === 0) {
            grid.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        } else {
            grid.style.display = 'grid';
            emptyState.style.display = 'none';
        }
        
        // Apply view class
        grid.className = `templates-grid ${this.currentView}-view`;
        
        // Render template cards
        grid.innerHTML = this.filteredTemplates.map(template => 
            this.createTemplateCard(template)
        ).join('');
        
        // Add click listeners to cards
        grid.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.template-actions')) {
                    const templateName = card.dataset.template;
                    this.previewTemplate(templateName);
                }
            });
        });
        
        // Add animation
        grid.classList.add('fade-in');
    }
    
    createTemplateCard(template) {
        const rating = this.formatRating(template.ratings.overall);
        const features = this.getTemplateFeatures(template);
        const files = this.getTemplateFiles(template);
        const categoryDisplay = this.formatCategoryName(template.category);
        
        return `
            <div class="template-card ${this.currentView}-view" data-template="${template.name}">
                <div class="template-status ${template.status}">${template.status}</div>
                
                <div class="template-header">
                    <div>
                        <h3 class="template-title">${this.formatTemplateName(template.name)}</h3>
                        <span class="template-category">${categoryDisplay}</span>
                    </div>
                </div>
                
                <div class="template-path">${template.path}</div>
                
                <div class="template-rating">
                    <div class="stars">
                        ${this.renderStars(template.ratings.overall)}
                    </div>
                    <span class="rating-text">${rating}</span>
                </div>
                
                <div class="template-files">
                    <div class="files-list">
                        ${files.map(file => `
                            <div class="file-indicator ${file.present ? 'present' : 'missing'}">
                                <i class="fas ${file.present ? 'fa-check' : 'fa-times'}"></i>
                                ${file.name}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="template-features">
                    <h4>Features</h4>
                    <div class="feature-tags">
                        ${features.map(feature => `
                            <span class="feature-tag ${feature.active ? 'active' : ''}">${feature.name}</span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="template-actions">
                    <button class="btn btn-primary" onclick="event.stopPropagation(); window.open('/${template.path}/index.html', '_blank')">
                        <i class="fas fa-external-link-alt"></i> Open
                    </button>
                    <button class="btn btn-secondary" onclick="event.stopPropagation(); templateGallery.previewTemplate('${template.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            </div>
        `;
    }
    
    getTemplateFeatures(template) {
        return [
            { name: 'Mobile Responsive', active: template.features.estimated_mobile_responsive },
            { name: 'Navigation', active: template.features.has_navigation },
            { name: 'Contact Form', active: template.features.has_contact_form },
            { name: 'Menu Section', active: template.features.has_menu_section },
            { name: 'CSS Variables', active: template.features.uses_css_variables },
            { name: 'Upwork Ready', active: template.upwork_ready === true }
        ];
    }
    
    getTemplateFiles(template) {
        return [
            { name: 'HTML', present: template.files.index_html },
            { name: 'CSS', present: template.files.styles_css },
            { name: 'JS', present: template.files.script_js },
            { name: 'Menu', present: template.files.menu_html }
        ];
    }
    
    renderStars(rating) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const filled = i <= (rating || 0);
            stars.push(`<i class="star fas fa-star ${filled ? 'filled' : ''}"></i>`);
        }
        return stars.join('');
    }
    
    formatTemplateName(name) {
        return name.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
    
    formatCategoryName(category) {
        return category.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
    
    formatRating(rating) {
        if (!rating || rating === 0) return 'Not rated';
        return `${rating}/5 stars`;
    }
    
    previewTemplate(templateName) {
        const template = this.templates[templateName];
        if (!template) return;
        
        const modal = document.getElementById('preview-modal');
        const iframe = document.getElementById('template-iframe');
        
        // Update modal content
        document.getElementById('modal-title').textContent = this.formatTemplateName(template.name);
        document.getElementById('modal-category').textContent = this.formatCategoryName(template.category);
        document.getElementById('modal-status').textContent = template.status;
        document.getElementById('modal-rating').textContent = this.formatRating(template.ratings.overall);
        document.getElementById('modal-path').textContent = template.path;
        
        // Files info
        const files = this.getTemplateFiles(template);
        document.getElementById('modal-files').innerHTML = files.map(file => 
            `<span class="feature-tag ${file.present ? 'active' : ''}">${file.name}</span>`
        ).join(' ');
        
        // Features info
        const features = this.getTemplateFeatures(template);
        document.getElementById('modal-features').innerHTML = features.map(feature => 
            `<span class="feature-tag ${feature.active ? 'active' : ''}">${feature.name}</span>`
        ).join(' ');
        
        // Load template in iframe
        iframe.src = `/${template.path}/index.html`;
        
        // Store current template for "Open" button
        this.currentPreviewTemplate = template;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    openCurrentTemplate() {
        if (this.currentPreviewTemplate) {
            window.open(`/${this.currentPreviewTemplate.path}/index.html`, '_blank');
        }
    }
    
    closeModal() {
        const modal = document.getElementById('preview-modal');
        const iframe = document.getElementById('template-iframe');
        
        modal.classList.remove('active');
        iframe.src = 'about:blank';
        document.body.style.overflow = 'auto';
        this.currentPreviewTemplate = null;
    }
    
    setView(view) {
        this.currentView = view;
        
        // Update button states
        document.getElementById('grid-view').classList.toggle('active', view === 'grid');
        document.getElementById('list-view').classList.toggle('active', view === 'list');
        
        // Re-render templates
        this.renderTemplates();
    }
    
    resetFilters() {
        // Reset filter inputs
        document.getElementById('search-input').value = '';
        document.getElementById('category-filter').value = '';
        document.getElementById('status-filter').value = '';
        document.getElementById('rating-filter').value = '';
        document.getElementById('feature-filter').value = '';
        
        // Reset filter state
        this.currentFilters = {
            search: '',
            category: '',
            status: '',
            rating: '',
            feature: ''
        };
        
        // Apply filters
        this.applyFilters();
    }
    
    updateStatistics() {
        if (!this.metadata) return;
        
        document.getElementById('total-templates').textContent = this.metadata.total_templates || Object.keys(this.templates).length;
        document.getElementById('complete-templates').textContent = this.metadata.complete_templates || 0;
        
        // Count rated templates
        const ratedCount = Object.values(this.templates).filter(t => t.ratings.overall > 0).length;
        document.getElementById('rated-templates').textContent = ratedCount;
        
        // Count Upwork ready templates
        const upworkCount = Object.values(this.templates).filter(t => t.upwork_ready === true).length;
        document.getElementById('upwork-ready').textContent = upworkCount;
    }
    
    updateResultsCount() {
        const resultsText = `Showing ${this.filteredTemplates.length} of ${Object.keys(this.templates).length} templates`;
        document.getElementById('results-count').textContent = resultsText;
    }
    
    populateFooterCategories() {
        const footerCategories = document.getElementById('footer-categories');
        if (!footerCategories || !this.categories) return;
        
        const categoryElements = Object.entries(this.categories).map(([key, data]) => {
            const displayName = this.formatCategoryName(key);
            return `<span class="category-tag" onclick="templateGallery.filterByCategory('${key}')">${displayName} (${data.count})</span>`;
        }).join('');
        
        footerCategories.innerHTML = categoryElements;
    }
    
    filterByCategory(category) {
        document.getElementById('category-filter').value = category;
        this.currentFilters.category = category;
        this.applyFilters();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    showError(message) {
        const grid = document.getElementById('templates-grid');
        const loading = document.getElementById('loading');
        
        loading.style.display = 'none';
        grid.innerHTML = `
            <div class="error-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                <div style="font-size: 3rem; margin-bottom: 1rem; color: var(--bg-accent);">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3>Error Loading Templates</h3>
                <p>${message}</p>
                <p style="margin-top: 1rem; font-size: 0.9rem;">
                    Make sure the template database exists at: <code>../scripts/template-analysis/data/template-database.json</code>
                </p>
            </div>
        `;
    }
    
    showDatabaseError() {
        const grid = document.getElementById('templates-grid');
        const loading = document.getElementById('loading');
        
        loading.style.display = 'none';
        grid.innerHTML = `
            <div class="database-error" style="grid-column: 1 / -1; padding: 2rem; background: var(--bg-secondary); border-radius: var(--border-radius); border: 1px solid var(--border-color);">
                <h3 style="color: var(--bg-accent); margin-bottom: 1rem;">
                    <i class="fas fa-database"></i> Template Database Not Found
                </h3>
                <p style="margin-bottom: 1rem;">The template database could not be loaded. This could be because:</p>
                <ul style="margin-left: 2rem; margin-bottom: 1.5rem; line-height: 1.6;">
                    <li>The template analysis system hasn't been run yet</li>
                    <li>The database file doesn't exist</li>
                    <li>There's a file path issue</li>
                </ul>
                <div style="background: var(--bg-primary); padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
                    <h4 style="margin-bottom: 0.5rem;">To fix this:</h4>
                    <code style="display: block; margin-bottom: 0.5rem;">cd ../scripts/template-analysis/</code>
                    <code style="display: block;">node scan-templates.js</code>
                </div>
                <p style="font-size: 0.9rem; color: var(--text-secondary);">
                    This will scan all your templates and create the database file needed for the gallery.
                </p>
            </div>
        `;
    }
}

// Initialize the gallery when the page loads
let templateGallery;

document.addEventListener('DOMContentLoaded', () => {
    templateGallery = new TemplateGallery();
});

// Expose some functions globally for onclick handlers
window.templateGallery = templateGallery;