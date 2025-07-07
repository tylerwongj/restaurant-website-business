// Healthy Upscale Template JavaScript

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling
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

// Menu Filter Functionality
function setupMenuFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            menuItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                } else {
                    const category = item.getAttribute('data-category');
                    if (category === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// Form Validation and Submission
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                showNotification('Thank you! Your request has been submitted successfully.', 'success');
                this.reset();
                console.log('Form submitted:', new FormData(this));
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }
        
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showFieldError(field, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        if (field.type === 'tel' && field.value.trim()) {
            const phoneRegex = /^[\d\s\-\(\)\+]+$/;
            if (!phoneRegex.test(field.value) || field.value.length < 10) {
                showFieldError(field, 'Please enter a valid phone number');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e53e3e';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.style.borderColor = '#e53e3e';
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '#e5e7eb';
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        zIndex: '1000',
        maxWidth: '400px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    const colors = {
        success: '#10b981',
        error: '#e53e3e',
        warning: '#f59e0b',
        info: '#2d5016'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Scroll Animation
function setupScrollAnimations() {
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
    
    const animatedElements = document.querySelectorAll('.seasonal-card, .menu-item, .event-card, .wine-item, .principle, .stat-card');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Date Picker Setup
function setupDatePicker() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });
}

// Seasonal Badge Animation
function setupSeasonalBadges() {
    const badges = document.querySelectorAll('.season-badge');
    
    badges.forEach((badge, index) => {
        setTimeout(() => {
            badge.style.animation = 'pulse 2s infinite';
        }, index * 200);
    });
}

// Wine Pairing Highlights
function setupWinePairings() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        const winePair = item.querySelector('.wine-pair');
        if (winePair) {
            item.addEventListener('mouseenter', function() {
                winePair.style.fontWeight = '700';
                winePair.style.color = 'var(--accent-color)';
            });
            
            item.addEventListener('mouseleave', function() {
                winePair.style.fontWeight = 'normal';
                winePair.style.color = 'var(--secondary-color)';
            });
        }
    });
}

// Nutrition Stats Counter
function setupNutritionCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    };
    
    const nutritionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => animateCounter(stat));
                nutritionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const nutritionSection = document.querySelector('.nutrition-section');
    if (nutritionSection) {
        nutritionObserver.observe(nutritionSection);
    }
}

// Advanced Features
function setupAdvancedFeatures() {
    // Dietary tag tooltips
    const dietaryTags = document.querySelectorAll('.tag');
    dietaryTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Calorie info highlights
    const calorieElements = document.querySelectorAll('.calories');
    calorieElements.forEach(cal => {
        const calorieCount = parseInt(cal.textContent);
        if (calorieCount <= 400) {
            cal.style.backgroundColor = 'var(--seasonal-primary)';
        } else if (calorieCount <= 500) {
            cal.style.backgroundColor = 'var(--seasonal-sage)';
        } else {
            cal.style.backgroundColor = 'var(--seasonal-secondary)';
        }
    });
}

// Add CSS animations
function addCustomAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .seasonal-card:hover .season-badge {
            animation: pulse 1s infinite;
        }
        
        .menu-item {
            transition: all 0.3s ease;
        }
        
        .menu-item[data-category]:not([style*="display: none"]) {
            animation: fadeInUp 0.5s ease;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .principle {
            transition: transform 0.3s ease;
        }
        
        .principle:hover {
            transform: translateX(10px);
        }
    `;
    document.head.appendChild(style);
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    setupMenuFilter();
    setupFormValidation();
    setupScrollAnimations();
    setupDatePicker();
    setupSeasonalBadges();
    setupWinePairings();
    setupNutritionCounter();
    setupAdvancedFeatures();
    addCustomAnimations();
    
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        navMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
    }
});

// Export functions for external use
window.HealthyTemplate = {
    showNotification,
    validateForm,
    setupFormValidation,
    setupMenuFilter
};