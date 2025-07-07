// Health-Conscious Fast-Casual Restaurant Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Location finder functionality
    const locationFinder = document.querySelector('.location-finder');
    if (locationFinder) {
        const locationInput = locationFinder.querySelector('input');
        const locationButton = locationFinder.querySelector('button');
        
        if (locationButton) {
            locationButton.addEventListener('click', function() {
                const query = locationInput.value.trim();
                if (query) {
                    // In a real implementation, this would call an API
                    console.log('Searching for locations near:', query);
                    alert(`Searching for locations near: ${query}`);
                } else {
                    alert('Please enter a zip code or city name');
                }
            });
        }
        
        if (locationInput) {
            locationInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    locationButton.click();
                }
            });
        }
    }

    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const topic = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !topic || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // In a real implementation, this would send data to a server
            console.log('Form submitted:', { name, email, topic, message });
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Newsletter subscription
    const newsletter = document.querySelector('.newsletter');
    if (newsletter) {
        const newsletterButton = newsletter.querySelector('button');
        const newsletterInput = newsletter.querySelector('input');
        
        if (newsletterButton) {
            newsletterButton.addEventListener('click', function() {
                const email = newsletterInput.value.trim();
                if (email && isValidEmail(email)) {
                    // In a real implementation, this would call an API
                    console.log('Newsletter subscription:', email);
                    alert('Thank you for subscribing to our newsletter!');
                    newsletterInput.value = '';
                } else {
                    alert('Please enter a valid email address');
                }
            });
        }
        
        if (newsletterInput) {
            newsletterInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    newsletterButton.click();
                }
            });
        }
    }

    // Nutrition calculator modal (placeholder)
    const calculatorLinks = document.querySelectorAll('a[href="#calculator"]');
    calculatorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, this would open a modal with a nutrition calculator
            alert('Nutrition calculator feature coming soon!');
        });
    });

    // Allergen guide modal (placeholder)
    const allergenLinks = document.querySelectorAll('a[href="#allergens"]');
    allergenLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, this would open a modal with allergen information
            alert('Allergen guide feature coming soon!');
        });
    });

    // Menu item hover effects
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Health card animations
    const healthCards = document.querySelectorAll('.health-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    healthCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Nutrition tools animations
    const nutritionTools = document.querySelectorAll('.nutrition-tool');
    nutritionTools.forEach((tool, index) => {
        tool.style.opacity = '0';
        tool.style.transform = 'translateY(20px)';
        tool.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(tool);
    });

    // Add scroll-triggered animations for stats
    const stats = document.querySelectorAll('.stat');
    stats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(stat);
    });

    // Ingredient promises animation
    const promises = document.querySelectorAll('.promise');
    promises.forEach((promise, index) => {
        promise.style.opacity = '0';
        promise.style.transform = 'translateX(-20px)';
        promise.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(promise);
    });

    // Sustainability list animation
    const sustainabilityItems = document.querySelectorAll('.sustainability-list li');
    sustainabilityItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // CTA button pulse animation
    const ctaButtons = document.querySelectorAll('.cta-button, .order-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s infinite';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });

    // Add CSS animation for pulse effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .header.scrolled {
            background-color: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
        }
    `;
    document.head.appendChild(style);

    // Lazy loading for images
    const images = document.querySelectorAll('img[src*="{{"]');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });

    // Feature highlight on scroll
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'var(--box-shadow)';
        });
    });

    // Initialize tooltips for nutrition info
    const nutritionInfos = document.querySelectorAll('.nutrition-info span');
    nutritionInfos.forEach(info => {
        info.setAttribute('title', 'Click for detailed nutrition information');
        info.style.cursor = 'pointer';
        
        info.addEventListener('click', function() {
            // In a real implementation, this would show detailed nutrition info
            alert('Detailed nutrition information coming soon!');
        });
    });
});

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Theme toggle functionality (for future enhancement)
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.className;
    
    if (currentTheme.includes('color-scheme-healthy')) {
        body.className = body.className.replace('color-scheme-healthy', 'color-scheme-healthy-dark');
    } else {
        body.className = body.className.replace('color-scheme-healthy-dark', 'color-scheme-healthy');
    }
}

// Performance optimization
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

// Throttle function for scroll events
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
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-related optimizations can be added here
}, 100));