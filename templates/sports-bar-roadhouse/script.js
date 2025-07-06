// Sports Bar Roadhouse Template - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');
    const navbar = document.querySelector('.navbar');
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navActions.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                navActions.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Navbar scroll effect with sports bar styling
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            navbar.style.background = 'rgba(45, 24, 16, 0.98)';
            navbar.style.borderBottom = '3px solid #ff8c00';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(45, 24, 16, 0.95)';
            navbar.style.borderBottom = '3px solid #ff8c00';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Form handling
    const reservationForm = document.querySelector('.reservation-form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Table reservation submitted! We\'ll call you within 30 minutes to confirm. 🍺', 'success');
            this.reset();
        });
    }
    
    // Sports bar atmosphere enhancements
    let currentSpecialIndex = 0;
    const specialCards = document.querySelectorAll('.special-card');
    
    // Intersection Observer for bold animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, observerOptions);
    
    // Animate sections with sports bar energy
    const sections = document.querySelectorAll('.menu-highlights, .daily-specials, .events-sports, .about, .contact');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(60px) scale(0.95)';
        section.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(section);
    });
    
    // Animate menu cards with staggered timing
    const menuCards = document.querySelectorAll('.menu-category-card');
    menuCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.9)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate special cards
    specialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s`;
        observer.observe(card);
    });
    
    // Animate event cards
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = `opacity 0.7s ease ${index * 0.2}s, transform 0.7s ease ${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Statistics counter animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {
        statsObserver.observe(aboutStats);
    }
    
    // Enhanced hover effects for menu cards with sports bar energy
    menuCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 20px 50px rgba(139, 69, 19, 0.3)';
            
            // Add pulse effect to price
            const priceRange = this.querySelector('.price-range');
            if (priceRange) {
                priceRange.style.animation = 'pulse 0.6s ease-in-out';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(139, 69, 19, 0.2)';
            
            const priceRange = this.querySelector('.price-range');
            if (priceRange) {
                priceRange.style.animation = 'none';
            }
        });
    });
    
    // Sports bar parallax effect for background images
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImages = document.querySelectorAll('.hero-bg img, .specials-bg img');
        
        heroImages.forEach((img, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = -(scrolled * speed);
            img.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Enhanced form interactions with sports bar styling
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#ff8c00';
            this.style.boxShadow = '0 0 0 3px rgba(255, 140, 0, 0.1)';
            this.style.transform = 'translateY(-2px)';
            this.style.background = '#fdf6e8';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.style.borderColor = '#deb887';
                this.style.boxShadow = 'none';
                this.style.transform = 'translateY(0)';
                this.style.background = '#fefefe';
            }
        });
    });
    
    // Date validation - prevent past dates
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        const today = new Date().toISOString().split('T')[0];
        input.setAttribute('min', today);
    });
    
    // Special card rotation with sports energy
    rotateSpecialHighlight();
    
    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
            this.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.background = 'rgba(255, 255, 255, 0.1)';
        });
    });
});

// Menu category viewing function
function viewCategory(category) {
    showNotification(`Viewing ${category.toUpperCase()} menu! 🍽️`, 'success');
    // In a real app, this would navigate to the specific menu section
    setTimeout(() => {
        window.location.href = `menu.html#${category}`;
    }, 1000);
}

// Statistics animation with sports bar numbers
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent.replace(/\D/g, ''));
        const suffix = stat.textContent.replace(/\d/g, '');
        let currentValue = 0;
        const increment = finalValue / 60; // 60 frames for smooth animation
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                stat.textContent = finalValue + suffix;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(currentValue) + suffix;
            }
        }, 30); // ~33fps
    });
}

// Special highlight rotation
function rotateSpecialHighlight() {
    const specialCards = document.querySelectorAll('.special-card:not(.featured)');
    let currentIndex = 0;
    
    setInterval(() => {
        specialCards.forEach((card, index) => {
            if (index === currentIndex) {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.background = 'rgba(255, 140, 0, 0.15)';
                card.style.borderColor = '#ff8c00';
            } else {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.background = 'rgba(255, 255, 255, 0.1)';
                card.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
        });
        
        currentIndex = (currentIndex + 1) % specialCards.length;
    }, 3000); // Rotate every 3 seconds
}

// Sports bar notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? '#ff8c00' : '#dc3545'};
        color: ${type === 'success' ? '#2d1810' : 'white'};
        padding: 1.25rem 2rem;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(139, 69, 19, 0.2);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        max-width: 350px;
        font-size: 0.95rem;
        font-weight: 600;
        line-height: 1.4;
        border: 3px solid ${type === 'success' ? '#d2691e' : '#a71e2a'};
        text-transform: uppercase;
        letter-spacing: 0.02em;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 4000);
}

// Sports bar image loading with bold effects
function initSportsImageLoading() {
    const menuImages = document.querySelectorAll('.menu-card-image img');
    
    menuImages.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(1.2)';
        
        img.addEventListener('load', function() {
            this.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize sports bar image loading
initSportsImageLoading();

// Enhanced button interactions with sports bar energy
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        if (!this.classList.contains('btn-outline')) {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        }
    });
    
    button.addEventListener('mouseleave', function() {
        if (!this.classList.contains('btn-outline')) {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Mobile menu styles injection
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu.active,
        .nav-actions.active {
            display: flex;
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: rgba(45, 24, 16, 0.98);
            backdrop-filter: blur(15px);
            flex-direction: column;
            padding: 2.5rem 2rem;
            z-index: 999;
            border-bottom: 3px solid #ff8c00;
        }
        
        .nav-menu.active {
            gap: 2rem;
        }
        
        .nav-actions.active {
            gap: 1.5rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        body.menu-open {
            overflow: hidden;
        }
    }
`;

// Inject mobile menu styles
const style = document.createElement('style');
style.textContent = mobileMenuStyles;
document.head.appendChild(style);

// Add pulse animation keyframes
const pulseAnimation = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;

const pulseStyle = document.createElement('style');
pulseStyle.textContent = pulseAnimation;
document.head.appendChild(pulseStyle);