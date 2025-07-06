// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
});

// Promotion cards interaction
document.querySelectorAll('.promotion-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h2, h3, h4')?.textContent;
        console.log('Promotion clicked:', title);
        handlePromotionClick(title);
    });
    
    // Enhanced hover effects
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-6px)';
        this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    });
});

// Order button functionality
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#order') {
            e.preventDefault();
            handleOrderClick(this.textContent);
        }
    });
    
    // Button hover effects
    button.addEventListener('mouseenter', function() {
        if (!this.classList.contains('btn-small')) {
            this.style.transform = 'translateY(-2px)';
        }
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// App download tracking
document.querySelectorAll('.app-store-btn, .delivery-app').forEach(link => {
    link.addEventListener('click', function() {
        const platform = this.querySelector('img')?.alt || 'Unknown';
        console.log('App download/delivery clicked:', platform);
        trackAppDownload(platform);
    });
});

// Story card interactions
document.querySelectorAll('.story-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h3').textContent;
        const link = this.querySelector('.story-link').getAttribute('href');
        if (link && link !== '#') {
            window.open(link, '_blank');
        }
        trackStoryClick(title);
    });
});

// Burger item interactions
document.querySelectorAll('.burger-item').forEach(item => {
    item.addEventListener('click', function() {
        const name = this.querySelector('h4').textContent;
        const price = this.querySelector('.price').textContent;
        console.log('Burger clicked:', name, price);
        addBurgerToCart(name, price);
    });
    
    // Burger item hover effects
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
        this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    });
});

// Cart functionality
let cart = [];

function addBurgerToCart(name, price) {
    const item = { name, price, type: 'burger' };
    cart.push(item);
    updateCartDisplay();
    showAddToCartNotification(name);
    trackOrder('add_to_cart', item);
}

function updateCartDisplay() {
    const cartCount = cart.length;
    const cartIcon = document.querySelector('.cart-count');
    if (cartIcon) {
        cartIcon.textContent = cartCount;
    }
    
    // Update order button with cart count
    const orderButtons = document.querySelectorAll('.btn-order');
    orderButtons.forEach(btn => {
        if (cartCount > 0) {
            btn.textContent = `Order Now (${cartCount})`;
        } else {
            btn.textContent = 'Order Now';
        }
    });
}

function showAddToCartNotification(itemName) {
    // Create and show notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${itemName} added to cart!`;
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: var(--primary-color);
        color: var(--accent-color);
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1001;
        transform: translateX(300px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Promotion handling
function handlePromotionClick(title) {
    console.log('Promotion clicked:', title);
    // Integrate with ordering system or promotional flow
    trackOrder('promotion_click', { title });
}

function handleOrderClick(buttonText) {
    console.log('Order button clicked:', buttonText);
    // Redirect to ordering system or open order modal
    trackOrder('order_button_click', { buttonText });
}

// Analytics and tracking
function trackOrder(action, data = null) {
    console.log(`Order tracking: ${action}`, data);
    // Integrate with analytics platform (Google Analytics, etc.)
}

function trackAppDownload(platform) {
    console.log('App download tracked:', platform);
    // Track app downloads for analytics
}

function trackStoryClick(title) {
    console.log('Story clicked:', title);
    // Track story engagement
}

// Intersection Observer for animations
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

// Apply animations to sections
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.promotion-card, .story-card, .burger-item');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// McValue section special handling
const mcvalueSection = document.querySelector('.mcvalue-section');
if (mcvalueSection) {
    mcvalueSection.addEventListener('click', function() {
        console.log('McValue section clicked');
        // Handle McValue program signup or information
        window.open('#mcvalue-signup', '_blank');
    });
}

// Breakfast promotion special handling
const breakfastPromo = document.querySelector('.breakfast-promo');
if (breakfastPromo) {
    breakfastPromo.addEventListener('click', function() {
        console.log('Breakfast promotion clicked');
        trackOrder('breakfast_promo_click');
    });
}

// Social media links tracking
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function() {
        const platform = this.textContent.toLowerCase();
        console.log(`Social media clicked: ${platform}`);
        trackOrder('social_click', { platform });
    });
});

// Footer links tracking
document.querySelectorAll('.footer-section a').forEach(link => {
    link.addEventListener('click', function() {
        const linkText = this.textContent;
        console.log(`Footer link clicked: ${linkText}`);
        trackOrder('footer_click', { linkText });
    });
});

// Delivery app clicks
document.querySelectorAll('.delivery-app').forEach(app => {
    app.addEventListener('click', function(e) {
        e.preventDefault();
        const appName = this.querySelector('img')?.alt || 'Unknown App';
        console.log('Delivery app clicked:', appName);
        trackOrder('delivery_app_click', { appName });
        // Redirect to actual delivery app
        window.open(this.getAttribute('href'), '_blank');
    });
});

// Performance monitoring
window.addEventListener('load', function() {
    const perfData = performance.timing;
    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Fast-food template load time: ${loadTime}ms`);
    
    // Track performance metrics
    trackOrder('page_load_performance', { loadTime });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error in fast-food template:', e.error);
    // Report errors to monitoring service
});

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Enter key on focusable elements
    if (e.key === 'Enter') {
        const focused = document.activeElement;
        if (focused.classList.contains('promotion-card') || 
            focused.classList.contains('burger-item') || 
            focused.classList.contains('story-card')) {
            focused.click();
        }
    }
});

// Touch device optimizations
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Reduce hover effects on touch devices
    const style = document.createElement('style');
    style.textContent = `
        .touch-device .promotion-card:hover,
        .touch-device .burger-item:hover,
        .touch-device .story-card:hover {
            transform: none !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Fast-food mobile template loaded successfully');
    
    // Initialize cart display
    updateCartDisplay();
    
    // Check for saved preferences
    const savedTheme = localStorage.getItem('fastFoodTheme');
    if (savedTheme) {
        document.body.className = savedTheme;
    }
});

// Theme switching functionality
function switchTheme(themeName) {
    document.body.className = `theme-${themeName}`;
    localStorage.setItem('fastFoodTheme', `theme-${themeName}`);
    trackOrder('theme_change', { themeName });
}

// Export functions for external use
window.fastFoodTemplate = {
    addBurgerToCart,
    handlePromotionClick,
    handleOrderClick,
    switchTheme,
    trackOrder
};