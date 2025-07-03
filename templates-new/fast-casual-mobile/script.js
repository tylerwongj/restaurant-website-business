// Fast Casual Mobile-First Template JavaScript

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
    
    // Menu Category Filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            // Filter menu items
            menuItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                } else {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // Add to Order Functionality
    const addButtons = document.querySelectorAll('.btn-add');
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item') || this.closest('.product-card');
            const itemName = menuItem.querySelector('h3, h4').textContent;
            
            // Visual feedback
            this.textContent = 'Added!';
            this.style.background = 'var(--accent)';
            this.style.color = 'white';
            
            // Show notification
            showNotification(`${itemName} added to order!`);
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.textContent = 'Add';
                this.style.background = '';
                this.style.color = '';
            }, 2000);
        });
    });
    
    // Deal Card Interactions
    const dealButtons = document.querySelectorAll('.btn-deal');
    dealButtons.forEach(button => {
        button.addEventListener('click', function() {
            const dealCard = this.closest('.deal-card');
            const dealName = dealCard.querySelector('h3').textContent;
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            showNotification(`${dealName} deal claimed!`);
        });
    });
    
    // Location Search
    const locationForm = document.querySelector('.search-box');
    if (locationForm) {
        const searchButton = locationForm.querySelector('.btn-primary');
        const locationInput = locationForm.querySelector('.location-input');
        
        if (searchButton && locationInput) {
            searchButton.addEventListener('click', function(e) {
                e.preventDefault();
                const query = locationInput.value.trim();
                
                if (query) {
                    // Show loading state
                    this.textContent = 'Searching...';
                    this.disabled = true;
                    
                    // Simulate search delay
                    setTimeout(() => {
                        showNotification(`Found 3 locations near ${query}`);
                        this.textContent = 'Search';
                        this.disabled = false;
                    }, 1500);
                } else {
                    showNotification('Please enter your city or ZIP code');
                }
            });
            
            // Enter key support
            locationInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchButton.click();
                }
            });
        }
    }
    
    // Newsletter Signup
    const newsletterSignup = document.querySelector('.newsletter-signup');
    if (newsletterSignup) {
        const emailInput = newsletterSignup.querySelector('.newsletter-input');
        const signupButton = newsletterSignup.querySelector('.btn');
        
        if (emailInput && signupButton) {
            signupButton.addEventListener('click', function(e) {
                e.preventDefault();
                const email = emailInput.value.trim();
                
                if (email && isValidEmail(email)) {
                    showNotification('Thanks for signing up for exclusive deals!');
                    emailInput.value = '';
                } else {
                    showNotification('Please enter a valid email address');
                }
            });
        }
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight + 
                                document.querySelector('.quick-action-bar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Quick Action Bar interactions
    const quickBtns = document.querySelectorAll('.quick-btn');
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Remove active class from all quick buttons
            quickBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Floating Order Button
    const floatingBtn = document.querySelector('.floating-btn');
    if (floatingBtn) {
        floatingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Starting your order...');
            
            // Scroll to menu section
            const menuSection = document.querySelector('#menu');
            if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // App Store Button Tracking
    const appStoreButtons = document.querySelectorAll('.app-store-btn');
    appStoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const store = this.href.includes('apple') ? 'App Store' : 'Google Play';
            showNotification(`Redirecting to ${store}...`);
        });
    });
    
    // Scroll effects
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    const quickActionBar = document.querySelector('.quick-action-bar');
    
    window.addEventListener('scroll', debounce(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar background effect
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'var(--background)';
            navbar.style.boxShadow = '0 2px 10px var(--shadow)';
        }
        
        // Hide/show floating button based on scroll
        const floatingOrderBtn = document.querySelector('.floating-order-btn');
        if (floatingOrderBtn) {
            if (scrollTop > 300) {
                floatingOrderBtn.style.opacity = '1';
                floatingOrderBtn.style.pointerEvents = 'auto';
            } else {
                floatingOrderBtn.style.opacity = '0';
                floatingOrderBtn.style.pointerEvents = 'none';
            }
        }
        
        lastScrollTop = scrollTop;
    }, 100));
    
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
    const animateElements = document.querySelectorAll('.product-card, .deal-card, .menu-item, .location-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add dynamic styles
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
        }
        
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .product-card,
        .deal-card,
        .menu-item,
        .location-card {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .floating-order-btn {
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize floating button state
    const floatingOrderBtn = document.querySelector('.floating-order-btn');
    if (floatingOrderBtn) {
        floatingOrderBtn.style.opacity = '0';
        floatingOrderBtn.style.pointerEvents = 'none';
    }
});

// Utility Functions
function showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--secondary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 25px;
        font-weight: 600;
        z-index: 2000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

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

// Order tracking simulation
let orderItems = [];

function addToOrder(item) {
    orderItems.push(item);
    updateOrderCount();
    showNotification(`${item.name} added to order!`);
}

function updateOrderCount() {
    const orderCount = document.querySelector('.order-count');
    if (orderCount) {
        orderCount.textContent = orderItems.length;
        orderCount.style.display = orderItems.length > 0 ? 'inline' : 'none';
    }
}

// Performance optimization
function lazyLoadImages() {
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
}

// Initialize lazy loading if needed
lazyLoadImages();

// Error handling for failed image loads
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
    }
}, true);

console.log('Fast Casual Mobile Template initialized');