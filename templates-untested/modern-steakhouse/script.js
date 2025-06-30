// Modern Steakhouse Template JavaScript

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
        link.addEventListener('click', function() {
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
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced navbar effects on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
        }
    });

    // Advanced parallax effect for hero section
    const heroBackground = document.querySelector('.hero-background img');
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            heroBackground.style.transform = `translateY(${rate}px) scale(1.1)`;
        });
    }

    // Steak item hover effects
    document.querySelectorAll('.steak-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const image = this.querySelector('.steak-image img');
            image.style.transform = 'scale(1.15)';
            image.style.filter = 'brightness(1.1) contrast(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            const image = this.querySelector('.steak-image img');
            image.style.transform = 'scale(1)';
            image.style.filter = 'brightness(1) contrast(1)';
        });
    });

    // Animated counter for statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '') + 
                                          (counter.textContent.includes('°F') ? '°F' : '');
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target + (counter.textContent.includes('+') ? '+' : '') + 
                                         (counter.textContent.includes('°F') ? '°F' : '');
                }
            };
            
            updateCounter();
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
                
                // Trigger counter animation when stats section is visible
                if (entry.target.classList.contains('steakhouse-stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Apply animation to elements
    document.querySelectorAll('.feature-card, .steak-item, .about-text, .kitchen-text, .steakhouse-stats').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Temperature guide interactive effects
    document.querySelectorAll('.temp-option').forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(212, 175, 55, 0.2)';
            this.style.borderLeft = '4px solid var(--rich-gold)';
        });
        
        option.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.05)';
            this.style.borderLeft = 'none';
        });
    });

    // Enhanced reservation form handling
    const reservationForm = document.querySelector('.reservation-form form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = reservationForm.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#8b0000';
                    input.style.background = 'rgba(139, 0, 0, 0.1)';
                    
                    // Add shake animation
                    input.style.animation = 'shake 0.5s ease-in-out';
                    setTimeout(() => {
                        input.style.animation = '';
                    }, 500);
                } else {
                    input.style.borderColor = 'var(--rich-gold)';
                    input.style.background = 'rgba(212, 175, 55, 0.1)';
                }
            });
            
            if (isValid) {
                const submitBtn = reservationForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                // Success animation
                submitBtn.textContent = 'RESERVATION CONFIRMED!';
                submitBtn.style.background = '#228b22';
                submitBtn.style.transform = 'scale(1.05)';
                
                // Create success effect
                const successOverlay = document.createElement('div');
                successOverlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(212, 175, 55, 0.1);
                    z-index: 9999;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                document.body.appendChild(successOverlay);
                
                setTimeout(() => {
                    successOverlay.style.opacity = '1';
                }, 100);
                
                setTimeout(() => {
                    successOverlay.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(successOverlay);
                    }, 300);
                    
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.transform = '';
                    reservationForm.reset();
                }, 3000);
            }
        });

        // Real-time form validation
        reservationForm.querySelectorAll('input, select').forEach(field => {
            field.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = 'rgba(139, 0, 0, 0.5)';
                } else {
                    this.style.borderColor = 'rgba(212, 175, 55, 0.5)';
                }
            });
            
            field.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = 'var(--rich-gold)';
                    this.style.background = 'rgba(212, 175, 55, 0.1)';
                }
            });
        });
    }

    // Premium feature cards enhanced effects
    document.querySelectorAll('.feature-card.premium').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #1a1a1a, #333)';
            this.style.borderColor = 'var(--rich-gold)';
            this.style.boxShadow = '0 25px 60px rgba(212, 175, 55, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, var(--charcoal-black), #2a2a2a)';
            this.style.borderColor = 'var(--rich-gold)';
            this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
        });
    });

    // Kitchen section scroll effects
    const kitchenImage = document.querySelector('.kitchen-image img');
    if (kitchenImage) {
        window.addEventListener('scroll', function() {
            const kitchenSection = document.querySelector('.kitchen-section');
            const rect = kitchenSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                const scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
                kitchenImage.style.transform = `scale(${1 + scrollPercent * 0.1})`;
                kitchenImage.style.filter = `brightness(${0.8 + scrollPercent * 0.3})`;
            }
        });
    }

    // Add CSS for shake animation
    const shakeStyles = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = shakeStyles;
    document.head.appendChild(styleSheet);

    // Loading animation for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.filter = 'blur(0)';
        });
        
        if (img.complete) {
            img.style.opacity = '1';
            img.style.filter = 'blur(0)';
        } else {
            img.style.opacity = '0';
            img.style.filter = 'blur(5px)';
            img.style.transition = 'opacity 0.8s ease, filter 0.8s ease';
        }
    });

    // Create ambient steakhouse atmosphere effect
    function createSteakhouseAmbiance() {
        const hero = document.querySelector('.steakhouse-hero');
        if (hero) {
            const ambiance = document.createElement('div');
            ambiance.className = 'steakhouse-ambiance';
            ambiance.innerHTML = `
                <div class="smoke-effect smoke1"></div>
                <div class="smoke-effect smoke2"></div>
                <div class="smoke-effect smoke3"></div>
            `;
            hero.appendChild(ambiance);
        }
    }

    // Add CSS for ambient effects
    const ambianceStyles = `
        .steakhouse-ambiance {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }
        
        .smoke-effect {
            position: absolute;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
        }
        
        .smoke1 {
            top: 20%;
            left: 10%;
            animation-delay: 0s;
        }
        
        .smoke2 {
            top: 40%;
            right: 15%;
            animation-delay: 2s;
            animation-duration: 8s;
        }
        
        .smoke3 {
            bottom: 30%;
            left: 20%;
            animation-delay: 4s;
            animation-duration: 7s;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
            50% { transform: translateY(-20px) scale(1.1); opacity: 0.7; }
        }
    `;

    const ambianceStyleSheet = document.createElement('style');
    ambianceStyleSheet.textContent = ambianceStyles;
    document.head.appendChild(ambianceStyleSheet);

    createSteakhouseAmbiance();
});