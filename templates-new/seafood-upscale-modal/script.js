// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const orderModal = document.getElementById('orderModal');
const reservationModal = document.getElementById('reservationModal');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
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
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Order Modal Functions
function openOrderModal() {
    orderModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
    orderModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function startPickupOrder() {
    // Integrate with online ordering system
    alert('Redirecting to pickup ordering system...');
    // In a real implementation, you would redirect to your ordering platform
    // window.location.href = 'https://your-ordering-system.com/pickup';
}

function startDeliveryOrder() {
    // Integrate with delivery system
    alert('Redirecting to delivery ordering system...');
    // In a real implementation, you would redirect to your delivery platform
    // window.location.href = 'https://your-ordering-system.com/delivery';
}

function openCateringForm() {
    closeOrderModal();
    // Open catering form or redirect to catering page
    alert('Opening catering form...');
    // You could open another modal or redirect to a catering page
}

// Reservation Modal Functions
function openReservationModal() {
    reservationModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Set minimum date to today
    const dateInput = reservationModal.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }
}

function closeReservationModal() {
    reservationModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openFullMenu() {
    // Open full menu page or modal
    alert('Opening full menu...');
    // In a real implementation, you would open a full menu page
    // window.location.href = 'menu.html';
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === orderModal) {
        closeOrderModal();
    }
    if (e.target === reservationModal) {
        closeReservationModal();
    }
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeOrderModal();
        closeReservationModal();
    }
});

// Form Handling
document.addEventListener('DOMContentLoaded', function() {
    // Contact Form
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmit(this);
        });
    }

    // Reservation Form
    const reservationForm = document.querySelector('.reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleReservationFormSubmit(this);
        });
    }

    // Initialize animations
    initializeAnimations();
});

function handleContactFormSubmit(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Show success message
        showNotification('Thank you for your reservation request! We will contact you soon.', 'success');
        
        // Reset button
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        submitButton.textContent = 'Book Reservation';
    }, 2000);
}

function handleReservationFormSubmit(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Validate form
    if (!validateReservationForm(form)) {
        return;
    }
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    submitButton.textContent = 'Booking...';

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Show success message
        showNotification('Reservation confirmed! We will send you a confirmation email.', 'success');
        
        // Close modal
        closeReservationModal();
        
        // Reset button
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        submitButton.textContent = 'Confirm Reservation';
    }, 2000);
}

function validateReservationForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'var(--error)';
            isValid = false;
        } else {
            field.style.borderColor = '#ddd';
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields.', 'error');
    }
    
    return isValid;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--error)' : 'var(--primary-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    // Observe elements that should animate
    const animatedElements = document.querySelectorAll('.dish-card, .offer-card, .about-text, .about-image');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Color scheme switcher (for testing different themes)
function switchColorScheme(scheme) {
    const body = document.body;
    body.className = body.className.replace(/color-scheme-\w+/g, '');
    body.classList.add(`color-scheme-${scheme}`);
    
    // Save preference
    localStorage.setItem('colorScheme', scheme);
}

// Load saved color scheme
document.addEventListener('DOMContentLoaded', function() {
    const savedScheme = localStorage.getItem('colorScheme');
    if (savedScheme) {
        switchColorScheme(savedScheme);
    }
});

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
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

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Preload critical images
function preloadCriticalImages() {
    const criticalImages = [
        '{{HERO_IMAGE}}',
        '{{DISH_IMAGE_1}}',
        '{{DISH_IMAGE_2}}'
    ];
    
    criticalImages.forEach(src => {
        if (src && !src.includes('{{')) {
            const img = new Image();
            img.src = src;
        }
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadCriticalImages);

// Analytics tracking (replace with your analytics solution)
function trackEvent(eventName, eventData = {}) {
    // Example: Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Example: Custom analytics
    console.log('Event tracked:', eventName, eventData);
}

// Track user interactions
document.addEventListener('click', function(e) {
    // Track button clicks
    if (e.target.matches('.btn')) {
        trackEvent('button_click', {
            button_text: e.target.textContent.trim(),
            button_type: e.target.className
        });
    }
    
    // Track menu interactions
    if (e.target.matches('.nav-link')) {
        trackEvent('navigation_click', {
            link_text: e.target.textContent.trim(),
            link_href: e.target.getAttribute('href')
        });
    }
});

// Track form submissions
document.addEventListener('submit', function(e) {
    const form = e.target;
    let formType = 'unknown';
    
    if (form.classList.contains('reservation-form')) {
        formType = 'reservation';
    } else if (form.closest('.contact-form')) {
        formType = 'contact';
    }
    
    trackEvent('form_submit', {
        form_type: formType
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You might want to send this to your error tracking service
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}