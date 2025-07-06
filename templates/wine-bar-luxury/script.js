document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
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
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Hero Slider (if multiple images are added)
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function showNextSlide() {
        if (heroSlides.length > 1) {
            heroSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }
    }

    // Auto-advance slides every 5 seconds
    setInterval(showNextSlide, 5000);

    // Reservation Form Handling
    const reservationForm = document.querySelector('.reservation-form form');
    if (reservationForm) {
        // Set minimum date to today
        const dateInput = document.getElementById('date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;

        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validation
            const requiredFields = ['name', 'email', 'phone', 'date', 'time', 'guests'];
            const missingFields = requiredFields.filter(field => !data[field]);
            
            if (missingFields.length > 0) {
                alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Phone validation
            const phoneRegex = /^[\d\s\(\)\-\+]+$/;
            if (!phoneRegex.test(data.phone)) {
                alert('Please enter a valid phone number.');
                return;
            }

            // Date validation (not in the past)
            const selectedDate = new Date(data.date);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            
            if (selectedDate < currentDate) {
                alert('Please select a future date.');
                return;
            }

            // Success message
            alert(`Thank you, ${data.name}! Your reservation request for ${data.guests} guests on ${data.date} at ${data.time} has been submitted. We will contact you shortly to confirm.`);
            this.reset();
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSlides = document.querySelectorAll('.hero-slide');
        
        heroSlides.forEach(slide => {
            slide.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.wine-category, .menu-item-elegant, .event-card, .highlight').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });

    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            }
            this.value = value;
        });
    });

    // Wine category hover effects
    document.querySelectorAll('.wine-category').forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #ffffff, #f8f6f3)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.background = 'var(--background-color)';
        });
    });

    // Menu item image hover effects
    document.querySelectorAll('.menu-item-elegant').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const img = this.querySelector('.menu-item-image img');
            img.style.filter = 'brightness(1.1) contrast(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            const img = this.querySelector('.menu-item-image img');
            img.style.filter = 'brightness(1) contrast(1)';
        });
    });

    // Event card hover animations
    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #a01a42, #3d1f14)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
        });
    });

    // Form field focus animations
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });

    // Social links hover effects
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--gold-accent)';
            this.style.color = 'var(--gold-accent)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--primary-color)';
            this.style.color = 'var(--primary-color)';
        });
    });

    // Reservation time slot availability (mock functionality)
    const timeSelect = document.getElementById('time');
    const dateInput = document.getElementById('date');
    
    if (timeSelect && dateInput) {
        dateInput.addEventListener('change', function() {
            // Mock unavailable times for demonstration
            const selectedDate = new Date(this.value);
            const dayOfWeek = selectedDate.getDay();
            
            // Reset all options
            Array.from(timeSelect.options).forEach(option => {
                option.disabled = false;
                option.textContent = option.textContent.replace(' (Unavailable)', '');
            });
            
            // Mock some unavailable times on weekends
            if (dayOfWeek === 6 || dayOfWeek === 0) { // Saturday or Sunday
                const unavailableTimes = ['6:00 PM', '7:00 PM'];
                Array.from(timeSelect.options).forEach(option => {
                    if (unavailableTimes.includes(option.value)) {
                        option.disabled = true;
                        option.textContent += ' (Unavailable)';
                    }
                });
            }
        });
    }

    // Guest count recommendations
    const guestsSelect = document.getElementById('guests');
    if (guestsSelect) {
        guestsSelect.addEventListener('change', function() {
            const specialRequestsField = document.getElementById('special-requests');
            if (this.value === '6' && specialRequestsField) {
                specialRequestsField.placeholder = 'For parties of 6 or more, please let us know if you need a private dining area or have any special arrangements.';
            } else {
                specialRequestsField.placeholder = 'Any special occasions or dietary restrictions?';
            }
        });
    }

    // Loading animation for buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            if (this.tagName === 'BUTTON' && this.type === 'submit') {
                this.style.opacity = '0.8';
                this.innerHTML = 'Processing...';
                setTimeout(() => {
                    this.style.opacity = '1';
                    this.innerHTML = 'Make Reservation';
                }, 2000);
            }
        });
    });

    // Wine education tooltip (if wine terms are present)
    const wineTerms = {
        'tannins': 'Natural compounds that add structure and complexity to wine',
        'terroir': 'The complete natural environment where wine is produced',
        'vintage': 'The year the grapes were harvested',
        'bouquet': 'The complex aromas that develop as wine ages'
    };

    Object.keys(wineTerms).forEach(term => {
        const elements = document.querySelectorAll(`*:contains("${term}")`);
        elements.forEach(el => {
            el.title = wineTerms[term];
            el.style.cursor = 'help';
            el.style.borderBottom = '1px dotted var(--primary-color)';
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
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

    // Theme preference saving
    const savedTheme = localStorage.getItem('wineBarTheme');
    if (savedTheme) {
        document.body.className = savedTheme;
    }

    // Save theme when changed
    const themeButtons = document.querySelectorAll('[data-theme]');
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.dataset.theme;
            document.body.className = theme;
            localStorage.setItem('wineBarTheme', theme);
        });
    });

    // Wine pairing suggestions animation
    document.querySelectorAll('.wine-pairing').forEach(pairing => {
        pairing.addEventListener('mouseenter', function() {
            this.style.color = 'var(--primary-color)';
            this.style.transform = 'scale(1.05)';
        });
        
        pairing.addEventListener('mouseleave', function() {
            this.style.color = 'var(--gold-accent)';
            this.style.transform = 'scale(1)';
        });
    });

    // Hours highlighting (current day)
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const hoursItems = document.querySelectorAll('.hours-item');
    hoursItems.forEach(item => {
        const dayElement = item.querySelector('.day');
        if (dayElement && dayElement.textContent === currentDay) {
            item.style.backgroundColor = 'var(--accent-color)';
            item.style.borderColor = 'var(--primary-color)';
            item.style.fontWeight = 'bold';
        }
    });

    // Scroll to top functionality
    let scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('id', 'scrollToTop');
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});