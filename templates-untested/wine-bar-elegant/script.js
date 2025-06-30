// Wine Bar Elegant Restaurant Template JavaScript

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
    
    // Enhanced form handling for wine bar reservations
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const date = this.querySelector('input[type="date"]').value;
            const time = this.querySelector('input[type="time"]').value;
            const partySize = this.querySelectorAll('select')[0].value;
            const occasion = this.querySelectorAll('select')[1].value;
            const requests = this.querySelector('textarea').value;
            
            // Validation
            if (!name || !email || !phone || !date || !time || !partySize) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Date validation
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                alert('Please select a future date.');
                return;
            }
            
            // Time validation for wine bar hours
            const selectedTime = time.split(':');
            const hour = parseInt(selectedTime[0]);
            const minute = parseInt(selectedTime[1]);
            
            if (hour < 16 || hour > 23) {
                alert('Please select a time between 4:00 PM and 11:00 PM.');
                return;
            }
            
            // Success message with wine bar touch
            let message = `Thank you for your reservation request, ${name}!`;
            if (occasion) {
                message += ` We're excited to help you celebrate your ${occasion}.`;
            }
            message += ' Our sommelier will contact you soon to confirm your table and discuss wine preferences.';
            
            alert(message);
            this.reset();
        });
    }
    
    // Enhanced navbar with wine bar styling
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(248, 246, 240, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(114, 47, 55, 0.2)';
                navbar.style.borderBottom = '1px solid #D4AF37';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
                navbar.style.borderBottom = '1px solid #D4AF37';
            }
        });
    }
    
    // Intersection Observer for elegant fade-in animations
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
    const animateElements = document.querySelectorAll('.wine-feature, .menu-card, .wine-item, .event-card, .about-text, .contact-info');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Wine feature hover effects with elegant transitions
    const wineFeatures = document.querySelectorAll('.wine-feature');
    wineFeatures.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
            this.style.boxShadow = '0 25px 60px rgba(114, 47, 55, 0.25)';
            this.style.borderColor = '#DAA520';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
            this.style.borderColor = 'transparent';
        });
    });
    
    // Wine list item enhanced hover effects
    const wineItems = document.querySelectorAll('.wine-item');
    wineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.2)';
            this.style.transform = 'translateX(20px)';
            this.style.boxShadow = '0 8px 30px rgba(218, 165, 32, 0.4)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.1)';
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Menu card sophisticated hover effects
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.03)';
            this.style.boxShadow = '0 25px 60px rgba(114, 47, 55, 0.3)';
            this.style.borderColor = '#DAA520';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(114, 47, 55, 0.15)';
            this.style.borderColor = 'transparent';
        });
    });
    
    // Event card elegant hover effects
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 20px 50px rgba(218, 165, 32, 0.4)';
            this.style.borderColor = '#DAA520';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
            this.style.borderColor = 'transparent';
        });
    });
    
    // Stats counter animation with wine bar numbers
    const stats = document.querySelectorAll('.stat h3');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalText = target.textContent;
                const hasPlus = finalText.includes('+');
                const number = parseInt(finalText.replace('+', ''));
                
                if (!isNaN(number)) {
                    animateCounter(target, 0, number, 2500, hasPlus);
                }
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Enhanced counter animation function
    function animateCounter(element, start, end, duration, hasPlus = false) {
        const startTime = performance.now();
        const difference = end - start;
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smoother animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(start + (difference * easeOutQuart));
            
            element.textContent = currentValue + (hasPlus ? '+' : '');
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = end + (hasPlus ? '+' : '');
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
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
    
    // Wine recommendation system simulation
    const wineCategories = document.querySelectorAll('.wine-category');
    wineCategories.forEach(category => {
        const categoryTitle = category.querySelector('h3');
        if (categoryTitle) {
            categoryTitle.addEventListener('click', function() {
                const items = category.querySelectorAll('.wine-item');
                items.forEach(item => {
                    item.style.backgroundColor = 'rgba(218, 165, 32, 0.2)';
                    setTimeout(() => {
                        item.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }, 1000);
                });
            });
        }
    });
    
    // Image lazy loading with elegant fade effect
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.6s ease';
                
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
    
    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
            this.style.boxShadow = '0 8px 25px rgba(114, 47, 55, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Wine education tooltip system (for future enhancement)
    const wineTerms = document.querySelectorAll('.wine-info p');
    wineTerms.forEach(term => {
        term.addEventListener('mouseenter', function() {
            this.style.cursor = 'help';
            this.style.textDecoration = 'underline dotted';
        });
        
        term.addEventListener('mouseleave', function() {
            this.style.cursor = 'default';
            this.style.textDecoration = 'none';
        });
    });
});