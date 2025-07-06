// Rooftop Garden Dining Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
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
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll with garden theme
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.borderBottom = '2px solid var(--accent-green)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.borderBottom = '2px solid var(--light-green)';
        }
    });

    // Enhanced floating leaves animation
    function createNewLeaf() {
        const leaves = ['🍃', '🌿', '🍀', '🌱'];
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
        leaf.style.left = Math.random() * 100 + '%';
        leaf.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
        leaf.style.opacity = Math.random() * 0.5 + 0.1;
        leaf.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        const floatingLeaves = document.querySelector('.floating-leaves');
        if (floatingLeaves) {
            floatingLeaves.appendChild(leaf);
            
            // Remove leaf after animation
            setTimeout(() => {
                if (leaf.parentNode) {
                    leaf.parentNode.removeChild(leaf);
                }
            }, 25000);
        }
    }

    // Add new leaves periodically
    setInterval(createNewLeaf, 3000);

    // Garden ornaments interaction
    const gardenOrnaments = document.querySelectorAll('.garden-ornament');
    gardenOrnaments.forEach(ornament => {
        ornament.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.5) rotate(15deg)';
            this.style.zIndex = '10';
        });
        
        ornament.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.zIndex = 'auto';
        });
    });

    // Eco circle interaction
    const ecoCircle = document.querySelector('.eco-circle');
    const ecoDots = document.querySelectorAll('.eco-dot');
    
    if (ecoCircle) {
        ecoCircle.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            ecoDots.forEach(dot => {
                dot.style.animationPlayState = 'paused';
                dot.style.transform = 'scale(1.2)';
            });
        });
        
        ecoCircle.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            ecoDots.forEach(dot => {
                dot.style.animationPlayState = 'running';
                dot.style.transform = 'scale(1)';
            });
        });
    }

    // Organic card hover effects with nature sounds (visual feedback)
    const organicCards = document.querySelectorAll('.organic-card, .menu-card');
    organicCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            createNatureSparkle(this);
            this.style.transform = 'translateY(-15px) rotate(1deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-15px) rotate(0deg)';
        });
    });

    // Feature card stagger animations
    const featureCards = document.querySelectorAll('.feature-card, .commitment-item');
    featureCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px) scale(1.02)';
            this.style.boxShadow = 'var(--shadow-medium)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(15px) scale(1)';
            this.style.boxShadow = 'var(--shadow-soft)';
        });
    });

    // Menu item cards interaction
    const menuItemCards = document.querySelectorAll('.menu-item-card');
    menuItemCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const badges = this.querySelectorAll('.badge');
            badges.forEach((badge, index) => {
                setTimeout(() => {
                    badge.style.transform = 'scale(1.1)';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const badges = this.querySelectorAll('.badge');
            badges.forEach(badge => {
                badge.style.transform = 'scale(1)';
            });
        });
    });

    // Contact form submission with garden theme
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message with nature theme
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<span>🌱</span><span>Message Sent!</span>';
            button.style.background = 'linear-gradient(135deg, var(--accent-green), var(--light-green))';
            
            // Add success sparkles
            createSuccessGarden(button);
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                this.reset();
            }, 3000);
        });
    }

    // Enhanced button hover animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            createNatureSparkle(this);
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Price tag interaction
    const priceTags = document.querySelectorAll('.price-tag');
    priceTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.background = 'linear-gradient(135deg, var(--accent-green), var(--light-green))';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.background = 'linear-gradient(135deg, var(--primary-green), var(--secondary-green))';
        });
    });

    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'growFromGround 0.8s ease-out forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll(
        '.feature-card, .menu-card, .commitment-item, .contact-card, .hours-card, .location-card'
    );
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Seasonal badge cycling
    const seasonalBadges = document.querySelectorAll('.badge.seasonal');
    const seasons = ['🌸 Spring', '☀️ Summer', '🍂 Fall', '❄️ Winter'];
    let currentSeason = 0;
    
    setInterval(() => {
        seasonalBadges.forEach(badge => {
            const textSpan = badge.querySelector('span:last-child') || badge;
            if (textSpan.textContent === 'Seasonal') {
                textSpan.textContent = seasons[currentSeason];
            }
        });
        currentSeason = (currentSeason + 1) % seasons.length;
    }, 5000);

    // Form field enhancements
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.style.borderColor = 'var(--accent-green)';
            
            // Add focus sparkle
            createNatureSparkle(this.parentElement);
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
            this.style.borderColor = 'var(--background-sage)';
        });
    });

    // Add custom CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes growFromGround {
            from {
                opacity: 0;
                transform: translateY(50px) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
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
        
        @keyframes sparkle {
            0%, 100% { 
                opacity: 0; 
                transform: scale(0) rotate(0deg); 
            }
            50% { 
                opacity: 1; 
                transform: scale(1) rotate(180deg); 
            }
        }
        
        @keyframes gardenGrow {
            0% { 
                transform: scale(0) translateY(20px); 
                opacity: 0; 
            }
            50% { 
                opacity: 1; 
            }
            100% { 
                transform: scale(1) translateY(0); 
                opacity: 0; 
            }
        }
    `;
    document.head.appendChild(style);

    // Utility functions for garden-themed effects
    function createNatureSparkle(element) {
        const sparkleSymbols = ['✨', '🌟', '💫', '⭐', '🌱', '🍃'];
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
        sparkle.style.position = 'absolute';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.fontSize = '1rem';
        sparkle.style.zIndex = '9999';
        
        const rect = element.getBoundingClientRect();
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        document.body.appendChild(sparkle);
        
        sparkle.animate([
            { opacity: 0, transform: 'scale(0) rotate(0deg)' },
            { opacity: 1, transform: 'scale(1) rotate(180deg)' },
            { opacity: 0, transform: 'scale(0) rotate(360deg)' }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => sparkle.remove();
    }

    function createSuccessGarden(element) {
        const gardenSymbols = ['🌱', '🌿', '🍃', '🌸', '🦋', '🌺'];
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const symbol = document.createElement('div');
                symbol.textContent = gardenSymbols[Math.floor(Math.random() * gardenSymbols.length)];
                symbol.style.position = 'absolute';
                symbol.style.pointerEvents = 'none';
                symbol.style.fontSize = '1.5rem';
                symbol.style.zIndex = '9999';
                
                const rect = element.getBoundingClientRect();
                symbol.style.left = (rect.left + rect.width/2 - 10) + 'px';
                symbol.style.top = (rect.top + rect.height/2 - 10) + 'px';
                
                document.body.appendChild(symbol);
                
                symbol.animate([
                    { 
                        opacity: 0, 
                        transform: `scale(0) translateY(0) rotate(0deg)` 
                    },
                    { 
                        opacity: 1, 
                        transform: `scale(1) translateY(-30px) rotate(180deg)` 
                    },
                    { 
                        opacity: 0, 
                        transform: `scale(0) translateY(-60px) rotate(360deg)` 
                    }
                ], {
                    duration: 1500,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }).onfinish = () => symbol.remove();
            }, i * 100);
        }
    }

    // Garden background particles
    function createBackgroundParticle() {
        const particles = ['🌿', '🍃', '🌱', '💨'];
        const particle = document.createElement('div');
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.position = 'fixed';
        particle.style.pointerEvents = 'none';
        particle.style.fontSize = '0.8rem';
        particle.style.opacity = '0.1';
        particle.style.zIndex = '1';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(particle);
        
        particle.animate([
            { 
                transform: 'translateY(0) rotate(0deg)',
                opacity: 0.1
            },
            { 
                transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`,
                opacity: 0
            }
        ], {
            duration: Math.random() * 20000 + 15000,
            easing: 'linear'
        }).onfinish = () => particle.remove();
    }

    // Create background particles periodically
    setInterval(createBackgroundParticle, 8000);

    // Initialize lazy loading for images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                img.onload = () => {
                    img.style.opacity = '1';
                };
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    console.log('🌱 Rooftop Garden Dining - Welcome to sustainable dining! 🌿');
});