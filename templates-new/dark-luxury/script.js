// Dark Luxury Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
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
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.8)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Parallax effect for hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-background img');
        
        if (hero && scrolled < window.innerHeight) {
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        }
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.location-card, .experience-content, .menu-category, .chef-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
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
            
            alert('Thank you for your message. We will contact you soon.');
            this.reset();
        });
    }
    
    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
    
    // Initialize animations
    initAnimations();
});

function initAnimations() {
    // Add CSS for animations
    if (!document.querySelector('#dark-luxury-styles')) {
        const style = document.createElement('style');
        style.id = 'dark-luxury-styles';
        style.textContent = `
            .fade-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .location-card,
            .experience-content,
            .menu-category,
            .chef-content {
                opacity: 0;
                transform: translateY(40px);
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
            
            .nav-menu.active {
                display: flex !important;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: rgba(26, 26, 26, 0.98);
                backdrop-filter: blur(10px);
                border-top: 1px solid #404040;
                padding: 2rem;
                gap: 1.5rem;
            }
            
            @media (max-width: 768px) {
                .nav-menu {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Modal functionality
function openReservationModal() {
    const modal = document.getElementById('reservationModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Set minimum date to today
        const dateInput = document.getElementById('res-date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
    }
}

function closeReservationModal() {
    const modal = document.getElementById('reservationModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Reservation form handling
document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.querySelector('.reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validation
            const required = ['date', 'time', 'guests', 'name', 'phone', 'email'];
            let isValid = true;
            
            required.forEach(field => {
                if (!data[field]) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            alert('Thank you for your reservation request. We will contact you shortly to confirm.');
            this.reset();
            closeReservationModal();
        });
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('reservationModal');
    if (event.target === modal) {
        closeReservationModal();
    }
});

// Close modal with escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeReservationModal();
    }
});

// Theme switcher (for color scheme variations)
function switchTheme(themeName) {
    document.body.className = document.body.className.replace(/theme-\w+/, '');
    document.body.classList.add(`theme-${themeName}`);
    localStorage.setItem('preferred-dark-theme', themeName);
}

// Load preferred theme
const preferredTheme = localStorage.getItem('preferred-dark-theme');
if (preferredTheme) {
    switchTheme(preferredTheme);
}

// Dynamic location-based time slots
document.addEventListener('change', function(e) {
    if (e.target.id === 'location-select') {
        const location = e.target.value;
        const timeSelect = document.getElementById('res-time');
        
        // Clear existing options except first
        while (timeSelect.children.length > 1) {
            timeSelect.removeChild(timeSelect.lastChild);
        }
        
        // Add location-specific time slots
        const timeSlots = getTimeSlotsForLocation(location);
        timeSlots.forEach(slot => {
            const option = document.createElement('option');
            option.value = slot.value;
            option.textContent = slot.text;
            timeSelect.appendChild(option);
        });
    }
});

function getTimeSlotsForLocation(location) {
    // Example: Different locations might have different operating hours
    const slots = {
        'location1': [
            { value: '18:00', text: '6:00 PM' },
            { value: '18:30', text: '6:30 PM' },
            { value: '19:00', text: '7:00 PM' },
            { value: '19:30', text: '7:30 PM' },
            { value: '20:00', text: '8:00 PM' },
            { value: '20:30', text: '8:30 PM' },
            { value: '21:00', text: '9:00 PM' }
        ],
        'location2': [
            { value: '17:30', text: '5:30 PM' },
            { value: '18:00', text: '6:00 PM' },
            { value: '18:30', text: '6:30 PM' },
            { value: '19:00', text: '7:00 PM' },
            { value: '19:30', text: '7:30 PM' },
            { value: '20:00', text: '8:00 PM' },
            { value: '20:30', text: '8:30 PM' },
            { value: '21:00', text: '9:00 PM' },
            { value: '21:30', text: '9:30 PM' }
        ]
    };
    
    return slots[location] || slots['location1'];
}

// Make functions globally available
window.openReservationModal = openReservationModal;
window.closeReservationModal = closeReservationModal;
window.switchTheme = switchTheme;