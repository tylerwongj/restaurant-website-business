// Fast Food Mobile Template JavaScript

// Category switching
function setupCategoryTabs() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuSections = document.querySelectorAll('.menu-items');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all sections, show only the selected one
            menuSections.forEach(section => {
                section.style.display = 'none';
            });
            
            const targetCategory = this.getAttribute('data-category');
            const targetSection = document.getElementById(targetCategory);
            if (targetSection) {
                targetSection.style.display = 'grid';
            }
        });
    });
}

// Order interactions
function setupOrderButtons() {
    document.querySelectorAll('.btn-deal, .btn-small').forEach(button => {
        if (button.textContent.includes('Order') || button.textContent.includes('Add')) {
            button.addEventListener('click', function() {
                const itemName = this.closest('.deal-card, .menu-item')?.querySelector('h3, h4')?.textContent || 'Item';
                alert(`${itemName} added to your order!`);
            });
        }
    });
}

// Location search
function setupLocationSearch() {
    const searchButton = document.querySelector('.btn-search');
    const locationInput = document.querySelector('.location-input');
    
    if (searchButton && locationInput) {
        searchButton.addEventListener('click', function() {
            const location = locationInput.value.trim();
            if (location) {
                alert(`Searching for locations near: ${location}`);
            } else {
                alert('Please enter a location');
            }
        });
        
        locationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }
}

// Order option buttons
function setupOrderOptions() {
    document.querySelectorAll('.order-option button').forEach(button => {
        button.addEventListener('click', function() {
            const optionType = this.closest('.order-option').querySelector('h3').textContent;
            if (this.textContent.includes('Order')) {
                alert(`Starting ${optionType} order...`);
            } else if (this.textContent.includes('Find')) {
                alert('Finding nearby locations...');
            }
        });
    });
}

// Location cards
function setupLocationCards() {
    document.querySelectorAll('.location-card .btn-small').forEach(button => {
        button.addEventListener('click', function() {
            const locationName = this.closest('.location-card').querySelector('h3').textContent;
            alert(`Starting order for ${locationName}`);
        });
    });
}

// App download tracking
function setupAppDownloads() {
    document.querySelectorAll('.download-btn').forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.querySelector('img').alt.includes('App Store') ? 'iOS' : 'Android';
            console.log(`App download clicked: ${platform}`);
        });
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Deal card animations
function setupDealAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.deal-card, .value-item, .order-option').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    setupCategoryTabs();
    setupOrderButtons();
    setupLocationSearch();
    setupOrderOptions();
    setupLocationCards();
    setupAppDownloads();
    setupDealAnimations();
    
    // Show first category by default
    const firstCategory = document.querySelector('.category-btn.active');
    if (firstCategory) {
        const targetCategory = firstCategory.getAttribute('data-category');
        document.querySelectorAll('.menu-items').forEach(section => {
            section.style.display = section.id === targetCategory ? 'grid' : 'none';
        });
    }
    
    document.documentElement.style.scrollBehavior = 'smooth';
});

window.FastFoodTemplate = {
    setupCategoryTabs,
    setupOrderButtons,
    setupLocationSearch
};