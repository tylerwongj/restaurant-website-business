// Craft Cocktail Bar Template JavaScript

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
            navbar.style.background = 'rgba(13, 17, 23, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 2px 30px rgba(255, 0, 110, 0.3)';
        } else {
            navbar.style.background = 'rgba(13, 17, 23, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 0, 110, 0.2)';
        }
    });

    // Hero title glow effect
    const heroTitle = document.querySelector('.cocktail-title');
    if (heroTitle) {
        setInterval(() => {
            heroTitle.style.textShadow = `
                0 0 20px var(--neon-pink),
                0 0 40px var(--neon-pink),
                0 0 60px var(--electric-blue)
            `;
            setTimeout(() => {
                heroTitle.style.textShadow = '0 0 20px var(--neon-pink)';
            }, 1000);
        }, 3000);
    }

    // Animated counter for bar statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const text = counter.textContent;
            const target = parseInt(text);
            if (isNaN(target)) return;
            
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + (text.includes('+') ? '+' : '');
                    setTimeout(updateCounter, 30);
                } else {
                    counter.textContent = text;
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
                if (entry.target.classList.contains('bar-stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Apply animation to elements
    document.querySelectorAll('.philosophy-card, .cocktail-item, .team-member, .about-text, .bar-stats').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Cocktail item hover effects with liquid animation
    document.querySelectorAll('.cocktail-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const image = this.querySelector('.cocktail-image img');
            if (image) {
                image.style.transform = 'scale(1.1)';
                image.style.filter = 'brightness(1.2) saturate(1.3)';
            }
            
            // Add liquid shimmer effect
            this.style.background = 'linear-gradient(135deg, #f1f3f4, #e8ecf0, rgba(255, 0, 110, 0.1))';
        });
        
        item.addEventListener('mouseleave', function() {
            const image = this.querySelector('.cocktail-image img');
            if (image) {
                image.style.transform = 'scale(1)';
                image.style.filter = 'brightness(1) saturate(1)';
            }
            this.style.background = '';
        });
    });

    // Team member card neon effects
    document.querySelectorAll('.team-member').forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 50px rgba(0, 212, 255, 0.4)';
            this.style.borderColor = 'var(--electric-blue)';
            
            const memberImage = this.querySelector('.member-image');
            memberImage.style.borderColor = 'var(--neon-pink)';
            memberImage.style.boxShadow = '0 0 20px rgba(255, 0, 110, 0.5)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.5)';
            this.style.borderColor = 'var(--electric-blue)';
            
            const memberImage = this.querySelector('.member-image');
            memberImage.style.borderColor = 'var(--electric-blue)';
            memberImage.style.boxShadow = '';
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
                    input.style.borderColor = '#ff006e';
                    input.style.background = 'rgba(255, 0, 110, 0.1)';
                    input.style.boxShadow = '0 0 15px rgba(255, 0, 110, 0.3)';
                    
                    // Add neon shake animation
                    input.style.animation = 'neonShake 0.5s ease-in-out';
                    setTimeout(() => {
                        input.style.animation = '';
                    }, 500);
                } else {
                    input.style.borderColor = 'var(--electric-blue)';
                    input.style.background = 'rgba(0, 212, 255, 0.1)';
                    input.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.2)';
                }
            });
            
            if (isValid) {
                const submitBtn = reservationForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                // Success animation with neon effects
                submitBtn.textContent = 'RESERVATION CONFIRMED!';
                submitBtn.style.background = 'linear-gradient(45deg, #00ff00, #00d4ff)';
                submitBtn.style.transform = 'scale(1.05)';
                submitBtn.style.boxShadow = '0 0 30px rgba(0, 255, 0, 0.5)';
                
                // Create floating cocktail glasses
                createFloatingCocktails();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.transform = '';
                    submitBtn.style.boxShadow = '';
                    reservationForm.reset();
                    
                    // Reset all input styles
                    inputs.forEach(input => {
                        input.style.borderColor = '';
                        input.style.background = '';
                        input.style.boxShadow = '';
                    });
                }, 3000);
            }
        });

        // Real-time form validation with neon effects
        reservationForm.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('focus', function() {
                this.style.borderColor = 'var(--neon-pink)';
                this.style.boxShadow = '0 0 15px rgba(255, 0, 110, 0.3)';
            });
            
            field.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = 'rgba(255, 0, 110, 0.5)';
                    this.style.boxShadow = '0 0 10px rgba(255, 0, 110, 0.2)';
                } else {
                    this.style.borderColor = 'var(--electric-blue)';
                    this.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.2)';
                }
            });
            
            field.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = 'var(--electric-blue)';
                    this.style.background = 'rgba(0, 212, 255, 0.1)';
                    this.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.2)';
                }
            });
        });
    }

    // Floating cocktail animation for success
    function createFloatingCocktails() {
        const cocktails = ['🍸', '🥃', '🍹', '🍷', '🥂'];
        for (let i = 0; i < 6; i++) {
            const cocktail = document.createElement('div');
            cocktail.textContent = cocktails[Math.floor(Math.random() * cocktails.length)];
            cocktail.style.cssText = `
                position: fixed;
                font-size: 2rem;
                z-index: 10000;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: 100%;
                animation: floatCocktail 3s ease-out forwards;
                animation-delay: ${i * 0.3}s;
            `;
            document.body.appendChild(cocktail);
            
            setTimeout(() => {
                if (document.body.contains(cocktail)) {
                    document.body.removeChild(cocktail);
                }
            }, 3500);
        }
    }

    // Craft badge pulse animation
    document.querySelectorAll('.craft-badge').forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'scale(0.8)';
        badge.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            badge.style.opacity = '1';
            badge.style.transform = 'scale(1)';
            
            // Add periodic pulse
            setInterval(() => {
                badge.style.transform = 'scale(1.05)';
                badge.style.boxShadow = '0 0 25px rgba(255, 0, 110, 0.5)';
                setTimeout(() => {
                    badge.style.transform = 'scale(1)';
                    badge.style.boxShadow = '0 0 15px rgba(255, 0, 110, 0.3)';
                }, 300);
            }, 4000 + (index * 1000));
        }, 1500 + (index * 300));
    });

    // Philosophy card enhanced hover
    document.querySelectorAll('.philosophy-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, var(--midnight-black), var(--deep-purple))';
            this.style.borderColor = 'var(--electric-blue)';
            this.style.boxShadow = '0 20px 50px rgba(0, 212, 255, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, var(--midnight-black), var(--smoky-gray))';
            this.style.borderColor = 'var(--neon-pink)';
            this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
        });
    });

    // Add CSS for custom animations
    const cocktailStyles = `
        @keyframes neonShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); box-shadow: 0 0 20px rgba(255, 0, 110, 0.5); }
            75% { transform: translateX(5px); box-shadow: 0 0 20px rgba(0, 212, 255, 0.5); }
        }
        
        @keyframes floatCocktail {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: translateY(-300px) scale(1.2) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: translateY(-600px) scale(0.5) rotate(360deg);
            }
        }
        
        @keyframes neonPulse {
            0%, 100% {
                box-shadow: 0 0 15px rgba(255, 0, 110, 0.3);
            }
            50% {
                box-shadow: 0 0 25px rgba(255, 0, 110, 0.6);
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = cocktailStyles;
    document.head.appendChild(styleSheet);

    // Loading animation for images with neon effect
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

    // Cocktail atmosphere particles
    function createAtmosphereParticles() {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, rgba(255, 0, 110, 0.8), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${5 + Math.random() * 10}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
            `;
            document.body.appendChild(particle);
        }
    }

    // Add particle animation CSS
    const particleStyles = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translateY(0px) translateX(0px);
                opacity: 0.3;
            }
            25% {
                transform: translateY(-20px) translateX(10px);
                opacity: 0.8;
            }
            50% {
                transform: translateY(-10px) translateX(-15px);
                opacity: 0.5;
            }
            75% {
                transform: translateY(-30px) translateX(5px);
                opacity: 0.7;
            }
        }
    `;

    const particleStyleSheet = document.createElement('style');
    particleStyleSheet.textContent = particleStyles;
    document.head.appendChild(particleStyleSheet);

    // Initialize atmosphere particles
    createAtmosphereParticles();

    // Button hover effects
    document.querySelectorAll('.cocktail-btn, .btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(255, 0, 110, 0.6)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
});