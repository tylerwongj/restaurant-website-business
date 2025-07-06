// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
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
});

// Smooth Scrolling for Anchor Links
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

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form, .vintage-form, .reservation-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message (you can customize this)
            showNotification('Thanks for your message! We\'ll get back to you real soon!', 'success');
            
            // Reset form
            this.reset();
        });
    }
});

// Menu Tab Functionality (if present)
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});

// Scroll Animations
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function isElementPartiallyInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right > 0
    );
}

function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .menu-item-card, .feature-box, .contact-card, .special-item');
    
    animatedElements.forEach(element => {
        if (isElementPartiallyInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

// Run animation check on scroll and load
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? 'var(--accent-color)' : 'var(--primary-color)'};
        color: var(--black);
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        border: 2px solid var(--black);
        font-weight: bold;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Add notification animations to CSS if not already present
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
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
        
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            font-weight: bold;
            cursor: pointer;
            color: inherit;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s;
        }
        
        .notification-close:hover {
            background-color: rgba(0,0,0,0.1);
        }
    `;
    document.head.appendChild(style);
}

// Retro-specific animations
document.addEventListener('DOMContentLoaded', function() {
    // Add floating animation to floating elements
    const floatingElements = document.querySelectorAll('.float-burger, .float-shake, .float-pie');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 2}s`;
    });
    
    // Neon flicker effect for neon signs
    const neonSigns = document.querySelectorAll('.neon-sign, .neon-title');
    neonSigns.forEach(sign => {
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance to flicker
                sign.style.opacity = '0.7';
                setTimeout(() => {
                    sign.style.opacity = '1';
                }, 50);
            }
        }, 3000);
    });
});

// Menu Item Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item-card, .menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Special Features for Menu Page
if (window.location.pathname.includes('menu.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        // Add special menu page functionality
        
        // Highlight featured items
        const featuredItems = document.querySelectorAll('.menu-item.featured');
        featuredItems.forEach(item => {
            item.style.border = '3px solid var(--accent-color)';
            item.style.background = 'linear-gradient(135deg, var(--background-color), #fff9e6)';
        });
        
        // Add category navigation
        addMenuCategoryNavigation();
    });
}

function addMenuCategoryNavigation() {
    const menuSections = document.querySelectorAll('.menu-section');
    
    if (menuSections.length > 1) {
        const nav = document.createElement('div');
        nav.className = 'menu-category-nav';
        nav.style.cssText = `
            position: sticky;
            top: 70px;
            background: var(--white);
            padding: 15px 0;
            border-bottom: 2px solid var(--primary-color);
            margin-bottom: 2rem;
            z-index: 100;
        `;
        
        const navContent = document.createElement('div');
        navContent.className = 'container';
        navContent.style.cssText = `
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        `;
        
        menuSections.forEach((section, index) => {
            const title = section.querySelector('.section-title');
            if (title) {
                const navLink = document.createElement('a');
                navLink.href = `#section-${index}`;
                navLink.textContent = title.textContent;
                navLink.style.cssText = `
                    padding: 8px 16px;
                    background: var(--background-color);
                    color: var(--text-color);
                    text-decoration: none;
                    border-radius: 20px;
                    font-weight: bold;
                    border: 2px solid var(--primary-color);
                    transition: all 0.3s ease;
                `;
                
                navLink.addEventListener('mouseenter', function() {
                    this.style.background = 'var(--primary-color)';
                    this.style.color = 'var(--white)';
                });
                
                navLink.addEventListener('mouseleave', function() {
                    this.style.background = 'var(--background-color)';
                    this.style.color = 'var(--text-color)';
                });
                
                section.id = `section-${index}`;
                navContent.appendChild(navLink);
            }
        });
        
        nav.appendChild(navContent);
        
        const menuHeader = document.querySelector('.menu-header');
        if (menuHeader) {
            menuHeader.after(nav);
        }
    }
}