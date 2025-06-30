// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(44, 44, 44, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--background-dark)';
        navbar.style.backdropFilter = 'none';
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#e74c3c';
            } else {
                field.style.borderColor = 'var(--border-color)';
            }
        });
        
        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Thank you for your reservation! We will contact you soon to confirm your table at our premium steakhouse.');
            this.reset();
        } else {
            alert('Please fill out all required fields.');
        }
    });
}

// Steak temperature selector (interactive)
function createTemperatureSelector() {
    const tempOptions = document.querySelectorAll('.temp-option');
    
    tempOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            tempOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Store preference (could be used for form defaults)
            localStorage.setItem('preferredTemperature', this.querySelector('.temp-name').textContent);
            
            // Visual feedback
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// Cut item hover effects with sizzle sound simulation
function enhanceCutItems() {
    const cutItems = document.querySelectorAll('.cut-item');
    
    cutItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px var(--shadow-dark)';
            
            // Add sizzle effect to image
            const image = this.querySelector('img');
            if (image) {
                image.style.filter = 'brightness(1.1) contrast(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const isFeature = this.classList.contains('featured');
            this.style.transform = isFeature ? 'translateY(0) scale(1.02)' : 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px var(--shadow-medium)';
            
            const image = this.querySelector('img');
            if (image) {
                image.style.filter = 'brightness(1) contrast(1)';
            }
        });
    });
}

// Fire animation enhancement
function enhanceFireEffects() {
    const fireElements = document.querySelectorAll('.fire-element');
    
    fireElements.forEach((element, index) => {
        // Add random intensity changes
        setInterval(() => {
            const randomScale = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
            element.style.transform = `scale(${randomScale})`;
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 300);
        }, 3000 + index * 1000);
    });
}

// Premium experience enhancements
function addPremiumTouches() {
    // Add dynamic pricing (mock functionality)
    const cutPrices = document.querySelectorAll('.cut-price');
    cutPrices.forEach(price => {
        const originalPrice = parseInt(price.textContent.replace('$', ''));
        
        // Add subtle price animations on hover
        price.parentElement.addEventListener('mouseenter', function() {
            price.style.color = 'var(--accent-color)';
            price.style.transform = 'scale(1.1)';
        });
        
        price.parentElement.addEventListener('mouseleave', function() {
            price.style.color = 'var(--primary-color)';
            price.style.transform = 'scale(1)';
        });
    });
    
    // Add reservation time validation
    const timeSelect = document.querySelector('select[required]:last-of-type');
    if (timeSelect) {
        timeSelect.addEventListener('change', function() {
            const selectedTime = this.value;
            const form = this.closest('form');
            
            // Mock busy times
            const busyTimes = ['7:00', '7:30', '8:00'];
            
            if (busyTimes.includes(selectedTime)) {
                if (!form.querySelector('.time-warning')) {
                    const warning = document.createElement('div');
                    warning.className = 'time-warning';
                    warning.style.cssText = `
                        color: var(--accent-color);
                        font-size: 0.9rem;
                        margin-top: 5px;
                        font-weight: 500;
                    `;
                    warning.textContent = 'Peak time - we recommend booking 24 hours in advance';
                    this.parentNode.appendChild(warning);
                }
            } else {
                const existingWarning = form.querySelector('.time-warning');
                if (existingWarning) {
                    existingWarning.remove();
                }
            }
        });
    }
}

// Parallax effect for hero section
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image img');
        const fireElements = document.querySelectorAll('.fire-element');
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        fireElements.forEach((element, index) => {
            element.style.transform = `translateY(${scrolled * (0.1 + index * 0.05)}px)`;
        });
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Special animation for cut items
            if (entry.target.classList.contains('cut-item')) {
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            }
        }
    });
}, observerOptions);

// Special occasion handler
function handleSpecialOccasions() {
    const occasionSelect = document.querySelector('select:not([required])');
    if (occasionSelect) {
        occasionSelect.addEventListener('change', function() {
            const occasion = this.value;
            const form = this.closest('form');
            
            // Add special messages based on occasion
            const messages = {
                'birthday': 'We\'ll arrange a special birthday surprise!',
                'anniversary': 'Perfect choice for a romantic evening',
                'business': 'Our quiet tables are ideal for business discussions',
                'date': 'We\'ll ensure you get our most romantic seating',
                'celebration': 'Let us help make your celebration memorable'
            };
            
            // Remove existing message
            const existingMessage = form.querySelector('.occasion-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            if (messages[occasion]) {
                const message = document.createElement('div');
                message.className = 'occasion-message';
                message.style.cssText = `
                    background: var(--primary-color);
                    color: white;
                    padding: 10px;
                    border-radius: 5px;
                    margin-top: 10px;
                    font-size: 0.9rem;
                    text-align: center;
                `;
                message.textContent = messages[occasion];
                this.parentNode.appendChild(message);
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createTemperatureSelector();
    enhanceCutItems();
    enhanceFireEffects();
    addPremiumTouches();
    addParallaxEffect();
    handleSpecialOccasions();
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .cut-item, .side-item, .cocktail-item, .about-text, .contact-info');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .temp-option.active {
            background: var(--primary-color) !important;
            color: white !important;
            transform: scale(1.05);
        }
        
        .temp-option {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .temp-option:hover {
            background: var(--background-section);
            transform: translateY(-2px);
        }
        
        .cut-item {
            cursor: pointer;
        }
        
        .fire-element {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Load preferred temperature if available
    const preferredTemp = localStorage.getItem('preferredTemperature');
    if (preferredTemp) {
        const tempOptions = document.querySelectorAll('.temp-option');
        tempOptions.forEach(option => {
            if (option.querySelector('.temp-name').textContent === preferredTemp) {
                option.classList.add('active');
            }
        });
    }
});

// Add steak ordering functionality (mock)
function addOrderingFeatures() {
    const cutItems = document.querySelectorAll('.cut-item');
    
    cutItems.forEach(item => {
        const orderButton = document.createElement('button');
        orderButton.textContent = 'Select Cut';
        orderButton.className = 'btn-order';
        orderButton.style.cssText = `
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 3px;
            margin-top: 10px;
            cursor: pointer;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
        `;
        
        orderButton.addEventListener('click', function() {
            const cutName = item.querySelector('h3').textContent;
            const cutPrice = item.querySelector('.cut-price').textContent;
            
            // Store selection (could be used for cart functionality)
            localStorage.setItem('selectedCut', JSON.stringify({
                name: cutName,
                price: cutPrice,
                timestamp: Date.now()
            }));
            
            // Visual feedback
            this.textContent = 'Selected!';
            this.style.background = 'var(--accent-color)';
            this.style.color = 'var(--text-dark)';
            
            setTimeout(() => {
                this.textContent = 'Select Cut';
                this.style.background = 'var(--primary-color)';
                this.style.color = 'white';
            }, 2000);
            
            // Scroll to reservation form
            document.querySelector('#contact').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
        
        orderButton.addEventListener('mouseenter', function() {
            this.style.background = 'var(--secondary-color)';
            this.style.transform = 'translateY(-2px)';
        });
        
        orderButton.addEventListener('mouseleave', function() {
            this.style.background = 'var(--primary-color)';
            this.style.transform = 'translateY(0)';
        });
        
        item.querySelector('.cut-content').appendChild(orderButton);
    });
}

// Call ordering features after DOM load
setTimeout(addOrderingFeatures, 1000);

// Image lazy loading fallback
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lozad.js/1.16.0/lozad.min.js';
    document.head.appendChild(script);
    
    script.onload = () => {
        const lazyObserver = lozad();
        lazyObserver.observe();
    };
}