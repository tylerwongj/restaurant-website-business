// Luxury Minimalist Template JavaScript

// Mobile Navigation
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

// Reservation Modal
const modal = document.getElementById('reservation-modal');
const closeBtn = document.querySelector('.close');

function openReservationModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeReservationModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking the X
if (closeBtn) {
    closeBtn.addEventListener('click', closeReservationModal);
}

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeReservationModal();
    }
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(248, 246, 243, 0.98)';
    } else {
        navbar.style.background = 'rgba(248, 246, 243, 0.95)';
    }
});

// Form handling for reservation
const reservationForm = document.querySelector('.reservation-form');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to your server
        console.log('Reservation data:', data);
        
        // Show success message (you can customize this)
        alert('Thank you for your reservation request! We will contact you shortly to confirm.');
        
        // Close modal and reset form
        closeReservationModal();
        this.reset();
    });
}

// Date input - set minimum date to today
const dateInput = document.querySelector('input[type="date"]');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Enhanced mobile navigation with better UX
function setupMobileNavigation() {
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    // Create mobile menu styles
    if (window.innerWidth <= 768) {
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = 'var(--background-light)';
        navMenu.style.flexDirection = 'column';
        navMenu.style.padding = '2rem';
        navMenu.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        navMenu.style.transform = 'translateY(-100%)';
        navMenu.style.opacity = '0';
        navMenu.style.transition = 'all 0.3s ease';
        navMenu.style.zIndex = '999';
    }
}

// Call mobile navigation setup on load and resize
window.addEventListener('load', setupMobileNavigation);
window.addEventListener('resize', setupMobileNavigation);

// Add active class styles for mobile menu
const style = document.createElement('style');
style.textContent = `
    .nav-menu.active {
        transform: translateY(0) !important;
        opacity: 1 !important;
        display: flex !important;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations
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

// Observe sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
});

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeReservationModal();
    }
});

// Focus management for accessibility
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });

    firstElement.focus();
}

// Apply focus trap when modal opens
const originalOpenModal = openReservationModal;
openReservationModal = function() {
    originalOpenModal();
    trapFocus(modal);
};