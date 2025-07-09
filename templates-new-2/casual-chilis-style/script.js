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
document.querySelectorAll('.promo-item, .menu-category, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Staggered animation for promo items
const promoItems = document.querySelectorAll('.promo-item');
promoItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.2}s`;
});

// Menu category hover effects
document.querySelectorAll('.menu-category').forEach(category => {
    category.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    category.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Promotional banner rotation
const promoBanners = document.querySelectorAll('.promo-item');
let currentBanner = 0;

function rotateBanners() {
    promoBanners.forEach((banner, index) => {
        banner.style.opacity = index === currentBanner ? '1' : '0.7';
    });
    currentBanner = (currentBanner + 1) % promoBanners.length;
}

// Rotate banners every 5 seconds
setInterval(rotateBanners, 5000);

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

// Rewards signup functionality
document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent.includes('Sign Up Now')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Rewards program signup functionality would be implemented here');
        });
    }
});

// Happy hour menu functionality
document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent.includes('View Happy Hour Menu')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Happy hour menu functionality would be implemented here');
        });
    }
});

// Order functionality
document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent.includes('Order Now')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Order functionality would be implemented here');
        });
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Performance optimization
document.addEventListener('DOMContentLoaded', () => {
    // Preload critical images
    const criticalImages = [
        '{{HERO_IMAGE}}',
        '{{PROMO_1_IMAGE}}',
        '{{HAPPY_HOUR_IMAGE}}'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Lazy loading for non-critical images
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