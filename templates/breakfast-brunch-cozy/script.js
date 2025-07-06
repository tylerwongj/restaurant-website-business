// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
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

// Enhanced navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY;
    
    if (scrolled > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(25px)';
        navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// Menu category functionality
function initMenuCategories() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuCategories = document.querySelectorAll('.menu-category');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // Remove active class from all buttons and categories
            categoryBtns.forEach(b => b.classList.remove('active'));
            menuCategories.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding category
            this.classList.add('active');
            const targetElement = document.getElementById(targetCategory);
            if (targetElement) {
                targetElement.classList.add('active');
                
                // Animate menu items
                const menuItems = targetElement.querySelectorAll('.menu-item');
                menuItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const phone = this.querySelector('input[type="tel"]').value.trim();
            const inquiryType = this.querySelector('select').value;
            const message = this.querySelector('textarea').value.trim();
            
            // Basic validation
            if (!name || !email || !inquiryType || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Success message
            showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 18px 25px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 600;
        max-width: 350px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-size: 14px;
        line-height: 1.4;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(`
        .menu-item,
        .special-card,
        .feature,
        .contact-card,
        .about-stats .stat,
        .image-small
    `);
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .menu-item.animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    .special-card.animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .feature.animate-in {
        animation: slideInLeft 0.6s ease forwards;
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .stat.animate-in {
        animation: bounceIn 0.6s ease forwards;
    }
    
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(animationStyles);

// Phone number formatting
function formatPhoneNumber(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
        }
        e.target.value = value;
    });
}

// Enhanced menu item hover effects
function initMenuInteractions() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.zIndex = '10';
            
            // Add glow effect to featured items
            if (this.classList.contains('featured')) {
                this.style.boxShadow = '0 20px 50px rgba(255, 140, 66, 0.3)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
            this.style.boxShadow = '0 8px 25px var(--shadow-color)';
        });
    });
}

// Special card interactions
function initSpecialCardEffects() {
    const specialCards = document.querySelectorAll('.special-card');
    
    specialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Add special glow for weekend card
            if (this.classList.contains('weekend')) {
                this.style.boxShadow = '0 20px 50px rgba(255, 138, 101, 0.4)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px var(--shadow-color)';
        });
    });
}

// Daily special highlight based on current day
function highlightTodaysSpecial() {
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    const specialCards = document.querySelectorAll('.special-card');
    
    // Remove any existing "today" highlighting
    specialCards.forEach(card => card.classList.remove('today-special'));
    
    // Map days to special cards (assuming they're in order: Mon, Tue, Wed, Thu, Fri, Weekend)
    let todayIndex = -1;
    if (today >= 1 && today <= 5) { // Monday to Friday
        todayIndex = today - 1;
    } else { // Weekend (Saturday or Sunday)
        todayIndex = 5;
    }
    
    if (todayIndex >= 0 && specialCards[todayIndex]) {
        specialCards[todayIndex].classList.add('today-special');
        
        // Add pulsing animation for today's special
        const pulseStyle = document.createElement('style');
        pulseStyle.textContent = `
            .today-special {
                animation: pulse 2s infinite;
                border: 3px solid var(--primary-color) !important;
            }
            
            @keyframes pulse {
                0% {
                    box-shadow: 0 8px 25px var(--shadow-color);
                }
                50% {
                    box-shadow: 0 12px 35px rgba(255, 140, 66, 0.3);
                }
                100% {
                    box-shadow: 0 8px 25px var(--shadow-color);
                }
            }
        `;
        document.head.appendChild(pulseStyle);
    }
}

// Beverage item interactions
function initBeverageInteractions() {
    const beverageItems = document.querySelectorAll('.beverage-item');
    
    beverageItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--background-warm)';
            this.style.transform = 'translateX(8px)';
            this.style.borderRadius = '8px';
            this.style.padding = '18px 15px';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.transform = 'translateX(0)';
            this.style.borderRadius = '0';
            this.style.padding = '15px 0';
        });
    });
}

// Scroll-to-top functionality
function initScrollToTop() {
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = '☀️';
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.title = 'Back to top';
    scrollToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 55px;
        height: 55px;
        border: none;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        backdrop-filter: blur(10px);
    `;
    
    scrollToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(15deg)';
        this.style.background = 'var(--secondary-color)';
        this.style.boxShadow = '0 12px 35px rgba(0,0,0,0.3)';
    });
    
    scrollToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.background = 'var(--primary-color)';
        this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
    });
    
    document.body.appendChild(scrollToTop);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            scrollToTop.style.display = 'block';
        } else {
            scrollToTop.style.display = 'none';
        }
    });
    
    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Form field enhancements
function initFormEnhancements() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            this.style.borderColor = 'var(--primary-color)';
            this.style.boxShadow = '0 0 0 3px rgba(255, 140, 66, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.parentElement.classList.add('filled');
                this.style.borderColor = 'var(--primary-color)';
            } else {
                this.parentElement.classList.remove('filled');
                this.style.borderColor = 'var(--border-color)';
            }
            this.style.boxShadow = 'none';
        });
        
        // Add floating label effect
        input.addEventListener('input', function() {
            if (this.value) {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });
    });
}

// Lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Morning greeting based on time
function initMorningGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting = '';
    
    if (hour < 12) {
        greeting = 'Good Morning! ☀️';
    } else if (hour < 17) {
        greeting = 'Good Afternoon! 🌤️';
    } else {
        greeting = 'Good Evening! 🌅';
    }
    
    // Add greeting to hero badge if it exists
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge && hour < 12) {
        heroBadge.textContent = '☀️ Fresh Morning Start';
    }
}

// Social media link tracking
function initSocialTracking() {
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.textContent.toLowerCase();
            console.log(`Social media engagement: ${platform}`);
            // Here you would typically send analytics data
        });
    });
}

// Menu category analytics
function initMenuAnalytics() {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            console.log(`Menu category viewed: ${category}`);
            // Here you would typically send analytics data
        });
    });
}

// Image gallery for about section
function initAboutGallery() {
    const smallImages = document.querySelectorAll('.image-small img');
    const mainImage = document.querySelector('.image-main img');
    
    if (mainImage) {
        smallImages.forEach(img => {
            img.addEventListener('click', function() {
                // Fade out main image
                mainImage.style.opacity = '0.3';
                
                setTimeout(() => {
                    // Change source and fade back in
                    mainImage.src = this.src;
                    mainImage.style.opacity = '1';
                }, 200);
                
                // Add active state to clicked thumbnail
                smallImages.forEach(si => si.parentElement.classList.remove('active'));
                this.parentElement.classList.add('active');
            });
        });
    }
}

// Add active state styles for gallery
const galleryStyles = document.createElement('style');
galleryStyles.textContent = `
    .image-small.active {
        border: 3px solid var(--primary-color);
        transform: scale(1.05);
    }
    
    .image-small {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .image-main img {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(galleryStyles);

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMenuCategories();
    initContactForm();
    initScrollAnimations();
    initMenuInteractions();
    initSpecialCardEffects();
    highlightTodaysSpecial();
    initBeverageInteractions();
    initScrollToTop();
    initFormEnhancements();
    initLazyLoading();
    initMorningGreeting();
    initSocialTracking();
    initMenuAnalytics();
    initAboutGallery();
    
    // Format phone number inputs
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(formatPhoneNumber);
});

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background img');
    
    if (heroBackground) {
        const speed = 0.3;
        heroBackground.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Add breakfast/brunch specific interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add special morning animations
    const morningElements = document.querySelectorAll('.hero-badge, .info-item');
    morningElements.forEach((el, index) => {
        el.style.animation = `morningGlow 3s ease-in-out ${index * 0.5}s infinite alternate`;
    });
    
    // Add morning glow animation
    const morningGlowStyle = document.createElement('style');
    morningGlowStyle.textContent = `
        @keyframes morningGlow {
            0% {
                box-shadow: 0 0 10px rgba(255, 140, 66, 0.3);
            }
            100% {
                box-shadow: 0 0 20px rgba(255, 140, 66, 0.5);
            }
        }
    `;
    document.head.appendChild(morningGlowStyle);
});