// Rustic Vineyard Template - JavaScript

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 248, 220, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 248, 220, 0.95)';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Fade in animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in effect to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.about, .menu-preview, .wine-section, .reservations, .contact');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Menu item hover effects
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Form validation and submission
const reservationForm = document.querySelector('.reservation-form form');
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(reservationForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        const requiredFields = ['name', 'email', 'phone', 'date', 'time', 'party-size'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = reservationForm.querySelector(`[name="${field}"]`);
            if (!input || !input.value.trim()) {
                isValid = false;
                if (input) {
                    input.style.borderColor = '#e74c3c';
                }
            } else if (input) {
                input.style.borderColor = '#D2B48C';
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = reservationForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your reservation request! We will contact you shortly to confirm.');
                reservationForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Wine stats counter animation
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = finalValue / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                stat.textContent = finalValue + (stat.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(currentValue) + (stat.textContent.includes('+') ? '+' : '');
            }
        }, 30);
    });
};

// Trigger stats animation when wine section is visible
const wineSection = document.querySelector('.wine-section');
if (wineSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(wineSection);
}

// Add vintage texture overlay effect
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const textureOverlay = document.createElement('div');
        textureOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><pattern id="grain" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23000" opacity="0.1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grain)"/></svg>') repeat;
            pointer-events: none;
            z-index: 1;
            opacity: 0.3;
        `;
        hero.appendChild(textureOverlay);
    }
});

// Seasonal menu rotation indicator
const addSeasonalIndicator = () => {
    const menuHeader = document.querySelector('.menu-header h2');
    if (menuHeader) {
        const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
        const currentSeason = seasons[Math.floor(Date.now() / 1000 / 60 / 60 / 24 / 90) % 4];
        
        const seasonBadge = document.createElement('span');
        seasonBadge.textContent = currentSeason;
        seasonBadge.style.cssText = `
            background: var(--gold-accent);
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.8rem;
            margin-left: 10px;
            font-family: 'Open Sans', sans-serif;
        `;
        menuHeader.appendChild(seasonBadge);
    }
};

// Initialize seasonal indicator
document.addEventListener('DOMContentLoaded', addSeasonalIndicator);