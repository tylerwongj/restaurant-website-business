// Fast Food Mobile Template JavaScript

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navActions = document.querySelector('.nav-actions');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navActions.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navActions.classList.remove('active');
    });
});

// App Banner Management
const appBanner = document.querySelector('.app-banner');
const appBannerClose = document.querySelector('.app-banner-close');

if (appBannerClose) {
    appBannerClose.addEventListener('click', () => {
        appBanner.style.display = 'none';
        localStorage.setItem('appBannerDismissed', 'true');
    });
}

// Check if user previously dismissed app banner
if (localStorage.getItem('appBannerDismissed') === 'true') {
    if (appBanner) {
        appBanner.style.display = 'none';
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced card hover effects
document.querySelectorAll('.feature-card, .deal-card, .category-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    });
});

// Location Finder
const locationSearch = document.getElementById('location-search');
const findBtn = document.querySelector('.find-btn');

if (findBtn) {
    findBtn.addEventListener('click', function() {
        const searchValue = locationSearch.value.trim();
        if (searchValue) {
            // Simulate location search
            findNearbyLocations(searchValue);
        } else {
            showNotification('Please enter a ZIP code or city', 'warning');
        }
    });
}

if (locationSearch) {
    locationSearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            findBtn.click();
        }
    });
}

function findNearbyLocations(searchTerm) {
    // Add loading state
    const originalText = findBtn.textContent;
    findBtn.textContent = 'Finding...';
    findBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        findBtn.textContent = originalText;
        findBtn.disabled = false;
        
        // Show success message
        showNotification(`Found locations near ${searchTerm}`, 'success');
        
        // Here you would typically update the locations list
        updateLocationsList(searchTerm);
    }, 1500);
}

function updateLocationsList(searchTerm) {
    // This would typically fetch real data from your API
    const locationsList = document.querySelector('.locations-list');
    
    // Add a visual indicator that results have been updated
    locationsList.style.opacity = '0.5';
    setTimeout(() => {
        locationsList.style.opacity = '1';
        locationsList.style.transform = 'translateY(-5px)';
        setTimeout(() => {
            locationsList.style.transform = 'translateY(0)';
        }, 200);
    }, 300);
}

// Order tracking simulation
function simulateOrderProcess(itemName) {
    const steps = [
        'Adding to cart...',
        'Calculating total...',
        'Redirecting to checkout...'
    ];
    
    let currentStep = 0;
    const interval = setInterval(() => {
        if (currentStep < steps.length) {
            showNotification(steps[currentStep], 'info');
            currentStep++;
        } else {
            clearInterval(interval);
            showNotification(`${itemName} added to cart!`, 'success');
        }
    }, 800);
}

// Add to cart functionality for featured items
document.querySelectorAll('.btn-accent').forEach(btn => {
    if (btn.textContent.includes('Add to Order')) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const itemName = this.closest('.feature-card').querySelector('h3, h4').textContent;
            simulateOrderProcess(itemName);
        });
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Style based on type
    const colors = {
        success: '#27ae60',
        warning: '#f39c12',
        info: '#3498db',
        error: '#e74c3c'
    };
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin: 0;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

// Enhanced mobile navigation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nav-menu.active,
    .nav-actions.active {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        flex-direction: column;
        padding: 2rem;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        z-index: 999;
    }
    
    .nav-actions.active {
        border-top: 1px solid var(--border-color);
        padding-top: 1rem;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu,
        .nav-actions {
            display: none;
        }
        
        .app-banner {
            padding: 8px 15px;
        }
        
        .app-info {
            gap: 8px;
        }
        
        .app-text {
            font-size: 0.8rem;
        }
        
        .app-benefit {
            font-size: 0.7rem;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
});

// App download tracking
document.querySelectorAll('.download-btn, .app-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Track app download clicks
        const platform = this.href.includes('apple') ? 'iOS' : 'Android';
        console.log(`App download clicked: ${platform}`);
        
        // You could send this data to your analytics service
        // analytics.track('app_download_click', { platform: platform });
    });
});

// Dynamic content updates (for real-time features)
function updateDynamicContent() {
    // Update deal countdowns, featured items, etc.
    // This would typically fetch from your API
    
    // Example: Update limited time offer countdown
    const ltoElements = document.querySelectorAll('.lto-badge');
    ltoElements.forEach(element => {
        if (element.textContent.includes('LIMITED TIME')) {
            // Add pulsing animation to create urgency
            element.style.animation = 'pulse 2s infinite';
        }
    });
}

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(pulseStyle);

// Call dynamic content update on load
document.addEventListener('DOMContentLoaded', updateDynamicContent);

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Touch gestures for mobile (simple swipe detection)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe right - could implement navigation
            console.log('Swipe right detected');
        } else {
            // Swipe left - could implement navigation
            console.log('Swipe left detected');
        }
    }
}

// Accessibility improvements
function enhanceAccessibility() {
    // Add keyboard navigation for interactive elements
    document.querySelectorAll('.category-item, .feature-card, .deal-card').forEach(element => {
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add aria-labels for better screen reader support
    document.querySelectorAll('.btn').forEach(btn => {
        if (!btn.getAttribute('aria-label')) {
            btn.setAttribute('aria-label', btn.textContent.trim());
        }
    });
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', enhanceAccessibility);