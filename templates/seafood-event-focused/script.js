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
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Promotion card interactions
document.querySelectorAll('.promotion-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h2, h3')?.textContent;
        const tag = this.querySelector('.promotion-tag')?.textContent;
        console.log('Promotion clicked:', title, tag);
        trackInteraction('promotion_click', { title, tag });
        
        // Handle specific promotion actions
        if (this.classList.contains('featured-large')) {
            handleFeaturedPromotion(title);
        } else if (this.classList.contains('happy-hour')) {
            handleHappyHourPromotion();
        } else if (this.classList.contains('seasonal-special')) {
            handleSeasonalPromotion();
        } else if (this.classList.contains('daily-deals')) {
            handleDailyDeals();
        } else if (this.classList.contains('group-dining')) {
            handleGroupDining();
        } else if (this.classList.contains('rewards-program')) {
            handleRewardsProgram();
        }
    });
    
    // Enhanced hover effects
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    });
});

// Dish item interactions
document.querySelectorAll('.dish-item').forEach(dish => {
    dish.addEventListener('click', function() {
        const dishName = this.querySelector('h4').textContent;
        const dishPrice = this.querySelector('.dish-price').textContent;
        const dishBadge = this.querySelector('.dish-badge')?.textContent;
        
        console.log('Dish clicked:', dishName, dishPrice, dishBadge);
        trackInteraction('dish_click', { name: dishName, price: dishPrice, badge: dishBadge });
        
        // Show dish details or add to order
        showDishDetails(dishName, dishPrice);
    });
    
    // Dish hover effects
    dish.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.2)';
    });
    
    dish.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    });
});

// Event type interactions
document.querySelectorAll('.event-type').forEach(eventType => {
    eventType.addEventListener('click', function() {
        const eventTitle = this.querySelector('h3').textContent;
        const eventCapacity = this.querySelector('.event-capacity')?.textContent;
        const eventPrice = this.querySelector('.event-price')?.textContent;
        
        console.log('Event clicked:', eventTitle, eventCapacity, eventPrice);
        trackInteraction('event_click', { 
            title: eventTitle, 
            capacity: eventCapacity, 
            price: eventPrice 
        });
        
        // Open event booking or details
        showEventDetails(eventTitle);
    });
});

// Special calendar interactions
document.querySelectorAll('.calendar-day').forEach(day => {
    day.addEventListener('click', function() {
        const dayTitle = this.querySelector('h4').textContent;
        const specialName = this.querySelector('h5')?.textContent;
        const specialPrice = this.querySelector('.special-price')?.textContent;
        
        console.log('Special day clicked:', dayTitle, specialName, specialPrice);
        trackInteraction('special_click', { 
            day: dayTitle, 
            special: specialName, 
            price: specialPrice 
        });
        
        // Show special details or order
        showSpecialDetails(dayTitle, specialName);
    });
    
    // Day hover effects
    day.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    });
    
    day.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    });
});

// Reservation form handling
const reservationForm = document.querySelector('.reservation-form');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const reservationData = Object.fromEntries(formData);
        
        console.log('Reservation submitted:', reservationData);
        trackInteraction('reservation_submit', reservationData);
        
        // Validate form
        if (validateReservationForm(reservationData)) {
            submitReservation(reservationData);
        }
    });
}

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[name="email"]').value;
        console.log('Newsletter signup:', email);
        trackInteraction('newsletter_signup', { email });
        
        if (validateEmail(email)) {
            submitNewsletterSignup(email);
        }
    });
}

// Button interactions
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const buttonText = this.textContent.trim();
        const buttonClass = this.className;
        const href = this.getAttribute('href');
        
        console.log('Button clicked:', buttonText, buttonClass);
        trackInteraction('button_click', { 
            text: buttonText, 
            class: buttonClass, 
            href: href 
        });
        
        // Handle specific button actions
        if (this.classList.contains('btn-hero-primary')) {
            handleHeroPrimaryAction();
        } else if (this.classList.contains('btn-hero-secondary')) {
            handleHeroSecondaryAction();
        } else if (this.classList.contains('btn-rewards-large')) {
            handleRewardsSignup();
        }
    });
    
    // Button hover effects
    button.addEventListener('mouseenter', function() {
        if (!this.classList.contains('btn-small')) {
            this.style.transform = 'translateY(-2px)';
        }
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Social media link tracking
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function() {
        const platform = this.className.split(' ').find(cls => 
            ['facebook', 'instagram', 'twitter', 'yelp'].includes(cls)
        ) || 'unknown';
        
        console.log('Social media clicked:', platform);
        trackInteraction('social_click', { platform });
    });
});

// Contact link tracking
document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function() {
        const type = this.getAttribute('href').startsWith('tel:') ? 'phone' : 'email';
        const value = this.getAttribute('href').replace(/^(tel:|mailto:)/, '');
        
        console.log('Contact clicked:', type, value);
        trackInteraction('contact_click', { type, value });
    });
});

// Form validation functions
function validateReservationForm(data) {
    const required = ['party_size', 'date', 'time', 'name', 'phone', 'email'];
    const missing = required.filter(field => !data[field] || data[field].trim() === '');
    
    if (missing.length > 0) {
        showNotification(`Please fill in: ${missing.join(', ')}`, 'error');
        return false;
    }
    
    if (!validateEmail(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    if (!validatePhone(data.phone)) {
        showNotification('Please enter a valid phone number', 'error');
        return false;
    }
    
    // Check if date is in the future
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showNotification('Please select a future date', 'error');
        return false;
    }
    
    return true;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
}

// Action handlers
function handleFeaturedPromotion(title) {
    console.log('Handling featured promotion:', title);
    // Redirect to menu or order page
    window.location.href = '#menu';
}

function handleHappyHourPromotion() {
    console.log('Handling happy hour promotion');
    showNotification('Happy Hour details: Check our current offers!', 'info');
}

function handleSeasonalPromotion() {
    console.log('Handling seasonal promotion');
    window.location.href = '#menu';
}

function handleDailyDeals() {
    console.log('Handling daily deals');
    window.location.href = '#specials';
}

function handleGroupDining() {
    console.log('Handling group dining');
    window.location.href = '#events';
}

function handleRewardsProgram() {
    console.log('Handling rewards program');
    window.location.href = '#rewards';
}

function handleRewardsSignup() {
    console.log('Handling rewards signup');
    // Redirect to rewards signup page
    window.open('#rewards-signup', '_blank');
}

function handleHeroPrimaryAction() {
    console.log('Handling hero primary action');
    window.location.href = '#menu';
}

function handleHeroSecondaryAction() {
    console.log('Handling hero secondary action');
    window.location.href = '#events';
}

function showDishDetails(name, price) {
    console.log('Showing dish details:', name, price);
    showNotification(`${name} - ${price}. Click to order or view full menu!`, 'info');
}

function showEventDetails(title) {
    console.log('Showing event details:', title);
    showNotification(`${title} - Contact us for booking details!`, 'info');
}

function showSpecialDetails(day, special) {
    console.log('Showing special details:', day, special);
    showNotification(`${day}: ${special} - Available today!`, 'info');
}

// Form submission functions
function submitReservation(data) {
    console.log('Submitting reservation:', data);
    
    // Show loading state
    const submitButton = document.querySelector('.btn-reservation');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Booking...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        showNotification('Reservation request submitted! We will contact you to confirm.', 'success');
        
        // Reset form
        document.querySelector('.reservation-form').reset();
        
        // Track successful submission
        trackInteraction('reservation_success', data);
    }, 2000);
}

function submitNewsletterSignup(email) {
    console.log('Submitting newsletter signup:', email);
    
    const submitButton = document.querySelector('.btn-newsletter');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Joining...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        
        // Reset form
        document.querySelector('.newsletter-form').reset();
        
        trackInteraction('newsletter_success', { email });
    }, 1500);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const styles = {
        info: { background: '#2196f3', color: 'white' },
        success: { background: '#4caf50', color: 'white' },
        error: { background: '#f44336', color: 'white' },
        warning: { background: '#ff9800', color: 'white' }
    };
    
    const style = styles[type] || styles.info;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${style.background};
        color: ${style.color};
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animations to elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.promotion-card, .dish-item, .event-type, .calendar-day, .promise-item, .tier'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        fadeObserver.observe(el);
    });
});

// Analytics and tracking
function trackInteraction(action, data = null) {
    console.log(`Seafood restaurant interaction: ${action}`, data);
    
    // Google Analytics integration
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            custom_parameter: data,
            event_category: 'seafood_restaurant',
            event_label: data?.title || data?.name || 'unknown'
        });
    }
    
    // Custom analytics
    if (window.seafoodAnalytics) {
        window.seafoodAnalytics.track(action, data);
    }
    
    // Send to server endpoint
    if (window.location.hostname !== 'localhost') {
        fetch('/api/analytics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action,
                data,
                timestamp: new Date().toISOString(),
                url: window.location.href,
                userAgent: navigator.userAgent
            })
        }).catch(err => console.log('Analytics error:', err));
    }
}

// Performance monitoring
window.addEventListener('load', function() {
    const perfData = performance.timing;
    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    console.log(`Seafood event-focused template load time: ${loadTime}ms`);
    trackInteraction('page_load_performance', { loadTime });
    
    // Track Core Web Vitals
    if ('web-vital' in window) {
        getCLS(trackInteraction.bind(null, 'cls'));
        getFID(trackInteraction.bind(null, 'fid'));
        getFCP(trackInteraction.bind(null, 'fcp'));
        getLCP(trackInteraction.bind(null, 'lcp'));
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error in seafood template:', e.error);
    
    trackInteraction('javascript_error', {
        message: e.error?.message || e.message,
        filename: e.filename,
        lineno: e.lineno,
        stack: e.error?.stack
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Enter key on focusable elements
    if (e.key === 'Enter') {
        const focused = document.activeElement;
        if (focused && (
            focused.classList.contains('promotion-card') ||
            focused.classList.contains('dish-item') ||
            focused.classList.contains('event-type') ||
            focused.classList.contains('calendar-day')
        )) {
            focused.click();
        }
    }
});

// Touch device optimizations
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Reduce hover effects on touch devices
    const style = document.createElement('style');
    style.textContent = `
        .touch-device .promotion-card:hover,
        .touch-device .dish-item:hover,
        .touch-device .event-type:hover,
        .touch-device .calendar-day:hover {
            transform: none !important;
        }
    `;
    document.head.appendChild(style);
}

// Theme switching functionality
function switchTheme(themeName) {
    document.body.className = `theme-${themeName}`;
    localStorage.setItem('seafoodTheme', `theme-${themeName}`);
    trackInteraction('theme_change', { themeName });
}

// Restore saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('seafoodTheme');
    if (savedTheme) {
        document.body.className = savedTheme;
    }
});

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
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

// Auto-scroll promotions (optional)
function initAutoScrollPromotions() {
    const promotionsSection = document.querySelector('.promotions-section');
    if (!promotionsSection) return;
    
    let isScrolling = false;
    
    // Auto-scroll every 10 seconds if user is not interacting
    setInterval(() => {
        if (!isScrolling && !document.querySelector('.promotion-card:hover')) {
            const nextPromotion = document.querySelector('.promotion-card:not(.viewed)');
            if (nextPromotion) {
                nextPromotion.scrollIntoView({ behavior: 'smooth', block: 'center' });
                nextPromotion.classList.add('viewed');
            }
        }
    }, 10000);
    
    // Pause auto-scroll when user is scrolling
    window.addEventListener('scroll', () => {
        isScrolling = true;
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 2000);
    });
}

// Date input enhancement for reservations
function enhanceReservationForm() {
    const dateInput = document.querySelector('#reservation-date');
    if (dateInput) {
        // Set minimum date to today
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        dateInput.min = `${yyyy}-${mm}-${dd}`;
        
        // Set maximum date to 6 months from now
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 6);
        const maxYyyy = maxDate.getFullYear();
        const maxMm = String(maxDate.getMonth() + 1).padStart(2, '0');
        const maxDd = String(maxDate.getDate()).padStart(2, '0');
        dateInput.max = `${maxYyyy}-${maxMm}-${maxDd}`;
    }
}

// Export functions for external use
window.seafoodRestaurant = {
    trackInteraction,
    showNotification,
    switchTheme,
    validateEmail,
    validatePhone,
    submitReservation,
    submitNewsletterSignup
};

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Seafood event-focused template loaded successfully');
    
    // Initialize enhancements
    lazyLoadImages();
    enhanceReservationForm();
    initAutoScrollPromotions();
    
    // Track page view
    trackInteraction('page_view', {
        template: 'seafood-event-focused',
        timestamp: new Date().toISOString(),
        referrer: document.referrer
    });
});