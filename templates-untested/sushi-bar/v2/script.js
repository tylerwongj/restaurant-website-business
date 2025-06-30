// Authentic Sushi Bar - v2 JavaScript

// Mobile Navigation Toggle
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('.link');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.clean-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 10;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const navToggle = document.querySelector('.nav-toggle');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.clean-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Menu Tabs Functionality
function initMenuTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetCategory = button.getAttribute('data-category');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            const targetPanel = document.getElementById(targetCategory);
            if (targetPanel) {
                targetPanel.classList.add('active');
                
                // Animate menu items
                const menuItems = targetPanel.querySelectorAll('.menu-item');
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
            if (!validateReservationForm(data)) {
                return;
            }
            
            // If all validation passes
            showReservationSuccess();
        });
    }
}

// Form validation function
function validateReservationForm(data) {
    // Required fields validation
    const requiredFields = ['name', 'email', 'phone', 'date', 'time', 'guests'];
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showFormError(`Please fill in the ${field.replace('_', ' ')} field.`);
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showFormError('Please enter a valid email address.');
        return false;
    }
    
    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(data.phone) || data.phone.replace(/\D/g, '').length < 10) {
        showFormError('Please enter a valid phone number.');
        return false;
    }
    
    // Date validation
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showFormError('Please select a future date.');
        return false;
    }
    
    // Check if date is not too far in the future (6 months)
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 6);
    if (selectedDate > maxDate) {
        showFormError('Reservations can only be made up to 6 months in advance.');
        return false;
    }
    
    return true;
}

// Show form error message
function showFormError(message) {
    // Remove existing error message
    const existingError = document.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and show new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.style.cssText = `
        background: #fee2e2;
        color: #dc2626;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 16px;
        border-left: 4px solid #dc2626;
        font-weight: 500;
        font-size: 14px;
    `;
    errorDiv.textContent = message;
    
    const form = document.querySelector('.reservation-form');
    const firstField = form.querySelector('.field');
    firstField.parentNode.insertBefore(errorDiv, firstField);
    
    // Scroll to error message
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        if (errorDiv) {
            errorDiv.remove();
        }
    }, 5000);
}

// Show form submission success message
function showReservationSuccess() {
    const form = document.querySelector('.reservation-form');
    const originalHTML = form.innerHTML;
    
    form.innerHTML = `
        <div class="success-message" style="text-align: center; padding: 40px 20px;">
            <div style="font-size: 3rem; color: #059669; margin-bottom: 20px;">✓</div>
            <h3 style="color: #1f2937; margin-bottom: 16px; font-size: 1.5rem;">Reservation Request Sent!</h3>
            <p style="color: #4b5563; margin-bottom: 12px;">Thank you for choosing ${document.querySelector('.site-title').textContent}.</p>
            <p style="color: #4b5563; margin-bottom: 24px;">We'll confirm your reservation by phone within 24 hours.</p>
            <button type="button" onclick="location.reload()" style="
                background: #1e3a8a; 
                color: white; 
                padding: 14px 28px; 
                border: none; 
                border-radius: 8px; 
                cursor: pointer; 
                font-weight: 500;
                font-size: 15px;
                transition: background 0.3s ease;
            " onmouseover="this.style.background='#3b82f6'" onmouseout="this.style.background='#1e3a8a'">
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
    const animateElements = document.querySelectorAll('.menu-item, .contact-item, .point, .feature');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Enhanced menu item animations
function initMenuAnimations() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
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

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initSmoothScrolling();
    initHeaderScroll();
    initMenuTabs();
    initReservationForm();
    initScrollAnimations();
    initMenuAnimations();
    initPhoneFormatting();
    
    // Initialize menu items in first tab
    const firstTabPanel = document.querySelector('.tab-panel.active');
    if (firstTabPanel) {
        const menuItems = firstTabPanel.querySelectorAll('.menu-item');
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
});

// Add CSS for dynamic effects
const style = document.createElement('style');
style.textContent = `
    .clean-header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .nav-links.active {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(8px);
        flex-direction: column;
        padding: 24px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        z-index: 999;
        gap: 20px;
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translateY(6px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translateY(-6px);
    }
    
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
        
        .nav-links.active {
            display: flex;
        }
    }
    
    .menu-item {
        transition: all 0.3s ease;
    }
    
    .decoration-circle {
        animation: rotate 20s linear infinite;
    }
    
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    
    .decoration-dots {
        animation: pulse 3s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% {
            opacity: 0.4;
        }
        50% {
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(style);