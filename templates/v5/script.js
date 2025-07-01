// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    }
});

// Reservation Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.querySelector('.reservation-form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                party_size: formData.get('party_size'),
                date: formData.get('date'),
                time: formData.get('time'),
                special_requests: formData.get('special_requests')
            };
            
            // Basic validation
            if (!data.name || !data.email || !data.phone || !data.party_size || !data.date || !data.time) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Date validation (must be in the future)
            const selectedDate = new Date(data.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                alert('Please select a future date for your reservation.');
                return;
            }
            
            // Show success message
            alert('Thank you for your reservation request! We will contact you within 24 hours to confirm your booking.');
            this.reset();
            
            // In real implementation, send to server:
            // fetch('/reservations', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });
        });
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const heroBackground = document.querySelector('.hero-background img');
    if (heroBackground) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
});

// Animate elements on scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animation for features
                if (entry.target.classList.contains('feature')) {
                    const icon = entry.target.querySelector('.feature-icon');
                    if (icon) {
                        setTimeout(() => {
                            icon.style.transform = 'scale(1.1)';
                            setTimeout(() => {
                                icon.style.transform = 'scale(1)';
                            }, 200);
                        }, 300);
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.feature, .menu-category, .gallery-main, .gallery-grid img');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Phone number formatting
function formatPhoneNumber(input) {
    const value = input.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    input.value = formattedValue;
}

// Apply phone formatting to phone inputs
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', () => formatPhoneNumber(input));
    });
});

// Date input minimum date (today)
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }
});

// Elegant hover effects for menu items
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});

// Color scheme switcher (for testing different color schemes)
function switchColorScheme(scheme) {
    const body = document.body;
    // Remove existing color classes
    body.classList.remove('color-classic', 'color-business', 'color-cool', 'color-bold');
    // Add new color class
    if (scheme !== 'gold') {
        body.classList.add(`color-${scheme}`);
    }
}

// Reservation time validation based on day
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.querySelector('input[name="date"]');
    const timeSelect = document.querySelector('select[name="time"]');
    
    if (dateInput && timeSelect) {
        dateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const dayOfWeek = selectedDate.getDay();
            
            // Clear current options
            timeSelect.innerHTML = '<option value="">Preferred Time</option>';
            
            // Add appropriate time slots based on day
            let timeSlots = [];
            
            if (dayOfWeek >= 2 && dayOfWeek <= 4) { // Tuesday-Thursday
                timeSlots = ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'];
            } else if (dayOfWeek === 5 || dayOfWeek === 6) { // Friday-Saturday
                timeSlots = ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];
            } else if (dayOfWeek === 0) { // Sunday
                timeSlots = ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00'];
            } else { // Monday (closed)
                timeSlots = [];
                alert('We are closed on Mondays. Please select another day.');
                this.value = '';
                return;
            }
            
            // Add time slots to select
            timeSlots.forEach(time => {
                const option = document.createElement('option');
                option.value = time;
                const hour = parseInt(time.split(':')[0]);
                const minute = time.split(':')[1];
                const displayHour = hour > 12 ? hour - 12 : hour;
                const ampm = hour >= 12 ? 'PM' : 'AM';
                option.textContent = `${displayHour}:${minute} ${ampm}`;
                timeSelect.appendChild(option);
            });
        });
    }
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        // Observe all images with data-src attribute
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => imageObserver.observe(img));
    }
});