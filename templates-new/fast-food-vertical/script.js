// Fast Food Vertical Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
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
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Order button functionality
    const orderButtons = document.querySelectorAll('.order-btn, .btn-order');
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real app, this would integrate with ordering system
            alert('Redirecting to ordering system...');
        });
    });
    
    // App download buttons
    const appButtons = document.querySelectorAll('.btn-app, .download-btn');
    appButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real app, this would redirect to app store
            alert('Redirecting to app store...');
        });
    });
    
    // Add to order functionality
    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-card');
            const itemName = menuItem.querySelector('h3').textContent;
            const itemPrice = menuItem.querySelector('.price').textContent;
            
            // Add visual feedback
            this.textContent = 'Added!';
            this.style.background = '#00a862';
            this.style.color = 'white';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.textContent = 'Add to Order';
                this.style.background = '';
                this.style.color = '';
            }, 2000);
            
            console.log(`Added ${itemName} (${itemPrice}) to order`);
        });
    });
    
    // Location finder functionality
    const locationInput = document.querySelector('.finder-input input');
    const findLocationBtn = document.querySelector('.finder-input .btn');
    
    if (findLocationBtn && locationInput) {
        findLocationBtn.addEventListener('click', function() {
            const location = locationInput.value.trim();
            if (location) {
                alert(`Searching for locations near: ${location}`);
                // In a real app, this would search for nearby locations
            } else {
                alert('Please enter a ZIP code or city.');
            }
        });
        
        // Allow enter key to trigger search
        locationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                findLocationBtn.click();
            }
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe product cards for animation
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        observer.observe(card);
    });
    
    // Value item hover effects
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
    
    // Promotional banner close functionality
    const topBanner = document.querySelector('.top-banner');
    if (topBanner) {
        // Add close button to banner
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = 'background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; margin-left: 1rem;';
        
        closeBtn.addEventListener('click', function() {
            topBanner.style.display = 'none';
            // Save preference in localStorage
            localStorage.setItem('bannerClosed', 'true');
        });
        
        // Check if banner was previously closed
        if (localStorage.getItem('bannerClosed') === 'true') {
            topBanner.style.display = 'none';
        } else {
            topBanner.querySelector('.container').appendChild(closeBtn);
        }
    }
    
    // Initialize animations CSS
    initAnimations();
    
    console.log('Fast Food Vertical Template initialized');
});

function initAnimations() {
    // Add CSS for animations
    if (!document.querySelector('#dynamic-styles')) {
        const style = document.createElement('style');
        style.id = 'dynamic-styles';
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
                transition: all 0.6s ease;
            }
            
            .product-card {
                opacity: 0;
                transform: translateY(30px);
            }
            
            .hamburger.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
            
            @media (max-width: 968px) {
                .nav-menu {
                    display: none;
                    position: fixed;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background: white;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    z-index: 1000;
                }
                
                .nav-menu.active {
                    display: flex;
                    flex-direction: column;
                    padding: 2rem;
                    gap: 1rem;
                }
                
                .nav-menu li {
                    text-align: center;
                }
                
                .nav-menu a {
                    display: block;
                    padding: 1rem;
                    border-bottom: 1px solid #eee;
                }
            }
            
            .product-card:hover .product-image img {
                transform: scale(1.05);
                transition: transform 0.3s ease;
            }
            
            .btn:active {
                transform: translateY(0) !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

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

// Theme switcher for different fast food brands
function switchBrand(brandName) {
    document.body.className = document.body.className.replace(/\w+-scheme/, '');
    document.body.classList.add(`${brandName}-scheme`);
    localStorage.setItem('preferred-brand', brandName);
}

// Load preferred brand theme
const preferredBrand = localStorage.getItem('preferred-brand');
if (preferredBrand) {
    switchBrand(preferredBrand);
}

// Cart functionality (basic)
let cart = [];

function addToCart(item) {
    cart.push(item);
    updateCartCount();
    console.log('Cart updated:', cart);
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function clearCart() {
    cart = [];
    updateCartCount();
}

// Make functions globally available
window.switchBrand = switchBrand;
window.addToCart = addToCart;
window.clearCart = clearCart;