// Asian Fusion Modern Template JavaScript

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your reservation request! We will contact you shortly to confirm.');
        this.reset();
    });
});

// Menu filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const menuCategories = document.querySelectorAll('.menu-category');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        // Show/hide menu categories based on filter
        menuCategories.forEach(category => {
            if (filter === 'all') {
                category.style.display = 'block';
            } else {
                const categoryName = category.getAttribute('data-category');
                if (categoryName === filter) {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            }
        });
    });
});

// Set minimum date for reservations (today)
const today = new Date().toISOString().split('T')[0];
document.querySelectorAll('input[type="date"]').forEach(input => {
    input.setAttribute('min', today);
});

// Scroll animations
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

// Apply scroll animations to various elements
document.querySelectorAll('.dish-card, .menu-category, .order-card, .point').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for hero stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat .number');
    counters.forEach(counter => {
        const text = counter.textContent;
        const hasPlus = text.includes('+');
        const targetValue = parseInt(text.replace('+', ''));
        
        if (isNaN(targetValue)) return;
        
        let currentValue = 0;
        const increment = targetValue / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                counter.textContent = targetValue + (hasPlus ? '+' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(currentValue) + (hasPlus ? '+' : '');
            }
        }, 30);
    });
}

// Trigger counter animation when hero stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
});

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Dish card hover effects
document.querySelectorAll('.dish-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Order card click handlers
document.querySelectorAll('.order-card').forEach(card => {
    const button = card.querySelector('.btn');
    card.addEventListener('click', function(e) {
        if (e.target !== button) {
            button.click();
        }
    });
});

// Philosophy points stagger animation
const philosophyPoints = document.querySelectorAll('.point');
philosophyPoints.forEach((point, index) => {
    point.style.animationDelay = `${index * 0.2}s`;
});

// Menu item hover effects
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.background = '#f5f5f5';
        this.style.padding = '1rem';
        this.style.borderRadius = '8px';
        this.style.transform = 'translateX(5px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.background = 'transparent';
        this.style.padding = '1rem 0';
        this.style.borderRadius = '0';
        this.style.transform = 'translateX(0)';
    });
});

// Image lazy loading effect
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    }
});

// Form validation enhancement
const reservationForm = document.querySelector('.reservation-form form');
if (reservationForm) {
    const inputs = reservationForm.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = '#dc143c';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#dc143c';
        });
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Dynamic time-based greeting
function updateTimeBasedContent() {
    const now = new Date();
    const hour = now.getHours();
    const menuSection = document.querySelector('.menu-section .section-header p');
    
    if (menuSection) {
        if (hour >= 5 && hour < 11) {
            menuSection.textContent = 'Start your morning with our breakfast selections';
        } else if (hour >= 11 && hour < 15) {
            menuSection.textContent = 'Discover our lunch specialties';
        } else if (hour >= 15 && hour < 18) {
            menuSection.textContent = 'Afternoon dining and tea service';
        } else {
            menuSection.textContent = 'Evening dining and signature cocktails';
        }
    }
}

// Initialize dynamic content
updateTimeBasedContent();

// Enable smooth scrolling for the whole document
document.documentElement.style.scrollBehavior = 'smooth';

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (this.getAttribute('href') && !this.getAttribute('href').startsWith('#')) {
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.style.opacity = '0.7';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
            }, 2000);
        }
    });
});