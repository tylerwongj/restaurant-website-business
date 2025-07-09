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
            const offsetTop = target.offsetTop - 100;
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
        navbar.style.background = 'rgba(254, 254, 254, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(254, 254, 254, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Form submission handler
document.querySelector('.reservations-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simple form validation
    if (!data.name || !data.email || !data.phone || !data.date || !data.party_size || !data.experience) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Date validation (must be future date)
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        alert('Please select a future date.');
        return;
    }
    
    // Show success message
    alert('Thank you for your reservation inquiry! We will contact you within 24 hours to confirm your booking.');
    
    // Reset form
    this.reset();
});

// Scroll animations
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

// Animate elements on scroll
document.querySelectorAll('.award, .experience-item, .detail-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Elegant hover effects for experience items
document.querySelectorAll('.experience-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
});

// Smooth reveal animations
const revealElements = document.querySelectorAll('.hero-content, .philosophy-text, .experience-header');

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 1s ease, transform 1s ease';
});

// Trigger animations on load
window.addEventListener('load', () => {
    setTimeout(() => {
        revealElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }, 200);
});

// Elegant form focus effects
document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.style.borderColor = 'var(--primary)';
        this.style.boxShadow = '0 0 0 2px rgba(44, 62, 80, 0.1)';
    });
    
    field.addEventListener('blur', function() {
        this.style.borderColor = 'var(--border)';
        this.style.boxShadow = 'none';
    });
});

// Staggered animation for awards
const awards = document.querySelectorAll('.award');
awards.forEach((award, index) => {
    award.style.animationDelay = `${index * 0.2}s`;
});

// Add subtle animations to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Smooth divider animations
const dividers = document.querySelectorAll('.hero-divider, .section-divider');
dividers.forEach(divider => {
    divider.style.width = '0';
    divider.style.transition = 'width 1s ease';
});

const dividerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('hero-divider')) {
                entry.target.style.width = '80px';
            } else {
                entry.target.style.width = '60px';
            }
        }
    });
}, { threshold: 0.5 });

dividers.forEach(divider => dividerObserver.observe(divider));

// Elegant typing effect for hero title (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// window.addEventListener('load', () => {
//     const heroTitle = document.querySelector('.hero h1');
//     if (heroTitle) {
//         const titleText = heroTitle.textContent;
//         setTimeout(() => typeWriter(heroTitle, titleText, 150), 500);
//     }
// });

// Phone number formatting
document.querySelector('input[name="phone"]').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
    }
    e.target.value = value;
});

// Prevent past dates in date input
document.querySelector('input[type="date"]').addEventListener('focus', function() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    this.min = tomorrow.toISOString().split('T')[0];
});