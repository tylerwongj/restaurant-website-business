// Fine Dining Elegant Interior Template JavaScript

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
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

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar-overlay');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove background based on scroll position
    if (scrollTop > 100) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Reservation Form Handler
const reservationForm = document.querySelector('.reservation-form');

reservationForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    const requiredFields = ['first-name', 'last-name', 'email', 'phone', 'date', 'time', 'party-size'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
        alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
        return;
    }
    
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Validate phone format (basic)
    const phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phonePattern.test(data.phone)) {
        alert('Please enter a valid phone number');
        return;
    }
    
    // Validate date (must be future date)
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        alert('Please select a future date');
        return;
    }
    
    // Show success message
    alert('Thank you for your reservation request! We will contact you within 24 hours to confirm your booking.');
    
    // Reset form
    this.reset();
});

// Animate elements on scroll
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

// Observe course items, pricing cards, and other elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.course-item, .pricing-card, .award, .room, .detail, .highlight'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Course hover effects
document.querySelectorAll('.course-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Hero parallax effect (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background img');
    
    parallaxElements.forEach(element => {
        const speed = 0.3;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Date input minimum date (today)
const dateInput = document.querySelector('input[name="date"]');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Time input restrictions (dinner service only)
const timeInput = document.querySelector('input[name="time"]');
if (timeInput) {
    timeInput.setAttribute('min', '17:30');
    timeInput.setAttribute('max', '21:30');
    timeInput.setAttribute('step', '1800'); // 30-minute intervals
}

// Add loading states for external content
window.addEventListener('load', () => {
    // Hide any loading placeholders
    document.querySelectorAll('.loading-placeholder').forEach(el => {
        el.style.display = 'none';
    });
    
    // Show content
    document.body.classList.add('loaded');
});

// Wine category animations
document.querySelectorAll('.category').forEach((category, index) => {
    category.style.animationDelay = `${index * 0.2}s`;
});

// Private room hover effects
document.querySelectorAll('.room').forEach(room => {
    room.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--surface)';
        this.style.padding = '1.5rem';
        this.style.borderRadius = '10px';
        this.style.transition = 'all 0.3s ease';
    });
    
    room.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
        this.style.padding = '0';
        this.style.borderRadius = '0';
    });
});

// Featured pricing card pulse effect
const featuredCard = document.querySelector('.pricing-card.featured');
if (featuredCard) {
    setInterval(() => {
        featuredCard.style.transform = 'scale(1.02)';
        setTimeout(() => {
            featuredCard.style.transform = 'scale(1.05)';
        }, 1000);
    }, 3000);
}

// Award icon animations
document.querySelectorAll('.award-icon').forEach((icon, index) => {
    setTimeout(() => {
        icon.style.transform = 'rotateY(360deg)';
        icon.style.transition = 'transform 0.8s ease';
    }, index * 500);
});

// Contact method click handlers
document.querySelectorAll('.contact-method').forEach(method => {
    method.addEventListener('click', function() {
        const icon = this.querySelector('.method-icon');
        if (icon.textContent === '📞') {
            const phone = this.querySelector('p').textContent;
            window.location.href = `tel:${phone}`;
        } else if (icon.textContent === '✉️') {
            const email = this.querySelector('p').textContent;
            window.location.href = `mailto:${email}`;
        }
    });
});