// Cafe Panera-Inspired Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    });

    // Order button functionality
    const orderButtons = document.querySelectorAll('.order-btn, .btn:contains("Order")');
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, this would redirect to ordering system
            showOrderModal();
        });
    });

    // Location finder functionality
    const locationInput = document.querySelector('.location-input');
    const findLocationBtn = document.querySelector('.finder-form .btn-primary');
    
    if (findLocationBtn && locationInput) {
        findLocationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const location = locationInput.value.trim();
            if (location) {
                findNearbyLocations(location);
            } else {
                alert('Please enter a city, state, or zip code');
            }
        });
        
        locationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                findLocationBtn.click();
            }
        });
    }

    // Category card hover effects
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('.category-name').textContent;
            // In a real implementation, this would filter menu items
            console.log(`Showing ${categoryName} menu items`);
        });
    });

    // Featured item interactions
    const featuredCards = document.querySelectorAll('.featured-card');
    featuredCards.forEach(card => {
        card.addEventListener('click', function() {
            const itemName = this.querySelector('.featured-name').textContent;
            const itemPrice = this.querySelector('.featured-price').textContent;
            showItemDetails(itemName, itemPrice);
        });
    });

    // Rewards program signup
    const rewardsBtn = document.querySelector('.rewards .btn-primary');
    if (rewardsBtn) {
        rewardsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showRewardsSignup();
        });
    }

    // Catering order button
    const cateringBtn = document.querySelector('.catering .btn-primary');
    if (cateringBtn) {
        cateringBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showCateringForm();
        });
    }

    // Scroll-based animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Color scheme switcher (for demo purposes)
    let currentScheme = 0;
    const schemes = ['warm-scheme', 'fresh-scheme', 'clean-scheme'];
    
    // Add hidden color scheme switcher (for development)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            currentScheme = (currentScheme + 1) % schemes.length;
            document.body.className = schemes[currentScheme];
            console.log(`Switched to ${schemes[currentScheme]}`);
        }
    });
});

// Helper Functions

function showOrderModal() {
    // Create and show order modal
    const modal = document.createElement('div');
    modal.className = 'order-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Start Your Order</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="order-options">
                    <button class="order-option pickup">
                        <h4>Pickup</h4>
                        <p>Ready in 15-25 minutes</p>
                    </button>
                    <button class="order-option delivery">
                        <h4>Delivery</h4>
                        <p>Delivered in 30-45 minutes</p>
                    </button>
                </div>
                <div class="location-select">
                    <label for="order-location">Choose Location:</label>
                    <select id="order-location">
                        <option value="">Select a location</option>
                        <option value="location1">Downtown Location</option>
                        <option value="location2">Mall Location</option>
                    </select>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const modalStyles = `
        .order-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        .modal-content {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            border-bottom: 1px solid #eee;
            padding-bottom: 1rem;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #999;
        }
        .order-options {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        .order-option {
            border: 2px solid #ddd;
            border-radius: 8px;
            padding: 1.5rem;
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .order-option:hover {
            border-color: var(--primary);
            background: var(--surface);
        }
        .order-option h4 {
            margin-bottom: 0.5rem;
            color: var(--text-primary);
        }
        .order-option p {
            color: var(--text-light);
            font-size: 0.9rem;
        }
        .location-select {
            margin-bottom: 1rem;
        }
        .location-select label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--text-secondary);
            font-weight: 600;
        }
        .location-select select {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #ddd;
            border-radius: 6px;
            font-size: 1rem;
        }
    `;
    
    // Add styles to head if not already added
    if (!document.querySelector('#modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Modal event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Order option selection
    modal.querySelectorAll('.order-option').forEach(option => {
        option.addEventListener('click', function() {
            modal.querySelectorAll('.order-option').forEach(opt => opt.style.borderColor = '#ddd');
            this.style.borderColor = 'var(--primary)';
            this.style.backgroundColor = 'var(--surface)';
        });
    });
}

function findNearbyLocations(location) {
    // Simulate finding nearby locations
    console.log(`Finding locations near: ${location}`);
    
    // In a real implementation, this would make an API call
    const mockLocations = [
        {
            name: "Downtown Cafe",
            address: "123 Main St, " + location,
            phone: "(555) 123-4567",
            hours: "6:00 AM - 9:00 PM"
        },
        {
            name: "Mall Location",
            address: "456 Shopping Center, " + location,
            phone: "(555) 987-6543",
            hours: "7:00 AM - 10:00 PM"
        }
    ];
    
    // Update location cards with found locations
    const locationCards = document.querySelectorAll('.location-card');
    mockLocations.forEach((loc, index) => {
        if (locationCards[index]) {
            locationCards[index].querySelector('h3').textContent = loc.name;
            locationCards[index].querySelector('p').textContent = loc.address;
            locationCards[index].querySelectorAll('p')[1].textContent = loc.phone;
            locationCards[index].querySelectorAll('p')[2].textContent = `Hours: ${loc.hours}`;
        }
    });
}

function showItemDetails(itemName, itemPrice) {
    // Show item details modal
    console.log(`Showing details for: ${itemName} - ${itemPrice}`);
    alert(`${itemName}\n${itemPrice}\n\nThis would show full item details and add to cart option.`);
}

function showRewardsSignup() {
    // Show rewards signup form
    alert('MyRewards Signup\n\nThis would show a form to sign up for the rewards program with benefits:\n• Earn 1 point per $1 spent\n• Free pastry on birthday\n• Exclusive member offers');
}

function showCateringForm() {
    // Show catering order form
    alert('Catering Order Form\n\nThis would show a form for:\n• Event details\n• Menu selection\n• Delivery information\n• Contact information');
}

// Animation CSS (injected dynamically)
const animationStyles = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .featured-card,
    .category-card {
        transition: all 0.3s ease;
    }
    
    .featured-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }
    
    .category-card:hover {
        transform: scale(1.05);
    }
    
    @media (prefers-reduced-motion: reduce) {
        section,
        .featured-card,
        .category-card {
            transition: none;
        }
    }
`;

// Add animation styles
const animationStyleSheet = document.createElement('style');
animationStyleSheet.textContent = animationStyles;
document.head.appendChild(animationStyleSheet);