// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'var(--bg-white)';
        navbar.style.backdropFilter = 'none';
    }
});

// Animated counters for offer badges
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.innerHTML = '$' + currentValue.toFixed(2);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate offer price if it exists
            const offerPrice = entry.target.querySelector('.offer-price');
            if (offerPrice) {
                const priceText = offerPrice.textContent.replace('$', '');
                const price = parseFloat(priceText);
                if (!isNaN(price)) {
                    animateValue(offerPrice, 0, price, 1000);
                }
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.offer-card, .menu-item, .benefit, .feature').forEach(el => {
    observer.observe(el);
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    .offer-card, .menu-item, .benefit, .feature {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .offer-card.animate, .menu-item.animate, .benefit.animate, .feature.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Contact form handling (if form exists)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send the data to a server
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Loyalty program signup
const loyaltyButton = document.querySelector('.loyalty-program .btn-primary');
if (loyaltyButton) {
    loyaltyButton.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Loyalty program signup feature coming soon!');
    });
}

// Order now button functionality
document.querySelectorAll('.order-btn, .btn-secondary').forEach(button => {
    if (button.textContent.includes('Order')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Online ordering feature coming soon! Please call us to place an order.');
        });
    }
});

// Menu item hover effects
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Offer card click tracking
document.querySelectorAll('.offer-card').forEach(card => {
    card.addEventListener('click', function() {
        const offerName = this.querySelector('h3').textContent;
        console.log('Offer clicked:', offerName);
        // Here you could track analytics or redirect to order page
    });
});

// Theme switcher (if implemented)
function changeColorScheme(scheme) {
    document.body.className = scheme;
    localStorage.setItem('colorScheme', scheme);
}

// Load saved color scheme
const savedScheme = localStorage.getItem('colorScheme');
if (savedScheme) {
    document.body.className = savedScheme;
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
});

// Add initial loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
`;
document.head.appendChild(loadingStyle);