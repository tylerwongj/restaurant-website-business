// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Wing sauce selection interactivity
    const sauceItems = document.querySelectorAll('.sauce-item');
    sauceItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            sauceItems.forEach(i => i.classList.remove('selected'));
            // Add active class to clicked item
            this.classList.add('selected');
            
            // Store selection for ordering
            const sauceName = this.querySelector('h4').textContent;
            console.log('Selected sauce:', sauceName);
        });

        // Hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
            }
        });
    });

    // Wing size selection
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            sizeOptions.forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            
            const wingCount = this.querySelector('h4').textContent;
            console.log('Selected wing size:', wingCount);
        });

        option.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.08)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        });
        
        option.addEventListener('mouseleave', function() {
            if (this.classList.contains('popular')) {
                this.style.transform = 'scale(1.05)';
            } else {
                this.style.transform = 'scale(1)';
            }
            this.style.boxShadow = 'none';
        });
    });

    // Order tracking functionality
    let currentOrder = {
        wings: null,
        sauce: null,
        sides: [],
        total: 0
    };

    // Order button interactions
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.includes('Order') || btn.textContent.includes('order')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Add loading state
                this.style.opacity = '0.7';
                this.style.pointerEvents = 'none';
                const originalText = this.textContent;
                this.textContent = 'Processing...';
                
                setTimeout(() => {
                    this.style.opacity = '1';
                    this.style.pointerEvents = 'auto';
                    this.textContent = originalText;
                    
                    // Show order confirmation
                    showOrderConfirmation();
                }, 1500);
            });
        }
    });

    function showOrderConfirmation() {
        const modal = document.createElement('div');
        modal.className = 'order-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Order Started!</h3>
                <p>Redirecting to our ordering system...</p>
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.remove();
        }, 3000);
    }

    // Sports scores ticker (simulated)
    const gamesData = [
        { teams: 'Lakers vs Warriors', score: '108-112', status: 'FINAL' },
        { teams: 'Cowboys vs Giants', score: '24-17', status: '3Q 8:42' },
        { teams: 'Red Sox vs Yankees', score: '7-3', status: '7th' }
    ];

    function updateGamesTicker() {
        const gamesList = document.querySelector('.games-list');
        if (gamesList) {
            gamesList.innerHTML = '';
            gamesData.forEach(game => {
                const gameElement = document.createElement('div');
                gameElement.className = 'game';
                gameElement.innerHTML = `
                    <span class="teams">${game.teams}</span>
                    <span class="score">${game.score}</span>
                    <span class="status">${game.status}</span>
                `;
                gamesList.appendChild(gameElement);
            });
        }
    }

    // Update games every 30 seconds
    updateGamesTicker();
    setInterval(updateGamesTicker, 30000);

    // Menu item hover effects
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8fafc';
            this.style.borderColor = 'var(--primary-color)';
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.borderColor = 'var(--border-color)';
            this.style.transform = 'translateX(5px)';
        });
    });

    // Event booking functionality
    const eventButtons = document.querySelectorAll('.events-entertainment .btn-primary');
    eventButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openEventBookingModal();
        });
    });

    function openEventBookingModal() {
        const modal = document.createElement('div');
        modal.className = 'booking-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Book Your Event</h3>
                <form class="booking-form">
                    <input type="text" placeholder="Your Name" required>
                    <input type="email" placeholder="Email" required>
                    <input type="tel" placeholder="Phone" required>
                    <select required>
                        <option value="">Event Type</option>
                        <option value="birthday">Birthday Party</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="game-day">Game Day Party</option>
                        <option value="other">Other</option>
                    </select>
                    <input type="date" required>
                    <select required>
                        <option value="">Party Size</option>
                        <option value="10-20">10-20 people</option>
                        <option value="20-30">20-30 people</option>
                        <option value="30-50">30-50 people</option>
                        <option value="50+">50+ people</option>
                    </select>
                    <textarea placeholder="Special requests or details"></textarea>
                    <button type="submit" class="btn btn-primary">Submit Request</button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Form submission
        modal.querySelector('.booking-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! We will contact you within 24 hours to confirm your event.');
            modal.remove();
        });
    }

    // Parallax effect for hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Location selection for delivery/pickup
    const locationElements = document.querySelectorAll('.location');
    locationElements.forEach(location => {
        location.addEventListener('click', function() {
            locationElements.forEach(l => l.classList.remove('selected'));
            this.classList.add('selected');
            
            const locationName = this.querySelector('h3').textContent;
            console.log('Selected location:', locationName);
            
            // Update order buttons with location
            document.querySelectorAll('.order-option .btn-primary').forEach(btn => {
                btn.textContent = btn.textContent.split(' - ')[0] + ' - ' + locationName;
            });
        });

        location.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        location.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(-5px) scale(1)';
                this.style.boxShadow = 'none';
            }
        });
    });

    // App download tracking
    document.querySelectorAll('.app-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.href.includes('apple') ? 'iOS' : 'Android';
            console.log('App download initiated:', platform);
            // Add analytics tracking here
        });
    });

    // Dynamic pricing updates (simulated)
    function updatePricing() {
        const now = new Date();
        const hour = now.getHours();
        const isHappyHour = (hour >= 15 && hour <= 18); // 3-6 PM
        
        if (isHappyHour) {
            document.querySelectorAll('.price').forEach(price => {
                if (!price.classList.contains('happy-hour-updated')) {
                    const originalPrice = parseFloat(price.textContent.replace('$', ''));
                    const discountedPrice = (originalPrice * 0.8).toFixed(2);
                    price.innerHTML = `<span style="text-decoration: line-through; opacity: 0.7;">$${originalPrice}</span> $${discountedPrice}`;
                    price.classList.add('happy-hour-updated');
                }
            });
            
            // Add happy hour banner
            if (!document.querySelector('.happy-hour-banner')) {
                const banner = document.createElement('div');
                banner.className = 'happy-hour-banner';
                banner.innerHTML = `
                    <div class="container">
                        <p>🍻 HAPPY HOUR NOW! 20% off all food & drinks until 6 PM</p>
                    </div>
                `;
                document.querySelector('.header').after(banner);
            }
        }
    }

    // Check for happy hour on load and every minute
    updatePricing();
    setInterval(updatePricing, 60000);

    // Countdown timer for wing special
    function startWingSpecialCountdown() {
        const now = new Date();
        const nextWednesday = new Date();
        nextWednesday.setDate(now.getDate() + (3 - now.getDay() + 7) % 7);
        nextWednesday.setHours(0, 0, 0, 0);
        
        if (now.getDay() === 3) { // It's Wednesday
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);
            nextWednesday = endOfDay;
        }
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = nextWednesday.getTime() - now;
            
            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                
                const countdownElement = document.querySelector('.special-countdown');
                if (countdownElement) {
                    countdownElement.textContent = `${days}d ${hours}h ${minutes}m until Wing Wednesday!`;
                }
            }
        }
        
        setInterval(updateCountdown, 60000); // Update every minute
        updateCountdown(); // Initial call
    }
    
    startWingSpecialCountdown();
});

// Add CSS for dynamic elements
const style = document.createElement('style');
style.textContent = `
    .sauce-item.selected {
        border-color: var(--primary-color) !important;
        background-color: var(--primary-color) !important;
        color: var(--light-text) !important;
        transform: translateY(-8px) scale(1.05) !important;
    }
    
    .size-option.selected {
        border-color: var(--primary-color) !important;
        background-color: var(--primary-color) !important;
        color: var(--light-text) !important;
    }
    
    .location.selected {
        border-color: var(--accent-color) !important;
        background-color: rgba(255, 255, 255, 0.2) !important;
    }
    
    .order-modal, .booking-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    }
    
    .modal-content {
        background: var(--background-color);
        padding: 40px;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        position: relative;
        animation: slideIn 0.3s ease;
    }
    
    .close-modal {
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 30px;
        cursor: pointer;
        color: var(--text-color);
    }
    
    .booking-form {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-top: 20px;
    }
    
    .booking-form input,
    .booking-form select,
    .booking-form textarea {
        padding: 12px;
        border: 2px solid var(--border-color);
        border-radius: 6px;
        font-size: 1rem;
    }
    
    .booking-form textarea {
        min-height: 80px;
        resize: vertical;
    }
    
    .happy-hour-banner {
        background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
        color: var(--light-text);
        text-align: center;
        padding: 10px 0;
        font-weight: 700;
        animation: pulse 2s infinite;
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        z-index: 999;
    }
    
    .game {
        display: grid;
        grid-template-columns: 1fr auto auto;
        gap: 15px;
        align-items: center;
    }
    
    .score {
        font-weight: 700;
        color: var(--accent-color);
    }
    
    .status {
        font-size: 0.9rem;
        opacity: 0.8;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideIn {
        from { transform: translateY(-50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    .nav.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: var(--background-color);
        flex-direction: column;
        padding: 20px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .nav.active .nav-list {
        flex-direction: column;
        gap: 15px;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .header.scrolled {
        background-color: rgba(248, 250, 252, 0.95);
        backdrop-filter: blur(10px);
    }
    
    @media (max-width: 768px) {
        .nav {
            display: none;
        }
        
        .nav.active {
            display: flex;
        }
        
        .happy-hour-banner {
            top: 70px;
        }
        
        .game {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 5px;
        }
        
        .modal-content {
            padding: 30px 20px;
        }
    }
`;
document.head.appendChild(style);