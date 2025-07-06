// Fast Casual Modern Template JavaScript

// Top Banner Management
const topBanner = document.querySelector('.top-banner');
const navbar = document.querySelector('.navbar');
const bannerClose = document.querySelector('.banner-close');

// Show/hide banner
bannerClose?.addEventListener('click', () => {
    topBanner.style.display = 'none';
    navbar.classList.remove('banner-visible');
});

// Initialize banner visibility
if (topBanner) {
    navbar.classList.add('banner-visible');
}

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

// Category Card Interactions
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Build Your Own Step Options
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function() {
        // Remove active class from siblings
        const siblings = this.parentElement.querySelectorAll('.option');
        siblings.forEach(sibling => sibling.classList.remove('active'));
        
        // Add active class to clicked option
        this.classList.add('active');
        
        // Add animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Location Finder
const locationInput = document.querySelector('.location-input');
const findBtn = document.querySelector('.btn-find');

findBtn?.addEventListener('click', function() {
    const location = locationInput.value.trim();
    
    if (!location) {
        showNotification('Please enter a location to search', 'warning');
        return;
    }
    
    // Simulate search
    showNotification(`Searching for locations near ${location}...`, 'info');
    
    // Mock results
    setTimeout(() => {
        showNotification('Found 5 locations near you!', 'success');
        // In real implementation, update the locations grid with results
    }, 1500);
});

// Order buttons functionality
document.querySelectorAll('.btn-category, .btn[href="#order"]').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#order') {
            e.preventDefault();
            showNotification('Redirecting to online ordering...', 'info');
            // In real implementation, redirect to ordering system
        } else if (this.classList.contains('btn-category')) {
            e.preventDefault();
            const categoryName = this.closest('.category-card').querySelector('h3').textContent;
            showNotification(`Building your ${categoryName}...`, 'info');
            // In real implementation, open build interface
        }
    });
});

// App download tracking
document.querySelectorAll('.app-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.querySelector('img').alt.includes('App Store') ? 'iOS' : 'Android';
        showNotification(`Redirecting to ${platform} app store...`, 'info');
        // In real implementation, redirect to actual app stores
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.category-card, .step, .featured-item, .location-item, .app-feature'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});

// Step number animations
document.querySelectorAll('.step-number').forEach((number, index) => {
    setTimeout(() => {
        number.style.transform = 'scale(1.2)';
        number.style.backgroundColor = 'var(--accent)';
        number.style.color = 'var(--text)';
        
        setTimeout(() => {
            number.style.transform = 'scale(1)';
            number.style.backgroundColor = 'var(--primary)';
            number.style.color = 'white';
        }, 300);
    }, index * 500 + 1000);
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background img');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'var(--background)';
        navbar.style.backdropFilter = 'none';
    }
});

// Featured item hover effects
document.querySelectorAll('.featured-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const image = this.querySelector('.featured-image img');
        image.style.transform = 'scale(1.1)';
    });
    
    item.addEventListener('mouseleave', function() {
        const image = this.querySelector('.featured-image img');
        image.style.transform = 'scale(1)';
    });
});

// Category card featured animation
const featuredCard = document.querySelector('.category-card.featured');
if (featuredCard) {
    setInterval(() => {
        featuredCard.style.transform = 'translateY(-8px) scale(1.02)';
        setTimeout(() => {
            featuredCard.style.transform = 'translateY(-8px) scale(1)';
        }, 1000);
    }, 3000);
}

// Interactive build steps
document.querySelectorAll('.step').forEach((step, index) => {
    step.addEventListener('click', function() {
        // Highlight the step
        document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        
        // Show step details
        const stepNumber = index + 1;
        showNotification(`Step ${stepNumber}: Choose your options below`, 'info');
    });
});

// Location card interactions
document.querySelectorAll('.location-item').forEach(item => {
    item.addEventListener('click', function(e) {
        if (!e.target.classList.contains('btn')) {
            // Highlight selected location
            document.querySelectorAll('.location-item').forEach(loc => loc.classList.remove('selected'));
            this.classList.add('selected');
            
            const locationName = this.querySelector('h3').textContent;
            showNotification(`Selected ${locationName}`, 'success');
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
        top: ${topBanner && topBanner.style.display !== 'none' ? '130px' : '100px'};
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        word-wrap: break-word;
        box-shadow: var(--shadow-medium);
    `;
    
    // Set background color based on type
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#ff9800',
        info: 'var(--primary)'
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

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from { 
            opacity: 0; 
            transform: translateY(30px); 
        }
        to { 
            opacity: 1; 
            transform: translateY(0); 
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .option.active {
        background-color: var(--primary) !important;
        color: white !important;
        border-color: var(--primary) !important;
    }
    
    .step.active .step-number {
        background-color: var(--accent) !important;
        color: var(--text) !important;
        transform: scale(1.1);
    }
    
    .location-item.selected {
        border: 2px solid var(--primary);
        transform: translateY(-5px);
        box-shadow: var(--shadow-heavy);
    }
    
    .category-card {
        transition: all 0.3s ease;
    }
    
    .featured-image img {
        transition: transform 0.3s ease;
    }
    
    .step-number {
        transition: all 0.3s ease;
    }
`;

document.head.appendChild(style);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add loading complete class
    document.body.classList.add('loaded');
    
    // Show welcome message for new visitors
    if (!sessionStorage.getItem('welcomed')) {
        setTimeout(() => {
            showNotification('Welcome! Start building your perfect meal!', 'info');
            sessionStorage.setItem('welcomed', 'true');
        }, 2000);
    }
    
    // Initialize lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Handle form submissions (if any)
document.addEventListener('submit', function(e) {
    const form = e.target;
    
    if (form.classList.contains('newsletter-form') || form.classList.contains('contact-form')) {
        e.preventDefault();
        showNotification('Thank you! We\'ll be in touch soon.', 'success');
        form.reset();
    }
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        
        // Close any notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());
    }
});