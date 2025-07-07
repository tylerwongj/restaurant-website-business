// Premium Steakhouse Template - Interactive Features

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
    
    // Reservation Form Handling
    const reservationForm = document.querySelector('.reservation-form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const date = formData.get('date');
            const time = formData.get('time');
            const guests = formData.get('guests');
            
            // Basic validation
            if (!name || !phone || !date || !time || !guests) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Date validation (no past dates)
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                alert('Please select a future date.');
                return;
            }
            
            // Phone validation
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
                alert('Please enter a valid phone number.');
                return;
            }
            
            // Simulate reservation request
            alert(`Thank you ${name}! Your reservation request for ${guests} guest(s) on ${date} at ${time} has been received. We will contact you at ${phone} to confirm.`);
            this.reset();
        });
    }
    
    // Scroll to Top Button
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = '↑';
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: #cd853f;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(205, 133, 63, 0.3);
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
    
    // Hero Parallax Effect
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background img');
    
    if (hero && heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }
    
    // Card Hover Effects
    const cards = document.querySelectorAll('.feature-card, .steak-item, .room-card, .review-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
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
    const animatedElements = document.querySelectorAll('.feature-card, .steak-item, .room-card, .review-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
    
    // Wine Tasting Button Handler
    const wineTastingBtns = document.querySelectorAll('a[href="#reservations"]');
    
    wineTastingBtns.forEach(btn => {
        if (btn.textContent.includes('Wine Tasting')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Pre-fill reservation form for wine tasting
                const specialRequestsField = document.querySelector('#special-requests');
                if (specialRequestsField) {
                    specialRequestsField.value = 'Wine tasting experience';
                }
                
                // Scroll to reservation form
                const reservationForm = document.querySelector('.reservation-form');
                if (reservationForm) {
                    reservationForm.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });
    
    // Private Dining Inquiry Handler
    const privateDiningBtns = document.querySelectorAll('a[href="#contact"]');
    
    privateDiningBtns.forEach(btn => {
        if (btn.textContent.includes('Private Dining')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Pre-fill reservation form for private dining
                const specialRequestsField = document.querySelector('#special-requests');
                if (specialRequestsField) {
                    specialRequestsField.value = 'Private dining inquiry';
                }
                
                // Scroll to reservation form
                const reservationForm = document.querySelector('.reservation-form');
                if (reservationForm) {
                    reservationForm.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });
    
    // Form Field Enhancements
    const formInputs = document.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.style.borderColor = '#cd853f';
            this.style.boxShadow = '0 0 10px rgba(205, 133, 63, 0.2)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = 'none';
        });
    });
    
    // Date input minimum date (today)
    const dateInput = document.querySelector('#date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Reservation time availability
    const timeSelect = document.querySelector('#time');
    const dateSelect = document.querySelector('#date');
    
    if (timeSelect && dateSelect) {
        dateSelect.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const today = new Date();
            const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 6 = Saturday
            
            // Update time options based on day
            const timeOptions = timeSelect.querySelectorAll('option:not([value=""])');
            
            timeOptions.forEach(option => {
                // Weekend dinner service starts later
                if (dayOfWeek === 5 || dayOfWeek === 6) { // Friday or Saturday
                    option.style.display = 'block';
                } else {
                    // Weekday service ends earlier
                    if (option.value === '9:00 PM') {
                        option.style.display = 'none';
                    } else {
                        option.style.display = 'block';
                    }
                }
            });
        });
    }
    
    // Guest count special handling
    const guestSelect = document.querySelector('#guests');
    const specialRequestsField = document.querySelector('#special-requests');
    
    if (guestSelect && specialRequestsField) {
        guestSelect.addEventListener('change', function() {
            if (this.value === '8+') {
                specialRequestsField.placeholder = 'Please specify exact number of guests and any special requirements for your large party.';
                specialRequestsField.focus();
            } else {
                specialRequestsField.placeholder = 'Anniversary, business dinner, dietary restrictions, etc.';
            }
        });
    }
    
    // Add CSS for mobile navigation
    const style = document.createElement('style');
    style.textContent = `
        .nav.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(26, 26, 26, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 2rem;
            border-top: 1px solid rgba(205, 133, 63, 0.3);
        }
        
        .nav.active .nav-list {
            flex-direction: column;
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .nav.active .nav-actions {
            flex-direction: column;
            gap: 1rem;
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
        
        .scroll-to-top:hover {
            background: #b8762d !important;
            transform: translateY(-2px) !important;
        }
    `;
    document.head.appendChild(style);
    
    console.log('Premium Steakhouse Template loaded successfully!');
});