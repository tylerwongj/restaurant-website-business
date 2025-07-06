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
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
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
        }
    });
}, observerOptions);

// Animate elements on scroll
document.querySelectorAll('.feature-card, .menu-item, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple form validation
        const requiredFields = ['name', 'email', 'phone', 'date', 'party-size'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = this.querySelector(`[name="${field}"], [placeholder*="${field}"]`);
            if (input && !input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4444';
            } else if (input) {
                input.style.borderColor = '#ddd';
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailInput = this.querySelector('input[type="email"]');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput && !emailPattern.test(emailInput.value)) {
            emailInput.style.borderColor = '#ff4444';
            alert('Please enter a valid email address.');
            return;
        }
        
        // Phone validation
        const phoneInput = this.querySelector('input[type="tel"]');
        const phonePattern = /^[\d\s\-\+\(\)]+$/;
        if (phoneInput && !phonePattern.test(phoneInput.value)) {
            phoneInput.style.borderColor = '#ff4444';
            alert('Please enter a valid phone number.');
            return;
        }
        
        // Success message
        alert('Thank you for your reservation request! We will contact you soon to confirm.');
        this.reset();
    });
}

// Gallery image modal (simple lightbox)
const galleryItems = document.querySelectorAll('.gallery-item img');
galleryItems.forEach(img => {
    img.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        `;
        
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
        `;
        
        const modalImg = modal.querySelector('img');
        modalImg.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 10px;
        `;
        
        const closeBtn = modal.querySelector('.close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            font-size: 30px;
            color: white;
            cursor: pointer;
            z-index: 2001;
        `;
        
        document.body.appendChild(modal);
        
        // Close modal events
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    });
});

// Lazy loading for images
const images = document.querySelectorAll('img[src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Add loading animation
const style = document.createElement('style');
style.textContent = `
    img {
        transition: opacity 0.3s ease;
    }
    img:not(.loaded) {
        opacity: 0.5;
    }
    img.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Social media links - open in new tab
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.href && this.href !== '#' && this.href !== '') {
            e.preventDefault();
            window.open(this.href, '_blank');
        }
    });
});

// Scroll to top functionality
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    
    if (scrollTop > 500) {
        if (!document.querySelector('.scroll-top')) {
            const scrollTopBtn = document.createElement('button');
            scrollTopBtn.className = 'scroll-top';
            scrollTopBtn.innerHTML = '↑';
            scrollTopBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
                color: white;
                border: none;
                font-size: 20px;
                cursor: pointer;
                z-index: 1000;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
            `;
            
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            scrollTopBtn.addEventListener('mouseenter', () => {
                scrollTopBtn.style.transform = 'scale(1.1)';
            });
            
            scrollTopBtn.addEventListener('mouseleave', () => {
                scrollTopBtn.style.transform = 'scale(1)';
            });
            
            document.body.appendChild(scrollTopBtn);
        }
    } else {
        const scrollTopBtn = document.querySelector('.scroll-top');
        if (scrollTopBtn) {
            document.body.removeChild(scrollTopBtn);
        }
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth reveal animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Initialize any other components
    console.log('Tropical Beachside Restaurant template loaded successfully!');
});