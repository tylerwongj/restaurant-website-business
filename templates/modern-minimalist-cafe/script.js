// Modern Minimalist Cafe JavaScript

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        
        // Reset hamburger animation
        const spans = hamburger?.querySelectorAll('span');
        if (spans) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect with more subtle changes
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (navbar) {
        if (currentScrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.borderBottomColor = 'rgba(236, 240, 241, 0.8)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.borderBottomColor = 'var(--border-color)';
        }
        
        // Hide/show navbar on scroll (optional)
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollY = currentScrollY;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.feature-item, .menu-category, .about-text, .about-image, .gallery-item, .hours-item, .contact-info, .contact-form'
    );
    
    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});

// Contact form handling with modern validation
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form elements
        const formData = new FormData(this);
        const inputs = this.querySelectorAll('input, textarea');
        const submitBtn = this.querySelector('button[type="submit"]');
        
        // Validation
        let isValid = true;
        
        inputs.forEach(input => {
            const value = input.value.trim();
            
            // Remove previous error styling
            input.style.borderColor = 'var(--border-color)';
            
            // Required field validation
            if (input.hasAttribute('required') && !value) {
                isValid = false;
                input.style.borderColor = '#e74c3c';
                showInputError(input, 'This field is required');
                return;
            }
            
            // Email validation
            if (input.type === 'email' && value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(value)) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                    showInputError(input, 'Please enter a valid email address');
                    return;
                }
            }
            
            // Phone validation (basic)
            if (input.type === 'tel' && value) {
                const phonePattern = /^[\d\s\-\+\(\)]+$/;
                if (!phonePattern.test(value) || value.length < 10) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                    showInputError(input, 'Please enter a valid phone number');
                    return;
                }
            }
            
            // Clear any existing error messages on valid input
            clearInputError(input);
        });
        
        if (!isValid) {
            return;
        }
        
        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Success state
            showSuccessMessage();
            this.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }, 2000);
    });
}

function showInputError(input, message) {
    clearInputError(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'input-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #e74c3c;
        font-size: 0.875rem;
        margin-top: 4px;
        margin-bottom: 8px;
    `;
    
    input.parentNode.appendChild(errorDiv);
}

function clearInputError(input) {
    const existingError = input.parentNode.querySelector('.input-error');
    if (existingError) {
        existingError.remove();
    }
}

function showSuccessMessage() {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.textContent = 'Thank you! Your message has been sent successfully.';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: #2ecc71;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(46, 204, 113, 0.3);
        z-index: 2000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Gallery modal functionality
const galleryItems = document.querySelectorAll('.gallery-item img');
galleryItems.forEach(img => {
    img.addEventListener('click', () => {
        openImageModal(img);
    });
    
    // Add cursor pointer
    img.style.cursor = 'pointer';
});

function openImageModal(img) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <img src="${img.src}" alt="${img.alt}">
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const backdrop = modal.querySelector('.modal-backdrop');
    backdrop.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(4px);
    `;
    
    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    const modalImg = modal.querySelector('img');
    modalImg.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
    `;
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 16px;
        right: 16px;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3001;
        transition: background 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        content.style.transform = 'scale(1)';
    }, 10);
    
    // Close events
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    // Close on escape key
    function handleEscape(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }
    
    document.addEventListener('keydown', handleEscape);
    
    function closeModal() {
        modal.style.opacity = '0';
        content.style.transform = 'scale(0.8)';
        document.removeEventListener('keydown', handleEscape);
        
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(0, 0, 0, 0.8)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'rgba(0, 0, 0, 0.5)';
    });
}

// About image play button functionality
const playButton = document.querySelector('.play-button');
if (playButton) {
    playButton.addEventListener('click', () => {
        // This could open a video modal or redirect to a video
        console.log('Play button clicked - implement video functionality');
        
        // Example: Simple alert for demo
        alert('Video feature would be implemented here');
    });
}

// Smooth reveal animation for hero content
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateY(40px)';
        
        setTimeout(() => {
            heroImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateY(0)';
        }, 400);
    }
});

// Social media links - open in new tab
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.href && this.href !== '#' && this.href !== '') {
            e.preventDefault();
            window.open(this.href, '_blank', 'noopener,noreferrer');
        }
    });
});

// Scroll progress indicator (optional)
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 80px;
        left: 0;
        width: 0%;
        height: 2px;
        background: var(--accent-color);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Uncomment to enable scroll progress indicator
// createScrollProgress();

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            // Simulate loading
            setTimeout(() => {
                img.style.opacity = '1';
            }, 100);
            
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// Console welcome message
console.log('%c Welcome to Modern Minimalist Cafe! ', 'background: #1a1a1a; color: #ffffff; padding: 8px 16px; border-radius: 4px; font-weight: bold;');
console.log('Template loaded successfully with modern interactive features.');

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    console.log('Modern Minimalist Cafe template initialized successfully!');
    
    // Add any additional initialization here
    // For example: analytics, third-party integrations, etc.
});