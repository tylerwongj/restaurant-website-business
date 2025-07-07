// Family Diner Template JavaScript - Denny's Style

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
        alert('Thank you for your request! We will get back to you soon.');
        this.reset();
    });
});

// Menu tabs functionality
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

// Location finder functionality
const locationInput = document.querySelector('.location-input');
const locationButton = document.querySelector('.location-search .btn');

if (locationButton) {
    locationButton.addEventListener('click', function() {
        const location = locationInput.value.trim();
        if (location) {
            alert(`Searching for locations near ${location}...`);
        } else {
            alert('Please enter a city or zip code.');
        }
    });
}

// Scroll animations for special cards
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.special-card, .breakfast-category, .value-offer').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Enable smooth scrolling for the whole document
document.documentElement.style.scrollBehavior = 'smooth';

// Dynamic pricing updates (simulated)
function updateSpecialPricing() {
    const now = new Date();
    const hour = now.getHours();
    
    // Early bird special (6 AM - 10 AM)
    if (hour >= 6 && hour < 10) {
        document.querySelectorAll('.special-card').forEach(card => {
            const dayBadge = card.querySelector('.special-day');
            if (dayBadge && dayBadge.textContent === 'Today') {
                dayBadge.textContent = 'Early Bird';
                dayBadge.style.background = '#2d5016';
            }
        });
    }
}

// Run pricing update on page load
updateSpecialPricing();