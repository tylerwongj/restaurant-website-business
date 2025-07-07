// Food Truck Mobile JavaScript

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
                navMenu.style.background = 'var(--bg-white)';
                navMenu.style.padding = '20px';
                navMenu.style.boxShadow = '0 4px 15px var(--shadow)';
                navMenu.style.gap = '20px';
                navMenu.style.borderBottom = '3px solid var(--truck-primary)';
                
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

    // Find truck button functionality
    const findTruckButtons = document.querySelectorAll('.btn-find-truck, .btn-find-location');
    findTruckButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to tracker section
            const trackerSection = document.getElementById('tracker');
            if (trackerSection) {
                trackerSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Show truck location modal
            showTruckLocationModal();
        });
    });

    function showTruckLocationModal() {
        const modal = document.createElement('div');
        modal.className = 'location-modal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🚚 Live Truck Location</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="current-location-info">
                        <div class="location-status">
                            <span class="status-dot active"></span>
                            <span class="status-text">Currently Serving</span>
                        </div>
                        <h4>Downtown Food Court</h4>
                        <p>123 Main Street, Downtown</p>
                        <p class="hours">Open until 8:00 PM</p>
                        <div class="eta-info">
                            <span class="eta-label">ETA if you leave now:</span>
                            <span class="eta-time">12-15 minutes</span>
                        </div>
                    </div>
                    <div class="location-actions">
                        <button class="btn btn-primary btn-directions">Get Directions</button>
                        <button class="btn btn-secondary btn-call-truck">Call Truck</button>
                    </div>
                    <div class="next-location">
                        <h4>Next Stop</h4>
                        <p>City Park (3:00 PM - 7:00 PM)</p>
                    </div>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 100);
        
        // Close modal functionality
        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        };
        
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', closeModal);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Direction and call buttons
        const directionsBtn = modal.querySelector('.btn-directions');
        const callBtn = modal.querySelector('.btn-call-truck');
        
        directionsBtn.addEventListener('click', function() {
            showNotification('Opening directions to our truck location...', 'info');
            closeModal();
        });
        
        callBtn.addEventListener('click', function() {
            showNotification('Calling food truck directly...', 'success');
            closeModal();
        });
    }

    // Menu item add to order functionality
    const addItemButtons = document.querySelectorAll('.btn-add-item');
    let cart = [];
    let cartTotal = 0;

    addItemButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemName = menuItem.querySelector('h4').textContent;
            
            // For signature items with complex pricing
            if (menuItem.classList.contains('featured')) {
                showItemCustomizationModal(itemName, menuItem);
            } else {
                // For simple items
                const priceText = menuItem.querySelector('.price').textContent;
                const price = parseFloat(priceText.replace('$', ''));
                
                addToCart(itemName, price);
                showCartNotification(itemName, price);
            }
        });
    });

    function showItemCustomizationModal(itemName, menuItem) {
        const modal = document.createElement('div');
        modal.className = 'customization-modal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Customize ${itemName}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="customization-section">
                        <h4>Size Options</h4>
                        <div class="size-options">
                            <label class="size-option">
                                <input type="radio" name="size" value="regular" data-price="12.99" checked>
                                <span class="option-label">Regular - $12.99</span>
                            </label>
                            <label class="size-option">
                                <input type="radio" name="size" value="large" data-price="15.99">
                                <span class="option-label">Large - $15.99</span>
                            </label>
                        </div>
                    </div>
                    <div class="customization-section">
                        <h4>Add-ons</h4>
                        <div class="addon-options">
                            <label class="addon-option">
                                <input type="checkbox" value="extra-sauce" data-price="1.50">
                                <span class="option-label">Extra Sauce (+$1.50)</span>
                            </label>
                            <label class="addon-option">
                                <input type="checkbox" value="extra-cheese" data-price="2.00">
                                <span class="option-label">Extra Cheese (+$2.00)</span>
                            </label>
                            <label class="addon-option">
                                <input type="checkbox" value="spicy" data-price="0.50">
                                <span class="option-label">Make it Spicy (+$0.50)</span>
                            </label>
                        </div>
                    </div>
                    <div class="quantity-section">
                        <h4>Quantity</h4>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity-display">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                    </div>
                    <div class="price-summary">
                        <span class="total-label">Total: </span>
                        <span class="total-price">$12.99</span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary btn-add-to-cart">Add to Order</button>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 100);
        
        // Quantity controls
        let quantity = 1;
        const minusBtn = modal.querySelector('.quantity-btn.minus');
        const plusBtn = modal.querySelector('.quantity-btn.plus');
        const quantityDisplay = modal.querySelector('.quantity-display');
        
        function updateQuantity(newQuantity) {
            quantity = Math.max(1, newQuantity);
            quantityDisplay.textContent = quantity;
            updateTotalPrice();
        }
        
        minusBtn.addEventListener('click', () => updateQuantity(quantity - 1));
        plusBtn.addEventListener('click', () => updateQuantity(quantity + 1));
        
        // Price calculation
        function updateTotalPrice() {
            const sizeRadio = modal.querySelector('input[name="size"]:checked');
            const sizePrice = parseFloat(sizeRadio.dataset.price);
            
            const addonCheckboxes = modal.querySelectorAll('.addon-option input:checked');
            let addonPrice = 0;
            addonCheckboxes.forEach(checkbox => {
                addonPrice += parseFloat(checkbox.dataset.price);
            });
            
            const totalPrice = (sizePrice + addonPrice) * quantity;
            modal.querySelector('.total-price').textContent = `$${totalPrice.toFixed(2)}`;
        }
        
        // Update price when options change
        modal.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
            input.addEventListener('change', updateTotalPrice);
        });
        
        // Close modal functionality
        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        };
        
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', closeModal);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Add to cart
        const addToCartBtn = modal.querySelector('.btn-add-to-cart');
        addToCartBtn.addEventListener('click', function() {
            const finalPrice = parseFloat(modal.querySelector('.total-price').textContent.replace('$', ''));
            const customizations = [];
            
            // Get selected size
            const selectedSize = modal.querySelector('input[name="size"]:checked').value;
            customizations.push(selectedSize);
            
            // Get selected addons
            const selectedAddons = modal.querySelectorAll('.addon-option input:checked');
            selectedAddons.forEach(addon => {
                customizations.push(addon.value);
            });
            
            const customItemName = `${itemName} (${customizations.join(', ')}) x${quantity}`;
            
            addToCart(customItemName, finalPrice);
            showCartNotification(customItemName, finalPrice);
            closeModal();
        });
    }

    function addToCart(itemName, price) {
        cart.push({
            name: itemName,
            price: price
        });
        cartTotal += price;
    }

    function showCartNotification(itemName, price) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">🚚</span>
                <span class="notification-text">${itemName} added to order</span>
                <span class="notification-price">$${price.toFixed(2)}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--truck-primary);
            color: var(--bg-white);
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            font-weight: bold;
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

    // Order now buttons
    const orderButtons = document.querySelectorAll('.nav-cta, .banner-cta');
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (cart.length > 0) {
                showOrderSummary();
            } else {
                showPreOrderModal();
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
                    <h3>🚚 Your Order Summary</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="order-items">
                        ${cartHTML}
                    </div>
                    <div class="order-total">
                        <strong>Total: $${cartTotal.toFixed(2)}</strong>
                    </div>
                    <div class="pickup-info">
                        <h4>Pickup Information</h4>
                        <p>Current Location: Downtown Food Court</p>
                        <p>Estimated prep time: 8-12 minutes</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary btn-call-order">Call in Order</button>
                    <button class="btn btn-primary btn-submit-order">Submit Order</button>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 100);
        
        // Close modal functionality
        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', function() {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal.click();
            }
        });
        
        // Order buttons
        const callOrderBtn = modal.querySelector('.btn-call-order');
        const submitOrderBtn = modal.querySelector('.btn-submit-order');
        
        callOrderBtn.addEventListener('click', function() {
            showNotification('Calling food truck to place order...', 'success');
            closeModal.click();
        });
        
        submitOrderBtn.addEventListener('click', function() {
            showNotification('Order submitted! Please come to our truck to pay and pickup.', 'success');
            cart = [];
            cartTotal = 0;
            closeModal.click();
        });
    }

    function showPreOrderModal() {
        const modal = document.createElement('div');
        modal.className = 'pre-order-modal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Pre-Order Form</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="pre-order-form">
                        <div class="form-group">
                            <label for="preorder-name">Name</label>
                            <input type="text" id="preorder-name" required>
                        </div>
                        <div class="form-group">
                            <label for="preorder-phone">Phone</label>
                            <input type="tel" id="preorder-phone" required>
                        </div>
                        <div class="form-group">
                            <label for="preorder-pickup">Preferred Pickup Location</label>
                            <select id="preorder-pickup" required>
                                <option value="">Select Location</option>
                                <option value="downtown">Downtown Food Court</option>
                                <option value="park">City Park</option>
                                <option value="university">University Campus</option>
                                <option value="plaza">Shopping Plaza</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="preorder-time">Preferred Pickup Time</label>
                            <select id="preorder-time" required>
                                <option value="">Select Time</option>
                                <option value="11:00">11:00 AM</option>
                                <option value="12:00">12:00 PM</option>
                                <option value="13:00">1:00 PM</option>
                                <option value="14:00">2:00 PM</option>
                                <option value="15:00">3:00 PM</option>
                                <option value="16:00">4:00 PM</option>
                                <option value="17:00">5:00 PM</option>
                                <option value="18:00">6:00 PM</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="preorder-items">Order Details</label>
                            <textarea id="preorder-items" placeholder="Please describe your order..." required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary btn-full">Submit Pre-Order</button>
                    </form>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 100);
        
        // Close modal functionality
        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        };
        
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', closeModal);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Form submission
        const preOrderForm = modal.querySelector('.pre-order-form');
        preOrderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            showNotification('Pre-order submitted! We will contact you to confirm pickup details.', 'success');
            closeModal();
        });
    }

    // Contact form handling
    const contactForm = document.querySelector('.truck-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            const requiredFields = ['type', 'name', 'email', 'message'];
            const missingFields = requiredFields.filter(field => !data[field]);
            
            if (missingFields.length > 0) {
                showNotification('Please fill in all required fields.', 'warning');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending Message...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent! We will get back to you soon.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        let bgColor;
        switch(type) {
            case 'success':
                bgColor = 'var(--success)';
                break;
            case 'warning':
                bgColor = 'var(--warning)';
                break;
            case 'info':
                bgColor = 'var(--info)';
                break;
            default:
                bgColor = 'var(--truck-primary)';
        }
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${bgColor};
            color: var(--bg-white);
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
            max-width: 90%;
            text-align: center;
            font-weight: bold;
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
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.location-card, .upcoming-stop, .tracker-feature, .menu-item, .schedule-day, .event-type, .highlight-item, .order-option');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });

    // Navigation scroll effect
    const nav = document.querySelector('.nav-truck');
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.background = 'var(--bg-white)';
            nav.style.backdropFilter = 'none';
        }
    });

    // Location banner animation
    const locationBanner = document.querySelector('.location-banner');
    if (locationBanner) {
        setInterval(() => {
            locationBanner.style.background = 'var(--truck-secondary)';
            setTimeout(() => {
                locationBanner.style.background = 'var(--truck-primary)';
            }, 1000);
        }, 5000);
    }

    // Menu item hover effects
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Location card hover effects
    document.querySelectorAll('.location-card, .tracker-feature, .order-option').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add CSS for modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-content {
            background: var(--bg-white);
            border-radius: 15px;
            padding: 40px;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            border: 3px solid var(--truck-primary);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            border-bottom: 2px solid var(--truck-primary);
            padding-bottom: 15px;
        }
        
        .modal-header h3 {
            font-family: 'Fredoka One', cursive;
            color: var(--truck-primary);
            font-size: 1.5rem;
        }
        
        .close-modal {
            background: none;
            border: none;
            font-size: 28px;
            cursor: pointer;
            color: var(--text-dark);
            font-weight: bold;
        }
        
        .current-location-info {
            background: var(--truck-light);
            padding: 25px;
            border-radius: 15px;
            margin-bottom: 25px;
            border: 2px solid var(--truck-primary);
        }
        
        .location-status {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .status-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: var(--success);
            animation: pulse 2s infinite;
        }
        
        .status-text {
            font-weight: bold;
            color: var(--success);
        }
        
        .current-location-info h4 {
            color: var(--truck-primary);
            font-size: 1.3rem;
            margin-bottom: 8px;
        }
        
        .current-location-info p {
            color: var(--text-medium);
            margin-bottom: 6px;
        }
        
        .hours {
            font-weight: bold;
            color: var(--text-dark);
        }
        
        .eta-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid var(--border-light);
        }
        
        .eta-label {
            color: var(--text-medium);
        }
        
        .eta-time {
            font-weight: bold;
            color: var(--truck-primary);
            font-size: 1.1rem;
        }
        
        .location-actions {
            display: flex;
            gap: 15px;
            margin-bottom: 25px;
            flex-wrap: wrap;
        }
        
        .next-location {
            background: var(--bg-light);
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid var(--truck-secondary);
        }
        
        .next-location h4 {
            color: var(--truck-primary);
            margin-bottom: 8px;
        }
        
        .next-location p {
            color: var(--text-medium);
        }
        
        .customization-section {
            margin-bottom: 25px;
        }
        
        .customization-section h4 {
            color: var(--truck-primary);
            margin-bottom: 15px;
        }
        
        .size-options, .addon-options {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .size-option, .addon-option {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px;
            background: var(--bg-light);
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .size-option:hover, .addon-option:hover {
            background: var(--truck-light);
        }
        
        .size-option input, .addon-option input {
            margin: 0;
        }
        
        .option-label {
            font-weight: 600;
            color: var(--text-dark);
        }
        
        .quantity-section {
            margin-bottom: 25px;
        }
        
        .quantity-section h4 {
            color: var(--truck-primary);
            margin-bottom: 15px;
        }
        
        .quantity-controls {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .quantity-btn {
            background: var(--truck-primary);
            color: var(--bg-white);
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .quantity-btn:hover {
            background: var(--truck-secondary);
        }
        
        .quantity-display {
            font-size: 18px;
            font-weight: bold;
            color: var(--text-dark);
            min-width: 30px;
            text-align: center;
        }
        
        .price-summary {
            background: var(--truck-light);
            padding: 20px;
            border-radius: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 25px;
        }
        
        .total-label {
            color: var(--text-dark);
        }
        
        .total-price {
            color: var(--truck-primary);
        }
        
        .modal-footer {
            border-top: 2px solid var(--truck-light);
            padding-top: 20px;
            display: flex;
            gap: 15px;
            justify-content: flex-end;
        }
        
        .order-items {
            margin-bottom: 20px;
        }
        
        .cart-item {
            display: flex;
            justify-content: space-between;
            padding: 15px 0;
            border-bottom: 1px solid var(--border-light);
            font-weight: 600;
        }
        
        .item-name {
            color: var(--text-dark);
        }
        
        .item-price {
            color: var(--truck-primary);
        }
        
        .order-total {
            margin-bottom: 25px;
            padding: 20px;
            background: var(--truck-light);
            border-radius: 10px;
            text-align: center;
            font-size: 1.3rem;
            color: var(--truck-primary);
        }
        
        .pickup-info {
            background: var(--bg-light);
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 25px;
        }
        
        .pickup-info h4 {
            color: var(--truck-primary);
            margin-bottom: 10px;
        }
        
        .pickup-info p {
            color: var(--text-medium);
            margin-bottom: 5px;
        }
        
        .pre-order-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
        }
        
        .form-group label {
            color: var(--text-dark);
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            padding: 12px;
            border: 2px solid var(--border-light);
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--truck-primary);
        }
        
        .form-group textarea {
            min-height: 100px;
            resize: vertical;
        }
        
        @media (max-width: 768px) {
            .modal-content {
                padding: 30px 20px;
                width: 95%;
            }
            
            .location-actions,
            .modal-footer {
                flex-direction: column;
            }
            
            .quantity-controls {
                justify-content: center;
            }
        }
    `;
    document.head.appendChild(style);

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.querySelector('.location-modal, .customization-modal, .order-modal, .pre-order-modal');
            if (modal) {
                modal.querySelector('.close-modal').click();
            }
            
            if (isMenuOpen) {
                mobileToggle.click();
            }
        }
    });

    // Notification when page loads for demo
    setTimeout(() => {
        showNotification('🚚 We are currently serving at Downtown Food Court!', 'info');
    }, 2000);
});