// Minimalist Clean Restaurant Template - JavaScript

// Mobile Navigation
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
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

// Form submission handler
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });
        
        // Simple validation
        if (!formDataObj.name || !formDataObj.email || !formDataObj.phone || 
            !formDataObj.date || !formDataObj.time || !formDataObj.guests) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formDataObj.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Date validation (not in the past)
        const selectedDate = new Date(formDataObj.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert('Please select a future date.');
            return;
        }
        
        // Success message
        alert('Thank you for your reservation request! We will contact you soon to confirm.');
        
        // Reset form
        this.reset();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Color scheme switcher (for testing purposes)
function switchColorScheme(scheme) {
    const body = document.body;
    const schemes = ['color-scheme-business', 'color-scheme-warm', 'color-scheme-cool', 'color-scheme-bold'];
    
    // Remove all existing schemes
    schemes.forEach(s => body.classList.remove(s));
    
    // Add new scheme if provided
    if (scheme && scheme !== 'default') {
        body.classList.add(`color-scheme-${scheme}`);
    }
}

// Add color scheme switcher to page (for demo purposes)
document.addEventListener('DOMContentLoaded', () => {
    const colorSchemeSwitcher = document.createElement('div');
    colorSchemeSwitcher.innerHTML = `
        <div style="position: fixed; top: 100px; right: 20px; z-index: 1001; background: white; padding: 10px; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <label style="display: block; margin-bottom: 5px; font-size: 12px;">Color Scheme:</label>
            <select id="colorSchemeSelector" style="width: 100%; padding: 5px; font-size: 12px;">
                <option value="default">Default</option>
                <option value="business">Business</option>
                <option value="warm">Warm</option>
                <option value="cool">Cool</option>
                <option value="bold">Bold</option>
            </select>
        </div>
    `;
    
    document.body.appendChild(colorSchemeSwitcher);
    
    const selector = document.getElementById('colorSchemeSelector');
    selector.addEventListener('change', (e) => {
        switchColorScheme(e.target.value);
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});