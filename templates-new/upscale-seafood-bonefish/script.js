// Upscale Seafood Restaurant Template - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const date = formData.get('date');
            const partySize = formData.get('party-size');
            
            // Basic validation
            if (!name || !email) {
                alert('Please fill in your name and email.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate reservation request
            let message = `Thank you ${name}! Your reservation request has been received.`;
            if (date && partySize) {
                message += ` We will contact you to confirm your table for ${partySize} guest(s) on ${date}.`;
            } else {
                message += ` We will contact you to discuss available dates and times.`;
            }
            
            alert(message);
            this.reset();
        });
    }
    
    // Scroll to Top Button
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = '↑';
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--accent);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollToTop);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTop.style.display = 'block';
        } else {
            scrollToTop.style.display = 'none';
        }
    });
    
    // Scroll to top functionality
    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Fresh Catch Rotation
    const catchItems = document.querySelectorAll('.catch-item');
    let currentCatch = 0;
    
    function rotateCatch() {
        catchItems.forEach((item, index) => {
            item.style.opacity = index === currentCatch ? '1' : '0.7';
            item.style.transform = index === currentCatch ? 'scale(1.05)' : 'scale(1)';
        });
        
        currentCatch = (currentCatch + 1) % catchItems.length;
    }
    
    // Start catch rotation
    if (catchItems.length > 0) {
        setInterval(rotateCatch, 3000);
    }
    
    // Happy Hour Timer
    function updateHappyHourStatus() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        
        const isWeekday = currentDay >= 1 && currentDay <= 5; // Monday to Friday
        const isHappyHourTime = (currentHour === 16 && currentMinute >= 0) || 
                               (currentHour === 17) || 
                               (currentHour === 18 && currentMinute <= 30);
        
        const happyHourSection = document.querySelector('.happy-hour');
        if (happyHourSection && isWeekday && isHappyHourTime) {
            happyHourSection.style.background = 'linear-gradient(135deg, var(--accent) 0%, var(--secondary) 100%)';
            happyHourSection.style.color = 'white';
            
            // Add "LIVE NOW" indicator
            const liveIndicator = document.createElement('div');
            liveIndicator.textContent = '🔴 LIVE NOW';
            liveIndicator.style.cssText = `
                position: absolute;
                top: 20px;
                right: 20px;
                background: red;
                color: white;
                padding: 5px 10px;
                border-radius: 15px;
                font-size: 0.9rem;
                font-weight: bold;
                animation: pulse 2s infinite;
            `;
            
            if (happyHourSection.style.position !== 'relative') {
                happyHourSection.style.position = 'relative';
            }
            
            if (!happyHourSection.querySelector('.live-indicator')) {
                liveIndicator.className = 'live-indicator';
                happyHourSection.appendChild(liveIndicator);
            }
        }
    }
    
    updateHappyHourStatus();
    setInterval(updateHappyHourStatus, 60000); // Check every minute
    
    // Menu Item Hover Effects
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(var(--accent-rgb), 0.1)';
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Card Hover Effects
    const cards = document.querySelectorAll('.feature-card, .catch-item, .wine-card, .location-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
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
    const animatedElements = document.querySelectorAll('.feature-card, .catch-item, .category-card, .wine-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Fresh Catch Button Handler
    const freshCatchBtns = document.querySelectorAll('a[href="#fresh"]');
    
    freshCatchBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const freshSection = document.querySelector('#fresh');
            if (freshSection) {
                freshSection.scrollIntoView({ behavior: 'smooth' });
                
                // Highlight the fresh catch section temporarily
                freshSection.style.backgroundColor = 'rgba(var(--accent-rgb), 0.1)';
                setTimeout(() => {
                    freshSection.style.backgroundColor = '';
                }, 2000);
            }
        });
    });
    
    // Online Ordering Handler
    const orderBtns = document.querySelectorAll('a[href="#order"]');
    
    orderBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            alert('Online ordering coming soon! Please call us at {{PHONE}} to place your order or make a reservation.');
        });
    });
    
    // Date input minimum date (today)
    const dateInput = document.querySelector('#date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        // Set default to next Friday for dinner reservations
        const nextFriday = new Date();
        nextFriday.setDate(nextFriday.getDate() + ((5 - nextFriday.getDay() + 7) % 7 || 7));
        dateInput.value = nextFriday.toISOString().split('T')[0];
    }
    
    // Party size special handling
    const partySizeSelect = document.querySelector('#party-size');
    const messageField = document.querySelector('#message');
    
    if (partySizeSelect && messageField) {
        partySizeSelect.addEventListener('change', function() {
            if (this.value === '7+') {
                messageField.placeholder = 'Please specify exact party size and any special requirements for your large group.';
                messageField.focus();
            } else {
                messageField.placeholder = 'Special occasion, dietary restrictions, etc.';
            }
        });
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
        
        .nav.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            flex-direction: column;
            padding: 1rem;
        }
        
        .nav.active .nav-list {
            flex-direction: column;
            gap: 1rem;
        }
        
        .nav.active .nav-actions {
            flex-direction: column;
            gap: 0.5rem;
            margin-top: 1rem;
        }
        
        .mobile-nav-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .mobile-nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-nav-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        .fresh-banner {
            animation: slideIn 0.5s ease-out;
        }
        
        @keyframes slideIn {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize tooltips for social media links
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    console.log('Upscale Seafood Restaurant Template loaded successfully!');
});