// Coastal Seafood Restaurant Template JavaScript

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
        alert('Thank you for your reservation! We will contact you shortly to confirm your waterfront table.');
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

// Set minimum date for reservations (today)
const today = new Date().toISOString().split('T')[0];
document.querySelectorAll('input[type="date"]').forEach(input => {
    input.setAttribute('min', today);
});

// Daily catch price updates (simulated market pricing)
function updateMarketPrices() {
    const catchCards = document.querySelectorAll('.catch-card');
    catchCards.forEach(card => {
        const badge = card.querySelector('.catch-badge');
        if (badge && badge.textContent === 'Market Price') {
            const priceElement = card.querySelector('.catch-price');
            if (priceElement) {
                // Simulate price fluctuation
                const basePrice = parseFloat(priceElement.textContent.replace('$', '').replace('/lb', ''));
                if (!isNaN(basePrice)) {
                    const fluctuation = (Math.random() - 0.5) * 2; // ±$1 variation
                    const newPrice = (basePrice + fluctuation).toFixed(2);
                    priceElement.textContent = `$${newPrice}/lb`;
                }
            }
        }
    });
}

// Fresh delivery timer
function updateDeliveryStatus() {
    const now = new Date();
    const hour = now.getHours();
    const deliveryBanner = document.querySelector('.daily-catch-banner');
    
    if (hour >= 6 && hour <= 10) {
        // Morning delivery window
        deliveryBanner.style.background = '#27ae60'; // Green
        const catchInfo = deliveryBanner.querySelector('.catch-info p');
        if (catchInfo) {
            catchInfo.textContent = 'Fresh delivery arriving now!';
        }
    } else if (hour > 10 && hour <= 14) {
        // Fresh from this morning
        const catchInfo = deliveryBanner.querySelector('.catch-info p');
        if (catchInfo) {
            catchInfo.textContent = 'Delivered fresh this morning';
        }
    }
}

// Scroll animations for catch cards and other elements
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

// Apply scroll animations
document.querySelectorAll('.catch-card, .menu-item, .shellfish-tank').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Interactive catch selection
document.querySelectorAll('.catch-card').forEach(card => {
    card.addEventListener('click', function() {
        const catchName = this.querySelector('h3').textContent;
        const catchOrigin = this.querySelector('.catch-origin').textContent;
        const cookingMethods = [
            'Grilled with lemon herb butter',
            'Pan-seared with garlic',
            'Blackened Cajun style',
            'Simply steamed',
            'Cedar plank roasted'
        ];
        const randomMethod = cookingMethods[Math.floor(Math.random() * cookingMethods.length)];
        
        alert(`${catchName} from ${catchOrigin}\n\nOur chef recommends: ${randomMethod}\n\nWould you like to make a reservation to try this fresh catch?`);
    });
});

// Live lobster tank animation
function animateLobsterTank() {
    const lobsterTanks = document.querySelectorAll('.shellfish-tank');
    lobsterTanks.forEach(tank => {
        if (tank.querySelector('h3').textContent.includes('Lobster')) {
            const tankImage = tank.querySelector('img');
            if (tankImage) {
                setInterval(() => {
                    tankImage.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        tankImage.style.transform = 'scale(1)';
                    }, 500);
                }, 3000);
            }
        }
    });
}

// Oyster variety rotation
function rotateOysterVarieties() {
    const oysterVarieties = [
        'Blue Point', 'Kumamoto', 'Wellfleet', 'Hama Hama',
        'Island Creek', 'Duxbury', 'Moonstone', 'Kusshi'
    ];
    
    const varietiesElement = document.querySelector('.varieties');
    if (varietiesElement) {
        let currentIndex = 0;
        setInterval(() => {
            currentIndex = (currentIndex + 1) % oysterVarieties.length;
            const variety = oysterVarieties[currentIndex];
            varietiesElement.textContent = `${variety} Featured`;
        }, 4000);
    }
}

// Sustainable fishing tooltip
document.querySelectorAll('.catch-method').forEach(method => {
    method.addEventListener('mouseenter', function() {
        const methodText = this.textContent;
        let tooltip = '';
        
        switch(methodText.toLowerCase()) {
            case 'line caught':
                tooltip = 'Sustainable one-by-one fishing method';
                break;
            case 'troll caught':
                tooltip = 'Selective fishing with minimal bycatch';
                break;
            case 'trap caught':
                tooltip = 'Ocean-friendly lobster trap method';
                break;
            default:
                tooltip = 'Sustainably sourced seafood';
        }
        
        // Create tooltip element
        const tooltipEl = document.createElement('div');
        tooltipEl.textContent = tooltip;
        tooltipEl.style.cssText = `
            position: absolute;
            background: #2c3e40;
            color: white;
            padding: 0.5rem;
            border-radius: 5px;
            font-size: 0.8rem;
            z-index: 1000;
            pointer-events: none;
            white-space: nowrap;
        `;
        
        document.body.appendChild(tooltipEl);
        
        // Position tooltip
        const rect = this.getBoundingClientRect();
        tooltipEl.style.left = rect.left + 'px';
        tooltipEl.style.top = (rect.top - 35) + 'px';
        
        // Remove tooltip on mouse leave
        this.addEventListener('mouseleave', () => {
            tooltipEl.remove();
        }, { once: true });
    });
});

// Temperature monitoring for freshness
function updateTemperatureDisplay() {
    const tempBadge = document.querySelector('.temp-badge');
    if (tempBadge) {
        // Simulate temperature monitoring
        const temps = ['38°F', '37°F', '39°F', '38°F'];
        const randomTemp = temps[Math.floor(Math.random() * temps.length)];
        tempBadge.textContent = `Served at ${randomTemp}`;
        
        // Change color based on temperature
        if (randomTemp === '39°F') {
            tempBadge.style.background = 'rgba(255,255,0,0.3)'; // Warning yellow
        } else {
            tempBadge.style.background = 'rgba(255,255,255,0.2)'; // Normal
        }
    }
}

// Header scroll effect with ocean wave
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
    
    // Add wave effect to fresh badge
    const freshBadge = document.querySelector('.fresh-badge');
    if (freshBadge) {
        const waveIntensity = Math.sin(scrollTop * 0.01) * 2;
        freshBadge.style.transform = `translateY(${waveIntensity}px)`;
    }
    
    lastScrollTop = scrollTop;
});

// Initialize all functions
updateMarketPrices();
updateDeliveryStatus();
animateLobsterTank();
rotateOysterVarieties();

// Update prices and temperature every 30 seconds
setInterval(updateMarketPrices, 30000);
setInterval(updateTemperatureDisplay, 15000);

// Enable smooth scrolling for the whole document
document.documentElement.style.scrollBehavior = 'smooth';

// Special ocean sound effects on hover (visual feedback only)
document.querySelectorAll('.hero-features span').forEach(feature => {
    feature.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.backdropFilter = 'blur(15px)';
    });
    
    feature.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.backdropFilter = 'blur(10px)';
    });
});