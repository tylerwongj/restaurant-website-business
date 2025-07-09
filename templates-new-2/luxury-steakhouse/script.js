/* ==========================================================================
   Luxury Steakhouse Template - JavaScript
   ========================================================================== */

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-menu a');

// Mobile Navigation Toggle
function toggleMobileNav() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('nav-open');
}

// Close mobile navigation
function closeMobileNav() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('nav-open');
}

// Event Listeners
if (hamburger) {
    hamburger.addEventListener('click', toggleMobileNav);
}

// Close mobile nav when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
});

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        closeMobileNav();
    }
});

// Navbar scroll effect
function handleScroll() {
    const scrolled = window.scrollY > 50;
    navbar.classList.toggle('scrolled', scrolled);
}

window.addEventListener('scroll', handleScroll);

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile nav if open
                closeMobileNav();
            }
        });
    });
}

// Initialize smooth scrolling
initSmoothScrolling();

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.menu-item, .feature, .info-section');
    animatedElements.forEach(el => observer.observe(el));
}

// Initialize scroll animations
initScrollAnimations();

// Form handling
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData);
            
            // Basic validation
            if (!validateForm(formObject)) {
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                alert('Thank you for your reservation request! We will contact you shortly.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    });
}

// Basic form validation
function validateForm(formData) {
    const requiredFields = ['name', 'email', 'phone'];
    
    for (let field of requiredFields) {
        if (!formData[field] || formData[field].trim() === '') {
            alert(`Please fill in the ${field} field.`);
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    return true;
}

// Initialize form handling
initFormHandling();

// Image loading optimization
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.classList.add('loading');
        
        img.addEventListener('load', () => {
            img.classList.remove('loading');
            img.classList.add('loaded');
        });
        
        img.addEventListener('error', () => {
            img.classList.remove('loading');
            img.style.display = 'none';
        });
    });
}

// Initialize image loading
initImageLoading();

// Lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
initLazyLoading();

// Preload critical images
function preloadCriticalImages() {
    const criticalImages = [
        'images/hero.jpg',
        'images/logo.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Preload critical images
preloadCriticalImages();

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add any additional initialization here
    console.log('Luxury Steakhouse template loaded successfully');
});

// Handle window resize
function handleResize() {
    // Close mobile nav on resize to desktop
    if (window.innerWidth > 768) {
        closeMobileNav();
    }
}

window.addEventListener('resize', handleResize);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile nav with Escape key
    if (e.key === 'Escape') {
        closeMobileNav();
    }
});

// Focus management for accessibility
function initFocusManagement() {
    const focusableElements = document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #FFD700';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Initialize focus management
initFocusManagement();

// Performance monitoring
function initPerformanceMonitoring() {
    // Log page load time
    window.addEventListener('load', function() {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}

// Initialize performance monitoring
initPerformanceMonitoring();

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleMobileNav,
        closeMobileNav,
        validateForm,
        handleScroll
    };
}