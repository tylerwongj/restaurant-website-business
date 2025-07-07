// Sports Bar Entertainment Hub Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const navToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            this.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight || 120;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.nav');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Menu tab functionality
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and categories
            menuTabs.forEach(t => t.classList.remove('active'));
            menuCategories.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding category
            const categoryId = this.getAttribute('data-category');
            const targetCategory = document.getElementById(categoryId);
            if (targetCategory) {
                targetCategory.classList.add('active');
            }
        });
    });

    // Live sports score updates (simulated)
    const scoreTicker = document.querySelector('.score-ticker');
    if (scoreTicker) {
        const gameUpdates = [
            "NBA Finals Game 6 - Lakers vs Celtics 7:30 PM",
            "NFL Monday Night - Cowboys vs Giants 8:00 PM", 
            "MLB World Series - Yankees vs Red Sox 9:30 PM",
            "Champions League - Real Madrid vs Barcelona 10:00 PM"
        ];
        
        let currentIndex = 0;
        setInterval(() => {
            currentIndex = (currentIndex + 1) % gameUpdates.length;
            scoreTicker.textContent = gameUpdates[currentIndex];
            
            // Add animation effect
            scoreTicker.style.opacity = '0';
            setTimeout(() => {
                scoreTicker.style.opacity = '1';
            }, 300);
        }, 8000); // Change every 8 seconds
    }

    // Game schedule scrolling
    const gamesScroll = document.querySelector('.games-scroll');
    if (gamesScroll) {
        let isScrolling = false;
        
        // Auto-scroll games horizontally
        setInterval(() => {
            if (!isScrolling) {
                gamesScroll.scrollBy({
                    left: 220,
                    behavior: 'smooth'
                });
                
                // Reset scroll position when reaching end
                if (gamesScroll.scrollLeft >= gamesScroll.scrollWidth - gamesScroll.clientWidth) {
                    setTimeout(() => {
                        gamesScroll.scrollTo({ left: 0, behavior: 'smooth' });
                    }, 2000);
                }
            }
        }, 6000);
        
        // Pause auto-scroll on hover
        gamesScroll.addEventListener('mouseenter', () => isScrolling = true);
        gamesScroll.addEventListener('mouseleave', () => isScrolling = false);
    }

    // Game card hover effects
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(233, 69, 96, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Special card animations
    const specialCards = document.querySelectorAll('.special-card');
    specialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Menu item hover effects
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Event registration
    const eventRegisterButtons = document.querySelectorAll('.event-register');
    eventRegisterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard.querySelector('h3').textContent;
            
            const originalText = this.textContent;
            this.textContent = 'Registering...';
            this.style.pointerEvents = 'none';
            this.style.backgroundColor = '#6c757d';
            
            setTimeout(() => {
                this.textContent = 'Registered!';
                this.style.backgroundColor = '#28a745';
                alert(`Successfully registered for ${eventTitle}!`);
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.pointerEvents = 'auto';
                    this.style.backgroundColor = '';
                }, 3000);
            }, 2000);
        });
    });

    // Package booking
    const packageButtons = document.querySelectorAll('.package-button');
    packageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const packageCard = this.closest('.package-card');
            const packageName = packageCard.querySelector('h3').textContent;
            
            const originalText = this.textContent;
            this.textContent = 'Processing...';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.textContent = 'Booked!';
                this.style.backgroundColor = '#28a745';
                alert(`${packageName} package booking initiated! We'll contact you within 24 hours to confirm details.`);
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.pointerEvents = 'auto';
                    this.style.backgroundColor = '';
                }, 3000);
            }, 2000);
        });
    });

    // Reservation form handling
    const reservationForm = document.querySelector('.reservation-form form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const date = formData.get('date');
            const time = formData.get('time');
            const partySize = formData.get('party_size');
            const occasion = formData.get('occasion');
            const requests = formData.get('requests');
            
            // Basic validation
            if (!name || !phone || !date || !time || !partySize) {
                alert('Please fill in all required fields');
                return;
            }
            
            // In a real implementation, this would send data to a server
            console.log('Reservation submitted:', { name, phone, date, time, partySize, occasion, requests });
            
            // Show success message
            alert(`Reservation confirmed for ${partySize} people on ${date} at ${time}. We'll call ${phone} to confirm details. Thanks ${name}!`);
            this.reset();
        });
    }

    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const topic = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !topic || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // In a real implementation, this would send data to a server
            console.log('Contact form submitted:', { name, email, phone, topic, message });
            
            let successMessage = 'Thank you for your message! ';
            switch(topic) {
                case 'reservation':
                    successMessage += 'Our reservation team will contact you within 2 hours during business hours.';
                    break;
                case 'party':
                    successMessage += 'Our private events coordinator will reach out within 24 hours.';
                    break;
                case 'event':
                    successMessage += 'Event details will be sent to your email shortly.';
                    break;
                case 'catering':
                    successMessage += 'Our catering team will provide a quote within 48 hours.';
                    break;
                case 'feedback':
                    successMessage += 'We appreciate your feedback and will review it with our management team.';
                    break;
                default:
                    successMessage += 'We will get back to you within 24 hours.';
            }
            
            alert(successMessage);
            this.reset();
        });
    }

    // Feature card animations
    const featureCards = document.querySelectorAll('.feature');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat h4');
    stats.forEach(stat => {
        observer.observe(stat);
        
        stat.addEventListener('animationstart', function() {
            const text = this.textContent;
            const number = parseInt(text.replace(/[^\d]/g, ''));
            
            if (number && number > 0) {
                animateCounter(this, 0, number, 2000);
            }
        });
    });

    // Special day hover effects
    const specialDays = document.querySelectorAll('.special-day');
    specialDays.forEach(day => {
        day.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(233, 69, 96, 0.2)';
        });
        
        day.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Live indicator pulsing
    const liveIndicator = document.querySelector('.live-indicator');
    if (liveIndicator) {
        setInterval(() => {
            liveIndicator.style.animation = 'none';
            setTimeout(() => {
                liveIndicator.style.animation = 'pulse 2s infinite';
            }, 10);
        }, 5000);
    }

    // Weekly schedule interactions
    const weeklyItems = document.querySelectorAll('.weekly-item');
    weeklyItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--accent-color)';
            this.style.color = 'var(--white)';
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.color = '';
            this.style.transform = 'scale(1)';
        });
    });

    // Navigation active state
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add loading states for action buttons
    const actionButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    actionButtons.forEach(button => {
        if (button.textContent.toLowerCase().includes('order') || 
            button.textContent.toLowerCase().includes('reserve')) {
            button.addEventListener('click', function(e) {
                if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                    return; // Let anchor links work normally
                }
                
                e.preventDefault();
                
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.pointerEvents = 'auto';
                    
                    if (originalText.toLowerCase().includes('order')) {
                        alert('Redirecting to online ordering system...');
                    } else if (originalText.toLowerCase().includes('reserve')) {
                        // Scroll to reservation section
                        const reservationSection = document.getElementById('reservations');
                        if (reservationSection) {
                            const headerHeight = document.querySelector('.header').offsetHeight || 120;
                            const targetPosition = reservationSection.offsetTop - headerHeight;
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }
                }, 1500);
            });
        }
    });

    // Dynamic game time updates
    const gameTimes = document.querySelectorAll('.game-time');
    gameTimes.forEach(time => {
        const timeText = time.textContent;
        const now = new Date();
        const gameTime = new Date();
        const [hours, minutes] = timeText.split(':');
        const period = timeText.includes('PM') ? 'PM' : 'AM';
        
        gameTime.setHours(period === 'PM' && hours !== '12' ? parseInt(hours) + 12 : parseInt(hours));
        gameTime.setMinutes(parseInt(minutes.replace(/[^\d]/g, '')));
        
        if (gameTime < now) {
            const gameCard = time.closest('.game-card');
            if (gameCard && !gameCard.classList.contains('live')) {
                gameCard.classList.add('completed');
                time.textContent = 'FINAL';
                time.style.color = '#6c757d';
            }
        }
    });

    // Initialize tooltips and animations on page load
    initializePageAnimations();
});

// Utility functions
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const originalText = element.textContent;
    const suffix = originalText.replace(/[\d,]/g, '');
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(start + (end - start) * progress);
        element.textContent = currentValue.toLocaleString() + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function initializePageAnimations() {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .nav.scrolled {
            background-color: rgba(26, 26, 46, 0.95);
            backdrop-filter: blur(15px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .nav-menu.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: var(--primary-color);
            flex-direction: column;
            gap: 0;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }
        
        .nav-menu.active a {
            padding: 1rem 2rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .nav-menu a.active {
            color: var(--accent-color);
            background-color: rgba(233, 69, 96, 0.1);
        }
        
        .game-card.live .game-status .live-indicator {
            animation: pulse 2s infinite;
        }
        
        .game-card.completed {
            opacity: 0.7;
            background-color: #f8f9fa;
        }
        
        .special-day {
            transition: all 0.3s ease;
        }
        
        .feature {
            transition: all 0.3s ease;
        }
        
        .weekly-item {
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .menu-item {
            transition: all 0.3s ease;
        }
        
        .special-card {
            transition: all 0.3s ease;
        }
        
        .game-card {
            transition: all 0.3s ease;
        }
        
        .package-card {
            transition: all 0.3s ease;
        }
        
        .package-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }
        
        .event-card {
            transition: all 0.3s ease;
        }
        
        .event-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: flex;
            }
            
            .nav-menu {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(function() {
    // Optimized scroll handling is already implemented above
}, 100));

// Game score updates (simulate real-time updates)
function updateGameScores() {
    const gameCards = document.querySelectorAll('.game-card.live');
    gameCards.forEach(card => {
        const scoreElements = card.querySelectorAll('.team-score');
        scoreElements.forEach(score => {
            const currentScore = parseInt(score.textContent) || 0;
            // Randomly update scores (10% chance per update)
            if (Math.random() > 0.9) {
                score.textContent = currentScore + Math.floor(Math.random() * 3) + 1;
                score.style.animation = 'scoreUpdate 1s ease';
                setTimeout(() => {
                    score.style.animation = '';
                }, 1000);
            }
        });
    });
}

// Update scores every 30 seconds
setInterval(updateGameScores, 30000);

// Sports betting odds display (for entertainment only)
function displayOdds() {
    const gameCards = document.querySelectorAll('.game-card.upcoming');
    gameCards.forEach(card => {
        if (!card.querySelector('.betting-odds')) {
            const oddsDiv = document.createElement('div');
            oddsDiv.className = 'betting-odds';
            oddsDiv.innerHTML = '<small>Entertainment odds: ' + 
                (Math.random() > 0.5 ? '+' : '-') + 
                Math.floor(Math.random() * 200 + 100) + 
                '</small>';
            oddsDiv.style.fontSize = '0.8rem';
            oddsDiv.style.color = '#6c757d';
            oddsDiv.style.textAlign = 'center';
            oddsDiv.style.marginTop = '0.5rem';
            card.appendChild(oddsDiv);
        }
    });
}

// Display odds after page load
setTimeout(displayOdds, 2000);

// Interactive features for engagement
function addInteractiveFeatures() {
    // Add sound effect simulation for goal/touchdown notifications
    window.playGoalSound = function() {
        console.log('GOAL! 🎯');
        // In a real implementation, this would play an actual sound
        const notification = document.createElement('div');
        notification.textContent = '🎯 GOAL!';
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: var(--accent-color);
            color: white;
            padding: 2rem;
            border-radius: 10px;
            font-size: 2rem;
            font-weight: bold;
            z-index: 10000;
            animation: goalNotification 3s ease;
        `;
        
        const goalAnimation = document.createElement('style');
        goalAnimation.textContent = `
            @keyframes goalNotification {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(goalAnimation);
        document.body.appendChild(notification);
        
        setTimeout(() => {
            document.body.removeChild(notification);
            document.head.removeChild(goalAnimation);
        }, 3000);
    };
    
    // Simulate goal notifications every 2 minutes for live games
    setInterval(() => {
        const liveGames = document.querySelectorAll('.game-card.live');
        if (liveGames.length > 0 && Math.random() > 0.7) {
            window.playGoalSound();
        }
    }, 120000);
}

// Initialize interactive features
setTimeout(addInteractiveFeatures, 5000);