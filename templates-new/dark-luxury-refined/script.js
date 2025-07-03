// Dark Luxury Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effects
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.dish-card, .wine-item, .network-item, .philosophy-content, .wine-content'
    );
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Reservation form handling
    const reservationForm = document.querySelector('.reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    setTimeout(() => field.classList.remove('error'), 3000);
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = this.querySelector('[type="email"]');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                    setTimeout(() => emailField.classList.remove('error'), 3000);
                }
            }
            
            // Date validation (must be future date)
            const dateField = this.querySelector('[type="date"]');
            if (dateField && dateField.value) {
                const selectedDate = new Date(dateField.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (selectedDate < today) {
                    isValid = false;
                    dateField.classList.add('error');
                    setTimeout(() => dateField.classList.remove('error'), 3000);
                    showNotification('Please select a future date.', 'error');
                }
            }
            
            if (isValid) {
                // Show success message
                showNotification('Reservation request submitted successfully! We will contact you within 24 hours to confirm.', 'success');
                this.reset();
                console.log('Reservation data:', data);
            } else {
                showNotification('Please fill in all required fields correctly.', 'error');
            }
        });
        
        // Set minimum date to tomorrow
        const dateInput = reservationForm.querySelector('input[type="date"]');
        if (dateInput) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            dateInput.setAttribute('min', tomorrow.toISOString().split('T')[0]);
        }
    }
    
    // Dish card hover effects
    const dishCards = document.querySelectorAll('.dish-card');
    dishCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Parallax effect for hero background
    const heroBackground = document.querySelector('.hero-background img');
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Initialize theme switcher
    initializeThemeSwitcher();
    
    // Initialize animations
    initializeAnimations();
    
    // Preload images
    preloadImages();
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto-remove after 6 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 6000);
}

// Initialize animations
function initializeAnimations() {
    if (!document.querySelector('#dynamic-animations')) {
        const style = document.createElement('style');
        style.id = 'dynamic-animations';
        style.textContent = `
            .fade-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
                transition: opacity 1s ease, transform 1s ease;
            }
            
            .navbar.scrolled {
                background: rgba(26, 26, 26, 0.98) !important;
                box-shadow: 0 2px 20px rgba(0, 0, 0, 0.5) !important;
            }
            
            .hamburger.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
            
            .nav-menu.active {
                display: flex !important;
                flex-direction: column;
                position: fixed;
                top: 100%;
                left: 0;
                width: 100%;
                background: rgba(26, 26, 26, 0.98);
                backdrop-filter: blur(10px);
                padding: 2rem;
                gap: 2rem;
                z-index: 999;
                border-top: 1px solid var(--border);
            }
            
            .error {
                border-color: #dc3545 !important;
                box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.3) !important;
                animation: shake 0.5s ease-in-out;
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1rem 2rem;
                border-radius: 2px;
                color: white;
                font-weight: 500;
                z-index: 2000;
                transform: translateX(400px);
                opacity: 0;
                transition: all 0.3s ease;
                max-width: 350px;
                word-wrap: break-word;
                border-left: 4px solid;
            }
            
            .notification.show {
                transform: translateX(0);
                opacity: 1;
            }
            
            .notification-success {
                background: rgba(40, 167, 69, 0.9);
                border-left-color: #28a745;
            }
            
            .notification-error {
                background: rgba(220, 53, 69, 0.9);
                border-left-color: #dc3545;
            }
            
            .notification-info {
                background: rgba(205, 133, 63, 0.9);
                border-left-color: var(--accent);
            }
            
            @media (max-width: 768px) {
                .nav-menu {
                    display: none;
                }
                
                .notification {
                    top: 80px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Theme switcher functionality
function initializeThemeSwitcher() {
    // Add theme switcher if needed (for demo purposes)
    const themeSwitcher = document.createElement('div');
    themeSwitcher.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: 2px;
        padding: 0.5rem;
        display: none;
    `;
    
    const themes = ['dark-luxury', 'dark-moody', 'charcoal-gold', 'midnight', 'refined-dark'];
    themes.forEach(theme => {
        const button = document.createElement('button');
        button.textContent = theme.replace('-', ' ');
        button.style.cssText = `
            display: block;
            width: 100%;
            padding: 0.5rem;
            margin: 0.25rem 0;
            background: transparent;
            color: var(--text);
            border: 1px solid var(--border);
            cursor: pointer;
        `;
        button.addEventListener('click', () => switchTheme(theme));
        themeSwitcher.appendChild(button);
    });
    
    document.body.appendChild(themeSwitcher);
}

// Theme switching
function switchTheme(themeName) {
    document.body.className = document.body.className.replace(/theme-\w+/, '');
    document.body.classList.add(`theme-${themeName}`);
    localStorage.setItem('preferred-theme', themeName);
}

// Load preferred theme
const preferredTheme = localStorage.getItem('preferred-theme');
if (preferredTheme) {
    switchTheme(preferredTheme);
}

// Preload important images
function preloadImages() {
    const importantImages = [
        // Add any critical images that should be preloaded
    ];
    
    importantImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--accent);
    color: var(--primary);
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    z-index: 999;
    opacity: 0;
    transition: opacity 0.3s ease;
`;

scrollToTopBtn.addEventListener('click', scrollToTop);
document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
    } else {
        scrollToTopBtn.style.opacity = '0';
    }
});

// Export functions for global use
window.showNotification = showNotification;
window.switchTheme = switchTheme;
window.scrollToTop = scrollToTop;