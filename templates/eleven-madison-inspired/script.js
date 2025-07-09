// Eleven Madison Park Inspired Restaurant Template - JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSmoothScrolling();
    initializeReservationForm();
    initializeAOS();
    initializeParallax();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Reservation form functionality
function initializeReservationForm() {
    const reservationForm = document.querySelector('.form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(reservationForm);
            const reservationData = {
                name: formData.get('name') || reservationForm.querySelector('input[type="text"]').value,
                email: formData.get('email') || reservationForm.querySelector('input[type="email"]').value,
                phone: formData.get('phone') || formData.get('tel') || reservationForm.querySelector('input[type="tel"]').value,
                guests: formData.get('guests') || reservationForm.querySelector('select').value,
                date: formData.get('date') || reservationForm.querySelector('input[type="date"]').value,
                time: formData.get('time') || reservationForm.querySelector('input[type="time"]').value,
                message: formData.get('message') || reservationForm.querySelector('textarea').value
            };
            
            // Validate required fields
            if (!reservationData.name || !reservationData.email || !reservationData.phone || 
                !reservationData.guests || !reservationData.date || !reservationData.time) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(reservationData.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Validate date (must be in the future)
            const selectedDate = new Date(reservationData.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showNotification('Please select a future date.', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = reservationForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Processing...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                showNotification('Reservation request submitted successfully! We will contact you within 24 hours to confirm.', 'success');
                reservationForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
}

// Newsletter form functionality
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                showNotification('Please enter your email address.', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = newsletterForm.querySelector('button');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Subscribing...';
            submitButton.disabled = true;
            
            // Simulate subscription (replace with actual logic)
            setTimeout(() => {
                showNotification('Successfully subscribed to our newsletter!', 'success');
                emailInput.value = '';
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1000);
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
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
        z-index: 10000;
        max-width: 400px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Style close button
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Add close functionality
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Animate on Scroll (AOS) functionality
function initializeAOS() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Add AOS attributes to elements
    const elements = document.querySelectorAll('.principle, .feature, .menu-item, .impact-card, .partner-card, .experience-features .feature');
    elements.forEach((element, index) => {
        element.classList.add('aos-element');
        element.style.cssText += `
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
            transition-delay: ${index * 0.1}s;
        `;
        observer.observe(element);
    });
    
    // Add CSS for animated state
    const style = document.createElement('style');
    style.textContent = `
        .aos-animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Parallax effects
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.hero-image, .philosophy-image');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Menu category filtering (if applicable)
function initializeMenuFilters() {
    const filterButtons = document.querySelectorAll('.menu-filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter menu items
            menuItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.classList.add('aos-animate');
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Image lazy loading
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Window resize handler
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth > 768) {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Initialize newsletter form when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeNewsletterForm();
    initializeLazyLoading();
});