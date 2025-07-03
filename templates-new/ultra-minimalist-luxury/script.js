// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Enhanced navbar scroll effect with opacity changes
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(25px)';
        navbar.style.borderBottom = '1px solid rgba(232, 232, 232, 0.8)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.borderBottom = '1px solid #e8e8e8';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.15,
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

// Apply subtle animations to sections
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.philosophy-content, .experience-text, .chef-text, .course, .gallery-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// Gallery hover effects with subtle animations
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.querySelector('img').style.transform = 'scale(1.08)';
        this.querySelector('img').style.filter = 'grayscale(0%)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.querySelector('img').style.transform = 'scale(1)';
        this.querySelector('img').style.filter = 'grayscale(100%)';
    });
});

// Reservation button interactions
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-1px)';
        this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Phone number click tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('Phone number clicked:', this.href);
        // Analytics tracking would go here
    });
});

// Online booking integration placeholder
document.querySelectorAll('a[href*="booking"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Integrate with actual booking system
        console.log('Online booking clicked');
        // Could open a modal or redirect to booking platform
    });
});

// Course menu progressive disclosure
document.querySelectorAll('.course').forEach((course, index) => {
    course.style.animationDelay = `${index * 0.1}s`;
    
    // Add subtle hover effect
    course.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(248, 248, 248, 0.5)';
        this.style.padding = '40px 20px';
        this.style.borderRadius = '2px';
    });
    
    course.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
        this.style.padding = '40px 0';
        this.style.borderRadius = '0';
    });
});

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage && scrolled < window.innerHeight) {
        const parallaxSpeed = scrolled * 0.5;
        heroImage.style.transform = `translateY(${parallaxSpeed}px)`;
    }
});

// Chef image filter toggle
const chefImage = document.querySelector('.chef-image img');
if (chefImage) {
    chefImage.addEventListener('mouseenter', function() {
        this.style.filter = 'grayscale(0%)';
        this.style.transform = 'scale(1.02)';
    });
    
    chefImage.addEventListener('mouseleave', function() {
        this.style.filter = 'grayscale(100%)';
        this.style.transform = 'scale(1)';
    });
}

// Social media link tracking
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function() {
        const platform = this.textContent.toLowerCase();
        console.log(`Social media clicked: ${platform}`);
        // Analytics tracking would go here
    });
});

// Map placeholder interaction
const mapPlaceholder = document.querySelector('.map-placeholder');
if (mapPlaceholder) {
    mapPlaceholder.addEventListener('click', function() {
        // Integrate with Google Maps or other mapping service
        alert('Interactive map would open here');
    });
    
    mapPlaceholder.style.cursor = 'pointer';
}

// Reservation form handling (if added later)
function handleReservationForm(formElement) {
    formElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(this);
        
        // Validate required fields
        const requiredFields = ['name', 'email', 'date', 'time', 'guests'];
        const missingFields = requiredFields.filter(field => !formData.get(field));
        
        if (missingFields.length > 0) {
            alert(`Please fill in: ${missingFields.join(', ')}`);
            return;
        }
        
        // Send to reservation system
        console.log('Reservation submitted:', Object.fromEntries(formData));
        alert('Reservation request submitted. We\'ll confirm shortly.');
        this.reset();
    });
}

// Theme switching functionality (optional)
function switchTheme(themeName) {
    document.body.className = `theme-${themeName}`;
    localStorage.setItem('preferredTheme', themeName);
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('preferredTheme');
    if (savedTheme) {
        switchTheme(savedTheme);
    }
    
    console.log('Ultra-minimalist luxury template loaded successfully');
});

// Scroll-triggered animations for course numbers
const courseNumbers = document.querySelectorAll('.course-number');
courseNumbers.forEach((number, index) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.5 });
    
    number.style.opacity = '0';
    number.style.transform = 'translateX(-20px)';
    number.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(number);
});

// Elegant page loading effect
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard navigation enhancement
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Touch device optimizations
if ('ontouchstart' in window) {
    // Remove hover effects on touch devices
    document.body.classList.add('touch-device');
    
    // Add touch-specific styles
    const style = document.createElement('style');
    style.textContent = `
        .touch-device .gallery-item:hover img {
            transform: scale(1) !important;
        }
        .touch-device .course:hover {
            background-color: transparent !important;
        }
    `;
    document.head.appendChild(style);
}