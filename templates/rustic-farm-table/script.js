// Rustic Farm-to-Table Restaurant JavaScript

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
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

// Navbar scroll effect with organic feel
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 248, 220, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(139, 69, 19, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 248, 220, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(139, 69, 19, 0.1)';
        }
    }
});

// Intersection Observer for organic fade-in animations
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

// Apply fade-in animation to elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.promise-item, .menu-item, .partner-card, .contact-item'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Organic counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when stats section is in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.story-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Contact form enhancement with validation
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Enhanced validation
        const errors = [];
        
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Please enter a valid name');
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.push('Please enter a message with at least 10 characters');
        }
        
        if (errors.length > 0) {
            showFormMessage(errors.join('\n'), 'error');
            return;
        }
        
        // Success handling
        showFormMessage('🌱 Thank you for your message! We\'ll get back to you soon with farm-fresh updates.', 'success');
        this.reset();
        
        // In a real application, send data to server
        console.log('Form submission:', data);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form message display
function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.cssText = `
        padding: 15px 20px;
        border-radius: 10px;
        margin-bottom: 20px;
        font-weight: 600;
        ${type === 'success' 
            ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
            : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
    `;
    messageDiv.textContent = message;
    
    // Insert message at top of form
    contactForm.insertBefore(messageDiv, contactForm.firstChild);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Seasonal menu rotation hint (for fun)
const menuItems = document.querySelectorAll('.menu-item');
if (menuItems.length > 0) {
    setInterval(() => {
        const randomItem = menuItems[Math.floor(Math.random() * menuItems.length)];
        const farmTag = randomItem.querySelector('.farm-tag');
        
        if (farmTag) {
            const originalText = farmTag.textContent;
            farmTag.textContent = '🌟 Featured Today';
            farmTag.style.background = '#DAA520';
            
            setTimeout(() => {
                farmTag.textContent = originalText;
                farmTag.style.background = '';
            }, 3000);
        }
    }, 30000); // Every 30 seconds
}

// Enhanced mobile menu animation
if (hamburger) {
    hamburger.addEventListener('click', () => {
        const spans = hamburger.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (hamburger.classList.contains('active')) {
                span.style.transform = index === 0 ? 'rotate(45deg) translate(5px, 5px)' :
                                     index === 1 ? 'opacity(0)' :
                                     'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });
}

// Seasonal greeting based on current date
document.addEventListener('DOMContentLoaded', () => {
    const currentMonth = new Date().getMonth();
    const seasonalGreetings = {
        spring: '🌸 Spring Harvest is Here!',
        summer: '☀️ Summer Bounty Awaits!',
        fall: '🍂 Fall Flavors Available!',
        winter: '❄️ Winter Comfort Food!'
    };
    
    let season;
    if (currentMonth >= 2 && currentMonth <= 4) season = 'spring';
    else if (currentMonth >= 5 && currentMonth <= 7) season = 'summer';
    else if (currentMonth >= 8 && currentMonth <= 10) season = 'fall';
    else season = 'winter';
    
    const heroDescription = document.querySelector('.hero-highlight p');
    if (heroDescription) {
        heroDescription.style.position = 'relative';
        heroDescription.innerHTML += `<br><small style="opacity: 0.8; font-style: italic;">${seasonalGreetings[season]}</small>`;
    }
});

// Preload images for better performance
const preloadImages = () => {
    const imageSources = [
        'images/hero.jpg',
        'images/interior.jpg',
        'images/food-1.jpg',
        'images/food-2.jpg',
        'images/food-3.jpg',
        'images/food-4.jpg'
    ];
    
    imageSources.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);

// Add organic hover effects to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Dynamic year in footer
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.footer-info p');
    yearElements.forEach(element => {
        if (element.textContent.includes('2024')) {
            element.textContent = element.textContent.replace('2024', currentYear);
        }
    });
});

// Add subtle parallax effect to hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background img');
    
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Farm partner cards interactive effect
document.querySelectorAll('.partner-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const distance = this.querySelector('.partner-distance');
        if (distance) {
            distance.style.transform = 'scale(1.1)';
            distance.style.background = '#DAA520';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const distance = this.querySelector('.partner-distance');
        if (distance) {
            distance.style.transform = 'scale(1)';
            distance.style.background = '';
        }
    });
});

// Social links tracking (for analytics)
document.querySelectorAll('.social-link, .social-links a').forEach(link => {
    link.addEventListener('click', function() {
        const platform = this.href.includes('facebook') ? 'Facebook' : 
                        this.href.includes('instagram') ? 'Instagram' : 'Other';
        console.log(`Social media click: ${platform}`);
        // In real implementation, send to analytics
    });
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Focus management for mobile menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            // Focus first menu item when menu opens
            const firstMenuItem = navMenu.querySelector('a');
            if (firstMenuItem) {
                setTimeout(() => firstMenuItem.focus(), 100);
            }
        }
    });
}