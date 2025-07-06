// Italian Trattoria Template JavaScript

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navActions = document.querySelector('.nav-actions');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navActions.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navActions.classList.remove('active');
    });
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

// Enhanced hover effects for cards
document.querySelectorAll('.dish-card, .category-card, .catering-option, .location-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    });
});

// Reservation form handling
const reservationForm = document.querySelector('.contact-form form');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        const requiredFields = ['name', 'email', 'phone', 'party_size', 'date', 'time', 'location'];
        const missingFields = requiredFields.filter(field => !data[field]);
        
        if (missingFields.length > 0) {
            showNotification('Please fill in all required fields', 'warning');
            return;
        }
        
        // Validate date is not in the past
        const selectedDate = new Date(data.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showNotification('Please select a future date', 'warning');
            return;
        }
        
        // Here you would typically send the data to your server
        console.log('Reservation data:', data);
        
        // Show success message
        showNotification('Reservation request submitted! We will contact you within 24 hours to confirm.', 'success');
        
        // Reset form
        this.reset();
    });
}\n\n// Set minimum date for reservation to today\nconst dateInput = document.querySelector('input[type=\"date\"]');\nif (dateInput) {\n    const today = new Date().toISOString().split('T')[0];\n    dateInput.setAttribute('min', today);\n}\n\n// Dynamic time slot management based on date\nconst timeSelect = document.querySelector('select[name=\"time\"]');\nif (dateInput && timeSelect) {\n    dateInput.addEventListener('change', function() {\n        const selectedDate = new Date(this.value);\n        const today = new Date();\n        const currentHour = today.getHours();\n        \n        // If today is selected, disable past time slots\n        if (selectedDate.toDateString() === today.toDateString()) {\n            Array.from(timeSelect.options).forEach(option => {\n                if (option.value) {\n                    const timeHour = parseInt(option.value.split(':')[0]);\n                    const timeMinutes = parseInt(option.value.split(':')[1] || 0);\n                    const totalMinutes = timeHour * 60 + timeMinutes;\n                    const currentTotalMinutes = currentHour * 60 + today.getMinutes();\n                    \n                    option.disabled = totalMinutes <= currentTotalMinutes;\n                }\n            });\n        } else {\n            // Enable all time slots for future dates\n            Array.from(timeSelect.options).forEach(option => {\n                option.disabled = false;\n            });\n        }\n    });\n}\n\n// Offers banner dismiss functionality\nconst offersBanner = document.querySelector('.offers-banner');\nif (offersBanner) {\n    const closeBtn = document.createElement('button');\n    closeBtn.innerHTML = '&times;';\n    closeBtn.style.cssText = `\n        position: absolute;\n        right: 20px;\n        top: 50%;\n        transform: translateY(-50%);\n        background: none;\n        border: none;\n        color: white;\n        font-size: 1.5rem;\n        cursor: pointer;\n        padding: 0;\n        width: 30px;\n        height: 30px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    `;\n    \n    offersBanner.style.position = 'relative';\n    offersBanner.appendChild(closeBtn);\n    \n    closeBtn.addEventListener('click', () => {\n        offersBanner.style.display = 'none';\n        localStorage.setItem('offersBannerDismissed', 'true');\n    });\n    \n    // Check if user previously dismissed banner\n    if (localStorage.getItem('offersBannerDismissed') === 'true') {\n        offersBanner.style.display = 'none';\n    }\n}\n\n// Notification system\nfunction showNotification(message, type = 'info') {\n    // Remove existing notifications\n    const existingNotifications = document.querySelectorAll('.notification');\n    existingNotifications.forEach(notification => notification.remove());\n    \n    // Create notification element\n    const notification = document.createElement('div');\n    notification.className = `notification notification-${type}`;\n    notification.innerHTML = `\n        <span>${message}</span>\n        <button class=\"notification-close\">&times;</button>\n    `;\n    \n    // Style based on type\n    const colors = {\n        success: '#2d5016',\n        warning: '#d4af37',\n        info: '#8b1538',\n        error: '#8b1538'\n    };\n    \n    // Add styles\n    notification.style.cssText = `\n        position: fixed;\n        top: 20px;\n        right: 20px;\n        background: ${colors[type] || colors.info};\n        color: white;\n        padding: 1rem 2rem;\n        border-radius: 8px;\n        box-shadow: 0 4px 15px rgba(0,0,0,0.2);\n        z-index: 10000;\n        display: flex;\n        align-items: center;\n        gap: 1rem;\n        animation: slideInRight 0.3s ease;\n        max-width: 350px;\n    `;\n    \n    // Add close functionality\n    const closeBtn = notification.querySelector('.notification-close');\n    closeBtn.style.cssText = `\n        background: none;\n        border: none;\n        color: white;\n        font-size: 1.5rem;\n        cursor: pointer;\n        padding: 0;\n        margin: 0;\n    `;\n    \n    closeBtn.addEventListener('click', () => {\n        notification.style.animation = 'slideOutRight 0.3s ease';\n        setTimeout(() => notification.remove(), 300);\n    });\n    \n    // Add to page\n    document.body.appendChild(notification);\n    \n    // Auto remove after 5 seconds\n    setTimeout(() => {\n        if (notification.parentNode) {\n            notification.style.animation = 'slideOutRight 0.3s ease';\n            setTimeout(() => notification.remove(), 300);\n        }\n    }, 5000);\n}\n\n// Enhanced mobile navigation styles\nconst style = document.createElement('style');\nstyle.textContent = `\n    @keyframes slideInRight {\n        from {\n            transform: translateX(100%);\n            opacity: 0;\n        }\n        to {\n            transform: translateX(0);\n            opacity: 1;\n        }\n    }\n    \n    @keyframes slideOutRight {\n        from {\n            transform: translateX(0);\n            opacity: 1;\n        }\n        to {\n            transform: translateX(100%);\n            opacity: 0;\n        }\n    }\n    \n    .nav-menu.active,\n    .nav-actions.active {\n        display: flex !important;\n        position: absolute;\n        top: 100%;\n        left: 0;\n        width: 100%;\n        background: white;\n        flex-direction: column;\n        padding: 2rem;\n        box-shadow: 0 4px 15px rgba(0,0,0,0.1);\n        z-index: 999;\n    }\n    \n    .nav-actions.active {\n        border-top: 1px solid var(--border-color);\n        padding-top: 1rem;\n    }\n    \n    .hamburger.active span:nth-child(1) {\n        transform: rotate(-45deg) translate(-5px, 6px);\n    }\n    \n    .hamburger.active span:nth-child(2) {\n        opacity: 0;\n    }\n    \n    .hamburger.active span:nth-child(3) {\n        transform: rotate(45deg) translate(-5px, -6px);\n    }\n    \n    @media (max-width: 768px) {\n        .nav-menu,\n        .nav-actions {\n            display: none;\n        }\n    }\n`;\ndocument.head.appendChild(style);\n\n// Intersection Observer for scroll animations\nconst observerOptions = {\n    threshold: 0.1,\n    rootMargin: '0px 0px -50px 0px'\n};\n\nconst observer = new IntersectionObserver((entries) => {\n    entries.forEach(entry => {\n        if (entry.isIntersecting) {\n            entry.target.style.opacity = '1';\n            entry.target.style.transform = 'translateY(0)';\n        }\n    });\n}, observerOptions);\n\n// Observe sections for scroll animations\ndocument.addEventListener('DOMContentLoaded', () => {\n    const sections = document.querySelectorAll('section');\n    sections.forEach(section => {\n        section.style.opacity = '0';\n        section.style.transform = 'translateY(30px)';\n        section.style.transition = 'all 0.6s ease';\n        observer.observe(section);\n    });\n});\n\n// Wine pairing suggestions (interactive feature)\nfunction showWinePairing(dishName) {\n    const pairings = {\n        'Osso Buco': 'Barolo or Chianti Classico',\n        'Seafood Risotto': 'Pinot Grigio or Soave',\n        'Chicken Parmigiana': 'Sangiovese or Montepulciano',\n        'Fettuccine Alfredo': 'Chardonnay or Frascati'\n    };\n    \n    const pairing = pairings[dishName] || 'Ask our sommelier for recommendations';\n    showNotification(`Wine pairing for ${dishName}: ${pairing}`, 'info');\n}\n\n// Add wine pairing buttons to signature dishes\ndocument.addEventListener('DOMContentLoaded', () => {\n    const dishCards = document.querySelectorAll('.dish-card');\n    dishCards.forEach(card => {\n        const dishName = card.querySelector('h3')?.textContent;\n        if (dishName) {\n            const wineBtn = document.createElement('button');\n            wineBtn.textContent = '🍷 Wine Pairing';\n            wineBtn.className = 'wine-pairing-btn';\n            wineBtn.style.cssText = `\n                background: var(--accent-color);\n                color: var(--text-dark);\n                border: none;\n                padding: 8px 12px;\n                border-radius: 15px;\n                font-size: 0.8rem;\n                cursor: pointer;\n                margin-top: 0.5rem;\n                transition: all 0.3s ease;\n            `;\n            \n            wineBtn.addEventListener('click', () => {\n                showWinePairing(dishName);\n            });\n            \n            wineBtn.addEventListener('mouseenter', () => {\n                wineBtn.style.background = 'var(--primary-color)';\n                wineBtn.style.color = 'white';\n            });\n            \n            wineBtn.addEventListener('mouseleave', () => {\n                wineBtn.style.background = 'var(--accent-color)';\n                wineBtn.style.color = 'var(--text-dark)';\n            });\n            \n            const dishContent = card.querySelector('.dish-content');\n            if (dishContent) {\n                dishContent.appendChild(wineBtn);\n            }\n        }\n    });\n});\n\n// Party size recommendations\nconst partySizeSelect = document.querySelector('select[name=\"party_size\"]');\nif (partySizeSelect) {\n    partySizeSelect.addEventListener('change', function() {\n        const partySize = parseInt(this.value);\n        let recommendation = '';\n        \n        if (partySize >= 7) {\n            recommendation = 'For large parties, we recommend our private dining room. We\\'ll contact you about availability.';\n        } else if (partySize >= 5) {\n            recommendation = 'Perfect for our family-style sharing menu! Ask about our group dining options.';\n        } else if (partySize === 2) {\n            recommendation = 'Romantic dinner for two? Ask about our wine pairing menu.';\n        }\n        \n        if (recommendation) {\n            setTimeout(() => {\n                showNotification(recommendation, 'info');\n            }, 500);\n        }\n    });\n}\n\n// Accessibility improvements\nfunction enhanceAccessibility() {\n    // Add keyboard navigation for interactive elements\n    document.querySelectorAll('.dish-card, .category-card, .catering-option').forEach(element => {\n        element.setAttribute('tabindex', '0');\n        element.setAttribute('role', 'button');\n        \n        element.addEventListener('keydown', function(e) {\n            if (e.key === 'Enter' || e.key === ' ') {\n                e.preventDefault();\n                this.click();\n            }\n        });\n    });\n    \n    // Add aria-labels for better screen reader support\n    document.querySelectorAll('.btn').forEach(btn => {\n        if (!btn.getAttribute('aria-label')) {\n            btn.setAttribute('aria-label', btn.textContent.trim());\n        }\n    });\n}\n\n// Initialize accessibility enhancements\ndocument.addEventListener('DOMContentLoaded', enhanceAccessibility);\n\n// Lazy loading for images\nfunction lazyLoadImages() {\n    const images = document.querySelectorAll('img[data-src]');\n    const imageObserver = new IntersectionObserver((entries) => {\n        entries.forEach(entry => {\n            if (entry.isIntersecting) {\n                const img = entry.target;\n                img.src = img.dataset.src;\n                img.removeAttribute('data-src');\n                imageObserver.unobserve(img);\n            }\n        });\n    });\n    \n    images.forEach(img => imageObserver.observe(img));\n}\n\n// Initialize lazy loading\ndocument.addEventListener('DOMContentLoaded', lazyLoadImages);"