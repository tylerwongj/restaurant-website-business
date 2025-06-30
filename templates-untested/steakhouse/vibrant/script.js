// Vibrant Steakhouse JavaScript

// Mobile Navigation Toggle
function initMobileNav() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
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
                const headerHeight = document.querySelector('.vibrant-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 10;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const mobileToggle = document.querySelector('.mobile-toggle');
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
    const header = document.querySelector('.vibrant-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Steaks Category Filtering
function initSteakCategories() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const categoryContents = document.querySelectorAll('.steak-category-content');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetCategory = button.getAttribute('data-category');
            
            // Remove active class from all buttons and contents
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            categoryContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(targetCategory);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Animate steak cards
                const steakCards = targetContent.querySelectorAll('.steak-card, .side-item');
                steakCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
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
    
    // Check if date is not too far in the future (3 months)
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    if (selectedDate > maxDate) {
        showFormError('Reservations can only be made up to 3 months in advance.');
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
        background: linear-gradient(135deg, #ffebee, #ffcdd2);
        color: #d32f2f;
        padding: 15px;
        border-radius: 12px;
        margin-bottom: 20px;
        border-left: 4px solid #d32f2f;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(211, 47, 47, 0.2);
    `;
    errorDiv.textContent = message;
    
    const form = document.querySelector('.reservation-form');
    const firstGroup = form.querySelector('.form-group');
    firstGroup.parentNode.insertBefore(errorDiv, firstGroup);
    
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
        <div class="success-message" style="text-align: center; padding: 50px 30px;">
            <div style="font-size: 4rem; margin-bottom: 25px;">🥩</div>
            <h3 style="color: #212121; margin-bottom: 20px; font-family: var(--font-primary); font-size: 2rem;">Reservation Submitted!</h3>
            <p style="color: #424242; margin-bottom: 15px; font-size: 1.1rem;">Thank you for choosing ${document.querySelector('.restaurant-name').textContent}.</p>
            <p style="color: #424242; margin-bottom: 30px;">We'll confirm your reservation within 2 hours during business hours.</p>
            <p style="color: #757575; margin-bottom: 40px; font-size: 14px; font-style: italic;">Get ready for an exceptional steakhouse experience!</p>
            <button type="button" onclick="location.reload()" style="
                background: linear-gradient(135deg, #d32f2f, #f44336); 
                color: white; 
                padding: 16px 32px; 
                border: none; 
                border-radius: 12px; 
                cursor: pointer; 
                font-weight: 600;
                font-size: 16px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(211, 47, 47, 0.3);
            " onmouseover="this.style.background='linear-gradient(135deg, #f44336, #ff9800)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='linear-gradient(135deg, #d32f2f, #f44336)'; this.style.transform='translateY(0)'">
                Make Another Reservation
            </button>
        </div>
    `;
}

// Intersection Observer for Animation
function initScrollAnimations() {
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
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.steak-card, .highlight-card, .feature-item, .contact-item, .side-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Enhanced steak card animations
function initSteakCardAnimations() {
    const steakCards = document.querySelectorAll('.steak-card');
    
    steakCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.2}s`;
        
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) scale(1.02)';
            
            // Add glow effect for featured cards
            if (card.classList.contains('featured')) {
                card.style.boxShadow = '0 15px 50px rgba(255, 152, 0, 0.4)';
            } else if (card.classList.contains('premium')) {
                card.style.boxShadow = '0 15px 50px rgba(255, 193, 7, 0.4)';
            } else if (card.classList.contains('signature')) {
                card.style.boxShadow = '0 15px 50px rgba(211, 47, 47, 0.4)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    });
}

// Gallery item hover effects
function initGalleryAnimations() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.2) rotate(5deg)';
            item.style.zIndex = '10';
            item.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) rotate(0deg)';
            item.style.zIndex = '1';
            item.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
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

// Dynamic pricing display
function initDynamicPricing() {
    const steakCards = document.querySelectorAll('.steak-card');
    
    steakCards.forEach(card => {
        const priceElement = card.querySelector('.steak-price');
        if (priceElement) {
            const originalPrice = priceElement.textContent;
            
            card.addEventListener('mouseenter', () => {
                if (card.classList.contains('premium')) {
                    priceElement.style.background = 'linear-gradient(135deg, #ffc107, #ff9800)';
                    priceElement.style.webkitBackgroundClip = 'text';
                    priceElement.style.webkitTextFillColor = 'transparent';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                priceElement.style.background = '';
                priceElement.style.webkitBackgroundClip = '';
                priceElement.style.webkitTextFillColor = '';
            });
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initSmoothScrolling();
    initHeaderScroll();
    initSteakCategories();
    initReservationForm();
    initScrollAnimations();
    initSteakCardAnimations();
    initGalleryAnimations();
    initPhoneFormatting();
    initDynamicPricing();
    
    // Initialize first category animations
    const firstCategoryCards = document.querySelectorAll('.steak-category-content.active .steak-card');
    firstCategoryCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
});

// Add CSS for dynamic effects
const style = document.createElement('style');
style.textContent = `
    .vibrant-header.scrolled {
        background: rgba(26, 26, 26, 0.98);
        box-shadow: 0 5px 30px rgba(211, 47, 47, 0.3);
    }
    
    .nav-menu.active {
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        background: rgba(26, 26, 26, 0.98);
        backdrop-filter: blur(12px);
        flex-direction: column;
        padding: 30px;
        box-shadow: 0 10px 40px rgba(211, 47, 47, 0.3);
        z-index: 999;
        gap: 25px;
    }
    
    .mobile-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translateY(8px);
    }
    
    .mobile-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translateY(-8px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .nav-menu.active {
            display: flex;
        }
    }
    
    .steak-card {
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .highlight-card {
        animation: float 6s ease-in-out infinite;
    }
    
    .highlight-card:nth-child(2) {
        animation-delay: 2s;
    }
    
    .highlight-card:nth-child(3) {
        animation-delay: 4s;
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    
    .hero-title {
        animation: glow 3s ease-in-out infinite alternate;
    }
    
    @keyframes glow {
        from {
            text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
        }
        to {
            text-shadow: 3px 3px 6px rgba(0,0,0,0.5), 0 0 30px rgba(255, 152, 0, 0.3);
        }
    }
`;
document.head.appendChild(style);