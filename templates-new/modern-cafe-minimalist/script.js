// Modern Cafe Minimalist Template - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Animate hamburger lines
            if (navMenu.classList.contains('active')) {
                hamburger.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 5px)';
                hamburger.querySelector('span:nth-child(2)').style.opacity = '0';
                hamburger.querySelector('span:nth-child(3)').style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                hamburger.querySelector('span:nth-child(1)').style.transform = '';
                hamburger.querySelector('span:nth-child(2)').style.opacity = '1';
                hamburger.querySelector('span:nth-child(3)').style.transform = '';
            }
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
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                // Reset hamburger animation
                hamburger.querySelector('span:nth-child(1)').style.transform = '';
                hamburger.querySelector('span:nth-child(2)').style.opacity = '1';
                hamburger.querySelector('span:nth-child(3)').style.transform = '';
            }
        });
    });

    // Newsletter Signup Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send the data to your server
            console.log('Newsletter signup:', email);
            
            // Show success message
            showNotification('Thank you for subscribing! Check your email for special offers.', 'success');
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
            showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
            this.reset();
        });
    }

    // Scroll-based Navigation Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu a');
    
    function highlightNavigation() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
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
    const animateElements = document.querySelectorAll('.experience-item, .menu-item, .special-day, .instagram-post');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Enhanced Hover Effects for Menu Items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Experience Items Hover Effects
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            const icon = this.querySelector('.experience-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            const icon = this.querySelector('.experience-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Instagram Post Hover Effects
    const instagramPosts = document.querySelectorAll('.instagram-post');
    instagramPosts.forEach(post => {
        post.addEventListener('click', function() {
            // Here you would typically link to the actual Instagram post
            const instagramUrl = document.querySelector('[href*="instagram"]')?.href || '#';
            if (instagramUrl !== '#') {
                window.open(instagramUrl, '_blank');
            }
        });
    });

    // Daily Specials Interactive Features
    const specialDays = document.querySelectorAll('.special-day');
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    specialDays.forEach((day, index) => {
        // Highlight today's special
        if (index === (today === 0 ? 6 : today - 1)) { // Adjust for Monday start
            day.classList.add('today');
            day.style.border = '3px solid var(--accent)';
            day.style.transform = 'scale(1.05)';
        }
        
        day.addEventListener('mouseenter', function() {
            if (!this.classList.contains('today')) {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }
        });
        
        day.addEventListener('mouseleave', function() {
            if (!this.classList.contains('today')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Form Validation Enhancement
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                errorMessage = 'Please enter a valid email address';
                break;
            case 'tel':
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                isValid = phoneRegex.test(value.replace(/\D/g, ''));
                errorMessage = 'Please enter a valid phone number';
                break;
            default:
                isValid = value.length > 0;
                errorMessage = 'This field is required';
        }

        if (field.hasAttribute('required') && !isValid) {
            field.classList.add('error');
            field.style.borderColor = '#ff4757';
            showFieldError(field, errorMessage);
        } else {
            field.classList.remove('error');
            field.style.borderColor = '';
            hideFieldError(field);
        }

        return isValid;
    }

    function showFieldError(field, message) {
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            errorElement.style.cssText = `
                color: #ff4757;
                font-size: 0.8rem;
                margin-top: 0.3rem;
                display: block;
            `;
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    function hideFieldError(field) {
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
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

    // Parallax Effect for Hero Section
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image img');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (heroImage && scrolled < hero.offsetHeight) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });

    // Loading Animation for Images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity for loading effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // If image is already cached, show it immediately
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Sticky Navigation Background
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add loading states for forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.7';
                
                // Re-enable after 2 seconds (simulated response time)
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }, 2000);
            }
        });
    });
});

// Utility Functions
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 9999;
        font-weight: 500;
        max-width: 350px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Analytics tracking placeholder
function trackEvent(eventName, data = {}) {
    console.log(`📊 Event: ${eventName}`, data);
    // You would integrate with your analytics service here
}

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    
    if (loadTime > 3000) {
        console.warn('Page load time is slow:', loadTime + 'ms');
    }
    
    trackEvent('page_load', {
        load_time: Math.round(loadTime),
        page: 'home'
    });
});