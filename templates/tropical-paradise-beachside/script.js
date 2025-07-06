// Tropical Paradise Beachside Restaurant JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileNavToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileNavToggle.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.menu-item, .feature, .contact-item, .hours-day, .menu-item-row');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Show success message (customize this for actual form handling)
            showNotification('Thank you for your reservation request! We\'ll contact you soon to confirm.', 'success');
            
            // Reset form
            this.reset();
        });
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image img');
    
    if (hero && heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < hero.offsetHeight) {
                heroImage.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Menu item hover effects
    const menuItems = document.querySelectorAll('.menu-item, .menu-item-row');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('menu-item-row') ? 'translateX(10px)' : 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('menu-item-row') ? 'translateX(0)' : 'translateY(0)';
        });
    });

    // Floating card animation
    const floatingCard = document.querySelector('.floating-card');
    if (floatingCard) {
        let floatDirection = 1;
        setInterval(() => {
            floatingCard.style.transform = `translateY(${floatDirection * 10}px)`;
            floatDirection *= -1;
        }, 2000);
    }

    // Color scheme switcher (for demo purposes)
    function addColorSchemeSwitcher() {
        const schemes = ['classic-scheme', 'business-scheme', 'warm-scheme', 'cool-scheme', 'bold-scheme'];
        
        // Create scheme switcher button (hidden by default)
        const switcher = document.createElement('div');
        switcher.style.position = 'fixed';
        switcher.style.bottom = '20px';
        switcher.style.right = '20px';
        switcher.style.zIndex = '1000';
        switcher.style.display = 'none'; // Hidden unless activated
        
        schemes.forEach(scheme => {
            const button = document.createElement('button');
            button.textContent = scheme.replace('-scheme', '');
            button.style.display = 'block';
            button.style.margin = '5px 0';
            button.style.padding = '10px';
            button.style.border = 'none';
            button.style.borderRadius = '5px';
            button.style.cursor = 'pointer';
            button.style.textTransform = 'capitalize';
            
            button.addEventListener('click', () => {
                document.body.className = scheme;
            });
            
            switcher.appendChild(button);
        });
        
        document.body.appendChild(switcher);
    }

    // Add color scheme switcher
    addColorSchemeSwitcher();

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    // Wave animation for hero section
    function animateWaves() {
        const waves = document.querySelector('.waves svg path');
        if (waves) {
            let offset = 0;
            setInterval(() => {
                offset += 0.5;
                waves.style.transform = `translateX(${Math.sin(offset) * 10}px)`;
            }, 100);
        }
    }
    
    animateWaves();

    // Tropical background particles (optional enhancement)
    function createTropicalParticles() {
        const particles = ['🌺', '🌴', '🐚', '🦋', '☀️'];
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 20 + 10}px;
                left: ${Math.random() * 100}%;
                top: 100%;
                opacity: ${Math.random() * 0.3 + 0.1};
                animation: float-up ${Math.random() * 10 + 15}s linear infinite;
            `;
            
            container.appendChild(particle);
            
            setTimeout(() => {
                if (container.contains(particle)) {
                    container.removeChild(particle);
                }
            }, 20000);
        }
        
        // Add CSS for floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-up {
                from {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0.3;
                }
                50% {
                    opacity: 0.1;
                }
                to {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(container);
        
        // Create particles periodically
        setInterval(createParticle, 3000);
    }
    
    // Uncomment to enable tropical particles
    // createTropicalParticles();

    // Loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Enhanced scroll effects
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Parallax for about section
        const aboutSection = document.querySelector('.about');
        const aboutImage = document.querySelector('.about-image img');
        
        if (aboutSection && aboutImage) {
            const aboutOffset = aboutSection.offsetTop;
            const windowHeight = window.innerHeight;
            
            if (scrolled > aboutOffset - windowHeight && scrolled < aboutOffset + aboutSection.offsetHeight) {
                const rate = (scrolled - aboutOffset + windowHeight) * -0.1;
                aboutImage.style.transform = `translateY(${rate}px)`;
            }
        }
    });

    console.log('🌺 Tropical Paradise Restaurant website loaded successfully! 🌴');
});