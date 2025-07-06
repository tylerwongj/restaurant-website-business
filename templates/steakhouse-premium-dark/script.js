// Steakhouse Premium Dark Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Reservation form handling
    const reservationForm = document.querySelector('.reservation-form form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const partySize = formData.get('party_size');
            const date = formData.get('date');
            const time = formData.get('time');
            const specialRequests = formData.get('special_requests');
            
            // Basic validation
            if (!name || !email || !phone || !partySize || !date || !time) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Date validation (must be future date)
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showNotification('Please select a future date.', 'error');
                return;
            }
            
            // Success message
            showNotification('Reservation request submitted! We will contact you within 24 hours to confirm.', 'success');
            
            // Reset form
            this.reset();
            
            // Here you would typically send the data to your server
            console.log('Reservation submitted:', {
                name,
                email,
                phone,
                partySize,
                date,
                time,
                specialRequests
            });
        });
    }
    
    // Enhanced menu item interactions
    const menuItems = document.querySelectorAll('.menu-item, .cut-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(212, 175, 55, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background img');
    
    if (hero && heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            if (scrolled < hero.offsetHeight) {
                heroBackground.style.transform = `translateY(${parallax}px)`;
            }
        });
    }
    
    // Scroll animations with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animation for cut items
                if (entry.target.classList.contains('cut-item')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, 100);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.cut-item, .feature, .menu-item, .pairing-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Premium cuts showcase rotation
    const cutItems = document.querySelectorAll('.cut-item');
    let currentCut = 0;
    
    function highlightFeaturedCut() {
        cutItems.forEach((cut, index) => {
            if (index === currentCut) {
                cut.style.borderColor = '#d4af37';
                cut.style.boxShadow = '0 15px 35px rgba(212, 175, 55, 0.4)';
                cut.style.transform = 'translateY(-5px) scale(1.02)';
            } else {
                cut.style.borderColor = 'transparent';
                cut.style.boxShadow = '';
                cut.style.transform = 'translateY(0) scale(1)';
            }
        });
        
        currentCut = (currentCut + 1) % cutItems.length;
    }
    
    // Highlight cuts every 4 seconds
    if (cutItems.length > 0) {
        setInterval(highlightFeaturedCut, 4000);
    }
    
    // Wine pairing hover effects
    const pairingItems = document.querySelectorAll('.pairing-item');
    
    pairingItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const line = this.querySelector('.pairing-line');
            if (line) {
                line.style.background = 'linear-gradient(to bottom, #d4af37, #cd7f32, #d4af37)';
                line.style.height = '80px';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const line = this.querySelector('.pairing-line');
            if (line) {
                line.style.background = 'linear-gradient(to bottom, #d4af37, #cd7f32)';
                line.style.height = '60px';
            }
        });
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(13, 13, 13, 0.95)';
            navbar.style.borderBottom = '2px solid #d4af37';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.borderBottom = '1px solid #d4af37';
        }
    });
    
    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            let formattedValue = '';
            
            if (value.length >= 1) {
                formattedValue = '(' + value.substring(0, 3);
            }
            if (value.length >= 4) {
                formattedValue += ') ' + value.substring(3, 6);
            }
            if (value.length >= 7) {
                formattedValue += '-' + value.substring(6, 10);
            }
            
            e.target.value = formattedValue;
        });
    });
    
    // Date input minimum date (today)
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });
    
    // Loading animation for images
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.filter = 'blur(0)';
        });
        
        // Set initial state
        img.style.opacity = '0';
        img.style.filter = 'blur(5px)';
        img.style.transition = 'opacity 0.5s ease, filter 0.5s ease';
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
            img.style.filter = 'blur(0)';
        }
    });
    
    // Premium experience enhancements
    addPremiumEffects();
});

// Utility functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const bgColor = type === 'success' ? '#d4af37' : '#8b0000';
    const textColor = type === 'success' ? '#1a1a1a' : '#ffffff';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: ${textColor};
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 600;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        border: 1px solid #cd7f32;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Premium experience effects
function addPremiumEffects() {
    // Golden sparkle effect on hover for gold elements
    const goldElements = document.querySelectorAll('.btn-primary, .price, h2');
    
    goldElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            createSparkleEffect(this);
        });
    });
    
    // Smooth reveal animations for sections
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
        }
        
        .sparkle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: #d4af37;
            border-radius: 50%;
            pointer-events: none;
            animation: sparkle 0.6s ease;
        }
    `;
    document.head.appendChild(style);
}

function createSparkleEffect(element) {
    const rect = element.getBoundingClientRect();
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    const x = rect.left + Math.random() * rect.width;
    const y = rect.top + Math.random() * rect.height;
    
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        document.body.removeChild(sparkle);
    }, 600);
}

// Advanced reservation system
function validateReservationTime(date, time) {
    const selectedDateTime = new Date(date + 'T' + time);
    const now = new Date();
    const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    
    if (selectedDateTime < twoHoursFromNow) {
        return {
            valid: false,
            message: 'Reservations must be made at least 2 hours in advance.'
        };
    }
    
    const dayOfWeek = selectedDateTime.getDay();
    const hour = selectedDateTime.getHours();
    
    // Restaurant hours: Tuesday-Sunday, 5PM-10PM
    if (dayOfWeek === 1) { // Monday
        return {
            valid: false,
            message: 'We are closed on Mondays.'
        };
    }
    
    if (hour < 17 || hour > 21) {
        return {
            valid: false,
            message: 'Reservations are available from 5:00 PM to 9:00 PM.'
        };
    }
    
    return { valid: true };
}

// Call to action tracking
function trackCTAClick(buttonText, location) {
    console.log('Steakhouse CTA clicked:', buttonText, 'Location:', location);
    
    // Enhanced tracking for steakhouse specific actions
    if (buttonText.includes('Reservation')) {
        console.log('Reservation CTA clicked - High value conversion');
    }
    
    if (buttonText.includes('Steak')) {
        console.log('Menu CTA clicked - Product interest');
    }
}

// Add click tracking to CTA buttons
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const section = this.closest('section')?.className || 'unknown';
            trackCTAClick(buttonText, section);
        });
    });
});