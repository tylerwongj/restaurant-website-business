// Urban Rooftop Template - JavaScript

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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Menu Slider Functionality
class MenuSlider {
    constructor() {
        this.track = document.querySelector('.menu-track');
        this.cards = document.querySelectorAll('.menu-card');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.slider-btn.prev');
        this.nextBtn = document.querySelector('.slider-btn.next');
        this.currentIndex = 0;
        this.autoplayInterval = null;
        
        this.init();
    }
    
    init() {
        if (!this.track) return;
        
        // Add event listeners
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Start autoplay
        this.startAutoplay();
        
        // Pause autoplay on hover
        this.track.addEventListener('mouseenter', () => this.stopAutoplay());
        this.track.addEventListener('mouseleave', () => this.startAutoplay());
    }
    
    updateSlider() {
        const translateX = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update cards
        this.cards.forEach((card, index) => {
            card.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.updateSlider();
    }
    
    prevSlide() {
        this.currentIndex = this.currentIndex === 0 ? this.cards.length - 1 : this.currentIndex - 1;
        this.updateSlider();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlider();
    }
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

// Initialize menu slider
document.addEventListener('DOMContentLoaded', () => {
    new MenuSlider();
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVideo = document.querySelector('.hero-video');
    const cityHorizon = document.querySelector('.city-skyline');
    
    if (heroVideo) {
        heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    if (cityHorizon) {
        cityHorizon.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Special animation for features
            if (entry.target.classList.contains('feature')) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
        }
    });
}, observerOptions);

// Add fade-in effect to sections and elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.dining-experience, .menu-showcase, .rooftop-section, .events-section, .reservations, .contact, .feature, .event-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Form validation and submission
const reservationForm = document.querySelector('.modern-form');
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(reservationForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        const requiredFields = reservationForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ef4444';
                field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            } else {
                field.style.borderColor = '#e2e8f0';
                field.style.boxShadow = 'none';
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = reservationForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            submitBtn.style.background = '#94a3b8';
            
            setTimeout(() => {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.innerHTML = `
                    <div style="
                        background: linear-gradient(135deg, #10b981, #059669);
                        color: white;
                        padding: 1rem 2rem;
                        border-radius: 8px;
                        margin-bottom: 1rem;
                        text-align: center;
                        font-weight: 600;
                    ">
                        ✓ Reservation request submitted! We'll contact you within 1 hour to confirm.
                    </div>
                `;
                
                reservationForm.insertBefore(successMessage.firstElementChild, reservationForm.firstChild);
                reservationForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    const message = reservationForm.querySelector('div[style*="background: linear-gradient"]');
                    if (message) {
                        message.remove();
                    }
                }, 5000);
            }, 2000);
        } else {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.innerHTML = `
                <div style="
                    background: #fef2f2;
                    color: #dc2626;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    margin-bottom: 1rem;
                    text-align: center;
                    border: 1px solid #fecaca;
                ">
                    Please fill in all required fields.
                </div>
            `;
            
            reservationForm.insertBefore(errorMessage.firstElementChild, reservationForm.firstChild);
            
            // Remove error message after 3 seconds
            setTimeout(() => {
                const message = reservationForm.querySelector('div[style*="background: #fef2f2"]');
                if (message) {
                    message.remove();
                }
            }, 3000);
        }
    });
}

// Rooftop stats animation
const animateStats = () => {
    const stats = document.querySelectorAll('.feature-number');
    
    stats.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text);
        const suffix = text.replace(number.toString(), '');
        
        if (!isNaN(number)) {
            let currentValue = 0;
            const increment = number / 50;
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= number) {
                    stat.textContent = number + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(currentValue) + suffix;
                }
            }, 30);
        }
    });
};

// Trigger stats animation when rooftop section is visible
const rooftopSection = document.querySelector('.rooftop-section');
if (rooftopSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(rooftopSection);
}

// Dynamic city skyline effect
const createSkylineEffect = () => {
    const citySkyline = document.querySelector('.city-skyline');
    if (!citySkyline) return;
    
    // Add animated lights to the skyline
    const lights = [];
    for (let i = 0; i < 20; i++) {
        const light = document.createElement('div');
        light.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #60a5fa;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 50}%;
            animation: twinkle ${2 + Math.random() * 3}s infinite;
            box-shadow: 0 0 10px #60a5fa;
        `;
        lights.push(light);
        citySkyline.appendChild(light);
    }
};

// Add twinkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.5); }
    }
`;
document.head.appendChild(style);

// Initialize skyline effect
document.addEventListener('DOMContentLoaded', createSkylineEffect);

// Enhanced button hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255,255,255,0.3);
            transform: translate(-50%, -50%);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        e.target.style.position = 'relative';
        e.target.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Weather-based rooftop availability indicator
const updateRooftopStatus = () => {
    const rooftopHours = document.querySelector('.rooftop-hours');
    if (!rooftopHours) return;
    
    // Simulate weather check (in real app, would use weather API)
    const isGoodWeather = Math.random() > 0.3; // 70% chance of good weather
    
    const statusIndicator = document.createElement('div');
    statusIndicator.style.cssText = `
        margin-top: 1rem;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        font-size: 0.9rem;
        text-align: center;
        ${isGoodWeather 
            ? 'background: rgba(16, 185, 129, 0.2); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3);'
            : 'background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3);'
        }
    `;
    statusIndicator.innerHTML = isGoodWeather 
        ? '🌤️ Rooftop is open with beautiful weather!'
        : '🌧️ Rooftop seating may be limited due to weather';
    
    rooftopHours.appendChild(statusIndicator);
};

// Initialize weather status
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(updateRooftopStatus, 1000);
});