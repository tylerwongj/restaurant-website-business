// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
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
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Reset hamburger animation
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
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
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Enhanced validation
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        let firstInvalidField = null;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ef4444';
                field.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.3)';
                if (!firstInvalidField) {
                    firstInvalidField = field;
                }
            } else {
                field.style.borderColor = '#f3e8ff';
                field.style.boxShadow = 'none';
            }
        });
        
        // Email validation
        const emailField = this.querySelector('input[type="email"]');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                isValid = false;
                emailField.style.borderColor = '#ef4444';
                emailField.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.3)';
                if (!firstInvalidField) {
                    firstInvalidField = emailField;
                }
            }
        }
        
        if (!isValid) {
            alert('Please fill in all required fields correctly.');
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
            return;
        }
        
        // Show success message with animation
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = 'Sending...';
        button.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 1000);
    });
}

// Navbar scroll effect with color transition
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(124, 45, 146, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(124, 45, 146, 0.1)';
    }
});

// Parallax effect for hero shapes
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add stagger effect for grid items
            if (entry.target.classList.contains('highlight-card') || 
                entry.target.classList.contains('gallery-item') ||
                entry.target.classList.contains('info-card')) {
                const siblings = entry.target.parentElement.children;
                const index = Array.from(siblings).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.highlight-card, .gallery-item, .about-text, .about-visual, .info-card, .hours-info, .hours-visual, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeInObserver.observe(el);
});

// Gallery hover effects
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Image error handling with styled placeholders
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        const placeholder = document.createElement('div');
        placeholder.style.width = '100%';
        placeholder.style.height = this.style.height || '300px';
        placeholder.style.background = 'linear-gradient(135deg, #f3e8ff, #fdf2f8)';
        placeholder.style.display = 'flex';
        placeholder.style.alignItems = 'center';
        placeholder.style.justifyContent = 'center';
        placeholder.style.color = '#9333ea';
        placeholder.style.fontSize = '16px';
        placeholder.style.fontWeight = 'bold';
        placeholder.style.borderRadius = '15px';
        placeholder.innerHTML = '<div>🍽️<br>Image Loading...</div>';
        placeholder.style.textAlign = 'center';
        
        this.parentNode.replaceChild(placeholder, this);
    });
});

// Phone and email click tracking
document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
    phoneLink.addEventListener('click', function(e) {
        console.log('Phone number clicked:', this.href);
        // Add analytics tracking here if needed
    });
});

document.querySelectorAll('a[href^="mailto:"]').forEach(emailLink => {
    emailLink.addEventListener('click', function(e) {
        console.log('Email link clicked:', this.href);
        // Add analytics tracking here if needed
    });
});

// Dynamic color scheme switching function
function changeColorScheme(scheme) {
    const body = document.body;
    const schemes = ['classic', 'business', 'warm', 'cool', 'bold'];
    
    schemes.forEach(s => {
        body.classList.remove(`color-scheme-${s}`);
    });
    
    body.classList.add(`color-scheme-${scheme}`);
    localStorage.setItem('preferredColorScheme', scheme);
    
    // Animate the transition
    body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
}

// Load saved color scheme preference
document.addEventListener('DOMContentLoaded', function() {
    const savedScheme = localStorage.getItem('preferredColorScheme');
    if (savedScheme) {
        changeColorScheme(savedScheme);
    }
});

// Enhanced button hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Card hover sound effect simulation (visual feedback)
document.querySelectorAll('.highlight-card, .info-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Scroll to top functionality
let scrollTopBtn;

function createScrollTopButton() {
    scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(124, 45, 146, 0.3);
    `;
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.body.appendChild(scrollTopBtn);
}

window.addEventListener('scroll', function() {
    if (!scrollTopBtn) createScrollTopButton();
    
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.transform = 'translateY(20px)';
    }
});

// Page loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Trigger entrance animations
    setTimeout(() => {
        document.querySelectorAll('.hero-text > *').forEach((el, index) => {
            el.style.animation = `slideInUp 0.8s ease ${index * 0.1}s both`;
        });
    }, 200);
});

// Add CSS keyframes for entrance animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize page with fade-in
document.body.style.opacity = '0';

// Real-time form validation with visual feedback
document.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', function() {
        if (this.hasAttribute('required') && this.value.trim()) {
            this.style.borderColor = '#10b981';
            this.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.2)';
        } else if (this.hasAttribute('required')) {
            this.style.borderColor = '#f3e8ff';
            this.style.boxShadow = 'none';
        }
    });
    
    field.addEventListener('blur', function() {
        if (this.type === 'email' && this.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(this.value)) {
                this.style.borderColor = '#10b981';
                this.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.2)';
            } else {
                this.style.borderColor = '#ef4444';
                this.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.3)';
            }
        }
    });
});