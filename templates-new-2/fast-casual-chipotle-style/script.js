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
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'var(--white)';
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
document.querySelectorAll('.category-item, .featured-item, .nutrition-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Staggered animation for category items
const categoryItems = document.querySelectorAll('.category-item');
categoryItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// Featured items hover effect
document.querySelectorAll('.featured-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
    });
});

// Category items hover effect
document.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Nutrition icons animation
document.querySelectorAll('.nutrition-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(10deg)';
        this.style.backgroundColor = 'var(--accent-red)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.backgroundColor = 'var(--primary-brown)';
    });
});

// Button click effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Order functionality
document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent.includes('Order Now') || button.textContent.includes('Order for Pickup')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Order functionality would be implemented here');
        });
    }
});

// Delivery functionality
document.querySelectorAll('.btn-secondary').forEach(button => {
    if (button.textContent.includes('Order Delivery')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Delivery order functionality would be implemented here');
        });
    }
});

// Rewards program signup
document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent.includes('Join Now')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Rewards program signup functionality would be implemented here');
        });
    }
});

// Catering inquiry
document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent.includes('Learn More')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Catering inquiry functionality would be implemented here');
        });
    }
});

// Nutrition info
document.querySelectorAll('.btn-secondary').forEach(button => {
    if (button.textContent.includes('View Nutrition Info')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Nutrition information would be displayed here');
        });
    }
});

// Location finder
document.querySelectorAll('.btn-secondary').forEach(button => {
    if (button.textContent.includes('Find Location')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Location finder functionality would be implemented here');
        });
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Dynamic color change based on scroll position
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrolled >= sectionTop - 100 && scrolled < sectionTop + sectionHeight - 100) {
            // Add active class to current section
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
});

// Performance optimization
document.addEventListener('DOMContentLoaded', () => {
    // Preload critical images
    const criticalImages = [
        '{{HERO_IMAGE}}',
        '{{MENU_CAT_1_IMAGE}}',
        '{{FEATURED_1_IMAGE}}'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Lazy loading for images
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

// Progressive enhancement for form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add form submission logic here
        alert('Form submission would be handled here');
    });
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus management for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && navMenu.classList.contains('active')) {
        const focusableElements = navMenu.querySelectorAll('a');
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
        }
    }
});