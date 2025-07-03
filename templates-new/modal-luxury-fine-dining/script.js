// Modal Luxury Fine Dining Template JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 90; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 1px 20px rgba(0,0,0,0.05)';
        }
    });

    // Initialize modal functionality
    initializeModal();

    // Initialize reservation form
    initializeReservationForm();

    // Add scroll animations
    initializeScrollAnimations();
});

// Modal Functions
function initializeModal() {
    const modal = document.getElementById('reservationModal');
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    // Experience option selection
    const experienceOptions = document.querySelectorAll('.experience-option');
    experienceOptions.forEach(option => {
        option.addEventListener('click', function() {
            const experience = this.getAttribute('data-experience');
            selectExperience(experience);
        });
    });
}

function openModal() {
    const modal = document.getElementById('reservationModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Show experience options by default
    showExperienceOptions();
}

function openModalWithExperience(experience) {
    openModal();
    setTimeout(() => {
        selectExperience(experience);
    }, 300);
}

function closeModal() {
    const modal = document.getElementById('reservationModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    
    // Reset modal state
    setTimeout(() => {
        showExperienceOptions();
        resetForm();
    }, 300);
}

function showExperienceOptions() {
    const experienceOptions = document.querySelector('.experience-options');
    const reservationForm = document.getElementById('reservationForm');
    
    experienceOptions.style.display = 'grid';
    reservationForm.style.display = 'none';
    
    // Clear any selected options
    document.querySelectorAll('.experience-option').forEach(option => {
        option.classList.remove('selected');
    });
}

function selectExperience(experienceType) {
    const experienceOptions = document.querySelector('.experience-options');
    const reservationForm = document.getElementById('reservationForm');
    const selectedExperienceTitle = document.getElementById('selectedExperience');
    
    // Hide options and show form
    experienceOptions.style.display = 'none';
    reservationForm.style.display = 'block';
    
    // Update form title based on selection
    const experienceNames = {
        'dining-room': 'Dining Room Experience',
        'chefs-table': "Chef's Table Experience",
        'private-dining': 'Private Dining Experience'
    };
    
    selectedExperienceTitle.textContent = experienceNames[experienceType] || 'Dining Experience';
    
    // Set minimum date to today
    const dateInput = document.getElementById('reservationDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    
    // Set default date to 7 days from now
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 7);
    dateInput.value = defaultDate.toISOString().split('T')[0];
}

function initializeReservationForm() {
    const form = document.querySelector('#reservationForm form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const requiredFields = form.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                    field.style.boxShadow = '0 0 5px rgba(231, 76, 60, 0.3)';
                } else {
                    field.style.borderColor = '#ecf0f1';
                    field.style.boxShadow = 'none';
                }
            });
            
            if (isValid) {
                // Show success message
                showReservationSuccess();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
}

function showReservationSuccess() {
    const modal = document.getElementById('reservationModal');
    const modalBody = modal.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <div class="success-message" style="text-align: center; padding: 60px 40px;">
            <div style="font-size: 4rem; color: #d4af37; margin-bottom: 30px;">✓</div>
            <h3 style="color: #2c3e50; margin-bottom: 20px; font-size: 2rem;">Reservation Request Received</h3>
            <p style="color: #7f8c8d; font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px;">
                Thank you for your reservation request. Our reservations team will contact you within 24 hours to confirm your booking and discuss any special arrangements.
            </p>
            <p style="color: #95a5a6; font-size: 1rem; font-style: italic;">
                For immediate assistance, please call us at the number provided.
            </p>
            <button class="btn btn-primary" onclick="closeModal()" style="margin-top: 30px;">Close</button>
        </div>
    `;
}

function resetForm() {
    const form = document.querySelector('#reservationForm form');
    if (form) {
        form.reset();
        
        // Reset field styles
        const fields = form.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            field.style.borderColor = '#ecf0f1';
            field.style.boxShadow = 'none';
        });
    }
}

function initializeScrollAnimations() {
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
    const animateElements = document.querySelectorAll('.experience-card, .course, .press-item, .award');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Stagger animation for menu courses
    const courses = document.querySelectorAll('.course');
    courses.forEach((course, index) => {
        course.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Enhanced form field validation
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('#reservationForm input, #reservationForm select, #reservationForm textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#2c3e50';
            this.style.boxShadow = '0 0 8px rgba(44, 62, 80, 0.2)';
        });
    });
});

function validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    
    if (isRequired && !value) {
        setFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        setFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        setFieldError(field, 'Please enter a valid phone number');
        return false;
    }
    
    if (field.type === 'date' && value) {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            setFieldError(field, 'Please select a future date');
            return false;
        }
    }
    
    setFieldSuccess(field);
    return true;
}

function setFieldError(field, message) {
    field.style.borderColor = '#e74c3c';
    field.style.boxShadow = '0 0 5px rgba(231, 76, 60, 0.3)';
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.9rem; margin-top: 5px;';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function setFieldSuccess(field) {
    field.style.borderColor = '#27ae60';
    field.style.boxShadow = '0 0 5px rgba(39, 174, 96, 0.3)';
    
    // Remove error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
}

// Prevent form submission on enter key in modal (except textarea)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'BUTTON') {
        const modal = document.getElementById('reservationModal');
        if (modal.classList.contains('show')) {
            e.preventDefault();
        }
    }
});

// Add loading states to buttons
document.addEventListener('DOMContentLoaded', function() {
    const submitButtons = document.querySelectorAll('button[type="submit"]');
    submitButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.form && this.form.checkValidity()) {
                const originalText = this.textContent;
                this.textContent = 'Processing...';
                this.disabled = true;
                
                // Re-enable after processing
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
});

// Mobile menu styles (added via JavaScript for better control)
const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: rgba(255, 255, 255, 0.98);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            padding: 40px 0;
            z-index: 999;
        }

        .nav-menu.active {
            left: 0;
        }

        .nav-menu li {
            margin: 25px 0;
        }

        .nav-menu a {
            font-size: 1.2rem;
            padding: 15px;
            display: block;
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }

        .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        .nav-cta {
            display: none;
        }
        
        body.nav-open {
            overflow: hidden;
        }
    }
`;
document.head.appendChild(mobileMenuStyle);