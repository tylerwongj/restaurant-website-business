// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const bookingModal = document.getElementById('bookingModal');

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

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    }
});

// Banner Slider
let currentBanner = 0;
const banners = document.querySelectorAll('.banner-slide');
const indicators = document.querySelectorAll('.indicator');

function showBanner(index) {
    // Hide all banners
    banners.forEach(banner => banner.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show selected banner
    banners[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentBanner = index;
}

// Auto-rotate banners
function autoRotateBanners() {
    currentBanner = (currentBanner + 1) % banners.length;
    showBanner(currentBanner);
}

// Start auto-rotation
setInterval(autoRotateBanners, 5000);

// Booking Modal Functions
function openBookingModal() {
    bookingModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    bookingModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showGameCards() {
    closeBookingModal();
    // In a real implementation, redirect to game card purchase system
    alert('Redirecting to game card purchase...');
    // window.location.href = 'https://your-game-card-system.com';
}

function showTableBooking() {
    closeBookingModal();
    // Show table reservation form or redirect
    alert('Opening table reservation system...');
    // You could open another modal or redirect to a reservation system
}

function showPartyBooking() {
    closeBookingModal();
    // Show party booking form or redirect
    alert('Opening party booking system...');
    // You could redirect to a party booking page
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        closeBookingModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeBookingModal();
    }
});

// Game Card Selection
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for game card options
    const cardOptions = document.querySelectorAll('.card-option');
    cardOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from siblings
            const siblings = this.parentElement.querySelectorAll('.card-option');
            siblings.forEach(sibling => sibling.classList.remove('selected'));
            
            // Add active class to clicked option
            this.classList.add('selected');
            
            // Track selection for booking
            const amount = this.querySelector('.amount').textContent;
            console.log('Selected game card:', amount);
        });
    });

    // Initialize animations
    initializeAnimations();
    
    // Initialize form handling
    initializeForms();
});

// Form Handling
function initializeForms() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmit(this);
        });
    }
}

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
        showNotification('Thank you for your message! We will contact you soon.', 'success');
        
        // Reset button
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#ff6600'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        font-weight: 600;
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
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
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
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements that should animate
    const animatedElements = document.querySelectorAll(
        '.game-card, .menu-category-card, .party-package, .event-card, .game-category'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Party Package Selection
function selectPartyPackage(packageName) {
    // Track which package was selected
    console.log('Selected party package:', packageName);
    
    // You could store this selection and use it in the booking process
    localStorage.setItem('selectedPackage', packageName);
    
    // Show booking modal or redirect to booking form
    showPartyBooking();
}

// Game Category Navigation
function exploreGameCategory(categoryName) {
    console.log('Exploring game category:', categoryName);
    
    // You could show more details about the specific game category
    showNotification(`Exploring ${categoryName}! Visit us to try them out.`, 'info');
}

// Special Offers Interaction
function claimOffer(offerType) {
    console.log('Claiming offer:', offerType);
    
    switch(offerType) {
        case 'gamecard':
            showNotification('Game Card Special! Visit us to claim your bonus.', 'success');
            break;
        case 'happyhour':
            showNotification('Happy Hour! Valid Mon-Fri 3-6pm.', 'success');
            break;
        case 'birthday':
            showPartyBooking();
            break;
        default:
            showNotification('Offer details available at location!', 'info');
    }
}

// Event Registration
function registerForEvent(eventName) {
    console.log('Registering for event:', eventName);
    
    // In a real implementation, you might show a registration form
    showNotification(`Interest noted for ${eventName}! We'll contact you with details.`, 'success');
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
        '{{HERO_VIDEO}}',
        '{{ARCADE_IMAGE}}',
        '{{SPORTS_IMAGE}}'
    ];
    
    criticalImages.forEach(src => {
        if (src && !src.includes('{{')) {
            if (src.endsWith('.mp4')) {
                // Preload video
                const video = document.createElement('video');
                video.preload = 'metadata';
                video.src = src;
            } else {
                // Preload image
                const img = new Image();
                img.src = src;
            }
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
            button_type: e.target.className,
            section: e.target.closest('section')?.id || 'unknown'
        });
    }
    
    // Track navigation clicks
    if (e.target.matches('.nav-link')) {
        trackEvent('navigation_click', {
            link_text: e.target.textContent.trim(),
            link_href: e.target.getAttribute('href')
        });
    }
    
    // Track game category exploration
    if (e.target.closest('.game-category')) {
        const categoryName = e.target.closest('.game-category').querySelector('h3')?.textContent;
        trackEvent('game_category_click', {
            category: categoryName
        });
    }
    
    // Track party package interest
    if (e.target.closest('.party-package')) {
        const packageName = e.target.closest('.party-package').querySelector('h3')?.textContent;
        trackEvent('party_package_interest', {
            package: packageName
        });
    }
});

// Track form submissions
document.addEventListener('submit', function(e) {
    const form = e.target;
    let formType = 'unknown';
    
    if (form.closest('.contact-form')) {
        formType = 'contact';
    }
    
    trackEvent('form_submit', {
        form_type: formType
    });
});

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // In production, you might want to send this to your error tracking service
    trackEvent('javascript_error', {
        error_message: e.error?.message || 'Unknown error',
        error_source: e.filename || 'Unknown file',
        error_line: e.lineno || 0
    });
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

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Add keyboard navigation for accessibility
    if (e.key === 'Tab') {
        // Ensure focus is visible
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    // Remove keyboard navigation class when using mouse
    document.body.classList.remove('keyboard-navigation');
});

// Auto-pause video when not in viewport (performance optimization)
function handleVideoVisibility() {
    const videos = document.querySelectorAll('video');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(e => console.log('Video play failed:', e));
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    videos.forEach(video => videoObserver.observe(video));
}

// Initialize video handling
document.addEventListener('DOMContentLoaded', handleVideoVisibility);