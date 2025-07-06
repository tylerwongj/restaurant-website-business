// McDonald's-Inspired Vertical Card Stack Template JavaScript

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeBanner();
    initializeScrollAnimations();
    initializeIntersectionObserver();
    initializeSmoothScrolling();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'rotate(0) translate(0, 0)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0) translate(0, 0)';
            }
        });
    }
    
    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Reset hamburger animation
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0) translate(0, 0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0, 0)';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Top banner functionality
function initializeBanner() {
    const banner = document.querySelector('.top-banner');
    const closeBtn = document.querySelector('.banner-close');
    
    if (closeBtn && banner) {
        closeBtn.addEventListener('click', function() {
            banner.style.display = 'none';
            
            // Store banner state in localStorage
            localStorage.setItem('bannerClosed', 'true');
        });
    }
    
    // Check if banner was previously closed
    if (localStorage.getItem('bannerClosed') === 'true') {
        if (banner) {
            banner.style.display = 'none';
        }
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initializeScrollAnimations() {
    // Add scroll-based navbar background
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', debounce(() => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'var(--background)';
            navbar.style.backdropFilter = 'none';
        }
    }, 10));
}

// Intersection Observer for card animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Add staggered animation for multiple elements in the same card
                const animatedElements = entry.target.querySelectorAll('.feature, .app-btn');
                animatedElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe promo cards for animation
    const promoCards = document.querySelectorAll('.promo-card');
    promoCards.forEach(card => {
        observer.observe(card);
    });
    
    // Set initial state for staggered elements
    const staggeredElements = document.querySelectorAll('.feature, .app-btn');
    staggeredElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
}

// Promo card interactions
function initializePromoInteractions() {
    const promoCards = document.querySelectorAll('.promo-card');
    
    promoCards.forEach(card => {
        // Add hover effects for interactive cards
        if (card.classList.contains('promo-card-value') || 
            card.classList.contains('promo-card-innovation')) {
            
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        }
    });
}

// CTA button tracking (placeholder for analytics)
function trackButtonClick(buttonText, section) {
    // Placeholder for analytics tracking
    console.log(`Button clicked: ${buttonText} in section: ${section}`);
    
    // Here you would typically send data to your analytics service
    // Example: gtag('event', 'click', { 'section': section, 'button': buttonText });
}

// Add click tracking to CTA buttons
function initializeAnalytics() {
    const ctaButtons = document.querySelectorAll('.btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const section = this.closest('.promo-card')?.className || 'unknown';
            trackButtonClick(buttonText, section);
        });
    });
}

// Initialize app download button interactions
function initializeAppButtons() {
    const appButtons = document.querySelectorAll('.app-btn');
    
    appButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add loading state
            this.style.opacity = '0.7';
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Track app download attempts
            const platform = this.href.includes('apple') ? 'iOS' : 'Android';
            trackButtonClick(`App Download - ${platform}`, 'app-promotion');
        });
    });
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utility function for throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimization - lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize all interactions
document.addEventListener('DOMContentLoaded', function() {
    initializePromoInteractions();
    initializeAnalytics();
    initializeAppButtons();
    initializeLazyLoading();
});

// Export functions for global access if needed
window.trackButtonClick = trackButtonClick;