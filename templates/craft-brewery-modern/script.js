// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
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

// Enhanced navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Newsletter subscription
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.innerHTML = `
            <div style="background: var(--primary-color); color: white; padding: 1rem; margin: 0.5rem 0; text-align: center; border-radius: 6px; font-size: 0.9rem;">
                🍺 Subscribed! You'll get updates on new beers and events.
            </div>
        `;
        this.parentNode.insertBefore(successMsg, this.nextSibling);
        emailInput.value = '';
        
        setTimeout(() => {
            successMsg.remove();
        }, 4000);
    } else {
        alert('Please enter a valid email address');
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background img');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Animation on scroll with brewery theme
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add staggered animation to beer cards
document.querySelectorAll('.beer-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
    observer.observe(el);
});

// Add animation to other elements
document.querySelectorAll('.food-item, .event-card, .feature, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Brewery-specific interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add beer foam animation to beer cards
    const beerCards = document.querySelectorAll('.beer-card');
    beerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(212, 116, 15, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Animate brewery stats
    const breweryStats = document.querySelectorAll('.brewery-stat .stat-number');
    const animateBreweryStats = () => {
        breweryStats.forEach(stat => {
            const target = parseInt(stat.textContent);
            if (!isNaN(target)) {
                let current = 0;
                const increment = target / 25;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
                    }
                }, 60);
            }
        });
    };
    
    // Trigger brewery stats animation when in view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateBreweryStats();
                statsObserver.disconnect();
            }
        });
    });
    
    const breweryStatsSection = document.querySelector('.brewery-stats');
    if (breweryStatsSection) {
        statsObserver.observe(breweryStatsSection);
    }
    
    // Beer style tag hover effects
    const styleTags = document.querySelectorAll('.style-tag');
    styleTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add brewing process step animations
    const processSteps = document.querySelectorAll('.step');
    processSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.step-icon');
            if (icon) {
                icon.style.transform = 'rotate(10deg) scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        step.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.step-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });
});

// ABV badge interactive effects
document.querySelectorAll('.abv-badge').forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--secondary-color)';
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'all 0.3s ease';
    });
    
    badge.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--primary-color)';
        this.style.transform = 'scale(1)';
    });
});

// Event card interactive enhancements
document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const eventDate = this.querySelector('.event-date');
        if (eventDate) {
            eventDate.style.transform = 'scale(1.05)';
            eventDate.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const eventDate = this.querySelector('.event-date');
        if (eventDate) {
            eventDate.style.transform = 'scale(1)';
        }
    });
});

// Beer pairing tags with hover effects
document.querySelectorAll('.beer-pairing').forEach(pairing => {
    pairing.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--primary-color)';
        this.style.color = 'white';
        this.style.transform = 'translateY(-2px)';
        this.style.transition = 'all 0.3s ease';
    });
    
    pairing.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'rgba(212, 116, 15, 0.1)';
        this.style.color = 'var(--primary-color)';
        this.style.transform = 'translateY(0)';
    });
});

// Add bubbling effect to beer highlight on load
document.addEventListener('DOMContentLoaded', function() {
    const beerHighlight = document.querySelector('.beer-highlight');
    if (beerHighlight) {
        // Create subtle animation for the highlight section
        beerHighlight.style.animation = 'subtleBubble 4s ease-in-out infinite';
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes subtleBubble {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-3px); }
            }
            
            @keyframes beerFoam {
                0% { opacity: 0.7; transform: translateY(0px); }
                50% { opacity: 1; transform: translateY(-2px); }
                100% { opacity: 0.7; transform: translateY(0px); }
            }
        `;
        document.head.appendChild(style);
    }
});

// Add realistic beer card interactions
document.querySelectorAll('.beer-card-image img').forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.1) contrast(1.05)';
        this.style.transition = 'filter 0.3s ease';
    });
    
    img.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(1) contrast(1)';
    });
});