// Farm-to-Table Template JavaScript

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
                const offsetTop = target.offsetTop - 75;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(250, 248, 245, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(250, 248, 245, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // Seasonal badge rotation
    const seasonBadge = document.querySelector('.season-badge');
    if (seasonBadge) {
        const seasons = ['Spring Harvest', 'Summer Bounty', 'Fall Harvest', 'Winter Roots'];
        const currentSeason = new Date().getMonth();
        let seasonIndex;
        
        if (currentSeason >= 2 && currentSeason <= 4) seasonIndex = 0; // Spring
        else if (currentSeason >= 5 && currentSeason <= 7) seasonIndex = 1; // Summer
        else if (currentSeason >= 8 && currentSeason <= 10) seasonIndex = 2; // Fall
        else seasonIndex = 3; // Winter
        
        seasonBadge.textContent = seasons[seasonIndex];
    }

    // Current season indicator
    const currentSeasonElement = document.querySelector('.current-season');
    if (currentSeasonElement) {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        
        let season;
        if (month >= 2 && month <= 4) season = 'Spring';
        else if (month >= 5 && month <= 7) season = 'Summer';
        else if (month >= 8 && month <= 10) season = 'Fall';
        else season = 'Winter';
        
        currentSeasonElement.textContent = `${season} ${year} Menu`;
    }

    // Animated counter for farm statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const text = counter.textContent;
            const target = parseInt(text);
            if (isNaN(target)) return;
            
            const increment = target / 50;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + (text.includes('+') ? '+' : '');
                    setTimeout(updateCounter, 40);
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
                if (entry.target.classList.contains('farm-stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Apply animation to elements
    document.querySelectorAll('.value-card, .partner-card, .menu-item, .about-text, .farm-stats').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Enhanced hover effects for partner cards
    document.querySelectorAll('.partner-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.partner-image img');
            const products = this.querySelectorAll('.product');
            
            image.style.transform = 'scale(1.1)';
            image.style.filter = 'brightness(1.1) saturate(1.2)';
            
            products.forEach((product, index) => {
                setTimeout(() => {
                    product.style.transform = 'scale(1.1)';
                    product.style.background = 'var(--harvest-gold)';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.partner-image img');
            const products = this.querySelectorAll('.product');
            
            image.style.transform = 'scale(1)';
            image.style.filter = 'brightness(1) saturate(1)';
            
            products.forEach(product => {
                product.style.transform = 'scale(1)';
                product.style.background = 'var(--sage-green)';
            });
        });
    });

    // Menu item source highlighting
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const source = this.querySelector('.farm-source');
            const image = this.querySelector('.menu-item-image img');
            
            if (source) {
                source.style.color = 'var(--harvest-gold)';
                source.style.fontWeight = '700';
                source.style.transform = 'scale(1.05)';
            }
            
            if (image) {
                image.style.transform = 'scale(1.1)';
                image.style.filter = 'brightness(1.1) saturate(1.2)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const source = this.querySelector('.farm-source');
            const image = this.querySelector('.menu-item-image img');
            
            if (source) {
                source.style.color = 'var(--sage-green)';
                source.style.fontWeight = '600';
                source.style.transform = 'scale(1)';
            }
            
            if (image) {
                image.style.transform = 'scale(1)';
                image.style.filter = 'brightness(1) saturate(1)';
            }
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
                    input.style.borderColor = '#8b4513';
                    input.style.background = 'rgba(139, 69, 19, 0.1)';
                    
                    // Add organic shake animation
                    input.style.animation = 'organicShake 0.6s ease-in-out';
                    setTimeout(() => {
                        input.style.animation = '';
                    }, 600);
                } else {
                    input.style.borderColor = 'var(--harvest-gold)';
                    input.style.background = 'rgba(212, 175, 55, 0.1)';
                }
            });
            
            if (isValid) {
                const submitBtn = reservationForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                // Success animation
                submitBtn.textContent = 'Table Reserved!';
                submitBtn.style.background = '#228b22';
                submitBtn.style.transform = 'scale(1.05)';
                
                // Create floating farm elements
                createFloatingFarmElements();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.transform = '';
                    reservationForm.reset();
                }, 3000);
            }
        });

        // Real-time form validation with organic styling
        reservationForm.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('focus', function() {
                this.style.borderColor = 'var(--sage-green)';
                this.style.background = 'rgba(135, 169, 107, 0.1)';
            });
            
            field.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = 'rgba(139, 69, 19, 0.5)';
                } else {
                    this.style.borderColor = 'var(--harvest-gold)';
                    this.style.background = 'rgba(212, 175, 55, 0.1)';
                }
            });
            
            field.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = 'var(--harvest-gold)';
                    this.style.background = 'rgba(212, 175, 55, 0.1)';
                }
            });
        });
    }

    // Floating farm elements animation for success
    function createFloatingFarmElements() {
        const farmElements = ['🌱', '🥕', '🌽', '🍅', '🥬', '🚜'];
        for (let i = 0; i < 8; i++) {
            const element = document.createElement('div');
            element.textContent = farmElements[Math.floor(Math.random() * farmElements.length)];
            element.style.cssText = `
                position: fixed;
                font-size: 2rem;
                z-index: 10000;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: 100%;
                animation: floatFarm 3s ease-out forwards;
                animation-delay: ${i * 0.2}s;
            `;
            document.body.appendChild(element);
            
            setTimeout(() => {
                if (document.body.contains(element)) {
                    document.body.removeChild(element);
                }
            }, 3500);
        }
    }

    // Farm badge stagger animation
    document.querySelectorAll('.farm-badge').forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
        badge.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, 1200 + (index * 200));
    });

    // Value card progressive animation
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.3}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #fff, #f5f3f0)';
            this.style.borderColor = 'var(--harvest-gold)';
            this.style.boxShadow = '0 20px 50px rgba(212, 175, 55, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'white';
            this.style.borderColor = 'var(--sage-green)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });

    // Seasonal transitions
    function createSeasonalTransition() {
        const seasonalOverlay = document.createElement('div');
        seasonalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, 
                transparent, 
                rgba(135, 169, 107, 0.1), 
                transparent);
            pointer-events: none;
            z-index: 1;
            opacity: 0;
            transition: opacity 2s ease;
        `;
        document.body.appendChild(seasonalOverlay);
        
        // Trigger seasonal effect periodically
        setInterval(() => {
            seasonalOverlay.style.opacity = '1';
            setTimeout(() => {
                seasonalOverlay.style.opacity = '0';
            }, 1000);
        }, 30000); // Every 30 seconds
    }

    // Add CSS for custom animations
    const farmStyles = `
        @keyframes organicShake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-3px) rotate(-1deg); }
            40% { transform: translateX(3px) rotate(1deg); }
            60% { transform: translateX(-2px) rotate(-0.5deg); }
            80% { transform: translateX(2px) rotate(0.5deg); }
        }
        
        @keyframes floatFarm {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: translateY(-200px) scale(1.2) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: translateY(-400px) scale(0.8) rotate(360deg);
            }
        }
        
        @keyframes growIn {
            from {
                opacity: 0;
                transform: scale(0.8) translateY(20px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = farmStyles;
    document.head.appendChild(styleSheet);

    // Loading animation for images with organic feel
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
            img.style.filter = 'blur(3px)';
            img.style.transition = 'opacity 0.8s ease, filter 0.8s ease';
        }
    });

    // Initialize seasonal transition effect
    createSeasonalTransition();

    // Organic grow-in effect for key elements
    document.querySelectorAll('.farm-title, .section-title').forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.9) translateY(20px)';
        element.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1) translateY(0)';
        }, 500 + (index * 200));
    });

    // Hover effects for buttons
    document.querySelectorAll('.farm-btn, .btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 25px rgba(74, 93, 35, 0.4)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // Farm-to-table connection visualization
    document.querySelectorAll('.partner-card').forEach((card, index) => {
        card.addEventListener('click', function() {
            // Highlight menu items from this farm
            const farmName = this.querySelector('h3').textContent;
            document.querySelectorAll('.farm-source').forEach(source => {
                if (source.textContent.includes(farmName.split(' ')[0])) {
                    const menuItem = source.closest('.menu-item');
                    menuItem.style.background = 'rgba(212, 175, 55, 0.2)';
                    menuItem.style.borderLeftColor = 'var(--harvest-gold)';
                    
                    setTimeout(() => {
                        menuItem.style.background = '';
                        menuItem.style.borderLeftColor = '';
                    }, 3000);
                }
            });
        });
    });
});