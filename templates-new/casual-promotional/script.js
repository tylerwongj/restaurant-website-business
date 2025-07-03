// Casual Promotional Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Promotional Banner Close
    const promoClose = document.querySelector('.promo-close');
    const promoBanner = document.querySelector('.promo-banner');
    
    if (promoClose && promoBanner) {
        promoClose.addEventListener('click', function() {
            promoBanner.style.display = 'none';
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.promo-card, .menu-card, .benefit');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Location Search
    const locationForm = document.querySelector('.location-search');
    if (locationForm) {
        const searchButton = locationForm.querySelector('.btn');
        const locationInput = locationForm.querySelector('.location-input');
        
        if (searchButton && locationInput) {
            searchButton.addEventListener('click', function(e) {
                e.preventDefault();
                const zipcode = locationInput.value.trim();
                
                if (zipcode) {
                    alert(`Searching for locations near ${zipcode}...`);
                    // Here you would typically make an API call to find nearby locations
                } else {
                    alert('Please enter your ZIP code');
                }
            });
        }
    }
    
    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show success message
            alert('Thank you for your message! We will get back to you within 24 hours.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Menu Card Order Buttons
    const orderButtons = document.querySelectorAll('.btn-small');
    orderButtons.forEach(button => {
        if (button.textContent.includes('Add to Order')) {
            button.addEventListener('click', function() {
                const menuCard = this.closest('.menu-card');
                const itemName = menuCard.querySelector('h3').textContent;
                alert(`Added ${itemName} to your order!`);
                
                // Here you would typically add to cart functionality
                this.textContent = 'Added!';
                this.style.background = 'var(--accent)';
                
                setTimeout(() => {
                    this.textContent = 'Add to Order';
                    this.style.background = '';
                }, 2000);
            });
        }
    });
    
    // Promo Card Actions
    const promoButtons = document.querySelectorAll('.btn-promo');
    promoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const card = this.closest('.promo-card');
            const promoTitle = card.querySelector('h3').textContent;
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(139, 69, 19, 0.15)';
        } else {
            navbar.style.background = 'var(--white)';
            navbar.style.boxShadow = '0 2px 10px var(--shadow)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add dynamic styles for mobile menu
    const style = document.createElement('style');
    style.textContent = `
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .nav-menu.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            box-shadow: 0 2px 10px var(--shadow);
            padding: 2rem;
            gap: 1rem;
            z-index: 1000;
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Theme switcher (if needed)
function switchTheme(themeName) {
    document.body.className = document.body.className.replace(/theme-\w+/, '');
    document.body.classList.add(`theme-${themeName}`);
    localStorage.setItem('preferred-theme', themeName);
}

// Load preferred theme
const preferredTheme = localStorage.getItem('preferred-theme');
if (preferredTheme) {
    switchTheme(preferredTheme);
}