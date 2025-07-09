// Retro Diner 1950s Interactive Features

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initFormHandling();
    initColorSchemeToggle();
    initRetroEffects();
});

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement && targetId !== '#') {
                e.preventDefault();
                
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
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
    const animateElements = document.querySelectorAll(
        '.feature-card, .menu-item, .about-text, .contact-form, .info-card'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Navbar background on scroll
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Form Handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form form');
    const reservationForm = document.querySelector('.reservation-form form');
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'contact');
        });
    }
    
    // Reservation form
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'reservation');
        });
    }
    
    // Input animations
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('input-focused');
            }
        });
    });
}

function handleFormSubmission(form, type) {
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
        showNotification(
            type === 'reservation' 
                ? 'Reservation request sent! We\'ll call you to confirm.' 
                : 'Message sent! We\'ll get back to you soon.',
            'success'
        );
        
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Color Scheme Toggle
function initColorSchemeToggle() {
    // Create color scheme toggle button
    const colorToggle = document.createElement('div');
    colorToggle.className = 'color-scheme-toggle';
    colorToggle.innerHTML = `
        <button class="color-btn" onclick="setColorScheme('theme-retro')" title="Classic Retro">
            <span style="background: #e74c3c"></span>
        </button>
        <button class="color-btn" onclick="setColorScheme('color-fifties')" title="50s Diner">
            <span style="background: #ff4757"></span>
        </button>
        <button class="color-btn" onclick="setColorScheme('color-neon')" title="Neon Night">
            <span style="background: #ff3838"></span>
        </button>
        <button class="color-btn" onclick="setColorScheme('color-pastel')" title="Pastel Dreams">
            <span style="background: #fd79a8"></span>
        </button>
        <button class="color-btn" onclick="setColorScheme('color-vintage')" title="Vintage Classic">
            <span style="background: #d63031"></span>
        </button>
    `;
    
    document.body.appendChild(colorToggle);
    
    // Load saved color scheme
    const savedScheme = localStorage.getItem('diners-color-scheme');
    if (savedScheme) {
        setColorScheme(savedScheme);
    }
}

// Set Color Scheme
window.setColorScheme = function(scheme) {
    document.body.className = scheme + ' ' + 
        document.body.className.replace(/theme-\w+|color-\w+/g, '').trim();
    localStorage.setItem('diners-color-scheme', scheme);
    
    // Update active button
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.color-btn').classList.add('active');
};

// Retro Effects
function initRetroEffects() {
    // Add floating animation to menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Jukebox music toggle (simulation)
    const jukeboxIcon = document.querySelector('.jukebox');
    if (jukeboxIcon) {
        jukeboxIcon.addEventListener('click', function() {
            this.classList.toggle('playing');
            showNotification(
                this.classList.contains('playing') 
                    ? '🎵 Now playing: Rock Around the Clock' 
                    : '🎵 Music paused',
                'info'
            );
        });
    }
    
    // Add retro cursor trail effect
    if (window.innerWidth > 768) {
        addCursorTrail();
    }
    
    // Retro text animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', function() {
            this.style.textShadow = '5px 5px 0 var(--primary-color), 10px 10px 0 var(--secondary-color)';
        });
        
        heroTitle.addEventListener('mouseleave', function() {
            this.style.textShadow = '3px 3px 6px rgba(0, 0, 0, 0.3)';
        });
    }
}

// Cursor Trail Effect
function addCursorTrail() {
    const trail = [];
    const trailLength = 5;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    document.addEventListener('mousemove', function(e) {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
                dot.style.opacity = (trailLength - index) / trailLength * 0.5;
            }, index * 50);
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 15px 20px;
        border-radius: 25px;
        box-shadow: 0 5px 15px var(--shadow-color);
        z-index: 10000;
        transform: translateX(300px);
        transition: transform 0.3s ease;
        font-weight: 600;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.background = '#27ae60';
    } else if (type === 'error') {
        notification.style.background = '#e74c3c';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Menu Item Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background img');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .color-scheme-toggle {
        position: fixed;
        bottom: 20px;
        right: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 1000;
        background: rgba(255, 255, 255, 0.9);
        padding: 10px;
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .color-btn {
        width: 30px;
        height: 30px;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }
    
    .color-btn span {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    
    .color-btn:hover {
        transform: scale(1.2);
    }
    
    .color-btn.active {
        box-shadow: 0 0 0 3px var(--primary-color);
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .navbar.nav-hidden {
        transform: translateY(-100%);
    }
    
    .jukebox.playing {
        animation: bounce 0.5s ease-in-out;
        color: var(--accent-color);
    }
    
    .nav-menu.active {
        display: flex;
        position: fixed;
        top: 80px;
        left: 0;
        width: 100%;
        height: calc(100vh - 80px);
        background: var(--background-color);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 999;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .color-scheme-toggle {
            bottom: 10px;
            right: 10px;
            padding: 8px;
        }
        
        .color-btn {
            width: 25px;
            height: 25px;
        }
    }
`;

document.head.appendChild(animationStyles);