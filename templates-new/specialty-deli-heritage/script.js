// Specialty Deli Heritage Template - JavaScript

// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const categoryTabs = document.querySelectorAll('.category-tab');
const menuCategories = document.querySelectorAll('.menu-category');
const contactForm = document.querySelector('.contact form');

// Mobile Menu Toggle
mobileMenuToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Menu Category Switching
categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.getAttribute('data-category');
        
        // Remove active class from all tabs and categories
        categoryTabs.forEach(t => t.classList.remove('active'));
        menuCategories.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding category
        tab.classList.add('active');
        const targetCategory = document.getElementById(category);
        if (targetCategory) {
            targetCategory.classList.add('active');
        }
    });
});

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        
        // Basic validation
        const requiredFields = ['name', 'email', 'subject', 'message'];
        const missingFields = [];
        
        requiredFields.forEach(field => {
            if (!formData.get(field)) {
                missingFields.push(field);
            }
        });
        
        if (missingFields.length > 0) {
            alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
            return;
        }
        
        // Validate email
        const email = formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            alert('Thank you for your message! We will respond within 24 hours.');
            contactForm.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// Smooth Scrolling for Navigation Links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.nav').offsetHeight + 
                           document.querySelector('.header-top').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Add smooth scrolling to navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// Header Scroll Effects
let lastScrollTop = 0;
const header = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class for styling
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Add CSS for header scroll effects and mobile menu
const style = document.createElement('style');
style.textContent = `
    .nav.scrolled {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 1rem 2rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        gap: 1rem;
        z-index: 1000;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Famous Items Animation on Scroll
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

// Add animation styles and observe elements
const animateElements = document.querySelectorAll('.famous-item, .specialty, .info-card, .order-option');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter Animation for Heritage Stats
function animateCounter(element, target, duration) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (target >= 100 ? '+' : '');
    }, 16);
}

// Animate counters when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('h4');
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            animateCounter(counter, target, 2000);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Order Button Click Tracking
document.querySelectorAll('[href="#order"], .btn-order').forEach(button => {
    button.addEventListener('click', (e) => {
        // Add click tracking or analytics here
        console.log('Order button clicked:', e.target.textContent);
    });
});

// Dynamic Pricing Display (for demo purposes)
function updatePricing() {
    const priceElements = document.querySelectorAll('.price');
    priceElements.forEach(element => {
        const currentPrice = element.textContent;
        element.setAttribute('data-original-price', currentPrice);
        
        // Add hover effect to show "Order Now" text
        element.addEventListener('mouseenter', () => {
            element.textContent = 'Order Now';
            element.style.color = 'var(--secondary)';
            element.style.cursor = 'pointer';
        });
        
        element.addEventListener('mouseleave', () => {
            element.textContent = element.getAttribute('data-original-price');
            element.style.color = 'var(--primary)';
            element.style.cursor = 'default';
        });
    });
}

// Image Lazy Loading
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
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
}

// Add demo data for localhost testing
function addDemoData() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Add demo button to contact form
        const demoButton = document.createElement('button');
        demoButton.textContent = 'Fill Demo Data';
        demoButton.type = 'button';
        demoButton.style.cssText = 'margin-bottom: 1rem; padding: 0.5rem 1rem; background: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;';
        
        demoButton.onclick = () => {
            const demoData = {
                'contact-name': 'Sarah Cohen',
                'contact-email': 'sarah.cohen@example.com',
                'contact-phone': '(212) 555-0123',
                'contact-subject': 'catering',
                'contact-message': 'Hi! I would like to inquire about catering for a bar mitzvah for 50 people. What packages do you offer?'
            };
            
            Object.entries(demoData).forEach(([id, value]) => {
                const field = document.getElementById(id);
                if (field) field.value = value;
            });
        };
        
        const form = document.querySelector('.contact-form form');
        if (form) {
            form.insertBefore(demoButton, form.firstChild);
        }
    }
}

// Add seasonal banner (example of dynamic content)
function addSeasonalBanner() {
    const currentMonth = new Date().getMonth();
    let bannerText = '';
    
    if (currentMonth >= 2 && currentMonth <= 4) {
        bannerText = '🌸 Spring Special: Fresh Passover Menu Available!';
    } else if (currentMonth >= 5 && currentMonth <= 7) {
        bannerText = '☀️ Summer Hours: Extended weekend hours for summer!';
    } else if (currentMonth >= 8 && currentMonth <= 10) {
        bannerText = '🍂 Fall Favorites: Try our seasonal apple strudel!';
    } else {
        bannerText = '❄️ Winter Warmth: Hot matzo ball soup perfect for cold days!';
    }
    
    if (bannerText) {
        const banner = document.createElement('div');
        banner.style.cssText = `
            background: var(--secondary);
            color: var(--text);
            text-align: center;
            padding: 0.75rem;
            font-weight: 600;
            position: sticky;
            top: 0;
            z-index: 101;
        `;
        banner.textContent = bannerText;
        
        document.body.insertBefore(banner, document.body.firstChild);
    }
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    updatePricing();
    lazyLoadImages();
    addDemoData();
    addSeasonalBanner();
});

// Add loading states for better UX
function addLoadingStates() {
    const buttons = document.querySelectorAll('button[type="submit"], .btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.form && this.form.checkValidity && !this.form.checkValidity()) {
                return;
            }
            
            if (!this.disabled) {
                this.style.opacity = '0.7';
                this.style.cursor = 'wait';
                
                setTimeout(() => {
                    this.style.opacity = '';
                    this.style.cursor = '';
                }, 2000);
            }
        });
    });
}

// Initialize loading states
document.addEventListener('DOMContentLoaded', addLoadingStates);

// Heritage Image Stack Effect
function enhanceImageStack() {
    const imageStack = document.querySelector('.image-stack');
    if (imageStack) {
        imageStack.addEventListener('mouseenter', () => {
            const images = imageStack.querySelectorAll('.historic-image');
            images[1].style.transform = 'translate(60px, 60px) scale(1.05)';
            images[0].style.transform = 'scale(1.02)';
        });
        
        imageStack.addEventListener('mouseleave', () => {
            const images = imageStack.querySelectorAll('.historic-image');
            images[1].style.transform = '';
            images[0].style.transform = '';
        });
    }
}

// Initialize image stack effects
document.addEventListener('DOMContentLoaded', enhanceImageStack);