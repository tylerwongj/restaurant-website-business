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
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Contact form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send the data to your server
        // For now, we'll just show a success message
        alert('Thank you for your message! We\'ll get back to you soon.');
        this.reset();
    });
}

// Special card hover effects
document.querySelectorAll('.special-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Order button functionality
document.querySelectorAll('.btn-order').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        // Add ordering functionality here
        alert('Order functionality would be integrated with your POS system');
    });
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

// Apply animation to sections
document.querySelectorAll('.special-card, .event-card, .promo-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Promotional banner click tracking
document.querySelectorAll('.promo-card, .special-card').forEach(card => {
    card.addEventListener('click', function() {
        // Track promotional clicks for analytics
        console.log('Promotional content clicked:', this.querySelector('h3')?.textContent);
    });
});

// Dynamic content loading for specials (placeholder)
function loadDailySpecials() {
    // This would typically fetch from an API
    const specials = [
        { name: 'Wing Wednesday', price: '$0.75 each', image: 'wings.jpg' },
        { name: 'Burger & Beer', price: '$12.99', image: 'burger.jpg' },
        { name: 'Taco Tuesday', price: '$2.50 each', image: 'tacos.jpg' },
        { name: 'Pizza Monday', price: '$8.99', image: 'pizza.jpg' }
    ];
    
    // Update special cards with fresh content
    // Implementation would depend on your content management system
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add any initialization code here
    console.log('Sports Bar template loaded successfully');
    
    // Optional: Load daily specials
    // loadDailySpecials();
});

// Rewards program signup
document.querySelectorAll('.btn-rewards').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        // Integrate with rewards system
        alert('Rewards program signup would open here');
    });
});

// Event registration
document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', function() {
        const eventTitle = this.querySelector('h3').textContent;
        alert(`More info about ${eventTitle} would be displayed here`);
    });
});

// Social media sharing (optional)
function shareOnSocial(platform, text, url) {
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);
    
    let shareUrl = '';
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
            break;
        case 'instagram':
            // Instagram doesn't support direct URL sharing
            alert('Share this on Instagram by taking a screenshot!');
            return;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}