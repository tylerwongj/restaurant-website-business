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

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.25)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.15)';
    }
});

// Form Submission
const reservationForm = document.querySelector('.contact-form form');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const date = this.querySelector('input[type="date"]').value;
        const partySize = this.querySelector('select').value;
        const requests = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !phone || !date || !partySize) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Date validation (must be today or future)
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert('Please select a date that is today or in the future.');
            return;
        }
        
        // Show success message
        alert('Thank you for your reservation request! We will contact you shortly to confirm your booking.');
        
        // Reset form
        this.reset();
    });
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background img');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Glass Card Hover Effects
const glassCards = document.querySelectorAll('.glass-card');
glassCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    });
});

// Intersection Observer for Animations
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

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Counter Animation for Stats
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.dataset.suffix || '');
        }
    }, 20);
};

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-item h3');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/\d/g, '');
                stat.dataset.suffix = suffix;
                animateCounter(stat, number);
            });
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Dynamic Background Gradient
let gradientAngle = 135;
setInterval(() => {
    gradientAngle += 0.5;
    if (gradientAngle >= 360) gradientAngle = 0;
    
    document.body.style.background = `linear-gradient(${gradientAngle}deg, #667eea 0%, #764ba2 100%)`;
}, 100);

// Menu Item Hover Effects
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const priceTag = this.querySelector('.price-tag');
        if (priceTag) {
            priceTag.style.transform = 'scale(1.1) rotate(3deg)';
            priceTag.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const priceTag = this.querySelector('.price-tag');
        if (priceTag) {
            priceTag.style.transform = 'scale(1) rotate(0deg)';
            priceTag.style.background = '#6366f1';
        }
    });
});

// Floating Animation for Floating Card
const floatingCard = document.querySelector('.floating-card');
if (floatingCard) {
    let floatDirection = 1;
    setInterval(() => {
        const currentTransform = floatingCard.style.transform || 'translateY(0px)';
        const currentY = parseFloat(currentTransform.match(/translateY\(([^)]+)\)/)?.[1] || 0);
        
        if (currentY >= 20) floatDirection = -1;
        if (currentY <= -20) floatDirection = 1;
        
        const newY = currentY + (floatDirection * 0.5);
        floatingCard.style.transform = `translateY(${newY}px)`;
    }, 50);
}

// Scroll to Top Functionality (if needed)
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        // Could add a scroll to top button here
    }
});

console.log('Glassmorphism Restaurant Template Loaded Successfully!');