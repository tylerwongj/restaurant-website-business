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

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--background-primary)';
        navbar.style.backdropFilter = 'none';
    }
});

// Promotional animation on scroll
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

// Observe promotional cards and menu items
document.querySelectorAll('.promo-card, .menu-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Price tag animation
const priceTag = document.querySelector('.price-tag');
if (priceTag) {
    setTimeout(() => {
        priceTag.style.animation = 'bounce 2s infinite';
    }, 1000);
}

// Add bounce animation to CSS if not already present
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }
    
    .promo-badge {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// Order button tracking (for analytics)
document.querySelectorAll('.btn-order, .btn-promo').forEach(button => {
    button.addEventListener('click', (e) => {
        // Track order button clicks
        const buttonText = e.target.textContent;
        const parentSection = e.target.closest('section').className;
        
        // Example: Send to analytics
        console.log(`Order button clicked: ${buttonText} in ${parentSection}`);
        
        // You can replace this with actual analytics tracking
        // gtag('event', 'click', {
        //     event_category: 'Order',
        //     event_label: buttonText,
        //     value: parentSection
        // });
    });
});

// Form validation (if contact form is added)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Newsletter signup (if added)
function handleNewsletterSignup(email) {
    if (validateEmail(email)) {
        // Handle newsletter signup
        console.log('Newsletter signup:', email);
        return true;
    }
    return false;
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.href && this.href.includes('#order')) {
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
            }, 2000);
        }
    });
});

// Promotional countdown timer (optional feature)
function createCountdownTimer(targetDate, elementId) {
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById(elementId).innerHTML = "OFFER EXPIRED";
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById(elementId).innerHTML = 
            `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

// Initialize countdown if element exists
const countdownElement = document.getElementById('countdown');
if (countdownElement) {
    // Set countdown to 7 days from now (example)
    const targetDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
    createCountdownTimer(targetDate, 'countdown');
}