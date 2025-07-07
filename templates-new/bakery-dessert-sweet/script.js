// Bakery Dessert Sweet JavaScript

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
                navMenu.style.background = 'var(--sweet-cream)';
                navMenu.style.padding = '20px';
                navMenu.style.boxShadow = '0 4px 15px var(--shadow)';
                navMenu.style.gap = '20px';
                navMenu.style.borderBottom = '3px solid var(--sweet-primary)';
                
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

    // Sweet cart functionality
    let cart = [];
    let cartTotal = 0;

    const addToOrderButtons = document.querySelectorAll('.btn-add-to-order');
    addToOrderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const specialCard = this.closest('.special-card');
            const itemName = specialCard.querySelector('h3').textContent;
            const priceOptions = specialCard.querySelectorAll('.price-option');
            
            // Show size selection modal
            showSizeSelectionModal(itemName, priceOptions);
        });
    });

    function showSizeSelectionModal(itemName, priceOptions) {
        const modal = document.createElement('div');
        modal.className = 'size-modal';
        
        let sizesHTML = Array.from(priceOptions).map(option => {
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
                    <h3>Choose Size - ${itemName}</h3>
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
                    name: `${itemName} (${size})`,
                    price: price
                });
                
                cartTotal += price;
                
                showCartNotification(`${itemName} (${size})`, price);
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
                <span class="notification-icon">🧁</span>
                <span class="notification-text">${itemName} added to order</span>
                <span class="notification-price">$${price.toFixed(2)}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--sweet-primary);
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
    const orderButtons = document.querySelectorAll('.btn-order-sweet, .nav-cta, .banner-cta');
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (cart.length > 0) {
                showOrderSummary();
            } else {
                showNotification('Add some delicious treats to your order first!', 'info');
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
                    <h3>Your Sweet Order</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    ${cartHTML}
                    <div class="cart-total">
                        <strong>Total: $${cartTotal.toFixed(2)}</strong>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-checkout">Proceed to Order</button>
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
            showNotification('Redirecting to order form...', 'success');
            cart = [];
            cartTotal = 0;
            closeModal.click();
            // Scroll to order section
            document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Category buttons
    const categoryButtons = document.querySelectorAll('.btn-category');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const categoryName = this.closest('.category-tile').querySelector('h3').textContent;
            showNotification(`Viewing ${categoryName} collection...`, 'info');
        });
    });

    // Consultation buttons
    const consultationButtons = document.querySelectorAll('.btn-cake-consultation');
    consultationButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showConsultationModal();
        });
    });

    function showConsultationModal() {
        const modal = document.createElement('div');
        modal.className = 'consultation-modal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Schedule Custom Cake Consultation</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="consultation-info">
                        <div class="consultation-step">
                            <h4>1. Tell us about your event</h4>
                            <p>Share details about your celebration and vision</p>
                        </div>
                        <div class="consultation-step">
                            <h4>2. Design consultation</h4>
                            <p>Meet with our baker to plan your perfect cake</p>
                        </div>
                        <div class="consultation-step">
                            <h4>3. Taste testing</h4>
                            <p>Sample flavors and finalize your order</p>
                        </div>
                    </div>
                    <div class="consultation-booking">
                        <h4>Book Your Consultation</h4>
                        <p>Consultations are complimentary and take about 30 minutes</p>
                        <div class="booking-options">
                            <button class="btn btn-primary">Call (555) 123-CAKE</button>
                            <button class="btn btn-secondary">Book Online</button>
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
        
        // Booking buttons
        const bookingButtons = modal.querySelectorAll('.booking-options .btn');
        bookingButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.textContent.includes('Call') ? 'Calling bakery...' : 'Opening booking system...';
                showNotification(action, 'success');
                closeModal.click();
            });
        });
    }

    // Catering button
    const cateringButton = document.querySelector('.btn-catering');
    if (cateringButton) {
        cateringButton.addEventListener('click', function(e) {
            e.preventDefault();
            showCateringModal();
        });
    }

    function showCateringModal() {
        const modal = document.createElement('div');
        modal.className = 'catering-modal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Catering Services</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="catering-options">
                        <div class="catering-service">
                            <h4>Office Catering</h4>
                            <p>Fresh pastries, coffee service, and lunch options</p>
                            <span class="minimum">Minimum 20 people</span>
                        </div>
                        <div class="catering-service">
                            <h4>Event Dessert Tables</h4>
                            <p>Custom dessert displays for weddings and parties</p>
                            <span class="minimum">Minimum $200 order</span>
                        </div>
                        <div class="catering-service">
                            <h4>Holiday Catering</h4>
                            <p>Seasonal treats and custom holiday displays</p>
                            <span class="minimum">48-hour advance notice</span>
                        </div>
                    </div>
                    <div class="catering-contact">
                        <h4>Request a Quote</h4>
                        <p>Call us at (555) 123-CAKE or email catering@sweetbakery.com</p>
                        <button class="btn btn-primary">Contact Catering</button>
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
        
        // Contact button
        const contactBtn = modal.querySelector('.catering-contact .btn');
        contactBtn.addEventListener('click', function() {
            showNotification('Opening catering contact form...', 'success');
            closeModal.click();
        });
    }

    // Order form handling
    const orderForm = document.querySelector('.quick-order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            const requiredFields = ['type', 'date', 'time', 'name', 'phone', 'email'];
            const missingFields = requiredFields.filter(field => !data[field]);
            
            if (missingFields.length > 0) {
                showNotification('Please fill in all required fields.', 'warning');
                return;
            }
            
            // Simulate order submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Processing Order...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Order request submitted! We will contact you shortly to confirm.', 'success');
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
                bgColor = 'var(--sweet-primary)';
                break;
            case 'warning':
                bgColor = 'var(--sweet-accent)';
                break;
            case 'info':
                bgColor = 'var(--sweet-secondary)';
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
    const animatedElements = document.querySelectorAll('.special-card, .category-tile, .creation-card, .highlight-item, .cake-category, .catering-option');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });

    // Navigation scroll effect
    const nav = document.querySelector('.nav-bakery');
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.style.background = 'rgba(250, 247, 242, 0.98)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.background = 'var(--sweet-cream)';
            nav.style.backdropFilter = 'none';
        }
    });

    // Special card hover effects
    document.querySelectorAll('.special-card, .creation-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Set minimum date for order form (today)
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });

    // Add CSS for modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-content {
            background: var(--sweet-cream);
            border-radius: 15px;
            padding: 40px;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            border: 3px solid var(--sweet-primary);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            border-bottom: 2px solid var(--sweet-primary);
            padding-bottom: 15px;
        }
        
        .modal-header h3 {
            font-family: 'Dancing Script', cursive;
            font-weight: bold;
            color: var(--sweet-primary);
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
            border-color: var(--sweet-primary);
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
            color: var(--sweet-primary);
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
            border-top: 2px solid var(--sweet-primary);
            text-align: right;
            font-size: 1.3rem;
            color: var(--sweet-primary);
        }
        
        .btn-checkout {
            background: var(--sweet-primary);
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
            background: var(--sweet-secondary);
            transform: translateY(-1px);
        }
        
        .consultation-info {
            display: grid;
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .consultation-step {
            padding: 20px;
            background: var(--bg-white);
            border-radius: 10px;
            border-left: 4px solid var(--sweet-gold);
        }
        
        .consultation-step h4 {
            color: var(--sweet-primary);
            margin-bottom: 8px;
            font-family: 'Dancing Script', cursive;
        }
        
        .consultation-booking {
            background: var(--bg-white);
            padding: 25px;
            border-radius: 10px;
            text-align: center;
        }
        
        .consultation-booking h4 {
            color: var(--sweet-primary);
            margin-bottom: 10px;
            font-family: 'Dancing Script', cursive;
        }
        
        .booking-options {
            display: flex;
            gap: 15px;
            margin-top: 20px;
            justify-content: center;
        }
        
        .catering-options {
            display: grid;
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .catering-service {
            padding: 20px;
            background: var(--bg-white);
            border-radius: 10px;
            border-left: 4px solid var(--sweet-primary);
        }
        
        .catering-service h4 {
            color: var(--sweet-primary);
            margin-bottom: 8px;
            font-family: 'Dancing Script', cursive;
        }
        
        .catering-service .minimum {
            display: inline-block;
            background: var(--sweet-gold);
            color: var(--text-dark);
            padding: 4px 8px;
            border-radius: 10px;
            font-size: 12px;
            font-weight: 600;
            margin-top: 10px;
        }
        
        .catering-contact {
            background: var(--bg-white);
            padding: 25px;
            border-radius: 10px;
            text-align: center;
        }
        
        .catering-contact h4 {
            color: var(--sweet-primary);
            margin-bottom: 10px;
            font-family: 'Dancing Script', cursive;
        }
        
        @media (max-width: 768px) {
            .modal-content {
                padding: 30px 20px;
                width: 95%;
            }
            
            .booking-options {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(style);

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.querySelector('.size-modal, .order-modal, .consultation-modal, .catering-modal');
            if (modal) {
                modal.querySelector('.close-modal').click();
            }
            
            if (isMenuOpen) {
                mobileToggle.click();
            }
        }
    });
});