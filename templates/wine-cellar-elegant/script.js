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

// Smooth Scrolling with elegant timing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Elegant scroll animations
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

// Observe elements for elegant animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.wine-category, .wine-item, .dish-item, .heritage-stat, .cuisine-feature');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s`;
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const heroImage = document.querySelector('.hero-background img');
    if (heroImage) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Wine collection hover effects
document.addEventListener('DOMContentLoaded', function() {
    const wineItems = document.querySelectorAll('.wine-item');
    
    wineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Navbar scroll effect with wine cellar theme
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 15, 15, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(26, 15, 15, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Heritage stats counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const numericTarget = parseInt(target.replace(/[^\d]/g, ''));
        const hasPlus = target.includes('+');
        
        let current = 0;
        const increment = numericTarget / 60;
        
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

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
}

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

// Wine-themed form validation and submission
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
                occasion: formData.get('occasion'),
                requests: formData.get('requests')
            };
            
            // Basic validation
            if (!data.name || !data.email || !data.phone || !data.guests || !data.date || !data.time) {
                showElegantAlert('Please fill in all required fields.', 'warning');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showElegantAlert('Please enter a valid email address.', 'warning');
                return;
            }
            
            // Date validation (must be future date)
            const selectedDate = new Date(data.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showElegantAlert('Please select a future date.', 'warning');
                return;
            }
            
            // Show success message
            showElegantAlert('🍷 Your reservation request has been received. Our sommelier will contact you shortly to confirm your exclusive wine cellar experience.', 'success');
            
            // Reset form
            this.reset();
            
            console.log('Wine cellar reservation submitted:', data);
        });
    }
});

// Elegant alert system for wine cellar theme
function showElegantAlert(message, type = 'info') {
    const alertContainer = document.createElement('div');
    alertContainer.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        padding: 25px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.4s ease;
        box-shadow: 0 12px 40px rgba(0,0,0,0.3);
        border-left: 4px solid;
    `;
    
    // Set styling based on type
    switch(type) {
        case 'success':
            alertContainer.style.background = 'linear-gradient(135deg, #722f37, #4a1e2c)';
            alertContainer.style.borderLeftColor = '#d4af37';
            break;
        case 'warning':
            alertContainer.style.background = 'linear-gradient(135deg, #8b3a42, #722f37)';
            alertContainer.style.borderLeftColor = '#d4af37';
            break;
        default:
            alertContainer.style.background = 'linear-gradient(135deg, #4a1e2c, #722f37)';
            alertContainer.style.borderLeftColor = '#d4af37';
    }
    
    alertContainer.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 15px;">
            <span style="font-size: 1.3em; margin-top: 2px;">${type === 'success' ? '🍷' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
            <div style="flex: 1;">
                <div style="font-size: 1rem; line-height: 1.5;">${message}</div>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: none; 
                border: none; 
                color: rgba(255,255,255,0.8); 
                font-size: 1.5em; 
                cursor: pointer; 
                padding: 0;
                margin-left: 10px;
                transition: color 0.3s ease;
            " onmouseover="this.style.color='#d4af37'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">×</button>
        </div>
    `;
    
    document.body.appendChild(alertContainer);
    
    // Animate in
    setTimeout(() => {
        alertContainer.style.opacity = '1';
        alertContainer.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        if (alertContainer.parentElement) {
            alertContainer.style.opacity = '0';
            alertContainer.style.transform = 'translateX(100%)';
            setTimeout(() => alertContainer.remove(), 400);
        }
    }, 6000);
}

// Wine category interactions
document.addEventListener('DOMContentLoaded', function() {
    const wineCategories = document.querySelectorAll('.wine-category');
    
    wineCategories.forEach(category => {
        category.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            showElegantAlert(`🍷 Interested in our ${categoryName}? Our sommelier would be delighted to arrange a private tasting for you.`, 'info');
        });
    });
});

// Dish pairing highlights
document.addEventListener('DOMContentLoaded', function() {
    const dishItems = document.querySelectorAll('.dish-item');
    
    dishItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const pairing = this.querySelector('.dish-pairing');
            if (pairing) {
                pairing.style.color = '#d4af37';
                pairing.style.fontWeight = '600';
                pairing.style.transition = 'all 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const pairing = this.querySelector('.dish-pairing');
            if (pairing) {
                pairing.style.color = '';
                pairing.style.fontWeight = '';
            }
        });
    });
});

// Form field focus effects with wine cellar styling
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.querySelectorAll('input, select, textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.style.borderColor = '#722f37';
            this.style.boxShadow = '0 0 0 3px rgba(114, 47, 55, 0.15)';
        });
        
        field.addEventListener('blur', function() {
            this.style.borderColor = '#d4af37';
            this.style.boxShadow = 'none';
        });
    });
});

// Date and time validation for wine cellar dining
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
                        const optionTime = option.value.split(':');
                        const optionHour = parseInt(optionTime[0]);
                        option.disabled = optionHour <= currentHour + 1; // Need advance notice
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

// Elegant loading animation
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        body.style.opacity = '1';
    }, 100);
});

// Wine vintage year hover effect
document.addEventListener('DOMContentLoaded', function() {
    const vintageElements = document.querySelectorAll('.wine-vintage');
    
    vintageElements.forEach(vintage => {
        vintage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
            this.style.color = '#b8860b';
        });
        
        vintage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.color = '';
        });
    });
});

// Ornament animations
document.addEventListener('DOMContentLoaded', function() {
    const ornaments = document.querySelectorAll('.section-ornament, .divider-ornament, .footer-ornament');
    
    ornaments.forEach((ornament, index) => {
        ornament.style.opacity = '0';
        ornament.style.transform = 'scale(0.5)';
        ornament.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        
        setTimeout(() => {
            ornament.style.opacity = '1';
            ornament.style.transform = 'scale(1)';
        }, 500 + (index * 200));
    });
});

// Color scheme changer for wine cellar
function changeWineTheme(theme) {
    const body = document.body;
    // Remove all existing color classes
    body.classList.remove('color-classic', 'color-burgundy', 'color-dark-cellar', 'color-vintage', 'color-midnight');
    
    if (theme !== 'default') {
        body.classList.add(`color-${theme}`);
    }
    
    // Store preference
    localStorage.setItem('wine-cellar-theme', theme);
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('wine-cellar-theme');
    if (savedTheme && savedTheme !== 'default') {
        changeWineTheme(savedTheme);
    }
});