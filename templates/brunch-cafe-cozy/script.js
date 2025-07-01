// Brunch Cafe Cozy Restaurant Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Contact form handling for brunch cafe
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const reason = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;
            
            // Validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields (Name, Email, and Message).');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Success message based on reason
            let responseMessage = `Thank you for contacting us, ${name}!`;
            
            switch(reason) {
                case 'catering':
                    responseMessage += ' We\'ll get back to you soon with our catering options and pricing.';
                    break;
                case 'events':
                    responseMessage += ' We\'d love to host your private event! We\'ll contact you to discuss details.';
                    break;
                case 'employment':
                    responseMessage += ' Thank you for your interest in joining our team! We\'ll review your inquiry and get back to you.';
                    break;
                case 'feedback':
                    responseMessage += ' We appreciate your feedback and will use it to improve our service.';
                    break;
                default:
                    responseMessage += ' We\'ll respond to your inquiry as soon as possible.';
            }
            
            alert(responseMessage);
            this.reset();
        });
    }
    
    // Enhanced navbar with cozy styling
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 248, 231, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(139, 69, 19, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    // Intersection Observer for cozy fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
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
    const animateElements = document.querySelectorAll('.feature, .menu-item, .coffee-item, .special-card, .about-text, .contact-info');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Feature hover effects
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.03)';
            this.style.boxShadow = '0 20px 45px rgba(139, 69, 19, 0.2)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Menu item enhanced hover effects
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(139, 69, 19, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(139, 69, 19, 0.15)';
        });
    });
    
    // Coffee item hover effects
    const coffeeItems = document.querySelectorAll('.coffee-item');
    coffeeItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = '#F5E6D3';
            this.style.transform = 'translateX(8px)';
            this.style.boxShadow = '0 5px 15px rgba(139, 69, 19, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = '#FFF8E7';
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Special card hover effects
    const specialCards = document.querySelectorAll('.special-card');
    specialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.03)';
            this.style.boxShadow = '0 15px 35px rgba(139, 69, 19, 0.2)';
            this.style.borderTopColor = '#D2691E';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
            this.style.borderTopColor = '#F4A460';
        });
    });
    
    // Daily special rotation animation
    const specialCards2 = document.querySelectorAll('.special-card');
    let currentSpecialIndex = 0;
    
    function highlightDailySpecial() {
        // Get current day (0 = Sunday, 1 = Monday, etc.)
        const today = new Date().getDay();
        let todayIndex;
        
        // Map day to special card index (Monday = 0, Tuesday = 1, etc.)
        switch(today) {
            case 1: todayIndex = 0; break; // Monday
            case 2: todayIndex = 1; break; // Tuesday
            case 3: todayIndex = 2; break; // Wednesday
            case 4: todayIndex = 3; break; // Thursday
            case 5: todayIndex = 4; break; // Friday
            case 0: case 6: todayIndex = 5; break; // Weekend
            default: todayIndex = 0;
        }
        
        // Highlight today's special
        specialCards2.forEach((card, index) => {
            if (index === todayIndex) {
                card.style.background = '#F5E6D3';
                card.style.borderTopColor = '#D2691E';
                card.style.borderTopWidth = '6px';
            } else {
                card.style.background = '#FFF8E7';
                card.style.borderTopColor = '#F4A460';
                card.style.borderTopWidth = '4px';
            }
        });
    }
    
    // Highlight today's special on load
    highlightDailySpecial();
    
    // Time-based greeting system
    function updateTimeBasedContent() {
        const hour = new Date().getHours();
        const heroDescription = document.querySelector('.hero-description');
        
        if (heroDescription) {
            if (hour < 11) {
                heroDescription.textContent = 'Start your morning right with fresh coffee and breakfast favorites';
            } else if (hour < 15) {
                heroDescription.textContent = 'Perfect timing for our signature brunch experience';
            } else {
                heroDescription.textContent = 'Where every afternoon feels like a leisurely brunch';
            }
        }
    }
    
    updateTimeBasedContent();
    
    // Image lazy loading with fade effect
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = function() {
                    this.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Coffee price animation on scroll
    const coffeePrices = document.querySelectorAll('.coffee-price');
    const priceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const price = entry.target;
                price.style.transform = 'scale(1.1)';
                price.style.color = '#D2691E';
                
                setTimeout(() => {
                    price.style.transform = 'scale(1)';
                    price.style.color = '#D2691E';
                }, 600);
                
                priceObserver.unobserve(price);
            }
        });
    }, { threshold: 0.8 });
    
    coffeePrices.forEach(price => {
        priceObserver.observe(price);
    });
    
    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Menu category switching animation
    const menuCategories = document.querySelectorAll('.menu-category h3');
    menuCategories.forEach(category => {
        category.addEventListener('click', function() {
            const items = this.parentElement.querySelectorAll('.menu-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        item.style.transform = 'scale(1)';
                    }, 200);
                }, index * 100);
            });
        });
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            
            if (scrolled < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${parallax}px)`;
            }
        });
    }
    
    // Cozy atmosphere sound effects (visual feedback only)
    const atmosphereElements = document.querySelectorAll('.feature-icon');
    atmosphereElements.forEach(icon => {
        icon.addEventListener('click', function() {
            this.style.transform = 'rotate(360deg) scale(1.2)';
            this.style.transition = 'transform 0.6s ease';
            
            setTimeout(() => {
                this.style.transform = 'rotate(0deg) scale(1)';
            }, 600);
        });
    });
});