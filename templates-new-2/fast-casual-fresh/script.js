// Fast Casual Fresh Website Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Menu category navigation
    const categoryBtns = document.querySelectorAll('.category-btn');
    const categorySections = document.querySelectorAll('.category-section');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            categorySections.forEach(section => {
                section.classList.remove('active');
                if (section.getAttribute('data-category') === category) {
                    section.classList.add('active');
                }
            });
            
            // Animate menu items
            const menuItems = document.querySelectorAll('.category-section.active .menu-item');
            menuItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
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
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.featured-item, .menu-item, .nutrition-feature').forEach(el => {
        observer.observe(el);
    });
    
    // Add to order functionality
    let cart = [];
    
    document.querySelectorAll('.btn-small').forEach(btn => {
        if (btn.textContent.includes('Add to Order')) {
            btn.addEventListener('click', function() {
                const item = this.closest('.featured-item, .menu-item');
                const name = item.querySelector('h3').textContent;
                const price = item.querySelector('.price, .item-price').textContent;
                
                // Add item to cart
                cart.push({ name, price });
                
                // Visual feedback
                this.textContent = 'Added!';
                this.style.background = 'var(--success-color)';
                
                setTimeout(() => {
                    this.textContent = 'Add to Order';
                    this.style.background = 'var(--primary-color)';
                }, 1500);
                
                // Update cart counter (if exists)
                updateCartCounter();
                
                // Show notification
                showNotification(`${name} added to cart!`);
            });
        }
    });
    
    function updateCartCounter() {
        const counter = document.querySelector('.cart-counter');
        if (counter) {
            counter.textContent = cart.length;
            counter.style.display = cart.length > 0 ? 'block' : 'none';
        }
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 600;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Highlight active navigation item
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Feature badge animations
    document.querySelectorAll('.feature-badge').forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.background = 'rgba(255, 255, 255, 0.15)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = 'rgba(255, 255, 255, 0.1)';
        });
    });
    
    // Nutrition feature hover effects
    document.querySelectorAll('.nutrition-feature').forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1.1)';
            icon.style.background = 'var(--secondary-color)';
        });
        
        feature.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1)';
            icon.style.background = 'var(--primary-color)';
        });
    });
    
    // Order button animations
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (this.classList.contains('btn-primary')) {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 8px 25px rgba(46, 204, 113, 0.3)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            if (this.classList.contains('btn-primary')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            }
        });
    });
    
    // Form handling (if contact form exists)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Initialize hero animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero h1, .hero-subtitle, .hero-description');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        // Animate feature badges
        setTimeout(() => {
            document.querySelectorAll('.feature-badge').forEach((badge, index) => {
                setTimeout(() => {
                    badge.style.opacity = '1';
                    badge.style.transform = 'translateY(0)';
                }, index * 150);
            });
        }, 600);
    }, 300);
    
    // Set initial styles for animations
    document.querySelectorAll('.hero h1, .hero-subtitle, .hero-description').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    document.querySelectorAll('.feature-badge').forEach(badge => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
        badge.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .featured-item, .menu-item, .nutrition-feature {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
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
`;
document.head.appendChild(style);

// Utility functions
function formatPrice(price) {
    return parseFloat(price.replace('$', '')).toFixed(2);
}

function getCartTotal() {
    return cart.reduce((total, item) => {
        return total + parseFloat(item.price.replace('$', ''));
    }, 0).toFixed(2);
}

function clearCart() {
    cart = [];
    updateCartCounter();
    showNotification('Cart cleared!');
}

// Export functions for potential use
window.FreshCasualApp = {
    cart,
    getCartTotal,
    clearCart,
    showNotification
};