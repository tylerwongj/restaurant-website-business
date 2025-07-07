// Pizza Italian Rustic Template - JavaScript

// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.menu-category');
const contactForm = document.querySelector('.contact-form form');
const addButtons = document.querySelectorAll('.btn-add');

// Mobile Menu Toggle
mobileMenuToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Menu Category Switching
menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.getAttribute('data-category');
        
        // Remove active class from all tabs and categories
        menuTabs.forEach(t => t.classList.remove('active'));
        menuCategories.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding category
        tab.classList.add('active');
        const targetCategory = document.getElementById(category);
        if (targetCategory) {
            targetCategory.classList.add('active');
        }
    });
});

// Add to Order Functionality
let cart = [];

addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const pizzaCard = e.target.closest('.pizza-card');
        const pizzaName = pizzaCard.querySelector('h3').textContent;
        const pizzaPrice = pizzaCard.querySelector('.price').textContent;
        
        // Add to cart
        cart.push({
            name: pizzaName,
            price: pizzaPrice,
            quantity: 1
        });
        
        // Visual feedback
        button.textContent = 'Added!';
        button.style.background = '#28a745';
        
        setTimeout(() => {
            button.textContent = 'Add to Order';
            button.style.background = '';
        }, 2000);
        
        // Update cart count if there's a cart indicator
        updateCartCount();
        
        // Show notification
        showNotification(`${pizzaName} added to your order!`);
    });
});

// Cart Management
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        
        // Basic validation
        const requiredFields = ['name', 'email', 'subject', 'message'];
        const missingFields = [];
        
        requiredFields.forEach(field => {
            if (!formData.get(field)) {
                missingFields.push(field);
            }
        });
        
        if (missingFields.length > 0) {
            alert(`Per favore compila tutti i campi: ${missingFields.join(', ')}`);
            return;
        }
        
        // Validate email
        const email = formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Per favore inserisci un indirizzo email valido.');
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Invio in corso...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            alert('Grazie per il tuo messaggio! Ti risponderemo entro 24 ore.');
            contactForm.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// Smooth Scrolling for Navigation Links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.nav').offsetHeight + 
                           (document.querySelector('.header-top')?.offsetHeight || 0);
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Add smooth scrolling to navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// Header Scroll Effects
let lastScrollTop = 0;
const header = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class for styling
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Add CSS for header scroll effects and mobile menu
const style = document.createElement('style');
style.textContent = `
    .nav.scrolled {
        background: rgba(254, 253, 249, 0.98);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(254, 253, 249, 0.98);
        padding: 1rem 2rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        gap: 1rem;
        z-index: 1000;
        backdrop-filter: blur(10px);
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Pizza Image Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation styles and observe elements
const animateElements = document.querySelectorAll('.pizza-card, .menu-item, .oven-feature, .family-feature, .info-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Heritage Counter Animation
function animateCounter(element, target, duration) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Animate heritage numbers when they come into view
const heritageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const heading = entry.target.querySelector('h4');
            const text = heading.textContent;
            const number = parseInt(text.match(/\d+/));
            if (number) {
                animateCounter(heading, number, 2000);
                heritageObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.heritage-item').forEach(item => {
    heritageObserver.observe(item);
});

// Italian Phrases and Translations
const italianPhrases = {
    'Benvenuti alla Famiglia!': 'Welcome to the Family!',
    'La Nostra Storia': 'Our Story',
    'Le Nostre Pizze Famose': 'Our Famous Pizzas',
    'Menu Completo': 'Complete Menu',
    'Il Nostro Forno a Legna': 'Our Wood-Fired Oven',
    'Perfetto per Tutta la Famiglia': 'Perfect for the Whole Family',
    'Catering Italiano': 'Italian Catering',
    'Ordina Online': 'Order Online',
    'Vieni a Trovarci': 'Come Visit Us'
};

// Add translation tooltips to Italian phrases
Object.keys(italianPhrases).forEach(phrase => {
    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    elements.forEach(el => {
        if (el.textContent.includes(phrase)) {
            el.title = italianPhrases[phrase];
            el.style.cursor = 'help';
        }
    });
});

// Wood-fired Oven Temperature Display
function displayOvenTemperature() {
    const ovenSection = document.querySelector('.specialties');
    if (ovenSection) {
        const tempDisplay = document.createElement('div');
        tempDisplay.className = 'oven-temp-display';
        tempDisplay.innerHTML = `
            <div class="temp-gauge">
                <div class="temp-number">900°F</div>
                <div class="temp-label">Oven Temperature</div>
                <div class="temp-status">🔥 Ready for Pizza!</div>
            </div>
        `;
        tempDisplay.style.cssText = `
            position: absolute;
            top: 2rem;
            right: 2rem;
            background: rgba(204, 0, 0, 0.9);
            color: white;
            padding: 1rem;
            border-radius: 15px;
            text-align: center;
            font-weight: 700;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10;
        `;
        
        ovenSection.style.position = 'relative';
        ovenSection.appendChild(tempDisplay);
    }
}

// Add demo data for localhost testing
function addDemoData() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Add demo button to contact form
        const demoButton = document.createElement('button');
        demoButton.textContent = 'Compila Dati Demo';
        demoButton.type = 'button';
        demoButton.style.cssText = 'margin-bottom: 1rem; padding: 0.5rem 1rem; background: #6b7280; color: white; border: none; border-radius: 8px; cursor: pointer;';
        
        demoButton.onclick = () => {
            const demoData = {
                'contact-name': 'Mario Rossi',
                'contact-email': 'mario.rossi@example.com',
                'contact-phone': '(555) 123-4567',
                'contact-subject': 'catering',
                'contact-message': 'Ciao! Vorrei informazioni per un catering per 30 persone. Che opzioni avete disponibili?'
            };
            
            Object.entries(demoData).forEach(([id, value]) => {
                const field = document.getElementById(id);
                if (field) field.value = value;
            });
        };
        
        const form = document.querySelector('.contact-form form');
        if (form) {
            form.insertBefore(demoButton, form.firstChild);
        }
    }
}

// Family Special Announcement
function addFamilySpecial() {
    const today = new Date().getDay(); // 0 = Sunday
    
    if (today === 0) { // Sunday
        const specialBanner = document.createElement('div');
        specialBanner.style.cssText = `
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            color: white;
            text-align: center;
            padding: 1rem;
            font-weight: 700;
            position: sticky;
            top: 0;
            z-index: 101;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        `;
        specialBanner.innerHTML = `
            🍕 DOMENICA FAMIGLIA! Kids Eat Free Today! 👨‍👩‍👧‍👦
        `;
        
        document.body.insertBefore(specialBanner, document.body.firstChild);
    }
}

// Pizza of the Day Feature
function displayPizzaOfTheDay() {
    const pizzas = [
        'Pizza Margherita',
        'Pizza Diavola', 
        'Quattro Stagioni',
        'Pizza Bianca',
        'Pizza Napoletana',
        'Pizza Prosciutto e Funghi'
    ];
    
    const today = new Date().getDay();
    const pizzaOfTheDay = pizzas[today % pizzas.length];
    
    // Add to header announcement
    const announcement = document.querySelector('.announcement');
    if (announcement) {
        announcement.innerHTML += ` | 🍕 Pizza del Giorno: ${pizzaOfTheDay}`;
    }
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    addDemoData();
    addFamilySpecial();
    displayPizzaOfTheDay();
    displayOvenTemperature();
});

// Add loading states for better UX
function addLoadingStates() {
    const buttons = document.querySelectorAll('button[type="submit"], .btn-primary, .btn-secondary, .btn-add');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.form && this.form.checkValidity && !this.form.checkValidity()) {
                return;
            }
            
            if (!this.disabled && !this.classList.contains('btn-add')) {
                this.style.opacity = '0.7';
                this.style.cursor = 'wait';
                
                setTimeout(() => {
                    this.style.opacity = '';
                    this.style.cursor = '';
                }, 2000);
            }
        });
    });
}

// Initialize loading states
document.addEventListener('DOMContentLoaded', addLoadingStates);

// Image Gallery Enhancement
function enhanceImageGallery() {
    const gallery = document.querySelector('.image-gallery');
    if (gallery) {
        const images = gallery.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
                img.style.transition = 'transform 0.3s ease';
            });
            
            img.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });
        });
    }
}

// Initialize image gallery effects
document.addEventListener('DOMContentLoaded', enhanceImageGallery);