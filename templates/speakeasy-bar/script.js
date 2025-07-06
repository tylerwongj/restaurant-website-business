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

// Speakeasy atmosphere on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY;
    
    if (scrolled > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.borderBottom = '2px solid #8b0000';
    } else {
        navbar.style.background = 'rgba(15, 15, 15, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.borderBottom = '2px solid #ffd700';
    }
});

// Prohibition-era animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add special speakeasy effects
            if (entry.target.classList.contains('feature-vault')) {
                entry.target.style.animation = 'vaultOpen 0.8s ease-out';
            }
            
            if (entry.target.classList.contains('menu-card')) {
                entry.target.style.animation = 'cardReveal 0.6s ease-out';
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-vault, .menu-card, .about-content, .about-images').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Add speakeasy animations
const style = document.createElement('style');
style.textContent = `
    @keyframes vaultOpen {
        0% { 
            transform: translateY(30px) rotateY(-15deg); 
            opacity: 0; 
        }
        50% { 
            transform: translateY(-5px) rotateY(5deg); 
        }
        100% { 
            transform: translateY(0) rotateY(0deg); 
            opacity: 1; 
        }
    }
    
    @keyframes cardReveal {
        0% { 
            transform: translateY(30px) scale(0.9); 
            opacity: 0; 
            filter: sepia(100%);
        }
        100% { 
            transform: translateY(0) scale(1); 
            opacity: 1; 
            filter: sepia(30%);
        }
    }
    
    @keyframes speakeasyGlow {
        0%, 100% { text-shadow: 0 0 5px rgba(255, 215, 0, 0.5); }
        50% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.4); }
    }
`;
document.head.appendChild(style);

// Form submission handling with prohibition-era messaging
const contactForm = document.querySelector('.speakeasy-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if password is provided (this is just for effect)
        const passwordField = this.querySelector('input[name="password"]');
        if (passwordField && !passwordField.value) {
            showProhibitionMessage('Password required! Call for today\'s secret word.');
            return;
        }
        
        // Add speakeasy loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending Secret Message...';
        submitBtn.disabled = true;
        
        // Simulate form processing
        setTimeout(() => {
            showSuccessMessage();
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2500);
    });
}

// Prohibition-era success message
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #1a1a1a, #2c2c2c);
            color: #ffd700;
            padding: 40px 50px;
            border: 3px solid #ffd700;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
            text-align: center;
            z-index: 10000;
            animation: speakeasyReveal 0.5s ease-out;
            font-family: 'Times New Roman', serif;
        ">
            <div style="font-size: 2rem; margin-bottom: 15px;">🔐🥃🎺</div>
            <h3 style="margin-bottom: 15px; text-transform: uppercase; letter-spacing: 2px;">Secret Message Received</h3>
            <p style="margin-bottom: 10px;">Your reservation request has been sent through our underground network.</p>
            <p style="font-style: italic; color: #8b0000;">We'll contact you discreetly within 24 hours.</p>
            <div style="margin-top: 20px; font-size: 0.9rem; color: #ffd700; opacity: 0.8;">◆ Keep our secret ◆</div>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Prohibition warning message
function showProhibitionMessage(message) {
    const warningDiv = document.createElement('div');
    warningDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #8b0000, #a00000);
            color: #ffd700;
            padding: 20px 25px;
            border: 2px solid #ffd700;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            font-family: 'Times New Roman', serif;
            max-width: 300px;
        ">
            <div style="font-weight: bold; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">⚠️ ACCESS DENIED</div>
            <p style="font-size: 0.9rem;">${message}</p>
        </div>
    `;
    
    document.body.appendChild(warningDiv);
    
    setTimeout(() => {
        warningDiv.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => warningDiv.remove(), 300);
    }, 4000);
}

// Add slide animations for messages
const slideStyle = document.createElement('style');
slideStyle.textContent = `
    @keyframes speakeasyReveal {
        0% { 
            transform: translate(-50%, -50%) scale(0.5) rotateY(-90deg); 
            opacity: 0; 
        }
        50% { 
            transform: translate(-50%, -50%) scale(1.1) rotateY(10deg); 
        }
        100% { 
            transform: translate(-50%, -50%) scale(1) rotateY(0deg); 
            opacity: 1; 
        }
    }
    
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

// Speakeasy atmosphere effects
function animateFloatingSpirits() {
    const spirits = document.querySelectorAll('.spirit');
    
    spirits.forEach((spirit, index) => {
        setInterval(() => {
            const randomX = Math.random() * 30 - 15;
            const randomY = Math.random() * 30 - 15;
            const randomRotate = Math.random() * 20 - 10;
            
            spirit.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
        }, 4000 + index * 1500);
    });
}

// Prohibition-era password system (for fun)
function initPasswordSystem() {
    const passwords = [
        'bee\'s knees',
        'cat\'s pajamas',
        'giggle water',
        'juice joint',
        'blind pig'
    ];
    
    let currentPassword = passwords[Math.floor(Math.random() * passwords.length)];
    
    // Store today's password (in real implementation, this would come from server)
    sessionStorage.setItem('speakeasyPassword', currentPassword);
    
    // Add password hint to phone number clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showPasswordHint(currentPassword);
        });
    });
}

function showPasswordHint(password) {
    const hintDiv = document.createElement('div');
    hintDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            color: #ffd700;
            padding: 30px 40px;
            border: 2px solid #ffd700;
            text-align: center;
            z-index: 10000;
            animation: speakeasyReveal 0.5s ease-out;
            font-family: 'Times New Roman', serif;
        ">
            <h3 style="margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px;">Today's Password</h3>
            <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 20px; color: #8b0000;">"${password}"</div>
            <p style="font-style: italic; font-size: 0.9rem; opacity: 0.8;">Use this at the door or in your reservation</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                margin-top: 20px;
                padding: 10px 20px;
                background: transparent;
                color: #ffd700;
                border: 2px solid #ffd700;
                cursor: pointer;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-family: inherit;
            ">Got It</button>
        </div>
    `;
    
    document.body.appendChild(hintDiv);
}

// Vintage jukebox simulation
function initVintageJukebox() {
    const songs = [
        'Ain\'t She Sweet - Ben Bernie',
        'Charleston - James P. Johnson',
        'Sweet Georgia Brown - Ben Bernie',
        'Puttin\' On the Ritz - Irving Berlin',
        'Mood Indigo - Duke Ellington'
    ];
    
    // Add jukebox interaction to logo clicks
    document.querySelector('.logo')?.addEventListener('click', () => {
        const randomSong = songs[Math.floor(Math.random() * songs.length)];
        showJukeboxNotification(randomSong);
    });
}

function showJukeboxNotification(song) {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: linear-gradient(135deg, #1a1a1a, #2c2c2c);
            color: #ffd700;
            padding: 15px 20px;
            border: 2px solid #ffd700;
            font-weight: bold;
            z-index: 10000;
            animation: slideInLeft 0.3s ease-out;
            font-family: 'Times New Roman', serif;
            max-width: 300px;
        ">
            <div style="margin-bottom: 5px;">🎺 Now Playing</div>
            <div style="font-size: 0.9rem; font-style: italic;">${song}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutLeft 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add slide left animations
const slideLeftStyle = document.createElement('style');
slideLeftStyle.textContent = `
    @keyframes slideInLeft {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutLeft {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(-100%); opacity: 0; }
    }
`;
document.head.appendChild(slideLeftStyle);

// Speakeasy smoke effects
function addSmokeEffects() {
    const smokeEffect = document.querySelector('.smoke-effect');
    if (smokeEffect) {
        setInterval(() => {
            smokeEffect.style.opacity = Math.random() * 0.3 + 0.1;
        }, 3000);
    }
}

// Performance monitoring for speakeasy
function monitorSpeakeasyPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                
                console.log(`🔐 Speakeasy loaded in ${loadTime}ms`);
                
                if (loadTime > 3000) {
                    console.warn('🥃 Speakeasy loading slower than a prohibition raid. Consider optimization.');
                }
            }, 0);
        });
    }
}

// Initialize all speakeasy functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    animateFloatingSpirits();
    initPasswordSystem();
    initVintageJukebox();
    addSmokeEffects();
    monitorSpeakeasyPerformance();
});

// Add keyboard shortcuts for speakeasy experience
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Secret speakeasy hotkeys
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'p':
                e.preventDefault();
                // Show password
                const password = sessionStorage.getItem('speakeasyPassword') || 'giggle water';
                showPasswordHint(password);
                break;
            case 'j':
                e.preventDefault();
                // Play jukebox
                initVintageJukebox();
                break;
        }
    }
    
    // Easter egg: Konami code for special speakeasy mode
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    window.konamiProgress = window.konamiProgress || 0;
    
    if (e.keyCode === konamiCode[window.konamiProgress]) {
        window.konamiProgress++;
        if (window.konamiProgress === konamiCode.length) {
            activateProhibitionMode();
            window.konamiProgress = 0;
        }
    } else {
        window.konamiProgress = 0;
    }
});

// Special prohibition mode
function activateProhibitionMode() {
    document.body.style.filter = 'sepia(100%) contrast(1.5)';
    document.body.style.animation = 'speakeasyGlow 2s infinite';
    
    const prohibitionAlert = document.createElement('div');
    prohibitionAlert.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            color: #ffd700;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            font-family: 'Times New Roman', serif;
            animation: speakeasyReveal 0.5s ease-out;
        ">
            <div style="text-align: center; max-width: 500px; padding: 40px;">
                <div style="font-size: 4rem; margin-bottom: 20px;">🔐</div>
                <h2 style="margin-bottom: 20px; text-transform: uppercase; letter-spacing: 3px;">PROHIBITION MODE ACTIVATED</h2>
                <p style="margin-bottom: 30px; font-size: 1.2rem; font-style: italic;">Welcome to the true speakeasy experience</p>
                <button onclick="this.parentElement.parentElement.remove(); document.body.style.filter = ''; document.body.style.animation = '';" style="
                    padding: 15px 30px;
                    background: transparent;
                    color: #ffd700;
                    border: 2px solid #ffd700;
                    cursor: pointer;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-family: inherit;
                    font-size: 1rem;
                ">ENTER THE SPEAKEASY</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(prohibitionAlert);
}

// Error handling with speakeasy messaging
window.addEventListener('error', (e) => {
    console.error('🔐 Speakeasy security breach:', e.error);
});

// Service worker for speakeasy caching
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('🥃 Speakeasy service worker registered');
            })
            .catch(function(err) {
                console.log('🔐 Service worker registration failed');
            });
    });
}