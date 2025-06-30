// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add to Order Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const addToOrderButtons = document.querySelectorAll('.item-card .btn');
    
    addToOrderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get item details
            const itemCard = this.closest('.item-card');
            const itemName = itemCard.querySelector('h3').textContent;
            const itemPrice = itemCard.querySelector('.price').textContent;
            
            // Show simple success message
            this.textContent = 'Added!';
            this.style.background = '#10b981';
            
            // Reset after 2 seconds
            setTimeout(() => {
                this.textContent = 'Add to Order';
                this.style.background = '';
            }, 2000);
            
            // In real implementation, you would:
            // - Add to cart/order system
            // - Update cart count
            // - Store in localStorage or send to server
            console.log(`Added ${itemName} (${itemPrice}) to order`);
        });
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.feedback-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Basic validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show success message
            alert('Thank you for your feedback! We\'ll get back to you soon.');
            this.reset();
            
            // In real implementation, send to server:
            // fetch('/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });
        });
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            navbar.style.background = '#ffffff';
            navbar.style.backdropFilter = 'none';
        }
    }
});

// Animate elements on scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animations for specific elements
                if (entry.target.classList.contains('item-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.item-card, .method-card, .benefit, .location-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Phone number formatting
function formatPhoneNumber(input) {
    const value = input.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    input.value = formattedValue;
}

// Apply phone formatting to phone inputs
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', () => formatPhoneNumber(input));
    });
});

// Hero badge animation
document.addEventListener('DOMContentLoaded', function() {
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
        // Pulse animation
        setInterval(() => {
            heroBadge.style.transform = 'scale(1.05)';
            setTimeout(() => {
                heroBadge.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }
});

// Item card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const itemCards = document.querySelectorAll('.item-card');
    
    itemCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const badge = this.querySelector('.item-badge');
            if (badge) {
                badge.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const badge = this.querySelector('.item-badge');
            if (badge) {
                badge.style.transform = 'scale(1)';
            }
        });
    });
});

// Color scheme switcher (for testing different color schemes)
function switchColorScheme(scheme) {
    const body = document.body;
    // Remove existing color classes
    body.classList.remove('color-classic', 'color-business', 'color-cool', 'color-bold');
    // Add new color class
    if (scheme !== 'orange') {
        body.classList.add(`color-${scheme}`);
    }
}

// Delivery app links (placeholder functionality)
document.addEventListener('DOMContentLoaded', function() {
    const appLinks = document.querySelectorAll('.app-link');
    
    appLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const appName = this.textContent;
            alert(`${appName} integration coming soon! Call us to order for delivery.`);
        });
    });
});

// Order method cards animation
document.addEventListener('DOMContentLoaded', function() {
    const methodCards = document.querySelectorAll('.method-card');
    
    methodCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.method-icon');
            icon.style.transform = 'rotate(5deg) scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.method-icon');
            icon.style.transform = 'rotate(0deg) scale(1)';
        });
    });
});

// Location actions
document.addEventListener('DOMContentLoaded', function() {
    const directionsBtn = document.querySelector('[href*="maps"]');
    const callBtn = document.querySelector('[href^="tel:"]');
    
    if (directionsBtn) {
        directionsBtn.addEventListener('click', function() {
            // Analytics tracking (placeholder)
            console.log('Directions clicked');
        });
    }
    
    if (callBtn) {
        callBtn.addEventListener('click', function() {
            // Analytics tracking (placeholder)
            console.log('Call button clicked');
        });
    }
});

// Quick order functionality (placeholder)
function quickOrder(itemName) {
    alert(`Quick order for ${itemName}! In a real app, this would start the ordering process.`);
}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        // Observe all images with data-src attribute
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => imageObserver.observe(img));
    }
});

// Simple cart counter (placeholder)
let cartCount = 0;

function updateCartCount() {
    // In a real app, this would update a cart counter in the navbar
    console.log(`Cart items: ${cartCount}`);
}

// Add some interactive feedback for order buttons
document.addEventListener('DOMContentLoaded', function() {
    const orderButtons = document.querySelectorAll('.btn-order, .btn[href="#order"]');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);