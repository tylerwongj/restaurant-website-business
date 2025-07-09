// Cyberpunk Neon Kitchen Restaurant Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cyberpunk effects
    initializeCyberpunkEffects();
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

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

    // Smooth scrolling for navigation links
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

    // Enhanced navbar effects
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.borderBottom = '2px solid var(--neon-pink)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.borderBottom = '2px solid var(--neon-cyan)';
        }
    });

    // Cyberpunk typing effect
    const typingElements = document.querySelectorAll('.typing-effect');
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--neon-green)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 1000);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });

    // Glitch effect enhancement
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.1s infinite';
            setTimeout(() => {
                this.style.animation = 'glitch 2s infinite';
            }, 500);
        });
    });

    // Hologram interaction
    const holograms = document.querySelectorAll('.hologram');
    holograms.forEach((hologram, index) => {
        hologram.style.animationDelay = `${index * 1.5}s`;
        
        hologram.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--neon-cyan)';
            this.style.background = 'rgba(0, 255, 255, 0.2)';
            this.style.transform = 'scale(1.1)';
        });
        
        hologram.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--neon-purple)';
            this.style.background = 'rgba(128, 0, 255, 0.1)';
            this.style.transform = 'scale(1)';
        });
    });

    // Cyber card hover effects
    const cyberCards = document.querySelectorAll('.cyber-card');
    cyberCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = `
                0 0 30px rgba(0, 255, 255, 0.5),
                inset 0 0 30px rgba(0, 255, 255, 0.2)
            `;
            this.style.borderColor = 'var(--neon-pink)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = `
                0 0 20px rgba(0, 255, 255, 0.3),
                inset 0 0 20px rgba(0, 255, 255, 0.1)
            `;
            this.style.borderColor = 'var(--neon-cyan)';
        });
    });

    // Cyber items hover effects
    const cyberItems = document.querySelectorAll('.cyber-item');
    cyberItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--neon-cyan)';
            this.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Trigger hologram scan
            const scan = this.querySelector('.holo-scan');
            if (scan) {
                scan.style.animation = 'holo-scan 0.8s ease-out';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--neon-purple)';
            this.style.boxShadow = 'none';
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Form validation and cyberpunk effects
    const reservationForm = document.querySelector('.reservation-form');
    if (reservationForm) {
        // Add focus effects to inputs
        const inputs = reservationForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentNode.querySelector('.input-glow').style.opacity = '0.3';
                this.style.borderColor = 'var(--neon-green)';
                this.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.5)';
            });
            
            input.addEventListener('blur', function() {
                this.parentNode.querySelector('.input-glow').style.opacity = '0';
                this.style.borderColor = 'var(--neon-cyan)';
                this.style.boxShadow = 'none';
            });
        });

        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate required fields
            const requiredFields = ['name', 'email', 'phone', 'guests', 'date', 'time'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!input.value.trim()) {
                    input.style.borderColor = 'var(--neon-pink)';
                    input.style.boxShadow = '0 0 15px rgba(255, 0, 128, 0.5)';
                    isValid = false;
                    
                    // Add glitch effect to invalid fields
                    input.style.animation = 'glitch-red 0.5s infinite';
                    setTimeout(() => {
                        input.style.animation = 'none';
                    }, 2000);
                } else {
                    input.style.borderColor = 'var(--neon-green)';
                    input.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.3)';
                }
            });
            
            // Email validation
            const emailInput = this.querySelector('[name="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailInput.style.borderColor = 'var(--neon-pink)';
                emailInput.style.boxShadow = '0 0 15px rgba(255, 0, 128, 0.5)';
                isValid = false;
            }
            
            if (isValid) {
                // Show success animation
                showCyberpunkNotification('NEURAL LINK ESTABLISHED - RESERVATION PROCESSING...', 'success');
                
                // Reset form with cyberpunk effect
                setTimeout(() => {
                    this.reset();
                    showCyberpunkNotification('BOOKING CONFIRMED - PREPARE FOR NEURAL DINING', 'success');
                }, 2000);
            } else {
                showCyberpunkNotification('ERROR: INVALID INPUT PARAMETERS - PLEASE VERIFY DATA', 'error');
            }
        });
    }

    // Parallax effects
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Hero parallax
        const heroImg = document.querySelector('.hero-bg img');
        if (heroImg) {
            const speed = scrolled * 0.3;
            heroImg.style.transform = `translateY(${speed}px) scale(1.1)`;
        }
        
        // Grid movement
        const grids = document.querySelectorAll('.cyber-grid');
        grids.forEach(grid => {
            const speed = scrolled * 0.1;
            grid.style.transform = `translate(${speed}px, ${speed}px)`;
        });
        
        // Floating holograms
        holograms.forEach((hologram, index) => {
            const speed = scrolled * (0.1 + index * 0.05);
            hologram.style.transform = `translateY(${-speed}px) rotate(${speed * 0.5}deg)`;
        });
    });

    // Dynamic background color shifting
    let colorShift = 0;
    function animateBackground() {
        colorShift += 0.5;
        
        const body = document.body;
        const hue1 = (180 + colorShift) % 360;
        const hue2 = (300 + colorShift) % 360;
        
        body.style.background = `
            radial-gradient(circle at 20% 80%, hsla(${hue1}, 100%, 50%, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, hsla(${hue2}, 100%, 50%, 0.1) 0%, transparent 50%),
            linear-gradient(180deg, var(--dark-bg) 0%, var(--darker-bg) 100%)
        `;
        
        requestAnimationFrame(animateBackground);
    }
    
    // Start background animation
    animateBackground();

    // Intersection Observer for element animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                
                // Add special effects for specific elements
                if (entry.target.classList.contains('cyber-card')) {
                    entry.target.style.animation = 'cyber-materialize 0.8s ease-out';
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.cyber-card, .cyber-item, .feature-cyber').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.9)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Audio context for cyber sounds (optional)
    initializeAudioEffects();
});

// Initialize cyberpunk-specific effects
function initializeCyberpunkEffects() {
    // Add scan lines to the entire page
    const scanLines = document.createElement('div');
    scanLines.className = 'global-scan-lines';
    scanLines.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 4px,
            rgba(0, 255, 255, 0.03) 4px,
            rgba(0, 255, 255, 0.03) 6px
        );
        pointer-events: none;
        z-index: 9999;
        animation: scan-lines-global 0.1s linear infinite;
    `;
    
    document.body.appendChild(scanLines);
    
    // Add cyber cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'cyber-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 1px solid var(--neon-cyan);
        pointer-events: none;
        z-index: 9998;
        transition: all 0.1s ease;
        box-shadow: 0 0 10px var(--neon-cyan);
        mix-blend-mode: difference;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Enhance cursor on hover
    document.addEventListener('mouseenter', (e) => {
        if (e.target.matches('a, button, .cyber-item, .cyber-card')) {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = 'var(--neon-pink)';
        }
    });
    
    document.addEventListener('mouseleave', (e) => {
        if (e.target.matches('a, button, .cyber-item, .cyber-card')) {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'var(--neon-cyan)';
        }
    });
}

// Initialize audio effects
function initializeAudioEffects() {
    // Create audio context for sound effects
    let audioContext;
    
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.log('Audio context not supported');
        return;
    }
    
    // Cyber beep sound generator
    function createCyberBeep(frequency = 800, duration = 100) {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    }
    
    // Add sound effects to interactions
    document.addEventListener('click', (e) => {
        if (e.target.matches('.btn, .nav-link')) {
            createCyberBeep(1200, 80);
        }
    });
    
    document.addEventListener('mouseenter', (e) => {
        if (e.target.matches('.cyber-item')) {
            createCyberBeep(600, 50);
        }
    });
}

// Cyberpunk notification system
function showCyberpunkNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.cyber-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `cyber-notification cyber-notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: var(--cyber-gray);
        border: 2px solid var(--neon-cyan);
        color: var(--text-white);
        font-family: 'Orbitron', monospace;
        font-weight: 600;
        font-size: 0.9rem;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
        text-transform: uppercase;
        letter-spacing: 1px;
    `;
    
    if (type === 'error') {
        notification.style.borderColor = 'var(--neon-pink)';
        notification.style.boxShadow = '0 0 20px rgba(255, 0, 128, 0.3)';
    } else if (type === 'success') {
        notification.style.borderColor = 'var(--neon-green)';
        notification.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.3)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes scan-lines-global {
        0% { transform: translateY(0); }
        100% { transform: translateY(6px); }
    }
    
    @keyframes cyber-materialize {
        0% { 
            opacity: 0; 
            transform: scale(0.8) rotateY(90deg);
            filter: brightness(2) contrast(2);
        }
        50% { 
            opacity: 0.8; 
            transform: scale(1.05) rotateY(0deg);
            filter: brightness(1.5) contrast(1.5);
        }
        100% { 
            opacity: 1; 
            transform: scale(1) rotateY(0deg);
            filter: brightness(1) contrast(1);
        }
    }
    
    @keyframes glitch-red {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }
`;

document.head.appendChild(style);

// Preload critical resources
function preloadCyberResources() {
    const imageUrls = [
        'images/hero.jpg',
        'images/interior.jpg',
        'images/food-1.jpg',
        'images/food-2.jpg',
        'images/food-3.jpg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            // Apply cyberpunk filter
            img.style.filter = 'brightness(0.8) contrast(1.2) saturate(1.1)';
        };
    });
}

// Call preload on page load
window.addEventListener('load', preloadCyberResources);