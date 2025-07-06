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

// Content section management
const contentSections = document.querySelectorAll('.content-section');
const navigationLinks = document.querySelectorAll('.nav-link, .nav-menu a');

// Hide all content sections initially
function hideAllSections() {
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
}

// Show specific section with fade-in effect
function showSection(sectionId) {
    hideAllSections();
    const targetSection = document.querySelector(sectionId);
    
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.style.opacity = '0';
        targetSection.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            targetSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
        }, 50);
        
        // Scroll to section smoothly
        const offsetTop = targetSection.offsetTop - 100;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Navigation click handlers
navigationLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href && href.startsWith('#') && href !== '#home') {
            e.preventDefault();
            
            // Remove active class from all links
            navigationLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show the corresponding section
            showSection(href);
            
            // Update URL without triggering page reload
            history.pushState(null, null, href);
        } else if (href === '#home') {
            e.preventDefault();
            hideAllSections();
            navigationLinks.forEach(l => l.classList.remove('active'));
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Update URL
            history.pushState(null, null, '/');
        }
    });
});

// Handle back/forward browser buttons
window.addEventListener('popstate', function() {
    const hash = window.location.hash;
    
    if (hash && hash !== '#home') {
        showSection(hash);
        
        // Update active link
        navigationLinks.forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`a[href="${hash}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    } else {
        hideAllSections();
        navigationLinks.forEach(l => l.classList.remove('active'));
    }
});

// Initialize page based on URL hash
document.addEventListener('DOMContentLoaded', function() {
    const hash = window.location.hash;
    
    if (hash && hash !== '#home') {
        showSection(hash);
        
        // Set active link
        const activeLink = document.querySelector(`a[href="${hash}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    } else {
        hideAllSections();
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scroll for main navigation links
document.querySelectorAll('.main-navigation .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        if (href && href.startsWith('#') && href !== '#home') {
            // Remove active class from all main nav links
            document.querySelectorAll('.main-navigation .nav-link').forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show the corresponding section
            showSection(href);
        }
    });
});

// Award hover effects
document.querySelectorAll('.award').forEach(award => {
    award.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.transition = 'transform 0.4s ease';
    });
    
    award.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Social media link interactions
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            // Track social media clicks
            console.log('Social media clicked:', href);
            trackInteraction('social_click', { platform: href });
        }
    });
});

// Footer link interactions
document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const linkText = this.textContent;
        const href = this.getAttribute('href');
        
        console.log('Footer link clicked:', linkText);
        trackInteraction('footer_click', { text: linkText, url: href });
        
        if (href && href !== '#') {
            // External links open in new tab
            e.preventDefault();
            window.open(href, '_blank');
        }
    });
});

// Reservation and contact interactions
document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function() {
        const type = this.getAttribute('href').startsWith('tel:') ? 'phone' : 'email';
        const value = this.getAttribute('href').replace(/^(tel:|mailto:)/, '');
        
        console.log(`Contact interaction: ${type}`, value);
        trackInteraction('contact_click', { type, value });
    });
});

// Enhanced typing effect for chef name (optional animation)
function typeWriterEffect(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animations to elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.award, .content-text, .menu-type, .wine-feature, .event-space, .garden-feature');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        fadeObserver.observe(el);
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Enter key on focusable elements
    if (e.key === 'Enter') {
        const focused = document.activeElement;
        if (focused && (focused.classList.contains('nav-link') || focused.classList.contains('footer-link'))) {
            focused.click();
        }
    }
});

// Accessibility improvements
function enhanceAccessibility() {
    // Add ARIA labels to navigation
    const navLinks = document.querySelectorAll('.nav-link, .nav-menu a');
    navLinks.forEach(link => {
        if (!link.getAttribute('aria-label')) {
            link.setAttribute('aria-label', `Navigate to ${link.textContent}`);
        }
    });
    
    // Add role attributes
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.setAttribute('role', 'navigation');
        navbar.setAttribute('aria-label', 'Main navigation');
    }
    
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        section.setAttribute('role', 'main');
        section.setAttribute('aria-live', 'polite');
    });
}

// Analytics and tracking
function trackInteraction(action, data = null) {
    console.log(`Luxury restaurant interaction: ${action}`, data);
    
    // Integrate with analytics platform (Google Analytics, etc.)
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            custom_parameter: data
        });
    }
    
    // Custom analytics endpoint
    if (window.luxuryAnalytics) {
        window.luxuryAnalytics.track(action, data);
    }
}

// Performance monitoring
window.addEventListener('load', function() {
    const perfData = performance.timing;
    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    console.log(`Luxury architectural template load time: ${loadTime}ms`);
    trackInteraction('page_load_performance', { loadTime });
    
    // Initialize accessibility enhancements
    enhanceAccessibility();
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error in luxury architectural template:', e.error);
    
    // Report critical errors to monitoring service
    if (e.error && e.error.stack) {
        trackInteraction('javascript_error', {
            message: e.error.message,
            stack: e.error.stack,
            filename: e.filename,
            lineno: e.lineno
        });
    }
});

// Touch device optimizations
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Reduce hover effects on touch devices
    const style = document.createElement('style');
    style.textContent = `
        .touch-device .award:hover {
            transform: none !important;
        }
        .touch-device .nav-menu a::after {
            width: 0 !important;
        }
    `;
    document.head.appendChild(style);
}

// Theme switching functionality (if needed)
function switchTheme(themeName) {
    document.body.className = `theme-${themeName}`;
    localStorage.setItem('luxuryTheme', `theme-${themeName}`);
    trackInteraction('theme_change', { themeName });
}

// Restore saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('luxuryTheme');
    if (savedTheme) {
        document.body.className = savedTheme;
    }
});

// Image lazy loading enhancement
function enhanceImageLoading() {
    const images = document.querySelectorAll('img[src*="{{"]');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease';
        
        img.onload = function() {
            this.style.opacity = '1';
        };
    });
}

// Initialize enhanced image loading
document.addEventListener('DOMContentLoaded', enhanceImageLoading);

// Export functions for external use
window.luxuryArchitectural = {
    showSection,
    hideAllSections,
    switchTheme,
    trackInteraction,
    enhanceAccessibility
};

// Console log for debugging
console.log('Luxury Architectural template loaded successfully');

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Luxury Architectural template initialized');
    
    // Track page view
    trackInteraction('page_view', { 
        template: 'luxury-architectural',
        timestamp: new Date().toISOString()
    });
});