// Specialty Ramen House Template JavaScript

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    });
});

// Scroll animations for various elements
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

// Apply scroll animations
document.querySelectorAll('.step, .ramen-card, .topping-item, .noodle-type').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Ramen spice level interactive tooltips
document.querySelectorAll('.spice-level').forEach(spiceElement => {
    spiceElement.addEventListener('mouseenter', function() {
        const level = this.textContent.toLowerCase();
        let message = '';
        let color = '';
        
        switch(level) {
            case 'mild':
                message = 'Perfect for beginners';
                color = '#4caf50';
                break;
            case 'medium':
                message = 'Balanced heat level';
                color = '#ff9800';
                break;
            case 'spicy':
                message = 'For spice lovers';
                color = '#f44336';
                break;
            case 'extra hot':
                message = 'Extreme heat warning!';
                color = '#d32f2f';
                break;
            default:
                message = 'Ask staff about spice level';
                color = '#666666';
        }
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = message;
        tooltip.style.cssText = `
            position: absolute;
            background: ${color};
            color: white;
            padding: 0.5rem;
            border-radius: 5px;
            font-size: 0.8rem;
            z-index: 1000;
            pointer-events: none;
            white-space: nowrap;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = this.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width/2 - tooltip.offsetWidth/2 + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
        
        // Remove tooltip on mouse leave
        this.addEventListener('mouseleave', () => {
            tooltip.remove();
        }, { once: true });
    });
});

// Brewing timer simulation
function startBrewingTimer() {
    const stepNumbers = document.querySelectorAll('.step-number');
    
    stepNumbers.forEach((stepNumber, index) => {
        if (stepNumber.textContent === '18') {
            // Simulate brewing countdown
            let hours = 18;
            const interval = setInterval(() => {
                if (hours > 0) {
                    stepNumber.textContent = hours;
                    hours--;
                } else {
                    stepNumber.textContent = '✓';
                    stepNumber.style.color = '#4caf50';
                    clearInterval(interval);
                }
            }, 100); // Fast simulation for demo
        }
    });
}

// Noodle preparation animation
function addNoodlePreparationEffect() {
    document.querySelectorAll('.noodle-type').forEach(noodleType => {
        noodleType.addEventListener('click', function() {
            const noodleName = this.querySelector('h4').textContent;
            
            // Create preparation message
            const message = document.createElement('div');
            message.textContent = `Making fresh ${noodleName}...`;
            message.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #c8102e;
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                font-weight: bold;
                z-index: 1000;
                animation: fadeInOut 2s ease-out;
            `;
            
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.remove();
            }, 2000);
        });
    });
}

// Ramen bowl customization
let ramenOrder = {
    noodles: null,
    toppings: [],
    spiceLevel: null
};

function addRamenCustomization() {
    // Noodle selection
    document.querySelectorAll('.noodle-type').forEach(noodle => {
        noodle.addEventListener('click', function() {
            document.querySelectorAll('.noodle-type').forEach(n => n.classList.remove('selected'));
            this.classList.add('selected');
            ramenOrder.noodles = this.querySelector('h4').textContent;
            updateOrderSummary();
        });
    });
    
    // Topping selection
    document.querySelectorAll('.topping-item').forEach(topping => {
        topping.addEventListener('click', function() {
            this.classList.toggle('selected');
            const toppingName = this.querySelector('h4').textContent;
            
            if (this.classList.contains('selected')) {
                ramenOrder.toppings.push(toppingName);
            } else {
                ramenOrder.toppings = ramenOrder.toppings.filter(t => t !== toppingName);
            }
            updateOrderSummary();
        });
    });
}

function updateOrderSummary() {
    if (ramenOrder.noodles || ramenOrder.toppings.length > 0) {
        console.log('Current order:', ramenOrder);
        // Could display order summary in UI
    }
}

// Japanese culture touch - bowing animation
function addJapaneseCultureElements() {
    const logo = document.querySelector('.logo h1');
    if (logo) {
        logo.addEventListener('click', function() {
            this.style.transform = 'rotate(15deg)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 300);
            
            // Show "Irasshaimase!" greeting
            const greeting = document.createElement('div');
            greeting.textContent = 'いらっしゃいませ！';
            greeting.style.cssText = `
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: #c8102e;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.9rem;
                white-space: nowrap;
                animation: fadeUpOut 2s ease-out forwards;
            `;
            
            this.style.position = 'relative';
            this.appendChild(greeting);
            
            setTimeout(() => {
                greeting.remove();
            }, 2000);
        });
    }
}

// Fresh indicator update
function updateFreshIndicator() {
    const now = new Date();
    const hour = now.getHours();
    const freshBadge = document.querySelector('.fresh-badge');
    
    if (freshBadge) {
        if (hour >= 6 && hour <= 11) {
            freshBadge.textContent = 'Making Fresh Now!';
            freshBadge.style.animation = 'pulse 2s infinite';
        } else if (hour > 11 && hour <= 15) {
            freshBadge.textContent = 'Made Fresh Today';
        } else {
            freshBadge.textContent = 'Fresh Tomorrow 6AM';
        }
    }
}

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

// Initialize all functions
addNoodlePreparationEffect();
addRamenCustomization();
addJapaneseCultureElements();
updateFreshIndicator();

// Update fresh indicator every hour
setInterval(updateFreshIndicator, 3600000);

// Enable smooth scrolling
document.documentElement.style.scrollBehavior = 'smooth';

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
    
    @keyframes fadeUpOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
        20% { opacity: 1; transform: translateX(-50%) translateY(0); }
        80% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
    }
    
    .noodle-type.selected,
    .topping-item.selected {
        background: #c8102e !important;
        color: white !important;
        transform: scale(1.02);
        box-shadow: 0 5px 25px rgba(200,16,46,0.3) !important;
    }
    
    .noodle-type.selected h4,
    .topping-item.selected h4 {
        color: white !important;
    }
    
    .noodle-type.selected p,
    .topping-item.selected p {
        color: rgba(255,255,255,0.9) !important;
    }
    
    .signature-glow {
        box-shadow: 0 0 20px rgba(212,175,55,0.5);
    }
`;

document.head.appendChild(style);

// Add signature glow effect to signature ramen
document.querySelectorAll('.ramen-card.signature').forEach(card => {
    card.classList.add('signature-glow');
});

// Phone number click handler
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        alert('Calling for takeout order. Average wait time: 15-20 minutes.');
    });
});