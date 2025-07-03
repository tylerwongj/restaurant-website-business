// Casual Promotional Template - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"], .btn[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 150; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Loyalty Program Signup
    const loyaltyForm = document.querySelector('.loyalty-signup');
    if (loyaltyForm) {
        loyaltyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send the data to your server
            console.log('Loyalty signup:', email);
            
            // Show success message
            alert('Welcome to our rewards program! Check your email for your welcome bonus.');
            this.reset();
        });
    }

    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const contactData = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Here you would typically send the data to your server
            console.log('Contact form data:', contactData);
            
            // Show success message
            alert('Thank you for your message! We will get back to you within 24 hours.');
            this.reset();
        });
    }

    // Promotional Banner Auto-hide
    const promoBanner = document.querySelector('.promo-banner');
    if (promoBanner) {
        // Auto-hide promo banner after 10 seconds
        setTimeout(() => {
            promoBanner.style.transform = 'translateY(-100%)';
            document.querySelector('.navbar').style.top = '0';
            document.querySelector('.hero-promotional').style.marginTop = '80px';
        }, 10000);
        
        // Close button functionality (if you want to add one)
        const closePromo = document.querySelector('.close-promo');
        if (closePromo) {
            closePromo.addEventListener('click', function() {
                promoBanner.style.transform = 'translateY(-100%)';
                document.querySelector('.navbar').style.top = '0';
                document.querySelector('.hero-promotional').style.marginTop = '80px';
            });
        }
    }

    // Scroll-based Navigation Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu a');
    
    function highlightNavigation() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);

    // Intersection Observer for Animation
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
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.promotion-card, .menu-category-card, .value-item, .contact-method');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Enhanced Card Hover Effects
    const promotionCards = document.querySelectorAll('.promotion-card:not(.large)');
    promotionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const menuCards = document.querySelectorAll('.menu-category-card');
    menuCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            const img = this.querySelector('.category-image img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            const img = this.querySelector('.category-image img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // Dynamic Points Counter for Loyalty Card
    const pointsElement = document.querySelector('.points-balance');
    if (pointsElement) {
        const targetPoints = 1250;
        let currentPoints = 0;
        const increment = targetPoints / 100;
        
        const countUp = setInterval(() => {
            currentPoints += increment;
            if (currentPoints >= targetPoints) {
                currentPoints = targetPoints;
                clearInterval(countUp);
            }
            pointsElement.textContent = `${Math.floor(currentPoints)} Points Available`;
        }, 50);
    }

    // Phone Number Formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
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

    // Promotional Banner Countdown (if you want to add urgency)
    function createCountdown(endDate) {
        const countdownElement = document.querySelector('.promo-countdown');
        if (!countdownElement) return;
        
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = endDate - now;
            
            if (distance < 0) {
                clearInterval(timer);
                countdownElement.innerHTML = 'Offer Expired';
                return;
            }
            
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            countdownElement.innerHTML = `${hours}h ${minutes}m ${seconds}s remaining`;
        }, 1000);
    }

    // Initialize countdown for 24 hours from now
    const tomorrow = new Date();
    tomorrow.setHours(tomorrow.getHours() + 24);
    createCountdown(tomorrow.getTime());

    // Newsletter/Email Validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.style.borderColor = '#ff4444';
                this.setCustomValidity('Please enter a valid email address');
            } else {
                this.style.borderColor = '';
                this.setCustomValidity('');
            }
        });
    });

    // Lazy Loading for Images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // Add loading states for forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Re-enable after 3 seconds (simulated response time)
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    });
});

// Utility Functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function trackEvent(eventName, data) {
    // Analytics tracking placeholder
    console.log(`Event: ${eventName}`, data);
    
    // You would integrate with your analytics service here
    // Example: gtag('event', eventName, data);
}