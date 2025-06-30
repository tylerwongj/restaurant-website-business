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
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling
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
                message: formData.get('message')
            };
            
            // Basic validation
            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show success message (in real implementation, this would submit to server)
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});

// Pizza Order Animation for Order Buttons
document.addEventListener('DOMContentLoaded', function() {
    const orderButtons = document.querySelectorAll('.btn-order, .btn-primary');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create pizza emoji animation
            const pizza = document.createElement('span');
            pizza.innerHTML = '🍕';
            pizza.style.position = 'absolute';
            pizza.style.fontSize = '24px';
            pizza.style.pointerEvents = 'none';
            pizza.style.animation = 'pizzaFloat 1s ease-out forwards';
            
            const rect = this.getBoundingClientRect();
            pizza.style.left = rect.left + rect.width / 2 + 'px';
            pizza.style.top = rect.top + 'px';
            
            document.body.appendChild(pizza);
            
            setTimeout(() => {
                document.body.removeChild(pizza);
            }, 1000);
        });
    });
});

// Add CSS animation for pizza float
const style = document.createElement('style');
style.textContent = `
    @keyframes pizzaFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-50px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#ffffff';
            navbar.style.backdropFilter = 'none';
        }
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
                
                // Add special animation for specials
                if (entry.target.classList.contains('special-item')) {
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.menu-item, .feature, .hours, .location, .special-item, .order-method');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        
        if (el.classList.contains('special-item')) {
            el.style.transform = 'translateY(30px) scale(0.9)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        } else {
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        
        observer.observe(el);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Phone number formatting (US format)
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

// Pizza theme color scheme switcher
function switchPizzaColorScheme(scheme) {
    const body = document.body;
    // Remove existing pizza color classes
    body.classList.remove('pizza-classic', 'pizza-sicilian', 'pizza-margherita', 'pizza-pepperoni', 'pizza-supreme');
    // Add new pizza color class
    if (scheme !== 'classic') {
        body.classList.add(`pizza-${scheme}`);
    }
}

// Pizza size price calculator (for future enhancement)
function calculatePizzaPrice(basePrice, size, toppings = []) {
    let multiplier = 1;
    switch(size) {
        case 'small': multiplier = 0.75; break;
        case 'medium': multiplier = 1; break;
        case 'large': multiplier = 1.5; break;
        case 'xlarge': multiplier = 2; break;
    }
    
    const toppingPrice = toppings.length * 1.50; // $1.50 per topping
    return (basePrice * multiplier + toppingPrice).toFixed(2);
}

// Delivery time estimator
function estimateDeliveryTime() {
    const now = new Date();
    const hour = now.getHours();
    
    // Longer delivery times during peak hours
    if ((hour >= 11 && hour <= 13) || (hour >= 17 && hour <= 20)) {
        return '35-45';
    } else {
        return '25-35';
    }
}

// Update delivery time on page load
document.addEventListener('DOMContentLoaded', function() {
    const deliveryTimeElements = document.querySelectorAll('.delivery-info');
    const estimatedTime = estimateDeliveryTime();
    
    deliveryTimeElements.forEach(element => {
        if (element.textContent.includes('mins')) {
            element.innerHTML = element.innerHTML.replace(/\d+-\d+\s*mins/, estimatedTime + ' mins');
        }
    });
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

// Special deals countdown timer (for limited time offers)
function startSpecialCountdown(endTime, elementId) {
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = endTime - now;
        
        if (timeLeft > 0) {
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = `Ends in: ${hours}h ${minutes}m ${seconds}s`;
            }
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}