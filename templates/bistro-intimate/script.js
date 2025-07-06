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
                showNotification(`Please fill in all required fields: ${missingFields.join(', ')}`, 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Phone validation
            const phoneRegex = /^[\d\s\(\)\-\+]+$/;
            if (!phoneRegex.test(data.phone)) {
                showNotification('Please enter a valid phone number.', 'error');
                return;
            }

            // Date validation (not in the past)
            const selectedDate = new Date(data.date);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            
            if (selectedDate < currentDate) {
                showNotification('Please select a future date.', 'error');
                return;
            }

            // Success message
            showNotification(`Thank you, ${data.name}! Your reservation request for ${data.guests} guests on ${data.date} at ${data.time} has been submitted. We will contact you shortly to confirm.`, 'success');
            this.reset();
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#e74c3c' : '#27ae60'};
            color: white;
            padding: 1rem 2rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            z-index: 10000;
            max-width: 400px;
            transform: translateX(450px);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Slide in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Slide out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(450px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image img');
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
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
    document.querySelectorAll('.feature, .menu-card, .highlight, .atmosphere-item').forEach(el => {
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

    // Menu card hover effects
    document.querySelectorAll('.menu-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Feature cards interactive effects
    document.querySelectorAll('.feature').forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0ebe6';
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'var(--accent-color)';
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Atmosphere gallery interactions
    document.querySelectorAll('.atmosphere-item').forEach(item => {
        item.addEventListener('click', function() {
            // Create lightbox effect (simple version)
            const img = this.querySelector('img');
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                cursor: pointer;
            `;
            
            const largeImg = document.createElement('img');
            largeImg.src = img.src;
            largeImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-hover);
            `;
            
            overlay.appendChild(largeImg);
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', function() {
                document.body.removeChild(overlay);
            });
        });
    });

    // Form field enhancements
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.boxShadow = 'var(--shadow)';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
            this.parentElement.style.boxShadow = 'none';
        });
    });

    // Dynamic time slot availability
    const timeSelect = document.getElementById('time');
    const dateInput = document.getElementById('date');
    
    if (timeSelect && dateInput) {
        dateInput.addEventListener('change', function() {
            updateTimeSlots(this.value);
        });
    }

    function updateTimeSlots(selectedDate) {
        const date = new Date(selectedDate);
        const dayOfWeek = date.getDay();
        const today = new Date();
        const isToday = date.toDateString() === today.toDateString();
        const currentHour = today.getHours();
        
        // Reset all options
        Array.from(timeSelect.options).forEach(option => {
            if (option.value) {
                option.disabled = false;
                option.textContent = option.value;
            }
        });
        
        // Disable past times if today
        if (isToday) {
            Array.from(timeSelect.options).forEach(option => {
                if (option.value) {
                    const timeHour = parseInt(option.value.split(':')[0]);
                    const isPM = option.value.includes('PM');
                    const hour24 = isPM && timeHour !== 12 ? timeHour + 12 : timeHour;
                    
                    if (hour24 <= currentHour + 1) { // Need at least 1 hour notice
                        option.disabled = true;
                        option.textContent += ' (Too late)';
                    }
                }
            });
        }
        
        // Mock busy times for weekends
        if (dayOfWeek === 6 || dayOfWeek === 0) { // Saturday or Sunday
            const busyTimes = ['7:00 PM', '7:30 PM', '8:00 PM'];
            Array.from(timeSelect.options).forEach(option => {
                if (busyTimes.includes(option.value)) {
                    option.disabled = true;
                    option.textContent = option.value + ' (Fully booked)';
                }
            });
        }
    }

    // Party size recommendations
    const guestsSelect = document.getElementById('guests');
    if (guestsSelect) {
        guestsSelect.addEventListener('change', function() {
            const specialRequestsField = document.getElementById('special-requests');
            if (this.value === '8+' && specialRequestsField) {
                specialRequestsField.placeholder = 'For parties of 8 or more, please call us directly to discuss seating arrangements and menu options.';
                specialRequestsField.style.borderColor = 'var(--secondary-color)';
            } else if (parseInt(this.value) >= 6 && specialRequestsField) {
                specialRequestsField.placeholder = 'For larger parties, please let us know if you have any special seating preferences or dietary requirements.';
            } else if (specialRequestsField) {
                specialRequestsField.placeholder = 'Anniversary dinner, dietary restrictions, seating preferences...';
                specialRequestsField.style.borderColor = 'var(--accent-color)';
            }
        });
    }

    // Social links hover effects
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = 'var(--shadow)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Loading animation for buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            if (this.tagName === 'BUTTON' && this.type === 'submit') {
                this.classList.add('loading');
                this.innerHTML = '⏳ Processing...';
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.innerHTML = 'Request Reservation';
                }, 2000);
            }
        });
    });

    // Current day highlighting in hours
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const hoursItems = document.querySelectorAll('.hours-item');
    hoursItems.forEach(item => {
        const dayElement = item.querySelector('.day');
        if (dayElement && dayElement.textContent === currentDay) {
            item.style.backgroundColor = 'var(--secondary-color)';
            item.style.color = 'white';
            item.style.fontWeight = 'bold';
            item.style.borderRadius = 'var(--border-radius)';
        }
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

    // Scroll progress indicator
    const createScrollIndicator = () => {
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(indicator);
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            indicator.style.width = scrollPercent + '%';
        });
    };

    createScrollIndicator();

    // Welcome section counter animation
    const animateCounters = () => {
        const features = document.querySelectorAll('.feature');
        features.forEach((feature, index) => {
            const delay = index * 200;
            setTimeout(() => {
                feature.style.opacity = '1';
                feature.style.transform = 'translateY(0)';
            }, delay);
        });
    };

    // Trigger counter animation when welcome section is visible
    const welcomeSection = document.querySelector('.welcome');
    if (welcomeSection) {
        const welcomeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    welcomeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        welcomeObserver.observe(welcomeSection);
    }

    // Bistro ambiance sounds toggle (optional feature)
    const createAmbianceToggle = () => {
        const toggle = document.createElement('button');
        toggle.innerHTML = '🔇';
        toggle.title = 'Toggle ambient sounds';
        toggle.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 20px;
            cursor: pointer;
            opacity: 0.7;
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        toggle.addEventListener('mouseenter', () => {
            toggle.style.opacity = '1';
            toggle.style.transform = 'scale(1.1)';
        });
        
        toggle.addEventListener('mouseleave', () => {
            toggle.style.opacity = '0.7';
            toggle.style.transform = 'scale(1)';
        });
        
        // This would integrate with ambient sound functionality if implemented
        toggle.addEventListener('click', () => {
            toggle.innerHTML = toggle.innerHTML === '🔇' ? '🔊' : '🔇';
        });
        
        document.body.appendChild(toggle);
    };

    createAmbianceToggle();

    // Performance optimization: Debounced scroll handler
    let scrollTimeout;
    const debouncedScrollHandler = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Additional scroll-based animations can go here
            const scrolled = window.pageYOffset;
            
            // Parallax for story image
            const storyImage = document.querySelector('.story-image img');
            if (storyImage) {
                storyImage.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        }, 10);
    };

    window.addEventListener('scroll', debouncedScrollHandler);

    // Theme persistence
    const savedTheme = localStorage.getItem('bistroTheme');
    if (savedTheme) {
        document.body.className = savedTheme;
    }

    // Accessibility improvements
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Focus management for mobile menu
    hamburger.addEventListener('click', function() {
        if (navMenu.classList.contains('active')) {
            navMenu.querySelector('a').focus();
        }
    });
});