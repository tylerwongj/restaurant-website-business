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
            const offsetTop = target.offsetTop - 80;
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
            
            // Show vintage-style success message
            showVintageAlert('Thank you for your message! We shall respond posthaste.');
            
            // Reset form
            this.reset();
        });
    }
});

// Vintage-style alert function
function showVintageAlert(message) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(47, 27, 20, 0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Create alert box
    const alertBox = document.createElement('div');
    alertBox.style.cssText = `
        background: var(--background-light);
        border: 3px solid var(--ornament-color);
        padding: 40px;
        max-width: 400px;
        text-align: center;
        font-family: 'Playfair Display', serif;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    alertBox.innerHTML = `
        <div style="color: var(--ornament-color); font-size: 2rem; margin-bottom: 20px;">✉</div>
        <p style="color: var(--text-dark); font-size: 1.2rem; line-height: 1.6; margin-bottom: 30px;">${message}</p>
        <button onclick="this.closest('[style*=\"position: fixed\"]').remove()" 
                style="background: var(--ornament-color); color: var(--text-dark); border: none; padding: 15px 30px; font-family: 'Playfair Display', serif; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
            Very Well
        </button>
    `;
    
    overlay.appendChild(alertBox);
    document.body.appendChild(overlay);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (overlay.parentNode) {
            overlay.remove();
        }
    }, 5000);
}

// Navbar background on scroll with vintage effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(250, 247, 242, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'rgba(250, 247, 242, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Category navigation for menu page
document.addEventListener('DOMContentLoaded', function() {
    const categoryLinks = document.querySelectorAll('.category-link');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            categoryLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Vintage-style animations
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

// Observe elements for vintage-style animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.menu-item-vintage, .menu-item-detailed-vintage, .about-text, .about-image, .contact-info, .contact-form, .feature'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// Form validation with vintage styling
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#b22222';
            input.style.boxShadow = '0 0 5px rgba(178, 34, 34, 0.3)';
            isValid = false;
        } else {
            input.style.borderColor = 'var(--border-color)';
            input.style.boxShadow = 'none';
        }
    });
    
    // Email validation
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = '#b22222';
            emailInput.style.boxShadow = '0 0 5px rgba(178, 34, 34, 0.3)';
            isValid = false;
        }
    }
    
    return isValid;
}

// Vintage parallax effect for hero section
window.addEventListener('scroll', function() {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
});

// Menu item hover effects
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item-vintage, .menu-item-detailed-vintage');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Ornament animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const ornaments = document.querySelectorAll('.section-ornament, .ornament');
    
    const ornamentObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'ornamentFadeIn 1s ease forwards';
            }
        });
    }, { threshold: 0.5 });
    
    ornaments.forEach(ornament => {
        ornament.style.opacity = '0';
        ornamentObserver.observe(ornament);
    });
});

// Add CSS animation for ornaments
const style = document.createElement('style');
style.textContent = `
    @keyframes ornamentFadeIn {
        from {
            opacity: 0;
            transform: scaleX(0);
        }
        to {
            opacity: 1;
            transform: scaleX(1);
        }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);