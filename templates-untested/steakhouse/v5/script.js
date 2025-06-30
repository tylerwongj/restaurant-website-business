// Classic Steakhouse v5 JavaScript

// Mobile Navigation Toggle
function initMobileNavigation() {
    const menuButton = document.querySelector('.menu-button');
    const navigationLinks = document.querySelector('.navigation-links');
    
    if (menuButton && navigationLinks) {
        menuButton.addEventListener('click', () => {
            navigationLinks.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.classic-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 10;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navigationLinks = document.querySelector('.navigation-links');
                const menuButton = document.querySelector('.menu-button');
                if (navigationLinks && navigationLinks.classList.contains('active')) {
                    navigationLinks.classList.remove('active');
                    menuButton.classList.remove('active');
                }
            }
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.classic-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Menu Navigation System
function initMenuNavigation() {
    const menuNavButtons = document.querySelectorAll('.menu-nav-btn');
    const menuSectionContents = document.querySelectorAll('.menu-section-content');
    
    menuNavButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetMenu = button.getAttribute('data-menu');
            
            // Remove active class from all buttons and sections
            menuNavButtons.forEach(btn => btn.classList.remove('active'));
            menuSectionContents.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            button.classList.add('active');
            const targetSection = document.getElementById(targetMenu);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Animate menu items
                const menuItems = targetSection.querySelectorAll('.menu-item, .side-item');
                menuItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    });
}

// Form Validation and Submission
function initReservationForm() {
    const form = document.querySelector('.reservation-form');
    
    if (form) {
        // Set minimum date to today
        const dateInput = form.querySelector('#date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validation
            if (!validateForm(data)) {
                return;
            }
            
            // If all validation passes
            showSubmissionSuccess();
        });
    }
}

// Comprehensive form validation
function validateForm(data) {
    // Required fields validation
    const requiredFields = ['name', 'email', 'phone', 'date', 'time', 'guests'];
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showError(`Please fill in the ${field.replace('_', ' ')} field.`);
            return false;
        }
    }
    
    // Name validation (at least 2 words)
    if (data.name.trim().split(' ').length < 2) {
        showError('Please enter your full name (first and last name).');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showError('Please enter a valid email address.');
        return false;
    }
    
    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    const cleanPhone = data.phone.replace(/\D/g, '');
    if (!phoneRegex.test(data.phone) || cleanPhone.length < 10) {
        showError('Please enter a valid phone number (at least 10 digits).');
        return false;
    }
    
    // Date validation
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showError('Please select a future date.');
        return false;
    }
    
    // Check if date is not too far in the future (90 days)
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 90);
    if (selectedDate > maxDate) {
        showError('Reservations can only be made up to 90 days in advance. Please call for later dates.');
        return false;
    }
    
    // Check if it's not a past time on today's date
    if (selectedDate.toDateString() === today.toDateString()) {
        const selectedTime = data.time;
        const currentTime = new Date().toTimeString().slice(0, 5);
        if (selectedTime <= currentTime) {
            showError('Please select a future time for today\\'s reservations.');
            return false;
        }
    }
    
    return true;
}

// Show error message
function showError(message) {
    // Remove existing error message
    const existingError = document.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and show new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.style.cssText = `
        background: linear-gradient(135deg, #ffebee, #ffcdd2);
        color: #8b4513;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border-left: 4px solid #8b4513;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(139, 69, 19, 0.2);
    `;
    errorDiv.textContent = message;
    
    const form = document.querySelector('.reservation-form');
    const firstGroup = form.querySelector('.input-group');
    firstGroup.parentNode.insertBefore(errorDiv, firstGroup);
    
    // Scroll to error message
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove error message after 6 seconds
    setTimeout(() => {
        if (errorDiv) {
            errorDiv.remove();
        }
    }, 6000);
}

// Show form submission success message
function showSubmissionSuccess() {
    const form = document.querySelector('.reservation-form');
    const restaurantName = document.querySelector('.brand-name').textContent;
    
    form.innerHTML = `
        <div class="success-message" style="text-align: center; padding: 50px 30px;">
            <div style="font-size: 4rem; color: #8b4513; margin-bottom: 25px;">🥩</div>
            <h3 style="color: #2c1810; margin-bottom: 20px; font-family: var(--font-primary); font-size: 2rem;">Reservation Request Submitted</h3>
            <p style="color: #5d4037; margin-bottom: 15px; font-size: 1.1rem;">Thank you for choosing ${restaurantName}.</p>
            <p style="color: #5d4037; margin-bottom: 25px;">We will confirm your reservation by phone within 4 hours during business hours.</p>
            <div style="background: #faf8f3; padding: 20px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #cd853f;">
                <p style="color: #8d6e63; font-size: 14px; margin: 0; font-style: italic;">
                    <strong>What's Next:</strong> Our reservation team will call you to confirm your table and discuss any special requests or dietary accommodations.
                </p>
            </div>
            <button type="button" onclick="location.reload()" style="
                background: #8b4513; 
                color: white; 
                padding: 16px 32px; 
                border: none; 
                border-radius: 8px; 
                cursor: pointer; 
                font-weight: 600;
                font-size: 16px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(139, 69, 19, 0.2);
            " onmouseover="this.style.background='#a0522d'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='#8b4513'; this.style.transform='translateY(0)'">
                Make Another Reservation
            </button>
        </div>
    `;
}

// Intersection Observer for Animation
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
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
    const animateElements = document.querySelectorAll('.menu-item, .heritage-feature, .dining-room, .contact-detail, .quality-badge');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Enhanced menu item animations
function initMenuItemHovers() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (item.classList.contains('premium')) {
                item.style.transform = 'translateY(-5px) scale(1.02)';
                item.style.boxShadow = '0 12px 30px rgba(218, 165, 32, 0.3)';
            } else {
                item.style.transform = 'translateY(-3px)';
                item.style.boxShadow = '0 8px 20px rgba(139, 69, 19, 0.2)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.boxShadow = '';
        });
    });
}

// Heritage image gallery interactions
function initHeritageGallery() {
    const heritageThumb = document.querySelectorAll('.heritage-thumb');
    const mainImage = document.querySelector('.heritage-main-image');
    
    heritageThumb.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Swap images
            const tempSrc = mainImage.src;
            mainImage.src = thumb.src;
            thumb.src = tempSrc;
            
            // Add click effect
            thumb.style.transform = 'scale(0.9)';
            setTimeout(() => {
                thumb.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Phone number formatting
function initPhoneFormatting() {
    const phoneInput = document.querySelector('#phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            }
            e.target.value = value;
        });
    }
}

// Form field enhancements
function initFormEnhancements() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            if (input.value) {
                input.parentElement.classList.add('filled');
            } else {
                input.parentElement.classList.remove('filled');
            }
        });
        
        // Check if already filled on page load
        if (input.value) {
            input.parentElement.classList.add('filled');
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileNavigation();
    initSmoothScrolling();
    initHeaderScroll();
    initMenuNavigation();
    initReservationForm();
    initScrollAnimations();
    initMenuItemHovers();
    initHeritageGallery();
    initPhoneFormatting();
    initFormEnhancements();
    
    // Initialize first menu section animations
    const firstMenuItems = document.querySelectorAll('.menu-section-content.active .menu-item');
    firstMenuItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add CSS for dynamic effects
const style = document.createElement('style');
style.textContent = `
    .classic-header.scrolled {
        background: rgba(250, 248, 243, 0.98);
        box-shadow: 0 4px 20px rgba(139, 69, 19, 0.15);
    }
    
    .navigation-links.active {
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        background: rgba(250, 248, 243, 0.98);
        backdrop-filter: blur(8px);
        flex-direction: column;
        padding: 30px;
        box-shadow: 0 8px 30px rgba(139, 69, 19, 0.2);
        z-index: 999;
        gap: 25px;
    }
    
    .menu-button.active span:nth-child(1) {
        transform: rotate(45deg) translateY(6px);
    }
    
    .menu-button.active span:nth-child(2) {
        opacity: 0;
    }
    
    .menu-button.active span:nth-child(3) {
        transform: rotate(-45deg) translateY(-6px);
    }
    
    @media (max-width: 768px) {
        .navigation-links {
            display: none;
        }
        
        .navigation-links.active {
            display: flex;
        }
    }
    
    .input-group.focused input,
    .input-group.focused select,
    .input-group.focused textarea {
        border-color: #8b4513;
        box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.1);
    }
    
    .input-group.filled label {
        color: #8b4513;
        font-weight: 700;
    }
    
    .menu-item {
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .quality-badge {
        animation: bob 3s ease-in-out infinite;
    }
    
    .quality-badge:nth-child(2) {
        animation-delay: 1s;
    }
    
    .quality-badge:nth-child(3) {
        animation-delay: 2s;
    }
    
    @keyframes bob {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-5px);
        }
    }
    
    .heritage-thumb {
        cursor: pointer;
    }
    
    .heritage-thumb:hover {
        box-shadow: 0 8px 25px rgba(139, 69, 19, 0.3);
    }
`;
document.head.appendChild(style);