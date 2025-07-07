// Premium Burger Chain JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav__menu--active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('nav__menu--active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('nav__menu--active')) {
                    navMenu.classList.remove('nav__menu--active');
                    const spans = navToggle.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                }
            }
        });
    });

    // Order Modal Functionality
    const orderButtons = document.querySelectorAll('.nav__order-btn, .hero__cta, .location-card__actions .btn--primary');
    const modal = document.getElementById('order-modal');
    const modalClose = document.querySelector('.modal__close');

    function openModal() {
        if (modal) {
            modal.classList.add('modal--active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('modal--active');
            document.body.style.overflow = 'auto';
        }
    }

    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('modal--active')) {
            closeModal();
        }
    });

    // Location Search Functionality
    const locationInput = document.querySelector('.location-search__input');
    const locationButton = document.querySelector('.location-search__btn');

    if (locationButton && locationInput) {
        locationButton.addEventListener('click', function() {
            const searchValue = locationInput.value.trim();
            if (searchValue) {
                // Here you would typically integrate with a location service
                console.log('Searching for locations near:', searchValue);
                
                // Add visual feedback
                const originalText = this.textContent;
                this.textContent = 'Searching...';
                this.disabled = true;
                
                // Simulate search delay
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                    // You would display search results here
                    showLocationResults(searchValue);
                }, 2000);
            }
        });

        // Allow Enter key to trigger search
        locationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                locationButton.click();
            }
        });
    }

    function showLocationResults(searchTerm) {
        // Simulate showing search results
        const resultsContainer = document.querySelector('.locations__grid');
        if (resultsContainer) {
            // Add a temporary message
            const message = document.createElement('div');
            message.className = 'search-results-message';
            message.style.cssText = `
                grid-column: 1 / -1;
                text-align: center;
                padding: 20px;
                background: #e8f5e8;
                border-radius: 8px;
                margin-bottom: 20px;
                color: #2d6a2d;
                font-weight: 600;
            `;
            message.textContent = `Showing locations near "${searchTerm}"`;
            
            // Remove existing message if any
            const existingMessage = resultsContainer.querySelector('.search-results-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            resultsContainer.insertBefore(message, resultsContainer.firstChild);
            
            // Remove message after 5 seconds
            setTimeout(() => {
                if (message.parentNode) {
                    message.remove();
                }
            }, 5000);
        }
    }

    // Contact Form Handling
    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to your server
            console.log('Form submitted:', formObject);
            
            // Show success message
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Message Sent!';
            submitButton.style.background = '#10b981';
            submitButton.disabled = true;
            
            // Reset form and button after 3 seconds
            setTimeout(() => {
                this.reset();
                submitButton.textContent = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 3000);
        });
    }

    // Nutrition Button Functionality
    const nutritionButtons = document.querySelectorAll('.nutrition__actions .btn');
    nutritionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.toLowerCase();
            
            // Add visual feedback
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                
                // Here you would typically redirect to nutrition info or open a modal
                if (buttonText.includes('nutrition')) {
                    console.log('Opening nutrition guide');
                    // Example: window.open('/nutrition-guide.pdf', '_blank');
                } else if (buttonText.includes('allergen')) {
                    console.log('Opening allergen information');
                    // Example: window.open('/allergen-info.pdf', '_blank');
                }
            }, 1500);
        });
    });

    // Directions Button Functionality
    const directionsButtons = document.querySelectorAll('.btn--outline');
    directionsButtons.forEach(button => {
        if (button.textContent.toLowerCase().includes('directions')) {
            button.addEventListener('click', function() {
                // Get the location card this button belongs to
                const locationCard = this.closest('.location-card');
                if (locationCard) {
                    const address = locationCard.querySelector('.location-card__address').textContent;
                    
                    // Here you would typically open Google Maps with the address
                    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
                    console.log('Opening directions to:', address);
                    // window.open(mapsUrl, '_blank');
                    
                    // Add visual feedback
                    const originalText = this.textContent;
                    this.textContent = 'Opening...';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                }
            });
        }
    });

    // Scroll-based Header Background
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add background when scrolling down
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            header.style.background = '';
            header.style.backdropFilter = '';
            header.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
        }
        
        // Hide/show header on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
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

    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.featured-category, .featured-item, .feature, .location-card, .contact__item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Featured Item Hover Effects
    const featuredItems = document.querySelectorAll('.featured-item');
    featuredItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const img = this.querySelector('.featured-item__img');
            if (img) {
                img.style.transform = 'scale(1.1)';
                img.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const img = this.querySelector('.featured-item__img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // Social Link Tracking
    const socialLinks = document.querySelectorAll('.social-link, .footer__social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.textContent.toLowerCase();
            console.log(`Social media click: ${platform}`);
            // Here you would typically send analytics data
        });
    });

    // Color Scheme Switcher (for demo purposes)
    function addColorSchemeSwitcher() {
        const schemes = ['classic', 'business', 'warm', 'cool', 'bold'];
        const currentScheme = document.body.className.match(/color-scheme-(\w+)/)?.[1] || 'classic';
        
        // Create switcher button (hidden by default, can be enabled for demos)
        const switcher = document.createElement('div');
        switcher.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: white;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 1000;
            display: none;
        `;
        
        const select = document.createElement('select');
        select.style.cssText = 'padding: 5px; border: 1px solid #ddd; border-radius: 4px;';
        
        schemes.forEach(scheme => {
            const option = document.createElement('option');
            option.value = scheme;
            option.textContent = scheme.charAt(0).toUpperCase() + scheme.slice(1);
            option.selected = scheme === currentScheme;
            select.appendChild(option);
        });
        
        select.addEventListener('change', function() {
            document.body.className = document.body.className.replace(/color-scheme-\w+/, `color-scheme-${this.value}`);
        });
        
        switcher.appendChild(select);
        document.body.appendChild(switcher);
        
        // Show switcher on Ctrl+Shift+C
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.shiftKey && e.key === 'C') {
                switcher.style.display = switcher.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
    
    addColorSchemeSwitcher();

    // Performance: Lazy load images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // In a real implementation, you would set img.src from img.dataset.src
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add to Cart functionality (for potential future use)
    function addToCart(itemName, itemPrice) {
        console.log(`Added to cart: ${itemName} - ${itemPrice}`);
        
        // Show temporary notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 2000;
            font-weight: 600;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = `${itemName} added to cart!`;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    console.log('Premium Burger Chain website loaded successfully!');
});