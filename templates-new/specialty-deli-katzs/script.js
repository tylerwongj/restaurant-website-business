// Specialty Deli Template JavaScript

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
                navMenu.style.background = 'var(--cream)';
                navMenu.style.padding = '20px';
                navMenu.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                navMenu.style.gap = '20px';
                navMenu.style.border = '3px solid var(--primary-red)';
                navMenu.style.borderTop = 'none';
                
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

    // Deli item hover effects
    const deliItems = document.querySelectorAll('.deli-item');
    deliItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
    });

    // Add to cart functionality
    let cart = [];
    let cartTotal = 0;

    const addItemButtons = document.querySelectorAll('.btn-add-item');
    addItemButtons.forEach(button => {
        button.addEventListener('click', function() {
            const deliItem = this.closest('.deli-item');
            const itemName = deliItem.querySelector('h3').textContent;
            const itemPrice = parseFloat(deliItem.querySelector('.item-price').textContent.replace('$', ''));
            
            // Add item to cart
            cart.push({
                name: itemName,
                price: itemPrice
            });
            
            cartTotal += itemPrice;
            
            // Visual feedback
            const originalText = this.textContent;
            this.textContent = 'Added to Order!';
            this.style.background = 'var(--accent-gold)';
            this.style.color = 'var(--text-dark)';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = 'var(--text-dark)';
                this.style.color = 'var(--text-cream)';
            }, 2000);
            
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
                <span class="notification-text">${itemName} added to order</span>
                <span class="notification-price">$${price.toFixed(2)}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-red);
            color: var(--text-cream);
            padding: 15px 20px;
            border: 3px solid var(--text-dark);
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            font-family: Arial, sans-serif;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
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
        }, 3500);
    }

    // Order now buttons
    const orderButtons = document.querySelectorAll('.btn-order, .nav-cta');
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (cart.length > 0) {
                showOrderSummary();
            } else {
                showNotification('Add some delicious deli items to your order first!', 'warning');
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
                    <h3>Your Deli Order</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    ${cartHTML}
                    <div class="cart-total">
                        <strong>Total: $${cartTotal.toFixed(2)}</strong>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-place-order">Place Order</button>
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
        
        // Place order button
        const placeOrderBtn = modal.querySelector('.btn-place-order');
        placeOrderBtn.addEventListener('click', function() {
            showNotification('Order placed! We\'ll have your delicious food ready soon.', 'success');
            cart = [];
            cartTotal = 0;
            closeModal.click();
        });
    }

    // Category buttons
    const categoryButtons = document.querySelectorAll('.btn-category');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const categoryName = this.closest('.category-card').querySelector('h3').textContent;
            showNotification(`Viewing ${categoryName} menu...`, 'info');
        });
    });

    // Catering button
    const cateringButton = document.querySelector('.btn-catering');
    if (cateringButton) {
        cateringButton.addEventListener('click', function() {
            showCateringForm();
        });
    }

    function showCateringForm() {
        const modal = document.createElement('div');
        modal.className = 'catering-modal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Catering Request</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="catering-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="event-date">Event Date</label>
                                <input type="date" id="event-date" required>
                            </div>
                            <div class="form-group">
                                <label for="guest-count">Number of Guests</label>
                                <input type="number" id="guest-count" min="10" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="event-type">Event Type</label>
                            <select id="event-type" required>
                                <option value="">Select Event Type</option>
                                <option value="corporate">Corporate Meeting</option>
                                <option value="party">Private Party</option>
                                <option value="wedding">Wedding</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="contact-name">Contact Name</label>
                            <input type="text" id="contact-name" required>
                        </div>
                        <div class="form-group">
                            <label for="contact-phone">Phone Number</label>
                            <input type="tel" id="contact-phone" required>
                        </div>
                        <div class="form-group">
                            <label for="contact-email">Email</label>
                            <input type="email" id="contact-email" required>
                        </div>
                        <div class="form-group">
                            <label for="special-requests">Special Requests</label>
                            <textarea id="special-requests" rows="4"></textarea>
                        </div>
                        <button type="submit" class="btn-submit-catering">Submit Request</button>
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
            overflow-y: auto;
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
        
        // Form submission
        const cateringForm = modal.querySelector('.catering-form');
        cateringForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const contactName = document.getElementById('contact-name').value;
            showNotification(`Thank you, ${contactName}! We'll contact you within 24 hours with a detailed quote.`, 'success');
            closeModal.click();
        });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.email-input');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                const submitBtn = this.querySelector('.btn-newsletter');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Subscribed!';
                submitBtn.style.background = 'var(--accent-gold)';
                emailInput.value = '';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = 'var(--primary-red)';
                }, 2000);
                
                showNotification('Welcome to our deli family! Check your email for exclusive offers.', 'success');
            } else {
                showNotification('Please enter a valid email address.', 'warning');
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
        
        let bgColor;
        switch(type) {
            case 'success':
                bgColor = 'var(--accent-gold)';
                break;
            case 'warning':
                bgColor = 'var(--mustard)';
                break;
            case 'info':
                bgColor = 'var(--primary-red)';
                break;
            default:
                bgColor = 'var(--text-dark)';
        }
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${bgColor};
            color: var(--text-dark);
            padding: 15px 25px;
            border: 3px solid var(--text-dark);
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
            max-width: 90%;
            text-align: center;
            font-family: Arial, sans-serif;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
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

    // Directions button
    const directionsButton = document.querySelector('.btn-directions');
    if (directionsButton) {
        directionsButton.addEventListener('click', function() {
            showNotification('Opening directions in your maps app...', 'info');
        });
    }

    // Map button
    const mapButton = document.querySelector('.btn-map');
    if (mapButton) {
        mapButton.addEventListener('click', function() {
            showNotification('Opening full map view...', 'info');
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
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.deli-item, .category-card, .timeline-item');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });

    // Navigation scroll effect
    const nav = document.querySelector('.nav-deli');
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.style.background = 'rgba(254, 247, 237, 0.98)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.background = 'var(--cream)';
            nav.style.backdropFilter = 'none';
        }
    });

    // Button press effects
    const buttons = document.querySelectorAll('button, .nav-cta, .btn-menu');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add CSS for modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-content {
            background: var(--cream);
            border: 5px solid var(--primary-red);
            padding: 40px;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            border-bottom: 3px solid var(--primary-red);
            padding-bottom: 15px;
        }
        
        .modal-header h3 {
            font-family: Arial, sans-serif;
            font-weight: 900;
            color: var(--primary-red);
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: 1.5rem;
        }
        
        .close-modal {
            background: none;
            border: none;
            font-size: 28px;
            cursor: pointer;
            color: var(--text-dark);
            font-weight: 900;
        }
        
        .cart-item {
            display: flex;
            justify-content: space-between;
            padding: 15px 0;
            border-bottom: 2px solid var(--primary-red);
            font-family: Arial, sans-serif;
            font-weight: 600;
        }
        
        .cart-total {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 3px solid var(--primary-red);
            text-align: right;
            font-size: 1.3rem;
            font-family: Arial, sans-serif;
            font-weight: 900;
            color: var(--primary-red);
            text-transform: uppercase;
        }
        
        .btn-place-order {
            background: var(--primary-red);
            color: var(--text-cream);
            border: 3px solid var(--primary-red);
            padding: 15px 30px;
            font-weight: 700;
            cursor: pointer;
            width: 100%;
            font-size: 16px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-family: Arial, sans-serif;
            transition: all 0.3s ease;
        }
        
        .btn-place-order:hover {
            background: var(--text-cream);
            color: var(--primary-red);
        }
        
        .catering-form {
            display: grid;
            gap: 20px;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
        }
        
        .form-group label {
            font-family: Arial, sans-serif;
            font-weight: 700;
            color: var(--text-dark);
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 14px;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            padding: 12px;
            border: 3px solid var(--primary-red);
            background: var(--bg-white);
            color: var(--text-dark);
            font-size: 16px;
            font-family: Arial, sans-serif;
            outline: none;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            border-color: var(--mustard);
        }
        
        .btn-submit-catering {
            background: var(--mustard);
            color: var(--text-dark);
            border: 3px solid var(--mustard);
            padding: 15px 30px;
            font-weight: 700;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-family: Arial, sans-serif;
            transition: all 0.3s ease;
        }
        
        .btn-submit-catering:hover {
            background: var(--text-dark);
            color: var(--text-cream);
            border-color: var(--text-dark);
        }
        
        @media (max-width: 768px) {
            .form-row {
                grid-template-columns: 1fr;
            }
            
            .modal-content {
                padding: 30px 20px;
                width: 95%;
            }
        }
    `;
    document.head.appendChild(style);

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.querySelector('.order-modal, .catering-modal');
            if (modal) {
                modal.querySelector('.close-modal').click();
            }
            
            if (isMenuOpen) {
                mobileToggle.click();
            }
        }
    });
});