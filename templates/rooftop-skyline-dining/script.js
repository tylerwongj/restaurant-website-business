// Rooftop Skyline Dining Restaurant Script

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initParallax();
    initSunsetCarousel();
    initScrollAnimations();
    initFormHandling();
    initSmoothScrolling();
    initMobileMenu();
    initWeatherEffects();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active nav link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Parallax scrolling effect for hero
function initParallax() {
    const heroLayers = document.querySelectorAll('.hero-layer');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        heroLayers.forEach(layer => {
            const speed = layer.dataset.speed;
            const yPos = -(scrollTop * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Sunset carousel functionality
function initSunsetCarousel() {
    const carousel = document.querySelector('.sunset-carousel');
    if (!carousel) return;
    
    const images = carousel.querySelectorAll('img');
    let currentImage = 0;
    
    function showNextImage() {
        images[currentImage].style.opacity = '0';
        currentImage = (currentImage + 1) % images.length;
        images[currentImage].style.opacity = '1';
    }
    
    // Auto-advance carousel every 4 seconds
    setInterval(showNextImage, 4000);
    
    // Pause on hover
    carousel.addEventListener('mouseenter', function() {
        clearInterval(showNextImage);
    });
    
    carousel.addEventListener('mouseleave', function() {
        setInterval(showNextImage, 4000);
    });
}

// Scroll animations
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
    document.querySelectorAll('.menu-category, .event-type, .highlight, .contact-method').forEach(el => {
        observer.observe(el);
    });
}

// Form handling
function initFormHandling() {
    const reservationForms = document.querySelectorAll('.booking-form, .reservation-form');
    
    reservationForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Remove error class on input
                    field.addEventListener('input', function() {
                        this.classList.remove('error');
                    });
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Booking...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = 'Reservation Requested!';
                    submitBtn.classList.add('success');
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('success');
                        form.reset();
                    }, 3000);
                }, 2000);
                
                // Show success message
                showNotification('Reservation request submitted! We\'ll contact you soon.', 'success');
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// Weather effects for atmosphere
function initWeatherEffects() {
    // Add subtle animations based on time of day
    const currentHour = new Date().getHours();
    const body = document.body;
    
    if (currentHour >= 17 && currentHour <= 20) {
        // Golden hour effect
        body.classList.add('golden-hour');
    } else if (currentHour >= 20 || currentHour <= 6) {
        // Night time effect
        body.classList.add('night-time');
    }
    
    // Add floating particles for atmosphere
    createFloatingParticles();
}

// Create floating particles effect
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    // Create subtle floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 215, 0, 0.3);
            border-radius: 50%;
            animation: float ${5 + Math.random() * 10}s infinite linear;
            left: ${Math.random() * 100}%;
            top: 100%;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-size: 0.9rem;
        line-height: 1.4;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
    
    // Click to dismiss
    notification.addEventListener('click', function() {
        this.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(this)) {
                document.body.removeChild(this);
            }
        }, 300);
    });
}

// View statistics counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Initialize counter animation when in view
const statObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.view-stats');
if (statsSection) {
    statObserver.observe(statsSection);
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = function() {
                    this.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Reservation time suggestions based on sunset times
function updateReservationTimes() {
    const timeSelects = document.querySelectorAll('select[name="time"], select:has(option[value*="PM"])');
    const now = new Date();
    const currentHour = now.getHours();
    
    timeSelects.forEach(select => {
        const options = select.querySelectorAll('option');
        options.forEach(option => {
            const timeStr = option.textContent;
            if (timeStr.includes('PM')) {
                const hour = parseInt(timeStr.split(':')[0]);
                const fullHour = hour === 12 ? 12 : hour + 12;
                
                // Highlight sunset dining times (5:30-7:30 PM)
                if (fullHour >= 17.5 && fullHour <= 19.5) {
                    option.textContent = `${timeStr} 🌅 Sunset Views`;
                    option.style.color = '#ff6b35';
                    option.style.fontWeight = 'bold';
                }
            }
        });
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', updateReservationTimes);

// Add custom scrollbar styling
const customScrollbarCSS = `
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: #1a252f;
    }
    
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #ff6b35, #ffd700);
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #ffd700, #ff6b35);
    }
`;

const scrollbarStyle = document.createElement('style');
scrollbarStyle.textContent = customScrollbarCSS;
document.head.appendChild(scrollbarStyle);

// Export functions for external use
window.RooftopDining = {
    showNotification,
    animateCounters,
    updateReservationTimes
};