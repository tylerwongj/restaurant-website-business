// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
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
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animated Number Counter for Stats
function animateNumber(element, target, duration = 2000) {
    const start = parseInt(element.textContent) || 0;
    const increment = (target - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for Stats Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            animateNumber(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

// Observe all stat numbers
document.querySelectorAll('.stat-number[data-target]').forEach(stat => {
    statsObserver.observe(stat);
});

// Contact form handling with cyberpunk effects
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !message) {
            showCyberpunkAlert('ERROR: REQUIRED FIELDS MISSING', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showCyberpunkAlert('ERROR: INVALID EMAIL FORMAT', 'error');
            return;
        }
        
        // Simulate form submission with cyberpunk styling
        const submitBtn = this.querySelector('.btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'TRANSMITTING...';
        submitBtn.disabled = true;
        submitBtn.style.animation = 'pulse 1s infinite';
        
        setTimeout(() => {
            showCyberpunkAlert('MESSAGE TRANSMITTED SUCCESSFULLY', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.animation = '';
        }, 2000);
    });
}

// Cyberpunk Alert System
function showCyberpunkAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `cyberpunk-alert ${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <span class="alert-icon">${type === 'error' ? '⚠️' : '✅'}</span>
            <span class="alert-message">${message}</span>
        </div>
    `;
    
    // Add cyberpunk alert styles
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--background-card);
        border: 1px solid ${type === 'error' ? 'var(--warning-neon)' : 'var(--success-neon)'};
        border-radius: 8px;
        padding: 1rem 1.5rem;
        color: var(--text-light);
        font-family: 'Rajdhani', sans-serif;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        box-shadow: 0 0 20px ${type === 'error' ? 'rgba(255, 68, 68, 0.3)' : 'rgba(0, 255, 0, 0.3)'};
        z-index: 10000;
        animation: slideInAlert 0.3s ease-out;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.style.animation = 'slideOutAlert 0.3s ease-in forwards';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// Add alert animations to CSS
const alertStyles = document.createElement('style');
alertStyles.textContent = `
    @keyframes slideInAlert {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutAlert {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes pulse {
        0%, 100% { box-shadow: 0 0 15px var(--shadow-neon); }
        50% { box-shadow: 0 0 30px var(--shadow-neon); }
    }
    
    .alert-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;
document.head.appendChild(alertStyles);

// Enhanced Neon Glow Effects on Scroll
const glowElements = document.querySelectorAll('.neon-border, .neon-glow, .btn-neon');
const glowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'neonPulse 2s ease-in-out infinite alternate';
        } else {
            entry.target.style.animation = '';
        }
    });
}, {
    threshold: 0.3
});

glowElements.forEach(el => glowObserver.observe(el));

// Add neon pulse animation
const neonStyles = document.createElement('style');
neonStyles.textContent = `
    @keyframes neonPulse {
        0% { box-shadow: 0 0 10px var(--shadow-neon), inset 0 0 10px rgba(0, 255, 255, 0.1); }
        100% { box-shadow: 0 0 20px var(--shadow-neon), inset 0 0 20px rgba(0, 255, 255, 0.2); }
    }
`;
document.head.appendChild(neonStyles);

// Dynamic Background Grid Movement
let gridOffset = 0;
function animateGrid() {
    gridOffset += 0.5;
    const grid = document.querySelector('.neon-grid');
    if (grid) {
        grid.style.transform = `translate(${gridOffset % 50}px, ${gridOffset % 50}px)`;
    }
    requestAnimationFrame(animateGrid);
}
animateGrid();

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual, .neon-frame');
    
    parallaxElements.forEach(el => {
        const speed = 0.3;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Enhanced Menu Card Hover Effects
document.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 40px var(--shadow-neon), 0 0 60px var(--primary-neon)';
        this.style.borderColor = 'var(--primary-neon)';
        
        // Add scanning effect
        const scanLine = document.createElement('div');
        scanLine.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--primary-neon), transparent);
            animation: cardScan 1s linear infinite;
            z-index: 10;
        `;
        this.appendChild(scanLine);
        
        setTimeout(() => scanLine.remove(), 1000);
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 0 10px var(--shadow-neon), inset 0 0 10px rgba(0, 255, 255, 0.1)';
        this.style.borderColor = 'var(--border-neon)';
    });
});

// Add card scan animation
const cardScanStyles = document.createElement('style');
cardScanStyles.textContent = `
    @keyframes cardScan {
        0% { transform: translateY(0); opacity: 1; }
        50% { opacity: 0.5; }
        100% { transform: translateY(200px); opacity: 1; }
    }
`;
document.head.appendChild(cardScanStyles);

// Terminal Loading Effect on Page Load
window.addEventListener('load', () => {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--background-dark);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-family: 'Orbitron', monospace;
        color: var(--primary-neon);
        transition: opacity 0.5s ease;
    `;
    
    loadingOverlay.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 2rem; text-shadow: 0 0 20px var(--primary-neon);">
            INITIALIZING SYSTEM...
        </div>
        <div class="loading-bar" style="width: 300px; height: 4px; border: 1px solid var(--primary-neon); border-radius: 2px; overflow: hidden;">
            <div class="loading-progress" style="height: 100%; background: var(--primary-neon); width: 0%; transition: width 2s ease; box-shadow: 0 0 10px var(--primary-neon);"></div>
        </div>
        <div style="margin-top: 1rem; font-size: 1rem; opacity: 0.8;">
            LOADING CYBERPUNK INTERFACE...
        </div>
    `;
    
    document.body.appendChild(loadingOverlay);
    
    setTimeout(() => {
        loadingOverlay.querySelector('.loading-progress').style.width = '100%';
    }, 100);
    
    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.remove();
            document.body.style.overflow = 'auto';
        }, 500);
    }, 2500);
    
    document.body.style.overflow = 'hidden';
});

// Enhanced Glitch Effect for Titles
document.querySelectorAll('.glitch-text').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.animation = 'glitchIntense 0.2s infinite linear';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.animation = '';
    });
});

// Add intense glitch animation
const glitchStyles = document.createElement('style');
glitchStyles.textContent = `
    @keyframes glitchIntense {
        0% { transform: translate(0); filter: hue-rotate(0deg); }
        10% { transform: translate(-5px, 5px); filter: hue-rotate(90deg); }
        20% { transform: translate(-5px, -5px); filter: hue-rotate(180deg); }
        30% { transform: translate(5px, 5px); filter: hue-rotate(270deg); }
        40% { transform: translate(5px, -5px); filter: hue-rotate(360deg); }
        50% { transform: translate(-5px, 5px); filter: hue-rotate(90deg); }
        60% { transform: translate(-5px, -5px); filter: hue-rotate(180deg); }
        70% { transform: translate(5px, 5px); filter: hue-rotate(270deg); }
        80% { transform: translate(5px, -5px); filter: hue-rotate(360deg); }
        90% { transform: translate(-5px, 5px); filter: hue-rotate(90deg); }
        100% { transform: translate(0); filter: hue-rotate(0deg); }
    }
`;
document.head.appendChild(glitchStyles);

// Sound Effects (optional - add if desired)
function playBeep() {
    // Create a simple beep sound using Web Audio API
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const audioContext = new (AudioContext || webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

// Add sound effects to buttons (optional)
document.querySelectorAll('.btn-neon, .neon-link').forEach(button => {
    button.addEventListener('mouseenter', () => {
        // Uncomment to enable sound effects
        // playBeep();
    });
});