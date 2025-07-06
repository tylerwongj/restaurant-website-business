// Seafood Coastal Restaurant Template - Interactive Features

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

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Event Tile Hover Effects
    const eventTiles = document.querySelectorAll('.event-tile');
    eventTiles.forEach(tile => {
        tile.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        tile.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Menu Card Animations
    const menuCards = document.querySelectorAll('.menu-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const menuObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    menuCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        menuObserver.observe(card);
    });

    // Add to Cart Button Effects
    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Visual feedback for adding to cart
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.style.backgroundColor = '#4caf50';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 1500);
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (rect.width / 2 - size / 2) + 'px';
            ripple.style.top = (rect.height / 2 - size / 2) + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });

    // Promotional Button Interactions
    const promoButtons = document.querySelectorAll('.btn-event, .btn-small');
    promoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create wave effect
            const rect = this.getBoundingClientRect();
            const wave = document.createElement('div');
            wave.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                pointer-events: none;
                transform: scale(0);
                left: ${e.clientX - rect.left - 10}px;
                top: ${e.clientY - rect.top - 10}px;
                animation: wave 0.5s ease-out;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(wave);
            
            setTimeout(() => {
                if (wave.parentNode) {
                    wave.parentNode.removeChild(wave);
                }
            }, 500);
        });
    });

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-background img');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Animated Counter for Rewards Section
    const rewards = document.querySelector('.rewards-section');
    if (rewards) {
        const rewardsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateRewardsIcons();
                    rewardsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        rewardsObserver.observe(rewards);
    }

    function animateRewardsIcons() {
        const icons = document.querySelectorAll('.benefit-icon');
        icons.forEach((icon, index) => {
            setTimeout(() => {
                icon.style.animation = 'bounce 0.6s ease';
            }, index * 200);
        });
    }

    // Contact Form Enhancement (if form exists)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#f44336';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.textContent = 'Thank you! We\'ll be in touch soon.';
                successMsg.style.cssText = `
                    background: #4caf50;
                    color: white;
                    padding: 1rem;
                    border-radius: 5px;
                    margin-top: 1rem;
                    text-align: center;
                `;
                this.appendChild(successMsg);
                
                // Reset form
                setTimeout(() => {
                    this.reset();
                    if (successMsg.parentNode) {
                        successMsg.parentNode.removeChild(successMsg);
                    }
                }, 3000);
            }
        });
    }

    // Navbar Background Change on Scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(211, 47, 47, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'var(--primary-red)';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Event Tiles Click Handlers
    const eventTileHandlers = {
        'happy-hour': () => console.log('Happy Hour clicked'),
        'gift-cards': () => console.log('Gift Cards clicked'),
        'cheddar-days': () => console.log('Cheddar Days clicked'),
        'daily-deals': () => console.log('Daily Deals clicked'),
        'group-dining': () => console.log('Group Dining clicked'),
        'rewards': () => console.log('Rewards clicked')
    };

    Object.keys(eventTileHandlers).forEach(className => {
        const tile = document.querySelector(`.${className}`);
        if (tile) {
            tile.addEventListener('click', eventTileHandlers[className]);
        }
    });
});

// CSS Animations (injected via JavaScript)
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes wave {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
            transform: translateY(0);
        }
        40%, 43% {
            transform: translateY(-15px);
        }
        70% {
            transform: translateY(-7px);
        }
        90% {
            transform: translateY(-3px);
        }
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: var(--primary-red);
        padding: 1rem;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);