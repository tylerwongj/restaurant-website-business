// Fast Casual Template JavaScript - Chipotle Inspired

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 90; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Location finder functionality
    const locationInput = document.querySelector('.location-input');
    const findButton = document.querySelector('.finder-form .btn');

    if (findButton && locationInput) {
        findButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleLocationSearch();
        });

        locationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleLocationSearch();
            }
        });
    }

    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize order tracking
    initOrderTracking();
});

// Handle location search
function handleLocationSearch() {
    const locationInput = document.querySelector('.location-input');
    const searchTerm = locationInput.value.trim();
    
    if (!searchTerm) {
        showMessage('Please enter an address or zip code', 'error');
        return;
    }
    
    // Simulate location search
    const findButton = document.querySelector('.finder-form .btn');
    const originalText = findButton.textContent;
    
    findButton.textContent = 'Searching...';
    findButton.disabled = true;
    
    setTimeout(() => {
        findButton.textContent = originalText;
        findButton.disabled = false;
        
        showMessage(`Found 5 locations near "${searchTerm}"`, 'success');
        
        // Scroll to locations
        const locationsSection = document.querySelector('.featured-locations');
        if (locationsSection) {
            locationsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 1500);
}

// Initialize order tracking
function initOrderTracking() {
    // Track clicks on order buttons
    document.querySelectorAll('.btn[href*="order"], .category-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const orderType = this.textContent.toLowerCase();
            trackOrderStart(orderType);
        });
    });
}

// Track order start
function trackOrderStart(orderType) {
    showMessage(`Starting ${orderType} order...`, 'info');
    
    // Simulate order flow
    setTimeout(() => {
        showMessage('Order system would launch here!', 'success');
    }, 1000);
}

// Show messages to user
function showMessage(message, type = 'info') {
    // Remove any existing messages
    const existingMessage = document.querySelector('.message-popup');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message-popup ${type}`;
    messageEl.textContent = message;
    
    // Style the message
    Object.assign(messageEl.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '4px',
        color: 'white',
        zIndex: '3000',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.9rem',
        fontWeight: '600',
        maxWidth: '350px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease'
    });
    
    // Set background color based on type
    if (type === 'success') {
        messageEl.style.backgroundColor = '#7cb342';
    } else if (type === 'error') {
        messageEl.style.backgroundColor = '#a81612';
    } else {
        messageEl.style.backgroundColor = '#e4572e';
    }
    
    // Add to page
    document.body.appendChild(messageEl);
    
    // Animate in
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        messageEl.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 300);
    }, 4000);
}

// Initialize scroll animations
function initScrollAnimations() {
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .order-option,
        .menu-category,
        .value-item,
        .location-card
    `);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Close mobile menu if open when resizing to desktop
    if (window.innerWidth > 768) {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'var(--background-main)';
            navbar.style.backdropFilter = 'none';
        }
    }
});

// Enhanced hover effects for menu categories
document.addEventListener('DOMContentLoaded', function() {
    const menuCategories = document.querySelectorAll('.menu-category');
    
    menuCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 25px rgba(168, 22, 18, 0.15)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Order option interactions
document.addEventListener('DOMContentLoaded', function() {
    const orderOptions = document.querySelectorAll('.order-option');
    
    orderOptions.forEach(option => {
        const button = option.querySelector('.btn');
        
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Add visual feedback
                option.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    option.style.transform = 'translateY(-5px)';
                }, 100);
                
                // Get order type from heading
                const heading = option.querySelector('h3');
                const orderType = heading ? heading.textContent : 'order';
                
                showMessage(`Redirecting to ${orderType.toLowerCase()} ordering...`, 'info');
            });
        }
    });
});

// Rewards section interaction
document.addEventListener('DOMContentLoaded', function() {
    const joinButton = document.querySelector('.rewards-section .btn-primary');
    
    if (joinButton) {
        joinButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            showMessage('Rewards signup would open here!', 'success');
            
            // Animate benefits
            const benefits = document.querySelectorAll('.benefit');
            benefits.forEach((benefit, index) => {
                setTimeout(() => {
                    benefit.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        benefit.style.transform = 'scale(1)';
                    }, 200);
                }, index * 100);
            });
        });
    }
});