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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'linear-gradient(135deg, var(--primary-color), var(--vintage-red))';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, var(--primary-color), var(--vintage-red))';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    }
});

// Form submission handler
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Here you would typically send the data to your server
    alert('Thanks for reaching out! We\'ll get back to you faster than a milkshake order!');
    this.reset();
});

// Vintage animations and effects
window.addEventListener('load', () => {
    // Add vintage glow effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 10px rgba(255,255,255,0.8)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
        });
    });
    
    // Add typewriter effect to hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .menu-item, .about-text, .contact-info, .contact-form').forEach(el => {
    observer.observe(el);
});

// Vintage jukebox-style background music controls (optional)
let isPlaying = false;
const backgroundMusic = {
    toggle: function() {
        if (isPlaying) {
            console.log('🎵 Background music paused');
            isPlaying = false;
        } else {
            console.log('🎵 Background music playing');
            isPlaying = true;
        }
    }
};

// Add vintage sound effects to interactions
function playClickSound() {
    // Create a short click sound effect
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Add click sound to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', playClickSound);
});

// Retro clock animation
function updateClock() {
    const clockDecoration = document.querySelector('.clock-decoration');
    if (clockDecoration) {
        const now = new Date();
        const hours = now.getHours() % 12;
        const clockEmojis = ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛'];
        clockDecoration.textContent = clockEmojis[hours];
    }
}

// Update clock every minute
setInterval(updateClock, 60000);
updateClock(); // Initial call

// Vintage menu item hover effects
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const badge = this.querySelector('.menu-badge');
        if (badge) {
            badge.style.animation = 'pulse 0.5s ease';
        }
    });
});

// Add CSS animations
const vintageStyles = `
    .feature-card,
    .menu-item,
    .about-text,
    .contact-info,
    .contact-form {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .feature-card.animate,
    .menu-item.animate,
    .about-text.animate,
    .contact-info.animate,
    .contact-form.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .menu-item.animate {
        transition-delay: 0.1s;
    }
    
    .menu-item:nth-child(2).animate {
        transition-delay: 0.2s;
    }
    
    .menu-item:nth-child(3).animate {
        transition-delay: 0.3s;
    }
    
    .menu-item:nth-child(4).animate {
        transition-delay: 0.4s;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    .vintage-quote {
        animation: fadeInScale 1s ease-out;
    }
    
    @keyframes fadeInScale {
        0% {
            opacity: 0;
            transform: scale(0.8);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
`;

const style = document.createElement('style');
style.textContent = vintageStyles;
document.head.appendChild(style);

// Social media links validation
document.querySelectorAll('.social-link, .social-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '' || href === '#') {
            e.preventDefault();
            alert('Social media page coming soon!');
        }
    });
});

// Add vintage easter egg
let clickCount = 0;
document.querySelector('.hero-badge').addEventListener('click', function() {
    clickCount++;
    if (clickCount === 5) {
        alert('🎉 You found the vintage easter egg! Free coffee on your next visit! (Just kidding... or are we?)');
        this.style.animation = 'rainbow 2s linear infinite';
        clickCount = 0;
    }
});

// Add rainbow animation for easter egg
const rainbowAnimation = `
    @keyframes rainbow {
        0% { background: var(--primary-color); }
        16% { background: var(--vintage-red); }
        33% { background: var(--accent-color); }
        50% { background: var(--vintage-blue); }
        66% { background: var(--primary-color); }
        83% { background: var(--vintage-red); }
        100% { background: var(--accent-color); }
    }
`;

const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = rainbowAnimation;
document.head.appendChild(rainbowStyle);