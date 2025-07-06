// Industrial Modern Template JavaScript

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

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
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
    const animateElements = document.querySelectorAll('.feature, .menu-item, .hours-card, .location-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Parallax Effect for Hero Section
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background img');

    if (hero && heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${parallax}px) scale(1.1)`;
        });
    }

    // Button Glow Effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            const glow = this.querySelector('.btn-glow');
            if (glow) {
                glow.style.opacity = '0.4';
                glow.style.animation = 'glow-pulse 1s infinite alternate';
            }
        });

        btn.addEventListener('mouseleave', function() {
            const glow = this.querySelector('.btn-glow');
            if (glow) {
                glow.style.opacity = '0';
                glow.style.animation = 'none';
            }
        });
    });

    // Form Enhancement
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });

        // Check if input has value on page load
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });

    // Menu Item Hover Effects
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 40px rgba(255, 107, 53, 0.4)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 30px rgba(255, 107, 53, 0.3)';
        });
    });

    // Section Number Animation
    const sectionNumbers = document.querySelectorAll('.section-number');
    const numberObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'number-glow 2s ease-in-out';
            }
        });
    }, observerOptions);

    sectionNumbers.forEach(num => {
        numberObserver.observe(num);
    });

    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent!</span>';
                submitBtn.style.background = '#4caf50';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Add custom CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glow-pulse {
            0% { opacity: 0.2; }
            100% { opacity: 0.6; }
        }

        @keyframes number-glow {
            0% { text-shadow: none; }
            50% { text-shadow: 0 0 20px var(--primary-color); }
            100% { text-shadow: none; }
        }

        .focused .form-line {
            width: 100% !important;
        }

        .menu-item:hover {
            animation: menu-hover 0.3s ease;
        }

        @keyframes menu-hover {
            0% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(-10px); }
        }

        .feature:hover {
            animation: feature-highlight 0.3s ease;
        }

        @keyframes feature-highlight {
            0% { transform: translateY(0); }
            100% { transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(style);

    // Initialize page with subtle entrance animation
    document.body.style.opacity = '0';
    window.addEventListener('load', function() {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    });
});

// Performance optimization for scroll events
let ticking = false;

function updateOnScroll() {
    // Add any scroll-based updates here
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);