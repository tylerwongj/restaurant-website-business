// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a nav link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
});

// Smooth Scrolling for Navigation Links
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

// Reservation Form Handling
document.querySelector('.reservation-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const date = formData.get('date');
    const time = formData.get('time');
    const guests = formData.get('guests');
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    
    if (date && time && guests && name && email && phone) {
        alert('Thank you for your reservation request. We will contact you within 24 hours to confirm your booking.');
        this.reset();
    } else {
        alert('Please fill in all required fields.');
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.award, .menu-option, .dining-option, .feature').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Color scheme switcher (for template customization)
function switchColorScheme(scheme) {
    const body = document.body;
    body.className = body.className.replace(/\w+-scheme/g, '');
    body.classList.add(scheme + '-scheme');
}

// Enhanced hover effects
document.querySelectorAll('.menu-option, .dining-option').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const img = this.querySelector('img');
        if (img) {
            img.style.filter = 'grayscale(0%)';
            img.style.transform = 'scale(1.05)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const img = this.querySelector('img');
        if (img) {
            img.style.filter = 'grayscale(10%)';
            img.style.transform = 'scale(1)';
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'var(--bg-light)';
        navbar.style.backdropFilter = 'none';
    }
});

// Form validation enhancement
document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = 'var(--border-light)';
        }
    });
    
    field.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(231, 76, 60)') {
            this.style.borderColor = 'var(--border-light)';
        }
    });
});

// Add elegant loading animation
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'loading-overlay';
    loader.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.remove();
    }, 2000);
}

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }
    
    .loading-spinner {
        text-align: center;
    }
    
    .spinner {
        border: 2px solid #f3f3f3;
        border-top: 2px solid var(--secondary-color);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .loading-spinner p {
        color: var(--text-secondary);
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
`;
document.head.appendChild(style);

// Initialize date picker with restrictions
const dateInput = document.getElementById('date');
if (dateInput) {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    
    // Set maximum date to 3 months from now
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    dateInput.max = maxDate.toISOString().split('T')[0];
}