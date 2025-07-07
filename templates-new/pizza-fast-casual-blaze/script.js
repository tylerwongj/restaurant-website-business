// Pizza Fast-Casual Website Functionality

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializePizzaBuilder();
    initializeMenuTabs();
    initializeLocationFinder();
    initializeSmoothScrolling();
    initializeContactForm();
    initializeOrderTracking();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Pizza Builder functionality
function initializePizzaBuilder() {
    const optionCards = document.querySelectorAll('.option-card');
    const toppings = document.querySelectorAll('.topping');
    const builderBtn = document.querySelector('.builder-cta .btn');
    
    let selectedOptions = {
        dough: null,
        sauce: null,
        cheese: null,
        toppings: []
    };
    
    // Handle option selection
    optionCards.forEach(card => {
        card.addEventListener('click', function() {
            const step = this.closest('.build-step');
            const stepCards = step.querySelectorAll('.option-card');
            
            // Remove previous selection
            stepCards.forEach(c => c.classList.remove('selected'));
            
            // Add selection to current card
            this.classList.add('selected');
            
            // Store selection
            const stepNumber = step.querySelector('.step-number').textContent;
            const optionName = this.querySelector('h4').textContent;
            
            switch(stepNumber) {
                case '1':
                    selectedOptions.dough = optionName;
                    break;
                case '2':
                    selectedOptions.sauce = optionName;
                    break;
                case '3':
                    selectedOptions.cheese = optionName;
                    break;
            }
            
            updateBuilderPrice();
        });
    });
    
    // Handle topping selection
    toppings.forEach(topping => {
        topping.addEventListener('click', function() {
            const toppingName = this.textContent;
            
            if (this.classList.contains('selected')) {
                // Remove topping
                this.classList.remove('selected');
                selectedOptions.toppings = selectedOptions.toppings.filter(t => t !== toppingName);
            } else {
                // Add topping
                this.classList.add('selected');
                selectedOptions.toppings.push(toppingName);
            }
            
            updateBuilderPrice();
        });
    });
    
    function updateBuilderPrice() {
        const basePrice = 9.95; // Base pizza price
        const toppingPrice = 1.50; // Price per topping
        const totalPrice = basePrice + (selectedOptions.toppings.length * toppingPrice);
        
        if (builderBtn) {
            builderBtn.textContent = `Build Your Pizza - $${totalPrice.toFixed(2)}`;
        }
        
        // Update pricing note
        const pricingNote = document.querySelector('.pricing-note');
        if (pricingNote) {
            pricingNote.textContent = `${selectedOptions.toppings.length} toppings selected (+$${(selectedOptions.toppings.length * toppingPrice).toFixed(2)})`;
        }
    }
    
    // Handle pizza builder submission
    if (builderBtn) {
        builderBtn.addEventListener('click', function() {
            if (selectedOptions.dough && selectedOptions.sauce && selectedOptions.cheese) {
                // Create pizza summary
                const pizzaSummary = {
                    dough: selectedOptions.dough,
                    sauce: selectedOptions.sauce,
                    cheese: selectedOptions.cheese,
                    toppings: selectedOptions.toppings,
                    price: 9.95 + (selectedOptions.toppings.length * 1.50)
                };
                
                // Store in session storage for order page
                sessionStorage.setItem('customPizza', JSON.stringify(pizzaSummary));
                
                // Show confirmation or redirect to order page
                showPizzaConfirmation(pizzaSummary);
            } else {
                alert('Please select dough, sauce, and cheese to complete your pizza!');
            }
        });
    }
}

function showPizzaConfirmation(pizza) {
    const confirmationHTML = `
        <div class="pizza-confirmation-modal">
            <div class="confirmation-content">
                <h3>Your Custom Pizza</h3>
                <div class="pizza-summary">
                    <p><strong>Dough:</strong> ${pizza.dough}</p>
                    <p><strong>Sauce:</strong> ${pizza.sauce}</p>
                    <p><strong>Cheese:</strong> ${pizza.cheese}</p>
                    <p><strong>Toppings:</strong> ${pizza.toppings.join(', ') || 'None'}</p>
                    <p class="total-price"><strong>Total: $${pizza.price.toFixed(2)}</strong></p>
                </div>
                <div class="confirmation-buttons">
                    <button class="btn btn-primary" onclick="addToCart()">Add to Cart</button>
                    <button class="btn btn-secondary" onclick="closeConfirmation()">Keep Building</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', confirmationHTML);
}

function addToCart() {
    // Add pizza to cart logic here
    alert('Pizza added to cart! Redirecting to checkout...');
    closeConfirmation();
}

function closeConfirmation() {
    const modal = document.querySelector('.pizza-confirmation-modal');
    if (modal) {
        modal.remove();
    }
}

// Menu tabs functionality
function initializeMenuTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuGrids = document.querySelectorAll('.menu-grid');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all tabs and grids
            tabBtns.forEach(tab => tab.classList.remove('active'));
            menuGrids.forEach(grid => grid.classList.add('hidden'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding menu grid
            const targetGrid = document.getElementById(category);
            if (targetGrid) {
                targetGrid.classList.remove('hidden');
            }
        });
    });
}

// Location finder functionality
function initializeLocationFinder() {
    const locationInput = document.querySelector('.finder-input input');
    const findButton = document.querySelector('.finder-input .btn');
    
    if (findButton) {
        findButton.addEventListener('click', function() {
            const zipCode = locationInput.value.trim();
            
            if (zipCode) {
                // Simulate location search
                searchLocations(zipCode);
            } else {
                alert('Please enter a ZIP code or city name');
            }
        });
    }
    
    if (locationInput) {
        locationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                findButton.click();
            }
        });
    }
}

function searchLocations(query) {
    // Simulate API call to find nearby locations
    const mockResults = [
        {
            name: "Downtown Location",
            address: "123 Main St, City, ST 12345",
            phone: "(555) 123-4567",
            hours: "11AM - 10PM Daily",
            features: ["🚗 Drive-Thru", "🚚 Delivery", "📱 Online Order"]
        },
        {
            name: "Mall Location", 
            address: "456 Shopping Center Dr, City, ST 12345",
            phone: "(555) 234-5678",
            hours: "10AM - 9PM Daily",
            features: ["🍽️ Dine-In", "🚚 Delivery", "📱 Online Order"]
        }
    ];
    
    displayLocationResults(mockResults);
}

function displayLocationResults(locations) {
    const locationsGrid = document.querySelector('.locations-grid');
    
    if (locationsGrid) {
        locationsGrid.innerHTML = locations.map(location => `
            <div class="location-card">
                <h3>${location.name}</h3>
                <p>${location.address}</p>
                <p>${location.phone}</p>
                <div class="location-hours">
                    <strong>Hours:</strong> ${location.hours}
                </div>
                <div class="location-features">
                    ${location.features.map(feature => `<span class="feature">${feature}</span>`).join('')}
                </div>
                <button class="btn btn-secondary">Order from This Location</button>
            </div>
        `).join('');
    }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateContactForm(formObject)) {
                submitContactForm(formObject);
            }
        });
    }
}

function validateContactForm(data) {
    const required = ['name', 'email', 'message'];
    
    for (let field of required) {
        if (!data[field] || data[field].trim() === '') {
            alert(`Please fill in the ${field} field`);
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    return true;
}

function submitContactForm(data) {
    // Simulate form submission
    const submitBtn = document.querySelector('.contact-form button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! We\'ll get back to you within 24 hours.');
        document.querySelector('.contact-form form').reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Order tracking functionality
function initializeOrderTracking() {
    // Simulate order tracking for demo purposes
    const orderButtons = document.querySelectorAll('.btn-secondary, .btn-primary');
    
    orderButtons.forEach(btn => {
        if (btn.textContent.includes('Add to Order') || btn.textContent.includes('Order')) {
            btn.addEventListener('click', function(e) {
                if (!this.textContent.includes('Send') && !this.textContent.includes('Find')) {
                    e.preventDefault();
                    showOrderTracking();
                }
            });
        }
    });
}

function showOrderTracking() {
    const trackingHTML = `
        <div class="order-tracking-modal">
            <div class="tracking-content">
                <h3>🍕 Order Placed!</h3>
                <div class="tracking-info">
                    <p><strong>Order #:</strong> PZ${Math.floor(Math.random() * 10000)}</p>
                    <p><strong>Estimated Time:</strong> 8-12 minutes</p>
                    <div class="progress-bar">
                        <div class="progress-step active">Order Received</div>
                        <div class="progress-step">Preparing</div>
                        <div class="progress-step">In Oven</div>
                        <div class="progress-step">Ready</div>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="closeOrderTracking()">Track Order</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', trackingHTML);
    
    // Simulate order progress
    simulateOrderProgress();
}

function simulateOrderProgress() {
    const steps = document.querySelectorAll('.progress-step');
    let currentStep = 0;
    
    const interval = setInterval(() => {
        currentStep++;
        if (currentStep < steps.length) {
            steps[currentStep].classList.add('active');
        } else {
            clearInterval(interval);
            // Show completion notification
            setTimeout(() => {
                alert('🔥 Your pizza is ready for pickup!');
            }, 1000);
        }
    }, 3000); // 3 seconds per step
}

function closeOrderTracking() {
    const modal = document.querySelector('.order-tracking-modal');
    if (modal) {
        modal.remove();
    }
}

// App download tracking
function trackAppDownload(platform) {
    // Analytics tracking for app downloads
    console.log(`App download initiated: ${platform}`);
    
    // Simulate app store redirect
    const appUrls = {
        ios: 'https://apps.apple.com/app/pizza-app',
        android: 'https://play.google.com/store/apps/pizza-app'
    };
    
    if (appUrls[platform]) {
        window.open(appUrls[platform], '_blank');
    }
}

// Add CSS for modal styles
const modalStyles = `
<style>
.pizza-confirmation-modal,
.order-tracking-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
}

.confirmation-content,
.tracking-content {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    text-align: center;
}

.pizza-summary {
    text-align: left;
    margin: 1.5rem 0;
    padding: 1rem;
    background: #f8f8f8;
    border-radius: 8px;
}

.confirmation-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1.5rem;
}

.progress-bar {
    display: flex;
    justify-content: space-between;
    margin: 2rem 0;
    padding: 0 1rem;
}

.progress-step {
    padding: 8px 12px;
    background: #eee;
    border-radius: 20px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.progress-step.active {
    background: var(--color-primary);
    color: white;
}

.option-card.selected {
    border: 3px solid var(--color-primary);
    transform: translateY(-3px);
}

.topping.selected {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
}

.navbar.scrolled {
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(10px);
}

@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 70px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 70px);
        background: white;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-top: 2rem;
        transition: left 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .nav-menu.active {
        left: 0;
    }
    
    .nav-menu li {
        margin: 1rem 0;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .confirmation-buttons {
        flex-direction: column;
    }
    
    .progress-bar {
        flex-direction: column;
        gap: 0.5rem;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', modalStyles);