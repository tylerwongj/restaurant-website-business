// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(47, 27, 20, 0.95)';
    } else {
        navbar.style.backgroundColor = 'var(--bg-dark)';
    }
});

// Contact Form Handling
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const message = this.querySelector('textarea').value;
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    this.reset();
});

// Menu Item Hover Effects
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading animation to buttons
document.querySelectorAll('.menu-btn, .order-btn, .promo-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add loading state
        const originalText = this.textContent;
        this.textContent = 'Loading...';
        this.style.opacity = '0.7';
        this.style.pointerEvents = 'none';
        
        // Simulate loading time
        setTimeout(() => {
            this.textContent = originalText;
            this.style.opacity = '1';
            this.style.pointerEvents = 'auto';
            
            // Show order message
            if (this.classList.contains('menu-btn') || this.classList.contains('order-btn')) {
                showOrderMessage();
            }
        }, 1500);
    });
});

// Order message function
function showOrderMessage() {
    // Create and show order message
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--accent-color);
            color: var(--text-dark);
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 9999;
            text-align: center;
            max-width: 400px;
            width: 90%;
        ">
            <h3 style="margin-bottom: 1rem;">Order Placed!</h3>
            <p>Your order has been received. We'll have it ready for pickup in 20-30 minutes.</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: var(--primary-color);
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                margin-top: 1rem;
                cursor: pointer;
            ">OK</button>
        </div>
    `;
    
    document.body.appendChild(message);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 3000);
}

// Intersection Observer for Animation on Scroll
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

// Apply animation to sections
document.querySelectorAll('.menu-item, .feature, .about-text, .contact-info, .contact-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Phone number formatting
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function() {
        // Remove all non-digit characters
        let value = this.value.replace(/\D/g, '');
        
        // Format as (XXX) XXX-XXXX
        if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
        }
        
        this.value = value;
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Preload critical images
function preloadImages() {
    const imageUrls = [
        'images/hero.jpg',
        'images/interior.jpg',
        'images/food-1.jpg',
        'images/food-2.jpg',
        'images/food-3.jpg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
preloadImages();