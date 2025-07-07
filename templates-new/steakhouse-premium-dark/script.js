// Premium Steakhouse Dark Template JavaScript

// Mobile menu toggle functionality
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    navMenu.classList.toggle('mobile-active');
    toggle.classList.toggle('active');
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
});

// Smooth scrolling for navigation links
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

// Menu tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // Remove active class from all tabs and categories
            menuTabs.forEach(t => t.classList.remove('active'));
            menuCategories.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding category
            this.classList.add('active');
            const targetElement = document.getElementById(targetCategory);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });
});

// Steak card hover effects with pricing animation
document.addEventListener('DOMContentLoaded', function() {
    const steakCards = document.querySelectorAll('.steak-card');
    
    steakCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const prices = this.querySelectorAll('.price');
            prices.forEach(price => {
                price.style.transform = 'scale(1.1)';
                price.style.color = 'var(--accent)';
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const prices = this.querySelectorAll('.price');
            prices.forEach(price => {
                price.style.transform = 'scale(1)';
                price.style.color = '';
            });
        });
    });
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.querySelector('form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const date = formData.get('date');
            const time = formData.get('time');
            const partySize = formData.get('party_size');
            const occasion = formData.get('occasion');
            
            let message = `Thank you ${name}! Your reservation request has been received.\n\n`;
            message += `Details:\n`;
            message += `Date: ${date}\n`;
            message += `Time: ${time}\n`;
            message += `Party Size: ${partySize}\n`;
            
            if (occasion) {
                message += `Occasion: ${occasion}\n`;
            }
            
            message += `\nOur reservations team will contact you within 2 hours to confirm your table.`;
            
            alert(message);
            this.reset();
        });
    }
});

// Set minimum date for reservation form (today)
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('res-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});

// Scroll animations for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.steak-card, .info-card, .wine-highlight, .private-option, .heritage-stat'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeInObserver.observe(el);
    });
});

// Header scroll behavior
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down - hide header
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up - show header
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Heritage stats counter animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 1800 ? '°F' : target === 5000 ? '+' : target === 45 ? '' : '+');
            clearInterval(timer);
        } else {
            const displayValue = Math.floor(current);
            element.textContent = displayValue + (target === 1800 ? '°F' : target === 5000 ? '+' : target === 45 ? '' : '+');
        }
    }, 16); // ~60fps
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h4');
            const textContent = statNumber.textContent;
            let targetValue = parseInt(textContent);
            
            // Handle different stat types
            if (textContent.includes('°F')) {
                targetValue = 1800;
            } else if (textContent.includes('+') && textContent.includes('5000')) {
                targetValue = 5000;
            } else if (textContent === '45') {
                targetValue = 45;
            }
            
            statNumber.textContent = '0';
            animateCounter(statNumber, targetValue);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.heritage-stat').forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Badge icon flicker animation control
document.addEventListener('DOMContentLoaded', function() {
    const badgeIcons = document.querySelectorAll('.badge-icon');
    
    badgeIcons.forEach((icon, index) => {
        // Stagger the animation start times
        icon.style.animationDelay = `${index * 0.5}s`;
    });
});

// Enhanced form validation with steakhouse styling
function addFormValidation() {
    const form = document.querySelector('form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#dc2626';
                this.style.boxShadow = '0 0 0 2px rgba(220, 38, 38, 0.2)';
            } else {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--secondary)';
            this.style.boxShadow = '0 0 0 2px rgba(139, 38, 53, 0.2)';
        });
    });
}

// Wine cellar image parallax effect
document.addEventListener('DOMContentLoaded', function() {
    const wineImage = document.querySelector('.wine-image');
    const privateImage = document.querySelector('.private-image');
    
    if (wineImage || privateImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.1;
            
            if (wineImage) {
                wineImage.style.transform = `translateY(${rate}px)`;
            }
            if (privateImage) {
                privateImage.style.transform = `translateY(${rate}px)`;
            }
        });
    }
});

// Premium button hover effects
document.addEventListener('DOMContentLoaded', function() {
    const primaryButtons = document.querySelectorAll('.btn-primary, .btn-reserve');
    
    primaryButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 25px rgba(139, 38, 53, 0.8)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
});

// Menu item hover effects with luxury feel
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const price = this.querySelector('.price');
            if (price) {
                price.style.color = 'var(--accent)';
                price.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const price = this.querySelector('.price');
            if (price) {
                price.style.color = '';
                price.style.transform = 'scale(1)';
            }
        });
    });
});

// Accessibility enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels to interactive elements
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });
    
    // Keyboard navigation for menu tabs
    const menuTabs = document.querySelectorAll('.menu-tab');
    menuTabs.forEach((tab, index) => {
        tab.setAttribute('tabindex', '0');
        tab.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    addFormValidation();
    
    // Add subtle entrance animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Global functions for external access
window.toggleMobileMenu = toggleMobileMenu;