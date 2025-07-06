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

// Smooth scrolling for anchor links
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

// Navbar background change on scroll with tropical effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 188, 212, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Tropical wave animation on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const waveOverlay = document.querySelector('.wave-overlay');
    if (waveOverlay) {
        waveOverlay.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Tropical animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add tropical bounce animation
            if (entry.target.classList.contains('feature-card')) {
                entry.target.style.animation = 'tropicalBounce 0.6s ease-out';
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .menu-item, .about-content, .about-image').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Add tropical bounce animation
const style = document.createElement('style');
style.textContent = `
    @keyframes tropicalBounce {
        0% { transform: translateY(30px) scale(0.9); opacity: 0; }
        50% { transform: translateY(-10px) scale(1.05); }
        100% { transform: translateY(0) scale(1); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Form submission handling with tropical messaging
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add tropical loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '🌊 Sending to Paradise...';
        submitBtn.disabled = true;
        
        // Simulate form processing
        setTimeout(() => {
            showTropicalSuccess();
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Tropical success message
function showTropicalSuccess() {
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #00bcd4, #26a69a);
            color: white;
            padding: 30px 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 188, 212, 0.3);
            text-align: center;
            z-index: 10000;
            animation: tropicalPop 0.5s ease-out;
        ">
            <div style="font-size: 2rem; margin-bottom: 10px;">🌺🏖️🌴</div>
            <h3 style="margin-bottom: 10px;">Aloha!</h3>
            <p>Your reservation request has been sent to paradise! We'll contact you within 24 hours to confirm your tropical dining experience.</p>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 4000);
}

// Add tropical pop animation
const popStyle = document.createElement('style');
popStyle.textContent = `
    @keyframes tropicalPop {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.1); }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
`;
document.head.appendChild(popStyle);

// Floating tropical elements animation
function animateFloatingElements() {
    const palmLeaves = document.querySelectorAll('.palm-leaf');
    
    palmLeaves.forEach((leaf, index) => {
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            const randomRotate = Math.random() * 10 - 5;
            
            leaf.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
        }, 3000 + index * 1000);
    });
}

// Tropical color scheme cycling (for fun effect)
function startTropicalColorCycle() {
    const colors = [
        { primary: '#00bcd4', secondary: '#26a69a', accent: '#ff9800' },
        { primary: '#4caf50', secondary: '#66bb6a', accent: '#ff5722' },
        { primary: '#009688', secondary: '#4db6ac', accent: '#ffc107' },
        { primary: '#03a9f4', secondary: '#29b6f6', accent: '#ff6f00' }
    ];
    
    let currentIndex = 0;
    
    // Only cycle colors on special events (like clicking logo)
    document.querySelector('.logo')?.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % colors.length;
        const newColors = colors[currentIndex];
        
        document.documentElement.style.setProperty('--primary-color', newColors.primary);
        document.documentElement.style.setProperty('--secondary-color', newColors.secondary);
        document.documentElement.style.setProperty('--accent-color', newColors.accent);
        
        // Show tropical notification
        showColorChangeNotification();
    });
}

function showColorChangeNotification() {
    const notification = document.createElement('div');
    notification.innerHTML = '🌈 Tropical colors updated! 🌺';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff9800, #ff5722);
        color: white;
        padding: 15px 20px;
        border-radius: 25px;
        font-weight: bold;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add slide animations
const slideStyle = document.createElement('style');
slideStyle.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(slideStyle);

// Tropical weather integration (simulated)
function displayTropicalWeather() {
    const weatherConditions = [
        { emoji: '☀️', text: 'Perfect sunny day for beachfront dining!' },
        { emoji: '🌤️', text: 'Partly cloudy with ocean breeze - ideal weather!' },
        { emoji: '🌊', text: 'Great waves today! Perfect beach atmosphere.' },
        { emoji: '🌅', text: 'Beautiful sunset expected tonight!' }
    ];
    
    const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    
    // Add weather info to navbar or hero if desired
    const weatherEl = document.querySelector('.weather-note span:last-child');
    if (weatherEl) {
        weatherEl.textContent = randomWeather.text;
    }
}

// Initialize tropical sound effects
function initTropicalSounds() {
    // Create subtle tropical ambient sounds (optional)
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            // Subtle wave sound effect (base64 encoded)
            playTropicalSound();
        });
    });
}

function playTropicalSound() {
    // Simple tropical click sound
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiS1/LNeSsFJHTF8N2QQAoUXrPp66hVFApGn+DyvmMcBjiS1/LNeSsFJHTF8N2QQAoUXrPp66hVFApGn+DyvmMcBjiS1/LNeSsFJHTF8N2QQAoUXrPp66hVFApGn+DyvmMcBjiS1/LNeSsFJHTF8N2QQAoUXrPp66hVFApGn+DyvmMcBjiS1/LNeSsFJHTF8N2QQAoUXrPp66hVFA==');
    audio.volume = 0.1;
    audio.play().catch(() => {}); // Ignore errors
}

// Performance monitoring for tropical sites
function monitorTropicalPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                
                console.log(`🏖️ Tropical paradise loaded in ${loadTime}ms`);
                
                if (loadTime > 3000) {
                    console.warn('🌊 Paradise loading slower than expected. Consider optimization.');
                }
            }, 0);
        });
    }
}

// Initialize all tropical functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    animateFloatingElements();
    startTropicalColorCycle();
    displayTropicalWeather();
    initTropicalSounds();
    monitorTropicalPerformance();
});

// Add keyboard shortcuts for tropical experience
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Tropical hotkeys
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 't':
                e.preventDefault();
                // Toggle tropical mode
                document.body.classList.toggle('extra-tropical');
                break;
            case 'w':
                e.preventDefault();
                displayTropicalWeather();
                break;
        }
    }
});

// Extra tropical mode styles
const extraTropicalStyle = document.createElement('style');
extraTropicalStyle.textContent = `
    .extra-tropical {
        filter: saturate(1.5) brightness(1.1);
    }
    .extra-tropical .btn {
        animation: tropicalPulse 2s infinite;
    }
    @keyframes tropicalPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(extraTropicalStyle);

// Tropical cursor trail effect (optional)
function addTropicalCursorTrail() {
    const trail = [];
    const trailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        // Remove old trail elements
        document.querySelectorAll('.tropical-trail').forEach(el => {
            if (Date.now() - el.dataset.time > 1000) {
                el.remove();
            }
        });
        
        // Add new trail element occasionally
        if (Math.random() < 0.1) {
            const trailEl = document.createElement('div');
            trailEl.className = 'tropical-trail';
            trailEl.dataset.time = Date.now();
            trailEl.innerHTML = ['🌺', '🌴', '🥥', '🏖️', '🌊'][Math.floor(Math.random() * 5)];
            trailEl.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                pointer-events: none;
                z-index: 9999;
                font-size: 12px;
                opacity: 0.7;
                animation: tropicalFade 1s ease-out forwards;
            `;
            document.body.appendChild(trailEl);
        }
    });
}

// Add tropical fade animation
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes tropicalFade {
        0% { opacity: 0.7; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.5) translateY(-20px); }
    }
`;
document.head.appendChild(fadeStyle);

// Add tropical cursor trail on special occasions
document.querySelector('.hero')?.addEventListener('mouseenter', () => {
    addTropicalCursorTrail();
});

// Error handling with tropical messaging
window.addEventListener('error', (e) => {
    console.error('🏖️ Tropical paradise error:', e.error);
});

// Service worker for tropical caching
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('🌺 Tropical service worker registered');
            })
            .catch(function(err) {
                console.log('🌊 Service worker registration failed');
            });
    });
}