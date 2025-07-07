// Fast Casual Asian Restaurant JavaScript

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

    // Menu Tab Functionality
    const menuTabs = document.querySelectorAll('.menu__tab');
    const menuCategories = document.querySelectorAll('.menu__category');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // Remove active class from all tabs and categories
            menuTabs.forEach(t => t.classList.remove('menu__tab--active'));
            menuCategories.forEach(c => c.classList.remove('menu__category--active'));
            
            // Add active class to clicked tab and corresponding category
            this.classList.add('menu__tab--active');
            const targetElement = document.querySelector(`[data-category="${targetCategory}"]`);
            if (targetElement && targetElement.classList.contains('menu__category')) {
                targetElement.classList.add('menu__category--active');
            }
        });
    });

    // Order Modal Functionality
    const orderButtons = document.querySelectorAll('.nav__order-btn, .hero__cta, .category-card__btn');
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
        button.addEventListener('click', openModal);
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

    // Menu Item Add to Cart Functionality
    const addButtons = document.querySelectorAll('.menu-item__add');
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add visual feedback
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.style.background = '#10b981';
            
            // Reset after 1.5 seconds
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 1500);
            
            // Here you would typically add the item to a cart system
            console.log('Added item to cart');
        });
    });

    // Location Finder Functionality
    const locationInput = document.querySelector('.location-finder__input');
    const locationButton = document.querySelector('.location-finder__btn');

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
            
            // Reset form and button after 3 seconds
            setTimeout(() => {
                this.reset();
                submitButton.textContent = originalText;
                submitButton.style.background = '';
            }, 3000);
        });
    }

    // Scroll-based Header Background
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add background when scrolling down
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '';
            header.style.backdropFilter = '';
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
    const animatedElements = document.querySelectorAll('.category-card, .menu-item, .feature, .location-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Color Scheme Switcher (for demo purposes)
    function addColorSchemeSwitcher() {
        const schemes = ['classic', 'business', 'warm', 'cool', 'bold'];
        const currentScheme = document.body.className.match(/color-scheme-(\w+)/)?.[1] || 'warm';
        
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
                img.src = img.src; // This would normally be img.dataset.src for actual lazy loading
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    console.log('Fast Casual Asian Restaurant website loaded successfully!');
});