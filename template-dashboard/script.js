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
        this.gridSize = 'normal'; // 'small', 'normal', 'large'
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
                const template = this.filteredTemplates[this.currentTemplateIndex];
                this.setTemplateRating(template, rating);
                
                // Update modal display
                const newRating = this.favorites.get(template.id) || 0;
                this.updateModalRating(newRating);
            }
        });
    }
    
    async loadTemplates() {
        this.showLoading(true);
        
        try {
            // Fetch all templates in one API call
            const response = await fetch('/api/templates');
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Process templates and add categories
            this.templates = data.templates.map(template => ({
                ...template,
                category: this.categorizeTemplate(template.name)
            }));
            
            this.filteredTemplates = [...this.templates];
            
            console.log(`📊 Loaded ${this.templates.length} templates from API`);
            console.log(`✅ Complete: ${this.templates.filter(t => t.status === 'complete').length}`);
            console.log(`⚠️ Partial: ${this.templates.filter(t => t.status === 'partial').length}`);
            console.log(`❌ Empty: ${this.templates.filter(t => t.status === 'empty').length}`);
            
        } catch (error) {
            console.error('❌ Failed to load templates:', error);
            this.showError('Failed to load templates');
        } finally {
            this.showLoading(false);
        }
    }
    
    
    getFallbackTemplates(directory) {
        // Minimal fallback - API should work, but just in case
        console.warn(`Using fallback for ${directory} - API discovery failed`);
        
        // Return empty array - we want the real discovery to work
        // If this runs, it means there's a bigger problem to fix
        return [];
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
            
            // Update no results message based on context
            if (this.showFavoritesOnly && this.favorites.size === 0) {
                noResults.innerHTML = `
                    <div class="no-results-icon">⭐</div>
                    <h3>No favorites yet</h3>
                    <p>Click the stars on templates to add them to your favorites</p>
                    <p><em>The "Show All Templates" button above will show all templates</em></p>
                `;
            } else if (this.showFavoritesOnly) {
                noResults.innerHTML = `
                    <div class="no-results-icon">⭐</div>
                    <h3>No favorites match your filters</h3>
                    <p>Try adjusting your search or category filters</p>
                `;
            } else {
                noResults.innerHTML = `
                    <div class="no-results-icon">🔍</div>
                    <h3>No templates found</h3>
                    <p>Try adjusting your search or filters</p>
                `;
            }
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
        
        // Create completeness indicator
        const completenessIndicator = this.createCompletenessIndicator(template);
        
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
                ${completenessIndicator}
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
                
                // Update card display with new rating
                const newRating = this.favorites.get(template.id) || 0;
                this.updateCardRating(ratingElement, newRating);
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
    
    createCompletenessIndicator(template) {
        if (!template.status) {
            return ''; // No completeness data available
        }
        
        const statusConfig = {
            'complete': {
                icon: '✅',
                text: 'Complete',
                class: 'complete'
            },
            'partial': {
                icon: '⚠️',
                text: 'Partial',
                class: 'partial'
            },
            'empty': {
                icon: '❌',
                text: 'Empty',
                class: 'empty'
            }
        };
        
        const config = statusConfig[template.status] || statusConfig['empty'];
        
        return `
            <div class="completeness-indicator ${config.class}" title="${config.text} (${template.completeness || 0}%)">
                <span class="completeness-icon">${config.icon}</span>
            </div>
        `;
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
        const currentRating = this.favorites.get(template.id) || 0;
        
        // If clicking the same star that's already selected, remove from favorites
        if (currentRating === rating) {
            this.favorites.delete(template.id);
            console.log(`🗑️ Removed ${template.name} from favorites`);
        } else {
            this.favorites.set(template.id, rating);
            console.log(`⭐ Rated ${template.name}: ${rating} stars`);
        }
        
        this.saveFavorites();
        this.updateStats();
        
        // Only re-filter if favorites-only mode is active and template was removed
        if (this.showFavoritesOnly && !this.favorites.has(template.id)) {
            this.filterTemplates();
        }
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
        
        // Update button text to show current state
        const buttonText = this.showFavoritesOnly ? 'Show All Templates' : 'Favorites Only';
        this.elements.favoritesFilter.innerHTML = `<span class="star">⭐</span> ${buttonText}`;
        
        console.log(`Favorites filter toggled: ${this.showFavoritesOnly ? 'ON' : 'OFF'}`);
        console.log(`Total favorites: ${this.favorites.size}`);
        
        this.filterTemplates();
    }
    
    toggleGridSize() {
        // Cycle through: normal -> large -> small -> normal
        const gridSizes = ['normal', 'large', 'small'];
        const currentIndex = gridSizes.indexOf(this.gridSize);
        const nextIndex = (currentIndex + 1) % gridSizes.length;
        this.gridSize = gridSizes[nextIndex];
        
        // Remove all grid classes
        this.elements.templatesContainer.classList.remove('large-grid', 'small-grid');
        
        // Add appropriate class
        if (this.gridSize === 'large') {
            this.elements.templatesContainer.classList.add('large-grid');
        } else if (this.gridSize === 'small') {
            this.elements.templatesContainer.classList.add('small-grid');
        }
        
        // Update button text to show current state
        const buttonText = this.gridSize === 'large' ? '⊞ Large' : 
                          this.gridSize === 'small' ? '⊞ Small' : '⊞ Normal';
        this.elements.gridSizeBtn.innerHTML = `<span class="grid-icon">${buttonText}</span>`;
        
        console.log(`Grid size changed to: ${this.gridSize}`);
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