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
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--background-color)';
        navbar.style.backdropFilter = 'none';
    }
});

// Form submission handlers
const eventsForm = document.querySelector('.events-form form');
if (eventsForm) {
    eventsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Show success message
        alert('Thank you for your event inquiry! We\'ll contact you within 24 hours to discuss your coffee catering needs.');
        
        // Reset form
        this.reset();
    });
}

// Coffee brewing animation
function animateBrewingProcess() {
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach((step, index) => {
        setTimeout(() => {
            step.style.animation = 'brewStep 0.8s ease forwards';
        }, index * 300);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Special animation for coffee process
            if (entry.target.classList.contains('coffee-process')) {
                animateBrewingProcess();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.menu-item, .process-step, .offering, .value, .contact-item').forEach(el => {
    observer.observe(el);
});

// Add animation CSS
const style = document.createElement('style');
style.textContent = `
    .menu-item,
    .process-step,
    .offering,
    .value,
    .contact-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    @keyframes brewStep {
        0% {
            transform: translateY(20px);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    /* Staggered animation delays */
    .menu-item:nth-child(1) { transition-delay: 0.1s; }
    .menu-item:nth-child(2) { transition-delay: 0.2s; }
    .menu-item:nth-child(3) { transition-delay: 0.3s; }
    
    .offering:nth-child(1) { transition-delay: 0.1s; }
    .offering:nth-child(2) { transition-delay: 0.2s; }
    .offering:nth-child(3) { transition-delay: 0.3s; }
    
    .value:nth-child(1) { transition-delay: 0.1s; }
    .value:nth-child(2) { transition-delay: 0.2s; }
    .value:nth-child(3) { transition-delay: 0.3s; }
`;
document.head.appendChild(style);

// Coffee bean falling animation for hero
function createCoffeeBeans() {
    const heroSection = document.querySelector('.hero');
    
    setInterval(() => {
        const bean = document.createElement('div');
        bean.className = 'coffee-bean';
        bean.style.left = Math.random() * 100 + '%';
        bean.innerHTML = '☕';
        heroSection.appendChild(bean);
        
        // Remove bean after animation
        setTimeout(() => {
            if (bean.parentNode) {
                bean.parentNode.removeChild(bean);
            }
        }, 4000);
    }, 2000);
}

// Add coffee bean animation CSS
const beanStyle = document.createElement('style');
beanStyle.textContent = `
    .coffee-bean {
        position: absolute;
        top: -50px;
        font-size: 1.5rem;
        animation: fallDown 4s linear forwards;
        pointer-events: none;
        z-index: 1;
        opacity: 0.3;
    }
    
    @keyframes fallDown {
        0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 0.3;
        }
        50% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(beanStyle);

// Start coffee bean animation on page load
window.addEventListener('load', () => {
    setTimeout(createCoffeeBeans, 2000);
});

// Hover effects for menu items
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.transition = 'all 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Coffee ordering simulation
document.querySelectorAll('.menu-item').forEach(item => {
    const button = document.createElement('button');
    button.className = 'order-btn';
    button.innerHTML = 'Quick Order';
    button.style.cssText = `
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        margin-top: 1rem;
        cursor: pointer;
        font-weight: 600;
        opacity: 0;
        transition: opacity 0.3s;
    `;
    
    item.addEventListener('mouseenter', () => {
        button.style.opacity = '1';
    });
    
    item.addEventListener('mouseleave', () => {
        button.style.opacity = '0';
    });
    
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const itemName = item.querySelector('h4').textContent;
        alert(`${itemName} added to your order! Call us at {{PHONE}} to complete your order.`);
    });
    
    const menuContent = item.querySelector('.menu-content');
    if (menuContent) {
        menuContent.appendChild(button);
    }
});

// Dynamic time-based greeting
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour < 12) {
        greeting = 'Good Morning! Start your day with fresh coffee ☕';
    } else if (hour < 17) {
        greeting = 'Good Afternoon! Perfect time for a coffee break ☕';
    } else {
        greeting = 'Good Evening! Unwind with our evening blends ☕';
    }
    
    // Add greeting banner
    const navbar = document.querySelector('.navbar');
    const greetingBanner = document.createElement('div');
    greetingBanner.className = 'greeting-banner';
    greetingBanner.innerHTML = greeting;
    greetingBanner.style.cssText = `
        background: var(--secondary-color);
        color: white;
        text-align: center;
        padding: 0.5rem;
        font-size: 0.9rem;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1001;
        animation: slideDown 0.5s ease;
    `;
    
    // Adjust navbar position
    navbar.style.top = greetingBanner.offsetHeight + 'px';
    
    document.body.insertBefore(greetingBanner, navbar);
    
    // Remove greeting after 5 seconds
    setTimeout(() => {
        greetingBanner.style.animation = 'slideUp 0.5s ease forwards';
        navbar.style.top = '0';
        setTimeout(() => {
            if (greetingBanner.parentNode) {
                greetingBanner.parentNode.removeChild(greetingBanner);
            }
        }, 500);
    }, 5000);
}

// Add slide animations for greeting
const greetingStyle = document.createElement('style');
greetingStyle.textContent = `
    @keyframes slideDown {
        from {
            transform: translateY(-100%);
        }
        to {
            transform: translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(-100%);
        }
    }
`;
document.head.appendChild(greetingStyle);

// Show greeting on page load
window.addEventListener('load', () => {
    setTimeout(updateGreeting, 1000);
});

// Coffee temperature indicator
function addTemperatureIndicators() {
    document.querySelectorAll('.badge.hot').forEach(badge => {
        badge.innerHTML = '🔥 Hot';
    });
    
    document.querySelectorAll('.badge.iced').forEach(badge => {
        badge.innerHTML = '🧊 Iced';
    });
}

// Initialize temperature indicators
document.addEventListener('DOMContentLoaded', addTemperatureIndicators);