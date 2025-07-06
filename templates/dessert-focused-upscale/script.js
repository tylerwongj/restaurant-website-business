// Dessert-Focused Upscale Template - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');
    const navbar = document.querySelector('.navbar');
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navActions.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                navActions.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            navbar.style.background = 'rgba(254, 254, 254, 0.98)';
            navbar.style.borderBottom = '1px solid rgba(218, 165, 32, 0.3)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(254, 254, 254, 0.95)';
            navbar.style.borderBottom = '1px solid #e5d5c3';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Form handling
    const reservationForm = document.querySelector('.reservation-form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Reservation request submitted! We will contact you within 2 hours to confirm.', 'success');
            this.reset();
        });
    }
    
    // Dessert cart functionality (simple demo)
    let dessertCart = [];\n    let cartTotal = 0;\n    \n    // Intersection Observer for elegant animations\n    const observerOptions = {\n        threshold: 0.15,\n        rootMargin: '0px 0px -50px 0px'\n    };\n    \n    const observer = new IntersectionObserver(function(entries) {\n        entries.forEach(entry => {\n            if (entry.isIntersecting) {\n                entry.target.style.opacity = '1';\n                entry.target.style.transform = 'translateY(0)';\n            }\n        });\n    }, observerOptions);\n    \n    // Animate sections with elegant fade-in\n    const sections = document.querySelectorAll('.signature-desserts, .menu-categories, .about, .catering, .contact');\n    sections.forEach(section => {\n        section.style.opacity = '0';\n        section.style.transform = 'translateY(50px)';\n        section.style.transition = 'opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';\n        observer.observe(section);\n    });\n    \n    // Animate dessert cards with staggered timing\n    const dessertCards = document.querySelectorAll('.dessert-card');\n    dessertCards.forEach((card, index) => {\n        card.style.opacity = '0';\n        card.style.transform = 'translateY(40px) scale(0.95)';\n        card.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;\n        observer.observe(card);\n    });\n    \n    // Animate category cards\n    const categoryCards = document.querySelectorAll('.category-card');\n    categoryCards.forEach((card, index) => {\n        card.style.opacity = '0';\n        card.style.transform = 'translateY(30px)';\n        card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;\n        observer.observe(card);\n    });\n    \n    // Statistics counter animation\n    const statsObserver = new IntersectionObserver(function(entries) {\n        entries.forEach(entry => {\n            if (entry.isIntersecting) {\n                animateStats();\n                statsObserver.unobserve(entry.target);\n            }\n        });\n    }, { threshold: 0.5 });\n    \n    const aboutStats = document.querySelector('.about-stats');\n    if (aboutStats) {\n        statsObserver.observe(aboutStats);\n    }\n    \n    // Enhanced hover effects for dessert cards\n    dessertCards.forEach(card => {\n        card.addEventListener('mouseenter', function() {\n            this.style.transform = 'translateY(-12px) scale(1.02)';\n            this.style.boxShadow = '0 15px 40px rgba(139, 69, 19, 0.25)';\n        });\n        \n        card.addEventListener('mouseleave', function() {\n            this.style.transform = 'translateY(0) scale(1)';\n            this.style.boxShadow = '0 8px 32px rgba(139, 69, 19, 0.15)';\n        });\n    });\n    \n    // Parallax effect for showcase images\n    window.addEventListener('scroll', function() {\n        const scrolled = window.pageYOffset;\n        const showcaseItems = document.querySelectorAll('.showcase-item img');\n        \n        showcaseItems.forEach((img, index) => {\n            const speed = 0.3 + (index * 0.1);\n            const yPos = scrolled * speed;\n            img.style.transform = `translateY(${yPos}px)`;\n        });\n    });\n    \n    // Enhanced form interactions\n    const formInputs = document.querySelectorAll('input, textarea, select');\n    formInputs.forEach(input => {\n        input.addEventListener('focus', function() {\n            this.style.borderColor = 'var(--secondary-color)';\n            this.style.boxShadow = '0 0 0 3px rgba(218, 165, 32, 0.1)';\n            this.style.transform = 'translateY(-2px)';\n        });\n        \n        input.addEventListener('blur', function() {\n            if (!this.value) {\n                this.style.borderColor = 'var(--border-color)';\n                this.style.boxShadow = 'none';\n                this.style.transform = 'translateY(0)';\n            }\n        });\n    });\n    \n    // Date validation - prevent past dates\n    const dateInputs = document.querySelectorAll('input[type=\"date\"]');\n    dateInputs.forEach(input => {\n        const today = new Date().toISOString().split('T')[0];\n        input.setAttribute('min', today);\n    });\n    \n    // Special dessert showcase rotation\n    rotateDessertShowcase();\n});\n\n// Dessert cart functionality\nfunction addDessertToCart(dessertName, dessertPrice) {\n    const price = parseFloat(dessertPrice.replace(/[^0-9.]/g, ''));\n    dessertCart.push({ name: dessertName, price: price });\n    cartTotal += price;\n    \n    showNotification(`${dessertName} added to your order! 🍰`, 'success');\n    \n    // Add sweet animation effect\n    const button = event.target;\n    button.style.transform = 'scale(0.9)';\n    button.innerHTML = 'Added! ✓';\n    \n    setTimeout(() => {\n        button.style.transform = 'scale(1)';\n        button.innerHTML = 'Order Now';\n    }, 1500);\n    \n    // Update cart display if exists\n    updateCartDisplay();\n}\n\nfunction updateCartDisplay() {\n    // This would update a cart widget if one existed\n    console.log('Cart:', dessertCart);\n    console.log('Total:', cartTotal.toFixed(2));\n}\n\n// Statistics animation\nfunction animateStats() {\n    const statNumbers = document.querySelectorAll('.stat-number');\n    \n    statNumbers.forEach(stat => {\n        const finalValue = parseInt(stat.textContent.replace(/\\D/g, ''));\n        const suffix = stat.textContent.replace(/\\d/g, '');\n        let currentValue = 0;\n        const increment = finalValue / 50; // 50 frames for smooth animation\n        \n        const timer = setInterval(() => {\n            currentValue += increment;\n            if (currentValue >= finalValue) {\n                stat.textContent = finalValue + suffix;\n                clearInterval(timer);\n            } else {\n                stat.textContent = Math.floor(currentValue) + suffix;\n            }\n        }, 40); // ~25fps\n    });\n}\n\n// Dessert showcase rotation\nfunction rotateDessertShowcase() {\n    const showcaseItems = document.querySelectorAll('.showcase-item');\n    let currentIndex = 0;\n    \n    setInterval(() => {\n        showcaseItems.forEach((item, index) => {\n            if (index === currentIndex) {\n                item.style.transform = 'scale(1.05)';\n                item.style.zIndex = '10';\n            } else {\n                item.style.transform = 'scale(1)';\n                item.style.zIndex = '1';\n            }\n        });\n        \n        currentIndex = (currentIndex + 1) % showcaseItems.length;\n    }, 4000); // Rotate every 4 seconds\n}\n\n// Notification System\nfunction showNotification(message, type = 'success') {\n    // Remove existing notifications\n    const existingNotifications = document.querySelectorAll('.notification');\n    existingNotifications.forEach(notification => notification.remove());\n    \n    // Create notification element\n    const notification = document.createElement('div');\n    notification.className = `notification notification-${type}`;\n    notification.style.cssText = `\n        position: fixed;\n        top: 100px;\n        right: 30px;\n        background: ${type === 'success' ? 'var(--secondary-color)' : '#dc3545'};\n        color: ${type === 'success' ? 'var(--text-primary)' : 'white'};\n        padding: 1.25rem 2rem;\n        border-radius: 25px;\n        box-shadow: var(--shadow-elegant);\n        z-index: 3000;\n        transform: translateX(400px);\n        transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n        max-width: 350px;\n        font-size: 0.95rem;\n        font-weight: 500;\n        line-height: 1.4;\n        border: 2px solid ${type === 'success' ? 'var(--primary-color)' : '#a71e2a'};\n    `;\n    \n    notification.textContent = message;\n    document.body.appendChild(notification);\n    \n    // Slide in\n    setTimeout(() => {\n        notification.style.transform = 'translateX(0)';\n    }, 100);\n    \n    // Auto remove after 5 seconds\n    setTimeout(() => {\n        notification.style.transform = 'translateX(400px)';\n        setTimeout(() => {\n            if (notification.parentNode) {\n                notification.parentNode.removeChild(notification);\n            }\n        }, 400);\n    }, 5000);\n}\n\n// Sweet loading animation for dessert images\nfunction initSweetImageLoading() {\n    const dessertImages = document.querySelectorAll('.dessert-image img');\n    \n    dessertImages.forEach(img => {\n        img.style.opacity = '0';\n        img.style.transform = 'scale(1.1)';\n        \n        img.addEventListener('load', function() {\n            this.style.transition = 'opacity 0.6s ease, transform 0.6s ease';\n            this.style.opacity = '1';\n            this.style.transform = 'scale(1)';\n        });\n    });\n}\n\n// Initialize sweet image loading\ninitSweetImageLoading();\n\n// Enhanced button interactions\nconst buttons = document.querySelectorAll('.btn');\nbuttons.forEach(button => {\n    button.addEventListener('mouseenter', function() {\n        if (!this.classList.contains('btn-dessert')) {\n            this.style.transform = 'translateY(-3px)';\n        }\n    });\n    \n    button.addEventListener('mouseleave', function() {\n        if (!this.classList.contains('btn-dessert')) {\n            this.style.transform = 'translateY(0)';\n        }\n    });\n});\n\n// Mobile menu styles\nconst mobileMenuStyles = `\n    @media (max-width: 768px) {\n        .nav-menu.active,\n        .nav-actions.active {\n            display: flex;\n            position: fixed;\n            top: 80px;\n            left: 0;\n            right: 0;\n            background: rgba(254, 254, 254, 0.98);\n            backdrop-filter: blur(15px);\n            flex-direction: column;\n            padding: 2.5rem 2rem;\n            z-index: 999;\n            border-bottom: 1px solid var(--border-color);\n        }\n        \n        .nav-menu.active {\n            gap: 2rem;\n        }\n        \n        .nav-actions.active {\n            gap: 1.5rem;\n            padding-top: 2rem;\n            border-top: 1px solid var(--border-light);\n        }\n        \n        .hamburger.active span:nth-child(1) {\n            transform: rotate(45deg) translate(5px, 5px);\n        }\n        \n        .hamburger.active span:nth-child(2) {\n            opacity: 0;\n        }\n        \n        .hamburger.active span:nth-child(3) {\n            transform: rotate(-45deg) translate(7px, -6px);\n        }\n        \n        body.menu-open {\n            overflow: hidden;\n        }\n    }\n`;\n\n// Inject mobile menu styles\nconst style = document.createElement('style');\nstyle.textContent = mobileMenuStyles;\ndocument.head.appendChild(style);"