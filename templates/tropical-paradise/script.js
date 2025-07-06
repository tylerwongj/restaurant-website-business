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

// Tropical animations on scroll
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

// Observe elements for tropical animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature, .menu-item, .cocktail-item, .stat');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const heroImage = document.querySelector('.hero-background img');
    if (heroImage) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Floating elements animation
document.addEventListener('DOMContentLoaded', function() {
    const floatingElements = document.querySelectorAll('.float-element');
    
    floatingElements.forEach((element, index) => {
        // Random floating animation with different speeds
        const speed = 3 + Math.random() * 2; // 3-5 seconds
        element.style.animation = `float ${speed}s ease-in-out infinite`;
        element.style.animationDelay = `${index * 0.5}s`;
    });
});

// Tropical color theme changer
function changeColorTheme(theme) {
    const body = document.body;
    // Remove all existing color classes
    body.classList.remove('color-ocean', 'color-sunset', 'color-forest', 'color-coral', 'color-lagoon');
    
    if (theme !== 'default') {
        body.classList.add(`color-${theme}`);
    }
    
    // Store preference
    localStorage.setItem('tropical-theme', theme);
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('tropical-theme');
    if (savedTheme && savedTheme !== 'default') {
        changeColorTheme(savedTheme);
    }
});

// Contact Form Handling with tropical styling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                partySize: formData.get('party-size'),
                date: formData.get('date'),
                time: formData.get('time'),
                message: formData.get('message')
            };
            
            // Basic validation
            if (!data.name || !data.email || !data.phone || !data.partySize || !data.date || !data.time) {
                showTropicalAlert('Please fill in all required fields.', 'warning');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showTropicalAlert('Please enter a valid email address.', 'warning');
                return;
            }
            
            // Date validation (must be future date)
            const selectedDate = new Date(data.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showTropicalAlert('Please select a future date.', 'warning');
                return;
            }
            
            // Show success message
            showTropicalAlert('🌴 Reservation request sent! We\'ll contact you shortly to confirm your tropical dining experience.', 'success');
            
            // Reset form
            this.reset();
            
            console.log('Tropical reservation submitted:', data);
        });
    }
});

// Tropical themed alert system
function showTropicalAlert(message, type = 'info') {
    const alertContainer = document.createElement('div');
    alertContainer.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        padding: 20px;
        border-radius: 15px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    `;
    
    // Set background based on type
    switch(type) {
        case 'success':
            alertContainer.style.background = 'linear-gradient(135deg, #00b894, #00a085)';
            break;
        case 'warning':
            alertContainer.style.background = 'linear-gradient(135deg, #fd79a8, #e84393)';
            break;
        default:
            alertContainer.style.background = 'linear-gradient(135deg, #74b9ff, #0984e3)';
    }
    
    alertContainer.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.2em;">${type === 'success' ? '🌺' : type === 'warning' ? '🌴' : '🏝️'}</span>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: none; 
                border: none; 
                color: white; 
                font-size: 1.2em; 
                cursor: pointer; 
                margin-left: auto;
                opacity: 0.8;
            ">×</button>
        </div>
    `;
    
    document.body.appendChild(alertContainer);
    
    // Animate in
    setTimeout(() => {
        alertContainer.style.opacity = '1';
        alertContainer.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertContainer.parentElement) {
            alertContainer.style.opacity = '0';
            alertContainer.style.transform = 'translateX(100%)';
            setTimeout(() => alertContainer.remove(), 300);
        }
    }, 5000);
}

// Menu item hover effects with tropical theme
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Cocktail item interactions
document.addEventListener('DOMContentLoaded', function() {
    const cocktailItems = document.querySelectorAll('.cocktail-item');
    
    cocktailItems.forEach(item => {
        item.addEventListener('click', function() {
            const cocktailName = this.querySelector('h3').textContent;
            const price = this.querySelector('.cocktail-price').textContent;
            
            showTropicalAlert(`🍹 ${cocktailName} - ${price} sounds delicious! Ask your server about our daily specials.`, 'info');
        });
    });
});

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        const numericTarget = parseInt(target.replace(/[^\d]/g, ''));
        const hasPlus = target.includes('+');
        
        let current = 0;
        const increment = numericTarget / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                current = numericTarget;
                clearInterval(timer);
            }
            
            const displayValue = Math.floor(current);
            stat.textContent = hasPlus ? displayValue + '+' : displayValue;
        }, 40);
    });
}

// Trigger stats animation when about section is visible
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
}

// Navbar scroll effect with tropical theme
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 184, 148, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 184, 148, 0.1)';
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

// Date and time validation for tropical dining
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.querySelector('input[name="date"]');
    const timeSelect = document.querySelector('select[name="time"]');
    
    if (dateInput) {
        // Set minimum date to today
        const today = new Date();
        const minDate = today.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
        
        // Set maximum date to 3 months from today for seasonal bookings
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
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
                        const optionTime = option.value.split(':');
                        const optionHour = parseInt(optionTime[0]);
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

// Tropical loading animation
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        body.style.opacity = '1';
    }, 100);
});

// Easter egg: konami code for special tropical effect
let konamiCode = [];
const targetCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    if (konamiCode.length > targetCode.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(targetCode)) {
        triggerTropicalCelebration();
        konamiCode = [];
    }
});

function triggerTropicalCelebration() {
    // Create tropical confetti effect
    for (let i = 0; i < 50; i++) {
        setTimeout(() => createTropicalConfetti(), i * 50);
    }
    
    showTropicalAlert('🌺 Welcome to Paradise! You found the secret tropical celebration! 🌴', 'success');
}

function createTropicalConfetti() {
    const confetti = document.createElement('div');
    const emojis = ['🌺', '🌴', '🥥', '🍹', '🦩', '☀️', '🏝️', '🐠'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    confetti.textContent = randomEmoji;
    confetti.style.cssText = `
        position: fixed;
        top: -50px;
        left: ${Math.random() * window.innerWidth}px;
        font-size: ${Math.random() * 20 + 20}px;
        z-index: 10000;
        pointer-events: none;
        animation: tropicalFall ${Math.random() * 2 + 3}s linear forwards;
    `;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 5000);
}

// Add tropical fall animation
const style = document.createElement('style');
style.textContent = `
    @keyframes tropicalFall {
        to {
            transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);