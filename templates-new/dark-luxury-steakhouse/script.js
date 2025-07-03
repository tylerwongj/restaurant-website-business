// Dark Luxury Steakhouse Template - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navCta = document.querySelector('.nav-cta');
    const navbar = document.querySelector('.navbar');
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navCta.classList.toggle('active');
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
                navCta.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.borderBottom = '1px solid rgba(212, 175, 55, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.borderBottom = '1px solid #333333';
        }
    });
    
    // Parallax effect for hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroVideo = document.querySelector('.hero-video');
        
        if (hero && heroVideo && scrolled < hero.offsetHeight) {
            const speed = scrolled * 0.5;
            heroVideo.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Form handling
    const reservationForm = document.querySelector('.reservation-form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Reservation request submitted. We will contact you within 24 hours to confirm.', 'success');
            this.reset();
        });
    }\n    \n    // Intersection Observer for luxury animations\n    const observerOptions = {\n        threshold: 0.1,\n        rootMargin: '0px 0px -50px 0px'\n    };\n    \n    const observer = new IntersectionObserver(function(entries) {\n        entries.forEach(entry => {\n            if (entry.isIntersecting) {\n                entry.target.style.opacity = '1';\n                entry.target.style.transform = 'translateY(0)';\n            }\n        });\n    }, observerOptions);\n    \n    // Animate sections with elegant fade-in\n    const sections = document.querySelectorAll('.experience, .menu-preview, .wine-collection, .private-dining, .awards, .contact');\n    sections.forEach(section => {\n        section.style.opacity = '0';\n        section.style.transform = 'translateY(60px)';\n        section.style.transition = 'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';\n        observer.observe(section);\n    });\n    \n    // Animate award items with staggered timing\n    const awardItems = document.querySelectorAll('.award-item');\n    awardItems.forEach((item, index) => {\n        item.style.opacity = '0';\n        item.style.transform = 'translateY(40px)';\n        item.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;\n        observer.observe(item);\n    });\n    \n    // Animate menu items\n    const menuItems = document.querySelectorAll('.menu-item');\n    menuItems.forEach((item, index) => {\n        item.style.opacity = '0';\n        item.style.transform = 'translateX(-30px)';\n        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;\n        observer.observe(item);\n    });\n    \n    // Wine statistics counter animation\n    const statsObserver = new IntersectionObserver(function(entries) {\n        entries.forEach(entry => {\n            if (entry.isIntersecting) {\n                animateStats();\n                statsObserver.unobserve(entry.target);\n            }\n        });\n    }, { threshold: 0.5 });\n    \n    const wineStats = document.querySelector('.wine-stats');\n    if (wineStats) {\n        statsObserver.observe(wineStats);\n    }\n    \n    // Luxury hover effects for interactive elements\n    const buttons = document.querySelectorAll('.btn');\n    buttons.forEach(button => {\n        button.addEventListener('mouseenter', function() {\n            this.style.transform = 'translateY(-2px)';\n            this.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.3)';\n        });\n        \n        button.addEventListener('mouseleave', function() {\n            this.style.transform = 'translateY(0)';\n            this.style.boxShadow = 'none';\n        });\n    });\n    \n    // Enhanced form interactions\n    const formInputs = document.querySelectorAll('input, textarea, select');\n    formInputs.forEach(input => {\n        input.addEventListener('focus', function() {\n            this.style.borderColor = 'var(--primary-color)';\n            this.style.boxShadow = '0 0 0 2px rgba(212, 175, 55, 0.1)';\n        });\n        \n        input.addEventListener('blur', function() {\n            if (!this.value) {\n                this.style.borderColor = 'var(--border-color)';\n                this.style.boxShadow = 'none';\n            }\n        });\n    });\n    \n    // Date validation - prevent past dates\n    const dateInputs = document.querySelectorAll('input[type=\"date\"]');\n    dateInputs.forEach(input => {\n        const today = new Date().toISOString().split('T')[0];\n        input.setAttribute('min', today);\n    });\n    \n    // Luxury loading animation\n    showLuxuryLoader();\n    \n    // Hide loader after page load\n    window.addEventListener('load', function() {\n        hideLuxuryLoader();\n    });\n});\n\n// Statistics animation\nfunction animateStats() {\n    const statNumbers = document.querySelectorAll('.stat-number');\n    \n    statNumbers.forEach(stat => {\n        const finalValue = parseInt(stat.textContent.replace(/\\D/g, ''));\n        const suffix = stat.textContent.replace(/\\d/g, '');\n        let currentValue = 0;\n        const increment = finalValue / 60; // 60 frames for smooth animation\n        \n        const timer = setInterval(() => {\n            currentValue += increment;\n            if (currentValue >= finalValue) {\n                stat.textContent = finalValue + suffix;\n                clearInterval(timer);\n            } else {\n                stat.textContent = Math.floor(currentValue) + suffix;\n            }\n        }, 33); // ~30fps\n    });\n}\n\n// Notification System\nfunction showNotification(message, type = 'success') {\n    // Remove existing notifications\n    const existingNotifications = document.querySelectorAll('.notification');\n    existingNotifications.forEach(notification => notification.remove());\n    \n    // Create notification element\n    const notification = document.createElement('div');\n    notification.className = `notification notification-${type}`;\n    notification.style.cssText = `\n        position: fixed;\n        top: 100px;\n        right: 30px;\n        background: ${type === 'success' ? 'var(--primary-color)' : '#dc3545'};\n        color: var(--background-primary);\n        padding: 1.5rem 2rem;\n        border-radius: 0;\n        box-shadow: var(--shadow-luxury);\n        z-index: 3000;\n        transform: translateX(400px);\n        transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n        max-width: 400px;\n        font-size: 0.9rem;\n        font-weight: 600;\n        letter-spacing: 0.05em;\n        border-left: 4px solid ${type === 'success' ? 'var(--secondary-color)' : '#a71e2a'};\n    `;\n    \n    notification.textContent = message;\n    document.body.appendChild(notification);\n    \n    // Slide in\n    setTimeout(() => {\n        notification.style.transform = 'translateX(0)';\n    }, 100);\n    \n    // Auto remove after 6 seconds\n    setTimeout(() => {\n        notification.style.transform = 'translateX(400px)';\n        setTimeout(() => {\n            if (notification.parentNode) {\n                notification.parentNode.removeChild(notification);\n            }\n        }, 500);\n    }, 6000);\n}\n\n// Luxury loader\nfunction showLuxuryLoader() {\n    const loader = document.createElement('div');\n    loader.id = 'luxury-loader';\n    loader.innerHTML = `\n        <div class=\"loader-content\">\n            <div class=\"loader-emblem\">\n                <svg width=\"80\" height=\"80\" viewBox=\"0 0 50 50\" fill=\"none\">\n                    <circle cx=\"25\" cy=\"25\" r=\"23\" stroke=\"currentColor\" stroke-width=\"1\" opacity=\"0.3\"/>\n                    <path d=\"M15 25h20M25 15v20\" stroke=\"currentColor\" stroke-width=\"1\"/>\n                    <circle cx=\"25\" cy=\"25\" r=\"8\" stroke=\"currentColor\" stroke-width=\"1\" fill=\"none\"/>\n                </svg>\n            </div>\n            <div class=\"loader-text\">Loading Excellence</div>\n        </div>\n    `;\n    \n    loader.style.cssText = `\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background: var(--background-primary);\n        z-index: 9999;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        transition: opacity 0.8s ease, visibility 0.8s ease;\n    `;\n    \n    const style = document.createElement('style');\n    style.textContent = `\n        .loader-content {\n            text-align: center;\n            color: var(--primary-color);\n        }\n        \n        .loader-emblem {\n            animation: luxuryRotate 3s linear infinite;\n            margin-bottom: 2rem;\n        }\n        \n        .loader-text {\n            font-family: 'Playfair Display', serif;\n            font-size: 1.1rem;\n            letter-spacing: 0.15em;\n            text-transform: uppercase;\n            animation: luxuryPulse 2s ease-in-out infinite;\n        }\n        \n        @keyframes luxuryRotate {\n            from { transform: rotate(0deg); }\n            to { transform: rotate(360deg); }\n        }\n        \n        @keyframes luxuryPulse {\n            0%, 100% { opacity: 0.6; }\n            50% { opacity: 1; }\n        }\n    `;\n    \n    document.head.appendChild(style);\n    document.body.appendChild(loader);\n}\n\nfunction hideLuxuryLoader() {\n    const loader = document.getElementById('luxury-loader');\n    if (loader) {\n        loader.style.opacity = '0';\n        loader.style.visibility = 'hidden';\n        setTimeout(() => {\n            if (loader.parentNode) {\n                loader.parentNode.removeChild(loader);\n            }\n        }, 800);\n    }\n}\n\n// Enhanced scrolling effects\nfunction initLuxuryScrollEffects() {\n    const scrollElements = document.querySelectorAll('.media-grid img, .private-images img');\n    \n    window.addEventListener('scroll', function() {\n        const scrolled = window.pageYOffset;\n        \n        scrollElements.forEach((element, index) => {\n            const elementTop = element.offsetTop;\n            const elementHeight = element.offsetHeight;\n            const windowHeight = window.innerHeight;\n            \n            if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {\n                const progress = (scrolled + windowHeight - elementTop) / (windowHeight + elementHeight);\n                const parallaxSpeed = 0.3 + (index * 0.1);\n                const translateY = (progress - 0.5) * 100 * parallaxSpeed;\n                \n                element.style.transform = `translateY(${translateY}px) scale(1.05)`;\n            }\n        });\n    });\n}\n\n// Initialize luxury scroll effects\ninitLuxuryScrollEffects();\n\n// Mobile menu styles\nconst mobileMenuStyles = `\n    @media (max-width: 768px) {\n        .nav-menu.active,\n        .nav-cta.active {\n            display: flex;\n            position: fixed;\n            top: 100px;\n            left: 0;\n            right: 0;\n            background: rgba(10, 10, 10, 0.98);\n            backdrop-filter: blur(20px);\n            flex-direction: column;\n            padding: 3rem 2rem;\n            z-index: 999;\n            border-bottom: 1px solid var(--border-color);\n        }\n        \n        .nav-menu.active {\n            gap: 2rem;\n        }\n        \n        .nav-cta.active {\n            padding-top: 2rem;\n            border-top: 1px solid var(--border-color);\n        }\n        \n        .hamburger.active span:nth-child(1) {\n            transform: rotate(45deg) translate(5px, 5px);\n        }\n        \n        .hamburger.active span:nth-child(2) {\n            opacity: 0;\n        }\n        \n        .hamburger.active span:nth-child(3) {\n            transform: rotate(-45deg) translate(7px, -6px);\n        }\n        \n        body.menu-open {\n            overflow: hidden;\n        }\n    }\n`;\n\n// Inject mobile menu styles\nconst style = document.createElement('style');\nstyle.textContent = mobileMenuStyles;\ndocument.head.appendChild(style);"