// Cheesecake Factory-Inspired Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initPromoBar();
    initMobileMenu();
    initSmoothScrolling();
    initMenuTabs();
    initOrderButtons();
    initLocationFunctions();
    initAnimations();
    initColorSchemeSwitcher();
});

// Promotional Banner Functions
function initPromoBar() {
    const promoClose = document.querySelector('.promo-close');
    const promoBanner = document.querySelector('.promo-banner');
    
    if (promoClose && promoBanner) {
        promoClose.addEventListener('click', function() {
            promoBanner.style.display = 'none';
            // Store in localStorage so it stays closed
            localStorage.setItem('promoBannerClosed', 'true');
        });
        
        // Check if banner was previously closed
        if (localStorage.getItem('promoBannerClosed') === 'true') {
            promoBanner.style.display = 'none';
        }
    }
}

// Mobile Menu Functions
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
                nav.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
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
                const nav = document.querySelector('.nav');
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    });
}

// Menu Tab Functionality
function initMenuTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const categoryContents = document.querySelectorAll('.category-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            categoryContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(category);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Scroll to menu section if not visible
            const menuSection = document.getElementById('menu');
            if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Order Button Functions
function initOrderButtons() {
    const orderButtons = document.querySelectorAll('.btn:contains("Order"), [class*="order"]');
    
    // Handle all order-related buttons
    document.addEventListener('click', function(e) {
        const button = e.target;
        const buttonText = button.textContent.toLowerCase();
        
        if (button.classList.contains('btn') && 
            (buttonText.includes('order') || buttonText.includes('delivery'))) {
            e.preventDefault();
            showOrderModal();
        }
        
        if (buttonText.includes('reservation')) {
            e.preventDefault();
            showReservationModal();
        }
        
        if (buttonText.includes('catering')) {
            e.preventDefault();
            showCateringModal();
        }
    });
}

// Location Functions
function initLocationFunctions() {
    // Get directions buttons
    document.addEventListener('click', function(e) {
        if (e.target.textContent.includes('Get Directions')) {
            e.preventDefault();
            const locationCard = e.target.closest('.location-card');
            if (locationCard) {
                const address = locationCard.querySelector('.address').textContent;
                getDirections(address);
            }
        }
        
        if (e.target.textContent.includes('Call Restaurant')) {
            e.preventDefault();
            const locationCard = e.target.closest('.location-card');
            if (locationCard) {
                const phone = locationCard.querySelector('.phone').textContent;
                callRestaurant(phone);
            }
        }
    });
}

// Animations
function initAnimations() {
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

    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe cards for staggered animation
    document.querySelectorAll('.promo-card, .menu-item, .cheesecake-item, .special-day').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Color Scheme Switcher (for demo purposes)
function initColorSchemeSwitcher() {
    let currentScheme = 0;
    const schemes = ['elegant-scheme', 'luxury-scheme', 'warm-scheme'];
    
    // Hidden keyboard shortcut for development/demo
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            currentScheme = (currentScheme + 1) % schemes.length;
            document.body.className = schemes[currentScheme];
            console.log(`Switched to ${schemes[currentScheme]}`);
        }
    });
}

// Modal Functions
function showOrderModal() {
    const modal = createModal('Start Your Order', `
        <div class="order-options">
            <div class="order-option" data-type="pickup">
                <div class="option-icon">🥡</div>
                <h4>Pickup</h4>
                <p>Ready in 25-35 minutes</p>
                <p class="option-note">Skip the line with advance ordering</p>
            </div>
            <div class="order-option" data-type="delivery">
                <div class="option-icon">🚚</div>
                <h4>Delivery</h4>
                <p>Delivered in 45-60 minutes</p>
                <p class="option-note">$2.99 delivery fee</p>
            </div>
            <div class="order-option" data-type="catering">
                <div class="option-icon">🍽️</div>
                <h4>Catering</h4>
                <p>For 10+ people</p>
                <p class="option-note">24-hour advance notice preferred</p>
            </div>
        </div>
        <div class="location-select">
            <label for="order-location">Choose Location:</label>
            <select id="order-location">
                <option value="">Select a location</option>
                <option value="location1">Downtown Location</option>
                <option value="location2">Mall Location</option>
                <option value="location3">Airport Location</option>
            </select>
        </div>
        <div class="menu-preview">
            <h4>Popular Items:</h4>
            <div class="quick-items">
                <span class="quick-item">Chicken Madeira</span>
                <span class="quick-item">Original Cheesecake</span>
                <span class="quick-item">Caesar Salad</span>
            </div>
        </div>
    `);
    
    // Add option selection functionality
    modal.querySelectorAll('.order-option').forEach(option => {
        option.addEventListener('click', function() {
            modal.querySelectorAll('.order-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

function showReservationModal() {
    const modal = createModal('Make a Reservation', `
        <form class="reservation-form">
            <div class="form-row">
                <div class="form-group">
                    <label>Party Size</label>
                    <select required>
                        <option value="">Select size</option>
                        <option value="1">1 person</option>
                        <option value="2">2 people</option>
                        <option value="3">3 people</option>
                        <option value="4">4 people</option>
                        <option value="5">5 people</option>
                        <option value="6">6 people</option>
                        <option value="7+">7+ people</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input type="date" required min="${new Date().toISOString().split('T')[0]}">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Time</label>
                    <select required>
                        <option value="">Select time</option>
                        <option value="5:00 PM">5:00 PM</option>
                        <option value="5:30 PM">5:30 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                        <option value="6:30 PM">6:30 PM</option>
                        <option value="7:00 PM">7:00 PM</option>
                        <option value="7:30 PM">7:30 PM</option>
                        <option value="8:00 PM">8:00 PM</option>
                        <option value="8:30 PM">8:30 PM</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <select required>
                        <option value="">Select location</option>
                        <option value="downtown">Downtown Location</option>
                        <option value="mall">Mall Location</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>Name</label>
                <input type="text" required placeholder="Your name">
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="tel" required placeholder="Your phone number">
            </div>
            <div class="form-group">
                <label>Special Requests (Optional)</label>
                <textarea placeholder="Birthday celebration, accessibility needs, etc."></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-large">Make Reservation</button>
        </form>
    `);
    
    const form = modal.querySelector('.reservation-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Reservation request submitted! You will receive a confirmation call within 30 minutes.');
        modal.remove();
    });
}

function showCateringModal() {
    const modal = createModal('Catering Services', `
        <div class="catering-info">
            <h4>Perfect for Any Occasion</h4>
            <p>From intimate gatherings to large corporate events, our extensive menu ensures there's something for everyone.</p>
            
            <div class="catering-options">
                <div class="catering-option">
                    <h5>Express Catering</h5>
                    <p>Quick pickup orders for 10-20 people</p>
                    <ul>
                        <li>Pre-selected menu packages</li>
                        <li>2-hour advance notice</li>
                        <li>Starting at $12.99 per person</li>
                    </ul>
                </div>
                <div class="catering-option">
                    <h5>Full-Service Catering</h5>
                    <p>Custom menus for 25+ people</p>
                    <ul>
                        <li>Custom menu planning</li>
                        <li>Delivery and setup available</li>
                        <li>24-48 hour advance notice</li>
                        <li>Starting at $15.99 per person</li>
                    </ul>
                </div>
            </div>
            
            <div class="catering-actions">
                <button class="btn btn-primary" onclick="requestCateringQuote()">Request Quote</button>
                <button class="btn btn-secondary" onclick="downloadCateringMenu()">Download Menu</button>
            </div>
        </div>
    `);
}

// Utility Functions
function createModal(title, content) {
    // Remove existing modals
    document.querySelectorAll('.modal-overlay').forEach(modal => modal.remove());
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles if not already added
    if (!document.querySelector('#modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.6);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                padding: 1rem;
            }
            .modal-content {
                background: white;
                border-radius: 15px;
                max-width: 600px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2rem 2rem 1rem;
                border-bottom: 1px solid var(--border);
            }
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #999;
                padding: 0.5rem;
            }
            .modal-body {
                padding: 2rem;
            }
            .order-options {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
                gap: 1rem;
                margin-bottom: 2rem;
            }
            .order-option {
                border: 2px solid var(--border);
                border-radius: 12px;
                padding: 1.5rem;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s ease;
                background: white;
            }
            .order-option:hover,
            .order-option.selected {
                border-color: var(--primary);
                background: var(--surface);
            }
            .option-icon {
                font-size: 2rem;
                margin-bottom: 0.5rem;
            }
            .option-note {
                font-size: 0.8rem;
                color: var(--text-light);
                margin-top: 0.5rem;
            }
            .location-select,
            .form-group {
                margin-bottom: 1.5rem;
            }
            .location-select label,
            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 600;
                color: var(--text-secondary);
            }
            .location-select select,
            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 0.75rem;
                border: 2px solid var(--border);
                border-radius: 6px;
                font-size: 1rem;
            }
            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }
            .menu-preview h4,
            .catering-info h4 {
                margin-bottom: 1rem;
                color: var(--primary);
            }
            .quick-items {
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;
            }
            .quick-item {
                background: var(--surface);
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.9rem;
                color: var(--text-secondary);
            }
            .catering-options {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2rem;
                margin: 2rem 0;
            }
            .catering-option {
                border: 1px solid var(--border);
                border-radius: 8px;
                padding: 1.5rem;
            }
            .catering-option h5 {
                color: var(--primary);
                margin-bottom: 0.5rem;
            }
            .catering-option ul {
                margin-top: 1rem;
                padding-left: 1rem;
            }
            .catering-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
            }
            @media (max-width: 768px) {
                .form-row,
                .catering-options {
                    grid-template-columns: 1fr;
                }
                .modal-content {
                    margin: 1rem;
                }
                .catering-actions {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.remove();
        }
    });
    
    return modal;
}

function getDirections(address) {
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
}

function callRestaurant(phone) {
    window.location.href = `tel:${phone}`;
}

function requestCateringQuote() {
    alert('Catering Quote Request\n\nA catering specialist will contact you within 2 hours to discuss your event needs and provide a custom quote.');
}

function downloadCateringMenu() {
    // In a real implementation, this would download a PDF
    alert('Catering menu would be downloaded as PDF');
}

// Animation CSS (injected dynamically)
const animationStyles = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .promo-card,
    .menu-item,
    .cheesecake-item,
    .special-day {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .promo-card:hover,
    .menu-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(0,0,0,0.15);
    }
    
    .cheesecake-item:hover {
        transform: scale(1.05);
    }
    
    @media (prefers-reduced-motion: reduce) {
        section,
        .promo-card,
        .menu-item,
        .cheesecake-item,
        .special-day {
            animation: none;
            transition: none;
            opacity: 1;
            transform: none;
        }
    }
`;

// Add animation styles
const animationStyleSheet = document.createElement('style');
animationStyleSheet.textContent = animationStyles;
document.head.appendChild(animationStyleSheet);