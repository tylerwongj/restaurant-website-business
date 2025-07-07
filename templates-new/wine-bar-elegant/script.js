// Wine Bar Elegant Template JavaScript

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    });
});

// Form submission handling
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your reservation request! We will contact you shortly to confirm your table.');
        this.reset();
    });
});

// Wine category tabs functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        
        // Remove active class from all tabs and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        this.classList.add('active');
        document.getElementById(targetTab)?.classList.add('active');
    });
});

// Set minimum date for reservations (today)
const today = new Date().toISOString().split('T')[0];
document.querySelectorAll('input[type="date"]').forEach(input => {
    input.setAttribute('min', today);
});

// Scroll animations for wine cards and other elements
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

// Apply scroll animations to various elements
document.querySelectorAll('.wine-card, .tapas-category, .event-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Wine price hover effects
document.querySelectorAll('.wine-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.background = '#f7f5f3';
        this.style.transform = 'scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.background = 'transparent';
        this.style.transform = 'scale(1)';
    });
});

// Dynamic wine recommendations based on time of day
function updateWineRecommendations() {
    const now = new Date();
    const hour = now.getHours();
    
    // Evening recommendations (after 5 PM)
    if (hour >= 17) {
        document.querySelectorAll('.wine-card.featured .wine-badge').forEach(badge => {
            badge.textContent = 'Evening Pick';
        });
    }
    // Afternoon recommendations (12 PM - 5 PM)
    else if (hour >= 12) {
        document.querySelectorAll('.wine-card.featured .wine-badge').forEach(badge => {
            badge.textContent = 'Afternoon Special';
        });
    }
}

// Wine pairing suggestions
function addPairingSuggestions() {
    const wineCards = document.querySelectorAll('.wine-card');
    wineCards.forEach(card => {
        card.addEventListener('click', function() {
            const wineName = this.querySelector('h3').textContent;
            alert(`${wineName} pairs beautifully with our artisanal cheese selection. Ask your sommelier for specific recommendations!`);
        });
    });
}

// Event RSVP functionality (simplified)
document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', function() {
        const eventName = this.querySelector('h3').textContent;
        const confirmRSVP = confirm(`Would you like to RSVP for "${eventName}"? This will redirect you to our reservation form.`);
        if (confirmRSVP) {
            document.querySelector('#reservations').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Initialize functions
updateWineRecommendations();
addPairingSuggestions();

// Enable smooth scrolling for the whole document
document.documentElement.style.scrollBehavior = 'smooth';

// Wine glass animation on hover
document.querySelectorAll('.hero-features span').forEach(feature => {
    if (feature.textContent.includes('🍷')) {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(15deg) scale(1.1)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    }
});