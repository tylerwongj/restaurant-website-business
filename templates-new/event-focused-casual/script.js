// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const ctaButtons = document.querySelector('.cta-buttons');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            ctaButtons.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            ctaButtons.classList.remove('active');
            hamburger.classList.remove('active');
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

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Initialize event card animations
    initializeEventAnimations();
    
    // Initialize scroll animations
    initializeScrollAnimations();
});

// Newsletter form submission
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const location = formData.get('location');
    
    if (!email) {
        alert('Please enter your email address.');
        return;
    }
    
    // Show loading state
    const submitButton = e.target.querySelector('.btn-newsletter');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Subscribing...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        alert(`Thank you! You've been subscribed to updates${location ? ` for ${location}` : ''}.`);
        
        // Reset form
        e.target.reset();
        
        // In a real implementation, you would send this data to your server
        console.log('Newsletter subscription:', { email, location });
        
    }, 1500);
}

// Event card hover animations
function initializeEventAnimations() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        });
    });

    // Menu category hover animations
    const menuCategories = document.querySelectorAll('.menu-category');
    
    menuCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Location card hover animations
    const locationCards = document.querySelectorAll('.location-card');
    
    locationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.event-card, .menu-category, .location-card, .benefit');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'white';
        navbar.style.backdropFilter = 'none';
    }
});

// Event card click tracking
document.addEventListener('DOMContentLoaded', function() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        const button = card.querySelector('.btn');
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const eventName = card.querySelector('h3').textContent;
                
                // Track event click (replace with actual analytics)
                console.log('Event clicked:', eventName);
                
                // Show more info or redirect (customize as needed)
                alert(`More information about ${eventName} coming soon!`);
            });
        }
    });
});

// Rewards program interactions
document.addEventListener('DOMContentLoaded', function() {
    const rewardsButton = document.querySelector('.btn-rewards');
    
    if (rewardsButton) {
        rewardsButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Track rewards click
            console.log('Rewards program clicked');
            
            // Show signup form or redirect
            alert('Rewards program signup coming soon! Join today and start earning points on every visit.');
        });
    }
});

// Location interactions
document.addEventListener('DOMContentLoaded', function() {
    const locationCards = document.querySelectorAll('.location-card');
    
    locationCards.forEach(card => {
        const directionsBtn = card.querySelector('.btn-outline');
        const orderBtn = card.querySelector('.btn-primary');
        
        if (directionsBtn) {
            directionsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const locationName = card.querySelector('h3').textContent;
                const address = card.querySelector('.address').textContent;
                
                // Open maps (replace with actual implementation)
                console.log('Get directions to:', locationName, address);
                alert(`Opening directions to ${locationName} at ${address}`);
            });
        }
        
        if (orderBtn) {
            orderBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const locationName = card.querySelector('h3').textContent;
                
                // Open online ordering (replace with actual implementation)
                console.log('Order online from:', locationName);
                alert(`Opening online ordering for ${locationName}`);
            });
        }
    });
});

// Menu category interactions
document.addEventListener('DOMContentLoaded', function() {
    const menuCategories = document.querySelectorAll('.menu-category');
    
    menuCategories.forEach(category => {
        const button = category.querySelector('.btn-menu');
        
        if (button) {
            button.addEventListener('click', function(e) {
                const categoryName = category.querySelector('h3').textContent;
                console.log('Menu category clicked:', categoryName);
                
                // Navigate to menu page with category (replace href as needed)
                // This is handled by the actual href in the HTML
            });
        }
    });
});

// Dynamic event badge animations
document.addEventListener('DOMContentLoaded', function() {
    const eventBadges = document.querySelectorAll('.event-badge');
    
    eventBadges.forEach(badge => {
        // Add pulse animation for special events
        if (badge.classList.contains('special-badge')) {
            badge.style.animation = 'pulse 2s infinite';
        }
    });
});

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: white;
        box-shadow: var(--shadow);
        padding: 1rem;
        gap: 1rem;
    }
    
    .cta-buttons.active {
        display: block;
        position: absolute;
        top: 100%;
        right: 0;
        background-color: white;
        padding: 1rem;
        box-shadow: var(--shadow);
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
`;
document.head.appendChild(style);