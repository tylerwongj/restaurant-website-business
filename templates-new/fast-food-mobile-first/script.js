// Fast Food Mobile-First Template - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Animate hamburger lines
            if (navMenu.classList.contains('active')) {
                hamburger.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 5px)';
                hamburger.querySelector('span:nth-child(2)').style.opacity = '0';
                hamburger.querySelector('span:nth-child(3)').style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                hamburger.querySelector('span:nth-child(1)').style.transform = '';
                hamburger.querySelector('span:nth-child(2)').style.opacity = '1';
                hamburger.querySelector('span:nth-child(3)').style.transform = '';
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"], .btn[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 120;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                // Reset hamburger animation
                hamburger.querySelector('span:nth-child(1)').style.transform = '';
                hamburger.querySelector('span:nth-child(2)').style.opacity = '1';
                hamburger.querySelector('span:nth-child(3)').style.transform = '';
            }
        });
    });

    // Location Finder
    const locationInput = document.querySelector('.location-input');
    const findLocationBtn = document.querySelector('.btn-find-location');
    
    if (findLocationBtn && locationInput) {
        findLocationBtn.addEventListener('click', function() {
            const searchTerm = locationInput.value.trim();
            if (searchTerm) {
                // Here you would typically integrate with a location API
                console.log('Searching for locations near:', searchTerm);
                showNotification('Searching for locations near you...', 'info');
                
                // Simulate API call
                setTimeout(() => {
                    showNotification('Found 3 locations near you!', 'success');
                }, 1500);
            } else {
                showNotification('Please enter a ZIP code or city', 'warning');
            }
        });
        
        // Allow Enter key to trigger search
        locationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                findLocationBtn.click();
            }
        });
    }

    // Auto-hide top banner after interaction
    const topBanner = document.querySelector('.top-banner');
    if (topBanner) {
        // Auto-hide after 15 seconds
        setTimeout(() => {
            topBanner.style.transform = 'translateY(-100%)';
            document.querySelector('.navbar').style.top = '0';
            document.querySelector('.hero-lto').style.marginTop = '80px';
        }, 15000);
        
        // Hide when banner CTA is clicked
        const bannerCta = document.querySelector('.banner-cta');
        if (bannerCta) {
            bannerCta.addEventListener('click', function(e) {
                e.preventDefault();
                topBanner.style.transform = 'translateY(-100%)';
                document.querySelector('.navbar').style.top = '0';
                document.querySelector('.hero-lto').style.marginTop = '80px';
                
                // Scroll to app section
                const appSection = document.querySelector('#app');
                if (appSection) {
                    setTimeout(() => {
                        appSection.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                }
            });
        }
    }

    // Enhanced Card Animations
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('value') && !this.classList.contains('delivery-info') && !this.classList.contains('community')) {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Menu Category Hover Effects
    const menuCategories = document.querySelectorAll('.menu-category');
    menuCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            const img = this.querySelector('.category-image img');
            if (img) {
                img.style.transform = 'scale(1.15)';
            }
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            const img = this.querySelector('.category-image img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // Intersection Observer for Animations
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
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.product-card, .menu-category, .location-card');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Counter Animation for Community Stats
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(stat);
    });

    function animateCounter(element) {
        const text = element.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[\d,]/g, '');
        let current = 0;
        const increment = number / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            
            if (number >= 1000000) {
                element.textContent = (current / 1000000).toFixed(1) + 'M' + suffix.replace('M', '');
            } else if (number >= 1000) {
                element.textContent = Math.floor(current / 1000) + 'K' + suffix.replace('K', '');
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 40);
    }

    // Order Tracking Simulation
    function simulateOrderTracking() {
        const steps = [
            'Order received',
            'Preparing your food',
            'Food ready',
            'Out for delivery',
            'Delivered!'
        ];
        
        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep < steps.length) {
                showNotification(steps[currentStep], 'info');
                currentStep++;
            } else {
                clearInterval(interval);
                showNotification('Enjoy your meal! 🍔', 'success');
            }
        }, 3000);
    }

    // Add order tracking to order buttons
    const orderButtons = document.querySelectorAll('.btn-order-now, .btn-product-order');
    orderButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Only simulate for actual order buttons, not app download or menu view buttons
            if (this.textContent.toLowerCase().includes('order') && !this.href.includes('#')) {
                e.preventDefault();
                showNotification('Order placed successfully! 🎉', 'success');
                setTimeout(() => {
                    simulateOrderTracking();
                }, 2000);
            }
        });
    });

    // App Download Tracking
    const appButtons = document.querySelectorAll('.app-store-btn, .download-btn');
    appButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Redirecting to app store...', 'info');
            trackEvent('app_download_click', {
                platform: this.querySelector('img').alt.includes('App Store') ? 'ios' : 'android'
            });
        });
    });

    // Dynamic Price Updates (simulated)
    function updatePrices() {
        const priceElements = document.querySelectorAll('.price-value, .product-price');
        priceElements.forEach(el => {
            const currentPrice = parseFloat(el.textContent.replace('$', ''));
            // Small random price variation (±5%)
            const variation = (Math.random() - 0.5) * 0.1;
            const newPrice = (currentPrice * (1 + variation)).toFixed(2);
            
            if (Math.abs(variation) > 0.03) { // Only update if change is significant
                el.style.transition = 'color 0.3s ease';
                el.style.color = variation > 0 ? '#ff4757' : '#2ed573';
                el.textContent = '$' + newPrice;
                
                setTimeout(() => {
                    el.style.color = '';
                }, 1000);
            }
        });
    }

    // Update prices every 30 seconds (for demo purposes)
    // setInterval(updatePrices, 30000);

    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{3})/, '($1) $2');
            }
            this.value = value;
        });
    });

    // Geolocation for location finder
    if (navigator.geolocation && locationInput) {
        const geoButton = document.createElement('button');
        geoButton.textContent = '📍 Use My Location';
        geoButton.className = 'btn-geo';
        geoButton.style.cssText = `
            background: transparent;
            border: 2px solid var(--secondary);
            color: var(--secondary);
            padding: 0.8rem 1rem;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            margin-left: 1rem;
        `;
        
        findLocationBtn.parentNode.appendChild(geoButton);
        
        geoButton.addEventListener('click', function() {
            this.textContent = '📍 Finding...';
            this.disabled = true;
            
            navigator.geolocation.getCurrentPosition(
                position => {
                    // Here you would reverse geocode the coordinates
                    console.log('Location found:', position.coords);
                    locationInput.value = 'Current Location';
                    this.textContent = '📍 Location Found';
                    this.style.color = 'var(--success)';
                    this.style.borderColor = 'var(--success)';
                    
                    setTimeout(() => {
                        this.textContent = '📍 Use My Location';
                        this.style.color = 'var(--secondary)';
                        this.style.borderColor = 'var(--secondary)';
                        this.disabled = false;
                    }, 2000);
                },
                error => {
                    console.error('Geolocation error:', error);
                    this.textContent = '📍 Location Error';
                    this.style.color = '#ff4757';
                    this.style.borderColor = '#ff4757';
                    
                    setTimeout(() => {
                        this.textContent = '📍 Use My Location';
                        this.style.color = 'var(--secondary)';
                        this.style.borderColor = 'var(--secondary)';
                        this.disabled = false;
                    }, 2000);
                }
            );
        });
    }

    // Add loading states for interactive elements
    const interactiveButtons = document.querySelectorAll('button, .btn-order-now, .btn-product-order');
    interactiveButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.disabled && this.textContent.toLowerCase().includes('order')) {
                const originalText = this.textContent;
                this.textContent = 'Processing...';
                this.style.opacity = '0.7';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.opacity = '1';
                }, 1500);
            }
        });
    });
});

// Utility Functions
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const colors = {
        success: '#2ed573',
        warning: '#ffa502',
        error: '#ff4757',
        info: '#3742fa'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 9999;
        font-weight: 600;
        max-width: 300px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function trackEvent(eventName, data = {}) {
    // Analytics tracking
    console.log(`📊 Event: ${eventName}`, data);
    
    // You would integrate with your analytics service here
    // Example: gtag('event', eventName, data);
    // Example: analytics.track(eventName, data);
}

// Performance monitoring
function measurePageLoad() {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        trackEvent('page_load', {
            load_time: Math.round(loadTime),
            page: 'home'
        });
        
        if (loadTime > 3000) {
            console.warn('Page load time is slow:', loadTime + 'ms');
        }
    });
}

measurePageLoad();

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}