// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navActions = document.querySelector('.nav-actions');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navActions.classList.toggle('active');
    hamburger.classList.toggle('active');
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

// Sticky navigation color change
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Promo bar animation
const promoBar = document.querySelector('.promo-bar');
if (promoBar) {
    let isVisible = true;
    
    // Toggle promo bar visibility on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200 && isVisible) {
            promoBar.style.transform = 'translateY(-100%)';
            isVisible = false;
        } else if (window.scrollY <= 200 && !isVisible) {
            promoBar.style.transform = 'translateY(0)';
            isVisible = true;
        }
    });
}

// Menu item hover effects
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Promo card hover effects
document.querySelectorAll('.promo-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name') || document.querySelector('input[type="text"]').value;
        const email = formData.get('email') || document.querySelector('input[type="email"]').value;
        const message = formData.get('message') || document.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Show success message
        alert('Thank you for your message! We\'ll get back to you soon.');
        contactForm.reset();
    });
}

// Add to cart functionality (placeholder)
document.querySelectorAll('.btn-small').forEach(button => {
    if (button.textContent.includes('Add to Cart') || button.textContent.includes('Order Now')) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Find the item name
            const itemCard = button.closest('.menu-item, .promo-card');
            const itemName = itemCard.querySelector('h3').textContent;
            
            // Show confirmation
            button.textContent = 'Added!';
            button.style.background = '#4caf50';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                button.textContent = button.textContent.includes('Add') ? 'Add to Cart' : 'Order Now';
                button.style.background = '';
            }, 2000);
            
            // Show toast notification
            showToast(`${itemName} added to cart!`);
        });
    }
});

// Toast notification function
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 12px 24px;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Add CSS for toast animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .navbar.scrolled {
        background: rgba(26, 26, 26, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: var(--dark-bg);
        padding: 20px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    }
    
    .nav-actions.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        right: 0;
        background: var(--dark-bg);
        padding: 20px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
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
    
    .promo-bar {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

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

// Observe elements for animation
document.querySelectorAll('.menu-item, .promo-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Phone number formatting
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        // Track phone clicks for analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'phone_click', {
                event_category: 'contact',
                event_label: 'phone_number'
            });
        }
    });
});

// Performance optimization: Lazy loading images
document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
});

console.log('Casual Chain Promo template loaded successfully!');