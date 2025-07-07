// Starbucks-Inspired Premium Coffee Template JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeTemplate();
});

// Initialize all template functionality
function initializeTemplate() {
    // Core functionality
    initMobileMenu();
    initSeasonalBanner();
    initMenuCategories();
    initStoreFilters();
    initScrollAnimations();
    initSmoothScrolling();
    initFormHandling();
    
    // Enhanced interactions
    initRewardsCalculator();
    initGiftCardSelector();
    initLocationSearch();
    
    console.log('Starbucks-inspired template initialized successfully');
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-active');
            mobileToggle.classList.toggle('active');
            
            // Animate hamburger lines
            const spans = mobileToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transform = mobileToggle.classList.contains('active') 
                    ? `rotate(${index === 1 ? 0 : index === 0 ? 45 : -45}deg) translateY(${index === 1 ? 0 : index === 0 ? 7 : -7}px)`
                    : 'none';
                span.style.opacity = mobileToggle.classList.contains('active') && index === 1 ? '0' : '1';
            });
        });
        
        // Close mobile menu when clicking nav links
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('mobile-active');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// Seasonal Banner Functionality
function initSeasonalBanner() {
    const banner = document.querySelector('.seasonal-banner');
    const closeBtn = document.querySelector('.banner-close');
    
    if (closeBtn && banner) {
        closeBtn.addEventListener('click', function() {
            banner.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                banner.style.display = 'none';
            }, 300);
        });
    }
    
    // Auto-hide banner after 10 seconds
    setTimeout(() => {
        if (banner && banner.style.display !== 'none') {
            closeBtn?.click();
        }
    }, 10000);
}

// Menu Categories Functionality
function initMenuCategories() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all menu sections
            menuSections.forEach(section => {
                section.classList.remove('active');
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
            });
            
            // Show selected category with animation
            setTimeout(() => {
                if (category === 'all') {
                    menuSections.forEach(section => {
                        section.classList.add('active');
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    });
                } else {
                    const targetSection = document.querySelector(`[data-category="${category}"]`);
                    if (targetSection) {
                        targetSection.classList.add('active');
                        targetSection.style.opacity = '1';
                        targetSection.style.transform = 'translateY(0)';
                    }
                }
            }, 150);
        });
    });
}

// Store Filters Functionality
function initStoreFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn, .filter-btn[data-filter]');
    const storeCards = document.querySelectorAll('.store-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter store cards
            storeCards.forEach(card => {
                const amenities = card.querySelectorAll('.amenity');
                let shouldShow = filter === 'all';
                
                amenities.forEach(amenity => {
                    if (amenity.textContent.toLowerCase().includes(filter)) {
                        shouldShow = true;
                    }
                });
                
                card.style.display = shouldShow ? 'block' : 'none';
                
                if (shouldShow) {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                }
            });
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.seasonal-card, .menu-item, .tier-card, .coffee-value, .store-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Handling
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input[type="email"], input[type="text"], textarea');
    
    // Add focus/blur effects to inputs
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement?.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement?.classList.remove('focused');
            }
        });
    });
    
    // Handle form submissions
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Processing...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = 'Success!';
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        this.reset();
                    }, 2000);
                }, 1000);
            }
        });
    });
}

// Rewards Calculator Enhancement
function initRewardsCalculator() {
    const menuItems = document.querySelectorAll('.menu-item');
    let totalSpent = 0;
    let starsEarned = 0;
    
    menuItems.forEach(item => {
        const addBtn = item.querySelector('.btn');
        const priceText = item.querySelector('.menu-item-price, .size-price');
        
        if (addBtn && priceText) {
            addBtn.addEventListener('click', function() {
                const price = parseFloat(priceText.textContent.replace(/[$,]/g, '')) || 0;
                totalSpent += price;
                starsEarned = Math.floor(totalSpent * 2); // 2 stars per $1
                
                // Show rewards notification
                showRewardsNotification(starsEarned);
                
                // Update button temporarily
                const originalText = this.textContent;
                this.textContent = 'Added!';
                this.style.background = 'var(--secondary-color)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                }, 1500);
            });
        }
    });
}

// Show Rewards Notification
function showRewardsNotification(stars) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.rewards-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'rewards-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="stars-icon">⭐</span>
            <span class="notification-text">${stars} Stars Earned!</span>
        </div>
    `;
    
    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: 'var(--secondary-color)',
        color: 'var(--text-dark)',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Gift Card Amount Selector
function initGiftCardSelector() {
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.createElement('input');
    
    amountBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            amountBtns.forEach(b => b.classList.remove('selected'));
            
            // Add active class to clicked button
            this.classList.add('selected');
            
            if (this.textContent === 'Custom' || this.textContent === 'Other Amount') {
                // Show custom amount input
                if (!document.querySelector('.custom-amount-input')) {
                    customAmountInput.type = 'number';
                    customAmountInput.placeholder = 'Enter amount';
                    customAmountInput.className = 'custom-amount-input';
                    customAmountInput.min = '5';
                    customAmountInput.max = '500';
                    
                    Object.assign(customAmountInput.style, {
                        padding: '8px 16px',
                        border: '2px solid var(--primary-color)',
                        borderRadius: '20px',
                        marginLeft: '1rem',
                        width: '120px'
                    });
                    
                    this.parentElement.appendChild(customAmountInput);
                    customAmountInput.focus();
                }
            } else {
                // Remove custom input if exists
                const existingInput = document.querySelector('.custom-amount-input');
                if (existingInput) {
                    existingInput.remove();
                }
            }
        });
    });
}

// Location Search Enhancement
function initLocationSearch() {
    const locationInput = document.querySelector('.location-input, .store-input');
    const searchBtn = document.querySelector('.btn[type="submit"], button[onclick*="search"]');
    
    if (locationInput) {
        // Add search functionality
        locationInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const storeCards = document.querySelectorAll('.store-card, .location-card');
            
            storeCards.forEach(card => {
                const locationName = card.querySelector('h3, h4')?.textContent.toLowerCase() || '';
                const address = card.querySelector('.location-address, .store-address')?.textContent.toLowerCase() || '';
                
                const matches = locationName.includes(query) || address.includes(query) || query === '';
                
                card.style.display = matches ? 'block' : 'none';
                
                if (matches && query !== '') {
                    card.style.border = '2px solid var(--secondary-color)';
                } else {
                    card.style.border = '';
                }
            });
        });
        
        // Enter key search
        locationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchBtn?.click();
            }
        });
    }
}

// Accessibility Enhancements
function initAccessibility() {
    // Add ARIA labels to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    
    interactiveElements.forEach(element => {
        if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
            const text = element.textContent || element.placeholder || element.title;
            if (text) {
                element.setAttribute('aria-label', text.trim());
            }
        }
    });
    
    // Add keyboard navigation for custom dropdowns and modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            const mobileMenu = document.querySelector('.nav.mobile-active');
            if (mobileMenu) {
                mobileMenu.classList.remove('mobile-active');
            }
            
            // Close notifications
            const notifications = document.querySelectorAll('.rewards-notification');
            notifications.forEach(notification => notification.remove());
        }
    });
}

// Performance Monitoring
function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        const perfData = performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log(`Page load time: ${loadTime}ms`);
        
        // Log to analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                custom_parameter: loadTime
            });
        }
    });
    
    // Monitor user interactions
    const trackingElements = document.querySelectorAll('.btn, .nav-link, .menu-item');
    
    trackingElements.forEach(element => {
        element.addEventListener('click', function() {
            const elementType = this.className;
            const elementText = this.textContent?.trim() || 'Unknown';
            
            console.log(`User interaction: ${elementType} - ${elementText}`);
            
            // Log to analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'user_interaction', {
                    element_type: elementType,
                    element_text: elementText
                });
            }
        });
    });
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Template error:', e.error);
    
    // Log to analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'javascript_error', {
            error_message: e.error?.message || 'Unknown error',
            error_line: e.lineno,
            error_file: e.filename
        });
    }
});

// Initialize accessibility and performance monitoring
document.addEventListener('DOMContentLoaded', function() {
    initAccessibility();
    initPerformanceMonitoring();
});

// Export functions for external use
window.StarbucksTemplate = {
    initializeTemplate,
    initMobileMenu,
    initMenuCategories,
    initStoreFilters,
    showRewardsNotification
};