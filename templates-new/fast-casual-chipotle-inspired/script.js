// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            if (navToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on menu items
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                
                // Reset hamburger animation
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                
                // Reset hamburger animation
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just a hash without a target or external action
            if (href === '#' || href === '#order' || href === '#app' || href === '#delivery') {
                e.preventDefault();
                // Handle external actions here if needed
                if (href === '#order') {
                    handleOrderAction();
                } else if (href === '#app') {
                    handleAppAction();
                } else if (href === '#delivery') {
                    handleDeliveryAction();
                }
                return;
            }
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 90; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#ffffff';
        header.style.backdropFilter = 'none';
    }
});

// Menu option selection functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuOptions = document.querySelectorAll('.menu-option');
    const toppingItems = document.querySelectorAll('.topping-item');
    
    // Handle menu option selection
    menuOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from siblings
            const siblings = this.parentElement.querySelectorAll('.menu-option');
            siblings.forEach(sibling => sibling.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
        });
    });
    
    // Handle topping selection
    toppingItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
});

// Location finder functionality
document.addEventListener('DOMContentLoaded', function() {
    const locationInput = document.querySelector('.location-input');
    const findButton = document.querySelector('.find-button');
    
    function findLocations() {
        const query = locationInput.value.trim();
        if (query) {
            // Here you would typically integrate with a location service
            showLocationResults(query);
        } else {
            alert('Please enter a location to search.');
        }
    }
    
    function showLocationResults(query) {
        // Simulate location search results
        alert(`Searching for locations near: ${query}\n\nThis would typically show nearby restaurant locations with distances and directions.`);
    }
    
    if (findButton) {
        findButton.addEventListener('click', findLocations);
    }
    
    if (locationInput) {
        locationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                findLocations();
            }
        });
    }
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const formFields = {};
            
            for (let [key, value] of formData.entries()) {
                formFields[key] = value;
            }
            
            // Basic validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ff4444';
                    isValid = false;
                } else {
                    field.style.borderColor = 'var(--border-color)';
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Here you would typically send the data to your server
            showSuccessMessage();
            
            // Reset the form
            form.reset();
        });
    });
});

function showSuccessMessage() {
    // Create and show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-content">
            <span class="success-icon">✓</span>
            <span>Thank you! We'll get back to you soon.</span>
        </div>
    `;
    
    // Add styles for success message
    successMessage.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: var(--success-color);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: var(--card-shadow);
        z-index: 1001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(successMessage);
    
    // Animate in
    setTimeout(() => {
        successMessage.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successMessage.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 300);
    }, 3000);
}

// Order action handlers
function handleOrderAction() {
    alert('Online ordering system would open here.\n\nThis would typically redirect to your online ordering platform or show a menu with ordering capabilities.');
}

function handleAppAction() {
    alert('Mobile app download would be initiated here.\n\nThis would typically redirect to the App Store or Google Play Store.');
}

function handleDeliveryAction() {
    alert('Delivery ordering would start here.\n\nThis would typically show delivery options and redirect to your delivery platform.');
}

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.menu-option, .location-card, .nutrition-card, .stat, .catering-option');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});

// Add CSS classes for animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .menu-option, .location-card, .nutrition-card, .stat, .catering-option {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .menu-option.selected {
            border: 3px solid var(--primary-color);
            background-color: var(--background-accent);
        }
        
        .topping-item.selected {
            background-color: var(--primary-color);
            color: var(--text-white);
            border-color: var(--primary-color);
        }
        
        .success-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .success-icon {
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        /* Hover effects for interactive elements */
        .menu-option:hover {
            cursor: pointer;
        }
        
        .topping-item:hover {
            cursor: pointer;
        }
        
        /* Loading states for buttons */
        .find-button:active,
        .submit-button:active {
            transform: scale(0.98);
        }
        
        /* Focus states for accessibility */
        .location-input:focus,
        .contact-form input:focus,
        .contact-form select:focus,
        .contact-form textarea:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }
        
        /* Better mobile touch targets */
        @media (max-width: 768px) {
            .menu-option,
            .topping-item,
            .location-card {
                min-height: 44px;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
            }
        }
    `;
    document.head.appendChild(style);
});

// Button click animations
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.cta-button, .order-button, .app-button, .find-button, .directions-button, .order-here-button, .catering-button, .nutrition-button, .allergen-button, .submit-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Enhanced location card interactions
document.addEventListener('DOMContentLoaded', function() {
    const locationCards = document.querySelectorAll('.location-card');
    
    locationCards.forEach(card => {
        const orderButton = card.querySelector('.order-here-button');
        const directionsButton = card.querySelector('.directions-button');
        
        if (orderButton) {
            orderButton.addEventListener('click', function(e) {
                e.preventDefault();
                const locationName = card.querySelector('h3').textContent;
                alert(`Starting order for ${locationName}\n\nThis would open the ordering system for this specific location.`);
            });
        }
        
        if (directionsButton) {
            directionsButton.addEventListener('click', function(e) {
                e.preventDefault();
                const address = card.querySelector('.location-address').textContent;
                alert(`Getting directions to ${address}\n\nThis would typically open your default maps application.`);
            });
        }
    });
});

// Nutrition calculator simulation
document.addEventListener('DOMContentLoaded', function() {
    const nutritionButton = document.querySelector('.nutrition-button');
    const allergenButton = document.querySelector('.allergen-button');
    
    if (nutritionButton) {
        nutritionButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Nutrition Calculator\n\nThis would open an interactive tool where customers can build their meal and see real-time nutrition information including calories, protein, sodium, etc.');
        });
    }
    
    if (allergenButton) {
        allergenButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Allergen Information\n\nThis would display detailed allergen information for all menu items, helping customers with food allergies make informed choices.');
        });
    }
});

// Catering order handler
document.addEventListener('DOMContentLoaded', function() {
    const cateringButton = document.querySelector('.catering-button');
    
    if (cateringButton) {
        cateringButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Catering Order System\n\nThis would open the catering ordering platform where customers can:\n• Select catering packages\n• Choose delivery date/time\n• Provide event details\n• Get pricing estimates');
        });
    }
});

// App download handlers
document.addEventListener('DOMContentLoaded', function() {
    const appStoreButton = document.querySelector('.app-store-button');
    const googlePlayButton = document.querySelector('.google-play-button');
    
    if (appStoreButton) {
        appStoreButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('App Store Download\n\nThis would redirect to the App Store to download the mobile app.');
        });
    }
    
    if (googlePlayButton) {
        googlePlayButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Google Play Download\n\nThis would redirect to Google Play Store to download the mobile app.');
        });
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add current year to footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
    
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
    
    // Preload hero images
    const heroImages = document.querySelectorAll('.hero-image img');
    heroImages.forEach(img => {
        if (img.src) {
            const preloadImg = new Image();
            preloadImg.src = img.src;
        }
    });
});

// Performance optimization: Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const heroSection = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.3;
    
    if (heroSection) {
        const heroImage = heroSection.querySelector('.hero-image img');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    }
});

// Enhanced error handling for forms
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ff4444';
                this.setAttribute('aria-invalid', 'true');
            } else {
                this.style.borderColor = 'var(--border-color)';
                this.removeAttribute('aria-invalid');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.hasAttribute('aria-invalid')) {
                this.style.borderColor = 'var(--border-color)';
                this.removeAttribute('aria-invalid');
            }
        });
    });
});

// Keyboard navigation enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Make menu options and toppings keyboard accessible
    const interactiveElements = document.querySelectorAll('.menu-option, .topping-item');
    
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});