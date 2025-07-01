// Artisan Bakery Template JavaScript

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
            navbar.style.background = 'rgba(250, 240, 230, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(250, 240, 230, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // Animated counter for highlights
    function animateCounters() {
        const counters = document.querySelectorAll('.highlight-number');
        
        counters.forEach(counter => {
            const text = counter.textContent;
            if (text.includes('AM')) return; // Skip time values
            
            const target = parseInt(text);
            if (isNaN(target)) return;
            
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + (text.includes('+') ? '+' : '') + 
                                          (text.includes('%') ? '%' : '');
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = text; // Restore original text
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
                
                // Trigger counter animation when highlights section is visible
                if (entry.target.classList.contains('bakery-highlights')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Apply animation to elements
    document.querySelectorAll('.fresh-card, .specialty-card, .menu-item, .about-text, .bakery-highlights').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Enhanced hover effects for specialty cards
    document.querySelectorAll('.specialty-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.specialty-image img');
            const content = this.querySelector('.specialty-content');
            
            image.style.transform = 'scale(1.1)';
            content.style.background = 'rgba(255, 215, 0, 0.1)';
            
            // Add shimmer effect
            this.style.background = 'linear-gradient(135deg, #faf0e6, #f5f5dc, #fff8dc)';
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.specialty-image img');
            const content = this.querySelector('.specialty-content');
            
            image.style.transform = 'scale(1)';
            content.style.background = '';
            this.style.background = '';
        });
    });

    // Menu item hover animations
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #fff, #faf0e6)';
            const price = this.querySelector('.price');
            price.style.transform = 'scale(1.1)';
            price.style.color = 'var(--rustic-brown)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'white';
            const price = this.querySelector('.price');
            price.style.transform = 'scale(1)';
            price.style.color = 'var(--golden-honey)';
        });
    });

    // Order form handling with enhanced validation
    const orderForm = document.querySelector('.order-form form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = orderForm.querySelectorAll('input[required], select[required], textarea[required]');
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
                    input.style.borderColor = 'var(--golden-honey)';
                    input.style.background = 'rgba(255, 215, 0, 0.1)';
                }
            });
            
            if (isValid) {
                const submitBtn = orderForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                // Success animation
                submitBtn.textContent = 'Order Received!';
                submitBtn.style.background = '#32cd32';
                submitBtn.style.transform = 'scale(1.05)';
                
                // Create floating bread animation
                createFloatingBread();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.transform = '';
                    orderForm.reset();
                }, 3000);
            }
        });

        // Real-time form validation
        orderForm.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = 'var(--golden-honey)';
                    this.style.background = 'rgba(255, 215, 0, 0.1)';
                }
            });
        });
    }

    // Floating bread animation for success
    function createFloatingBread() {
        for (let i = 0; i < 5; i++) {
            const bread = document.createElement('div');
            bread.textContent = '🥖';
            bread.style.cssText = `
                position: fixed;
                font-size: 2rem;
                z-index: 10000;
                pointer-events: none;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: floatBread 2s ease-out forwards;
                animation-delay: ${i * 0.2}s;
            `;
            document.body.appendChild(bread);
            
            setTimeout(() => {
                document.body.removeChild(bread);
            }, 2500);
        }
    }

    // Fresh card stagger animation
    const freshCards = document.querySelectorAll('.fresh-card');
    freshCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Schedule animation
    function animateSchedule() {
        const scheduleItems = document.querySelectorAll('.schedule-item');
        scheduleItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }

    // Initialize schedule items as hidden
    document.querySelectorAll('.schedule-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Trigger schedule animation when visible
    const scheduleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSchedule();
                scheduleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const scheduleSection = document.querySelector('.bakery-schedule');
    if (scheduleSection) {
        scheduleObserver.observe(scheduleSection);
    }

    // Add CSS for animations
    const bakeryStyles = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        @keyframes floatBread {
            0% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -200px) scale(0.5) rotate(360deg);
            }
        }
        
        @keyframes breadcrumbFall {
            0% {
                opacity: 1;
                transform: translateY(0) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translateY(100px) rotate(180deg);
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = bakeryStyles;
    document.head.appendChild(styleSheet);

    // Breadcrumb trail effect on scroll
    let breadcrumbTimer;
    window.addEventListener('scroll', function() {
        clearTimeout(breadcrumbTimer);
        breadcrumbTimer = setTimeout(() => {
            if (Math.random() < 0.1) { // 10% chance
                createBreadcrumb();
            }
        }, 100);
    });

    function createBreadcrumb() {
        const breadcrumbs = ['🍞', '🥐', '🧁', '🍪'];
        const breadcrumb = document.createElement('div');
        breadcrumb.textContent = breadcrumbs[Math.floor(Math.random() * breadcrumbs.length)];
        breadcrumb.style.cssText = `
            position: fixed;
            font-size: 1.5rem;
            z-index: 1;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: -50px;
            animation: breadcrumbFall 3s ease-in forwards;
            opacity: 0.3;
        `;
        document.body.appendChild(breadcrumb);
        
        setTimeout(() => {
            if (document.body.contains(breadcrumb)) {
                document.body.removeChild(breadcrumb);
            }
        }, 3000);
    }

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
            img.style.filter = 'blur(3px)';
            img.style.transition = 'opacity 0.6s ease, filter 0.6s ease';
        }
    });

    // Feature tags animation
    document.querySelectorAll('.feature-tag').forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        tag.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, 1000 + (index * 200));
    });

    // Add hover sound effect simulation (visual feedback)
    document.querySelectorAll('.bakery-btn, .btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 25px rgba(139, 69, 19, 0.4)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
});