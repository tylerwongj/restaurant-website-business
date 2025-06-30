// BBQ Smokehouse Template JavaScript

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
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
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--bg-color)';
        navbar.style.backdropFilter = 'none';
    }
});

// Contact Form Handling
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const datetime = this.querySelector('input[type="datetime-local"]').value;
    const orderType = this.querySelector('select').value;
    const orderDetails = this.querySelector('textarea').value;
    
    // Basic validation
    if (!name || !phone || !datetime || !orderType || !orderDetails) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\(\)\+]+$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number.');
        return;
    }
    
    // Date validation (must be future date/time)
    const selectedDateTime = new Date(datetime);
    const now = new Date();
    
    if (selectedDateTime <= now) {
        alert('Please select a future date and time.');
        return;
    }
    
    // Success message based on order type
    let successMessage = 'Thank you for your order! ';
    switch(orderType) {
        case 'pickup':
            successMessage += 'We will call you when your BBQ is ready for pickup.';
            break;
        case 'delivery':
            successMessage += 'We will contact you to confirm delivery details.';
            break;
        case 'catering':
            successMessage += 'Our catering team will contact you to discuss your event.';
            break;
        default:
            successMessage += 'We will contact you shortly to confirm your order.';
    }
    
    alert(successMessage);
    
    // Reset form
    this.reset();
});

// BBQ Card Hover Effects with Smoke Animation
document.addEventListener('DOMContentLoaded', function() {
    const bbqCards = document.querySelectorAll('.bbq-card');
    
    bbqCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(139, 69, 19, 0.2)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px var(--shadow)';
        });
    });
});

// Process Steps Animation
document.addEventListener('DOMContentLoaded', function() {
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(1deg)';
            this.style.boxShadow = '0 10px 25px rgba(255, 69, 0, 0.2)';
            this.style.transition = 'all 0.3s ease';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
            this.style.boxShadow = '0 5px 20px var(--shadow)';
        });
    });
});

// Badge Animation on Load
document.addEventListener('DOMContentLoaded', function() {
    const badges = document.querySelectorAll('.badge');
    
    badges.forEach((badge, index) => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 5px 15px rgba(255, 69, 0, 0.5)';
            this.style.transition = 'all 0.3s ease';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 3px 10px rgba(255, 69, 0, 0.3)';
        });
        
        // Staggered animation on load
        setTimeout(() => {
            badge.style.opacity = '1';
            badge.style.transform = 'translateX(0)';
        }, index * 300);
        
        badge.style.opacity = '0';
        badge.style.transform = 'translateX(-20px)';
        badge.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Animate elements on scroll
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.process-step, .bbq-card, .pitmaster-card, .menu-category');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// Image lazy loading with fade effect
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = function() {
                    img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Pitmaster Card Special Effect
document.addEventListener('DOMContentLoaded', function() {
    const pitmasterCard = document.querySelector('.pitmaster-card');
    
    if (pitmasterCard) {
        pitmasterCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.borderLeft = '6px solid var(--fire-orange)';
            this.style.transition = 'all 0.3s ease';
        });
        
        pitmasterCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.borderLeft = '4px solid var(--fire-orange)';
        });
    }
});

// Menu Items Hover Effect
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f9f9f9';
            this.style.padding = '25px 15px';
            this.style.margin = '0 -15px';
            this.style.borderRadius = '8px';
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.padding = '20px 0';
            this.style.margin = '0';
            this.style.borderRadius = '0';
        });
    });
});

// Smoke Time Animation
document.addEventListener('DOMContentLoaded', function() {
    const smokeTimes = document.querySelectorAll('.smoke-time');
    
    smokeTimes.forEach(smokeTime => {
        smokeTime.addEventListener('mouseenter', function() {
            this.style.color = 'var(--fire-orange)';
            this.style.textShadow = '0 0 10px rgba(255, 69, 0, 0.5)';
            this.style.transition = 'all 0.3s ease';
        });
        
        smokeTime.addEventListener('mouseleave', function() {
            this.style.color = 'var(--fire-orange)';
            this.style.textShadow = 'none';
        });
    });
});

// Dynamic copyright year
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
});