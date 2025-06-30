// Contemporary Sushi Bar - v3 JavaScript

// Mobile Navigation Toggle
function initMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-item');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.contemporary-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 10;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mainNav = document.querySelector('.main-nav');
                const menuToggle = document.querySelector('.menu-toggle');
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.contemporary-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Menu Filter Functionality
function initMenuFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter menu cards
            menuCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';\n                    card.style.opacity = '0';\n                    card.style.transform = 'translateY(20px)';\n                    \n                    setTimeout(() => {\n                        card.style.opacity = '1';\n                        card.style.transform = 'translateY(0)';\n                    }, 100);\n                } else {\n                    card.style.opacity = '0';\n                    card.style.transform = 'translateY(20px)';\n                    \n                    setTimeout(() => {\n                        card.style.display = 'none';\n                    }, 300);\n                }\n            });\n        });\n    });\n}\n\n// Form Validation and Submission\nfunction initContactForm() {\n    const form = document.querySelector('.contact-form');\n    \n    if (form) {\n        // Set minimum date to today\n        const dateInput = form.querySelector('#date');\n        if (dateInput) {\n            const today = new Date().toISOString().split('T')[0];\n            dateInput.setAttribute('min', today);\n        }\n        \n        form.addEventListener('submit', (e) => {\n            e.preventDefault();\n            \n            // Get form data\n            const formData = new FormData(form);\n            const data = Object.fromEntries(formData);\n            \n            // Validation\n            if (!validateContactForm(data)) {\n                return;\n            }\n            \n            // If all validation passes\n            showSuccessMessage();\n        });\n    }\n}\n\n// Form validation function\nfunction validateContactForm(data) {\n    // Required fields validation\n    const requiredFields = ['name', 'email', 'phone', 'date', 'time', 'guests'];\n    for (let field of requiredFields) {\n        if (!data[field] || data[field].trim() === '') {\n            showErrorMessage(`Please fill in the ${field.replace('_', ' ')} field.`);\n            return false;\n        }\n    }\n    \n    // Email validation\n    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n    if (!emailRegex.test(data.email)) {\n        showErrorMessage('Please enter a valid email address.');\n        return false;\n    }\n    \n    // Phone validation\n    const phoneRegex = /^[\\d\\s\\-\\+\\(\\)]+$/;\n    if (!phoneRegex.test(data.phone) || data.phone.replace(/\\D/g, '').length < 10) {\n        showErrorMessage('Please enter a valid phone number (at least 10 digits).');\n        return false;\n    }\n    \n    // Date validation\n    const selectedDate = new Date(data.date);\n    const today = new Date();\n    today.setHours(0, 0, 0, 0);\n    \n    if (selectedDate < today) {\n        showErrorMessage('Please select a future date.');\n        return false;\n    }\n    \n    return true;\n}\n\n// Show error message\nfunction showErrorMessage(message) {\n    // Remove existing error message\n    const existingError = document.querySelector('.error-message');\n    if (existingError) {\n        existingError.remove();\n    }\n    \n    // Create and show new error message\n    const errorDiv = document.createElement('div');\n    errorDiv.className = 'error-message';\n    errorDiv.style.cssText = `\n        background: #ff7675;\n        color: white;\n        padding: 15px;\n        border-radius: 8px;\n        margin-bottom: 20px;\n        font-weight: 500;\n        text-align: center;\n    `;\n    errorDiv.textContent = message;\n    \n    const form = document.querySelector('.contact-form');\n    const firstInput = form.querySelector('.input-field');\n    firstInput.parentNode.insertBefore(errorDiv, firstInput);\n    \n    // Scroll to error message\n    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });\n    \n    // Remove error message after 5 seconds\n    setTimeout(() => {\n        if (errorDiv) {\n            errorDiv.remove();\n        }\n    }, 5000);\n}\n\n// Show form submission success message\nfunction showSuccessMessage() {\n    const form = document.querySelector('.contact-form');\n    const originalHTML = form.innerHTML;\n    \n    form.innerHTML = `\n        <div class=\"success-message\" style=\"text-align: center; padding: 50px 30px;\">\n            <div style=\"font-size: 3.5rem; color: #00b894; margin-bottom: 25px;\">✓</div>\n            <h3 style=\"color: #2d3436; margin-bottom: 15px; font-size: 1.8rem;\">Reservation Submitted!</h3>\n            <p style=\"color: #636e72; margin-bottom: 10px; font-size: 1.1rem;\">Thank you for choosing ${document.querySelector('.brand-name').textContent}.</p>\n            <p style=\"color: #636e72; margin-bottom: 30px;\">We'll confirm your reservation within 2 hours during business hours.</p>\n            <button type=\"button\" onclick=\"location.reload()\" style=\"\n                background: #e17055; \n                color: white; \n                padding: 16px 32px; \n                border: none; \n                border-radius: 12px; \n                cursor: pointer; \n                font-weight: 600;\n                font-size: 16px;\n                transition: background 0.3s ease;\n            \" onmouseover=\"this.style.background='#2d3436'\" onmouseout=\"this.style.background='#e17055'\">\n                Make Another Reservation\n            </button>\n        </div>\n    `;\n}\n\n// Intersection Observer for Animation\nfunction initScrollAnimations() {\n    const observerOptions = {\n        threshold: 0.1,\n        rootMargin: '0px 0px -50px 0px'\n    };\n    \n    const observer = new IntersectionObserver((entries) => {\n        entries.forEach(entry => {\n            if (entry.isIntersecting) {\n                entry.target.style.opacity = '1';\n                entry.target.style.transform = 'translateY(0)';\n            }\n        });\n    }, observerOptions);\n    \n    // Observe elements for animation\n    const animateElements = document.querySelectorAll('.menu-card, .feature-item, .info-card, .floating-card');\n    animateElements.forEach(el => {\n        el.style.opacity = '0';\n        el.style.transform = 'translateY(30px)';\n        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';\n        observer.observe(el);\n    });\n}\n\n// Floating cards animation\nfunction initFloatingAnimation() {\n    const floatingCards = document.querySelectorAll('.floating-card');\n    \n    floatingCards.forEach((card, index) => {\n        // Add initial animation delay\n        card.style.animationDelay = `${index * 0.5}s`;\n        \n        // Add floating animation\n        setInterval(() => {\n            card.style.transform = `translateY(${Math.sin(Date.now() * 0.001 + index) * 10}px)`;\n        }, 50);\n    });\n}\n\n// Phone number formatting\nfunction initPhoneFormatting() {\n    const phoneInput = document.querySelector('#phone');\n    if (phoneInput) {\n        phoneInput.addEventListener('input', (e) => {\n            let value = e.target.value.replace(/\\D/g, '');\n            if (value.length >= 6) {\n                value = value.replace(/(\\d{3})(\\d{3})(\\d{4})/, '($1) $2-$3');\n            } else if (value.length >= 3) {\n                value = value.replace(/(\\d{3})(\\d{0,3})/, '($1) $2');\n            }\n            e.target.value = value;\n        });\n    }\n}\n\n// Initialize all functionality when DOM is loaded\ndocument.addEventListener('DOMContentLoaded', () => {\n    initMobileNav();\n    initSmoothScrolling();\n    initHeaderScroll();\n    initMenuFilter();\n    initContactForm();\n    initScrollAnimations();\n    initFloatingAnimation();\n    initPhoneFormatting();\n});\n\n// Add CSS for dynamic effects\nconst style = document.createElement('style');\nstyle.textContent = `\n    .contemporary-header.scrolled {\n        background: rgba(255, 255, 255, 0.98);\n        box-shadow: 0 5px 20px rgba(45, 52, 54, 0.1);\n    }\n    \n    .main-nav.active {\n        position: fixed;\n        top: 80px;\n        left: 0;\n        right: 0;\n        background: rgba(255, 255, 255, 0.98);\n        backdrop-filter: blur(10px);\n        flex-direction: column;\n        padding: 30px;\n        box-shadow: 0 10px 30px rgba(0,0,0,0.1);\n        z-index: 999;\n        gap: 25px;\n    }\n    \n    .menu-toggle.active .toggle-line:nth-child(1) {\n        transform: rotate(45deg) translateY(7px);\n    }\n    \n    .menu-toggle.active .toggle-line:nth-child(2) {\n        opacity: 0;\n    }\n    \n    .menu-toggle.active .toggle-line:nth-child(3) {\n        transform: rotate(-45deg) translateY(-7px);\n    }\n    \n    @media (max-width: 768px) {\n        .main-nav {\n            display: none;\n        }\n        \n        .main-nav.active {\n            display: flex;\n        }\n    }\n    \n    .menu-card {\n        transition: opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;\n    }\n    \n    .floating-card {\n        animation: float 3s ease-in-out infinite;\n    }\n    \n    @keyframes float {\n        0%, 100% {\n            transform: translateY(0px);\n        }\n        50% {\n            transform: translateY(-10px);\n        }\n    }\n`;\ndocument.head.appendChild(style);"}