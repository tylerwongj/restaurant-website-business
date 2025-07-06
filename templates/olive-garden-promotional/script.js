// Olive Garden-Inspired Multi-Promotional Template JavaScript

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeIntersectionObserver();
    initializeSmoothScrolling();
    initializeInteractions();
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
    // Add scroll-based navbar enhancement
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'var(--background)';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = '0 2px 10px var(--shadow)';
        }
    }, 10));
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background img');
    
    if (hero && heroBackground) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const heroTop = hero.offsetTop;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled <= heroTop + heroHeight) {
                const parallaxSpeed = 0.5;
                heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        }, 10));
    }
}

// Intersection Observer for animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Special handling for menu highlights with staggered animation
                if (entry.target.classList.contains('highlights-grid')) {
                    const items = entry.target.querySelectorAll('.highlight-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('fade-in');
                        }, index * 100);
                    });
                }
                
                // Special handling for loyalty benefits
                if (entry.target.classList.contains('loyalty-benefits')) {
                    const benefits = entry.target.querySelectorAll('.benefit');
                    benefits.forEach((benefit, index) => {
                        setTimeout(() => {
                            benefit.classList.add('fade-in');
                        }, index * 150);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.delivery-banner, .theme-promotion, .value-promotion, .signature-highlight, ' +
        '.highlights-grid, .loyalty-benefits, .location-section'
    );
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Interactive elements
function initializeInteractions() {
    // Highlight item hover effects
    const highlightItems = document.querySelectorAll('.highlight-item');
    highlightItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 20px var(--shadow)';
        });
    });
    
    // Delivery icon interactions
    const deliveryIcons = document.querySelectorAll('.delivery-icon');
    deliveryIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.querySelector('img').style.transform = 'rotate(10deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.querySelector('img').style.transform = 'rotate(0deg)';
        });
    });
    
    // Theme features hover
    const themeFeatures = document.querySelectorAll('.theme-feature');
    themeFeatures.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.querySelector('img').style.transform = 'scale(1.2)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.querySelector('img').style.transform = 'scale(1)';
        });
    });
    
    // Value badge rotation effect
    const valueBadge = document.querySelector('.value-badge');
    if (valueBadge) {
        valueBadge.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(5deg) scale(1.05)';
        });
        
        valueBadge.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    }
    
    // Loyalty benefits hover
    const benefits = document.querySelectorAll('.benefit');
    benefits.forEach(benefit => {
        benefit.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.background = 'var(--primary)';
            this.style.color = 'var(--text-white)';
        });
        
        benefit.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.background = 'var(--background)';
            this.style.color = 'var(--text)';
        });
    });
}

// CTA button tracking and interactions
function initializeCTATracking() {
    const ctaButtons = document.querySelectorAll('.btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Track button clicks (placeholder for analytics)
            const buttonText = this.textContent.trim();
            const section = this.closest('section')?.className || 'unknown';
            trackCTAClick(buttonText, section);
        });
        
        // Add focus effects for accessibility
        button.addEventListener('focus', function() {
            this.style.outline = '3px solid var(--primary)';
            this.style.outlineOffset = '2px';
        });
        
        button.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Analytics tracking function (placeholder)
function trackCTAClick(buttonText, section) {
    console.log(`CTA clicked: ${buttonText} in section: ${section}`);
    
    // Here you would typically send data to your analytics service
    // Example: gtag('event', 'click', { 'section': section, 'button': buttonText });
    
    // If using Google Analytics 4:
    // gtag('event', 'cta_click', {
    //     'button_text': buttonText,
    //     'section': section,
    //     'timestamp': new Date().toISOString()
    // });
}

// Dynamic content loading (for future features)
function initializeDynamicContent() {
    // Placeholder for dynamic menu loading
    // loadMenuHighlights();
    
    // Placeholder for dynamic promotions
    // loadCurrentPromotions();
    
    // Placeholder for location-based content
    // loadLocationSpecificContent();
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
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
}

// Seasonal theme switcher (advanced feature)
function initializeSeasonalThemes() {
    const currentMonth = new Date().getMonth();
    const body = document.body;
    
    // Apply seasonal themes based on month
    if (currentMonth >= 2 && currentMonth <= 4) { // Spring
        body.classList.add('season-spring');
    } else if (currentMonth >= 5 && currentMonth <= 7) { // Summer
        body.classList.add('season-summer');
    } else if (currentMonth >= 8 && currentMonth <= 10) { // Fall
        body.classList.add('season-fall');
    } else { // Winter
        body.classList.add('season-winter');
    }
}

// Utility functions
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

// Initialize additional features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCTATracking();
    initializeDynamicContent();
    initializeLazyLoading();
    initializeSeasonalThemes();
});

// Export functions for global access
window.trackCTAClick = trackCTAClick;