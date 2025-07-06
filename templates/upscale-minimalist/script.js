// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
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

// Form submission handling
const reservationForm = document.querySelector('.reservation-form form');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Simple validation
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#e74c3c';
                field.style.borderWidth = '2px';
            } else {
                field.style.borderColor = '#e0e0e0';
                field.style.borderWidth = '1px';
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Show success message
        alert('Thank you for your reservation request. We will contact you within 24 hours to confirm your booking.');
        
        // Reset form
        this.reset();
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.borderBottomColor = 'rgba(224, 224, 224, 0.8)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.borderBottomColor = '#e0e0e0';
    }
});

// Fade-in animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
};

const fadeInObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.philosophy-item, .menu-item-large, .about-text, .about-image, .contact-info, .reservation-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeInObserver.observe(el);
});

// Parallax effect for hero image
window.addEventListener('scroll', function() {
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Image lazy loading and error handling
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        
        // Create placeholder
        const placeholder = document.createElement('div');
        placeholder.style.width = '100%';
        placeholder.style.height = this.style.height || '300px';
        placeholder.style.background = '#f5f5f5';
        placeholder.style.display = 'flex';
        placeholder.style.alignItems = 'center';
        placeholder.style.justifyContent = 'center';
        placeholder.style.color = '#999';
        placeholder.style.fontSize = '14px';
        placeholder.textContent = 'Image not available';
        
        this.parentNode.insertBefore(placeholder, this);
    });
});

// Phone number click tracking
document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
    phoneLink.addEventListener('click', function(e) {
        console.log('Phone number clicked:', this.href);
    });
});

// Email link click tracking
document.querySelectorAll('a[href^="mailto:"]').forEach(emailLink => {
    emailLink.addEventListener('click', function(e) {
        console.log('Email link clicked:', this.href);
    });
});

// Dynamic color scheme switching
function changeColorScheme(scheme) {
    const body = document.body;
    const schemes = ['classic', 'business', 'warm', 'cool', 'bold'];
    
    schemes.forEach(s => {
        body.classList.remove(`color-scheme-${s}`);
    });
    
    body.classList.add(`color-scheme-${scheme}`);
    localStorage.setItem('preferredColorScheme', scheme);
}

// Load saved color scheme preference
document.addEventListener('DOMContentLoaded', function() {
    const savedScheme = localStorage.getItem('preferredColorScheme');
    if (savedScheme) {
        changeColorScheme(savedScheme);
    }
});

// Smooth page transitions
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
});

window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Enhanced form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Real-time form validation
document.querySelectorAll('input[type="email"]').forEach(emailInput => {
    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#e74c3c';
            this.style.borderWidth = '2px';
        } else {
            this.style.borderColor = '#e0e0e0';
            this.style.borderWidth = '1px';
        }
    });
});

document.querySelectorAll('input[type="tel"]').forEach(phoneInput => {
    phoneInput.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = '#e74c3c';
            this.style.borderWidth = '2px';
        } else {
            this.style.borderColor = '#e0e0e0';
            this.style.borderWidth = '1px';
        }
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set initial loading state
    document.body.style.opacity = '0';
    
    // Fade in after load
    setTimeout(function() {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
});