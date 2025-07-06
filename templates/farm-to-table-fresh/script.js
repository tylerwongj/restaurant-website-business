// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
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
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(74, 124, 89, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.querySelectorAll('.nav-menu a').forEach(link => {
            link.style.color = '#ffffff';
        });
        const logo = navbar.querySelector('.logo img');
        if (logo) {
            logo.style.filter = 'brightness(0) invert(1)';
        }
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.querySelectorAll('.nav-menu a').forEach(link => {
            link.style.color = 'var(--text-dark)';
        });
        const logo = navbar.querySelector('.logo img');
        if (logo) {
            logo.style.filter = 'none';
        }
    }
});

// Form submission with enhanced validation
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Enhanced validation
    const requiredFields = this.querySelectorAll('[required]');
    let isValid = true;
    let errorMessages = [];
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#e53e3e';
            errorMessages.push(`${field.placeholder || field.name} is required`);
        } else {
            field.style.borderColor = 'var(--border-color)';
        }
    });
    
    // Date validation
    const dateField = this.querySelector('input[type="date"]');
    if (dateField && dateField.value) {
        const selectedDate = new Date(dateField.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            isValid = false;
            dateField.style.borderColor = '#e53e3e';
            errorMessages.push('Please select a future date');
        }
    }
    
    // Email validation
    const emailField = this.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            isValid = false;
            emailField.style.borderColor = '#e53e3e';
            errorMessages.push('Please enter a valid email address');
        }
    }
    
    if (isValid) {
        // Show success message with farm-to-table theme
        const successMessage = document.createElement('div');
        successMessage.innerHTML = `
            <div style="background: #4a7c59; color: white; padding: 1.5rem; margin: 1rem 0; text-align: center; border-radius: 12px; box-shadow: 0 4px 14px rgba(74, 124, 89, 0.25);">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🌱</div>
                <strong>Reservation Request Received!</strong><br>
                Thank you for choosing farm-fresh dining. We'll contact you within 2 hours to confirm your table and discuss any seasonal menu highlights.
            </div>
        `;
        this.parentNode.insertBefore(successMessage, this);
        this.reset();
        
        // Remove success message after 6 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 6000);
    } else {
        // Show error messages
        alert('Please correct the following errors:\n' + errorMessages.join('\n'));
    }
});

// Newsletter subscription
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.innerHTML = `
            <div style="background: #68d391; color: white; padding: 0.75rem; margin: 0.5rem 0; text-align: center; border-radius: 6px; font-size: 0.9rem;">
                🌱 Subscribed! You'll receive updates about our seasonal menu.
            </div>
        `;
        this.parentNode.insertBefore(successMsg, this.nextSibling);
        emailInput.value = '';
        
        setTimeout(() => {
            successMsg.remove();
        }, 4000);
    } else {
        alert('Please enter a valid email address');
    }
});

// Animation on scroll with staggered delays
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

// Add staggered animation to menu items
document.querySelectorAll('.menu-item').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
    observer.observe(el);
});

// Add animation to other elements
document.querySelectorAll('.feature, .highlight, .partner, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Phone number formatting
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{3})/, '($1) $2');
        }
        this.value = value;
    });
});

// Farm-to-table specific features
document.addEventListener('DOMContentLoaded', function() {
    // Add organic certification animation
    const certBadges = document.querySelectorAll('.cert-badge, .freshness-badge');
    certBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Animate stats counters
    const stats = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            if (!isNaN(target)) {
                let current = 0;
                const increment = target / 30;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + (stat.textContent.includes('%') ? '%' : '');
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '');
                    }
                }, 50);
            }
        });
    };
    
    // Trigger stats animation when in view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.disconnect();
            }
        });
    });
    
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Add seasonal menu rotation hint
    const menuGrid = document.querySelector('.menu-grid');
    if (menuGrid) {
        const rotationHint = document.createElement('div');
        rotationHint.style.cssText = `
            position: absolute;
            top: -20px;
            right: 20px;
            background: var(--accent-color);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            animation: pulse 2s infinite;
        `;
        rotationHint.textContent = 'Menu updated daily!';
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); opacity: 0.8; }
                50% { transform: scale(1.05); opacity: 1; }
                100% { transform: scale(1); opacity: 0.8; }
            }
        `;
        document.head.appendChild(style);
        
        menuGrid.parentElement.style.position = 'relative';
        menuGrid.parentElement.appendChild(rotationHint);
    }
});

// Enhanced hover effects for farm partners
document.querySelectorAll('.partner').forEach(partner => {
    partner.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.boxShadow = '0 15px 35px rgba(74, 124, 89, 0.15)';
    });
    
    partner.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Add "fresh picked" effect to menu items
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const badge = this.querySelector('.freshness-badge');
        if (badge) {
            badge.style.animation = 'bounce 0.5s ease';
        }
    });
});

// Add bounce animation
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }
`;
document.head.appendChild(bounceStyle);