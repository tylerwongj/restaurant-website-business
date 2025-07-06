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

// Elegant Starfield Animation
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
        const randomDelay = Math.random() * 3;
        const randomDuration = 2 + Math.random() * 3;
        
        star.style.animationDelay = `${randomDelay}s`;
        star.style.animationDuration = `${randomDuration}s`;
    });
    
    // Add more stars dynamically
    addDynamicStars();
});

function addDynamicStars() {
    const starfield = document.querySelector('.starfield');
    if (!starfield) return;
    
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `
            position: absolute;
            background: var(--primary-color);
            border-radius: 50%;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 4 + 2}s infinite;
            animation-delay: ${Math.random() * 3}s;
        `;
        starfield.appendChild(star);
    }
}

// Elegant Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.star');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    // Elegant frame glow effect on scroll
    const elegantFrames = document.querySelectorAll('.elegant-frame, .elegant-frame-img');
    elegantFrames.forEach(frame => {
        const rect = frame.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            const intensity = Math.max(0, 1 - Math.abs(rect.top - window.innerHeight/2) / (window.innerHeight/2));
            frame.style.filter = `drop-shadow(0 0 ${intensity * 20}px rgba(201, 176, 55, ${intensity * 0.5}))`;
        }
    });
});

// Intersection Observer for Elegant Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Special elegant animations
            if (entry.target.classList.contains('experience-card')) {
                entry.target.style.animation = 'elegantFadeIn 1s ease forwards';
            }
            
            if (entry.target.classList.contains('elegant-menu-item')) {
                entry.target.style.animation = 'slideInElegant 0.8s ease forwards';
            }
            
            if (entry.target.classList.contains('point')) {
                entry.target.style.animation = 'pointReveal 0.6s ease forwards';
            }
        }
    });
}, observerOptions);

// Add elegant CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes elegantFadeIn {
        0% { 
            opacity: 0; 
            transform: translateY(50px) scale(0.9); 
        }
        100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
        }
    }
    
    @keyframes slideInElegant {
        0% { 
            opacity: 0; 
            transform: translateX(-100px); 
        }
        100% { 
            opacity: 1; 
            transform: translateX(0); 
        }
    }
    
    @keyframes pointReveal {
        0% { 
            opacity: 0; 
            transform: translateX(-30px); 
        }
        100% { 
            opacity: 1; 
            transform: translateX(0); 
        }
    }
    
    @keyframes luxuryGlow {
        0%, 100% { 
            box-shadow: 0 0 20px rgba(201, 176, 55, 0.3); 
        }
        50% { 
            box-shadow: 0 0 40px rgba(201, 176, 55, 0.6); 
        }
    }
`;
document.head.appendChild(style);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.experience-card, .elegant-menu-item, .point, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// Elegant Mouse Trail Effect
document.addEventListener('DOMContentLoaded', function() {
    let mouseTrail = [];
    const maxTrail = 8;
    
    document.addEventListener('mousemove', function(e) {
        // Only add trail effect on hero and elegant sections
        const elegantSections = document.querySelectorAll('.hero, .experience, .menu-preview');
        const isInElegantSection = Array.from(elegantSections).some(section => {
            const rect = section.getBoundingClientRect();
            return e.clientY >= rect.top && e.clientY <= rect.bottom;
        });
        
        if (!isInElegantSection) return;
        
        mouseTrail.push({
            x: e.clientX,
            y: e.clientY,
            timestamp: Date.now()
        });
        
        if (mouseTrail.length > maxTrail) {
            mouseTrail.shift();
        }
        
        updateMouseTrail();
    });
    
    function updateMouseTrail() {
        const existingTrails = document.querySelectorAll('.mouse-trail');
        existingTrails.forEach(trail => trail.remove());
        
        mouseTrail.forEach((point, index) => {
            const trail = document.createElement('div');
            trail.className = 'mouse-trail';
            trail.style.cssText = `
                position: fixed;
                width: ${6 - index}px;
                height: ${6 - index}px;
                background: radial-gradient(circle, rgba(201, 176, 55, ${0.8 - index * 0.1}), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${point.x}px;
                top: ${point.y}px;
                transform: translate(-50%, -50%);
                animation: trailFade 0.5s ease-out forwards;
            `;
            document.body.appendChild(trail);
        });
    }
});

// Add trail fade animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
    }
`;
document.head.appendChild(trailStyle);

// Contact Form with Elegant Validation
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    if (!name || !email || !message) {
        showElegantAlert('Please complete all required fields for your distinguished message.', 'warning');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showElegantAlert('Please provide a valid email address for our correspondence.', 'warning');
        return;
    }
    
    showElegantAlert('Your distinguished message has been received with utmost care. We shall respond with due elegance.', 'success');
    this.reset();
});

// Elegant Alert System
function showElegantAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `elegant-alert elegant-alert-${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <div class="alert-ornament">✦</div>
            <div class="alert-message">${message}</div>
            <button class="alert-close">×</button>
        </div>
    `;
    
    alert.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: ${type === 'success' ? 
            'linear-gradient(135deg, rgba(201, 176, 55, 0.95), rgba(218, 165, 32, 0.95))' : 
            'linear-gradient(135deg, rgba(184, 134, 11, 0.95), rgba(201, 176, 55, 0.95))'};
        color: #000;
        padding: 25px;
        border: 2px solid ${type === 'success' ? '#ffd700' : '#b8860b'};
        backdrop-filter: blur(10px);
        z-index: 10000;
        transform: translateX(500px);
        transition: transform 0.5s ease;
        max-width: 400px;
        font-family: 'Montserrat', sans-serif;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.style.transform = 'translateX(0)';
    }, 100);
    
    alert.querySelector('.alert-close').addEventListener('click', () => {
        alert.style.transform = 'translateX(500px)';
        setTimeout(() => alert.remove(), 500);
    });
    
    setTimeout(() => {
        if (alert.parentNode) {
            alert.style.transform = 'translateX(500px)';
            setTimeout(() => alert.remove(), 500);
        }
    }, 6000);
}

// Elegant Color Scheme Switcher
function switchColorScheme(scheme) {
    document.body.className = `color-${scheme}`;
    localStorage.setItem('elegantColorScheme', scheme);
    
    const schemes = {
        warm: 'Midnight Gold ✦',
        classic: 'Classic Elegance ✦',
        business: 'Royal Blue ✦',
        cool: 'Teal Sophistication ✦',
        bold: 'Purple Majesty ✦'
    };
    
    showElegantAlert(`Atmosphere refined to ${schemes[scheme]}`, 'success');
}

// Load saved elegant theme
document.addEventListener('DOMContentLoaded', function() {
    const savedScheme = localStorage.getItem('elegantColorScheme');
    if (savedScheme) {
        document.body.className = `color-${savedScheme}`;
    }
});

// Elegant Page Transitions
document.addEventListener('DOMContentLoaded', function() {
    // Add elegant entrance animation to entire page
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(30px)';
    document.body.style.transition = 'opacity 1s ease, transform 1s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
});

// Ambient Sound Toggle (Optional Elegant Feature)
function toggleAmbientSound() {
    // This could be implemented to add subtle ambient sounds
    // for an even more elegant experience
    console.log('Ambient elegance mode toggled');
}