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
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(44, 62, 80, 0.98)';
    } else {
        navbar.style.background = 'rgba(44, 62, 80, 0.95)';
    }
});

// Form submission handler
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Here you would typically send the data to your server
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-bg');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-text, .menu-item, .contact-info, .contact-form').forEach(el => {
    observer.observe(el);
});

// Add CSS animation classes
const style = document.createElement('style');
style.textContent = `
    .about-text,
    .menu-item,
    .contact-info,
    .contact-form {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .about-text.animate,
    .menu-item.animate,
    .contact-info.animate,
    .contact-form.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .menu-item.animate {
        transition-delay: 0.1s;
    }
    
    .menu-item:nth-child(2).animate {
        transition-delay: 0.2s;
    }
    
    .menu-item:nth-child(3).animate {
        transition-delay: 0.3s;
    }
    
    .menu-item:nth-child(4).animate {
        transition-delay: 0.4s;
    }
`;
document.head.appendChild(style);

// Social media links validation
document.querySelectorAll('.social-link, .social-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '' || href === '#') {
            e.preventDefault();
        }
    });
});