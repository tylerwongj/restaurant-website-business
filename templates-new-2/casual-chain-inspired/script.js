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
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--bg-primary)';
        navbar.style.backdropFilter = 'none';
    }
});

// Animate elements on scroll
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

// Observe elements for animation
document.querySelectorAll('.special-item, .menu-item, .benefit, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form submission handler
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1000);
});

// Location finder functionality
document.querySelector('.location-search button').addEventListener('click', function() {
    const input = document.querySelector('.location-search input');
    const zipCode = input.value.trim();
    
    if (!zipCode) {
        alert('Please enter a ZIP code or city');
        return;
    }
    
    // Simulate location search
    const originalText = this.textContent;
    this.textContent = 'Searching...';
    this.disabled = true;
    
    setTimeout(() => {
        alert(`Found locations near ${zipCode}! (This is a demo - real implementation would show actual locations)`);
        this.textContent = originalText;
        this.disabled = false;
    }, 1000);
});

// Promo countdown timer (optional feature)
function updateCountdown() {
    // Set a future date for the promo
    const promoEnd = new Date();
    promoEnd.setDate(promoEnd.getDate() + 7); // 7 days from now
    
    const now = new Date().getTime();
    const distance = promoEnd - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        // Update countdown display if element exists
        const countdownElement = document.querySelector('.countdown');
        if (countdownElement) {
            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m`;
        }
    }
}

// Update countdown every minute
setInterval(updateCountdown, 60000);
updateCountdown();

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    // Set initial opacity
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Button click animations
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background img');
    
    if (heroBackground && scrolled < hero.offsetHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effects to menu items
document.querySelectorAll('.menu-item, .special-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
});

// Theme switcher (if needed for customization)
function switchTheme(themeName) {
    const body = document.body;
    body.className = body.className.replace(/theme-\w+/g, '');
    body.classList.add(`theme-${themeName}`);
    
    // Store theme preference
    localStorage.setItem('restaurantTheme', themeName);
}

// Load saved theme
const savedTheme = localStorage.getItem('restaurantTheme');
if (savedTheme) {
    switchTheme(savedTheme);
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu on escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Focus management for accessibility
    if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});

// Add ARIA labels for accessibility
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels to buttons without text
    document.querySelectorAll('button:not([aria-label])').forEach(button => {
        if (!button.textContent.trim()) {
            button.setAttribute('aria-label', 'Button');
        }
    });
    
    // Add ARIA labels to links without text
    document.querySelectorAll('a:not([aria-label])').forEach(link => {
        if (!link.textContent.trim() && link.querySelector('svg')) {
            link.setAttribute('aria-label', 'Social media link');
        }
    });
});

// Performance optimization - lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Console welcome message for developers
console.log('%c🍽️ Welcome to our restaurant website!', 'color: #ff6b35; font-size: 16px; font-weight: bold;');
console.log('This template was created for restaurant businesses. For customization help, contact us!');