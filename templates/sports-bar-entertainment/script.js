// Sports Bar Entertainment Template JavaScript
// TGI Friday's inspired interactive features

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navActions.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navActions.classList.remove('active');
        }
    });

    // Top Banner Close
    const bannerClose = document.querySelector('.banner-close');
    const topBanner = document.querySelector('.top-banner');
    
    if (bannerClose && topBanner) {
        bannerClose.addEventListener('click', function() {
            topBanner.style.animation = 'slideUp 0.5s ease forwards';
            setTimeout(() => {
                topBanner.style.display = 'none';
            }, 500);
        });
    }

    // Daily Specials Carousel
    const specialDays = document.querySelectorAll('.special-day');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSpecial = 0;

    function showSpecial(index) {
        // Hide all specials
        specialDays.forEach(day => day.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current special
        if (specialDays[index]) {
            specialDays[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    function nextSpecial() {
        currentSpecial = (currentSpecial + 1) % specialDays.length;
        showSpecial(currentSpecial);
    }

    function prevSpecial() {
        currentSpecial = (currentSpecial - 1 + specialDays.length) % specialDays.length;
        showSpecial(currentSpecial);
    }

    // Carousel Controls
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSpecial);
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSpecial);
    }

    // Dot Navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSpecial = index;
            showSpecial(currentSpecial);
        });
    });

    // Auto-advance carousel every 5 seconds
    let autoAdvance = setInterval(nextSpecial, 5000);

    // Pause auto-advance on hover
    const carousel = document.querySelector('.specials-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoAdvance);
        });

        carousel.addEventListener('mouseleave', () => {
            autoAdvance = setInterval(nextSpecial, 5000);
        });
    }

    // Menu Category Filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    function filterMenu(category) {
        menuItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    }

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter menu items
            const category = this.getAttribute('data-category');
            filterMenu(category);
        });
    });

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navActions.classList.remove('active');
        });
    });

    // Scroll-triggered Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.game-card, .menu-item, .entertainment-item');
    animatableElements.forEach(el => observer.observe(el));

    // Game Clock Updates (simulated)
    function updateGameTimes() {
        const gameTimes = document.querySelectorAll('.game-time');
        const now = new Date();
        
        gameTimes.forEach((timeEl, index) => {
            // Simulate different game times
            const gameTime = new Date(now);
            gameTime.setHours(15 + (index * 3), 0, 0, 0); // 3PM, 6PM, 9PM etc.
            
            const timeString = gameTime.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            
            // Only update if different to avoid flickering
            if (timeEl.textContent !== timeString) {
                timeEl.textContent = timeString;
            }
        });
    }

    // Update game times every minute
    updateGameTimes();
    setInterval(updateGameTimes, 60000);

    // Add to Order Functionality (basic)
    const addButtons = document.querySelectorAll('.btn-add');
    let orderCount = 0;

    addButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            orderCount++;
            
            // Visual feedback
            this.textContent = 'Added!';
            this.style.background = 'var(--success)';
            this.style.borderColor = 'var(--success)';
            
            // Reset after 2 seconds
            setTimeout(() => {
                this.textContent = 'Add to Order';
                this.style.background = '';
                this.style.borderColor = '';
            }, 2000);

            // Could integrate with actual ordering system here
            console.log('Item added to order. Total items:', orderCount);
        });
    });

    // Game Card Hover Effects
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Live Score Updates (placeholder for real API integration)
    function updateScores() {
        const teams = document.querySelectorAll('.team span');
        // In real implementation, this would fetch from sports API
        console.log('Checking for score updates...');
    }

    // Check for score updates every 30 seconds during game times
    setInterval(updateScores, 30000);

    // Reservation/Contact Form Validation (if forms exist)
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--primary)';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Submit form (integrate with backend)
                console.log('Form submitted successfully');
                this.innerHTML = '<p style="text-align: center; color: var(--success); font-weight: bold;">Thank you! We\'ll be in touch soon.</p>';
            }
        });
    });

    // Initialize any default states
    showSpecial(0); // Show first special by default
    filterMenu('appetizers'); // Show appetizers by default
});

// CSS Animation Keyframes (add to CSS if not present)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-100%); opacity: 0; }
    }
    
    @keyframes fadeInUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
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
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: var(--white);
            box-shadow: 0 4px 20px var(--shadow);
            padding: 2rem 0;
            z-index: 1000;
        }
        
        .nav-actions.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            right: 0;
            background: var(--white);
            padding: 1rem;
            box-shadow: 0 4px 20px var(--shadow);
            z-index: 1000;
        }
    }
`;
document.head.appendChild(style);