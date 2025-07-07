// Coffee Shop Artisan JavaScript

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
                navMenu.style.borderBottom = '3px solid var(--primary-brown)';
                
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

    // Bean origins slider
    let currentOrigin = 0;
    const originItems = document.querySelectorAll('.origin-item');
    const prevBtn = document.querySelector('.origin-btn.prev');
    const nextBtn = document.querySelector('.origin-btn.next');

    function showOrigin(index) {
        originItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentOrigin = (currentOrigin - 1 + originItems.length) % originItems.length;
            showOrigin(currentOrigin);
        });

        nextBtn.addEventListener('click', function() {
            currentOrigin = (currentOrigin + 1) % originItems.length;
            showOrigin(currentOrigin);
        });

        // Auto-advance origins every 6 seconds
        setInterval(() => {
            currentOrigin = (currentOrigin + 1) % originItems.length;
            showOrigin(currentOrigin);
        }, 6000);
    }

    // Coffee cart functionality
    let cart = [];
    let cartTotal = 0;

    const addDrinkButtons = document.querySelectorAll('.btn-add-drink');
    addDrinkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const drinkCard = this.closest('.drink-card');
            const drinkName = drinkCard.querySelector('h3').textContent;
            const sizeOptions = drinkCard.querySelectorAll('.size-option');
            
            // Show size selection modal
            showSizeSelectionModal(drinkName, sizeOptions);
        });
    });

    function showSizeSelectionModal(drinkName, sizeOptions) {
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
                    <h3>Choose Size - ${drinkName}</h3>
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
                    name: `${drinkName} (${size})`,
                    price: price
                });
                
                cartTotal += price;
                
                showCartNotification(`${drinkName} (${size})`, price);
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
                <span class="notification-icon">☕</span>
                <span class="notification-text">${itemName} added to cart</span>
                <span class="notification-price">$${price.toFixed(2)}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-brown);
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
    const orderButtons = document.querySelectorAll('.btn-order-coffee, .nav-cta, .banner-cta, .btn-order-online');
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (cart.length > 0) {
                showOrderSummary();
            } else {
                showNotification('Add some delicious coffee to your cart first!', 'info');
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
                    <h3>Your Coffee Order</h3>
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

    // Try bean buttons
    const tryBeanButtons = document.querySelectorAll('.btn-try-bean');
    tryBeanButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originName = this.closest('.origin-item').querySelector('h3').textContent;
            showNotification(`${originName} beans added to your consideration list!`, 'success');
        });
    });

    // Events button
    const eventsButton = document.querySelector('.btn-view-events');
    if (eventsButton) {
        eventsButton.addEventListener('click', function() {
            showEventsModal();
        });
    }

    function showEventsModal() {
        const modal = document.createElement('div');
        modal.className = 'events-modal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Upcoming Events</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="events-list">
                        <div class="event-listing">
                            <div class="event-date-large">Dec 15</div>
                            <div class="event-details">
                                <h4>Holiday Latte Art Workshop</h4>
                                <p>Learn to create festive designs in your coffee</p>
                                <span class="event-time">2:00 PM - 4:00 PM</span>
                                <span class="event-price">$25 per person</span>
                            </div>
                        </div>
                        <div class="event-listing">
                            <div class="event-date-large">Dec 22</div>
                            <div class="event-details">
                                <h4>Coffee Cupping Session</h4>
                                <p>Taste and compare different coffee origins</p>
                                <span class="event-time">11:00 AM - 12:30 PM</span>
                                <span class="event-price">Free with purchase</span>
                            </div>
                        </div>
                        <div class="event-listing">
                            <div class="event-date-large">Jan 5</div>
                            <div class="event-details">
                                <h4>New Year, New Brew Workshop</h4>
                                <p>Master home brewing techniques</p>
                                <span class="event-time">10:00 AM - 12:00 PM</span>
                                <span class="event-price">$30 per person</span>
                            </div>
                        </div>
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
                submitBtn.style.background = 'var(--coffee-gold)';
                emailInput.value = '';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = 'var(--primary-brown)';
                }, 2000);
                
                showNotification('Welcome to our coffee community! Check your email for brewing tips.', 'success');
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
                bgColor = 'var(--primary-brown)';
                break;
            case 'warning':
                bgColor = 'var(--coffee-gold)';
                break;
            case 'info':
                bgColor = 'var(--deep-mocha)';
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
            showNotification('Opening directions to our coffee shop...', 'info');
        });
    }

    const mapButton = document.querySelector('.btn-view-map');
    if (mapButton) {
        mapButton.addEventListener('click', function() {
            showNotification('Opening full map view...', 'info');
        });
    }

    const callAheadButton = document.querySelector('.btn-call-ahead');
    if (callAheadButton) {
        callAheadButton.addEventListener('click', function() {
            showNotification('Calling coffee shop for phone orders...', 'info');
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
    const animatedElements = document.querySelectorAll('.drink-card, .category-tile, .highlight-item, .event-item');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });

    // Navigation scroll effect
    const nav = document.querySelector('.nav-coffee');
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.style.background = 'rgba(245, 242, 232, 0.98)';
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
            border: 3px solid var(--primary-brown);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            border-bottom: 2px solid var(--primary-brown);
            padding-bottom: 15px;
        }
        
        .modal-header h3 {
            font-family: 'Playfair Display', serif;
            font-weight: bold;
            color: var(--primary-brown);
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
            border-color: var(--primary-brown);
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
            color: var(--primary-brown);
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
            border-top: 2px solid var(--primary-brown);
            text-align: right;
            font-size: 1.3rem;
            color: var(--primary-brown);
        }
        
        .btn-checkout {
            background: var(--primary-brown);
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
            background: var(--deep-mocha);
            transform: translateY(-1px);
        }
        
        .events-list {
            display: grid;
            gap: 25px;
        }
        
        .event-listing {
            display: flex;
            gap: 20px;
            padding: 20px;
            background: var(--bg-white);
            border-radius: 10px;
            border-left: 4px solid var(--primary-brown);
        }
        
        .event-date-large {
            background: var(--coffee-gold);
            color: var(--text-dark);
            padding: 15px;
            border-radius: 10px;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            min-width: 80px;
            height: fit-content;
        }
        
        .event-details h4 {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 8px;
            color: var(--primary-brown);
            font-family: 'Playfair Display', serif;
        }
        
        .event-details p {
            color: var(--text-light);
            margin-bottom: 10px;
            line-height: 1.5;
        }
        
        .event-time {
            display: block;
            font-size: 14px;
            font-weight: bold;
            color: var(--text-warm);
            margin-bottom: 5px;
        }
        
        .event-price {
            display: block;
            font-size: 14px;
            font-weight: bold;
            color: var(--primary-brown);
        }
        
        @media (max-width: 768px) {
            .modal-content {
                padding: 30px 20px;
                width: 95%;
            }
            
            .event-listing {
                flex-direction: column;
            }
            
            .event-date-large {
                align-self: flex-start;
                min-width: auto;
                width: fit-content;
            }
        }
    `;
    document.head.appendChild(style);

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.querySelector('.size-modal, .order-modal, .events-modal');
            if (modal) {
                modal.querySelector('.close-modal').click();
            }
            
            if (isMenuOpen) {
                mobileToggle.click();
            }
        }
    });
});