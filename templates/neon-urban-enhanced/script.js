// Neon Urban Enhanced Restaurant Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initCyberEffects();
    initScrollAnimations();
    initFormHandling();
    initNeonInteractions();
    initParticleSystem();
    initMatrixRain();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Mobile menu toggle
    hamburger?.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Add cyber sound effect
        playCyberSound('click');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            
            // Smooth scrolling for anchor links
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });
}

// Cyber effects and animations
function initCyberEffects() {
    // Create additional cyber lines
    createCyberLines();
    
    // Add glitch effect to title
    addGlitchEffect();
    
    // Initialize hologram effects
    initHologramEffects();
    
    // Add cyber cursor
    createCyberCursor();
}

function createCyberLines() {
    const cyberElements = document.querySelector('.cyber-elements');
    if (!cyberElements) return;

    // Create random cyber lines
    for (let i = 0; i < 5; i++) {
        const line = document.createElement('div');
        line.className = 'cyber-line';
        line.style.cssText = `
            top: ${Math.random() * 100}%;
            width: ${100 + Math.random() * 300}px;
            animation-delay: ${Math.random() * 4}s;
            animation-duration: ${3 + Math.random() * 3}s;
        `;
        cyberElements.appendChild(line);
    }
}

function addGlitchEffect() {
    const title = document.querySelector('.neon-title');
    if (!title) return;

    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every interval
            title.style.textShadow = `
                2px 0 #ff0080,
                -2px 0 #00ffff,
                0 0 20px #00ffff,
                0 0 40px #00ffff
            `;
            title.style.transform = 'translateX(2px)';
            
            setTimeout(() => {
                title.style.textShadow = `
                    0 0 10px var(--neon-cyan),
                    0 0 20px var(--neon-cyan),
                    0 0 40px var(--neon-cyan)
                `;
                title.style.transform = 'translateX(0)';
            }, 100);
        }
    }, 2000);
}

function initHologramEffects() {
    // Add hologram flicker to certain elements
    const hologramElements = document.querySelectorAll('.neon-frame img, .menu-card-image img');
    
    hologramElements.forEach(element => {
        setInterval(() => {
            if (Math.random() < 0.05) { // 5% chance
                element.style.opacity = '0.8';
                element.style.filter = 'brightness(1.2) contrast(1.5) hue-rotate(10deg)';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.filter = 'brightness(0.8) contrast(1.1)';
                }, 50);
            }
        }, 1000);
    });
}

function createCyberCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cyber-cursor';
    cursor.innerHTML = '◆';
    cursor.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        font-size: 1rem;
        color: var(--neon-cyan);
        text-shadow: 0 0 10px var(--neon-cyan);
        opacity: 0;
        transition: opacity 0.3s ease;
        transform: translate(-50%, -50%);
        mix-blend-mode: difference;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.opacity = '0.8';
    });
    
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special effects for different elements
                if (entry.target.classList.contains('menu-card')) {
                    animateMenuCard(entry.target);
                } else if (entry.target.classList.contains('tech-feature')) {
                    animateTechFeature(entry.target);
                } else if (entry.target.classList.contains('event-card')) {
                    animateEventCard(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.menu-card, .tech-feature, .event-card, .info-panel, .form-panel');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

function animateMenuCard(card) {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
    
    // Add cyber scan effect
    const scanLine = document.createElement('div');
    scanLine.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--neon-cyan), transparent);
        animation: scanCard 1s ease-out;
    `;
    
    card.style.position = 'relative';
    card.appendChild(scanLine);
    
    setTimeout(() => scanLine.remove(), 1000);
}

function animateTechFeature(feature) {
    feature.style.opacity = '1';
    feature.style.transform = 'translateY(0)';
    
    // Add power-up effect
    setTimeout(() => {
        feature.style.background = 'rgba(0, 255, 255, 0.15)';
        feature.style.borderColor = 'var(--neon-cyan)';
        
        setTimeout(() => {
            feature.style.background = 'rgba(0, 255, 255, 0.05)';
            feature.style.borderColor = 'rgba(0, 255, 255, 0.2)';
        }, 500);
    }, 200);
}

function animateEventCard(card) {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
    
    // Animate status indicator
    const status = card.querySelector('.event-status');
    if (status) {
        status.style.animation = 'neonPulse 2s ease-in-out infinite';
    }
}

// Form handling with cyber effects
function initFormHandling() {
    const form = document.querySelector('.cyber-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add cyber submission effect
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>TRANSMITTING...</span>';
            submitBtn.style.animation = 'neonPulse 0.5s ease-in-out infinite';
            
            // Simulate transmission
            setTimeout(() => {
                showCyberNotification('MESSAGE TRANSMITTED SUCCESSFULLY', 'success');
                form.reset();
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.animation = '';
            }, 2000);
        });

        // Enhanced form validation
        const inputs = form.querySelectorAll('.cyber-input, .cyber-select, .cyber-textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentNode.classList.add('focused');
                playCyberSound('beep');
            });
            
            input.addEventListener('blur', function() {
                this.parentNode.classList.remove('focused');
                validateCyberField(this);
            });
            
            input.addEventListener('input', function() {
                clearCyberValidation(this);
            });
        });
    }
}

function validateCyberField(field) {
    const value = field.value.trim();
    
    clearCyberValidation(field);
    
    if (field.hasAttribute('required') && !value) {
        showCyberFieldError(field, 'FIELD REQUIRED');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showCyberFieldError(field, 'INVALID EMAIL FORMAT');
        return false;
    }
    
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        showCyberFieldError(field, 'INVALID PHONE FORMAT');
        return false;
    }
    
    return true;
}

function clearCyberValidation(field) {
    field.style.borderColor = '';
    field.style.boxShadow = '';
    const errorMsg = field.parentNode.querySelector('.cyber-error');
    if (errorMsg) {
        errorMsg.remove();
    }
}

function showCyberFieldError(field, message) {
    field.style.borderColor = '#ff0080';
    field.style.boxShadow = '0 0 15px rgba(255, 0, 128, 0.5)';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'cyber-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: absolute;
        bottom: -25px;
        left: 0;
        color: #ff0080;
        font-size: 0.7rem;
        font-family: 'Orbitron', monospace;
        letter-spacing: 1px;
        text-shadow: 0 0 10px #ff0080;
        animation: errorGlow 0.5s ease;
    `;
    
    field.parentNode.style.position = 'relative';
    field.parentNode.appendChild(errorDiv);
    
    playCyberSound('error');
}

// Neon interactions
function initNeonInteractions() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            playCyberSound('hover');
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        btn.addEventListener('click', function() {
            addRippleEffect(this);
            playCyberSound('click');
        });
    });
    
    // Menu card interactions
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.image-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.image-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
    
    // Order button effects
    const orderBtns = document.querySelectorAll('.order-btn');
    orderBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showCyberNotification('ITEM ADDED TO QUEUE', 'info');
            playCyberSound('success');
        });
    });
}

function addRippleEffect(element) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: 50%;
        top: 50%;
        width: ${size}px;
        height: ${size}px;
        margin-left: -${size/2}px;
        margin-top: -${size/2}px;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Particle system
function initParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
    
    // Add new particles periodically
    setInterval(() => {
        if (Math.random() < 0.3) {
            createParticle(particleContainer);
        }
    }, 2000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    const colors = ['#00ffff', '#ff0080', '#8b00ff', '#00ff41'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: ${color};
        border-radius: 50%;
        box-shadow: 0 0 10px ${color};
        left: ${Math.random() * 100}%;
        top: 100%;
        animation: floatUp ${10 + Math.random() * 10}s linear infinite;
        opacity: ${0.3 + Math.random() * 0.7};
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 20000);
}

// Matrix rain effect
function initMatrixRain() {
    if (window.innerWidth < 768) return; // Skip on mobile for performance
    
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ffff';
        ctx.font = fontSize + 'px monospace';
        
        drops.forEach((y, i) => {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, y * fontSize);
            
            if (y * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        });
    }
    
    const matrixInterval = setInterval(drawMatrix, 50);
    
    // Clean up on resize
    window.addEventListener('resize', () => {
        clearInterval(matrixInterval);
        canvas.remove();
        if (window.innerWidth >= 768) {
            setTimeout(initMatrixRain, 100);
        }
    });
}

// Sound effects system
function playCyberSound(type) {
    // Create audio context for cyber sounds
    if (!window.AudioContext && !window.webkitAudioContext) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    let frequency, duration;
    
    switch (type) {
        case 'click':
            frequency = 800;
            duration = 0.1;
            break;
        case 'hover':
            frequency = 600;
            duration = 0.05;
            break;
        case 'beep':
            frequency = 1000;
            duration = 0.1;
            break;
        case 'success':
            frequency = 1200;
            duration = 0.2;
            break;
        case 'error':
            frequency = 300;
            duration = 0.3;
            break;
        default:
            frequency = 800;
            duration = 0.1;
    }
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// Notification system
function showCyberNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `cyber-notification cyber-notification-${type}`;
    
    const colors = {
        success: '#00ff41',
        error: '#ff0080',
        info: '#00ffff',
        warning: '#ff4500'
    };
    
    const color = colors[type] || colors.info;
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-text">${message}</span>
            <span class="notification-close">×</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(26, 26, 26, 0.95);
        border: 2px solid ${color};
        color: ${color};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-family: 'Orbitron', monospace;
        font-size: 0.8rem;
        letter-spacing: 1px;
        z-index: 10000;
        animation: slideInRight 0.3s ease, cyberGlow 2s ease-in-out infinite;
        box-shadow: 0 0 20px ${color}33;
        backdrop-filter: blur(10px);
        text-transform: uppercase;
    `;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes cyberGlow {
            0%, 100% { box-shadow: 0 0 20px ${color}33; }
            50% { box-shadow: 0 0 30px ${color}66; }
        }
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }
        .notification-close {
            cursor: pointer;
            font-size: 1.2rem;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        }
        .notification-close:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
    
    playCyberSound(type);
}

// Utility functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[\+]?[\d\s\-\(\)]{10,}$/.test(phone);
}

// Add CSS animations
const cyberAnimations = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes scanCard {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
    
    @keyframes errorGlow {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes floatUp {
        to {
            transform: translateY(-100vh);
            opacity: 0;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .form-group.focused .input-line {
        width: 100% !important;
        box-shadow: 0 0 10px var(--neon-cyan);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = cyberAnimations;
document.head.appendChild(styleSheet);

// Parallax effect for hero background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-bg-image');
    
    if (heroImage) {
        const speed = scrolled * 0.3;
        heroImage.style.transform = `translateY(${speed}px) scale(1.1)`;
    }
    
    // Update cyber lines based on scroll
    const cyberLines = document.querySelectorAll('.cyber-line');
    cyberLines.forEach((line, index) => {
        const speed = (index + 1) * 0.1;
        const yPos = -(scrolled * speed);
        line.style.transform = `translateY(${yPos}px)`;
    });
});

// Konami code for special effects
document.addEventListener('keydown', function(e) {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    window.konamiIndex = window.konamiIndex || 0;
    
    if (e.code === konamiCode[window.konamiIndex]) {
        window.konamiIndex++;
        if (window.konamiIndex === konamiCode.length) {
            activateMatrixMode();
            window.konamiIndex = 0;
        }
    } else {
        window.konamiIndex = 0;
    }
});

function activateMatrixMode() {
    showCyberNotification('MATRIX MODE ACTIVATED', 'success');
    
    // Add intense effects
    document.body.style.filter = 'hue-rotate(120deg) contrast(1.5)';
    
    // Create falling code effect
    for (let i = 0; i < 50; i++) {
        const code = document.createElement('div');
        code.textContent = Math.random().toString(36).substring(7);
        code.style.cssText = `
            position: fixed;
            top: -50px;
            left: ${Math.random() * 100}%;
            color: #00ff41;
            font-family: 'Orbitron', monospace;
            font-size: ${0.8 + Math.random() * 0.8}rem;
            pointer-events: none;
            z-index: 1000;
            animation: matrixFall ${2 + Math.random() * 3}s linear infinite;
            text-shadow: 0 0 10px #00ff41;
        `;
        document.body.appendChild(code);
        
        setTimeout(() => code.remove(), 5000);
    }
    
    // Reset after 10 seconds
    setTimeout(() => {
        document.body.style.filter = '';
        showCyberNotification('MATRIX MODE DEACTIVATED', 'info');
    }, 10000);
}

const matrixFallAnimation = `
    @keyframes matrixFall {
        to {
            transform: translateY(calc(100vh + 50px));
            opacity: 0;
        }
    }
`;

const matrixStyle = document.createElement('style');
matrixStyle.textContent = matrixFallAnimation;
document.head.appendChild(matrixStyle);