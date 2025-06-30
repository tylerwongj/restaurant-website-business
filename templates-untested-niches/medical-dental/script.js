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
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Appointment form handling
const appointmentForm = document.querySelector('.appointment-form');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const firstName = this.querySelector('input[placeholder="First Name"]').value;
        const lastName = this.querySelector('input[placeholder="Last Name"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const date = this.querySelector('input[type="date"]').value;
        const time = this.querySelector('select').value;
        const service = this.querySelectorAll('select')[1].value;
        const newPatient = this.querySelector('#new-patient').checked;
        const privacyPolicy = this.querySelector('#privacy-policy').checked;
        
        if (!firstName || !lastName || !email || !phone || !date || !time || !service) {
            alert('Please fill in all required fields.');
            return;
        }
        
        if (!newPatient) {
            alert('Please confirm if you are a new patient.');
            return;
        }
        
        if (!privacyPolicy) {
            alert('Please agree to the privacy policy and terms.');
            return;
        }
        
        // Check if date is in the future
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert('Please select a future date for your appointment.');
            return;
        }
        
        // Simulate form submission
        alert('Thank you for your appointment request! We will contact you within 24 hours to confirm your appointment and provide pre-visit instructions.');
        this.reset();
    });
}

// Set minimum date for appointment date picker
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }
});

// Service card click to appointment
document.querySelectorAll('.service-card .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.textContent.includes('Emergency')) {
            return; // Let emergency calls go through
        }
        
        e.preventDefault();
        
        const serviceCard = this.closest('.service-card');
        const serviceName = serviceCard.querySelector('h3').textContent;
        
        // Scroll to appointment form
        document.querySelector('#appointment').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Pre-fill form with service selection
        const appointmentForm = document.querySelector('.appointment-form');
        if (appointmentForm) {
            const serviceSelect = appointmentForm.querySelectorAll('select')[1];
            const serviceMap = {
                'General Care': 'general',
                'Preventive Care': 'checkup',
                'Specialized Treatment': 'general',
                'Emergency Care': 'emergency'
            };
            
            if (serviceSelect && serviceMap[serviceName]) {
                serviceSelect.value = serviceMap[serviceName];
            }
        }
    });
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
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .team-member, .info-card, .stat, .resource-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--bg-color)';
        navbar.style.backdropFilter = 'none';
    }
});

// Phone number formatting
function formatPhoneNumber(phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumberString;
}

// Apply phone formatting to phone inputs
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function() {
        this.value = formatPhoneNumber(this.value);
    });
});

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const text = stat.textContent;
        const isPercentage = text.includes('%');
        const targetValue = parseInt(text.replace(/\D/g, ''));
        let currentValue = 0;
        const increment = targetValue / 100;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                stat.textContent = targetValue + (isPercentage ? '%' : '+');
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(currentValue) + (isPercentage ? '%' : '+');
            }
        }, 30);
    });
}

// Trigger stats animation when about section is visible
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(aboutSection);
}

// Emergency contact highlighting
function highlightEmergencyContacts() {
    const emergencyElements = document.querySelectorAll('[href*="emergency"], .emergency-notice');
    emergencyElements.forEach(el => {
        el.style.border = '2px solid var(--error-color)';
        el.style.borderRadius = '8px';
    });
}

// Call highlighting on page load
document.addEventListener('DOMContentLoaded', highlightEmergencyContacts);

// Form field focus enhancements
document.querySelectorAll('.appointment-form input, .appointment-form select, .appointment-form textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.style.borderColor = 'var(--secondary-color)';
        this.style.boxShadow = '0 0 10px rgba(39, 174, 96, 0.3)';
    });
    
    field.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
        if (this.value === '') {
            this.style.borderColor = 'var(--border-color)';
        }
    });
});

// Required field validation styling
document.querySelectorAll('.appointment-form input[required], .appointment-form select[required], .appointment-form textarea[required]').forEach(field => {
    field.addEventListener('invalid', function() {
        this.style.borderColor = 'var(--error-color)';
        this.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
    });
    
    field.addEventListener('input', function() {
        if (this.validity.valid) {
            this.style.borderColor = 'var(--success-color)';
            this.style.backgroundColor = 'rgba(39, 174, 96, 0.1)';
        }
    });
});

// Team member card enhancements
document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
    });
    
    member.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
});

// Resource card click tracking
document.querySelectorAll('.resource-card .btn').forEach(button => {
    button.addEventListener('click', function() {
        const resourceName = this.closest('.resource-card').querySelector('h3').textContent;
        console.log(`Resource accessed: ${resourceName}`);
        // In a real implementation, this could track analytics
    });
});

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Tab navigation enhancement for forms
    if (e.key === 'Tab') {
        const focusedElement = document.activeElement;
        if (focusedElement.tagName === 'INPUT' || focusedElement.tagName === 'SELECT' || focusedElement.tagName === 'TEXTAREA') {
            focusedElement.style.outline = '3px solid var(--secondary-color)';
            setTimeout(() => {
                focusedElement.style.outline = 'none';
            }, 2000);
        }
    }
});

// Print-friendly styling
window.addEventListener('beforeprint', function() {
    document.body.style.backgroundColor = 'white';
    document.querySelectorAll('.navbar, .hero, .footer').forEach(el => {
        el.style.display = 'none';
    });
});

window.addEventListener('afterprint', function() {
    document.body.style.backgroundColor = '';
    document.querySelectorAll('.navbar, .hero, .footer').forEach(el => {
        el.style.display = '';
    });
});