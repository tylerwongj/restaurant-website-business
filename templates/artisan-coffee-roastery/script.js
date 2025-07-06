// Artisan Coffee Roastery Interactive Features

// Mobile Navigation Toggle
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Menu Tabs Functionality
function initMenuTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Smooth Scrolling
function initSmoothScroll() {
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
}

// Navbar Background on Scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 248, 220, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
            } else {
                navbar.style.background = 'rgba(255, 248, 220, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            }
        });
    }
}

// Coffee Bean Animation Enhancement
function initCoffeeBeanAnimation() {
    const coffeeBeans = document.querySelectorAll('.coffee-bean');
    
    coffeeBeans.forEach((bean, index) => {
        // Add random rotation animation
        bean.style.animationDelay = `${index * 0.5}s`;
        bean.style.animationDuration = `${4 + index}s`;
        
        // Add click interaction
        bean.addEventListener('click', () => {
            bean.style.animation = 'none';
            setTimeout(() => {
                bean.style.animation = `float ${4 + index}s ease-in-out infinite`;
            }, 10);
        });
    });
}

// Animate on Scroll
function initAnimateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe process steps
    document.querySelectorAll('.process-step').forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'all 0.6s ease';
        observer.observe(step);
    });
    
    // Observe menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
    
    // Observe origin points
    document.querySelectorAll('.origin-point').forEach(point => {
        point.style.opacity = '0';
        point.style.transform = 'scale(0.8)';
        point.style.transition = 'all 0.6s ease';
        observer.observe(point);
    });
    
    // Observe features
    document.querySelectorAll('.feature').forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-30px)';
        feature.style.transition = 'all 0.6s ease';
        observer.observe(feature);
    });
}

// Contact Form Handling
function initContactForm() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const interest = form.querySelector('select').value;
            const message = form.querySelector('textarea').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! We\\'ll get back to you soon with coffee updates.');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Newsletter Subscription
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thanks for subscribing! You\\'ll receive our coffee updates.');
                this.querySelector('input').value = '';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
}

// Coffee Temperature Animation (Easter Egg)
function initCoffeeTemperatureIndicator() {
    const hero = document.querySelector('.hero');
    let temperature = 165; // Starting temperature in Fahrenheit
    
    if (hero) {
        const tempIndicator = document.createElement('div');
        tempIndicator.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(139,69,19,0.9);
            color: white;
            padding: 10px 15px;
            border-radius: 20px;
            font-family: 'Merriweather', serif;
            font-weight: 600;
            z-index: 5;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        tempIndicator.textContent = `Coffee Temp: ${temperature}°F`;
        hero.appendChild(tempIndicator);
        
        // Show temperature on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                tempIndicator.style.opacity = '1';
                temperature = Math.max(75, temperature - 0.1);
                tempIndicator.textContent = `Coffee Temp: ${Math.round(temperature)}°F`;
                
                if (temperature < 100) {
                    tempIndicator.style.background = 'rgba(62,39,35,0.9)';
                    tempIndicator.textContent = 'Coffee: Cold ❄️';
                }
            } else {
                tempIndicator.style.opacity = '0';
            }
        });
    }
}

// Interactive Bean Counter
function initBeanCounter() {
    const processSteps = document.querySelectorAll('.process-step');
    let beanCount = 0;
    
    processSteps.forEach((step, index) => {
        step.addEventListener('click', () => {
            beanCount += 10;
            
            // Create floating bean animation
            const bean = document.createElement('div');
            bean.textContent = '☕';
            bean.style.cssText = `
                position: absolute;
                font-size: 20px;
                pointer-events: none;
                z-index: 1000;
                animation: floatUp 2s ease-out forwards;
            `;
            
            const rect = step.getBoundingClientRect();
            bean.style.left = (rect.left + rect.width / 2) + 'px';
            bean.style.top = rect.top + 'px';
            
            document.body.appendChild(bean);
            
            // Add CSS animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes floatUp {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                bean.remove();
                style.remove();
            }, 2000);
            
            // Show bean count notification
            if (beanCount % 50 === 0) {
                const notification = document.createElement('div');
                notification.textContent = `${beanCount} beans roasted! ☕`;
                notification.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--gradient);
                    color: white;
                    padding: 20px;
                    border-radius: 10px;
                    z-index: 9999;
                    font-weight: 600;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                document.body.appendChild(notification);
                
                setTimeout(() => notification.style.opacity = '1', 10);
                setTimeout(() => {
                    notification.style.opacity = '0';
                    setTimeout(() => notification.remove(), 300);
                }, 2000);
            }
        });
    });
}

// Origin Point Hover Effects
function initOriginInteractions() {
    const originPoints = document.querySelectorAll('.origin-point');
    
    originPoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            const info = this.querySelector('.origin-info');
            info.style.transform = 'scale(1.1)';
            info.style.transition = 'transform 0.3s ease';
            
            // Add coffee aroma animation
            const aroma = document.createElement('div');
            aroma.textContent = '☁️';
            aroma.style.cssText = `
                position: absolute;
                top: -20px;
                left: 50%;
                transform: translateX(-50%);
                animation: steam 2s ease-in-out infinite;
                font-size: 16px;
            `;
            this.appendChild(aroma);
            
            setTimeout(() => aroma.remove(), 2000);
        });
        
        point.addEventListener('mouseleave', function() {
            const info = this.querySelector('.origin-info');
            info.style.transform = 'scale(1)';
        });
    });
}

// Coffee Color Scheme Switcher
function initColorSchemeSwitcher() {
    const colorSchemes = ['color-roasted', 'color-espresso', 'color-latte', 'color-mocha', 'color-cappuccino'];
    let currentScheme = 0;
    
    // Create hidden switcher button
    const switcher = document.createElement('button');
    switcher.textContent = '☕';
    switcher.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--gradient);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        z-index: 1000;
        opacity: 0.7;
        transition: all 0.3s ease;
    `;
    
    switcher.addEventListener('click', () => {
        document.body.className = document.body.className.replace(/color-\w+/, '');
        currentScheme = (currentScheme + 1) % colorSchemes.length;
        document.body.classList.add(colorSchemes[currentScheme]);
        
        // Animate button
        switcher.style.transform = 'scale(1.2) rotate(360deg)';
        setTimeout(() => {
            switcher.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    });
    
    switcher.addEventListener('mouseenter', () => {
        switcher.style.opacity = '1';
        switcher.style.transform = 'scale(1.1)';
    });
    
    switcher.addEventListener('mouseleave', () => {
        switcher.style.opacity = '0.7';
        switcher.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(switcher);
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    initMenuTabs();
    initSmoothScroll();
    initNavbarScroll();
    initCoffeeBeanAnimation();
    initAnimateOnScroll();
    initContactForm();
    initNewsletterForm();
    initCoffeeTemperatureIndicator();
    initBeanCounter();
    initOriginInteractions();
    initColorSchemeSwitcher();
});

// Handle resize events
window.addEventListener('resize', function() {
    // Recalculate any size-dependent animations
    const coffeeAnimation = document.querySelector('.coffee-animation');
    if (coffeeAnimation && window.innerWidth < 768) {
        coffeeAnimation.style.display = 'none';
    } else if (coffeeAnimation) {
        coffeeAnimation.style.display = 'block';
    }
});

// Export functions for external use
window.CoffeeRoastery = {
    initMobileNav,
    initMenuTabs,
    initSmoothScroll,
    initNavbarScroll,
    initCoffeeBeanAnimation,
    initAnimateOnScroll,
    initContactForm,
    initNewsletterForm,
    initCoffeeTemperatureIndicator,
    initBeanCounter,
    initOriginInteractions,
    initColorSchemeSwitcher
};