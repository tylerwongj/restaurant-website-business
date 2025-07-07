// Healthy Fast-Casual Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    let isMenuOpen = false;

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'white';
                navMenu.style.padding = '20px';
                navMenu.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                navMenu.style.gap = '20px';
                navMenu.style.borderRadius = '0 0 15px 15px';
                
                // Animate hamburger
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                navMenu.style.display = 'none';
                
                // Reset hamburger
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (isMenuOpen) {
                    mobileToggle.click();
                }
            }
        });
    });

    // Food card animations
    const foodCards = document.querySelectorAll('.food-card');
    foodCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add to cart functionality
    let cart = [];
    let cartTotal = 0;

    const addItemButtons = document.querySelectorAll('.btn-add-item');
    addItemButtons.forEach(button => {
        button.addEventListener('click', function() {
            const foodCard = this.closest('.food-card');
            const itemName = foodCard.querySelector('h3').textContent;
            const itemPrice = parseFloat(foodCard.querySelector('.food-price').textContent.replace('$', ''));
            
            // Add item to cart
            cart.push({
                name: itemName,
                price: itemPrice
            });
            
            cartTotal += itemPrice;
            
            // Visual feedback
            this.textContent = 'Added!';
            this.style.background = 'var(--success)';
            
            setTimeout(() => {
                this.textContent = 'Add to Order';
                this.style.background = 'var(--primary-green)';
            }, 1500);
            
            // Show cart notification
            showCartNotification(itemName, itemPrice);
        });
    });

    function showCartNotification(itemName, price) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">✓</span>
                <span class="notification-text">${itemName} added to cart</span>
                <span class="notification-price">$${price.toFixed(2)}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-green);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.email-input');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                // Simulate subscription
                const submitBtn = this.querySelector('.btn-subscribe');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Subscribing...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = 'Subscribed!';
                    submitBtn.style.background = 'var(--success)';
                    emailInput.value = '';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = 'var(--accent-orange)';
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1000);
                
                showNotification('Welcome to our fresh community! Check your email for a special offer.', 'success');
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        const bgColor = type === 'success' ? 'var(--success)' : 'var(--accent-orange)';
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${bgColor};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
            max-width: 90%;
            text-align: center;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    // Order now buttons
    const orderButtons = document.querySelectorAll('.btn-order-now, .nav-cta');
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (cart.length > 0) {
                showOrderSummary();
            } else {
                showNotification('Add some delicious items to your cart first!', 'error');
            }
        });
    });

    function showOrderSummary() {
        const modal = document.createElement('div');
        modal.className = 'order-modal';
        
        let cartHTML = cart.map(item => `
            <div class="cart-item">
                <span class="item-name">${item.name}</span>
                <span class="item-price">$${item.price.toFixed(2)}</span>
            </div>
        `).join('');
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Your Order</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    ${cartHTML}
                    <div class="cart-total">
                        <strong>Total: $${cartTotal.toFixed(2)}</strong>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-continue-order">Continue to Checkout</button>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background: white;
            border-radius: 15px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 100);
        
        // Close modal functionality
        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', function() {
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.8)';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal.click();
            }
        });
    }

    // Build bowl button
    const buildBowlBtn = document.querySelector('.btn-build-bowl');
    if (buildBowlBtn) {
        buildBowlBtn.addEventListener('click', function() {
            showNotification('Bowl builder would open here - customize your perfect meal!', 'success');
        });
    }

    // Location buttons
    const locationButtons = document.querySelectorAll('.btn-location');
    locationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const locationCard = this.closest('.location-card');
            const locationName = locationCard.querySelector('h3').textContent;
            showNotification(`Opening directions to ${locationName}...`, 'success');
        });
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-fresh');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special handling for cards
                if (entry.target.classList.contains('food-card') || 
                    entry.target.classList.contains('nutrition-card') ||
                    entry.target.classList.contains('location-card')) {
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.food-card, .nutrition-card, .location-card, .sustainability-item, .seasonal-item');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });

    // Stagger animation for step items
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        
        const stepObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, observerOptions);
        
        stepObserver.observe(item);
    });

    // Navigation scroll effect
    const nav = document.querySelector('.nav-fresh');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.backdropFilter = 'blur(10px)';
            nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            nav.style.background = 'white';
            nav.style.backdropFilter = 'none';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Button ripple effects
    const buttons = document.querySelectorAll('button, .nav-cta, .btn-view-menu');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .cart-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .cart-total {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 2px solid var(--primary-green);
            text-align: right;
            font-size: 1.2rem;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .close-modal {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #6b7280;
        }
        
        .modal-footer {
            margin-top: 20px;
        }
        
        .btn-continue-order {
            background: var(--primary-green);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        
        .btn-continue-order:hover {
            background: var(--dark-green);
            transform: translateY(-1px);
        }
    `;
    document.head.appendChild(style);

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.querySelector('.order-modal');
            if (modal) {
                modal.querySelector('.close-modal').click();
            }
            
            if (isMenuOpen) {
                mobileToggle.click();
            }
        }
    });
});