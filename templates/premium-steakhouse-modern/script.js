// Premium Steakhouse Modern - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
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
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 90;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form Submission Handler with Enhanced Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get all form data
            const formData = new FormData(this);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Comprehensive validation
            let isValid = true;
            const errors = [];
            
            // Required fields validation
            const requiredInputs = this.querySelectorAll('input[required], select[required]');
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                    errors.push(`${input.labels[0]?.textContent || 'Field'} is required`);
                } else {
                    input.style.borderColor = '';
                }
            });
            
            // Email validation
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    isValid = false;
                    emailInput.style.borderColor = '#e74c3c';
                    errors.push('Please enter a valid email address');
                }
            }
            
            // Phone validation
            const phoneInput = this.querySelector('input[type="tel"]');
            if (phoneInput && phoneInput.value) {
                const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
                if (!phoneRegex.test(phoneInput.value) || phoneInput.value.length < 10) {
                    isValid = false;
                    phoneInput.style.borderColor = '#e74c3c';
                    errors.push('Please enter a valid phone number');
                }
            }
            
            // Date validation (not in the past)
            const dateInput = this.querySelector('input[type="date"]');
            if (dateInput && dateInput.value) {
                const selectedDate = new Date(dateInput.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (selectedDate < today) {
                    isValid = false;
                    dateInput.style.borderColor = '#e74c3c';
                    errors.push('Please select a future date');
                }
            }
            
            // Party size validation
            const guestsSelect = this.querySelector('select[name="guests"]');
            if (guestsSelect && guestsSelect.value) {
                const partySize = parseInt(guestsSelect.value);
                if (partySize > 8) {
                    // Show special message for large parties
                    alert('For parties of 8 or more, please call us directly at the restaurant to make your reservation. We\'ll ensure you have the perfect private dining experience.');
                    return;
                }
            }
            
            if (isValid) {
                // Show success message
                showSuccessMessage();
                this.reset();
                
                // Here you would normally send the data to your server
                console.log('Reservation request:', data);
                
                // Optional: Send to analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'reservation_request', {
                        'custom_parameter': 'steakhouse_reservation'
                    });
                }
                
            } else {
                showErrorMessage(errors[0] || 'Please complete all required fields correctly.');
            }
        });
    });
    
    // Success and error message functions
    function showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'form-message success';
        message.innerHTML = `
            <div style="background: #2ecc71; color: white; padding: 1rem; border-radius: 4px; margin: 1rem 0; text-align: center;">
                <strong>Reservation Request Received!</strong><br>
                Thank you for choosing our steakhouse. We will confirm your reservation within 24 hours.
            </div>
        `;
        document.querySelector('.reservation-form').appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 5000);
    }
    
    function showErrorMessage(text) {
        const message = document.createElement('div');
        message.className = 'form-message error';
        message.innerHTML = `
            <div style="background: #e74c3c; color: white; padding: 1rem; border-radius: 4px; margin: 1rem 0; text-align: center;">
                <strong>Please correct the following:</strong><br>
                ${text}
            </div>
        `;
        document.querySelector('.reservation-form').appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 5000);
    }
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Apply fade-in animation to elements
    document.querySelectorAll('.promise-item, .cut-card, .wine-category, .testimonial, .contact-item').forEach(el => {
        el.classList.add('fade-in');
        fadeInObserver.observe(el);
    });
    
    // Staggered animation for cuts grid
    const cutsGrid = document.querySelector('.cuts-grid');
    if (cutsGrid) {
        const cuts = cutsGrid.querySelectorAll('.cut-card');
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    cuts.forEach((cut, index) => {
                        setTimeout(() => {
                            cut.classList.add('visible');
                        }, index * 150);
                    });
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        cuts.forEach(cut => cut.classList.add('fade-in'));
        staggerObserver.observe(cutsGrid);
    }
    
    // Wine stats counter animation
    const wineStats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const finalValue = stat.textContent;
                    const number = parseInt(finalValue.replace(/\D/g, ''));
                    
                    if (number > 0) {
                        animateCounter(stat, 0, number, finalValue);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const wineSection = document.querySelector('.wine-stats');
    if (wineSection) {
        statsObserver.observe(wineSection);
    }
    
    function animateCounter(element, start, end, finalText) {
        const duration = 2000;
        const increment = end / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
                element.textContent = finalText;
            } else {
                if (finalText.includes('+')) {
                    element.textContent = Math.floor(current) + '+';
                } else {
                    element.textContent = Math.floor(current);
                }
            }
        }, 16);
    }
    
    // Enhanced hover effects for cut cards
    const cutCards = document.querySelectorAll('.cut-card');
    cutCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Enhanced parallax effect for hero
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElement = document.querySelector('.hero-bg-image');
        
        if (parallaxElement) {
            const speed = scrolled * 0.3;
            parallaxElement.style.transform = `translate3d(0, ${speed}px, 0)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    // Phone link click tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone call initiated:', this.href);
            
            // Optional: Send to analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call', {
                    'phone_number': this.href.replace('tel:', '')
                });
            }
        });
    });
    
    // Email link click tracking
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Email initiated:', this.href);
            
            // Optional: Send to analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'email_click', {
                    'email_address': this.href.replace('mailto:', '')
                });
            }
        });
    });
    
    // Menu button click tracking
    const menuButtons = document.querySelectorAll('a[href*="menu"]');
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Menu viewed');
            
            // Optional: Send to analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'menu_view', {
                    'page_location': window.location.href
                });
            }
        });
    });
    
    // Add loading state to forms
    const formButtons = document.querySelectorAll('button[type="submit"]');
    formButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'Processing...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 3000);
        });
    });
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Add smooth reveal for hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .hero h1, .hero-subtitle, .hero-description, .hero-buttons');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
    });
});

// Add enhanced CSS animations
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-6px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-6px, -6px);
    }
    
    .cut-card {
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .promise-item:hover {
        animation: glow 2s ease-in-out infinite alternate;
    }
    
    @keyframes glow {
        from {
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.1);
        }
        to {
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5), 0 0 30px rgba(212, 175, 55, 0.3);
        }
    }
    
    .form-message {
        animation: slideInMessage 0.5s ease-out;
    }
    
    @keyframes slideInMessage {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .hero-bg-image {
        will-change: transform;
    }
    
    @media (prefers-reduced-motion: reduce) {
        .fade-in,
        .cut-card,
        .promise-item,
        .hero-bg-image {
            transition: none !important;
            animation: none !important;
            transform: none !important;
        }
    }
`;
document.head.appendChild(enhancedStyles);