// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Smooth Scrolling for Navigation Links
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

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'linear-gradient(135deg, #e0e0e0, #f0f0f0, #e0e0e0)';
        navbar.style.boxShadow = '0 6px 25px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #c0c0c0, #e8e8e8, #c0c0c0)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    }
});

// Animate Numbers in Diner Highlights
function animateNumbers() {
    const highlights = document.querySelectorAll('.highlight-number');
    
    const observerOptions = {
        threshold: 0.7,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent.replace(/\D/g, '');
                
                if (finalNumber) {
                    animateCounter(target, 0, parseInt(finalNumber), 2000);
                    observer.unobserve(target);
                }
            }
        });
    }, observerOptions);

    highlights.forEach(highlight => {
        observer.observe(highlight);
    });
}

function animateCounter(element, start, end, duration) {
    const range = end - start;
    const stepTime = Math.abs(Math.floor(duration / range));
    const timer = setInterval(() => {
        start += 1;
        element.textContent = start + (element.textContent.includes('+') ? '+' : '');
        if (start >= end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Retro Card Hover Effects
document.querySelectorAll('.vintage-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) rotate(1deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Neon Glow Effect for Sign
function createNeonPulse() {
    const neonSigns = document.querySelectorAll('.neon-sign');
    
    setInterval(() => {
        neonSigns.forEach(sign => {
            sign.style.textShadow = `
                0 0 5px var(--neon-glow),
                0 0 10px var(--neon-glow),
                0 0 15px var(--neon-glow),
                0 0 20px var(--neon-glow)
            `;
            
            setTimeout(() => {
                sign.style.textShadow = '0 0 10px var(--neon-glow), 0 0 20px var(--neon-glow)';
            }, 200);
        });
    }, 3000);
}

// Parallax Effect for Hero Section
function initParallax() {
    const hero = document.querySelector('.hero');
    const checkerboard = document.querySelector('.checkerboard-pattern');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (checkerboard) {
            checkerboard.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Form Validation and Enhancement
function enhanceForm() {
    const form = document.querySelector('.vintage-form form');
    const inputs = form?.querySelectorAll('input, textarea');
    
    if (form && inputs) {
        // Add vintage styling to focused inputs
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = 'var(--primary-color)';
                this.style.boxShadow = '0 0 10px rgba(231, 76, 60, 0.3)';
            });
            
            input.addEventListener('blur', function() {
                this.style.borderColor = 'var(--border-color)';
                this.style.boxShadow = 'none';
            });
        });
        
        // Form submission handling
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = form.querySelector('input[name="name"]').value;
            const email = form.querySelector('input[name="email"]').value;
            const message = form.querySelector('textarea[name="message"]').value;
            
            if (name && email && message) {
                // Show success message
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                form.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    }
}

// Vintage Notification System
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.vintage-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `vintage-notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '15px 25px',
        background: type === 'success' ? 'var(--primary-color)' : '#e74c3c',
        color: 'white',
        borderRadius: '10px',
        fontFamily: 'Righteous, cursive',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Retro Loading Animation
function showRetroLoader() {
    const loader = document.createElement('div');
    loader.className = 'retro-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="chrome-circle"></div>
            <div class="loading-text">Loading...</div>
        </div>
    `;
    
    Object.assign(loader.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '10001'
    });
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.remove();
    }, 1500);
}

// Menu Item Hover Effects
function initMenuEffects() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const img = this.querySelector('.food-photo');
            if (img) {
                img.style.transform = 'scale(1.1)';
                img.style.filter = 'brightness(1.1) contrast(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const img = this.querySelector('.food-photo');
            if (img) {
                img.style.transform = 'scale(1)';
                img.style.filter = 'brightness(1) contrast(1)';
            }
        });
    });
}

// Button Click Effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn-chrome');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            Object.assign(ripple.style, {
                width: size + 'px',
                height: size + 'px',
                left: x + 'px',
                top: y + 'px',
                position: 'absolute',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.6)',
                transform: 'scale(0)',
                animation: 'ripple 0.6s linear',
                pointerEvents: 'none'
            });
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add ripple animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .chrome-circle {
        width: 50px;
        height: 50px;
        border: 4px solid var(--primary-color);
        border-top: 4px solid transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .loading-text {
        font-family: 'Righteous', cursive;
        color: white;
        font-size: 1.2rem;
        text-align: center;
    }
`;
document.head.appendChild(style);

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateNumbers();
    createNeonPulse();
    initParallax();
    enhanceForm();
    initMenuEffects();
    initButtonEffects();
});

// Page load effect
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});