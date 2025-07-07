// P.F. Chang's Inspired Asian Restaurant Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScrolling();
    initMenuTabs();
    initOrderButtons();
    initReservationButtons();
    initAnimations();
    initColorSchemeSwitcher();
    initParallaxEffect();
});

// Mobile Menu Functions
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Animate hamburger
            const spans = mobileToggle.querySelectorAll('span');
            if (mobileToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
                nav.classList.remove('active');
                mobileToggle.classList.remove('active');
                
                const spans = mobileToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
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
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
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
    const categoryButtons = document.querySelectorAll('.category-btn');
    const categorySections = document.querySelectorAll('.category-section');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all buttons and sections
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            categorySections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            this.classList.add('active');
            const targetSection = document.getElementById(category);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Animate section appearance
                targetSection.style.opacity = '0';
                targetSection.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    targetSection.style.transition = 'all 0.5s ease';
                    targetSection.style.opacity = '1';
                    targetSection.style.transform = 'translateY(0)';
                }, 10);
            }
        });
    });
}

// Order Button Functions
function initOrderButtons() {
    document.addEventListener('click', function(e) {
        const button = e.target;
        const buttonText = button.textContent.toLowerCase();
        
        if (button.classList.contains('btn') && 
            (buttonText.includes('order') || buttonText.includes('delivery'))) {
            e.preventDefault();
            showOrderModal();
        }
        
        if (buttonText.includes('catering') || buttonText.includes('event')) {
            e.preventDefault();
            showCateringModal();
        }
        
        if (buttonText.includes('wine list')) {
            e.preventDefault();
            showWineListModal();
        }
        
        if (buttonText.includes('directions')) {
            e.preventDefault();
            const locationCard = button.closest('.location-card');
            if (locationCard) {
                const address = locationCard.querySelector('.location-address').textContent;
                getDirections(address);
            }
        }
    });
}

// Reservation Button Functions
function initReservationButtons() {
    document.addEventListener('click', function(e) {
        const button = e.target;
        const buttonText = button.textContent.toLowerCase();
        
        if (buttonText.includes('reservation')) {
            e.preventDefault();
            showReservationModal();
        }
    });
}

// Parallax Effect for Hero
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroImg = document.querySelector('.hero-bg-img');
    
    if (hero && heroImg) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                const yPos = -(scrolled * 0.5);
                heroImg.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
}

// Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different elements
                if (entry.target.classList.contains('dish-card')) {
                    animateDishCard(entry.target);
                }
                
                if (entry.target.classList.contains('principle')) {
                    animatePrinciple(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe sections and cards
    document.querySelectorAll('section, .dish-card, .location-card, .principle').forEach(element => {
        observer.observe(element);
    });
    
    // Staggered animation for dish cards
    const dishCards = document.querySelectorAll('.dish-card');
    dishCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

function animateDishCard(card) {
    card.style.transform = 'translateY(30px)';
    card.style.opacity = '0';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
    }, 100);
}

function animatePrinciple(principle) {
    const icon = principle.querySelector('.principle-icon');
    const content = principle.querySelector('h4, p');
    
    if (icon) {
        icon.style.transform = 'scale(0)';
        icon.style.transition = 'transform 0.5s ease';
        
        setTimeout(() => {
            icon.style.transform = 'scale(1)';
        }, 200);
    }
}

// Color Scheme Switcher
function initColorSchemeSwitcher() {
    let currentScheme = 0;
    const schemes = ['dark-scheme', 'elegant-scheme', 'modern-scheme'];
    
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
    const modal = createModal('Place Your Order', `
        <div class="order-options">
            <div class="order-option" data-type="pickup">
                <div class="option-icon">🥡</div>
                <h4>Pickup</h4>
                <p>Ready in 20-30 minutes</p>
                <p class="option-note">Call ahead for faster service</p>
            </div>
            <div class="order-option" data-type="delivery">
                <div class="option-icon">🚗</div>
                <h4>Delivery</h4>
                <p>Delivered in 35-50 minutes</p>
                <p class="option-note">$3.99 delivery fee</p>
            </div>
            <div class="order-option" data-type="dine-in">
                <div class="option-icon">🍽️</div>
                <h4>Dine In</h4>
                <p>Make a reservation</p>
                <p class="option-note">Private dining available</p>
            </div>
        </div>
        <div class="location-select">
            <label for="order-location">Choose Location:</label>
            <select id="order-location">
                <option value="">Select a location</option>
                <option value="downtown">Downtown Location</option>
                <option value="westside">Westside Location</option>
                <option value="mall">Mall Location</option>
            </select>
        </div>
        <div class="popular-items">
            <h4>Most Popular Items:</h4>
            <div class="quick-add-items">
                <button class="quick-add-btn">Chang's Spicy Chicken</button>
                <button class="quick-add-btn">Chicken Lettuce Wraps</button>
                <button class="quick-add-btn">Mongolian Beef</button>
                <button class="quick-add-btn">Honey Shrimp</button>
            </div>
        </div>
    `);
    
    // Add functionality to order options
    modal.querySelectorAll('.order-option').forEach(option => {
        option.addEventListener('click', function() {
            modal.querySelectorAll('.order-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Quick add functionality
    modal.querySelectorAll('.quick-add-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('added');
            this.textContent = this.classList.contains('added') ? 
                this.textContent.replace('$', 'Added ✓') : 
                this.textContent.replace('Added ✓', '$');
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
                        <option value="7+">7+ people (call restaurant)</option>
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
                        <option value="9:00 PM">9:00 PM</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <select required>
                        <option value="">Select location</option>
                        <option value="downtown">Downtown - Private dining available</option>
                        <option value="westside">Westside - Full bar</option>
                        <option value="mall">Mall - Family friendly</option>
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
                <label>Email</label>
                <input type="email" required placeholder="Your email address">
            </div>
            <div class="form-group">
                <label>Special Requests (Optional)</label>
                <textarea placeholder="Birthday celebration, dietary restrictions, etc."></textarea>
            </div>
            <div class="reservation-options">
                <label class="checkbox-label">
                    <input type="checkbox"> Request private dining room (parties of 8+)
                </label>
                <label class="checkbox-label">
                    <input type="checkbox"> Wine pairing recommendations
                </label>
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
    const modal = createModal('Private Events & Catering', `
        <div class="catering-info">
            <h4>Elegant Private Dining & Catering Services</h4>
            <p>Create memorable experiences with our sophisticated private dining rooms and comprehensive catering services.</p>
            
            <div class="catering-tabs">
                <button class="catering-tab active" data-tab="private-dining">Private Dining</button>
                <button class="catering-tab" data-tab="catering">Off-Site Catering</button>
            </div>
            
            <div class="catering-content">
                <div class="tab-content active" id="private-dining">
                    <div class="catering-features">
                        <div class="feature-grid">
                            <div class="feature">
                                <h5>🏮 Elegant Atmosphere</h5>
                                <p>Sophisticated private rooms with authentic Asian décor</p>
                            </div>
                            <div class="feature">
                                <h5>👨‍🍳 Chef's Menu</h5>
                                <p>Customizable multi-course menus featuring signature dishes</p>
                            </div>
                            <div class="feature">
                                <h5>🍷 Wine Pairings</h5>
                                <p>Expert sommelier recommendations</p>
                            </div>
                            <div class="feature">
                                <h5>🎥 A/V Equipment</h5>
                                <p>Full audio/visual setup for presentations</p>
                            </div>
                        </div>
                        <div class="capacity-info">
                            <h5>Room Capacities:</h5>
                            <ul>
                                <li><strong>Bamboo Room:</strong> 10-15 guests</li>
                                <li><strong>Dragon Room:</strong> 20-30 guests</li>
                                <li><strong>Imperial Suite:</strong> 40-60 guests</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="tab-content" id="catering">
                    <div class="catering-features">
                        <div class="service-levels">
                            <div class="service-level">
                                <h5>Express Catering</h5>
                                <p><strong>25-100 people</strong></p>
                                <ul>
                                    <li>Drop-off service</li>
                                    <li>Disposable serving ware</li>
                                    <li>24-hour notice required</li>
                                    <li>Starting at $18 per person</li>
                                </ul>
                            </div>
                            <div class="service-level highlight">
                                <h5>Full-Service Catering</h5>
                                <p><strong>50-500 people</strong></p>
                                <ul>
                                    <li>Complete setup and service</li>
                                    <li>China and linens included</li>
                                    <li>Professional service staff</li>
                                    <li>48-hour notice preferred</li>
                                    <li>Starting at $25 per person</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="catering-actions">
                <button class="btn btn-primary" onclick="requestEventQuote()">Request Quote</button>
                <button class="btn btn-secondary" onclick="downloadEventMenu()">Download Menu</button>
                <button class="btn btn-secondary" onclick="scheduleWalkthrough()">Schedule Walkthrough</button>
            </div>
        </div>
    `);
    
    // Tab functionality
    modal.querySelectorAll('.catering-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            modal.querySelectorAll('.catering-tab').forEach(t => t.classList.remove('active'));
            modal.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            modal.querySelector(`#${targetTab}`).classList.add('active');
        });
    });
}

function showWineListModal() {
    const modal = createModal('Wine & Cocktail Menu', `
        <div class="beverage-menu">
            <div class="beverage-categories">
                <div class="beverage-category">
                    <h4>🍷 Wine Selection</h4>
                    <div class="wine-section">
                        <h5>White Wines</h5>
                        <div class="wine-item">
                            <span class="wine-name">Riesling, Chateau Ste. Michelle</span>
                            <span class="wine-price">$8 / $32</span>
                        </div>
                        <div class="wine-item">
                            <span class="wine-name">Pinot Grigio, Santa Margherita</span>
                            <span class="wine-price">$12 / $48</span>
                        </div>
                        <div class="wine-item">
                            <span class="wine-name">Chardonnay, Kendall-Jackson</span>
                            <span class="wine-price">$10 / $40</span>
                        </div>
                    </div>
                    
                    <div class="wine-section">
                        <h5>Red Wines</h5>
                        <div class="wine-item">
                            <span class="wine-name">Pinot Noir, La Crema</span>
                            <span class="wine-price">$11 / $44</span>
                        </div>
                        <div class="wine-item">
                            <span class="wine-name">Cabernet Sauvignon, Joel Gott</span>
                            <span class="wine-price">$9 / $36</span>
                        </div>
                    </div>
                    
                    <div class="wine-section">
                        <h5>Sake & Asian Wines</h5>
                        <div class="wine-item">
                            <span class="wine-name">Hakutsuru Junmai</span>
                            <span class="wine-price">$6 / $24</span>
                        </div>
                        <div class="wine-item">
                            <span class="wine-name">Plum Wine</span>
                            <span class="wine-price">$7 / $28</span>
                        </div>
                    </div>
                </div>
                
                <div class="beverage-category">
                    <h4>🍸 Signature Cocktails</h4>
                    <div class="cocktail-item">
                        <div class="cocktail-info">
                            <h5>Chang's Mai Tai</h5>
                            <p>Premium rum, orgeat, orange curacao, lime</p>
                        </div>
                        <span class="cocktail-price">$12</span>
                    </div>
                    <div class="cocktail-item">
                        <div class="cocktail-info">
                            <h5>Asian Pear Martini</h5>
                            <p>Vodka, Asian pear juice, lychee, lime</p>
                        </div>
                        <span class="cocktail-price">$13</span>
                    </div>
                    <div class="cocktail-item">
                        <div class="cocktail-info">
                            <h5>Dragon's Breath</h5>
                            <p>Spiced rum, ginger beer, lime, chili rim</p>
                        </div>
                        <span class="cocktail-price">$11</span>
                    </div>
                    <div class="cocktail-item">
                        <div class="cocktail-info">
                            <h5>Zen Garden</h5>
                            <p>Gin, cucumber, mint, lime, tonic</p>
                        </div>
                        <span class="cocktail-price">$10</span>
                    </div>
                </div>
            </div>
            
            <div class="beverage-note">
                <p><em>Wine prices shown as glass / bottle. Ask your server about wine pairings for your meal.</em></p>
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
        styles.textContent = getModalStyles();
        document.head.appendChild(styles);
    }
    
    // Event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // ESC key to close
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
    
    return modal;
}

function getModalStyles() {
    return `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 1rem;
        }
        .modal-content {
            background: var(--surface);
            border-radius: 15px;
            max-width: 700px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            border: 1px solid var(--border);
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem 2rem 1rem;
            border-bottom: 1px solid var(--border);
        }
        .modal-header h3 {
            color: var(--secondary);
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-light);
            padding: 0.5rem;
            border-radius: 4px;
            transition: background-color 0.3s ease;
        }
        .modal-close:hover {
            background-color: var(--surface-light);
        }
        .modal-body {
            padding: 2rem;
            color: var(--text-secondary);
        }
        .order-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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
            background: var(--background);
        }
        .order-option:hover,
        .order-option.selected {
            border-color: var(--primary);
            background: var(--surface-light);
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
        .form-group {
            margin-bottom: 1.5rem;
        }
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: var(--text-primary);
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid var(--border);
            border-radius: 6px;
            font-size: 1rem;
            background: var(--background);
            color: var(--text-primary);
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--primary);
        }
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
        .checkbox-label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        .quick-add-items {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            margin-top: 1rem;
        }
        .quick-add-btn {
            background: var(--surface-light);
            border: 1px solid var(--border);
            color: var(--text-secondary);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .quick-add-btn:hover {
            background: var(--primary);
            color: white;
        }
        .quick-add-btn.added {
            background: var(--success);
            color: white;
        }
        .wine-section {
            margin-bottom: 2rem;
        }
        .wine-section h5 {
            color: var(--secondary);
            margin-bottom: 1rem;
            font-size: 1.1rem;
        }
        .wine-item,
        .cocktail-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 0;
            border-bottom: 1px solid var(--border);
        }
        .wine-price,
        .cocktail-price {
            color: var(--secondary);
            font-weight: 600;
        }
        .catering-tabs {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        .catering-tab {
            padding: 0.75rem 1.5rem;
            border: 2px solid var(--border);
            background: transparent;
            color: var(--text-secondary);
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .catering-tab.active {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
        }
        .tab-content {
            display: none;
        }
        .tab-content.active {
            display: block;
        }
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        .feature h5 {
            color: var(--secondary);
            margin-bottom: 0.5rem;
        }
        .service-levels {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }
        .service-level {
            border: 1px solid var(--border);
            padding: 1.5rem;
            border-radius: 8px;
        }
        .service-level.highlight {
            border-color: var(--secondary);
            background: var(--surface-light);
        }
        .service-level h5 {
            color: var(--secondary);
            margin-bottom: 0.5rem;
        }
        .catering-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
            flex-wrap: wrap;
        }
        @media (max-width: 768px) {
            .form-row,
            .service-levels {
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
}

function getDirections(address) {
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
}

function requestEventQuote() {
    alert('Event Quote Request\n\nAn event specialist will contact you within 4 hours to discuss your private dining or catering needs.');
}

function downloadEventMenu() {
    alert('Event menu would be downloaded as PDF');
}

function scheduleWalkthrough() {
    alert('Walkthrough Scheduling\n\nA manager will contact you to schedule a private room walkthrough and menu tasting.');
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
    
    .dish-card {
        transition: all 0.3s ease;
    }
    
    .dish-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.6);
    }
    
    @media (prefers-reduced-motion: reduce) {
        section,
        .dish-card {
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