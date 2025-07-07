// Modern Japanese Ramen Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message (replace with actual form handling)
            alert('ありがとうございます！Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background img');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'var(--white)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // Scroll animations using Intersection Observer
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
    document.querySelectorAll('.ramen-item, .extra-item, .process-step, .location-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Stagger animations for grid items
    function staggerAnimation(selector, delay = 100) {
        const items = document.querySelectorAll(selector);
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * delay);
        });
    }
    
    // Trigger stagger animations when sections come into view
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('menu-preview')) {
                    staggerAnimation('.ramen-item');
                } else if (entry.target.classList.contains('locations')) {
                    staggerAnimation('.location-card');
                }
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('.menu-preview, .locations').forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Enhanced hover effects for ramen items
    document.querySelectorAll('.ramen-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });
    
    // Order option interactions with enhanced feedback
    document.querySelectorAll('.order-option').forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show order modal or redirect
            const orderType = this.querySelector('h3').textContent;
            const message = orderType === 'Delivery' ? 
                'Redirecting to delivery ordering...' : 
                'Redirecting to pickup ordering...';
            
            // Create a temporary notification
            showNotification(message);
        });
    });
    
    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--secondary);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: var(--shadow-lg);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Spice level indicator interactions
    document.querySelectorAll('.spice-level').forEach(indicator => {
        indicator.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        indicator.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Process step animations
    document.querySelectorAll('.process-step').forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px) scale(1.02)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
    
    // Philosophy section typewriter effect for Japanese text
    function typewriterEffect(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Trigger typewriter when philosophy section is in view
    const philosophyObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const japaneseText = entry.target.querySelector('.japanese-text');
                if (japaneseText && !japaneseText.dataset.animated) {
                    const originalText = japaneseText.textContent;
                    typewriterEffect(japaneseText, originalText, 200);
                    japaneseText.dataset.animated = 'true';
                }
            }
        });
    }, { threshold: 0.5 });
    
    const philosophySection = document.querySelector('.philosophy');
    if (philosophySection) {
        philosophyObserver.observe(philosophySection);
    }
    
    // Image lazy loading with fade-in effect
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.style.opacity = '1';
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img').forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.6s ease';
            imageObserver.observe(img);
            
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        });
    }
    
    // Dynamic color scheme switching (optional feature)
    function switchColorScheme(scheme) {
        document.body.className = `color-scheme-${scheme}`;
        localStorage.setItem('ramenColorScheme', scheme);
    }
    
    // Load saved color scheme
    const savedScheme = localStorage.getItem('ramenColorScheme');
    if (savedScheme) {
        switchColorScheme(savedScheme);
    }
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Enhanced scroll behavior for sections
    let ticking = false;
    
    function updateOnScroll() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Parallax for various elements
        document.querySelectorAll('.philosophy-image img').forEach(img => {
            const rect = img.getBoundingClientRect();
            if (rect.bottom >= 0 && rect.top <= windowHeight) {
                const speed = 0.5;
                img.style.transform = `translateY(${(rect.top - windowHeight) * speed}px)`;
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
    
    // Location card interactions
    document.querySelectorAll('.location-card').forEach(card => {
        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Could open a map or more details
            const locationName = this.querySelector('h3').textContent;
            showNotification(`Getting directions to ${locationName}...`);
        });
    });
    
    // Smooth reveal animations for stats
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = entry.target.querySelectorAll('.stat h4');
                stats.forEach((stat, index) => {
                    setTimeout(() => {
                        stat.style.transform = 'scale(1.2)';
                        stat.style.color = 'var(--secondary)';
                        setTimeout(() => {
                            stat.style.transform = 'scale(1)';
                        }, 200);
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.7 });
    
    const craftStats = document.querySelector('.craft-stats');
    if (craftStats) {
        statsObserver.observe(craftStats);
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
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
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
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
    
    .ramen-item {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .order-option {
        transition: transform 0.2s ease, background-color 0.3s ease;
    }
    
    .process-step {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .location-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer;
    }
    
    .spice-level {
        transition: transform 0.2s ease;
    }
    
    .stat h4 {
        transition: transform 0.2s ease, color 0.2s ease;
    }
`;
document.head.appendChild(style);