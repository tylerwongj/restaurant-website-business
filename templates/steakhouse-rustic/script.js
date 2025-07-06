// Steakhouse Rustic Template JavaScript
// Outback Steakhouse inspired interactive features

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
                const bannerHeight = topBanner && topBanner.style.display !== 'none' ? topBanner.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - navHeight - bannerHeight;
                
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
    const animatableElements = document.querySelectorAll('.steak-item, .menu-item, .special-day, .feature');
    animatableElements.forEach(el => observer.observe(el));

    // Steak Temperature Guide Interactive
    const tempOptions = document.querySelectorAll('.temp-option');
    
    tempOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            const tempVisual = this.querySelector('.temp-visual');
            tempVisual.style.transform = 'scale(1.1)';
            tempVisual.style.transition = 'transform 0.3s ease';
        });

        option.addEventListener('mouseleave', function() {
            const tempVisual = this.querySelector('.temp-visual');
            tempVisual.style.transform = 'scale(1)';
        });
    });

    // Add to Order Functionality
    const addButtons = document.querySelectorAll('.btn-add');
    let orderCount = 0;

    addButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            orderCount++;
            
            // Visual feedback
            this.textContent = 'Added!';
            this.style.background = 'var(--green)';
            this.style.borderColor = 'var(--green)';
            
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

    // Steak Item Hover Effects
    const steakItems = document.querySelectorAll('.steak-item');
    
    steakItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.transition = 'all 0.3s ease';
            }
        });

        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Special Days Animation
    const specialDays = document.querySelectorAll('.special-day');
    
    specialDays.forEach((day, index) => {
        day.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateY(5deg)';
            this.style.transition = 'all 0.3s ease';
        });

        day.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg)';
        });
    });

    // Rewards Program Benefits Animation
    const benefits = document.querySelectorAll('.benefit');
    
    benefits.forEach((benefit, index) => {
        benefit.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'transform 0.3s ease';
            this.style.borderLeftColor = 'var(--accent)';
        });

        benefit.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.borderLeftColor = 'var(--gold)';
        });
    });

    // Story Features Progressive Reveal
    const storyFeatures = document.querySelectorAll('.story-features .feature');
    
    storyFeatures.forEach((feature, index) => {
        setTimeout(() => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            feature.style.opacity = '1';
                            feature.style.transform = 'translateX(0)';
                        }, index * 200);
                    }
                });
            });
            
            observer.observe(feature);
            
            // Set initial state
            feature.style.opacity = '0';
            feature.style.transform = 'translateX(-30px)';
            feature.style.transition = 'all 0.6s ease';
        }, 100);
    });

    // Badge Hover Effects in Hero
    const badges = document.querySelectorAll('.badge');
    
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotateY(10deg)';
            this.style.transition = 'all 0.3s ease';
            this.style.background = 'rgba(255, 255, 255, 0.2)';
        });

        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg)';
            this.style.background = 'rgba(255, 255, 255, 0.1)';
        });
    });

    // Contact Form Validation (if forms exist)
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
                    input.style.borderColor = 'var(--accent)';
                    input.style.background = 'rgba(255, 99, 71, 0.1)';
                } else {
                    input.style.borderColor = '';
                    input.style.background = '';
                }
            });
            
            if (isValid) {
                // Submit form (integrate with backend)
                console.log('Form submitted successfully');
                this.innerHTML = '<p style="text-align: center; color: var(--green); font-weight: bold;">G\'day! We\'ll be in touch soon, mate!</p>';
            }
        });
    });

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background img');
        
        if (heroBackground) {
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });

    // Dynamic Pricing Display (example feature)
    const priceElements = document.querySelectorAll('.price');
    
    priceElements.forEach(price => {
        const originalText = price.textContent;
        
        price.addEventListener('mouseenter', function() {
            this.style.fontSize = '1.8rem';
            this.style.color = 'var(--gold)';
            this.style.transition = 'all 0.3s ease';
        });

        price.addEventListener('mouseleave', function() {
            this.style.fontSize = '';
            this.style.color = 'var(--accent)';
        });
    });

    // Initialize default menu filter
    filterMenu('appetizers');

    // Add loading animation complete
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);

    // Reward Program Animation
    const rewardsCTA = document.querySelector('.rewards-cta');
    if (rewardsCTA) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const buttons = entry.target.querySelectorAll('.btn');
                    buttons.forEach((btn, index) => {
                        setTimeout(() => {
                            btn.style.opacity = '1';
                            btn.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            });
        });
        
        observer.observe(rewardsCTA);
        
        // Set initial state for buttons
        const rewardsButtons = rewardsCTA.querySelectorAll('.btn');
        rewardsButtons.forEach(btn => {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
            btn.style.transition = 'all 0.6s ease';
        });
    }

    // Location Actions Enhancement
    const locationActions = document.querySelectorAll('.location-actions .btn');
    
    locationActions.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 8px 25px rgba(139, 69, 19, 0.3)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
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
    
    .loaded .hero-content {
        animation: fadeInUp 1s ease;
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