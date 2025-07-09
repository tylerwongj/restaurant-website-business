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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'white';
        navbar.style.backdropFilter = 'none';
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Show success message (replace with actual form submission)
        alert('Thank you for your reservation request! We will contact you soon to confirm.');
        
        // Reset form
        contactForm.reset();
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
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.featured-item, .menu-item, .neighborhood-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Promo banner animation
document.addEventListener('DOMContentLoaded', () => {
    const promoText = document.querySelector('.promo-text');
    const promoImage = document.querySelector('.promo-image');
    
    if (promoText && promoImage) {
        promoText.style.opacity = '0';
        promoText.style.transform = 'translateX(-50px)';
        promoImage.style.opacity = '0';
        promoImage.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            promoText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            promoImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            promoText.style.opacity = '1';
            promoText.style.transform = 'translateX(0)';
            promoImage.style.opacity = '1';
            promoImage.style.transform = 'translateX(0)';
        }, 200);
    }
});

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.floor(current);
                setTimeout(updateCounter, 30);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger stats animation when about section is visible
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
}

// Parallax effect for promo banner
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const promoBanner = document.querySelector('.promo-banner');
    if (promoBanner) {
        promoBanner.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Button hover effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
    });
});

// Image lazy loading
document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
});

// Theme switcher (if needed)
function switchTheme(theme) {
    document.body.className = `theme-${theme}`;
    localStorage.setItem('theme', theme);
}

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        switchTheme(savedTheme);
    }
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Focus management for mobile menu
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hamburger.click();
    }
});

// Smooth reveal animations
function revealElements() {
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealElements);
document.addEventListener('DOMContentLoaded', revealElements);

// Performance optimization
let ticking = false;
function updateOnScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            // Batch scroll-related updates here
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateOnScroll);