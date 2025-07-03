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
            const offsetTop = target.offsetTop - 72;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(25px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Menu category interactions
document.querySelectorAll('.menu-category').forEach(category => {
    category.addEventListener('click', function() {
        const categoryId = this.getAttribute('data-category');
        console.log('Menu category clicked:', categoryId);
        handleCategorySelect(categoryId);
    });
    
    category.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-6px)';
        this.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.15)';
    });
    
    category.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
    });
});

// Featured item add to cart functionality
document.querySelectorAll('.btn-add').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const item = this.closest('.featured-item');
        const itemName = item.querySelector('h3').textContent;
        const itemPrice = item.querySelector('.item-price').textContent;
        
        this.style.background = '#2e7d32';
        this.textContent = 'Added!';
        
        setTimeout(() => {
            this.style.background = 'var(--secondary-color)';
            this.textContent = 'Add to Order';
        }, 2000);
        
        addToCart({ name: itemName, price: itemPrice });
    });
});

// Location finder functionality
const locationInput = document.querySelector('.finder-input input');
const findButton = document.querySelector('.finder-input button');

if (findButton) {
    findButton.addEventListener('click', function() {
        const searchTerm = locationInput.value.trim();
        if (searchTerm) {
            findNearbyLocations(searchTerm);
        } else {
            alert('Please enter a city or zip code');
        }
    });
}

if (locationInput) {
    locationInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            findButton.click();
        }
    });
}

// Nutrition cards interactive hover
document.querySelectorAll('.nutrition-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-6px) scale(1.02)';
        this.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
    });
});

// Cart management
let cart = [];

function addToCart(item) {
    cart.push(item);
    updateCartDisplay();
    trackOrder('add_to_cart', item);
}

function updateCartDisplay() {
    const cartCount = cart.length;
    const cartIcon = document.querySelector('.cart-count');
    if (cartIcon) {
        cartIcon.textContent = cartCount;
    }
}

// Location services
function findNearbyLocations(searchTerm) {
    console.log('Searching for locations near:', searchTerm);
    showLocationResults(searchTerm);
}

function showLocationResults(searchTerm) {
    alert(`Searching for ${searchTerm}... This would show nearby locations.`);
}

// Category selection handling
function handleCategorySelect(categoryId) {
    console.log('Category selected:', categoryId);
}

// Order tracking
function trackOrder(type, item = null) {
    console.log(`Order tracked: ${type}`, item);
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

// Apply animation to sections
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.menu-category, .featured-item, .nutrition-card, .location-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    console.log('Fast-casual clean template loaded successfully');
});

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    const perfData = performance.timing;
    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page load time: ${loadTime}ms`);
});