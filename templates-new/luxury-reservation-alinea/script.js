// Luxury Reservation Alinea Template JavaScript

// Modal functionality
function openReservationModal() {
    const modal = document.getElementById('reservationModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeReservationModal() {
    const modal = document.getElementById('reservationModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('reservationModal');
    if (e.target === modal) {
        closeReservationModal();
    }
});

// Experience selection functionality
document.addEventListener('DOMContentLoaded', function() {
    const experienceCards = document.querySelectorAll('.experience-card');
    const selectedExperienceInput = document.getElementById('selectedExperience');
    
    experienceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            experienceCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            this.classList.add('selected');
            
            // Update hidden input value
            const experience = this.getAttribute('data-experience');
            selectedExperienceInput.value = experience;
            
            // Scroll to reservation form
            const form = document.querySelector('.reservation-form');
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Form submission handling
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const experienceType = document.getElementById('selectedExperience').value;
        let message = 'Thank you for your reservation request! ';
        
        if (experienceType) {
            const experienceNames = {
                'tasting': 'Chef\'s Tasting Menu',
                'chefs-table': 'Chef\'s Table Experience',
                'private': 'Private Dining Room'
            };
            message += `We have received your request for the ${experienceNames[experienceType]}. `;
        }
        
        message += 'Our reservations team will contact you within 24 hours to confirm your booking.';
        
        alert(message);
        this.reset();
        closeReservationModal();
    });
});

// Set minimum date for reservations (today)
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        input.setAttribute('min', today);
    });
});

// Scroll animations for elements
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

// Apply scroll animations to various elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.cuisine-card, .event-card, .story-highlights .highlight, .celebration'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// Botanical SVG animation on hover
document.addEventListener('DOMContentLoaded', function() {
    const botanicalSvgs = document.querySelectorAll('.logo-botanical svg, .footer-botanical svg');
    
    botanicalSvgs.forEach(svg => {
        svg.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        svg.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Highlight numbers count-up animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames for 1 second animation
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16); // ~60fps
}

// Trigger counter animation when highlights come into view
const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target.querySelector('.highlight-number');
            const targetValue = parseInt(number.textContent);
            animateCounter(number, targetValue);
            highlightObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.highlight').forEach(highlight => {
        highlightObserver.observe(highlight);
    });
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Elegant form validation with custom styling
function addFormValidation() {
    const form = document.getElementById('experienceReservation');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#dc2626';
                this.style.boxShadow = '0 0 0 1px #dc2626';
            } else {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#8b7355';
            this.style.boxShadow = '0 0 0 1px #8b7355';
        });
    });
}

// Image lazy loading for better performance
function addLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Enhanced accessibility features
function addAccessibilityFeatures() {
    // Keyboard navigation for modal
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('reservationModal');
        if (modal.style.display === 'block' && e.key === 'Escape') {
            closeReservationModal();
        }
    });
    
    // Focus management for modal
    const modal = document.getElementById('reservationModal');
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        modal.addEventListener('keydown', function(e) {
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
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addFormValidation();
    addLazyLoading();
    addAccessibilityFeatures();
    
    // Add subtle parallax effect to hero artwork
    const heroArtwork = document.querySelector('.hero-artwork');
    if (heroArtwork) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.2;
            heroArtwork.style.transform = `translateY(${rate}px)`;
        });
    }
});

// Global function for external use
window.openReservationModal = openReservationModal;
window.closeReservationModal = closeReservationModal;