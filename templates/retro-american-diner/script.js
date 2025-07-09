// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(220, 20, 60, 0.2)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Retro notification system with diner-style alerts
function showRetroNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.retro-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `retro-notification retro-notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <span class="notification-text">${message}</span>
        </div>
    `;
    
    // Add retro styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 20px;
        border-radius: 15px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        max-width: 400px;
        font-family: 'Nunito', sans-serif;
        font-size: 16px;
        transform: translateX(450px);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        border: 3px solid;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        ${type === 'success' ? 'background: linear-gradient(45deg, #32cd32, #228b22); border-color: #90ee90;' : ''}
        ${type === 'error' ? 'background: linear-gradient(45deg, #dc143c, #b91c3c); border-color: #ff6b6b;' : ''}
        ${type === 'info' ? 'background: linear-gradient(45deg, #4169e1, #1e90ff); border-color: #87ceeb;' : ''}
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    const notificationIcon = notification.querySelector('.notification-icon');
    notificationIcon.style.cssText = `
        font-size: 20px;
        flex-shrink: 0;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in with bounce
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 6 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(450px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 6000);
}

// Enhanced form validation and submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showRetroNotification('Please fill in all required fields!', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showRetroNotification('Please enter a valid email address!', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        showRetroLoading(submitButton);
        
        // Simulate form submission
        setTimeout(() => {
            showRetroNotification('Thanks for reaching out! We\'ll get back to you soon! 🍔', 'success');
            this.reset();
        }, 2000);
    });
}

// Retro loading animation for form submissions
function showRetroLoading(button) {
    const originalText = button.textContent;
    let dots = 0;
    
    button.disabled = true;
    button.style.background = 'linear-gradient(45deg, #ffd700, #ffed4e)';
    button.style.color = '#2c3e50';
    
    const loadingInterval = setInterval(() => {
        dots = (dots + 1) % 4;
        button.textContent = 'Processing' + '.'.repeat(dots);
    }, 300);
    
    setTimeout(() => {
        clearInterval(loadingInterval);
        button.textContent = originalText;
        button.disabled = false;
        button.style.background = '';
        button.style.color = '';
    }, 2000);
}

// Scroll animation with retro bounce effects
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const retroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, observerOptions);

// Apply retro fade-in animations
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.about, .menu-preview, .atmosphere, .contact');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px) scale(0.95)';
        section.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        retroObserver.observe(section);
    });
});

// Menu item hover effects with retro bounce
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
        this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        this.style.boxShadow = '0 8px 25px rgba(220, 20, 60, 0.2)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Menu category hover effects
document.querySelectorAll('.menu-category').forEach(category => {
    category.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--primary-color)';
    });
    
    category.addEventListener('mouseleave', function() {
        this.style.borderColor = 'transparent';
    });
});

// Button click effects with retro feedback
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            transform: scale(0);
            animation: retro-ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS animation for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes retro-ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section (subtle retro style)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    const heroPattern = document.querySelector('.hero-pattern');
    
    if (heroImage && window.innerWidth > 768) {
        const speed = 0.3;
        heroImage.style.transform = `translateY(${scrolled * speed}px) rotate(2deg)`;
    }
    
    if (heroPattern) {
        const speed = 0.1;
        heroPattern.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Info card hover animations
document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
        this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        this.style.boxShadow = '0 15px 40px rgba(220, 20, 60, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
});

// Feature item hover effects
document.querySelectorAll('.feature-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
        this.style.transition = 'all 0.3s ease';
        this.style.borderLeftColor = 'var(--accent-color)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
        this.style.borderLeftColor = 'var(--primary-color)';
    });
});

// Enhanced scroll animations for staggered menu items
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    const menuItemObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });
    
    menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        menuItemObserver.observe(item);
    });
});

// Badge animation on load
document.addEventListener('DOMContentLoaded', function() {
    const badges = document.querySelectorAll('.badge');
    badges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'scale(0.8) translateY(20px)';
        badge.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            badge.style.opacity = '1';
            badge.style.transform = 'scale(1) translateY(0)';
        }, 500 + (index * 150));
    });
});

// Add retro glowing effect to buttons on hover
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 30px rgba(220, 20, 60, 0.6), 0 12px 35px rgba(220, 20, 60, 0.4)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 8px 25px rgba(220, 20, 60, 0.3)';
    });
});