// Eleven Madison Park-Inspired Botanical Minimalist Template JavaScript

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeBotanicalAnimations();
    initializeScrollAnimations();
    initializeIntersectionObserver();
    initializeSmoothScrolling();
    initializeAccessibility();
    initializeImageLazyLoading();
});

// Navigation functionality
function initializeNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Animate mobile toggle
            const spans = mobileToggle.querySelectorAll('span');
            if (mobileToggle.classList.contains('active')) {
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
            mobileToggle.classList.remove('active');
            
            // Reset mobile toggle animation
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0) translate(0, 0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0, 0)';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
}

// Botanical icon animations
function initializeBotanicalAnimations() {
    const botanicalIcons = document.querySelectorAll('.botanical-icon');
    
    // Gentle hover animations for botanical icons
    botanicalIcons.forEach((icon, index) => {
        // Staggered entrance animation
        setTimeout(() => {
            icon.style.opacity = '1';
            icon.style.transform = 'translateY(0)';
        }, index * 200);
        
        // Set initial state
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(20px)';
        icon.style.transition = 'all 0.6s ease';
        
        // Subtle hover effects
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            const svg = this.querySelector('svg');
            if (svg) {
                svg.style.transform = 'rotate(5deg)';
            }
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            const svg = this.querySelector('svg');
            if (svg) {
                svg.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Animate restaurant name with subtle letter spacing effect
    const restaurantName = document.querySelector('.restaurant-name h1');
    if (restaurantName) {
        restaurantName.addEventListener('mouseenter', function() {
            this.style.letterSpacing = '4px';
        });
        
        restaurantName.addEventListener('mouseleave', function() {
            this.style.letterSpacing = '3px';
        });
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

// Scroll-based animations
function initializeScrollAnimations() {
    const navbar = document.querySelector('.minimal-nav');
    
    // Subtle navbar enhancement on scroll
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.boxShadow = '0 2px 20px rgba(44, 62, 45, 0.08)';
        } else {
            navbar.style.background = 'var(--background)';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = 'none';
        }
    }, 10));
    
    // Parallax effect for hero image
    const heroImage = document.querySelector('.hero-artistic-image');
    if (heroImage) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            heroImage.style.transform = `translateY(${rate}px)`;
        }, 10));
    }
}

// Intersection Observer for fade-in animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Special handling for different sections
                handleSpecialAnimations(entry.target);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.philosophy-section, .seasonal-highlight, .experience-categories, ' +
        '.chef-story, .awards-section, .artisan-gallery, .events-section, ' +
        '.sustainability-section, .reservations-section'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Handle special animations for specific sections
function handleSpecialAnimations(target) {
    // Staggered animation for category items
    if (target.classList.contains('experience-categories')) {
        const items = target.querySelectorAll('.category-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('fade-in');
            }, index * 150);
        });
    }
    
    // Staggered animation for awards
    if (target.classList.contains('awards-section')) {
        const awards = target.querySelectorAll('.award-item');
        awards.forEach((award, index) => {
            setTimeout(() => {
                award.classList.add('fade-in');
            }, index * 200);
        });
    }
    
    // Gallery masonry effect
    if (target.classList.contains('artisan-gallery')) {
        const items = target.querySelectorAll('.gallery-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, index * 100);
        });
    }
    
    // Event types animation
    if (target.classList.contains('events-section')) {
        const types = target.querySelectorAll('.event-type');
        types.forEach((type, index) => {
            setTimeout(() => {
                type.classList.add('fade-in');
            }, index * 120);
        });
    }
    
    // Sustainability practices
    if (target.classList.contains('sustainability-section')) {
        const practices = target.querySelectorAll('.practice');
        practices.forEach((practice, index) => {
            setTimeout(() => {
                practice.classList.add('fade-in');
            }, index * 180);
        });
    }
    
    // Reservation options
    if (target.classList.contains('reservations-section')) {
        const options = target.querySelectorAll('.reservation-option');
        options.forEach((option, index) => {
            setTimeout(() => {
                option.classList.add('fade-in');
            }, index * 160);
        });
    }
}

// Enhanced interactions
function initializeEnhancedInteractions() {
    // Category item hover effects
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 50px rgba(44, 62, 45, 0.12)';
            
            const icon = this.querySelector('.category-icon svg');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px var(--shadow-light)';
            
            const icon = this.querySelector('.category-icon svg');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Gallery item hover effects with subtle zoom
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        // Set initial state for gallery items
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        item.style.transition = 'all 0.5s ease';
        
        item.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.08)';
                img.style.filter = 'brightness(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
                img.style.filter = 'brightness(1)';
            }
        });
    });
    
    // Ingredient tags hover
    const ingredients = document.querySelectorAll('.ingredient');
    ingredients.forEach(ingredient => {
        ingredient.addEventListener('mouseenter', function() {
            this.style.background = 'var(--botanical-green)';
            this.style.color = 'var(--background)';
            this.style.transform = 'translateY(-2px)';
        });
        
        ingredient.addEventListener('mouseleave', function() {
            this.style.background = 'var(--background-light)';
            this.style.color = 'var(--text)';
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Reservation button enhancements
    const reservationBtns = document.querySelectorAll('.reservation-btn');
    reservationBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 20px rgba(44, 62, 45, 0.15)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        btn.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Accessibility enhancements
function initializeAccessibility() {
    // Keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll(
        '.category-item, .gallery-item, .reservation-btn, .events-cta, .category-link'
    );
    
    interactiveElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary)';
            this.style.outlineOffset = '4px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
        
        // Add keyboard support for elements that aren't naturally focusable
        if (!element.hasAttribute('tabindex') && element.tagName !== 'A' && element.tagName !== 'BUTTON') {
            element.setAttribute('tabindex', '0');
        }
    });
    
    // Skip to content link for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const heroSection = document.querySelector('.hero-artistic');
    if (heroSection) {
        heroSection.id = 'main-content';
    }
}

// Lazy loading for images
function initializeImageLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger loading
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    
                    img.addEventListener('load', () => {
                        img.style.opacity = '1';
                    });
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Seasonal theming (subtle changes based on time of year)
function initializeSeasonalTheming() {
    const currentMonth = new Date().getMonth();
    const body = document.body;
    
    // Subtle seasonal adjustments
    if (currentMonth >= 2 && currentMonth <= 4) { // Spring
        document.documentElement.style.setProperty('--botanical-green', '#7fb069');
        document.documentElement.style.setProperty('--earth-tone', '#daa520');
    } else if (currentMonth >= 5 && currentMonth <= 7) { // Summer
        document.documentElement.style.setProperty('--botanical-green', '#32cd32');
        document.documentElement.style.setProperty('--earth-tone', '#f4a460');
    } else if (currentMonth >= 8 && currentMonth <= 10) { // Fall
        document.documentElement.style.setProperty('--botanical-green', '#8fbc8f');
        document.documentElement.style.setProperty('--earth-tone', '#cd853f');
    } else { // Winter
        document.documentElement.style.setProperty('--botanical-green', '#556b2f');
        document.documentElement.style.setProperty('--earth-tone', '#bc8f8f');
    }
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Monitor scroll performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                scrollTimeout = null;
            }, 16); // 60fps
        }
    });
    
    // Monitor image loading performance
    const images = document.querySelectorAll('img');
    let imagesLoaded = 0;
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            imagesLoaded++;
            if (imagesLoaded === images.length) {
                console.log('All images loaded');
                // Trigger any post-load animations or optimizations
            }
        });
    });
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

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initializeEnhancedInteractions();
    initializeSeasonalTheming();
    initializePerformanceMonitoring();
});

// Export functions for potential external use
window.botanicalTemplate = {
    initializeBotanicalAnimations,
    initializeAccessibility,
    throttle,
    debounce
};