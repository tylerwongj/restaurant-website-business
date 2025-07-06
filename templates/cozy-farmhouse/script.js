// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
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
});

// Smooth Scrolling
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

// Farmhouse Floating Elements Animation
document.addEventListener('DOMContentLoaded', function() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 6 + Math.random() * 4;
        
        element.style.animationDelay = `${randomDelay}s`;
        element.style.animationDuration = `${randomDuration}s`;
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Special animation for farmhouse features
            if (entry.target.classList.contains('fresh-feature')) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
            
            // Menu items grow in
            if (entry.target.classList.contains('menu-item')) {
                entry.target.style.animation = 'growIn 0.6s ease forwards';
            }
        }
    });
}, observerOptions);

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        0% { opacity: 0; transform: translateY(50px); }
        100% { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes growIn {
        0% { opacity: 0; transform: scale(0.8); }
        100% { opacity: 1; transform: scale(1); }
    }
    
    @keyframes slideInLeft {
        0% { opacity: 0; transform: translateX(-50px); }
        100% { opacity: 1; transform: translateX(0); }
    }
`;
document.head.appendChild(style);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.fresh-feature, .menu-item, .about-text, .about-image, .value-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact Form Submission with Farmhouse Theme
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    if (!name || !email || !message) {
        showFarmhouseAlert('Please fill in all the fields! 🌾', 'warning');
        return;
    }
    
    showFarmhouseAlert('Thank you for your message! 🏚️ We\'ll get back to you from the farmhouse soon.', 'success');
    this.reset();
});

// Custom Farmhouse Alert Function
function showFarmhouseAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `farmhouse-alert farmhouse-alert-${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <span class="alert-icon">${type === 'success' ? '🌾' : '⚠️'}</span>
            <span class="alert-message">${message}</span>
            <button class="alert-close">×</button>
        </div>
    `;
    
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #8b4513, #d2691e)' : 'linear-gradient(45deg, #cd853f, #daa520)'};
        color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: 'Merriweather', serif;
        border: 3px solid rgba(255,255,255,0.3);
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.style.transform = 'translateX(0)';
    }, 100);
    
    alert.querySelector('.alert-close').addEventListener('click', () => {
        alert.style.transform = 'translateX(400px)';
        setTimeout(() => alert.remove(), 300);
    });
    
    setTimeout(() => {
        if (alert.parentNode) {
            alert.style.transform = 'translateX(400px)';
            setTimeout(() => alert.remove(), 300);
        }
    }, 5000);
}

// Color Scheme Switcher
function switchColorScheme(scheme) {
    document.body.className = `color-${scheme}`;
    localStorage.setItem('farmhouseColorScheme', scheme);
    
    const schemes = {
        warm: 'Farmhouse Warm 🏚️',
        classic: 'Classic Barn 🌾',
        business: 'Modern Farm 🚜',
        cool: 'Fresh Garden 🥕',
        bold: 'Vibrant Harvest 🍞'
    };
    
    showFarmhouseAlert(`Switched to ${schemes[scheme]} theme!`, 'success');
}

// Load saved color scheme
document.addEventListener('DOMContentLoaded', function() {
    const savedScheme = localStorage.getItem('farmhouseColorScheme');
    if (savedScheme) {
        document.body.className = `color-${savedScheme}`;
    }
});

// Seasonal effects
function addSeasonalEffects() {
    const currentMonth = new Date().getMonth();
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    // Fall leaves (Sept-Nov)
    if (currentMonth >= 8 && currentMonth <= 10) {
        addFallingLeaves();
    }
    // Snow (Dec-Feb)
    else if (currentMonth === 11 || currentMonth <= 1) {
        addSnowfall();
    }
    // Spring flowers (Mar-May)
    else if (currentMonth >= 2 && currentMonth <= 4) {
        addSpringPetals();
    }
}

function addFallingLeaves() {
    const leaves = ['🍂', '🍁', '🌾'];
    createSeasonalParticles(leaves, 'fallDown');
}

function addSnowfall() {
    const snow = ['❄️', '⛄'];
    createSeasonalParticles(snow, 'snowFall');
}

function addSpringPetals() {
    const petals = ['🌸', '🌼', '🌻'];
    createSeasonalParticles(petals, 'petalFloat');
}

function createSeasonalParticles(particles, animationClass) {
    const container = document.querySelector('.hero');
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.className = `seasonal-particle ${animationClass}`;
        particle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 15 + 10}px;
            left: ${Math.random() * 100}%;
            top: -20px;
            opacity: 0.7;
            pointer-events: none;
            z-index: 1;
            animation: ${animationClass} ${Math.random() * 3 + 4}s linear forwards;
        `;
        
        container.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 7000);
    }, 2000);
}

// Add seasonal animation styles
const seasonalStyle = document.createElement('style');
seasonalStyle.textContent = `
    @keyframes fallDown {
        0% { opacity: 0.7; transform: translateY(0) rotate(0deg); }
        100% { opacity: 0; transform: translateY(100vh) rotate(180deg); }
    }
    
    @keyframes snowFall {
        0% { opacity: 0.8; transform: translateY(0) translateX(0); }
        100% { opacity: 0; transform: translateY(100vh) translateX(50px); }
    }
    
    @keyframes petalFloat {
        0% { opacity: 0.8; transform: translateY(0) rotate(0deg); }
        100% { opacity: 0; transform: translateY(100vh) rotate(360deg); }
    }
`;
document.head.appendChild(seasonalStyle);

// Initialize seasonal effects
document.addEventListener('DOMContentLoaded', addSeasonalEffects);