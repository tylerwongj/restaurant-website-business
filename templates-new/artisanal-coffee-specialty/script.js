// Artisanal Coffee Shop Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
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
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Coffee card hover effects
    const coffeeCards = document.querySelectorAll('.coffee-card');
    coffeeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.backgroundColor = 'var(--brown-light)';
                this.style.transform = 'scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.backgroundColor = '';
                this.style.transform = 'scale(1)';
            }
        });
    });

    // Plan card interactions
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = '0 12px 35px rgba(62, 39, 35, 0.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'var(--box-shadow)';
            }
        });
    });

    // Subscription plan buttons
    const planButtons = document.querySelectorAll('.plan-button');
    planButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const planName = this.closest('.plan-card').querySelector('h3').textContent;
            const originalText = this.textContent;
            
            // Show loading state
            this.textContent = 'Processing...';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.pointerEvents = 'auto';
                // In a real implementation, this would redirect to subscription setup
                alert(`Starting ${planName} subscription. Redirecting to checkout...`);
            }, 2000);
        });
    });

    // Education card animations
    const educationCards = document.querySelectorAll('.education-card');
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

    educationCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Event registration
    const eventRegisterButtons = document.querySelectorAll('.event-register');
    eventRegisterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard.querySelector('h3').textContent;
            const spotsElement = eventCard.querySelector('.event-spots');
            
            const originalText = this.textContent;
            this.textContent = 'Registering...';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                // Simulate spot reduction
                const currentSpots = parseInt(spotsElement.textContent);
                if (currentSpots > 1) {
                    spotsElement.textContent = `${currentSpots - 1} spots left`;
                } else {
                    spotsElement.textContent = 'Event Full';
                    this.textContent = 'Waitlist';
                    this.style.backgroundColor = 'var(--gray-medium)';
                }
                
                if (currentSpots > 1) {
                    this.textContent = 'Registered!';
                    this.style.backgroundColor = 'var(--accent-color)';
                    alert(`Successfully registered for ${eventTitle}!`);
                } else {
                    alert(`Added to waitlist for ${eventTitle}`);
                }
                
                this.style.pointerEvents = 'auto';
            }, 1500);
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const topic = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !topic || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // In a real implementation, this would send data to a server
            console.log('Form submitted:', { name, email, topic, message });
            
            let successMessage = 'Thank you for your message! ';
            switch(topic) {
                case 'subscription':
                    successMessage += 'Our subscription team will contact you within 24 hours.';
                    break;
                case 'wholesale':
                    successMessage += 'Our wholesale team will reach out within 2 business days.';
                    break;
                case 'events':
                    successMessage += 'Event details will be sent to your email shortly.';
                    break;
                case 'education':
                    successMessage += 'Our coffee education coordinator will be in touch soon.';
                    break;
                default:
                    successMessage += 'We will get back to you within 24 hours.';
            }
            
            alert(successMessage);
            this.reset();
        });
    }

    // Roasting detail animations
    const detailItems = document.querySelectorAll('.detail-item');
    detailItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(item);
    });

    // Value items animations
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(item);
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat h3');
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

    // Brewing steps animations
    const brewingSteps = document.querySelectorAll('.step');
    brewingSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = `opacity 0.6s ease ${index * 0.3}s, transform 0.6s ease ${index * 0.3}s`;
        observer.observe(step);
    });

    // Feature pills interaction
    const featurePills = document.querySelectorAll('.feature-pill');
    featurePills.forEach(pill => {
        pill.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 6px 20px rgba(62, 39, 35, 0.15)';
        });
        
        pill.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'var(--box-shadow)';
        });
    });

    // Benefit items hover effects
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.backgroundColor = 'var(--white)';
            this.style.boxShadow = 'var(--box-shadow)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.backgroundColor = 'var(--brown-light)';
            this.style.boxShadow = 'none';
        });
    });

    // Tasting notes hover effects
    const tastingNotes = document.querySelectorAll('.note');
    tastingNotes.forEach(note => {
        note.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--accent-color)';
            this.style.color = 'var(--white)';
            this.style.transform = 'scale(1.1)';
        });
        
        note.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'var(--brown-light)';
            this.style.color = 'var(--brown-dark)';
            this.style.transform = 'scale(1)';
        });
    });

    // Shop and subscription button effects
    const actionButtons = document.querySelectorAll('.shop-button, .subscribe-button, .roasting-cta');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.href && this.href.includes('#')) {
                return; // Let anchor links work normally
            }
            
            e.preventDefault();
            
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.pointerEvents = 'auto';
                
                if (this.classList.contains('shop-button')) {
                    alert('Redirecting to coffee shop...');
                } else if (this.classList.contains('subscribe-button')) {
                    // Scroll to subscription section
                    const subscriptionSection = document.getElementById('subscription');
                    if (subscriptionSection) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const targetPosition = subscriptionSection.offsetTop - headerHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                } else if (this.classList.contains('roasting-cta')) {
                    alert('Scheduling roastery visit...');
                }
            }, 1000);
        });
    });

    // Education link interactions
    const educationLinks = document.querySelectorAll('.education-link');
    educationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const educationCard = this.closest('.education-card');
            const title = educationCard.querySelector('h3').textContent;
            
            alert(`Opening detailed information about "${title}"`);
        });
    });

    // Dynamic coffee recommendations
    const coffeeCards2 = document.querySelectorAll('.coffee-card');
    if (coffeeCards2.length > 0) {
        // Simulate dynamic pricing updates
        setInterval(() => {
            const randomCard = coffeeCards2[Math.floor(Math.random() * coffeeCards2.length)];
            const priceElement = randomCard.querySelector('.price');
            
            if (priceElement && Math.random() > 0.9) { // 10% chance
                const currentPrice = parseFloat(priceElement.textContent.replace('$', ''));
                const newPrice = (currentPrice + (Math.random() - 0.5) * 2).toFixed(2);
                
                priceElement.style.animation = 'priceUpdate 1s ease';
                setTimeout(() => {
                    priceElement.textContent = `$${newPrice}`;
                    priceElement.style.animation = '';
                }, 500);
            }
        }, 30000); // Check every 30 seconds
    }

    // Coffee origin information tooltips
    const originElements = document.querySelectorAll('.origin');
    originElements.forEach(origin => {
        origin.style.cursor = 'help';
        origin.setAttribute('title', 'Click to learn more about this coffee origin');
        
        origin.addEventListener('click', function() {
            const originName = this.textContent;
            alert(`Learn more about coffee from ${originName} - opening origin guide...`);
        });
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
        .header.scrolled {
            background-color: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
        }
        
        @keyframes priceUpdate {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); color: var(--accent-color); }
        }
        
        .coffee-card {
            transition: all 0.3s ease;
        }
        
        .plan-card:hover {
            border-color: var(--accent-color);
        }
        
        .feature-pill {
            transition: all 0.3s ease;
        }
        
        .benefit-item {
            transition: all 0.3s ease;
        }
        
        .note {
            transition: all 0.2s ease;
        }
        
        .event-card {
            transition: all 0.3s ease;
        }
        
        .education-card {
            transition: all 0.3s ease;
        }
        
        .detail-item {
            transition: all 0.3s ease;
        }
        
        .value-item {
            transition: all 0.3s ease;
        }
        
        .step {
            transition: all 0.3s ease;
        }
        
        .roast-level {
            position: relative;
            overflow: hidden;
        }
        
        .roast-level::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s;
        }
        
        .coffee-card:hover .roast-level::after {
            left: 100%;
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
    // Optimized scroll handling can be added here
}, 100));

// Coffee brewing timer (for educational purposes)
function startBrewingTimer(method, duration) {
    const timerDisplay = document.createElement('div');
    timerDisplay.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: var(--white);
        padding: 1rem;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        z-index: 1001;
        font-weight: 600;
    `;
    
    let timeLeft = duration;
    timerDisplay.textContent = `${method}: ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`;
    document.body.appendChild(timerDisplay);
    
    const interval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `${method}: ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(interval);
            timerDisplay.textContent = `${method}: Ready! ☕`;
            timerDisplay.style.backgroundColor = 'var(--accent-color)';
            
            setTimeout(() => {
                document.body.removeChild(timerDisplay);
            }, 3000);
        }
    }, 1000);
}