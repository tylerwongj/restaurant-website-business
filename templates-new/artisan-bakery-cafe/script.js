// Artisan Bakery Cafe Template JavaScript

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
        alert('Thank you for your inquiry! We will get back to you within 24 hours about your special order.');
        this.reset();
    });
});

// Bakery category tabs functionality
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

// Daily specials carousel auto-rotate
function rotateSpecials() {
    const specials = document.querySelectorAll('.special-item');
    let currentSpecial = 0;
    
    setInterval(() => {
        specials[currentSpecial].style.transform = 'scale(1)';
        specials[currentSpecial].style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        
        currentSpecial = (currentSpecial + 1) % specials.length;
        
        specials[currentSpecial].style.transform = 'scale(1.05)';
        specials[currentSpecial].style.boxShadow = '0 8px 30px rgba(139,69,19,0.2)';
    }, 3000);
}

// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

// Apply scroll animations to various elements
document.querySelectorAll('.special-item, .bakery-item, .catering-card, .highlight').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Bakery item hover effects with baking sounds simulation
document.querySelectorAll('.bakery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.boxShadow = '0 10px 30px rgba(139,69,19,0.2)';
        
        // Add warm glow effect
        const img = this.querySelector('img');
        if (img) {
            img.style.filter = 'brightness(1.1) contrast(1.1)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        
        const img = this.querySelector('img');
        if (img) {
            img.style.filter = 'brightness(1) contrast(1)';
        }
    });
});

// Fresh baking timer simulation
function updateBakingTimes() {
    const bakeTimeElements = document.querySelectorAll('.bake-time');
    bakeTimeElements.forEach(element => {
        const currentTime = element.textContent;
        if (currentTime.includes('Fresh')) {
            element.style.background = '#4caf50';
            element.style.color = 'white';
            element.style.animation = 'pulse 2s infinite';
        } else if (currentTime.includes('minutes')) {
            const minutes = parseInt(currentTime);
            if (minutes <= 30) {
                element.style.background = '#ff9800';
                element.style.color = 'white';
            }
        }
    });
}

// Daily specials availability tracker
function updateAvailability() {
    const availabilityElements = document.querySelectorAll('.availability');
    availabilityElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes('limited') || text.includes('few left')) {
            element.style.background = '#ff5722';
            element.style.color = 'white';
            element.style.animation = 'blink 1.5s infinite';
        } else if (text.includes('fresh') || text.includes('available')) {
            element.style.background = '#4caf50';
            element.style.color = 'white';
        }
    });
}

// Menu item interaction
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        const itemName = this.querySelector('h4').textContent;
        const itemPrice = this.querySelector('.price').textContent;
        
        // Create a subtle notification
        const notification = document.createElement('div');
        notification.textContent = `${itemName} - ${itemPrice} (Click to add to favorites!)`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bakery-secondary);
            color: var(--text-color);
            padding: 1rem;
            border-radius: 10px;
            z-index: 1000;
            font-weight: 600;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    });
});

// Catering card click handlers
document.querySelectorAll('.catering-card').forEach(card => {
    const button = card.querySelector('.btn');
    card.addEventListener('click', function(e) {
        if (e.target !== button && !button.contains(e.target)) {
            button.click();
        }
    });
});

// Fresh bread counter animation
function animateFreshCounter() {
    const counters = document.querySelectorAll('.hero-highlights .highlight span:last-child');
    counters.forEach(counter => {
        if (counter.textContent.includes('Fresh')) {
            let count = 0;
            const target = 8; // Number of fresh items
            const timer = setInterval(() => {
                if (count < target) {
                    count++;
                    counter.textContent = `${count} Fresh Daily`;
                } else {
                    clearInterval(timer);
                }
            }, 200);
        }
    });
}

// Ingredient freshness indicator
function addFreshnessIndicators() {
    const bakeryItems = document.querySelectorAll('.bakery-item');
    bakeryItems.forEach(item => {
        const description = item.querySelector('p');
        if (description && description.textContent.toLowerCase().includes('fresh')) {
            const freshnessIcon = document.createElement('span');
            freshnessIcon.innerHTML = ' 🌱';
            freshnessIcon.title = 'Made with fresh ingredients';
            description.appendChild(freshnessIcon);
        }
    });
}

// Order button enhancements
document.querySelectorAll('.btn').forEach(button => {
    if (button.textContent.includes('Order') || button.textContent.includes('Call')) {
        button.addEventListener('click', function() {
            if (this.href && this.href.startsWith('tel:')) {
                // Phone call confirmation
                const confirmed = confirm('Call to place your order? Our bakers are ready!');
                if (!confirmed) {
                    return false;
                }
            } else if (this.textContent.includes('Order Online')) {
                // Online order loading state
                const originalText = this.textContent;
                this.textContent = 'Connecting to bakery...';
                this.style.opacity = '0.7';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.opacity = '1';
                }, 2000);
            }
        });
    }
});

// Seasonal adjustments based on time
function applySeasonalTheme() {
    const month = new Date().getMonth();
    const seasonalItems = document.querySelectorAll('.special-item');
    
    // Fall/Winter seasonal items (Oct-Feb)
    if (month >= 9 || month <= 1) {
        seasonalItems.forEach(item => {
            const content = item.querySelector('h3');
            if (content && (content.textContent.includes('Pumpkin') || content.textContent.includes('Apple'))) {
                const seasonalBadge = document.createElement('div');
                seasonalBadge.innerHTML = '🍂 Seasonal';
                seasonalBadge.style.cssText = `
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    background: #ff6b35;
                    color: white;
                    padding: 0.3rem 0.8rem;
                    border-radius: 15px;
                    font-size: 0.7rem;
                    font-weight: 600;
                `;
                item.style.position = 'relative';
                item.appendChild(seasonalBadge);
            }
        });
    }
}

// Initialize all features
rotateSpecials();
updateBakingTimes();
updateAvailability();
animateFreshCounter();
addFreshnessIndicators();
applySeasonalTheme();

// Enable smooth scrolling for the whole document
document.documentElement.style.scrollBehavior = 'smooth';

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0.7; }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);