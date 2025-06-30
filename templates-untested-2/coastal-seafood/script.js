// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--background-light)';
        navbar.style.backdropFilter = 'none';
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#e74c3c';
            } else {
                field.style.borderColor = 'var(--border-color)';
            }
        });
        
        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Thank you for your reservation! We will contact you soon to confirm your table by the water.');
            this.reset();
        } else {
            alert('Please fill out all required fields.');
        }
    });
}

// Daily specials date display
function updateSpecialsDate() {
    const today = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const formattedDate = today.toLocaleDateString('en-US', options);
    
    const specialsDate = document.getElementById('specials-date');
    if (specialsDate) {
        specialsDate.textContent = `Today is ${formattedDate}`;
    }
    
    // Highlight today's special
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    const specialItems = document.querySelectorAll('.special-item');
    
    specialItems.forEach(item => {
        const specialDay = item.querySelector('.special-day').textContent;
        if (specialDay === dayName || 
            (dayName === 'Saturday' || dayName === 'Sunday') && specialDay === 'Weekend') {
            item.style.border = '3px solid var(--primary-color)';
            item.style.transform = 'scale(1.05)';
            
            // Add "Today's Special" badge
            if (!item.querySelector('.today-badge')) {
                const badge = document.createElement('div');
                badge.className = 'today-badge';
                badge.textContent = "Today's Special!";
                badge.style.cssText = `
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    background: #e74c3c;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 15px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    animation: pulse 2s infinite;
                `;
                item.style.position = 'relative';
                item.appendChild(badge);
            }
        }
    });
}

// Market price updater (mock functionality)
function updateMarketPrices() {
    const marketPriceElements = document.querySelectorAll('.price');
    
    marketPriceElements.forEach(priceEl => {
        if (priceEl.textContent === 'Market Price') {
            // Mock market prices - in real app, this would be an API call
            const prices = ['$28', '$32', '$24', '$36', '$42'];
            const randomPrice = prices[Math.floor(Math.random() * prices.length)];
            
            // Add some visual indication that it's fresh pricing
            priceEl.innerHTML = `${randomPrice} <small style="color: var(--accent-color); font-size: 0.8em;">(Fresh Today)</small>`;
        }
    });
}

// Fresh catch ticker (mock functionality)
function createFreshCatchTicker() {
    const catchBanner = document.querySelector('.catch-banner');
    if (catchBanner) {
        const freshCatch = [
            'Just in: Fresh Atlantic Salmon',
            'Daily Special: Maine Lobster',
            'Fresh Today: Local Oysters', 
            'Catch of the Day: Red Snapper',
            'Just Arrived: Jumbo Shrimp'
        ];
        
        let currentIndex = 0;
        
        setInterval(() => {
            catchBanner.style.opacity = '0.5';
            setTimeout(() => {
                catchBanner.innerHTML = `<p>${freshCatch[currentIndex]} - Ask your server about today's special selections</p>`;
                catchBanner.style.opacity = '1';
                currentIndex = (currentIndex + 1) % freshCatch.length;
            }, 300);
        }, 4000);
    }
}

// Floating elements animation enhancement
function enhanceFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 20 - 10; // -10px to 10px
            const randomY = Math.random() * 20 - 10;
            element.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 2000 + index * 500);
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
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Wave animation on scroll
function createScrollWaves() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const waves = document.querySelectorAll('.wave');
        
        waves.forEach((wave, index) => {
            const speed = 0.5 + index * 0.1;
            wave.style.transform = `translateX(${scrolled * speed * 0.1}px)`;
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateSpecialsDate();
    updateMarketPrices();
    createFreshCatchTicker();
    enhanceFloatingElements();
    createScrollWaves();
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .menu-item, .special-item, .about-text, .contact-info');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add pulse animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});

// Special hover effects for menu items
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
        this.style.boxShadow = '0 15px 40px var(--shadow-medium)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 8px 25px var(--shadow-light)';
    });
});

// Add seating preference functionality
const seatingSelect = document.querySelector('select[name="seating"]');
if (seatingSelect) {
    seatingSelect.addEventListener('change', function() {
        const preference = this.value;
        const form = this.closest('form');
        
        // Add helpful information based on seating preference
        if (preference === 'waterfront') {
            if (!form.querySelector('.seating-info')) {
                const info = document.createElement('div');
                info.className = 'seating-info';
                info.style.cssText = 'padding: 10px; background: var(--accent-color); border-radius: 5px; margin-top: 10px; font-size: 0.9rem;';
                info.textContent = 'Waterfront tables have the best ocean views and may have a longer wait during sunset hours.';
                this.parentNode.appendChild(info);
            }
        } else {
            const existingInfo = form.querySelector('.seating-info');
            if (existingInfo) {
                existingInfo.remove();
            }
        }
    });
}

// Image lazy loading fallback
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lozad.js/1.16.0/lozad.min.js';
    document.head.appendChild(script);
    
    script.onload = () => {
        const lazyObserver = lozad();
        lazyObserver.observe();
    };
}