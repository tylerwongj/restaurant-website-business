// Glass Modern Luxe Restaurant Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
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

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.15)';
            navbar.style.backdropFilter = 'blur(25px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });

    // Glass orbs animation enhancement
    const orbs = document.querySelectorAll('.glass-orb');
    orbs.forEach((orb, index) => {
        orb.style.animationDelay = `${index * 2}s`;
        
        // Add mouse interaction
        orb.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        orb.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-bg img');
        if (hero) {
            const speed = scrolled * 0.5;
            hero.style.transform = `translateY(${speed}px)`;
        }
    });

    // Glass cards hover effects
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 45px 0 rgba(31, 38, 135, 0.5)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
        });
    });

    // Menu items hover effects
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Form validation and submission
    const reservationForm = document.querySelector('.reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate required fields
            const requiredFields = ['name', 'email', 'phone', 'guests', 'date', 'time'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!input.value.trim()) {
                    input.style.borderColor = '#ef4444';
                    isValid = false;
                } else {
                    input.style.borderColor = 'var(--glass-border)';
                }
            });
            
            // Email validation
            const emailInput = this.querySelector('[name="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailInput.style.borderColor = '#ef4444';
                isValid = false;
            }
            
            // Phone validation
            const phoneInput = this.querySelector('[name="phone"]');
            const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(phoneInput.value)) {
                phoneInput.style.borderColor = '#ef4444';
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                showNotification('Reservation request submitted successfully! We will contact you shortly.', 'success');
                this.reset();
            } else {
                showNotification('Please fill in all required fields correctly.', 'error');
            }
        });
    }

    // Intersection Observer for animations
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

    // Observe elements for animation
    document.querySelectorAll('.glass-card, .menu-item, .feature-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Glass morphing effect on mouse move
    document.addEventListener('mousemove', function(e) {
        const cursor = { x: e.clientX, y: e.clientY };
        const glassElements = document.querySelectorAll('.glass-card');
        
        glassElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementCenter = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
            
            const distance = Math.sqrt(
                Math.pow(cursor.x - elementCenter.x, 2) + 
                Math.pow(cursor.y - elementCenter.y, 2)
            );
            
            if (distance < 200) {
                const intensity = 1 - (distance / 200);
                element.style.background = `rgba(255, 255, 255, ${0.1 + intensity * 0.1})`;
            } else {
                element.style.background = 'var(--glass-bg)';
            }
        });
    });

    // Dynamic gradient background
    function updateGradient() {
        const time = Date.now() * 0.0001;
        const x = Math.sin(time) * 50;
        const y = Math.cos(time) * 50;
        
        document.body.style.background = `
            linear-gradient(135deg, 
                hsl(${230 + x}, 70%, 60%) 0%, 
                hsl(${260 + y}, 80%, 50%) 100%
            )
        `;
    }

    // Update gradient every frame
    setInterval(updateGradient, 100);

    // Loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.filter = 'none';
        });
        
        // Set initial state
        img.style.opacity = '0';
        img.style.filter = 'blur(10px)';
        img.style.transition = 'opacity 0.5s ease, filter 0.5s ease';
    });
});

// Utility function for notifications
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: 10px;
        color: var(--text-white);
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: var(--glass-shadow);
    `;
    
    if (type === 'error') {
        notification.style.borderLeft = '4px solid #ef4444';
    } else if (type === 'success') {
        notification.style.borderLeft = '4px solid #10b981';
    } else {
        notification.style.borderLeft = '4px solid var(--accent-color)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Preload critical images
function preloadImages() {
    const imageUrls = [
        'images/hero.jpg',
        'images/interior.jpg',
        'images/food-1.jpg',
        'images/food-2.jpg',
        'images/food-3.jpg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Call preload on page load
window.addEventListener('load', preloadImages);