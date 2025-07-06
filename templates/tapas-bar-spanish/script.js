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

// Smooth Scrolling for Navigation Links
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
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
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
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                partySize: this.querySelector('select').value,
                date: this.querySelector('input[type="date"]').value,
                time: this.querySelectorAll('select')[1].value,
                requests: this.querySelector('textarea').value
            };
            
            // Basic validation
            if (!data.name || !data.email || !data.phone || !data.partySize || !data.date || !data.time) {
                showSpanishNotification('Por favor, complete todos los campos requeridos', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showSpanishNotification('Por favor, ingrese un email válido', 'error');
                return;
            }
            
            // Date validation (not in the past)
            const selectedDate = new Date(data.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showSpanishNotification('La fecha debe ser hoy o en el futuro', 'error');
                return;
            }
            
            // Success message
            showSpanishNotification('¡Gracias! Su reserva ha sido enviada. Le confirmaremos por teléfono.', 'success');
            this.reset();
        });
    }
});

// Spanish Notification System
function showSpanishNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `spanish-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '🎉' : '⚠️'}</span>
            <span class="notification-text">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #c60c30, #ffc400)' : '#ff6b6b'};
        color: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        font-family: 'Open Sans', sans-serif;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 15px;
    `;
    
    notification.querySelector('.notification-icon').style.fontSize = '1.5rem';
    notification.querySelector('.notification-text').style.flex = '1';
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification
    const hideNotification = () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    };
    
    notification.querySelector('.notification-close').addEventListener('click', hideNotification);
    setTimeout(hideNotification, 5000);
}

// Intersection Observer for Animations
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
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.tapas-item, .paella-option, .tradition, .specialty, .drink-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Spanish Elements Animation Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const spanishElements = document.querySelectorAll('.spanish-elements > div');
    spanishElements.forEach((element, index) => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });
});

// Tapas Item Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const tapasItems = document.querySelectorAll('.tapas-item');
    tapasItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
        });
    });
});

// Dynamic Time-based Greeting
function updateSpanishGreeting() {
    const hour = new Date().getHours();
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroSubtitle && heroSubtitle.textContent.includes('{{TAGLINE}}')) {
        let greeting = '';
        if (hour < 12) {
            greeting = '¡Buenos días! ';
        } else if (hour < 18) {
            greeting = '¡Buenas tardes! ';
        } else {
            greeting = '¡Buenas noches! ';
        }
        // This would be replaced during template processing
    }
}

// Phone Number Formatting (Spanish format)
function formatSpanishPhoneNumber(input) {
    const value = input.value.replace(/\D/g, '');
    let formattedValue = value;
    
    if (value.length >= 6) {
        formattedValue = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
    
    input.value = formattedValue;
}

// Apply phone formatting to phone inputs
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', () => formatSpanishPhoneNumber(input));
        input.setAttribute('placeholder', '(555) 123-4567');
    });
});

// Special Spanish Menu Interactions
document.addEventListener('DOMContentLoaded', function() {
    const tempIcons = document.querySelectorAll('.temp-icon');
    tempIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const category = this.closest('.tapas-category');
            const isHot = this.textContent.includes('🔥');
            const message = isHot ? 
                '¡Cuidado! Estos tapas están calientes 🔥' : 
                'Estos tapas se sirven fríos ❄️';
            showSpanishNotification(message, 'success');
        });
    });
});

// Paella Cooking Timer Simulation
document.addEventListener('DOMContentLoaded', function() {
    const cookingBadge = document.querySelector('.cooking-badge');
    if (cookingBadge) {
        cookingBadge.addEventListener('click', function() {
            showSpanishNotification('La paella se cocina fresca para cada mesa. ¡Vale la pena esperar!', 'success');
        });
    }
});

// Lazy Loading for Images
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

// Spanish Color Scheme Switcher
function switchSpanishColorScheme(scheme) {
    const body = document.body;
    // Remove existing color classes
    body.classList.remove('color-classic', 'color-business', 'color-warm', 'color-cool', 'color-bold');
    // Add new color class
    if (scheme !== 'spanish') {
        body.classList.add(`color-${scheme}`);
    }
}

// Flamenco Performance Notification
document.addEventListener('DOMContentLoaded', function() {
    const flamencoBadge = document.querySelector('.flamenco-nights');
    if (flamencoBadge) {
        flamencoBadge.addEventListener('click', function() {
            const today = new Date();
            const dayOfWeek = today.getDay();
            const isFridayOrSaturday = dayOfWeek === 5 || dayOfWeek === 6;
            
            const message = isFridayOrSaturday ? 
                '¡Esta noche hay espectáculo de flamenco a las 8:00 PM! 💃🎸' :
                'Espectáculos de flamenco los viernes y sábados a las 8:00 PM 💃';
            
            showSpanishNotification(message, 'success');
        });
    }
});

// Initialize Spanish greeting
document.addEventListener('DOMContentLoaded', updateSpanishGreeting);