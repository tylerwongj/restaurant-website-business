// Modern Cafe Template JavaScript

// Tab functionality
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            this.classList.add('active');
            const targetTab = this.getAttribute('data-tab');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Form handling
function setupForms() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('signup-form')) {
                alert('Welcome to our rewards program! Check your email for confirmation.');
            } else {
                alert('Thank you for your submission!');
            }
            
            this.reset();
        });
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Location finder
function setupLocationFinder() {
    const locationInput = document.querySelector('.location-input');
    const findButton = locationInput?.nextElementSibling;
    
    if (findButton) {
        findButton.addEventListener('click', function() {
            const location = locationInput.value.trim();
            if (location) {
                alert(`Finding stores near: ${location}`);
            } else {
                alert('Please enter a location');
            }
        });
    }
}

// Scroll animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.featured-item, .menu-item, .location-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    setupTabs();
    setupForms();
    setupLocationFinder();
    setupScrollAnimations();
    
    document.documentElement.style.scrollBehavior = 'smooth';
});

window.CafeTemplate = { setupTabs, setupForms };