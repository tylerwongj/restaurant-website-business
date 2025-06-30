// Premium Sushi Bar - v4 JavaScript

// Mobile Navigation Toggle
function initMobileNav() {
    const mobileToggle = document.querySelector('.elegant-toggle');
    const navMenu = document.querySelector('.elegant-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.elegant-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.premium-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.elegant-menu');
                const mobileToggle = document.querySelector('.elegant-toggle');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.premium-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
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
            showSubmissionMessage();
        });
    }
}

// Form validation function
function validateForm(data) {
    // Required fields validation
    const requiredFields = ['name', 'email', 'phone', 'date', 'time', 'guests'];
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showError(`Please fill in the ${field} field.`);
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showError('Please enter a valid email address.');
        return false;
    }
    
    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(data.phone) || data.phone.replace(/\D/g, '').length < 10) {
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
    
    // Check if date is too far in the future (optional - 3 months)
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    if (selectedDate > maxDate) {
        showError('Reservations can only be made up to 3 months in advance. Please call for later dates.');
        return false;
    }
    
    return true;
}

// Show error message
function showError(message) {
    // Remove existing error message
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and show new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background: #ffebee;
        color: #c62828;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border-left: 4px solid #c62828;
        font-weight: 500;
    `;
    errorDiv.textContent = message;
    
    const form = document.querySelector('.reservation-form');
    const firstFormGroup = form.querySelector('.form-group');
    firstFormGroup.parentNode.insertBefore(errorDiv, firstFormGroup);
    
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
function showSubmissionMessage() {
    const form = document.querySelector('.reservation-form');
    const originalHTML = form.innerHTML;
    
    form.innerHTML = `
        <div class="success-message" style="text-align: center; padding: 60px 40px;">
            <div style="font-size: 4rem; color: #1a237e; margin-bottom: 30px;">✓</div>
            <h3 style="color: #1a237e; margin-bottom: 20px; font-family: var(--font-primary); font-size: 2rem;">Reservation Request Received</h3>
            <p style="color: #546e7a; margin-bottom: 15px; font-size: 1.1rem;">Thank you for choosing ${document.querySelector('.restaurant-name').textContent}.</p>
            <p style="color: #546e7a; margin-bottom: 30px;">We will contact you within 24 hours to confirm your reservation details.</p>
            <p style="color: #546e7a; margin-bottom: 40px; font-size: 14px; font-style: italic;">For immediate assistance or same-day reservations, please call us directly.</p>
            <button type="button" onclick="location.reload()" style="
                background: #1a237e; 
                color: white; 
                padding: 15px 30px; 
                border: none; 
                border-radius: 8px; 
                cursor: pointer; 
                font-weight: 600;
                font-size: 16px;
                transition: background 0.3s ease;
            " onmouseover="this.style.background='#3949ab'" onmouseout="this.style.background='#1a237e'">
                Make Another Reservation
            </button>
        </div>
    `;
}

// Intersection Observer for Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
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
    
    // Elements to animate
    const animateElements = document.querySelectorAll('.info-card, .omakase-card, .menu-category, .principle');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Enhanced scroll animations for cards
function initCardAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -30px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100); // Stagger the animations
            }
        });
    }, observerOptions);
    
    const cards = document.querySelectorAll('.omakase-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
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
    initReservationForm();
    initScrollAnimations();
    initCardAnimations();
    initPhoneFormatting();
});

// Add CSS for dynamic effects
const style = document.createElement('style');
style.textContent = `
    .premium-header.scrolled {
        background: rgba(250, 248, 245, 0.98);
        box-shadow: 0 5px 25px rgba(26, 35, 126, 0.1);
    }
    
    .elegant-menu.active {
        position: fixed;
        top: 90px;
        left: 0;
        right: 0;
        background: rgba(250, 248, 245, 0.98);
        backdrop-filter: blur(12px);
        flex-direction: column;
        padding: 30px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        z-index: 999;
        gap: 25px;
    }
    
    .elegant-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translateY(8px);
    }
    
    .elegant-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .elegant-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translateY(-8px);
    }
    
    @media (max-width: 768px) {
        .elegant-menu {
            display: none;
        }
        
        .elegant-menu.active {
            display: flex;
        }
    }
    
    .omakase-card:hover {
        transform: translateY(-8px);
    }
    
    .menu-item:hover {
        background: rgba(26, 35, 126, 0.02);
        border-radius: 8px;
        padding: 25px 20px;
        margin: 0 -20px;
    }
`;
document.head.appendChild(style);