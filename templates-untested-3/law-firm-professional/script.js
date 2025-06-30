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

// Smooth Scrolling
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

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formInputs = this.querySelectorAll('input[type="text"]');
        const firstName = formInputs[0].value;
        const lastName = formInputs[1].value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const practiceArea = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        const urgent = this.querySelector('input[type="checkbox"]').checked;
        
        // Basic validation
        if (!firstName || !lastName || !email || !phone || !practiceArea || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            alert('Please enter a valid phone number.');
            return;
        }
        
        // Show success message (replace with actual form submission)
        const urgentText = urgent ? ' We will prioritize your case due to its urgent nature.' : '';
        alert(`Thank you, ${firstName}! Your consultation request for ${practiceArea} has been received.${urgentText} We will contact you within 24 hours.`);
        this.reset();
        
        // TODO: Replace with actual form submission to your backend
        console.log('Consultation request submitted:', {
            firstName,
            lastName,
            email,
            phone,
            practiceArea,
            message,
            urgent,
            timestamp: new Date().toISOString()
        });
    });
}

// Service Card Interactions
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const serviceName = this.querySelector('h3').textContent;
        
        // TODO: Replace with actual service detail page navigation
        alert(`Learn more about our ${serviceName} services. Contact us for a consultation.`);
        console.log('Service clicked:', serviceName);
    });
});

// Attorney Card Interactions
document.querySelectorAll('.attorney-card').forEach(card => {
    card.addEventListener('click', function() {
        const attorneyName = this.querySelector('h3').textContent;
        const title = this.querySelector('.title').textContent;
        
        // TODO: Replace with actual attorney profile page navigation
        alert(`Connect with ${attorneyName}, ${title}. Contact us to schedule a consultation.`);
        console.log('Attorney clicked:', { attorneyName, title });
    });
});

// Emergency Contact Button
const emergencyContact = document.querySelector('.emergency-contact');
if (emergencyContact) {
    emergencyContact.addEventListener('click', function() {
        const emergencyPhone = this.querySelector('p').textContent;
        if (confirm(`Call our 24/7 emergency line at ${emergencyPhone}?`)) {
            window.location.href = `tel:${emergencyPhone}`;
        }
    });
}

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Animation on Scroll
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
document.querySelectorAll('.service-card, .attorney-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Statistics Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '+';
    }, 30);
}

// Animate achievements when they come into view
const achievementsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const achievementElements = entry.target.querySelectorAll('.achievement h3');
            achievementElements.forEach(achievement => {
                const text = achievement.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number) {
                    animateCounter(achievement, number);
                }
            });
            achievementsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const achievementsSection = document.querySelector('.achievements');
if (achievementsSection) {
    achievementsObserver.observe(achievementsSection);
}

// Practice Area Auto-fill
const practiceAreaSelect = document.querySelector('select');
if (practiceAreaSelect) {
    // Check if user came from a specific service link
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    
    if (serviceParam) {
        // Auto-select the practice area based on URL parameter
        const option = Array.from(practiceAreaSelect.options).find(opt => 
            opt.value.toLowerCase().includes(serviceParam.toLowerCase())
        );
        if (option) {
            option.selected = true;
        }
    }
}

// Testimonial Slider (Simple)
const testimonialCards = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.style.display = i === index ? 'block' : 'none';
    });
}

// Auto-rotate testimonials every 5 seconds
if (testimonialCards.length > 1) {
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Add hover effects to interactive elements
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Form validation feedback
const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '#e5e7eb';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = '#3b82f6';
    });
});

// Privacy and legal disclaimers
function showPrivacyPolicy() {
    alert('Privacy Policy: Your information is confidential and protected by attorney-client privilege. We do not share your personal information with third parties.');
}

function showTermsOfService() {
    alert('Terms of Service: This website is for informational purposes only and does not constitute legal advice. Contacting us does not create an attorney-client relationship.');
}

function showAttorneyAdvertising() {
    alert('Attorney Advertising: This website may be considered attorney advertising in some jurisdictions. Past results do not guarantee future outcomes.');
}

// Add click handlers to footer legal links
document.addEventListener('DOMContentLoaded', function() {
    const privacyLink = document.querySelector('a[href="#"]:nth-of-type(1)');
    const termsLink = document.querySelector('a[href="#"]:nth-of-type(2)');
    const advertisingLink = document.querySelector('a[href="#"]:nth-of-type(3)');
    
    if (privacyLink) privacyLink.addEventListener('click', (e) => { e.preventDefault(); showPrivacyPolicy(); });
    if (termsLink) termsLink.addEventListener('click', (e) => { e.preventDefault(); showTermsOfService(); });
    if (advertisingLink) advertisingLink.addEventListener('click', (e) => { e.preventDefault(); showAttorneyAdvertising(); });
});