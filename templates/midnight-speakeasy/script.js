// Midnight Speakeasy Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Password Modal Functionality
    const passwordModal = document.getElementById('password-modal');
    const passwordForm = document.querySelector('.password-form');
    const secretCodeInput = document.getElementById('secret-code');
    
    // Show password modal on page load
    passwordModal.style.display = 'flex';
    
    // Handle password form submission
    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const enteredCode = secretCodeInput.value.toLowerCase();
        
        // Accept various forms of "1933" (year prohibition ended)
        const validCodes = ['1933', 'speakeasy', 'prohibition', 'underground'];
        
        if (validCodes.includes(enteredCode)) {
            passwordModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Add entrance animation
            document.body.classList.add('entrance-granted');
            
            // Show success message
            showNotification('Welcome to the underground...', 'success');
        } else {
            // Show error animation
            secretCodeInput.style.animation = 'shake 0.5s ease-in-out';
            secretCodeInput.value = '';
            secretCodeInput.placeholder = 'Wrong code... try again';
            
            setTimeout(() => {
                secretCodeInput.style.animation = '';
                secretCodeInput.placeholder = 'Secret Code...';
            }, 500);
            
            showNotification('Access denied. Try again...', 'error');
        }
    });
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking nav links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Cocktail Card Hover Effects
    const cocktailCards = document.querySelectorAll('.cocktail-card');
    
    cocktailCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0)';
        });
    });
    
    // Parallax Effect for Hero Section
    const heroBackground = document.querySelector('.hero-background img');
    
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${parallax}px)`;
        });
    }
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.cocktail-card, .plate-item, .detail-item, .schedule-item').forEach(el => {
        observer.observe(el);
    });
    
    // Form Validation and Submission
    const reservationForm = document.querySelector('.reservation-form form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.phone) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Reservation request sent! We\'ll contact you soon.', 'success');
            this.reset();
        });
    }
    
    // Cocktail Strength Meter Animation
    const strengthMeters = document.querySelectorAll('.strength-fill');
    
    const meterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const meter = entry.target;
                const width = meter.style.width;
                meter.style.width = '0%';
                
                setTimeout(() => {
                    meter.style.width = width;
                }, 200);
            }
        });
    }, observerOptions);
    
    strengthMeters.forEach(meter => {
        meterObserver.observe(meter);
    });
    
    // Typewriter Effect for Hero Subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        setTimeout(() => {
            typeWriter(heroSubtitle, text, 100);
        }, 1000);
    }
    
    // Background Music Controller (Optional)
    let backgroundMusic = null;
    
    function toggleBackgroundMusic() {
        if (!backgroundMusic) {
            // Only initialize if user interacts with page
            backgroundMusic = new Audio('/path/to/jazz-ambience.mp3');
            backgroundMusic.loop = true;
            backgroundMusic.volume = 0.1;
        }
        
        if (backgroundMusic.paused) {
            backgroundMusic.play();
        } else {
            backgroundMusic.pause();
        }
    }
    
    // Add music toggle button (optional)
    const musicToggle = document.createElement('button');
    musicToggle.innerHTML = '🎵';
    musicToggle.className = 'music-toggle';
    musicToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent);
        color: var(--text-dark);
        border: none;
        cursor: pointer;
        font-size: 20px;
        z-index: 1000;
        display: none;
    `;
    
    musicToggle.addEventListener('click', toggleBackgroundMusic);
    document.body.appendChild(musicToggle);
    
    // Show music toggle after password is entered
    setTimeout(() => {
        if (!passwordModal.style.display || passwordModal.style.display === 'none') {
            musicToggle.style.display = 'block';
        }
    }, 2000);
});

// Utility Functions
function typeWriter(element, text, speed) {
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

function showNotification(message, type) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? 'var(--accent)' : '#dc3545'};
        color: ${type === 'success' ? 'var(--text-dark)' : 'white'};
        border-radius: 5px;
        font-weight: 500;
        z-index: 10001;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// CSS Animations (added via JavaScript)
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .entrance-granted {
        animation: fadeIn 1s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .navbar.scrolled {
        background: rgba(0, 0, 0, 0.98) !important;
        box-shadow: 0 2px 20px rgba(212, 175, 55, 0.2);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(0, 0, 0, 0.98);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 50px;
            transition: left 0.3s ease;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 20px 0;
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
    }
`;

document.head.appendChild(style);