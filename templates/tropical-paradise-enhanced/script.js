// Tropical Paradise Enhanced Restaurant Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initAnimations();
    initFormHandling();
    initGallery();
    initTropicalEffects();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Mobile menu toggle
    hamburger?.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerOffset = 70;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Add scroll animations to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.menu-card, .feature, .contact-card, .gallery-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Enhanced animations
function initAnimations() {
    // Stagger animation for menu cards
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Floating animation for hero elements
    createFloatingElements();

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Create additional floating elements
function createFloatingElements() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const floatingContainer = document.querySelector('.floating-elements');
    if (!floatingContainer) return;

    // Add more tropical elements
    const tropicalElements = ['🐠', '🦋', '🌸', '🥥', '🍍', '🌊'];
    
    tropicalElements.forEach((emoji, index) => {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.textContent = emoji;
        element.style.cssText = `
            top: ${Math.random() * 80 + 10}%;
            left: ${Math.random() * 80 + 10}%;
            animation-delay: ${Math.random() * 6}s;
            animation-duration: ${6 + Math.random() * 4}s;
            opacity: 0.4;
        `;
        floatingContainer.appendChild(element);
    });
}

// Form handling
function initFormHandling() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '🌊 Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showNotification('Reservation request sent! 🌺 We\'ll contact you soon!', 'success');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });

        // Form validation with tropical feedback
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearValidation);
        });
    }
}

// Field validation
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearValidation.call(field);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required 🌴');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email 📧');
        return false;
    }
    
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        showFieldError(field, 'Please enter a valid phone number 📞');
        return false;
    }
    
    return true;
}

function clearValidation() {
    this.style.borderColor = '';
    const errorMsg = this.parentNode.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

function showFieldError(field, message) {
    field.style.borderColor = '#ff6b6b';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ff6b6b;
        font-size: 0.8rem;
        margin-top: 0.25rem;
        animation: fadeInUp 0.3s ease;
    `;
    
    field.parentNode.appendChild(errorDiv);
}

// Utility validation functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[\+]?[\d\s\-\(\)]{10,}$/.test(phone);
}

// Gallery functionality
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            openLightbox(this.querySelector('img').src);
        });

        // Add parallax effect on hover
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const moveX = (x - rect.width / 2) * 0.1;
            const moveY = (y - rect.height / 2) * 0.1;
            
            this.querySelector('img').style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
        });

        item.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'translate(0, 0) scale(1.1)';
        });
    });
}

// Simple lightbox
function openLightbox(imageSrc) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${imageSrc}" alt="Gallery Image">
            <button class="lightbox-close">✕</button>
        </div>
    `;
    
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    `;
    
    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        animation: zoomIn 0.3s ease;
    `;
    
    const img = content.querySelector('img');
    img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 10px;
    `;
    
    const closeBtn = content.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 5px;
    `;
    
    document.body.appendChild(lightbox);
    
    // Close lightbox
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target === closeBtn) {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => lightbox.remove(), 300);
        }
    });
}

// Tropical effects
function initTropicalEffects() {
    // Add tropical cursor trail
    createTropicalCursor();
    
    // Add wave effect to buttons
    addWaveEffect();
    
    // Add tropical loading states
    addTropicalLoaders();
}

function createTropicalCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'tropical-cursor';
    cursor.innerHTML = '🌺';
    cursor.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        font-size: 1.5rem;
        opacity: 0;
        transition: opacity 0.3s ease;
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.opacity = '0.6';
    });
    
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
}

function addWaveEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'wave-effect';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.4);
                transform: scale(0);
                animation: wave 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

function addTropicalLoaders() {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes wave {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes zoomIn {
            from {
                transform: scale(0.5);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        .navbar.scrolled {
            background: rgba(255,255,255,0.98);
            box-shadow: 0 2px 20px rgba(32,178,170,0.1);
        }
    `;
    document.head.appendChild(style);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const colors = {
        success: '#32cd32',
        error: '#ff6b6b',
        info: '#20b2aa'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 2000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        font-weight: 500;
    `;
    
    // Add slide animation
    const slideStyle = document.createElement('style');
    slideStyle.textContent = `
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
    `;
    document.head.appendChild(slideStyle);
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Parallax scrolling effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg-image');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
    
    // Floating elements parallax
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        const speed = (index + 1) * 0.2;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Add some tropical easter eggs
document.addEventListener('keydown', function(e) {
    // Konami code for tropical mode
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
    window.konamiIndex = window.konamiIndex || 0;
    
    if (e.code === konamiCode[window.konamiIndex]) {
        window.konamiIndex++;
        if (window.konamiIndex === konamiCode.length) {
            activateTropicalMode();
            window.konamiIndex = 0;
        }
    } else {
        window.konamiIndex = 0;
    }
});

function activateTropicalMode() {
    showNotification('🌴 SUPER TROPICAL MODE ACTIVATED! 🌺', 'success');
    
    // Add extra floating elements
    const body = document.body;
    for (let i = 0; i < 20; i++) {
        const emoji = ['🌺', '🌴', '🥥', '🍍', '🐠', '🦋'][Math.floor(Math.random() * 6)];
        const element = document.createElement('div');
        element.textContent = emoji;
        element.style.cssText = `
            position: fixed;
            top: -50px;
            left: ${Math.random() * 100}%;
            font-size: 2rem;
            pointer-events: none;
            z-index: 1000;
            animation: tropicalFall 3s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        body.appendChild(element);
        
        setTimeout(() => element.remove(), 5000);
    }
    
    // Add falling animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes tropicalFall {
            to {
                transform: translateY(calc(100vh + 50px)) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}