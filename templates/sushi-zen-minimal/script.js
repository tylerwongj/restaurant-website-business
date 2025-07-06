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
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'var(--background-light)';
        navbar.style.backdropFilter = 'none';
    }
});

// Reservation Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.querySelector('.reservation-form form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                guests: formData.get('guests'),
                date: formData.get('date'),
                time: formData.get('time'),
                requests: formData.get('requests')
            };
            
            // Basic validation
            if (!data.name || !data.email || !data.phone || !data.guests || !data.date || !data.time) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Date validation (must be future date)
            const selectedDate = new Date(data.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                alert('Please select a future date.');
                return;
            }
            
            // Show success message with zen aesthetic
            showSuccessMessage();
            
            // Reset form
            this.reset();
            
            console.log('Reservation submitted:', data);
        });
    }
});

// Success message with zen animation
function showSuccessMessage() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const message = document.createElement('div');
    message.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 2px;
        text-align: center;
        max-width: 400px;
        transform: translateY(20px);
        transition: transform 0.3s ease;
    `;
    
    message.innerHTML = `
        <h3 style="margin-bottom: 20px; color: var(--text-dark); font-weight: 400;">Reservation Confirmed</h3>
        <p style="color: var(--text-light); margin-bottom: 30px;">Thank you for choosing our restaurant. We will contact you shortly to confirm your reservation.</p>
        <button onclick="this.parentElement.parentElement.remove()" style="background: var(--primary-color); color: white; border: none; padding: 12px 30px; border-radius: 2px; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; font-size: 14px;">Close</button>
    `;
    
    overlay.appendChild(message);
    document.body.appendChild(overlay);
    
    // Animate in
    setTimeout(() => {
        overlay.style.opacity = '1';
        message.style.transform = 'translateY(0)';
    }, 10);
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (overlay.parentElement) {
            overlay.remove();
        }
    }, 5000);
}

// Animate elements on scroll with zen timing
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for zen-like animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.menu-item, .principle, .achievement');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Menu item hover effects with zen aesthetic
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Form field focus effects
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.querySelectorAll('input, select, textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.style.borderColor = 'var(--accent-color)';
            this.style.boxShadow = '0 0 0 2px rgba(192, 57, 43, 0.1)';
        });
        
        field.addEventListener('blur', function() {
            this.style.borderColor = 'var(--border-color)';
            this.style.boxShadow = 'none';
        });
    });
});

// Date and time validation for reservation
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.querySelector('input[name="date"]');
    const timeSelect = document.querySelector('select[name="time"]');
    
    if (dateInput) {
        // Set minimum date to today
        const today = new Date();
        const minDate = today.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
        
        // Set maximum date to 2 months from today
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 2);
        dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
    }
    
    // Disable past time slots for today
    if (dateInput && timeSelect) {
        dateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const today = new Date();
            
            if (selectedDate.toDateString() === today.toDateString()) {
                const currentHour = today.getHours();
                const options = timeSelect.querySelectorAll('option');
                
                options.forEach(option => {
                    if (option.value) {
                        const optionHour = parseInt(option.value.split(':')[0]);
                        option.disabled = optionHour <= currentHour;
                    }
                });
            } else {
                const options = timeSelect.querySelectorAll('option');
                options.forEach(option => {
                    option.disabled = false;
                });
            }
        });
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Active navigation highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Zen-inspired loading animation
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        body.style.opacity = '1';
    }, 100);
});

// Achievement counter animation with zen timing
function animateCounters() {
    const counters = document.querySelectorAll('.achievement-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const numericTarget = parseInt(target.replace(/[^\d]/g, ''));
        const hasPlus = target.includes('+');
        
        let current = 0;
        const increment = numericTarget / 60; // Slower, more zen-like
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                current = numericTarget;
                clearInterval(timer);
            }
            
            const displayValue = Math.floor(current);
            counter.textContent = hasPlus ? displayValue + '+' : displayValue;
        }, 50);
    });
}

// Trigger counter animation when chef section is visible
const chefSection = document.querySelector('.chef');
if (chefSection) {
    const chefObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                chefObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    chefObserver.observe(chefSection);
}