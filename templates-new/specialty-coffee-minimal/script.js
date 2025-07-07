// Specialty Coffee Minimal Template JavaScript

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

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

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255,255,255,0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255,255,255,0.95)';
        header.style.boxShadow = 'none';
    }
});

// Coffee category filtering
const categoryButtons = document.querySelectorAll('.category-btn');
const coffeeItems = document.querySelectorAll('.coffee-item');

categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        // Filter coffee items
        coffeeItems.forEach(item => {
            if (category === 'all') {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                const itemCategory = item.getAttribute('data-category');
                if (itemCategory === category) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            }
        });
    });
});

// Form submission handling
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form type
        const isContactForm = this.closest('.contact-form');
        const isSubscriptionForm = this.closest('.subscription');
        
        if (isContactForm) {
            alert('Thank you for your message! We will get back to you within 24 hours.');
        } else if (isSubscriptionForm) {
            alert('Welcome to our coffee subscription! Check your email for confirmation details.');
        } else {
            alert('Thank you for your submission!');
        }
        
        this.reset();
    });
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

// Apply scroll animations to elements
document.querySelectorAll('.coffee-item, .method, .plan, .location-card, .value').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Coffee item interactions
document.querySelectorAll('.coffee-item').forEach(item => {
    const addToCartBtn = item.querySelector('.btn-primary');
    const learnMoreBtn = item.querySelector('.btn-secondary');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const coffeeName = item.querySelector('h3').textContent;
            const price = item.querySelector('.price').textContent;
            
            // Simulate adding to cart
            const notification = document.createElement('div');
            notification.textContent = `${coffeeName} added to cart! ${price}`;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--coffee-accent);
                color: var(--coffee-primary);
                padding: 1rem;
                border-radius: 5px;
                z-index: 2000;
                font-weight: 600;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                animation: slideIn 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        });
    }
    
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            const coffeeName = item.querySelector('h3').textContent;
            const description = item.querySelector('.description').textContent;
            const origin = item.querySelector('.origin')?.textContent || 'Various origins';
            const notes = Array.from(item.querySelectorAll('.note')).map(note => note.textContent).join(', ');
            
            // Create modal-like display
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 3000;
                animation: fadeIn 0.3s ease;
            `;
            
            const modalContent = document.createElement('div');
            modalContent.style.cssText = `
                background: white;
                padding: 2rem;
                border-radius: 8px;
                max-width: 500px;
                width: 90%;
                position: relative;
            `;
            
            modalContent.innerHTML = `
                <span style="position: absolute; top: 10px; right: 15px; font-size: 24px; cursor: pointer; color: #666;">&times;</span>
                <h2 style="font-family: 'Crimson Text', serif; color: var(--coffee-primary); margin-bottom: 1rem;">${coffeeName}</h2>
                <p style="color: var(--coffee-gray); margin-bottom: 1rem; font-style: italic;"><strong>Origin:</strong> ${origin}</p>
                <p style="color: var(--coffee-gray); margin-bottom: 1rem;"><strong>Description:</strong> ${description}</p>
                <p style="color: var(--coffee-gray); margin-bottom: 1rem;"><strong>Tasting Notes:</strong> ${notes}</p>
                <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Add to Cart</button>
            `;
            
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            // Close modal functionality
            const closeBtn = modalContent.querySelector('span');
            const addToCartModalBtn = modalContent.querySelector('.btn-primary');
            
            closeBtn.addEventListener('click', () => modal.remove());
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.remove();
            });
            
            addToCartModalBtn.addEventListener('click', () => {
                addToCartBtn.click();
                modal.remove();
            });
        });
    }
});

// Subscription plan interactions
document.querySelectorAll('.plan .btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        const planName = this.closest('.plan').querySelector('h3').textContent;
        const planPrice = this.closest('.plan').querySelector('.price').textContent;
        
        // Simulate subscription signup
        const confirmed = confirm(`Start ${planName} subscription for ${planPrice}/month?`);
        if (confirmed) {
            alert(`Welcome to ${planName}! Check your email for setup instructions.`);
        }
    });
});

// Method guide interactions
document.querySelectorAll('.method-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const methodName = this.closest('.method').querySelector('h3').textContent;
        
        // Simulate opening brewing guide
        alert(`${methodName} brewing guide would open here. Check our blog for detailed instructions!`);
    });
});

// Enhanced coffee item hover effects
document.querySelectorAll('.coffee-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const img = this.querySelector('.coffee-image img');
        if (img) {
            img.style.filter = 'brightness(1.1) contrast(1.05)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const img = this.querySelector('.coffee-image img');
        if (img) {
            img.style.filter = 'brightness(1) contrast(1)';
        }
    });
});

// Dynamic time-based greeting in hero
function updateTimeBasedGreeting() {
    const now = new Date();
    const hour = now.getHours();
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroSubtitle) {
        if (hour >= 5 && hour < 12) {
            heroSubtitle.textContent = 'Start your morning right';
        } else if (hour >= 12 && hour < 17) {
            heroSubtitle.textContent = 'Afternoon coffee perfection';
        } else if (hour >= 17 && hour < 21) {
            heroSubtitle.textContent = 'Evening coffee moments';
        } else {
            heroSubtitle.textContent = 'Exceptional coffee, anytime';
        }
    }
}

// Random coffee fact display
const coffeeFacts = [
    "Coffee is the world's second-most traded commodity after oil",
    "Coffee berries are actually fruits that contain coffee beans",
    "The optimal brewing temperature is between 195°F and 205°F",
    "Coffee was first discovered in Ethiopia over 1,000 years ago",
    "A coffee tree can live and produce coffee for over 100 years"
];

function showRandomCoffeeFact() {
    const randomFact = coffeeFacts[Math.floor(Math.random() * coffeeFacts.length)];
    const factElement = document.createElement('div');
    factElement.textContent = `☕ Did you know? ${randomFact}`;
    factElement.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: var(--coffee-primary);
        color: white;
        padding: 1rem;
        border-radius: 5px;
        max-width: 300px;
        font-size: 0.9rem;
        z-index: 1500;
        animation: slideUp 0.5s ease;
        cursor: pointer;
    `;
    
    document.body.appendChild(factElement);
    
    factElement.addEventListener('click', () => factElement.remove());
    
    setTimeout(() => {
        if (factElement.parentNode) {
            factElement.remove();
        }
    }, 8000);
}

// Initialize dynamic content
updateTimeBasedGreeting();

// Show coffee fact after 10 seconds
setTimeout(showRandomCoffeeFact, 10000);

// Enable smooth scrolling for the whole document
document.documentElement.style.scrollBehavior = 'smooth';

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(button => {
    if (!button.closest('form')) {
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
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideUp {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        padding: 1rem;
        gap: 1rem;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);