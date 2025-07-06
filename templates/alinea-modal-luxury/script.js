// Alinea-Inspired Modal-First Luxury Template JavaScript

// Global state
let currentModal = null;

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeModals();
    initializeForms();
    initializeScrollAnimations();
    initializeIntersectionObserver();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Modal functionality
function initializeModals() {
    // Anniversary modal auto-show (can be controlled)
    const anniversaryModal = document.getElementById('anniversaryModal');
    if (anniversaryModal) {
        // Show modal by default (as per Alinea's design)
        showAnniversaryModal();
    }
    
    // Close modals on overlay click
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function() {
            const modal = this.closest('.anniversary-modal, .reservation-modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modals on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && currentModal) {
            closeModal(currentModal);
        }
    });
}

// Anniversary Modal Functions
function openAnniversaryModal() {
    const modal = document.getElementById('anniversaryModal');
    showModal(modal);
}

function closeAnniversaryModal() {
    const modal = document.getElementById('anniversaryModal');
    closeModal(modal);
}

function showAnniversaryModal() {
    const modal = document.getElementById('anniversaryModal');
    if (modal) {
        modal.classList.add('active');
        currentModal = modal;
        document.body.style.overflow = 'hidden';
    }
}

// Reservation Modal Functions
function openReservationModal(experienceType) {
    const modal = document.getElementById('reservationModal');
    const experienceInput = document.getElementById('experience-type');
    
    if (experienceInput && experienceType) {
        experienceInput.value = experienceType;
    }
    
    // Close anniversary modal if open
    closeAnniversaryModal();
    
    showModal(modal);
}

function closeReservationModal() {
    const modal = document.getElementById('reservationModal');
    closeModal(modal);
}

// Generic Modal Functions
function showModal(modal) {
    if (modal) {
        modal.classList.add('active');
        currentModal = modal;
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        currentModal = null;
        document.body.style.overflow = '';
    }
}

// Experience Modal Functions (placeholder)
function openExperienceModal(experienceType) {
    // This could open a detailed experience modal
    // For now, redirect to reservation with experience type
    openReservationModal(experienceType);
}

// Form handling
function initializeForms() {
    // Mailing list forms
    const mailingForms = document.querySelectorAll('.mailing-form, .wine-form');
    mailingForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleMailingListSubmission(this);
        });
    });
    
    // Reservation forms
    const reservationForms = document.querySelectorAll('.reservation-form-inline, .detailed-reservation-form');
    reservationForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleReservationSubmission(this);
        });
    });
    
    // Set minimum date to today for date inputs
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });
}

function handleMailingListSubmission(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput ? emailInput.value : '';
    
    if (email) {
        // Simulate API call
        showNotification('Thank you for subscribing to our mailing list!', 'success');
        form.reset();
    }
}

function handleReservationSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.date || !data.time || !data.name || !data.email) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Simulate API call
    showNotification('Reservation request submitted! We will contact you shortly to confirm.', 'success');
    
    // Close modal if this is the detailed form
    if (form.classList.contains('detailed-reservation-form')) {
        closeReservationModal();
    }
    
    form.reset();
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Scroll animations
function initializeScrollAnimations() {
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.experience-card, .gallery-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for global access
window.openAnniversaryModal = openAnniversaryModal;
window.closeAnniversaryModal = closeAnniversaryModal;
window.openReservationModal = openReservationModal;
window.closeReservationModal = closeReservationModal;
window.openExperienceModal = openExperienceModal;