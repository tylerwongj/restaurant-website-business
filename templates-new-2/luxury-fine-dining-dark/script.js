// Luxury Fine Dining Dark Theme JavaScript
// Based on modern restaurant website patterns

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
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

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const elementsToAnimate = document.querySelectorAll('.experience, .menu-preview, .chef, .reservations, .contact');
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // Reservation form validation and enhancement
    const reservationForm = document.querySelector('.reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(reservationForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.phone || !data.date || !data.time || !data.party_size) {
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
            if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) {
                alert('Please enter a valid phone number.');
                return;
            }

            // Date validation (not in the past)
            const selectedDate = new Date(data.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                alert('Please select a future date.');
                return;
            }

            // Show success message
            alert('Thank you for your reservation request! We will contact you within 24 hours to confirm your booking.');
            
            // Reset form
            reservationForm.reset();
        });

        // Set minimum date to today
        const dateInput = reservationForm.querySelector('input[name="date"]');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
    }

    // Contact form handling
    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Show success message
            alert('Thank you for your message! We will respond within 24 hours.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background img');
    
    if (hero && heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < hero.offsetHeight) {
                heroBackground.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Menu item hover effects
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Gallery image hover effects
    const galleryImages = document.querySelectorAll('.gallery-main img, .gallery-grid img');
    galleryImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Smooth reveal for feature items
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-30px)';
        feature.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });

    // Trigger feature animations when section is visible
    const featuresObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const features = entry.target.querySelectorAll('.feature');
                features.forEach(feature => {
                    feature.style.opacity = '1';
                    feature.style.transform = 'translateX(0)';
                });
            }
        });
    }, { threshold: 0.3 });

    const experienceSection = document.querySelector('.experience');
    if (experienceSection) {
        featuresObserver.observe(experienceSection);
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Touch support for mobile
    let touchStartY = 0;
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchmove', function(e) {
        const touchY = e.touches[0].clientY;
        const touchDiff = touchStartY - touchY;
        
        // Update navbar background based on scroll direction
        if (touchDiff > 5) {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        } else if (touchDiff < -5) {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Accessibility improvements
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-gold)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Add CSS class for loaded state
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) {
        opacity: 0;
    }
    
    body.loaded {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);