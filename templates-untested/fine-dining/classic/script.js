// Classic Fine Dining Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeScrollEffects();
    initializeFormHandling();
    initializeAnimations();
    initializeImageEffects();
});

// Navigation Functions
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 85; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    // Enhanced navbar scroll effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            navbar.style.backgroundColor = 'rgba(250, 249, 246, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.boxShadow = '0 4px 20px rgba(44, 24, 16, 0.15)';
            navbar.style.borderBottom = '1px solid rgba(218, 165, 32, 0.3)';
        } else {
            navbar.style.backgroundColor = 'rgba(250, 249, 246, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid #d4c5a0';
        }
    });

    // Parallax effect for background sections
    const parallaxSections = document.querySelectorAll('.hero, .wine');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxSections.forEach(section => {
            const rate = scrolled * -0.3;
            section.style.backgroundPosition = `center ${rate}px`;
        });
    });

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special handling for staggered animations
                if (entry.target.classList.contains('signature-dish')) {
                    const dishes = document.querySelectorAll('.signature-dish');
                    const index = Array.from(dishes).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.2}s`;
                }
                
                if (entry.target.classList.contains('accolade')) {
                    const accolades = document.querySelectorAll('.accolade');
                    const index = Array.from(accolades).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.15}s`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.signature-dish, .tasting-menu, .accolade, .wine-highlight, .venue, .contact-section'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Form Handling
function initializeFormHandling() {
    const form = document.getElementById('reservationForm');
    if (!form) return;

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        // Set default date to 7 days from today for better UX
        const weekFromToday = new Date();
        weekFromToday.setDate(weekFromToday.getDate() + 7);
        dateInput.value = weekFromToday.toISOString().split('T')[0];
    }

    // Enhanced form validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(this);
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = value.replace(/\D/g, '');
        if (cleanPhone.length < 10) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    // Date validation
    if (field.type === 'date' && value) {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showFieldError(field, 'Please select a future date');
            return false;
        }
        
        // Check if it's too far in advance (e.g., more than 3 months)
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        if (selectedDate > maxDate) {
            showFieldError(field, 'Reservations are limited to 3 months in advance');
            return false;
        }
    }
    
    clearFieldError(field);
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #8b4513;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        font-style: italic;
        animation: fadeInUp 0.3s ease;
    `;
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#8b4513';
    field.style.backgroundColor = 'rgba(139, 69, 19, 0.05)';
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
    field.style.backgroundColor = '';
}

function handleFormSubmission(form) {
    // Validate all fields
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('Please correct the errors above before submitting.', 'error');
        return;
    }
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    showLoadingState(true);
    
    // Simulate API call with realistic delay
    setTimeout(() => {
        showLoadingState(false);
        
        // Show success message with reservation details
        const guestCount = data.guests;
        const date = new Date(data.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const time = convertTo12Hour(data.time);
        
        showNotification(
            `Thank you, ${data.firstName}! Your reservation request for ${guestCount} guest${guestCount !== '1' ? 's' : ''} on ${date} at ${time} has been submitted. We will contact you within 24 hours to confirm your reservation.`,
            'success'
        );
        
        form.reset();
        
        // Reset date to week from today
        const weekFromToday = new Date();
        weekFromToday.setDate(weekFromToday.getDate() + 7);
        document.getElementById('date').value = weekFromToday.toISOString().split('T')[0];
        
        // Add celebration effect
        addCelebrationEffect();
        
    }, 2500);
}

function convertTo12Hour(time24) {
    const [hours, minutes] = time24.split(':');
    const hour12 = hours % 12 || 12;
    const ampm = hours < 12 ? 'AM' : 'PM';
    return `${hour12}:${minutes} ${ampm}`;
}

// Animation Functions
function initializeAnimations() {
    // Typewriter effect for hero content
    const heroText = document.querySelector('.hero-content h1');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        heroText.style.borderRight = '3px solid #daa520';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            heroText.textContent += text.charAt(i);
            i++;
            if (i > text.length) {
                clearInterval(typeWriter);
                heroText.style.borderRight = 'none';
            }
        }, 100);
    }
    
    // Floating animation for ornamental elements
    const ornaments = document.querySelectorAll('.ornament-center, .logo-crest');
    ornaments.forEach(ornament => {
        ornament.style.animation = 'float 4s ease-in-out infinite';
    });
    
    // Hover effects for signature dishes
    const dishes = document.querySelectorAll('.signature-dish');
    dishes.forEach(dish => {
        dish.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(44, 24, 16, 0.25)';
        });
        
        dish.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(44, 24, 16, 0.1)';
        });
    });
    
    // Wine cellar stats counter animation
    animateStatsOnScroll();
}

function animateStatsOnScroll() {
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.7 });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/\d/g, '');
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const step = number / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Image Effects
function initializeImageEffects() {
    // Lazy loading with elegant fade-in
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.6s ease';
                
                img.onload = function() {
                    this.style.opacity = '1';
                };
                
                if (img.complete) {
                    img.style.opacity = '1';
                }
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Portrait frame hover effect
    const portraitFrame = document.querySelector('.portrait-frame');
    if (portraitFrame) {
        portraitFrame.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(1deg)';
            this.style.boxShadow = '0 30px 60px rgba(44, 24, 16, 0.4)';
        });
        
        portraitFrame.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 20px 40px rgba(44, 24, 16, 0.3)';
        });
    }
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const colors = {
        success: '#2c5530',
        error: '#8b4513',
        warning: '#b8860b',
        info: '#2c1810'
    };
    
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">${icons[type]}</div>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: #f5f5dc;
        padding: 20px 24px;
        border-radius: 8px;
        box-shadow: 0 20px 40px rgba(44, 24, 16, 0.3);
        z-index: 10000;
        max-width: 450px;
        animation: slideInRight 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        font-family: 'Crimson Text', serif;
        font-size: 0.9rem;
        line-height: 1.6;
        border: 2px solid #daa520;
    `;
    
    document.body.appendChild(notification);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    });
    
    // Auto remove
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOutRight 0.4s ease';
            setTimeout(() => notification.remove(), 400);
        }
    }, type === 'success' ? 8000 : 6000);
}

function showLoadingState(isLoading) {
    const submitBtn = document.querySelector('#reservationForm button[type="submit"]');
    if (!submitBtn) return;
    
    if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <div class="loading-spinner"></div>
            Processing Your Request...
        `;
        submitBtn.style.opacity = '0.8';
        submitBtn.style.cursor = 'not-allowed';
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Submit Reservation Request';
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
    }
}

function addCelebrationEffect() {
    // Create elegant celebration animation
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const celebration = document.createElement('div');
            celebration.innerHTML = '❖';
            celebration.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 3rem;
                color: #daa520;
                z-index: 10001;
                animation: celebrateClassic 2s ease;
                pointer-events: none;
            `;
            
            document.body.appendChild(celebration);
            
            setTimeout(() => {
                celebration.remove();
            }, 2000);
        }, i * 200);
    }
}

// Add required CSS animations
window.addEventListener('load', function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes celebrateClassic {
            0% { 
                transform: translate(-50%, -50%) scale(0) rotate(0deg); 
                opacity: 0; 
            }
            50% { 
                transform: translate(-50%, -50%) scale(1.5) rotate(180deg); 
                opacity: 1; 
            }
            100% { 
                transform: translate(-50%, -50%) scale(1) rotate(360deg); 
                opacity: 0; 
            }
        }
        
        @keyframes float {
            0%, 100% { 
                transform: translateY(0px); 
            }
            50% { 
                transform: translateY(-10px); 
            }
        }
        
        .loading-spinner {
            display: inline-block;
            width: 18px;
            height: 18px;
            border: 2px solid rgba(245, 245, 220, 0.3);
            border-radius: 50%;
            border-top-color: #f5f5dc;
            animation: spin 1s linear infinite;
            margin-right: 10px;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .notification-icon {
            font-size: 1.5rem;
            font-weight: bold;
            color: #daa520;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #f5f5dc;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
            opacity: 0.8;
            transition: opacity 0.2s ease;
            font-family: 'Cormorant Garamond', serif;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        .signature-dish {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .portrait-frame {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);
});