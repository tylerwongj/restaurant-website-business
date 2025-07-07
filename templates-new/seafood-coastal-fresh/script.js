// Seafood Coastal Fresh Template JavaScript

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

// Fresh catch card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const catchCards = document.querySelectorAll('.catch-card');
    
    catchCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const prices = this.querySelectorAll('.price');
            prices.forEach(price => {
                price.style.transform = 'scale(1.1)';
                price.style.color = 'var(--secondary)';
            });
            
            const badge = this.querySelector('.catch-badge');
            if (badge) {
                badge.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const prices = this.querySelectorAll('.price');
            prices.forEach(price => {
                price.style.transform = 'scale(1)';
                price.style.color = '';
            });
            
            const badge = this.querySelector('.catch-badge');
            if (badge) {
                badge.style.transform = 'scale(1)';
            }
        });
    });
});

// Form submission handling with maritime theme
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
            const seating = formData.get('seating');
            
            let message = `Ahoy ${name}! 🌊 Your waterfront reservation request has been received.\n\n`;
            message += `Reservation Details:\n`;
            message += `Date: ${date}\n`;
            message += `Time: ${time}\n`;
            message += `Party Size: ${partySize}\n`;
            
            if (seating) {
                const seatingNames = {
                    'waterfront': 'Waterfront View Table',
                    'raw-bar': 'Raw Bar Seating',
                    'indoor': 'Indoor Dining Room',
                    'patio': 'Outdoor Patio'
                };
                message += `Seating: ${seatingNames[seating] || seating}\n`;
            }
            
            message += `\nOur harbor crew will contact you within 2 hours to confirm your table and check tide conditions! 🦞`;
            
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

// Scroll animations with ocean wave effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const waveInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply wave animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.catch-card, .event-card, .info-card, .raw-item, .stat'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        waveInObserver.observe(el);
    });
});

// Header scroll behavior with maritime feel
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down - hide header like tide going out
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up - show header like tide coming in
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Statistics counter animation for About section
function animateCounter(element, target) {
    let current = 0;
    const isPercent = target === 100;
    const increment = target / 50; // 50 frames for smooth animation
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            if (isPercent) {
                element.textContent = '100%';
            } else if (target === 50) {
                element.textContent = '50+';
            } else {
                element.textContent = target === 'Daily' ? 'Daily' : target + '+';
            }
            clearInterval(timer);
        } else {
            const displayValue = Math.floor(current);
            if (isPercent) {
                element.textContent = displayValue + '%';
            } else {
                element.textContent = displayValue + (target === 50 ? '+' : '');
            }
        }
    }, 16); // ~60fps
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h4');
            const textContent = statNumber.textContent;
            
            let targetValue;
            if (textContent.includes('100%')) {
                targetValue = 100;
            } else if (textContent.includes('50+')) {
                targetValue = 50;
            } else if (textContent === 'Daily') {
                // Don't animate "Daily", just show it
                return;
            } else {
                targetValue = parseInt(textContent) || 0;
            }
            
            statNumber.textContent = '0';
            animateCounter(statNumber, targetValue);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.stat').forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Enhanced form validation with coastal styling
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
            this.style.boxShadow = '0 0 0 2px rgba(25, 118, 210, 0.2)';
        });
    });
}

// Parallax effect for images
document.addEventListener('DOMContentLoaded', function() {
    const rawBarImage = document.querySelector('.raw-bar-image img');
    const aboutImages = document.querySelectorAll('.image-grid img');
    
    if (rawBarImage || aboutImages.length > 0) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.1;
            
            if (rawBarImage) {
                rawBarImage.style.transform = `translateY(${rate}px)`;
            }
            
            aboutImages.forEach(img => {
                img.style.transform = `translateY(${rate}px)`;
            });
        });
    }
});

// Fresh catch "sustainability" badge animation
document.addEventListener('DOMContentLoaded', function() {
    const sustainabilityBadges = document.querySelectorAll('.sustainability');
    
    sustainabilityBadges.forEach((badge, index) => {
        // Stagger the animation
        setTimeout(() => {
            badge.style.opacity = '1';
            badge.style.transform = 'translateX(0)';
        }, index * 200);
        
        // Initial state
        badge.style.opacity = '0';
        badge.style.transform = 'translateX(-20px)';
        badge.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
});

// Menu item hover effects with ocean theme
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const price = this.querySelector('.price');
            if (price) {
                price.style.color = 'var(--secondary)';
                price.style.transform = 'scale(1.1)';
            }
            
            // Add subtle wave effect
            this.style.background = 'linear-gradient(90deg, #ffffff 0%, #e8f4f8 50%, #ffffff 100%)';
        });
        
        item.addEventListener('mouseleave', function() {
            const price = this.querySelector('.price');
            if (price) {
                price.style.color = '';
                price.style.transform = 'scale(1)';
            }
            
            this.style.background = '';
        });
    });
});

// Floating animation for hero features (already in CSS, but add interaction)
document.addEventListener('DOMContentLoaded', function() {
    const features = document.querySelectorAll('.feature');
    
    features.forEach((feature, index) => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
            this.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.background = '';
        });
    });
});

// Accessibility enhancements for coastal theme
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels with maritime theme
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            const text = button.textContent.trim();
            button.setAttribute('aria-label', `Navigate to ${text} - Fresh seafood experience`);
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

// Daily specials ticker animation
document.addEventListener('DOMContentLoaded', function() {
    const dailySpecials = document.querySelector('.daily-specials');
    if (dailySpecials) {
        // Add subtle animation to draw attention to daily specials
        setInterval(() => {
            dailySpecials.style.opacity = '0.8';
            setTimeout(() => {
                dailySpecials.style.opacity = '1';
            }, 500);
        }, 8000); // Every 8 seconds
    }
});

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    addFormValidation();
    
    // Add entrance animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
        
        // Initial state
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
    }
    
    // Add ocean sound effect trigger (could be enhanced with actual audio)
    const catchCards = document.querySelectorAll('.catch-card');
    catchCards.forEach(card => {
        card.addEventListener('click', function() {
            // Placeholder for sound effect or enhanced interaction
            console.log('🌊 Fresh catch selected!');
        });
    });
});

// Global functions for external access
window.toggleMobileMenu = toggleMobileMenu;