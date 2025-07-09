document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
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
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Anniversary Modal
    const anniversaryModal = document.querySelector('.anniversary');
    const closeModalBtn = document.querySelector('.btn-close');
    
    // Show modal after 2 seconds
    setTimeout(() => {
        if (anniversaryModal) {
            anniversaryModal.classList.add('active');
        }
    }, 2000);
    
    // Close modal function
    window.closeModal = function() {
        if (anniversaryModal) {
            anniversaryModal.classList.remove('active');
        }
    };
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    if (anniversaryModal) {
        anniversaryModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.15,
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
    document.querySelectorAll('.experience-item, .menu-option, .gallery-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
    
    // Staggered animation for experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Form validation
    const reservationForm = document.querySelector('.reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Basic validation
            if (validateForm(formObject)) {
                // Show success message
                showFormMessage('Thank you for your reservation request. We will contact you shortly to confirm.', 'success');
                
                // Reset form
                this.reset();
            }
        });
    }
    
    function validateForm(data) {
        const errors = [];
        
        if (!data.name || data.name.length < 2) {
            errors.push('Please enter a valid name');
        }
        
        if (!data.email || !validateEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!data.phone || !validatePhone(data.phone)) {
            errors.push('Please enter a valid phone number');
        }
        
        if (!data.date) {
            errors.push('Please select a date');
        }
        
        if (!data.time) {
            errors.push('Please select a time');
        }
        
        if (!data.guests) {
            errors.push('Please select number of guests');
        }
        
        if (errors.length > 0) {
            showFormMessage(errors.join('<br>'), 'error');
            return false;
        }
        
        return true;
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePhone(phone) {
        const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return re.test(phone);
    }
    
    function showFormMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.innerHTML = message;
        
        const form = document.querySelector('.reservation-form');
        form.insertBefore(messageDiv, form.firstChild);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
    
    // Gallery lightbox effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openLightbox(img.src, img.alt);
            }
        });
    });
    
    function openLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${src}" alt="${alt}">
                <button class="lightbox-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Close lightbox
        const closeLightbox = () => {
            lightbox.remove();
        };
        
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
        
        // Close with ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
    
    // Menu option hover effects
    const menuOptions = document.querySelectorAll('.menu-option');
    menuOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        option.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Set minimum date for reservation form
    const dateInput = document.querySelector('#date');
    if (dateInput) {
        const today = new Date();
        const minDate = new Date(today.getTime() + 24 * 60 * 60 * 1000); // Tomorrow
        dateInput.min = minDate.toISOString().split('T')[0];
    }
});

// Add required styles for lightbox and form messages
const style = document.createElement('style');
style.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        opacity: 0;
        animation: fadeIn 0.3s ease forwards;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
    
    .lightbox-close {
        position: absolute;
        top: -50px;
        right: -10px;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 10px;
        line-height: 1;
    }
    
    .form-message {
        padding: 15px;
        margin-bottom: 20px;
        border-radius: 4px;
        font-size: 0.9rem;
        line-height: 1.5;
    }
    
    .form-message.success {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    .form-message.error {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
    
    @keyframes fadeIn {
        to { opacity: 1; }
    }
    
    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        flex-direction: column;
        padding: 30px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        border-top: 1px solid var(--gray-200);
    }
    
    .nav-menu.active li {
        margin: 10px 0;
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