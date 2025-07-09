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

// Menu Category Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const menuContents = document.querySelectorAll('.menu-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        menuContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding content
        const category = button.getAttribute('data-category');
        const targetContent = document.getElementById(category);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// Add to Cart functionality (placeholder)
const addToCartButtons = document.querySelectorAll('.btn-add');
let cart = [];

addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get menu item details
        const menuItem = this.closest('.menu-item');
        const name = menuItem.querySelector('h3').textContent;
        const price = menuItem.querySelector('.price').textContent;
        
        // Add to cart array
        cart.push({ name, price });
        
        // Visual feedback
        this.textContent = 'Added!';
        this.style.backgroundColor = 'var(--secondary-color)';
        
        // Reset button after 1 second
        setTimeout(() => {
            this.textContent = 'Add to Cart';
            this.style.backgroundColor = 'var(--accent-color)';
        }, 1000);
        
        // Update cart display (if you have one)
        updateCartDisplay();
        
        console.log('Cart:', cart);
    });
});

function updateCartDisplay() {
    // This would update a cart display if you have one
    console.log(`Cart has ${cart.length} items`);
}

// Contact Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
        
        // In a real application, you would send this data to your server
        console.log('Contact form data:', data);
    });
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 26, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 26, 10, 0.95)';
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

// Observe sections for animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Theme switching functionality
function switchTheme(theme) {
    const body = document.body;
    const themes = ['classic-theme', 'business-theme', 'warm-theme', 'cool-theme', 'bold-theme'];
    
    // Remove all theme classes
    themes.forEach(t => body.classList.remove(t));
    
    // Add selected theme
    body.classList.add(theme);
    
    // Save theme preference
    localStorage.setItem('cafe-theme', theme);
}

// Load saved theme
const savedTheme = localStorage.getItem('cafe-theme');
if (savedTheme) {
    switchTheme(savedTheme);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Image lazy loading
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

// Auto-hide mobile menu on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
        // Scrolling down
        document.querySelector('.navbar').style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        document.querySelector('.navbar').style.transform = 'translateY(0)';
    }
    
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
});

// Add transition to navbar
document.querySelector('.navbar').style.transition = 'transform 0.3s ease';

// Contact form focus effects
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Feature cards animation on hover
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Menu items animation on hover
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Stats counter animation
const stats = document.querySelectorAll('.stat h3');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target;
            const text = stat.textContent;
            
            // Only animate if it's a number
            if (!isNaN(text)) {
                let count = 0;
                const target = parseInt(text);
                const increment = target / 50;
                
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        stat.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(count) + '+';
                    }
                }, 50);
            }
            
            statsObserver.unobserve(stat);
        }
    });
});

stats.forEach(stat => statsObserver.observe(stat));

// Add CSS for focus effects and animations
const style = document.createElement('style');
style.textContent = `
    .form-group.focused input,
    .form-group.focused textarea {
        border-color: var(--secondary-color);
        box-shadow: 0 0 0 3px rgba(143, 188, 143, 0.2);
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
    
    .feature-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .menu-item {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .btn-add {
        transition: all 0.3s ease;
    }
    
    .btn-add:active {
        transform: scale(0.95);
    }
`;
document.head.appendChild(style);

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set first tab as active by default
    const firstTab = document.querySelector('.tab-btn[data-category="coffee"]');
    const firstContent = document.getElementById('coffee');
    
    if (firstTab && firstContent) {
        firstTab.classList.add('active');
        firstContent.classList.add('active');
    }
});

// Search functionality (if you want to add it)
function searchMenu(query) {
    const menuItems = document.querySelectorAll('.menu-item');
    const searchQuery = query.toLowerCase();
    
    menuItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchQuery) || description.includes(searchQuery)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Add search input handler if you add a search box
const searchInput = document.getElementById('menu-search');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        searchMenu(this.value);
    });
}