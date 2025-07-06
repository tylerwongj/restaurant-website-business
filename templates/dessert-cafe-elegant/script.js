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
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Menu tabs functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const orderType = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Success message
        alert('Thank you for your special order request! We\'ll contact you within 24 hours to discuss your sweet vision.');
        this.reset();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.dessert-card, .specialty-item, .menu-item, .contact-item').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image img');
    
    if (hero && heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Dynamic dessert rotation for signature section
function rotateFeaturedDesserts() {
    const dessertCards = document.querySelectorAll('.dessert-card');
    let currentIndex = 0;
    
    setInterval(() => {
        dessertCards.forEach((card, index) => {
            card.style.opacity = index === currentIndex ? '1' : '0.7';
            card.style.transform = index === currentIndex ? 'scale(1.05)' : 'scale(1)';
        });
        
        currentIndex = (currentIndex + 1) % dessertCards.length;
    }, 3000);
}

// Initialize featured dessert rotation
document.addEventListener('DOMContentLoaded', () => {
    rotateFeaturedDesserts();
});

// Sweet loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add sweet entrance animations
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle) {
        heroTitle.style.animation = 'fadeInUp 1s ease 0.3s forwards';
        heroTitle.style.opacity = '0';
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.animation = 'fadeInUp 1s ease 0.6s forwards';
        heroSubtitle.style.opacity = '0';
    }
});

// Add hover effects for dessert cards
document.querySelectorAll('.dessert-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
    });
});

// Sweet notifications for interactions
function showSweetNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'sweet-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add sweet interactions
document.querySelectorAll('.dessert-card').forEach(card => {
    card.addEventListener('click', function() {
        const dessertName = this.querySelector('h3').textContent;
        showSweetNotification(`Mmm! ${dessertName} looks delicious! 🍰`);
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Time-based personalization
function personalizeExperience() {
    const hour = new Date().getHours();
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroSubtitle) {
        let timeMessage = '';
        if (hour < 10) {
            timeMessage = 'Start your morning with something sweet!';
        } else if (hour < 14) {
            timeMessage = 'Perfect time for a dessert break!';
        } else if (hour < 18) {
            timeMessage = 'Afternoon treats await!';
        } else {
            timeMessage = 'End your day on a sweet note!';
        }
        
        // Add time-based message below existing subtitle
        const timeElement = document.createElement('p');
        timeElement.className = 'time-message';
        timeElement.textContent = timeMessage;
        timeElement.style.cssText = `
            font-style: italic;
            color: var(--text-light);
            margin-top: 10px;
            font-size: 1rem;
        `;
        heroSubtitle.parentNode.insertBefore(timeElement, heroSubtitle.nextSibling);
    }
}

// Initialize personalization
document.addEventListener('DOMContentLoaded', personalizeExperience);