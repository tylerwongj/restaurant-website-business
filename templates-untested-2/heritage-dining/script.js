// Heritage Dining Template JavaScript

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 90; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                firstName: formData.get('first-name'),
                lastName: formData.get('last-name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                inquiryType: formData.get('inquiry-type'),
                message: formData.get('message')
            };
            
            // Enhanced validation
            if (!validateHeritageForm(data)) {
                return;
            }
            
            // Show elegant loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending Message...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';
            
            // Simulate form submission with elegant feedback
            setTimeout(() => {
                showHeritageSuccessMessage(data.inquiryType);
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }, 2000);
            
            // In real implementation, send to server:
            // fetch('/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });
        });
    }
});

// Heritage Form Validation
function validateHeritageForm(data) {
    clearHeritageFormErrors();
    
    let isValid = true;
    const errors = [];
    
    // Name validations
    if (!data.firstName || data.firstName.trim().length < 2) {
        errors.push({ field: 'first-name', message: 'Please enter your first name' });
        isValid = false;
    }
    
    if (!data.lastName || data.lastName.trim().length < 2) {
        errors.push({ field: 'last-name', message: 'Please enter your last name' });
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push({ field: 'email', message: 'Please enter a valid email address' });
        isValid = false;
    }
    
    // Phone validation (optional but must be valid if provided)
    if (data.phone && data.phone.trim() !== '') {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = data.phone.replace(/[\s\-\(\)\.]/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            errors.push({ field: 'phone', message: 'Please enter a valid phone number' });
            isValid = false;
        }
    }
    
    // Inquiry type validation
    if (!data.inquiryType) {
        errors.push({ field: 'inquiry-type', message: 'Please select an inquiry type' });
        isValid = false;
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 15) {
        errors.push({ field: 'message', message: 'Please provide a detailed message (at least 15 characters)' });
        isValid = false;
    }
    
    // Display errors with heritage styling
    if (!isValid) {
        displayHeritageFormErrors(errors);
    }
    
    return isValid;
}

// Display Heritage Form Errors
function displayHeritageFormErrors(errors) {
    errors.forEach(error => {
        const field = document.querySelector(`[name="${error.field}"]`);
        if (field) {
            field.style.borderColor = '#c0392b';
            field.style.boxShadow = '0 0 0 2px rgba(192, 57, 43, 0.2)';
            
            // Create elegant error message
            const errorElement = document.createElement('div');
            errorElement.className = 'heritage-error-message';
            errorElement.textContent = error.message;
            errorElement.style.cssText = `
                color: #c0392b;
                font-size: 0.85rem;
                margin-top: 0.5rem;
                font-style: italic;
                font-family: var(--font-primary);
            `;
            
            field.parentNode.appendChild(errorElement);
        }
    });
}

// Clear Heritage Form Errors
function clearHeritageFormErrors() {
    // Reset field styles
    const formFields = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    formFields.forEach(field => {
        field.style.borderColor = '';
        field.style.boxShadow = '';
    });
    
    // Remove error messages
    const errorMessages = document.querySelectorAll('.heritage-error-message');
    errorMessages.forEach(error => error.remove());
}

// Heritage Success Message
function showHeritageSuccessMessage(inquiryType) {
    const messages = {
        'reservation': 'Thank you for your reservation request. Our maître d\' will contact you within 2 hours to confirm your table.',
        'private-dining': 'Thank you for your private dining inquiry. Our events coordinator will contact you within 24 hours.',
        'special-event': 'Thank you for considering us for your special event. We will contact you within 24 hours.',
        'wine-tasting': 'Thank you for your wine tasting inquiry. Our sommelier will contact you to arrange your experience.',
        'chef-table': 'Thank you for your Chef\'s Table request. We will contact you to arrange this exclusive experience.',
        'general': 'Thank you for contacting us. We will respond to your inquiry within 24 hours.'
    };
    
    const message = messages[inquiryType] || messages['general'];
    
    // Create elegant notification
    const notification = document.createElement('div');
    notification.className = 'heritage-notification';
    notification.innerHTML = `
        <div style="
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 2rem 3rem;
            border-radius: 0;
            position: fixed;
            top: 100px;
            right: 30px;
            z-index: 2000;
            max-width: 400px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            border-left: 5px solid var(--gold);
            transform: translateX(100%);
            transition: transform 0.5s ease;
        ">
            <div style="font-family: var(--font-primary); font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem;">
                Message Received
            </div>
            <div style="font-family: var(--font-secondary); font-size: 0.9rem; line-height: 1.5;">
                ${message}
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.firstElementChild.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove notification after 7 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.firstElementChild.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }
    }, 7000);
}

// Enhanced Navbar Scroll Effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const currentScrollY = window.scrollY;
    
    if (navbar) {
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
            
            // Hide/show navbar based on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.1)';
            navbar.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollY = currentScrollY;
});

// Sophisticated Scroll Animations
function initHeritageScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add special effects for certain elements
                if (entry.target.classList.contains('heritage-special-effect')) {
                    entry.target.style.filter = 'blur(0px)';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.heritage-text, .chef-content, .experience-card, .menu-item, ' +
        '.menu-item-card, .gallery-item, .hours, .reservations, .contact-form, .contact-info'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 1s ease, transform 1s ease, filter 1s ease';
        
        // Add special blur effect to some elements
        if (el.classList.contains('gallery-item') || el.classList.contains('experience-card')) {
            el.classList.add('heritage-special-effect');
            el.style.filter = 'blur(3px)';
        }
        
        observer.observe(el);
    });
}

// Staggered Animation for Menu Items
function initHeritageStaggeredAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.children;
                Array.from(items).forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, index * 150); // Slower, more elegant timing
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Grid containers to stagger animate
    const gridContainers = document.querySelectorAll('.menu-items, .experience-grid, .beverage-items');
    gridContainers.forEach(grid => {
        const items = grid.children;
        Array.from(items).forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px) scale(0.95)';
            item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });
        observer.observe(grid);
    });
}

// Elegant Phone Number Formatting
function formatHeritagePhoneNumber(input) {
    const value = input.value.replace(/\D/g, '');
    let formattedValue = value;
    
    if (value.length >= 6) {
        formattedValue = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    } else if (value.length >= 3) {
        formattedValue = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }
    
    input.value = formattedValue;
}

// Apply heritage phone formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', () => formatHeritagePhoneNumber(input));
        
        // Add elegant placeholder
        if (!input.placeholder) {
            input.placeholder = '(555) 123-4567';
        }
        
        // Add focus effects
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--accent-color)';
            this.style.boxShadow = '0 0 0 2px rgba(201, 169, 110, 0.2)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    });
});

// Heritage Color Scheme Switcher
function switchHeritageColorScheme(scheme) {
    const body = document.body;
    // Remove existing color classes
    body.classList.remove('color-royal', 'color-elegant', 'color-vintage', 'color-modern');
    // Add new color class
    if (scheme !== 'classic') {
        body.classList.add(`color-${scheme}`);
    }
    
    // Store preference
    localStorage.setItem('heritage-color-scheme', scheme);
    
    // Add visual feedback
    const notification = document.createElement('div');
    notification.textContent = `Color scheme changed to ${scheme}`;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 0;
        z-index: 1000;
        font-family: var(--font-secondary);
        font-size: 0.9rem;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.style.opacity = '1', 10);
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Load saved heritage color scheme
document.addEventListener('DOMContentLoaded', function() {
    const savedScheme = localStorage.getItem('heritage-color-scheme');
    if (savedScheme && savedScheme !== 'classic') {
        switchHeritageColorScheme(savedScheme);
    }
});

// Enhanced Gallery Lightbox
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.gallery-overlay h4');
            if (img) {
                openHeritageLightbox(img.src, img.alt, title ? title.textContent : '');
            }
        });
    });
});

function openHeritageLightbox(src, alt, title) {
    // Create elegant lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'heritage-lightbox-overlay';
    lightbox.innerHTML = `
        <div class="heritage-lightbox-content">
            <img src="${src}" alt="${alt}">
            <div class="heritage-lightbox-info">
                <h4>${title}</h4>
            </div>
            <button class="heritage-lightbox-close">&times;</button>
        </div>
    `;
    
    // Add heritage styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(26, 26, 26, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        opacity: 0;
        transition: opacity 0.4s ease;
        backdrop-filter: blur(5px);
    `;
    
    const content = lightbox.querySelector('.heritage-lightbox-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        background: white;
        border-radius: 0;
        overflow: hidden;
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
        transform: scale(0.8);
        transition: transform 0.4s ease;
    `;
    
    const img = lightbox.querySelector('img');
    img.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        display: block;
    `;
    
    const info = lightbox.querySelector('.heritage-lightbox-info');
    info.style.cssText = `
        padding: 1.5rem;
        background: var(--bg-secondary);
        text-align: center;
    `;
    
    const infoTitle = info.querySelector('h4');
    infoTitle.style.cssText = `
        color: var(--primary-color);
        font-family: var(--font-primary);
        margin: 0;
        font-size: 1.3rem;
    `;
    
    const closeBtn = lightbox.querySelector('.heritage-lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -50px;
        right: 0;
        background: var(--accent-color);
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
    `;
    
    // Add to document
    document.body.appendChild(lightbox);
    
    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
        content.style.transform = 'scale(1)';
    }, 10);
    
    // Close handlers
    function closeLightbox() {
        lightbox.style.opacity = '0';
        content.style.transform = 'scale(0.8)';
        setTimeout(() => {
            if (lightbox.parentNode) {
                lightbox.parentNode.removeChild(lightbox);
            }
        }, 400);
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // ESC key to close
    const escHandler = function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

// Heritage Menu Category Animation
document.addEventListener('DOMContentLoaded', function() {
    const menuSections = document.querySelectorAll('.menu-section');
    
    menuSections.forEach(section => {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animate section ornament
                    const ornament = entry.target.querySelector('.section-ornament');
                    if (ornament) {
                        setTimeout(() => {
                            ornament.style.transform = 'scale(1.2)';
                            setTimeout(() => {
                                ornament.style.transform = 'scale(1)';
                            }, 200);
                        }, 300);
                    }
                }
            });
        }, { threshold: 0.1 });
        
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 1s ease, transform 1s ease';
        
        const ornament = section.querySelector('.section-ornament');
        if (ornament) {
            ornament.style.transition = 'transform 0.3s ease';
        }
        
        observer.observe(section);
    });
});

// Elegant Parallax Effect
window.addEventListener('scroll', function() {
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage && window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3; // Subtler effect for heritage feel
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Initialize all heritage animations
document.addEventListener('DOMContentLoaded', function() {
    initHeritageScrollAnimations();
    initHeritageStaggeredAnimations();
});

// Heritage Print Menu Function
function printHeritageMenu() {
    const menuContent = document.querySelector('.menu-content');
    if (menuContent) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>${document.title}</title>
                <style>
                    body { 
                        font-family: 'Times New Roman', serif; 
                        margin: 30px; 
                        color: #2c2c2c;
                        line-height: 1.6;
                    }
                    .section-header { 
                        text-align: center; 
                        margin-bottom: 30px; 
                        border-bottom: 2px solid #c9a96e;
                        padding-bottom: 15px;
                    }
                    .section-header h2 { 
                        color: #1a1a1a; 
                        font-size: 2rem;
                        margin-bottom: 10px;
                    }
                    .section-ornament { 
                        color: #c9a96e; 
                        font-size: 1.5rem;
                    }
                    .menu-item-card { 
                        margin-bottom: 20px; 
                        border: 1px solid #e8e5e0; 
                        padding: 20px; 
                        break-inside: avoid;
                    }
                    .menu-item-card h3 { 
                        color: #1a1a1a; 
                        margin-bottom: 8px;
                        font-size: 1.2rem;
                    }
                    .price { 
                        font-weight: bold; 
                        color: #8b7355; 
                        float: right;
                        font-size: 1.1rem;
                    }
                    .signature-badge { 
                        background: #d4af37; 
                        color: white; 
                        padding: 2px 8px; 
                        border-radius: 10px; 
                        font-size: 0.7rem;
                        margin-left: 10px;
                    }
                    .beverage-item { 
                        display: flex; 
                        justify-content: space-between; 
                        margin-bottom: 10px; 
                        padding: 10px 0;
                        border-bottom: 1px dotted #e8e5e0;
                    }
                    @media print { 
                        body { margin: 0; }
                        .heritage-lightbox-overlay { display: none; }
                        .navbar { display: none; }
                        .footer { display: none; }
                    }
                </style>
            </head>
            <body>
                <div style="text-align: center; margin-bottom: 40px;">
                    <h1 style="color: #1a1a1a; font-size: 2.5rem; margin-bottom: 10px;">Heritage Menu</h1>
                    <div style="color: #c9a96e; font-size: 1.5rem;">❦</div>
                </div>
                ${menuContent.innerHTML}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// Performance optimization: Debounce scroll events for heritage
function heritageDebounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to heritage scroll events
const debouncedHeritageScrollHandler = heritageDebounce(function() {
    // All scroll-based effects are handled here
    const navbar = document.querySelector('.navbar');
    const currentScrollY = window.scrollY;
    
    if (navbar) {
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.1)';
        }
    }
    
    // Parallax effect
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage && window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
}, 16); // ~60fps

window.addEventListener('scroll', debouncedHeritageScrollHandler);