// Casual Chain Promotions Template JavaScript

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
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

// Menu Category Filter
const categoryBtns = document.querySelectorAll('.category-btn');
const menuItems = document.querySelectorAll('.menu-item');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryBtns.forEach(button => button.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        
        // Filter menu items
        menuItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Add to Cart functionality
document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get item details
        const menuItem = this.closest('.menu-item');
        const itemName = menuItem.querySelector('h3').textContent;
        const itemPrice = menuItem.querySelector('.price').textContent;
        
        // Show success message
        showNotification(`${itemName} added to cart!`, 'success');
        
        // Animate button
        this.style.transform = 'scale(0.95)';
        this.textContent = 'Added!';
        this.style.backgroundColor = 'var(--success)';
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            this.textContent = 'Add to Cart';
            this.style.backgroundColor = '';
        }, 1500);
    });
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Show success message
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    
    // Reset form
    this.reset();
});

// Location Search
const locationInput = document.querySelector('.location-input');
const searchBtn = document.querySelector('.btn-search');

searchBtn?.addEventListener('click', function() {
    const searchTerm = locationInput.value.trim();
    
    if (!searchTerm) {
        showNotification('Please enter a location to search', 'warning');
        return;
    }
    
    // Simulate search (in real implementation, this would make an API call)
    showNotification(`Searching for locations near ${searchTerm}...`, 'info');
    
    // Mock search results after delay
    setTimeout(() => {
        showNotification('Found 3 locations near you!', 'success');
    }, 1500);
});

// Promo card hover effects
document.querySelectorAll('.promo-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe promotional cards and menu items
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.promo-card, .menu-item, .location-card, .benefit'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Rewards program interactions
document.querySelectorAll('.benefit').forEach((benefit, index) => {
    benefit.style.animationDelay = `${index * 0.2}s`;
    
    benefit.addEventListener('click', function() {
        const icon = this.querySelector('.benefit-icon');
        icon.style.transform = 'scale(1.3) rotate(360deg)';
        icon.style.transition = 'transform 0.6s ease';
        
        setTimeout(() => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }, 600);
    });
});

// Promotional badge animations
document.querySelectorAll('.promo-badge').forEach(badge => {
    // Pulse animation for featured promos
    if (badge.textContent === 'LIMITED TIME') {
        setInterval(() => {
            badge.style.transform = 'scale(1.1)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 500);
        }, 2000);
    }
});

// Location card click to call functionality
document.querySelectorAll('.btn-call').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const phone = this.getAttribute('href').replace('tel:', '');
        
        // For mobile devices, the tel: link will work
        // For desktop, show a notification
        if (!window.matchMedia('(max-width: 768px)').matches) {
            showNotification(`Call ${phone}`, 'info');
        }
    });
});

// Utility function for notifications
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 5px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Cart counter (mock functionality)
let cartCount = 0;
const updateCartDisplay = () => {
    // In a real implementation, this would update a cart counter in the nav
    console.log(`Cart items: ${cartCount}`);
};

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background img');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-in {
        animation: fadeIn 0.6s ease forwards;
    }
    
    .promo-card {
        transition: all 0.3s ease;
    }
    
    .menu-item {
        transition: all 0.3s ease;
    }
`;

document.head.appendChild(style);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add loading states
    document.body.classList.add('loaded');
    
    // Initialize any lazy-loaded images
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
    
    // Show welcome message for first-time visitors
    if (!localStorage.getItem('visited')) {
        setTimeout(() => {
            showNotification('Welcome! Check out our current promotions!', 'info');
            localStorage.setItem('visited', 'true');
        }, 2000);
    }
});