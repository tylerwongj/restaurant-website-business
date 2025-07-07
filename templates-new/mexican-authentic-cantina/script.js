// Mexican Authentic Cantina Template JavaScript

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navList = document.querySelector('.nav-list');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// Daily specials carousel
const specialDays = document.querySelectorAll('.special-day');
let currentSpecial = 0;

function rotateSpecials() {
    specialDays.forEach(day => day.classList.remove('active'));
    specialDays[currentSpecial].classList.add('active');
    currentSpecial = (currentSpecial + 1) % specialDays.length;
}

// Auto-rotate specials every 4 seconds
setInterval(rotateSpecials, 4000);

// Spice level interactive effects
document.querySelectorAll('.spice-level').forEach(spiceLevel => {
    spiceLevel.addEventListener('mouseenter', function() {
        const level = this.textContent.split('🌶️').length - 1;
        let message = '';
        
        switch(level) {
            case 1:
                message = '¡Suave! - Mild heat';
                break;
            case 2:
                message = '¡Caliente! - Medium heat';
                break;
            case 3:
                message = '¡Muy Caliente! - Hot';
                break;
            case 4:
                message = '¡Fuego! - Extra hot';
                break;
            default:
                message = 'Mild';
        }
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = message;
        tooltip.style.cssText = `
            position: absolute;
            background: #c8102e;
            color: white;
            padding: 0.5rem;
            border-radius: 5px;
            font-size: 0.8rem;
            z-index: 1000;
            pointer-events: none;
            white-space: nowrap;
        `;
        
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = this.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.top - 35) + 'px';
        
        // Remove tooltip on mouse leave
        this.addEventListener('mouseleave', () => {
            tooltip.remove();
        }, { once: true });
    });
});

// Taco builder interactive functionality
const proteinOptions = document.querySelectorAll('.protein-option');
const toppingOptions = document.querySelectorAll('.topping');
const salsaOptions = document.querySelectorAll('.salsa-option');

let selectedOptions = {
    protein: null,
    toppings: [],
    salsa: null
};

// Protein selection
proteinOptions.forEach(option => {
    option.addEventListener('click', function() {
        proteinOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        selectedOptions.protein = this.querySelector('h4').textContent;
        updateTacoPrice();
    });
});

// Toppings selection
toppingOptions.forEach(topping => {
    topping.addEventListener('click', function() {
        this.classList.toggle('selected');
        const toppingName = this.textContent;
        
        if (this.classList.contains('selected')) {
            selectedOptions.toppings.push(toppingName);
        } else {
            selectedOptions.toppings = selectedOptions.toppings.filter(t => t !== toppingName);
        }
        updateTacoPrice();
    });
});

// Salsa selection
salsaOptions.forEach(salsa => {
    salsa.addEventListener('click', function() {
        salsaOptions.forEach(s => s.classList.remove('selected'));
        this.classList.add('selected');
        selectedOptions.salsa = this.querySelector('h4').textContent;
        updateTacoPrice();
    });
});

function updateTacoPrice() {
    // Simulate price calculation
    let basePrice = 3.50;
    let extras = 0;
    
    if (selectedOptions.toppings.some(t => t.includes('Aguacate'))) {
        extras += 1.50;
    }
    
    const totalPrice = basePrice + extras;
    
    // Update price display (if exists)
    const priceDisplay = document.querySelector('.current-taco-price');
    if (priceDisplay) {
        priceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    }
}

// Happy hour countdown
function updateHappyHourCountdown() {
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    
    if (hour >= 15 && hour < 18) {
        // During happy hour
        const happyHourEnd = new Date();
        happyHourEnd.setHours(18, 0, 0, 0);
        const timeLeft = happyHourEnd - now;
        
        const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        const happyHourBadge = document.querySelector('.happy-hour-badge');
        if (happyHourBadge) {
            happyHourBadge.textContent = `¡Happy Hour! ${hoursLeft}h ${minutesLeft}m left`;
            happyHourBadge.style.animation = 'pulse 2s infinite';
        }
    } else if (hour < 15) {
        // Before happy hour
        const happyHourStart = new Date();
        happyHourStart.setHours(15, 0, 0, 0);
        const timeUntil = happyHourStart - now;
        
        const hoursUntil = Math.floor(timeUntil / (1000 * 60 * 60));
        const minutesUntil = Math.floor((timeUntil % (1000 * 60 * 60)) / (1000 * 60));
        
        const happyHourBadge = document.querySelector('.happy-hour-badge');
        if (happyHourBadge) {
            happyHourBadge.textContent = `Happy Hour in ${hoursUntil}h ${minutesUntil}m`;
        }
    }
}

// Update happy hour countdown every minute
updateHappyHourCountdown();
setInterval(updateHappyHourCountdown, 60000);

// Mariachi music simulation
function addMusicSchedule() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hour = now.getHours();
    
    const musicSchedule = {
        5: { // Friday
            name: 'Mariachi Nights',
            time: '7:00 PM - 10:00 PM',
            active: hour >= 19 && hour < 22
        },
        6: { // Saturday
            name: 'Live Acoustic',
            time: '6:00 PM - 9:00 PM',
            active: hour >= 18 && hour < 21
        }
    };
    
    const todaysMusic = musicSchedule[day];
    if (todaysMusic) {
        const musicElement = document.querySelector('.music-schedule');
        if (musicElement && todaysMusic.active) {
            const liveIndicator = document.createElement('div');
            liveIndicator.textContent = '🎵 LIVE NOW!';
            liveIndicator.style.cssText = `
                background: #c8102e;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-weight: bold;
                display: inline-block;
                margin-top: 1rem;
                animation: pulse 2s infinite;
            `;
            musicElement.appendChild(liveIndicator);
        }
    }
}

addMusicSchedule();

// Form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('¡Gracias! Your request has been received. We will contact you shortly to confirm your fiesta!');
        this.reset();
    });
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

// Apply animations to various elements
document.querySelectorAll('.special-day, .menu-category, .drink-item, .value').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Mexican flag colors animation on scroll
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
    
    // Add fiesta colors to elements based on scroll position
    const scrollPercent = scrollTop / (document.body.scrollHeight - window.innerHeight);
    const headerActions = document.querySelector('.header-actions');
    
    if (headerActions) {
        const hue = scrollPercent * 360;
        headerActions.style.filter = `hue-rotate(${hue}deg)`;
    }
    
    lastScrollTop = scrollTop;
});

// Fiesta mood based on time of day
function setFiestaMood() {
    const hour = new Date().getHours();
    const body = document.body;
    
    if (hour >= 17 && hour <= 23) {
        // Evening fiesta mode
        body.classList.add('fiesta-evening');
        
        // Add some sparkle effects
        const sparkles = document.querySelectorAll('.signature-badge');
        sparkles.forEach(sparkle => {
            sparkle.style.animation = 'sparkle 2s infinite';
        });
    } else if (hour >= 12 && hour < 17) {
        // Afternoon siesta mode
        body.classList.add('siesta-afternoon');
    }
}

setFiestaMood();

// Special effects for signature items
document.querySelectorAll('.menu-item.signature').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #ffd700, #ff6b35)';
        this.style.color = 'white';
        this.style.transform = 'scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.background = '';
        this.style.color = '';
        this.style.transform = 'scale(1)';
    });
});

// Add "¡Órale!" exclamation on certain clicks
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create "¡Órale!" effect
        const orale = document.createElement('span');
        orale.textContent = '¡Órale!';
        orale.style.cssText = `
            position: absolute;
            color: #c8102e;
            font-weight: bold;
            font-size: 1.2rem;
            pointer-events: none;
            animation: fadeUpOut 1s ease-out forwards;
        `;
        
        const rect = this.getBoundingClientRect();
        orale.style.left = rect.left + rect.width/2 + 'px';
        orale.style.top = rect.top + 'px';
        
        document.body.appendChild(orale);
        
        setTimeout(() => orale.remove(), 1000);
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes sparkle {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    @keyframes fadeUpOut {
        0% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-30px); }
    }
    
    .protein-option.selected,
    .topping.selected,
    .salsa-option.selected {
        background: #c8102e !important;
        color: white !important;
        transform: scale(1.05);
    }
    
    .fiesta-evening .signature-badge {
        box-shadow: 0 0 10px #ffd700;
    }
`;

document.head.appendChild(style);

// Enable smooth scrolling
document.documentElement.style.scrollBehavior = 'smooth';