// Pizza Italian Family Restaurant JavaScript

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
                navMenu.style.background = 'var(--warm-cream)';
                navMenu.style.padding = '20px';
                navMenu.style.boxShadow = '0 4px 15px var(--shadow)';
                navMenu.style.gap = '20px';
                navMenu.style.borderBottom = '3px solid var(--primary-green)';
                
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

    // Daily specials slider
    let currentSpecial = 0;
    const specialItems = document.querySelectorAll('.special-item');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    function showSpecial(index) {
        specialItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentSpecial = (currentSpecial - 1 + specialItems.length) % specialItems.length;
            showSpecial(currentSpecial);
        });

        nextBtn.addEventListener('click', function() {
            currentSpecial = (currentSpecial + 1) % specialItems.length;
            showSpecial(currentSpecial);
        });

        // Auto-advance specials every 5 seconds
        setInterval(() => {
            currentSpecial = (currentSpecial + 1) % specialItems.length;
            showSpecial(currentSpecial);
        }, 5000);
    }

    // Pizza cart functionality
    let cart = [];
    let cartTotal = 0;

    const addPizzaButtons = document.querySelectorAll('.btn-add-pizza');
    addPizzaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pizzaCard = this.closest('.pizza-card');
            const pizzaName = pizzaCard.querySelector('h3').textContent;
            const sizeOptions = pizzaCard.querySelectorAll('.size-option');
            
            // Show size selection modal
            showSizeSelectionModal(pizzaName, sizeOptions);
        });
    });

    function showSizeSelectionModal(pizzaName, sizeOptions) {
        const modal = document.createElement('div');
        modal.className = 'size-modal';
        
        let sizesHTML = Array.from(sizeOptions).map(option => {
            const sizeName = option.querySelector('.size-name').textContent;
            const sizePrice = option.querySelector('.size-price').textContent;
            return `
                <div class="size-selection" data-size="${sizeName}" data-price="${sizePrice}">
                    <span class="size-name">${sizeName}</span>
                    <span class="size-price">${sizePrice}</span>
                </div>
            `;
        }).join('');
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Choose Size - ${pizzaName}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    ${sizesHTML}
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
        
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 100);
        
        // Size selection handling
        const sizeSelections = modal.querySelectorAll('.size-selection');
        sizeSelections.forEach(selection => {
            selection.addEventListener('click', function() {
                const size = this.dataset.size;
                const price = parseFloat(this.dataset.price.replace('$', ''));
                
                // Add to cart
                cart.push({
                    name: `${pizzaName} (${size})`,
                    price: price
                });
                
                cartTotal += price;
                
                showCartNotification(`${pizzaName} (${size})`, price);
                closeModal();
            });
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
    }

    function showCartNotification(itemName, price) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">🍕</span>
                <span class="notification-text">${itemName} added to cart</span>
                <span class="notification-price">$${price.toFixed(2)}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-green);
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

    // Order buttons
    const orderButtons = document.querySelectorAll('.btn-order-pizza, .nav-cta, .banner-cta, .btn-order-online');
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (cart.length > 0) {
                showOrderSummary();
            } else {
                showNotification('Add some delicious items to your cart first!', 'info');
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
                    <h3>Your Italian Order</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    ${cartHTML}
                    <div class="cart-total">
                        <strong>Total: $${cartTotal.toFixed(2)}</strong>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-checkout">Proceed to Checkout</button>
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
        
        // Checkout button
        const checkoutBtn = modal.querySelector('.btn-checkout');
        checkoutBtn.addEventListener('click', function() {
            showNotification('Redirecting to secure checkout...', 'success');
            cart = [];
            cartTotal = 0;
            closeModal.click();
        });
    }

    // Category buttons
    const categoryButtons = document.querySelectorAll('.btn-category');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const categoryName = this.closest('.category-tile').querySelector('h3').textContent;
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
                    <h3>Italian Catering Request</h3>
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
                            <label for="package-type">Catering Package</label>
                            <select id="package-type" required>
                                <option value="">Select Package</option>
                                <option value="pizza-party">Pizza Party Package</option>
                                <option value="italian-feast">Italian Feast Package</option>
                                <option value="family-style">Family Style Package</option>
                                <option value="custom">Custom Package</option>
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
                            <label for="special-requests">Special Requests or Dietary Restrictions</label>
                            <textarea id="special-requests" rows="4"></textarea>
                        </div>
                        <button type="submit" class="btn-submit-catering">Submit Catering Request</button>
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
            const packageType = document.getElementById('package-type').value;
            showNotification(`Grazie ${contactName}! We'll contact you within 24 hours about your ${packageType} catering request.`, 'success');
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
                const submitBtn = this.querySelector('.btn-subscribe');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Subscribed!';
                submitBtn.style.background = 'var(--accent-gold)';
                emailInput.value = '';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = 'var(--primary-red)';
                }, 2000);
                
                showNotification('Welcome to our Italian family! Check your email for exclusive offers.', 'success');
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
                bgColor = 'var(--primary-green)';
                break;
            case 'warning':
                bgColor = 'var(--accent-gold)';
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

    // Directions and map buttons
    const directionsButton = document.querySelector('.btn-directions');
    if (directionsButton) {
        directionsButton.addEventListener('click', function() {
            showNotification('Opening directions to our restaurant...', 'info');
        });
    }

    const mapButton = document.querySelector('.btn-view-map');
    if (mapButton) {
        mapButton.addEventListener('click', function() {
            showNotification('Opening full map view...', 'info');
        });
    }

    const callOrderButton = document.querySelector('.btn-call-order');
    if (callOrderButton) {
        callOrderButton.addEventListener('click', function() {
            showNotification('Calling restaurant for phone orders...', 'info');
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
    const animatedElements = document.querySelectorAll('.pizza-card, .category-tile, .highlight-item, .package-item');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });

    // Navigation scroll effect
    const nav = document.querySelector('.nav-italian');
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.style.background = 'rgba(250, 248, 245, 0.98)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.background = 'var(--warm-cream)';
            nav.style.backdropFilter = 'none';
        }
    });

    // Add CSS for modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-content {
            background: var(--warm-cream);
            border-radius: 15px;
            padding: 40px;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            border: 3px solid var(--primary-red);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            border-bottom: 2px solid var(--primary-red);
            padding-bottom: 15px;
        }
        
        .modal-header h3 {
            font-family: 'Times New Roman', serif;
            font-weight: bold;
            color: var(--primary-red);
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
        
        .size-selection {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            margin-bottom: 15px;
            background: var(--bg-white);
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid var(--border-light);
        }
        
        .size-selection:hover {
            border-color: var(--primary-red);
            background: var(--bg-light);
            transform: translateY(-2px);
        }
        
        .size-selection .size-name {
            font-weight: bold;
            color: var(--text-dark);
            font-size: 1.1rem;
        }
        
        .size-selection .size-price {
            font-weight: bold;
            color: var(--primary-red);
            font-size: 1.3rem;
        }
        
        .cart-item {
            display: flex;
            justify-content: space-between;
            padding: 15px 0;
            border-bottom: 1px solid var(--border-light);
            font-weight: 600;
        }
        
        .cart-total {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid var(--primary-red);
            text-align: right;
            font-size: 1.3rem;
            color: var(--primary-red);
        }
        
        .btn-checkout {
            background: var(--primary-green);
            color: var(--bg-white);
            border: none;
            padding: 15px 30px;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
            font-size: 16px;
            border-radius: 25px;
            transition: all 0.3s ease;
            margin-top: 20px;
        }
        
        .btn-checkout:hover {
            background: var(--primary-red);
            transform: translateY(-1px);
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
            font-weight: bold;
            color: var(--text-dark);
            margin-bottom: 8px;
            font-size: 14px;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            padding: 12px;
            border: 2px solid var(--border-light);
            border-radius: 8px;
            background: var(--bg-white);
            color: var(--text-dark);
            font-size: 16px;
            outline: none;
            transition: border-color 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            border-color: var(--primary-red);
        }
        
        .btn-submit-catering {
            background: var(--primary-red);
            color: var(--bg-white);
            border: none;
            padding: 15px 30px;
            font-weight: bold;
            cursor: pointer;
            border-radius: 25px;
            transition: all 0.3s ease;
            margin-top: 10px;
        }
        
        .btn-submit-catering:hover {
            background: var(--primary-green);
            transform: translateY(-1px);
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
            const modal = document.querySelector('.size-modal, .order-modal, .catering-modal');
            if (modal) {
                modal.querySelector('.close-modal').click();
            }
            
            if (isMenuOpen) {
                mobileToggle.click();
            }
        }
    });
});