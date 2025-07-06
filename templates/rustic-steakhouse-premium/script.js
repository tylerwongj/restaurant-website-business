// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced navbar scroll effect with rustic styling
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(250, 248, 245, 0.98)';
        navbar.style.backdropFilter = 'blur(24px)';
        navbar.style.borderBottom = '3px solid #8D6E63';
        navbar.style.boxShadow = '0 4px 20px rgba(139, 69, 19, 0.2)';
    } else {
        navbar.style.background = 'rgba(250, 248, 245, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.borderBottom = '2px solid #8D6E63';
        navbar.style.boxShadow = 'none';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Reservation form handling with steakhouse-specific validation
const reservationForm = document.querySelector('.reservation-form form');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const date = formData.get('date');
        const time = formData.get('time');
        const guests = formData.get('guests');
        const special = formData.get('special');
        
        // Enhanced validation
        if (!name || !phone || !date || !time || !guests) {
            showSteakhouseNotification('Please fill in all required fields for your reservation.', 'error');
            return;
        }
        
        // Phone validation
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
            showSteakhouseNotification('Please enter a valid phone number.', 'error');
            return;
        }
        
        // Date validation (must be future date)
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showSteakhouseNotification('Please select a future date for your reservation.', 'error');
            return;
        }
        
        // Submit button state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing Reservation...';
        submitBtn.disabled = true;
        
        // Simulate reservation processing
        setTimeout(() => {
            showSteakhouseNotification(
                `Thank you, ${name}! Your reservation request for ${guests} guest${guests !== '1' ? 's' : ''} on ${formatDate(selectedDate)} at ${time} has been received. We'll call you at ${phone} to confirm within 30 minutes.`, 
                'success'
            );
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Custom notification system with steakhouse styling
function showSteakhouseNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `steakhouse-notification notification-${type}`;
    
    const colors = {
        success: '#228B22',
        error: '#8B0000',
        info: '#8B4513'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: ${colors[type]};
        color: #FAF8F5;
        padding: 20px;
        border-radius: 0;
        border: 3px solid #654321;
        box-shadow: 0 8px 24px rgba(139, 69, 19, 0.3);
        z-index: 10000;
        max-width: 400px;
        font-family: 'Merriweather', serif;
        animation: slideInFromRight 0.4s ease;
    `;
    
    // Add animation styles
    if (!document.querySelector('#steakhouse-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'steakhouse-notification-styles';
        style.textContent = `
            @keyframes slideInFromRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-content {
                display: flex;
                align-items: flex-start;
                gap: 15px;
            }
            .notification-message {
                flex: 1;
                line-height: 1.5;
            }
            .notification-close {
                background: none;
                border: none;
                color: #FAF8F5;
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                margin: 0;
                line-height: 1;
                font-family: 'Oswald', sans-serif;
            }
            .notification-close:hover {
                color: #DAA520;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideInFromRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideInFromRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 6000);
}

// Date formatting helper
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Intersection Observer for scroll animations
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

// Initialize scroll animations with stagger effects
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        '.cut-item, .feature-item, .category, .detail-item, .contact-item'
    );
    
    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});

// Enhanced hover effects for cut items
document.querySelectorAll('.cut-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
        this.style.transition = 'all 0.4s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Scroll to top button with rustic styling
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top-steakhouse';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 32px;
    right: 32px;
    width: 56px;
    height: 56px;
    background: #8B4513;
    color: #FAF8F5;
    border: 3px solid #654321;
    border-radius: 0;
    font-size: 20px;
    font-weight: 700;
    font-family: 'Oswald', sans-serif;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'scale(1)';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'scale(0.8)';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.background = '#654321';
    this.style.borderColor = '#8B4513';
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 6px 16px rgba(139, 69, 19, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.background = '#8B4513';
    this.style.borderColor = '#654321';
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 4px 12px rgba(139, 69, 19, 0.3)';
});

// Form field enhancements
document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.style.borderColor = '#8B4513';
        this.style.boxShadow = '0 0 0 3px rgba(139, 69, 19, 0.1)';
    });
    
    field.addEventListener('blur', function() {
        if (!this.value) {
            this.style.borderColor = '#D7CCC8';
            this.style.boxShadow = 'none';
        }
    });
});

// Initialize date picker with minimum date (today)
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }
});

// Tradition section parallax effect
window.addEventListener('scroll', () => {
    const traditionSection = document.querySelector('.tradition');
    const traditionImages = document.querySelector('.tradition-images');
    
    if (traditionSection && traditionImages) {
        const rect = traditionSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView) {
            const scrolled = window.pageYOffset;
            const sectionTop = traditionSection.offsetTop;
            const parallaxOffset = (scrolled - sectionTop) * 0.1;
            traditionImages.style.transform = `translateY(${parallaxOffset}px)`;
        }
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        
        // Close any open notifications
        document.querySelectorAll('.steakhouse-notification').forEach(notification => {
            notification.style.animation = 'slideInFromRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        });
    }
});

// Add focus styles for accessibility
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .btn:focus,
        .nav-menu a:focus,
        input:focus,
        select:focus,
        textarea:focus {
            outline: 3px solid #DAA520;
            outline-offset: 2px;
        }
        
        .cut-item:focus {
            outline: 3px solid #DAA520;
            outline-offset: 4px;
        }
    `;
    document.head.appendChild(style);
    
    // Make cut items focusable
    document.querySelectorAll('.cut-item').forEach(item => {
        item.setAttribute('tabindex', '0');
    });
});

// Performance optimization - lazy load images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
});

console.log('🥩 Rustic Steakhouse Template Loaded Successfully! Welcome to fine dining excellence.');