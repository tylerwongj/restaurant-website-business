// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Smooth Scrolling
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

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.borderBottom = '1px solid rgba(255, 107, 107, 0.3)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.borderBottom = '1px solid rgba(255, 107, 107, 0.2)';
    }
});

// Tropical animated elements
function initTropicalAnimations() {
    // Parallax effect for floating elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const palmLeaves = document.querySelectorAll('.palm-leaf');
        
        palmLeaves.forEach((leaf, index) => {
            const speed = 0.5 + (index * 0.2);
            leaf.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
        });
        
        // Wave animation based on scroll
        const waves = document.querySelectorAll('.hero-waves path, .footer-waves path');
        waves.forEach(wave => {
            const offset = Math.sin(scrolled * 0.01) * 10;
            wave.style.transform = `translateY(${offset}px)`;
        });
    });
}

// Tropical card hover effects
function initCardEffects() {
    const cards = document.querySelectorAll('.paradise-card, .menu-card, .contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add tropical glow effect
            this.style.boxShadow = '0 20px 40px rgba(255, 107, 107, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Animated statistics counter
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const finalValue = stat.textContent.replace(/[^\d]/g, '');
                let currentValue = 0;
                const increment = finalValue / 50;
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        stat.textContent = stat.textContent.replace(/\d+/, finalValue);
                        clearInterval(counter);
                    } else {
                        stat.textContent = stat.textContent.replace(/\d+/, Math.floor(currentValue));
                    }
                }, 50);
                
                observer.unobserve(stat);
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
}

// Contact Form with Tropical Styling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const phone = contactForm.querySelector('input[type="tel"]').value;
            const occasion = contactForm.querySelector('select').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Validation
            if (!name || !email) {
                showTropicalMessage('Please fill in your name and email! 🌺', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showTropicalMessage('Please enter a valid email address! 📧', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending to Paradise... 🌴';
            submitBtn.disabled = true;
            
            // Add loading animation
            submitBtn.style.background = 'linear-gradient(135deg, #4ecdc4, #45b7d1)';
            
            setTimeout(() => {
                showTropicalMessage('Aloha! Your message has been sent! We\'ll get back to you soon! 🌺🌊', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        });
    }
    
    // Initialize animations
    initTropicalAnimations();
    initCardEffects();
    animateStats();
    initMenuCardAnimations();
});

// Tropical message display
function showTropicalMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.tropical-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const message = document.createElement('div');
    message.className = `tropical-message ${type}`;
    message.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        font-size: 1rem;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        ${type === 'success' ? 
            'background: linear-gradient(135deg, #4ecdc4, #45b7d1); color: white;' : 
            'background: linear-gradient(135deg, #ff6b6b, #ee5a52); color: white;'
        }
    `;
    message.textContent = text;
    
    document.body.appendChild(message);
    
    // Animate in
    setTimeout(() => {
        message.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        message.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 300);
    }, 5000);
}

// Menu card interactions
function initMenuCardAnimations() {
    const menuCards = document.querySelectorAll('.menu-card, .featured-item');
    
    menuCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add tropical bounce effect
            this.style.transform = 'translateY(-10px) rotate(2deg) scale(1.02)';
            
            // Add shimmer effect
            const shimmer = document.createElement('div');
            shimmer.style.cssText = `
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                transition: left 0.5s;
                pointer-events: none;
                z-index: 10;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(shimmer);
            
            setTimeout(() => {
                shimmer.style.left = '100%';
            }, 50);
            
            setTimeout(() => {
                if (shimmer.parentNode) {
                    shimmer.remove();
                }
            }, 600);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Tropical loading animation
window.addEventListener('load', function() {
    // Add entrance animation to page elements
    const animatedElements = document.querySelectorAll('section');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Add tropical sound effects (optional - can be enabled/disabled)
function addTropicalSounds() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Create a subtle click sound effect using Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        });
    });
}

// Weather-based background effects (fun feature)
function addWeatherEffects() {
    // Simulate tropical weather patterns
    const weatherEffects = ['sunny', 'breezy', 'tropical-storm'];
    const currentWeather = weatherEffects[Math.floor(Math.random() * weatherEffects.length)];
    
    if (currentWeather === 'breezy') {
        // Add gentle swaying animation to elements
        const swayElements = document.querySelectorAll('.palm-leaf, .hero-image');
        swayElements.forEach(element => {
            element.style.animation += ', sway 4s ease-in-out infinite';
        });
        
        // Add CSS for sway animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes sway {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(2deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize all tropical features
document.addEventListener('DOMContentLoaded', function() {
    // Comment out sound effects by default to avoid being annoying
    // addTropicalSounds();
    addWeatherEffects();
});