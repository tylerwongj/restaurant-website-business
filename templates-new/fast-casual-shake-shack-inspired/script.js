// Shake Shack-Inspired Clean Minimal Template JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeTemplate();
});

// Initialize all template functionality
function initializeTemplate() {
    // Core functionality
    initMobileMenu();
    initMenuNavigation();
    initLocationFilters();
    initScrollAnimations();
    initSmoothScrolling();
    initFormHandling();
    
    // Enhanced interactions
    initMenuItemInteractions();
    initLocationSearch();
    initOrderTracking();
    
    console.log('Shake Shack-inspired template initialized successfully');
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
                if (mobileToggle.classList.contains('active')) {
                    if (index === 0) {
                        span.style.transform = 'rotate(45deg) translateY(6px)';
                    } else if (index === 1) {
                        span.style.opacity = '0';
                    } else if (index === 2) {
                        span.style.transform = 'rotate(-45deg) translateY(-6px)';
                    }
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
        
        // Close mobile menu when clicking nav links
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('mobile-active');
                mobileToggle.classList.remove('active');
                // Reset hamburger animation
                const spans = mobileToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });
    }
}

// Menu Navigation Functionality
function initMenuNavigation() {
    const menuNavBtns = document.querySelectorAll('.menu-nav-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Remove active class from all buttons
            menuNavBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter menu items with animation
            menuItems.forEach(item => {
                const itemCategory = item.dataset.category;
                const shouldShow = category === 'all' || itemCategory === category;
                
                if (shouldShow) {
                    item.classList.remove('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.classList.add('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                }
            });
            
            // Update URL hash for bookmarking
            if (category !== 'all') {
                history.replaceState(null, null, `#menu-${category}`);
            } else {
                history.replaceState(null, null, '#menu');
            }
        });
    });
    
    // Check URL hash on load
    const hash = window.location.hash;
    if (hash.startsWith('#menu-')) {
        const category = hash.replace('#menu-', '');
        const targetBtn = document.querySelector(`[data-category="${category}"]`);
        if (targetBtn) {
            targetBtn.click();
        }
    }
}

// Location Filters Functionality
function initLocationFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
    const locationCards = document.querySelectorAll('.location-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter location cards
            locationCards.forEach(card => {
                const services = card.querySelectorAll('.service');
                let shouldShow = filter === 'all';
                
                if (!shouldShow) {
                    services.forEach(service => {
                        if (service.textContent.toLowerCase().includes(filter.toLowerCase())) {
                            shouldShow = true;
                        }
                    });
                }
                
                if (shouldShow) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.menu-item, .quality-feature, .package, .story-value, .location-card');
    
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
            this.style.borderColor = 'var(--primary-color)';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement?.classList.remove('focused');
            }
            this.style.borderColor = '';
        });
    });
    
    // Handle form submissions
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Processing...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = 'Success!';
                    submitBtn.style.background = 'var(--primary-color)';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        this.reset();
                    }, 2000);
                }, 1000);
            }
        });
    });
}

// Menu Item Interactions
function initMenuItemInteractions() {
    const menuItems = document.querySelectorAll('.menu-item');
    let orderItems = [];
    let orderTotal = 0;
    
    menuItems.forEach(item => {
        const addBtn = item.querySelector('.btn-small');
        const itemName = item.querySelector('.menu-item-name')?.textContent;
        const priceText = item.querySelector('.menu-item-price')?.textContent;
        
        if (addBtn && itemName && priceText) {
            addBtn.addEventListener('click', function() {
                const price = parseFloat(priceText.replace(/[$,]/g, '')) || 0;
                
                // Add to order
                orderItems.push({ name: itemName, price: price });
                orderTotal += price;
                
                // Update button temporarily
                const originalText = this.textContent;
                this.textContent = 'Added!';
                this.style.background = 'var(--primary-color)';
                this.style.color = 'white';
                
                // Show order notification
                showOrderNotification(itemName, orderTotal);
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                    this.style.color = '';
                }, 1500);
            });
        }
    });
}

// Show Order Notification
function showOrderNotification(itemName, total) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.order-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'order-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="item-icon">🍔</span>
            <div class="notification-text">
                <div class="item-added">${itemName} added to order</div>
                <div class="order-total">Total: $${total.toFixed(2)}</div>
            </div>
            <button class="view-order-btn">View Order</button>
        </div>
    `;
    
    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: 'white',
        border: '1px solid var(--border-light)',
        borderLeft: '4px solid var(--primary-color)',
        padding: '1rem',
        borderRadius: 'var(--border-radius)',
        boxShadow: 'var(--card-shadow)',
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        minWidth: '280px'
    });
    
    // Style notification content
    const content = notification.querySelector('.notification-content');
    content.style.display = 'flex';
    content.style.alignItems = 'center';
    content.style.gap = '1rem';
    
    const itemIcon = notification.querySelector('.item-icon');
    itemIcon.style.fontSize = '1.5rem';
    
    const textDiv = notification.querySelector('.notification-text');
    textDiv.style.flex = '1';
    
    const itemAdded = notification.querySelector('.item-added');
    itemAdded.style.fontWeight = '500';
    itemAdded.style.color = 'var(--text-dark)';
    itemAdded.style.fontSize = '0.95rem';
    
    const orderTotalEl = notification.querySelector('.order-total');
    orderTotalEl.style.color = 'var(--primary-color)';
    orderTotalEl.style.fontSize = '0.85rem';
    orderTotalEl.style.fontWeight = '600';
    
    const viewBtn = notification.querySelector('.view-order-btn');
    viewBtn.style.background = 'var(--primary-color)';
    viewBtn.style.color = 'white';
    viewBtn.style.border = 'none';
    viewBtn.style.padding = '6px 12px';
    viewBtn.style.borderRadius = '4px';
    viewBtn.style.fontSize = '0.8rem';
    viewBtn.style.cursor = 'pointer';
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
    
    // View order button functionality
    viewBtn.addEventListener('click', () => {
        alert('Order functionality would integrate with your ordering system here.');
    });
}

// Location Search Enhancement
function initLocationSearch() {
    const locationInput = document.querySelector('.location-input');
    const searchBtn = document.querySelector('.search-input .btn');
    
    if (locationInput) {
        // Add search functionality
        locationInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const locationCards = document.querySelectorAll('.location-card');
            
            locationCards.forEach(card => {
                const locationName = card.querySelector('h3')?.textContent.toLowerCase() || '';
                const address = card.querySelector('.location-address')?.textContent.toLowerCase() || '';
                
                const matches = locationName.includes(query) || address.includes(query) || query === '';
                
                card.style.display = matches ? 'block' : 'none';
                
                if (matches && query !== '') {
                    card.style.border = '2px solid var(--primary-color)';
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

// Order Tracking (simulated)
function initOrderTracking() {
    const orderBtns = document.querySelectorAll('.btn-primary');
    
    orderBtns.forEach(btn => {
        if (btn.textContent.includes('Order')) {
            btn.addEventListener('click', function() {
                // Simulate order placement
                const orderNumber = Math.floor(Math.random() * 10000) + 1000;
                const estimatedTime = Math.floor(Math.random() * 20) + 10;
                
                showOrderTracking(orderNumber, estimatedTime);
            });
        }
    });
}

// Show Order Tracking
function showOrderTracking(orderNumber, estimatedTime) {
    // Create modal-like overlay
    const overlay = document.createElement('div');
    overlay.className = 'order-tracking-overlay';
    
    overlay.innerHTML = `
        <div class="order-tracking-modal">
            <div class="tracking-header">
                <h3>Order Confirmed!</h3>
                <button class="close-tracking">&times;</button>
            </div>
            <div class="tracking-content">
                <div class="order-info">
                    <p><strong>Order #${orderNumber}</strong></p>
                    <p>Estimated time: ${estimatedTime} minutes</p>
                </div>
                <div class="tracking-progress">
                    <div class="progress-step active">
                        <div class="step-icon">✓</div>
                        <div class="step-text">Order Received</div>
                    </div>
                    <div class="progress-step">
                        <div class="step-icon">👨‍🍳</div>
                        <div class="step-text">Preparing</div>
                    </div>
                    <div class="progress-step">
                        <div class="step-icon">🎉</div>
                        <div class="step-text">Ready</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Style overlay
    Object.assign(overlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '2000'
    });
    
    // Style modal
    const modal = overlay.querySelector('.order-tracking-modal');
    Object.assign(modal.style, {
        background: 'white',
        padding: '2rem',
        borderRadius: 'var(--border-radius)',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    });
    
    // Style progress steps
    const steps = overlay.querySelectorAll('.progress-step');
    steps.forEach((step, index) => {
        step.style.display = 'flex';
        step.style.alignItems = 'center';
        step.style.gap = '1rem';
        step.style.padding = '0.5rem';
        step.style.marginBottom = '1rem';
        
        if (step.classList.contains('active')) {
            step.style.background = 'var(--accent-color)';
            step.style.borderRadius = 'var(--border-radius)';
        }
    });
    
    document.body.appendChild(overlay);
    
    // Close functionality
    const closeBtn = overlay.querySelector('.close-tracking');
    closeBtn.addEventListener('click', () => {
        overlay.remove();
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
    
    // Simulate progress updates
    setTimeout(() => {
        steps[1].classList.add('active');
        steps[1].style.background = 'var(--accent-color)';
        steps[1].style.borderRadius = 'var(--border-radius)';
    }, 3000);
    
    setTimeout(() => {
        steps[2].classList.add('active');
        steps[2].style.background = 'var(--accent-color)';
        steps[2].style.borderRadius = 'var(--border-radius)';
    }, estimatedTime * 1000);
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
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            const mobileMenu = document.querySelector('.nav.mobile-active');
            if (mobileMenu) {
                mobileMenu.classList.remove('mobile-active');
            }
            
            // Close order tracking
            const orderTracking = document.querySelector('.order-tracking-overlay');
            if (orderTracking) {
                orderTracking.remove();
            }
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
window.ShakeShackTemplate = {
    initializeTemplate,
    initMobileMenu,
    initMenuNavigation,
    initLocationFilters,
    showOrderNotification,
    showOrderTracking
};