// Family Diner Cozy Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effects
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Menu category tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuGrids = document.querySelectorAll('.menu-grid');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all menu grids
            menuGrids.forEach(grid => {
                grid.classList.add('hidden');
            });
            
            // Show selected menu grid
            const targetGrid = document.getElementById(category);
            if (targetGrid) {
                targetGrid.classList.remove('hidden');
                
                // Animate menu items
                const menuItems = targetGrid.querySelectorAll('.menu-item-card');
                menuItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    });
    
    // Animated counters for fun stats (if any)
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    };
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger counter animation if it's a counter element
                if (entry.target.classList.contains('counter-section')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animation
    document.querySelectorAll('.value-card, .fun-card, .menu-item-card, .contact-card, .image-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(el);
    });
    
    // Staggered animation for cards in grids
    const cardContainers = document.querySelectorAll('.fun-grid, .family-values, .contact-info');
    cardContainers.forEach(container => {
        const cards = container.querySelectorAll('.value-card, .fun-card, .contact-card');
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    });
    
    // Contact form handling
    const contactForm = document.querySelector('.family-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#e74c3c';
                    isValid = false;
                } else {
                    field.style.borderColor = '#e8e8e8';
                }
            });
            
            if (isValid) {
                // Show success message with family-friendly styling
                showFamilyNotification('Thanks for reaching out to our family! 💕 We\'ll get back to you soon!', 'success');
                this.reset();
            } else {
                showFamilyNotification('Oops! Please fill in all the required fields so we can help you better! 😊', 'error');
            }
        });
    }
    
    // Fun interactive elements
    const funCards = document.querySelectorAll('.fun-card');
    funCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.fun-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.fun-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Menu item card interactions
    const menuCards = document.querySelectorAll('.menu-item-card');
    menuCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const rating = this.querySelector('.rating, .fun-rating, .sweet-rating');
            if (rating) {
                rating.style.transform = 'scale(1.1)';
                rating.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const rating = this.querySelector('.rating, .fun-rating, .sweet-rating');
            if (rating) {
                rating.style.transform = 'scale(1)';
            }
        });
    });
    
    // Floating hearts animation
    const createFloatingHeart = () => {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.cssText = `
            position: fixed;
            font-size: 20px;
            pointer-events: none;
            z-index: 1000;
            animation: floatUp 3s ease-out forwards;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight}px;
            opacity: 0.7;
        `;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                document.body.removeChild(heart);
            }
        }, 3000);
    };
    
    // Trigger floating hearts on special interactions
    const specialButtons = document.querySelectorAll('.btn-primary');
    specialButtons.forEach(button => {
        button.addEventListener('click', function() {
            createFloatingHeart();
        });
    });
    
    // Image loading with fade-in effect
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
    
    // Scroll to top functionality with family styling
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '🏠';
    scrollToTopBtn.className = 'scroll-to-top-family';
    scrollToTopBtn.title = 'Back to top - Welcome home!';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(45deg, var(--accent-color), var(--warm-orange));
        color: white;
        border: none;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(255, 107, 107, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Create a celebration effect
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createFloatingHeart(), i * 200);
        }
    });
    
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
        this.style.boxShadow = '0 6px 25px rgba(255, 107, 107, 0.4)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.boxShadow = '0 4px 20px rgba(255, 107, 107, 0.3)';
    });
    
    // Fun loading screen (optional)
    const createLoadingScreen = () => {
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'family-loading-screen';
        loadingScreen.innerHTML = `
            <div class="loading-content">
                <div class="loading-logo">
                    <div class="loading-heart">💕</div>
                    <h2>Welcome to Our Family!</h2>
                </div>
                <div class="loading-message">
                    <p>Getting your table ready with love...</p>
                </div>
            </div>
        `;
        loadingScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--background-warm), var(--background-color));
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(loadingScreen);
        
        window.addEventListener('load', function() {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    if (loadingScreen.parentNode) {
                        document.body.removeChild(loadingScreen);
                    }
                }, 500);
            }, 1500);
        });
    };
    
    // Uncomment to enable family loading screen
    // createLoadingScreen();
    
    // Add some fun interactive sounds (optional - requires user interaction first)
    const playHappySound = () => {
        // Only works after user interaction due to browser policies
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    };
    
    // Easter egg: Konami code for extra family fun
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Easter egg activated!
            for (let i = 0; i < 20; i++) {
                setTimeout(() => createFloatingHeart(), i * 100);
            }
            showFamilyNotification('🎉 You found our family secret! Here\'s some extra love! 💕', 'celebration');
            konamiCode = [];
        }
    });
});

// Family-themed notification system
function showFamilyNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `family-notification family-notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'celebration' ? '🎉' : 'ℹ️'}
            </span>
            <span class="notification-text">${message}</span>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #27ae60, #2ecc71)' : 
                     type === 'error' ? 'linear-gradient(45deg, #e74c3c, #c0392b)' :
                     type === 'celebration' ? 'linear-gradient(45deg, #f39c12, #e67e22)' : 
                     'linear-gradient(45deg, #3498db, #2980b9)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        max-width: 350px;
        font-family: var(--font-secondary);
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Additional CSS for dynamic elements
const familyStyles = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        box-shadow: 0 4px 25px rgba(210, 105, 30, 0.15);
    }
    
    .family-loading-screen .loading-content {
        text-align: center;
        color: var(--primary-color);
    }
    
    .loading-heart {
        font-size: 4rem;
        animation: heartBeat 1.5s infinite;
        margin-bottom: 1rem;
    }
    
    @keyframes heartBeat {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.1); }
        50% { transform: scale(1.2); }
        75% { transform: scale(1.1); }
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
        }
        50% {
            transform: translateY(-50vh) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .scroll-to-top-family:hover {
        background: linear-gradient(45deg, var(--cozy-red), var(--accent-color)) !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-icon {
        font-size: 1.2rem;
        flex-shrink: 0;
    }
    
    .loading-message p {
        font-size: 1.1rem;
        color: var(--text-light);
        font-style: italic;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = familyStyles;
document.head.appendChild(styleSheet);