// Entertainment & Gaming Dining Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileNavigation();
    initGameCategories();
    initTournamentCountdown();
    initRewardsCalculator();
    initPartyBooking();
    initScrollEffects();
    initLoadingAnimations();
});

// Mobile Navigation
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Game Categories and Filtering
function initGameCategories() {
    const categoryTabs = document.querySelectorAll('.tab-button');
    const gameCards = document.querySelectorAll('.game-card');

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Filter games
            filterGames(category);
        });
    });

    function filterGames(category) {
        gameCards.forEach(card => {
            const cardCategory = card.dataset.category;
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// Tournament Countdown Timer
function initTournamentCountdown() {
    const countdownElements = document.querySelectorAll('.countdown-timer');
    
    countdownElements.forEach(element => {
        const targetDate = new Date(element.dataset.target).getTime();
        
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                element.innerHTML = `
                    <div class="time-unit">
                        <span class="time-number">${days.toString().padStart(2, '0')}</span>
                        <span class="time-label">Days</span>
                    </div>
                    <div class="time-unit">
                        <span class="time-number">${hours.toString().padStart(2, '0')}</span>
                        <span class="time-label">Hours</span>
                    </div>
                    <div class="time-unit">
                        <span class="time-number">${minutes.toString().padStart(2, '0')}</span>
                        <span class="time-label">Minutes</span>
                    </div>
                    <div class="time-unit">
                        <span class="time-number">${seconds.toString().padStart(2, '0')}</span>
                        <span class="time-label">Seconds</span>
                    </div>
                `;
            } else {
                element.innerHTML = '<div class="tournament-live">🔴 TOURNAMENT LIVE!</div>';
                clearInterval(timer);
            }
        }, 1000);
    });
}

// Rewards Calculator
function initRewardsCalculator() {
    const rewardsForm = document.querySelector('.rewards-calculator');
    const spendingInput = document.querySelector('#spending-amount');
    const timeframeSelect = document.querySelector('#timeframe');
    const resultsDiv = document.querySelector('.rewards-results');

    if (rewardsForm && spendingInput && timeframeSelect && resultsDiv) {
        function calculateRewards() {
            const spending = parseFloat(spendingInput.value) || 0;
            const timeframe = timeframeSelect.value;
            
            // Calculation logic
            const baseRate = 0.1; // 10 chips per dollar
            const bonusMultiplier = timeframe === 'monthly' ? 1.2 : timeframe === 'yearly' ? 1.5 : 1;
            
            const chipsEarned = Math.floor(spending * baseRate * bonusMultiplier);
            const prizesAvailable = Math.floor(chipsEarned / 100); // 100 chips per prize
            const tierProgress = calculateTierProgress(spending, timeframe);
            
            resultsDiv.innerHTML = `
                <div class="rewards-summary">
                    <div class="reward-item">
                        <span class="reward-icon">🪙</span>
                        <div class="reward-content">
                            <span class="reward-number">${chipsEarned.toLocaleString()}</span>
                            <span class="reward-label">Power Chips</span>
                        </div>
                    </div>
                    <div class="reward-item">
                        <span class="reward-icon">🎁</span>
                        <div class="reward-content">
                            <span class="reward-number">${prizesAvailable}</span>
                            <span class="reward-label">Prizes Available</span>
                        </div>
                    </div>
                    <div class="reward-item">
                        <span class="reward-icon">⭐</span>
                        <div class="reward-content">
                            <span class="reward-number">${tierProgress.tier}</span>
                            <span class="reward-label">Current Tier</span>
                        </div>
                    </div>
                </div>
                <div class="tier-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${tierProgress.progress}%"></div>
                    </div>
                    <p class="progress-text">
                        ${tierProgress.pointsToNext} points to ${tierProgress.nextTier}
                    </p>
                </div>
            `;
        }

        function calculateTierProgress(spending, timeframe) {
            const multiplier = timeframe === 'yearly' ? 12 : timeframe === 'monthly' ? 1 : 0.25;
            const annualSpending = spending * multiplier;
            
            const tiers = [
                { name: 'Bronze', min: 0, max: 500 },
                { name: 'Silver', min: 500, max: 1500 },
                { name: 'Gold', min: 1500, max: 3000 },
                { name: 'Platinum', min: 3000, max: 6000 },
                { name: 'Diamond', min: 6000, max: Infinity }
            ];
            
            let currentTier = tiers.find(tier => annualSpending >= tier.min && annualSpending < tier.max);
            let tierIndex = tiers.indexOf(currentTier);
            let nextTier = tiers[tierIndex + 1];
            
            if (!nextTier) {
                return {
                    tier: currentTier.name,
                    progress: 100,
                    pointsToNext: 0,
                    nextTier: 'Max Level'
                };
            }
            
            const progress = ((annualSpending - currentTier.min) / (nextTier.min - currentTier.min)) * 100;
            const pointsToNext = nextTier.min - annualSpending;
            
            return {
                tier: currentTier.name,
                progress: Math.min(progress, 100),
                pointsToNext: Math.max(pointsToNext, 0),
                nextTier: nextTier.name
            };
        }

        spendingInput.addEventListener('input', calculateRewards);
        timeframeSelect.addEventListener('change', calculateRewards);
        
        // Initial calculation
        calculateRewards();
    }
}

// Party Booking System
function initPartyBooking() {
    const partyCards = document.querySelectorAll('.party-card');
    const bookingModal = document.querySelector('.booking-modal');
    const closeModal = document.querySelector('.close-modal');
    const partyForm = document.querySelector('.party-booking-form');

    partyCards.forEach(card => {
        card.addEventListener('click', () => {
            const packageType = card.dataset.package;
            const packageName = card.querySelector('.party-title').textContent;
            const packagePrice = card.querySelector('.party-price').textContent;
            
            if (bookingModal) {
                document.querySelector('.selected-package').textContent = packageName;
                document.querySelector('.selected-price').textContent = packagePrice;
                document.querySelector('#package-type').value = packageType;
                bookingModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeModal && bookingModal) {
        closeModal.addEventListener('click', () => {
            bookingModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                bookingModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    if (partyForm) {
        partyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(partyForm);
            const bookingData = Object.fromEntries(formData);
            
            // Show success message
            showBookingConfirmation(bookingData);
        });
    }

    function showBookingConfirmation(data) {
        const confirmation = document.createElement('div');
        confirmation.className = 'booking-confirmation';
        confirmation.innerHTML = `
            <div class="confirmation-content">
                <div class="confirmation-icon">🎉</div>
                <h3>Booking Request Submitted!</h3>
                <p>Thank you ${data.name}! We'll contact you within 24 hours to confirm your ${data['package-type']} party for ${data['party-date']}.</p>
                <p><strong>Booking ID:</strong> #${Date.now().toString().slice(-6)}</p>
                <button class="close-confirmation">Close</button>
            </div>
        `;
        
        document.body.appendChild(confirmation);
        
        setTimeout(() => {
            confirmation.classList.add('show');
        }, 100);
        
        confirmation.querySelector('.close-confirmation').addEventListener('click', () => {
            confirmation.remove();
            if (bookingModal) {
                bookingModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Scroll Effects and Animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.game-card, .feature-card, .party-card, .leaderboard-item');
    animatedElements.forEach(el => observer.observe(el));

    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero::before');
        if (heroBackground) {
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Loading Animations
function initLoadingAnimations() {
    // Add loading states to buttons
    const actionButtons = document.querySelectorAll('.cta-button, .play-game-btn, .book-party-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('loading')) return;
            
            const originalText = this.textContent;
            this.classList.add('loading');
            this.textContent = 'Loading...';
            
            // Simulate loading time
            setTimeout(() => {
                this.classList.remove('loading');
                this.textContent = originalText;
            }, 2000);
        });
    });
}

// Tournament Registration
function registerForTournament(tournamentId) {
    const modal = document.createElement('div');
    modal.className = 'tournament-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Tournament Registration</h3>
                <button class="close-modal">&times;</button>
            </div>
            <form class="tournament-form">
                <div class="form-group">
                    <label for="player-name">Player Name</label>
                    <input type="text" id="player-name" name="playerName" required>
                </div>
                <div class="form-group">
                    <label for="player-email">Email</label>
                    <input type="email" id="player-email" name="playerEmail" required>
                </div>
                <div class="form-group">
                    <label for="player-phone">Phone</label>
                    <input type="tel" id="player-phone" name="playerPhone">
                </div>
                <div class="form-group">
                    <label for="experience-level">Experience Level</label>
                    <select id="experience-level" name="experienceLevel">
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="pro">Professional</option>
                    </select>
                </div>
                <button type="submit" class="register-btn">Register Now</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle form submission
    const form = modal.querySelector('.tournament-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'registration-success';
        successMsg.innerHTML = `
            <div class="success-icon">🏆</div>
            <h4>Registration Successful!</h4>
            <p>You're registered for the tournament. Check your email for details.</p>
        `;
        
        form.innerHTML = '';
        form.appendChild(successMsg);
        
        setTimeout(() => {
            modal.remove();
        }, 3000);
    });
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => modal.remove());
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Game Search and Filter
function initGameSearch() {
    const searchInput = document.querySelector('.game-search');
    const gameCards = document.querySelectorAll('.game-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            gameCards.forEach(card => {
                const gameName = card.querySelector('.game-title').textContent.toLowerCase();
                const gameDescription = card.querySelector('.game-description').textContent.toLowerCase();
                
                if (gameName.includes(searchTerm) || gameDescription.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Leaderboard Updates
function updateLeaderboard() {
    const leaderboardItems = document.querySelectorAll('.leaderboard-item');
    
    // Simulate real-time updates
    setInterval(() => {
        const randomItem = leaderboardItems[Math.floor(Math.random() * leaderboardItems.length)];
        const scoreElement = randomItem.querySelector('.player-score');
        
        if (scoreElement) {
            const currentScore = parseInt(scoreElement.textContent.replace(/,/g, ''));
            const newScore = currentScore + Math.floor(Math.random() * 100);
            scoreElement.textContent = newScore.toLocaleString();
            
            // Add highlight effect
            randomItem.classList.add('score-updated');
            setTimeout(() => {
                randomItem.classList.remove('score-updated');
            }, 2000);
        }
    }, 10000); // Update every 10 seconds
}

// Power Card Balance Checker
function checkPowerCardBalance(cardNumber) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                balance: Math.floor(Math.random() * 1000),
                chips: Math.floor(Math.random() * 5000),
                tier: ['Bronze', 'Silver', 'Gold', 'Platinum'][Math.floor(Math.random() * 4)],
                pointsToNext: Math.floor(Math.random() * 500)
            });
        }, 1000);
    });
}

// Initialize game search and leaderboard updates
document.addEventListener('DOMContentLoaded', () => {
    initGameSearch();
    updateLeaderboard();
});

// CSS for animations (add to styles.css)
const additionalStyles = `
.animated {
    animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.loading {
    opacity: 0.7;
    pointer-events: none;
}

.score-updated {
    background: var(--success-color) !important;
    transform: scale(1.05);
    transition: all 0.3s ease;
}

.tournament-modal,
.booking-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.tournament-modal.active,
.booking-modal.active {
    opacity: 1;
    visibility: visible;
}

.modal-content {
    background: var(--bg-card);
    padding: 30px;
    border-radius: var(--border-radius-lg);
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
}

.booking-confirmation {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--bg-card);
    padding: 30px;
    border-radius: var(--border-radius-lg);
    z-index: 10001;
    opacity: 0;
    transition: all 0.3s ease;
    border: 2px solid var(--success-color);
}

.booking-confirmation.show {
    opacity: 1;
}
`;

// Inject additional styles
const styleElement = document.createElement('style');
styleElement.textContent = additionalStyles;
document.head.appendChild(styleElement);