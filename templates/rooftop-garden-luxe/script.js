// Mobile Navigation Toggle
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

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// Menu Category Switching
document.addEventListener('DOMContentLoaded', function() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Get selected category
            const category = this.getAttribute('data-category');
            
            // Show/hide menu items based on category
            menuItems.forEach(item => {
                if (category === 'signature' || item.classList.contains(category)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Views Gallery Interaction
document.addEventListener('DOMContentLoaded', function() {
    const viewCards = document.querySelectorAll('.view-card');
    
    viewCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });
    });
});

// Reservation Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.querySelector('.reservation-form form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Basic validation
            if (!data.name || !data.email || !data.phone || !data.date || !data.time || !data.guests) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Phone validation
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
                alert('Please enter a valid phone number.');
                return;
            }
            
            // Date validation (must be future date)
            const selectedDate = new Date(data.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                alert('Please select a future date.');
                return;
            }
            
            // Success message
            alert(`Thank you, ${data.name}! Your reservation request for ${data.guests} guests on ${data.date} at ${data.time} has been received. We'll contact you at ${data.email} to confirm.`);
            
            // Reset form
            this.reset();
        });
    }
});

// Garden Stats Animation
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = entry.target.querySelectorAll('.stat-number');
                stats.forEach(stat => {
                    animateNumber(stat);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const gardenSection = document.querySelector('.garden-section');
    if (gardenSection) {
        observer.observe(gardenSection);
    }
});

function animateNumber(element) {
    const finalValue = element.textContent;
    const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
    
    if (!isNaN(numericValue)) {
        let currentValue = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                element.textContent = finalValue;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(currentValue) + finalValue.replace(/\d/g, '').replace(/^\d+/, '');
            }
        }, 30);
    }
}

// Garden Image Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const gardenImages = document.querySelectorAll('.garden-img');
    
    gardenImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-bg');
    
    if (heroBackground) {
        const speed = scrolled * 0.5;
        heroBackground.style.transform = `translate3d(0, ${speed}px, 0)`;
    }
});

// Event Cards Hover Effect
document.addEventListener('DOMContentLoaded', function() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 50px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});

// Contact Form Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    inputs.forEach(input => {
        // Focus effects
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-color)';
            this.style.boxShadow = '0 0 0 3px rgba(74, 144, 226, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '#e1e8ed';
            this.style.boxShadow = 'none';
        });
        
        // Validation on input
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.style.borderColor = '#28a745';
            } else if (this.value.length > 0) {
                this.style.borderColor = '#dc3545';
            }
        });
    });
});

// Scroll-triggered Animations
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.garden-features .feature-item, .menu-item, .event-card');
    
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(element);
    });
});

// Weather-based UI Enhancement (Optional feature)
function updateWeatherBasedStyling() {
    // This would integrate with a weather API to adjust styling
    // For now, we'll just add time-based styling
    const hour = new Date().getHours();
    const body = document.body;
    
    if (hour >= 18 || hour <= 6) {
        // Evening/night mode
        body.style.filter = 'hue-rotate(15deg) saturate(1.1)';
    } else {
        // Day mode
        body.style.filter = 'none';
    }
}

// Initialize weather-based styling
document.addEventListener('DOMContentLoaded', updateWeatherBasedStyling);

// Keyboard Navigation Enhancement
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance optimization: Lazy load images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[src]');
    
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
});