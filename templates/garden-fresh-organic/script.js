// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Smooth Scrolling for Navigation Links
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

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(248, 253, 248, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Floating Leaves Animation Control
function initFloatingLeaves() {
    const leaves = document.querySelectorAll('.leaf');
    
    // Add random delays and positions
    leaves.forEach((leaf, index) => {
        const randomDelay = Math.random() * 20;
        const randomLeft = Math.random() * 90 + 5; // 5% to 95%
        
        leaf.style.left = randomLeft + '%';
        leaf.style.animationDelay = randomDelay + 's';
        
        // Add subtle rotation animation
        leaf.style.animation += `, leafRotate ${5 + Math.random() * 5}s ease-in-out infinite`;
    });
}

// Add rotation keyframes
const leafRotateStyle = document.createElement('style');
leafRotateStyle.textContent = `
    @keyframes leafRotate {
        0%, 100% { transform: translateY(var(--y, 0)) rotate(0deg); }
        25% { transform: translateY(var(--y, 0)) rotate(5deg); }
        75% { transform: translateY(var(--y, 0)) rotate(-5deg); }
    }
`;
document.head.appendChild(leafRotateStyle);

// Animate Farm Statistics
function animateFarmStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.7,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalText = target.textContent;
                const finalNumber = parseInt(finalText.replace(/\D/g, ''));
                
                if (finalNumber && finalNumber > 0) {
                    animateCounter(target, 0, finalNumber, finalText, 2000);
                    observer.unobserve(target);
                }
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element, start, end, originalText, duration) {
    const isPercentage = originalText.includes('%');
    const hasPlus = originalText.includes('+');
    
    const range = end - start;
    const stepTime = Math.abs(Math.floor(duration / range));
    
    const timer = setInterval(() => {
        start += 1;
        let displayText = start.toString();
        
        if (hasPlus) displayText += '+';
        if (isPercentage) displayText += '%';
        
        element.textContent = displayText;
        
        if (start >= end) {
            clearInterval(timer);
            element.textContent = originalText; // Restore original formatting
        }
    }, stepTime);
}

// Gallery Thumbnail Functionality
function initGallery() {
    const thumbnails = document.querySelectorAll('.thumb');
    const mainImage = document.querySelector('.gallery-main img');
    
    if (thumbnails.length && mainImage) {
        const imageMap = {
            '🌱': mainImage.src, // Keep original
            '🥕': mainImage.src.replace(/[^/]*$/, 'organic-carrots.jpg'),
            '🍅': mainImage.src.replace(/[^/]*$/, 'fresh-tomatoes.jpg'),
            '🌿': mainImage.src.replace(/[^/]*$/, 'herb-garden.jpg')
        };
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                // Add active class to clicked thumbnail
                thumb.classList.add('active');
                
                // Change main image (with fallback to original)
                const newSrc = imageMap[thumb.textContent] || mainImage.src;
                
                // Fade effect
                mainImage.style.opacity = '0.7';
                setTimeout(() => {
                    mainImage.src = newSrc;
                    mainImage.style.opacity = '1';
                }, 200);
            });
        });
    }
}

// Enhanced Card Hover Effects
function initCardEffects() {
    const valueCards = document.querySelectorAll('.value-card');
    const organicDishes = document.querySelectorAll('.organic-dish');
    
    [...valueCards, ...organicDishes].forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Organic Growth Animation
function initGrowthAnimations() {
    const growthElements = document.querySelectorAll('.growth-animation');
    
    growthElements.forEach(element => {
        setInterval(() => {
            element.style.transform = 'scale(1.3)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 300);
        }, 3000);
    });
}

// Earth Orbit Animation Enhancement
function enhanceEarthGraphic() {
    const earthCenter = document.querySelector('.earth-center');
    
    if (earthCenter) {
        // Add subtle pulsing effect
        setInterval(() => {
            earthCenter.style.transform = 'translate(-50%, -50%) scale(1.1)';
            setTimeout(() => {
                earthCenter.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 1000);
        }, 4000);
    }
}

// Form Enhancement with Nature Theme
function enhanceForm() {
    const form = document.querySelector('.nature-form form');
    const inputs = form?.querySelectorAll('input, textarea');
    
    if (form && inputs) {
        // Add organic styling to focused inputs
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = 'var(--primary-color)';
                this.style.boxShadow = '0 0 20px rgba(74, 124, 89, 0.2)';
                this.style.background = '#fefffe';
                
                // Add growing effect to form icon
                const icon = this.parentElement.querySelector('.form-icon');
                if (icon) {
                    icon.style.transform = 'translateY(-50%) scale(1.2)';
                    icon.style.color = 'var(--primary-color)';
                }
            });
            
            input.addEventListener('blur', function() {
                this.style.borderColor = 'var(--border-color)';
                this.style.boxShadow = 'none';
                this.style.background = 'var(--background-light)';
                
                // Reset form icon
                const icon = this.parentElement.querySelector('.form-icon');
                if (icon) {
                    icon.style.transform = 'translateY(-50%) scale(1)';
                    icon.style.color = 'var(--accent-color)';
                }
            });
        });
        
        // Form submission with organic feedback
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = form.querySelector('input[name="name"]').value;
            const email = form.querySelector('input[name="email"]').value;
            const message = form.querySelector('textarea[name="message"]').value;
            
            if (name && email && message) {
                showOrganicNotification('Your message has been planted! 🌱 We\'ll nurture it and get back to you soon.', 'success');
                form.reset();
            } else {
                showOrganicNotification('Please fill in all fields to help your message grow! 🌿', 'error');
            }
        });
    }
}

// Organic Notification System
function showOrganicNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.organic-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `organic-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '🌱' : '🌿'}</span>
            <span class="notification-text">${message}</span>
        </div>
    `;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '20px',
        background: type === 'success' ? 'var(--primary-color)' : '#e74c3c',
        color: 'white',
        borderRadius: '15px',
        fontFamily: 'Source Sans Pro, sans-serif',
        boxShadow: 'var(--nature-shadow)',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'all 0.4s ease',
        maxWidth: '350px',
        border: '2px solid rgba(255,255,255,0.2)'
    });
    
    // Style notification content
    const content = notification.querySelector('.notification-content');
    Object.assign(content.style, {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    });
    
    const icon = notification.querySelector('.notification-icon');
    Object.assign(icon.style, {
        fontSize: '1.5rem'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 400);
    }, 5000);
}

// Seasonal Theme Adjuster (based on current month)
function adjustSeasonalTheme() {
    const month = new Date().getMonth();
    const body = document.body;
    
    // Spring: March, April, May (2, 3, 4)
    // Summer: June, July, August (5, 6, 7)
    // Fall: September, October, November (8, 9, 10)
    // Winter: December, January, February (11, 0, 1)
    
    if (month >= 2 && month <= 4) {
        body.style.setProperty('--seasonal-accent', '#90EE90'); // Light green
    } else if (month >= 5 && month <= 7) {
        body.style.setProperty('--seasonal-accent', '#FFD700'); // Golden
    } else if (month >= 8 && month <= 10) {
        body.style.setProperty('--seasonal-accent', '#DEB887'); // Autumn colors
    } else {
        body.style.setProperty('--seasonal-accent', '#87CEEB'); // Winter blues
    }
}

// Parallax Effect for Background Elements
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-leaves');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.value-card, .organic-dish, .practice, .nature-card').forEach(el => {
        observer.observe(el);
    });
}

// Add CSS for scroll animations
const scrollAnimationStyle = document.createElement('style');
scrollAnimationStyle.textContent = `
    .value-card, .organic-dish, .practice, .nature-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .btn-organic {
        position: relative;
        overflow: hidden;
    }
    
    .btn-organic::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
    }
    
    .btn-organic:hover::before {
        left: 100%;
    }
    
    .organic-dish img {
        filter: brightness(1) contrast(1);
        transition: filter 0.3s ease;
    }
    
    .organic-dish:hover img {
        filter: brightness(1.1) contrast(1.1) saturate(1.2);
    }
`;
document.head.appendChild(scrollAnimationStyle);

// Button Ripple Effect
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn-organic');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            Object.assign(ripple.style, {
                width: size + 'px',
                height: size + 'px',
                left: x + 'px',
                top: y + 'px',
                position: 'absolute',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.5)',
                transform: 'scale(0)',
                animation: 'ripple 0.6s linear',
                pointerEvents: 'none'
            });
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initFloatingLeaves();
    animateFarmStats();
    initGallery();
    initCardEffects();
    initGrowthAnimations();
    enhanceEarthGraphic();
    enhanceForm();
    adjustSeasonalTheme();
    initParallax();
    initScrollAnimations();
    initButtonEffects();
});

// Page load effect
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});