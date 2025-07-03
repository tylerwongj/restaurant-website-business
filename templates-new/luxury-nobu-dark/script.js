// Nobu Dark Luxury Template - Sophisticated Interactions

// Smooth scrolling with enhanced easing
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax scrolling effects for dramatic visual impact
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-bg-image, .cuisine-background img, .reservations-background img');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    }
    
    window.addEventListener('scroll', updateParallax);
}

// Location pin interactions with elegant animations
function initLocationPins() {
    const locationPins = document.querySelectorAll('.location-pin');
    
    locationPins.forEach(pin => {
        const marker = pin.querySelector('.pin-marker');
        const info = pin.querySelector('.pin-info');
        
        pin.addEventListener('mouseenter', function() {
            marker.style.transform = 'scale(1.3)';
            marker.style.backgroundColor = 'var(--color-bronze)';
            info.style.opacity = '1';
            info.style.transform = 'translateX(-50%) translateY(-10px)';
        });
        
        pin.addEventListener('mouseleave', function() {
            marker.style.transform = 'scale(1)';
            marker.style.backgroundColor = 'var(--color-gold)';
            info.style.opacity = '0';
            info.style.transform = 'translateX(-50%) translateY(0)';
        });
        
        pin.addEventListener('click', function() {
            const locationName = this.getAttribute('data-location');
            console.log(`Selected location: ${locationName}`);
            // In a real implementation, this could open a detailed modal or navigate to a location page
        });
    });
}

// Sophisticated image hover effects
function initImageHoverEffects() {
    // Cuisine category hover effects
    const cuisineCategories = document.querySelectorAll('.cuisine-category');
    
    cuisineCategories.forEach(category => {
        const image = category.querySelector('img');
        const overlay = category.querySelector('.category-overlay');
        
        category.addEventListener('mouseenter', function() {
            image.style.transform = 'scale(1.1)';
            image.style.filter = 'brightness(0.7) contrast(1.2)';
            overlay.style.transform = 'translateY(0)';
            overlay.style.opacity = '1';
        });
        
        category.addEventListener('mouseleave', function() {
            image.style.transform = 'scale(1)';
            image.style.filter = 'brightness(0.3) contrast(1.1)';
            overlay.style.transform = 'translateY(20px)';
            overlay.style.opacity = '0';
        });
    });
    
    // Dish item hover effects
    const dishItems = document.querySelectorAll('.dish-item');
    
    dishItems.forEach(dish => {
        dish.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            this.style.borderColor = 'var(--color-gold)';
        });
        
        dish.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
    });
}

// Navigation scroll effects
function initNavScrollEffects() {
    const navbar = document.querySelector('.navbar-transparent');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        } else {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.borderBottom = 'none';
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Intersection Observer for reveal animations
function initRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Stagger child animations
                const children = entry.target.querySelectorAll('.philosophy-item, .dish-item, .event-card, .location-card-featured');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe main sections
    document.querySelectorAll('.discover-section, .cuisine-showcase, .locations-global, .events-section, .reservations-dark').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Observe individual elements
    document.querySelectorAll('.philosophy-item, .dish-item, .event-card, .location-card-featured').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// Advanced event card interactions
function initEventCardEffects() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        const image = card.querySelector('.event-image img');
        
        card.addEventListener('mouseenter', function() {
            image.style.transform = 'scale(1.1)';
            image.style.filter = 'brightness(1.1) contrast(1.1)';
            this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.6)';
        });
        
        card.addEventListener('mouseleave', function() {
            image.style.transform = 'scale(1)';
            image.style.filter = 'brightness(1) contrast(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Sophisticated button hover effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn-hero-dark, .btn-location, .btn-event, .contact-method-dark');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
}

// Dynamic text effects for hero section
function initTextEffects() {
    const heroTitle = document.querySelector('.hero-title-dramatic');
    const heroSubtitle = document.querySelector('.hero-subtitle-elegant');
    
    if (heroTitle) {
        // Add typing effect or letter-by-letter reveal
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let index = 0;
        function typeWriter() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            } else if (heroSubtitle) {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
}

// Advanced scroll-triggered animations
function initScrollTriggers() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Trigger specific section animations
                const sectionId = entry.target.id;
                switch(sectionId) {
                    case 'discover':
                        animatePhilosophyItems();
                        break;
                    case 'cuisine':
                        animateCuisineCategories();
                        break;
                    case 'locations':
                        animateLocationPins();
                        break;
                    case 'events':
                        animateEventCards();
                        break;
                }
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Individual animation functions
function animatePhilosophyItems() {
    const items = document.querySelectorAll('.philosophy-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

function animateCuisineCategories() {
    const categories = document.querySelectorAll('.cuisine-category');
    categories.forEach((category, index) => {
        setTimeout(() => {
            category.style.opacity = '1';
            category.style.transform = 'scale(1)';
        }, index * 150);
    });
}

function animateLocationPins() {
    const pins = document.querySelectorAll('.location-pin');
    pins.forEach((pin, index) => {
        setTimeout(() => {
            pin.style.opacity = '1';
            pin.style.transform = 'scale(1)';
        }, index * 300);
    });
}

function animateEventCards() {
    const cards = document.querySelectorAll('.event-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Mobile menu functionality (when needed)
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger-dark');
    const navMenu = document.querySelector('.nav-menu-dark');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
    }
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality
    initSmoothScrolling();
    initParallaxEffects();
    initLocationPins();
    initImageHoverEffects();
    initNavScrollEffects();
    initRevealAnimations();
    initEventCardEffects();
    initButtonEffects();
    initTextEffects();
    initScrollTriggers();
    initMobileMenu();
    
    // Add initial animation states
    const philosophyItems = document.querySelectorAll('.philosophy-item');
    philosophyItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    const cuisineCategories = document.querySelectorAll('.cuisine-category');
    cuisineCategories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'scale(0.9)';
        category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    const locationPins = document.querySelectorAll('.location-pin');
    locationPins.forEach(pin => {
        pin.style.opacity = '0';
        pin.style.transform = 'scale(0)';
        pin.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
    
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Set initial hero subtitle state
    const heroSubtitle = document.querySelector('.hero-subtitle-elegant');
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';
        heroSubtitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    
    console.log('Nobu dark luxury template initialized with sophisticated interactions');
});

// Handle window resize
window.addEventListener('resize', function() {
    // Adjust parallax and other effects for mobile
    if (window.innerWidth <= 768) {
        // Disable parallax on mobile for performance
        const parallaxElements = document.querySelectorAll('.hero-bg-image, .cuisine-background img, .reservations-background img');
        parallaxElements.forEach(element => {
            element.style.transform = 'none';
        });
    }
});

// Add premium loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title-dramatic');
        if (heroTitle) {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }
    }, 500);
});