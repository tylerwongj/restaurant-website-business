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

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background img');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
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
            
            // Special animation for zen circle
            if (entry.target.classList.contains('zen-circle')) {
                entry.target.style.animation = 'rotate 20s linear infinite, fadeInScale 1s ease forwards';
            }
            
            // Stagger animation for philosophy principles
            if (entry.target.classList.contains('philosophy-principles')) {
                const principles = entry.target.querySelectorAll('.principle');
                principles.forEach((principle, index) => {
                    setTimeout(() => {
                        principle.style.opacity = '1';
                        principle.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
            
            // Stagger animation for menu categories
            if (entry.target.classList.contains('menu-showcase')) {
                const categories = entry.target.querySelectorAll('.menu-category');
                categories.forEach((category, index) => {
                    setTimeout(() => {
                        category.style.opacity = '1';
                        category.style.transform = 'translateY(0)';
                    }, index * 300);
                });
            }
        }
    });
}, observerOptions);

// Add fade in scale animation for zen circle
const zenCircleStyle = document.createElement('style');
zenCircleStyle.textContent = `
    @keyframes fadeInScale {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(zenCircleStyle);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(`
        .section-intro, 
        .philosophy-content, 
        .zen-circle, 
        .philosophy-principles,
        .menu-showcase,
        .experience-item,
        .about-content,
        .contact-content
    `);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Special handling for philosophy principles
    const principles = document.querySelectorAll('.principle');
    principles.forEach(principle => {
        principle.style.opacity = '0';
        principle.style.transform = 'translateY(30px)';
        principle.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Special handling for menu categories
    const menuCategories = document.querySelectorAll('.menu-category');
    menuCategories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
});

// Contact form handling with zen-like validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const message = this.querySelector('textarea').value;
        
        // Zen-like validation (gentle and mindful)
        if (!name || !email || !message) {
            showZenNotification('Please mindfully complete all required fields.', 'gentle');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showZenNotification('Please provide a valid email address.', 'gentle');
            return;
        }
        
        // Simulate form submission with zen styling
        const submitBtn = this.querySelector('.btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending with intention...';
        submitBtn.disabled = true;
        
        // Add gentle loading animation
        submitBtn.style.opacity = '0.7';
        submitBtn.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            showZenNotification('Your message has been sent mindfully. We will respond with care.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.transform = 'scale(1)';
            
            // Reset form line animations
            const formLines = this.querySelectorAll('.form-line');
            formLines.forEach(line => line.style.width = '0');
        }, 2000);
    });
}

// Zen notification system
function showZenNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `zen-notification ${type}`;
    
    const colors = {
        gentle: 'var(--accent-color)',
        success: 'var(--primary-color)',
        info: 'var(--text-light)'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-message">${message}</div>
        </div>
    `;
    
    // Zen notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--background-overlay);
        backdrop-filter: blur(20px);
        border: 1px solid ${colors[type]};
        border-radius: 8px;
        padding: 1.5rem 2rem;
        color: var(--text-dark);
        font-family: 'Inter', sans-serif;
        font-size: 0.95rem;
        line-height: 1.6;
        box-shadow: 0 8px 32px var(--shadow-light);
        z-index: 10000;
        max-width: 400px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.4s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// Enhanced scroll indicator animation
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        if (scrolled > windowHeight * 0.1) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
        }
    });
}

// Mindful hover effects for interactive elements
document.querySelectorAll('.btn, .menu-category, .principle, .experience-item').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Zen circle interaction
const zenCircle = document.querySelector('.zen-circle');
if (zenCircle) {
    zenCircle.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 0 30px rgba(232, 184, 122, 0.3)';
    });
    
    zenCircle.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
}

// Enhanced image composition effect
const compImages = document.querySelectorAll('.comp-image');
compImages.forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.boxShadow = '0 15px 40px var(--shadow-medium)';
    });
    
    img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Gentle loading animation on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Mindful typography animation
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing animation after page load
    setTimeout(typeWriter, 1500);
}

// Enhanced form interactions
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Responsive image loading optimization
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
        this.style.filter = 'none';
    });
    
    // Set initial state
    img.style.opacity = '0';
    img.style.filter = 'blur(5px)';
    img.style.transition = 'opacity 0.5s ease, filter 0.5s ease';
});

// Mindful scroll behavior for navigation
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Add gentle transitions to navbar
navbar.style.transition = 'transform 0.3s ease';