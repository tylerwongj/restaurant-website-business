/**
 * Modern Template Dashboard
 * Features: Visual previews, keyboard navigation, favorites, search & filter
 */

class TemplateDashboard {
    constructor() {
        this.templates = [];
        this.filteredTemplates = [];
        this.currentTemplateIndex = 0;
        this.favorites = new Map();
        this.isModalOpen = false;
        this.isLargeGrid = false;
        this.showFavoritesOnly = false;
        
        // DOM elements
        this.elements = {};
        
        this.init();
    }
    
    async init() {
        console.log('🚀 Initializing Template Dashboard...');
        
        this.cacheElements();
        this.setupEventListeners();
        this.loadFavorites();
        
        await this.loadTemplates();
        this.renderTemplates();
        this.updateStats();
        
        console.log('✅ Dashboard initialized successfully');
    }
    
    cacheElements() {
        this.elements = {
            // Loading and states
            loadingState: document.getElementById('loading-state'),
            templatesContainer: document.getElementById('templates-container'),
            noResults: document.getElementById('no-results'),
            
            // Header stats
            totalTemplates: document.getElementById('total-templates'),
            favoritesCount: document.getElementById('favorites-count'),
            
            // Controls
            searchInput: document.getElementById('search-input'),
            clearSearch: document.getElementById('clear-search'),
            categoryFilter: document.getElementById('category-filter'),
            favoritesFilter: document.getElementById('favorites-filter'),
            gridSizeBtn: document.getElementById('grid-size-btn'),
            exportFavorites: document.getElementById('export-favorites'),
            
            // Modal
            modal: document.getElementById('template-modal'),
            modalOverlay: document.getElementById('modal-overlay'),
            modalTitle: document.getElementById('modal-title'),
            modalCategory: document.getElementById('modal-category'),
            modalPath: document.getElementById('modal-path'),
            modalIframe: document.getElementById('modal-iframe'),
            modalRating: document.getElementById('modal-rating'),
            modalOpen: document.getElementById('modal-open'),
            modalClose: document.getElementById('modal-close'),
            modalPrev: document.getElementById('modal-prev'),
            modalNext: document.getElementById('modal-next')
        };
    }
    
    setupEventListeners() {
        // Search functionality
        this.elements.searchInput.addEventListener('input', () => {
            this.filterTemplates();
        });
        
        this.elements.clearSearch.addEventListener('click', () => {
            this.elements.searchInput.value = '';
            this.filterTemplates();
        });
        
        // Filter controls
        this.elements.categoryFilter.addEventListener('change', () => {
            this.filterTemplates();
        });
        
        this.elements.favoritesFilter.addEventListener('click', () => {
            this.toggleFavoritesOnly();
        });
        
        // View controls
        this.elements.gridSizeBtn.addEventListener('click', () => {
            this.toggleGridSize();
        });
        
        this.elements.exportFavorites.addEventListener('click', () => {
            this.exportFavorites();
        });
        
        // Modal controls
        this.elements.modalClose.addEventListener('click', () => {
            this.closeModal();
        });
        
        this.elements.modalOverlay.addEventListener('click', () => {
            this.closeModal();
        });
        
        this.elements.modalOpen.addEventListener('click', () => {
            this.openCurrentTemplate();
        });
        
        this.elements.modalPrev.addEventListener('click', () => {
            this.navigateModal(-1);
        });
        
        this.elements.modalNext.addEventListener('click', () => {
            this.navigateModal(1);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isModalOpen) return;
            
            switch (e.key) {
                case 'Escape':
                    this.closeModal();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.navigateModal(-1);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.navigateModal(1);
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    this.openCurrentTemplate();
                    break;
            }
        });
        
        // Modal rating stars
        this.elements.modalRating.addEventListener('click', (e) => {
            if (e.target.classList.contains('star')) {
                const rating = parseInt(e.target.dataset.rating);
                this.setTemplateRating(this.filteredTemplates[this.currentTemplateIndex], rating);
            }
        });
    }
    
    async loadTemplates() {
        this.showLoading(true);
        
        try {
            // Discover templates from known directories
            const templateDirs = ['templates', 'templates-new', 'templates-business'];
            const allTemplates = [];
            
            for (const dir of templateDirs) {
                const templates = await this.discoverTemplatesInDirectory(dir);
                allTemplates.push(...templates);
            }
            
            this.templates = allTemplates;
            this.filteredTemplates = [...this.templates];
            
            console.log(`📊 Loaded ${this.templates.length} templates`);
            
        } catch (error) {
            console.error('❌ Failed to load templates:', error);
            this.showError('Failed to load templates');
        } finally {
            this.showLoading(false);
        }
    }
    
    async discoverTemplatesInDirectory(directory) {
        // Known template names based on our directory structure
        const knownTemplates = this.getKnownTemplateNames(directory);
        const templates = [];
        
        for (const name of knownTemplates) {
            const template = {
                id: `${directory}_${name}`,
                name: name,
                directory: directory,
                path: `${directory}/${name}`,
                category: this.categorizeTemplate(name),
                url: `/${directory}/${name}/index.html`
            };
            
            templates.push(template);
        }
        
        return templates;
    }
    
    getKnownTemplateNames(directory) {
        const templateMap = {
            'templates': [
                'casual-family', 'casual-family-modern', 'casual-family-grid',
                'casual-family-minimalist', 'casual-family-rustic', 'casual-family-bright',
                'casual-family-cozy', 'casual-family-vibrant', 'casual-family-vintage',
                'cafe-bistro', 'cafe-cozy', 'cafe-modern',
                'fine-dining-elegant', 'fine-dining-contemporary', 'fine-dining-classic',
                'fine-dining-dark', 'fine-dining-luxe', 'fine-dining-modern',
                'fast-casual-modern', 'fast-casual-clean', 'fast-casual-healthy',
                'fast-casual-minimal', 'fast-casual-trendy', 'fast-casual-vibrant',
                'artisan-bakery', 'artisan-coffee-roastery', 'artisan-pizza-modern',
                'asian-fusion-modern', 'asian-fusion-v1', 'asian-fusion-v2',
                'pizza-parlor-modern', 'pizza-parlor', 'pizzeria-authentic', 'pizzeria-modern',
                'sports-bar-grill', 'sports-bar-modern', 'sports-bar-entertainment',
                'steakhouse-premium', 'steakhouse-classic', 'steakhouse-rustic',
                'seafood-coastal', 'seafood-maritime', 'coastal-seafood-fresh',
                'mediterranean-coastal', 'mediterranean-modern', 'mediterranean-authentic',
                'bistro-chic', 'bistro-french', 'bistro-intimate', 'bistro-upscale',
                'breakfast-brunch-modern', 'breakfast-brunch-cozy', 'breakfast-family',
                'craft-brewery-modern', 'craft-brewery-taproom', 'gastropub-craft-beer',
                'farm-to-table-fresh', 'farm-to-table-rustic', 'farm-to-table-organic'
            ],
            'templates-new': [
                'modern-minimalist-cafe', 'elegant-steakhouse', 'trendy-brunch-cafe',
                'artisan-pizza-shop', 'craft-beer-pub', 'luxury-fine-dining'
            ],
            'templates-business': [
                'business-dining', 'corporate-catering', 'event-venue'
            ]
        };
        
        return templateMap[directory] || templateMap['templates'].slice(0, 20);
    }
    
    categorizeTemplate(name) {
        const nameLower = name.toLowerCase();
        
        const categories = {
            'casual-family': ['casual', 'family', 'cozy', 'bright', 'vibrant', 'vintage'],
            'fine-dining': ['fine', 'elegant', 'luxury', 'premium', 'sophisticated', 'contemporary', 'classic', 'luxe', 'dark'],
            'fast-casual': ['fast', 'quick', 'modern', 'clean', 'healthy', 'minimal', 'trendy'],
            'cafe-bistro': ['cafe', 'bistro', 'coffee', 'brunch', 'breakfast'],
            'pizza-italian': ['pizza', 'italian', 'artisan-pizza', 'pizzeria'],
            'asian': ['asian', 'sushi', 'japanese', 'chinese', 'thai', 'korean', 'ramen'],
            'steakhouse': ['steakhouse', 'steak', 'premium'],
            'seafood': ['seafood', 'coastal', 'maritime', 'ocean', 'fish'],
            'sports-bar': ['sports', 'bar', 'pub', 'tavern', 'grill', 'gastropub', 'brewery']
        };
        
        for (const [category, keywords] of Object.entries(categories)) {
            if (keywords.some(keyword => nameLower.includes(keyword))) {
                return category;
            }
        }
        
        return 'other';
    }
    
    filterTemplates() {
        const searchTerm = this.elements.searchInput.value.toLowerCase();
        const selectedCategory = this.elements.categoryFilter.value;
        
        this.filteredTemplates = this.templates.filter(template => {
            // Search filter
            const matchesSearch = !searchTerm || 
                template.name.toLowerCase().includes(searchTerm) ||
                template.category.toLowerCase().includes(searchTerm);
            
            // Category filter
            const matchesCategory = !selectedCategory || template.category === selectedCategory;
            
            // Favorites filter
            const matchesFavorites = !this.showFavoritesOnly || this.favorites.has(template.id);
            
            return matchesSearch && matchesCategory && matchesFavorites;
        });
        
        this.renderTemplates();
        this.updateStats();
    }
    
    renderTemplates() {
        const container = this.elements.templatesContainer;
        const noResults = this.elements.noResults;
        
        if (this.filteredTemplates.length === 0) {
            container.style.display = 'none';
            noResults.style.display = 'block';
            return;
        }
        
        container.style.display = 'grid';
        noResults.style.display = 'none';
        
        // Clear container
        container.innerHTML = '';
        
        // Render template cards
        this.filteredTemplates.forEach((template, index) => {
            const card = this.createTemplateCard(template, index);
            container.appendChild(card);
        });
    }
    
    createTemplateCard(template, index) {
        const card = document.createElement('div');
        card.className = 'template-card fade-in';
        card.style.animationDelay = `${index * 0.05}s`;
        
        const rating = this.favorites.get(template.id) || 0;
        const stars = this.createStarsHTML(rating);
        
        card.innerHTML = `
            <div class="template-preview">
                <iframe 
                    class="template-iframe" 
                    data-src="${template.url}"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin">
                </iframe>
                <div class="preview-overlay">
                    <div class="overlay-content">
                        Click to view full screen
                    </div>
                </div>
            </div>
            <div class="template-info">
                <h3 class="template-name">${this.formatTemplateName(template.name)}</h3>
                <div class="template-meta">
                    <span class="template-category">${template.category.replace('-', ' ')}</span>
                    <div class="template-rating" data-template-id="${template.id}">
                        ${stars}
                    </div>
                </div>
            </div>
        `;
        
        // Add click handler for modal
        card.addEventListener('click', () => {
            this.openModal(index);
        });
        
        // Add rating click handler
        const ratingElement = card.querySelector('.template-rating');
        ratingElement.addEventListener('click', (e) => {
            e.stopPropagation();
            if (e.target.classList.contains('star')) {
                const rating = parseInt(e.target.dataset.rating);
                this.setTemplateRating(template, rating);
                this.updateCardRating(ratingElement, rating);
            }
        });
        
        // Lazy load iframe
        this.setupLazyLoading(card);
        
        return card;
    }
    
    setupLazyLoading(card) {
        const iframe = card.querySelector('.template-iframe');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const src = iframe.dataset.src;
                    if (src && !iframe.src) {
                        iframe.src = src;
                        observer.unobserve(iframe);
                    }
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        observer.observe(iframe);
    }
    
    createStarsHTML(rating) {
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            const filled = i <= rating ? 'filled' : 'empty';
            starsHTML += `<span class="star ${filled}" data-rating="${i}">★</span>`;
        }
        return starsHTML;
    }
    
    formatTemplateName(name) {
        return name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    
    openModal(index) {
        this.currentTemplateIndex = index;
        this.isModalOpen = true;
        
        const template = this.filteredTemplates[index];
        const rating = this.favorites.get(template.id) || 0;
        
        // Update modal content
        this.elements.modalTitle.textContent = this.formatTemplateName(template.name);
        this.elements.modalCategory.textContent = template.category.replace('-', ' ');
        this.elements.modalPath.textContent = template.path;
        this.elements.modalIframe.src = template.url;
        
        // Update rating stars
        this.updateModalRating(rating);
        
        // Show modal
        this.elements.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        console.log(`🔍 Opened template: ${template.name}`);
    }
    
    closeModal() {
        this.isModalOpen = false;
        this.elements.modal.classList.remove('active');
        this.elements.modalIframe.src = '';
        document.body.style.overflow = '';
    }
    
    navigateModal(direction) {
        let newIndex = this.currentTemplateIndex + direction;
        
        if (newIndex < 0) {
            newIndex = this.filteredTemplates.length - 1;
        } else if (newIndex >= this.filteredTemplates.length) {
            newIndex = 0;
        }
        
        this.openModal(newIndex);
    }
    
    openCurrentTemplate() {
        const template = this.filteredTemplates[this.currentTemplateIndex];
        const fullUrl = `${window.location.protocol}//${window.location.host}${template.url}`;
        window.open(fullUrl, '_blank');
    }
    
    setTemplateRating(template, rating) {
        this.favorites.set(template.id, rating);
        this.saveFavorites();
        this.updateStats();
        
        console.log(`⭐ Rated ${template.name}: ${rating} stars`);
    }
    
    updateCardRating(ratingElement, rating) {
        const stars = ratingElement.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.className = `star ${index < rating ? 'filled' : 'empty'}`;
        });
    }
    
    updateModalRating(rating) {
        const stars = this.elements.modalRating.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.className = `star ${index < rating ? 'filled' : 'empty'}`;
        });
    }
    
    toggleFavoritesOnly() {
        this.showFavoritesOnly = !this.showFavoritesOnly;
        this.elements.favoritesFilter.classList.toggle('active', this.showFavoritesOnly);
        this.filterTemplates();
    }
    
    toggleGridSize() {
        this.isLargeGrid = !this.isLargeGrid;
        this.elements.templatesContainer.classList.toggle('large-grid', this.isLargeGrid);
        this.elements.templatesContainer.classList.toggle('small-grid', !this.isLargeGrid && window.innerWidth > 768);
    }
    
    updateStats() {
        this.elements.totalTemplates.textContent = this.filteredTemplates.length;
        this.elements.favoritesCount.textContent = this.favorites.size;
    }
    
    loadFavorites() {
        try {
            const stored = localStorage.getItem('templateDashboardFavorites');
            if (stored) {
                const favoritesArray = JSON.parse(stored);
                this.favorites = new Map(favoritesArray);
                console.log(`📚 Loaded ${this.favorites.size} favorites`);
            }
        } catch (error) {
            console.warn('Failed to load favorites:', error);
        }
    }
    
    saveFavorites() {
        try {
            const favoritesArray = Array.from(this.favorites.entries());
            localStorage.setItem('templateDashboardFavorites', JSON.stringify(favoritesArray));
        } catch (error) {
            console.warn('Failed to save favorites:', error);
        }
    }
    
    exportFavorites() {
        const favoriteTemplates = this.templates
            .filter(template => this.favorites.has(template.id))
            .map(template => ({
                name: template.name,
                category: template.category,
                path: template.path,
                rating: this.favorites.get(template.id),
                url: `${window.location.origin}${template.url}`
            }))
            .sort((a, b) => b.rating - a.rating);
        
        if (favoriteTemplates.length === 0) {
            alert('No favorites to export. Star some templates first!');
            return;
        }
        
        const exportData = {
            exported_at: new Date().toISOString(),
            total_favorites: favoriteTemplates.length,
            templates: favoriteTemplates
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `template-favorites-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        console.log(`📤 Exported ${favoriteTemplates.length} favorites`);
    }
    
    showLoading(show) {
        this.elements.loadingState.style.display = show ? 'flex' : 'none';
        this.elements.templatesContainer.style.display = show ? 'none' : 'grid';
    }
    
    showError(message) {
        this.elements.templatesContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <h3 style="color: var(--danger-color); margin-bottom: 1rem;">⚠️ Error</h3>
                <p>${message}</p>
            </div>
        `;
    }
}

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.templateDashboard = new TemplateDashboard();
});

// Handle visibility change for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause iframe loading when tab is hidden
        const iframes = document.querySelectorAll('.template-iframe[src]');
        iframes.forEach(iframe => {
            iframe.dataset.pausedSrc = iframe.src;
            iframe.src = '';
        });
    } else {
        // Resume iframe loading when tab is visible
        const iframes = document.querySelectorAll('.template-iframe[data-paused-src]');
        iframes.forEach(iframe => {
            iframe.src = iframe.dataset.pausedSrc;
            delete iframe.dataset.pausedSrc;
        });
    }
});