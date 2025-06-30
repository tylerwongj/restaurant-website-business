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
        navbar.style.background = 'rgba(254, 254, 254, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--background-light)';
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
            alert('Thank you for your custom order inquiry! We will contact you within 24 hours to discuss your requirements.');
            this.reset();
        } else {
            alert('Please fill out all required fields.');
        }
    });
}

// Product hover effects
document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 10px 30px var(--shadow-medium)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 20px var(--shadow-light)';
    });
});

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
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .product-item, .testimonial, .about-text, .contact-info');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Custom order form enhancements
const orderTypeSelect = document.querySelector('select');
if (orderTypeSelect) {
    orderTypeSelect.addEventListener('change', function() {
        const textarea = document.querySelector('textarea');
        const orderType = this.value;
        
        // Pre-fill textarea based on order type
        const templates = {
            'birthday': 'Birthday cake details:\n- Age/theme:\n- Size needed:\n- Flavor preferences:\n- Special decorations:',
            'wedding': 'Wedding cake details:\n- Wedding date:\n- Number of guests:\n- Design style:\n- Flavor preferences:\n- Special requirements:',
            'catering': 'Catering order details:\n- Event date:\n- Number of people:\n- Items needed:\n- Delivery/pickup:',
            'custom': 'Custom creation details:\n- Occasion:\n- Size/quantity:\n- Design ideas:\n- Special requirements:',
            'other': 'Please describe your needs:'
        };
        
        if (templates[orderType] && !textarea.value) {
            textarea.value = templates[orderType];
        }
    });
}

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

// Add some bakery-specific interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add fresh badge animation
    const freshBadge = document.querySelector('.hero-badge');
    if (freshBadge) {
        setInterval(() => {
            freshBadge.style.transform = 'scale(1.05)';
            setTimeout(() => {
                freshBadge.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }
    
    // Add product availability checker (mock functionality)
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        const title = item.querySelector('h4').textContent;
        
        // Mock availability check - in real app, this would be an API call
        const isAvailable = Math.random() > 0.1; // 90% availability rate
        
        if (!isAvailable) {
            const unavailableBadge = document.createElement('div');
            unavailableBadge.className = 'unavailable-badge';
            unavailableBadge.textContent = 'Sold Out Today';
            unavailableBadge.style.cssText = `
                position: absolute;
                top: 10px;
                left: 10px;
                background: #e74c3c;
                color: white;
                padding: 5px 10px;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: 600;
            `;
            
            item.style.position = 'relative';
            item.appendChild(unavailableBadge);
            item.style.opacity = '0.7';
        }
    });
});