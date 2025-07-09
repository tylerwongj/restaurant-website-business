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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formDataObj = {};
            for (let [key, value] of formData.entries()) {
                formDataObj[key] = value;
            }
            
            // Basic form validation
            const requiredFields = ['name', 'email', 'subject', 'message'];
            const errors = [];
            
            requiredFields.forEach(field => {
                if (!formDataObj[field] || formDataObj[field].trim() === '') {
                    errors.push(field);
                }
            });
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (formDataObj.email && !emailRegex.test(formDataObj.email)) {
                errors.push('email-format');
            }
            
            if (errors.length > 0) {
                alert('Please fill in all required fields with valid information.');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
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
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.featured-item, .category-card, .deal-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Dynamic content loading for menu items
function loadMenuItems() {
    // This would typically fetch from an API
    const menuItems = [
        {
            name: "Classic Burger",
            description: "Juicy beef patty with lettuce, tomato, and our special sauce",
            price: "$12.99",
            image: "images/food-1.jpg",
            category: "burgers"
        },
        {
            name: "Chicken Caesar Salad",
            description: "Grilled chicken breast over crisp romaine with parmesan and croutons",
            price: "$10.99",
            image: "images/food-2.jpg",
            category: "salads"
        },
        {
            name: "Buffalo Wings",
            description: "Crispy wings tossed in our signature buffalo sauce",
            price: "$8.99",
            image: "images/food-3.jpg",
            category: "chicken"
        },
        {
            name: "Margherita Pizza",
            description: "Fresh mozzarella, basil, and tomato sauce on thin crust",
            price: "$14.99",
            image: "images/food-4.jpg",
            category: "pizza"
        }
    ];
    
    return menuItems;
}

// Search functionality (if needed)
function searchMenu(query) {
    const menuItems = loadMenuItems();
    return menuItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
}

// Add to cart functionality (for future online ordering)
function addToCart(itemId, quantity = 1) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.id === itemId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: itemId, quantity: quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.style.display = cartCount > 0 ? 'block' : 'none';
    }
}

// Theme switcher (if multiple themes are available)
function switchTheme(themeName) {
    const body = document.body;
    const themes = ['theme-warm', 'theme-cool', 'theme-business', 'theme-bold'];
    
    themes.forEach(theme => {
        body.classList.remove(theme);
    });
    
    body.classList.add(themeName);
    localStorage.setItem('selectedTheme', themeName);
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        switchTheme(savedTheme);
    }
});

// Image lazy loading
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Call lazy loading on page load
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Google Maps integration helper
function initMap() {
    if (typeof google !== 'undefined' && google.maps) {
        const location = { lat: 40.7128, lng: -74.0060 }; // Default to NYC
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: location,
            styles: [
                {
                    featureType: 'all',
                    elementType: 'geometry.fill',
                    stylers: [{ color: '#f5f5f5' }]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry.fill',
                    stylers: [{ color: '#a2daf2' }]
                }
            ]
        });
        
        new google.maps.Marker({
            position: location,
            map: map,
            title: 'Our Restaurant'
        });
    }
}

// Social media sharing
function shareOnSocial(platform, url, text) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Could send error to analytics service here
});

// Performance monitoring
window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    }
});

// Accessibility helpers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    console.log('Restaurant website loaded successfully!');
});