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
            alert('Grazie! Your message has been sent. We\'ll contact you soon!');
            this.reset();
        });
    }
});

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

// Pizza showcase hover effects
document.addEventListener('DOMContentLoaded', function() {
    const showcaseItems = document.querySelectorAll('.showcase-item');
    
    showcaseItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Daily specials rotation (if you want to show different specials)
function rotateSpecials() {
    const specials = [
        "Pizza Margherita + Drink - $12.99",
        "Two Medium Pizzas - $19.99", 
        "Family Pack (Large Pizza + Garlic Bread + 2L Drink) - $24.99",
        "Pasta + Small Pizza - $16.99",
        "Happy Hour: 50% off Appetizers",
        "Weekend Special: Free Dessert with Large Pizza"
    ];
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Weekend'];
    const specialElements = document.querySelectorAll('.special-day p');
    
    if (specialElements.length === days.length) {
        specialElements.forEach((element, index) => {
            if (!element.textContent.includes('{{')) {
                // Only rotate if not using template variables
                const randomSpecial = specials[Math.floor(Math.random() * specials.length)];
                element.textContent = randomSpecial;
            }
        });
    }
}

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
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.showcase-item, .menu-item, .special-day, .feature');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
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

// Color scheme switcher (for testing different color schemes)
function switchColorScheme(scheme) {
    const body = document.body;
    // Remove existing color classes
    body.classList.remove('classic', 'business', 'cool', 'bold');
    // Add new color class
    if (scheme !== 'warm') {
        body.classList.add(scheme);
    }
}

// Pizza size calculator (bonus feature)
function calculatePizzaValue() {
    const sizes = {
        small: { diameter: 10, price: 12.99 },
        medium: { diameter: 12, price: 16.99 },
        large: { diameter: 14, price: 20.99 },
        xlarge: { diameter: 16, price: 24.99 }
    };
    
    Object.keys(sizes).forEach(size => {
        const pizza = sizes[size];
        const area = Math.PI * Math.pow(pizza.diameter / 2, 2);
        pizza.valuePerSquareInch = (pizza.price / area).toFixed(3);
    });
    
    return sizes;
}

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

// Italian greeting based on time of day
function getItalianGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Buongiorno!";
    if (hour < 18) return "Buon pomeriggio!";
    return "Buonasera!";
}

// Add Italian flair to form submission
document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.querySelector('.contact-form button[type="submit"]');
    if (submitBtn) {
        submitBtn.addEventListener('mouseenter', function() {
            const greeting = getItalianGreeting();
            this.textContent = `${greeting} Send Message`;
        });
        
        submitBtn.addEventListener('mouseleave', function() {
            this.textContent = 'Send Message';
        });
    }
});