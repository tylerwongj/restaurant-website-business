// Cafe Bistro Cozy Template - JavaScript

// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.menu-category');
const contactForm = document.querySelector('.contact-form form');

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
            alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
            return;
        }
        
        // Validate email
        const email = formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you within 24 hours.');
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
        background: rgba(250, 248, 245, 0.98);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(250, 248, 245, 0.98);
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

// Animation on Scroll
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
const animateElements = document.querySelectorAll('.featured-item, .menu-item, .coffee-feature, .brunch-feature, .event-item, .info-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Coffee Shop Ambiance Features
function initCoffeeShopFeatures() {
    // Daily Special Rotation
    const dailySpecials = [
        '☕ Today\'s Special: Caramel Macchiato & Blueberry Muffins',
        '☕ Today\'s Special: Pumpkin Spice Latte & Apple Cinnamon Scones', 
        '☕ Today\'s Special: Vanilla Bean Latte & Chocolate Croissants',
        '☕ Today\'s Special: Hazelnut Cappuccino & Almond Biscotti',
        '☕ Today\'s Special: Mocha Frappé & Fresh Berry Tarts',
        '☕ Today\'s Special: Cold Brew & Banana Walnut Bread',
        '☕ Today\'s Special: Chai Latte & Lemon Pound Cake'
    ];
    
    const today = new Date().getDay();
    const todaySpecial = dailySpecials[today];
    
    const specialElement = document.querySelector('.daily-special');
    if (specialElement) {
        specialElement.innerHTML = todaySpecial + ' | 🥐 Free WiFi & Study Space';
    }
}

// Coffee Temperature Display
function addCoffeeTemperature() {
    const coffeeSection = document.querySelector('.coffee-section');
    if (coffeeSection) {
        const tempDisplay = document.createElement('div');
        tempDisplay.className = 'coffee-temp-display';
        tempDisplay.innerHTML = `
            <div class="temp-info">
                <div class="temp-number">175°F</div>
                <div class="temp-label">Perfect Brewing Temperature</div>
                <div class="temp-status">☕ Fresh & Hot!</div>
            </div>
        `;
        tempDisplay.style.cssText = `
            position: absolute;
            top: 2rem;
            right: 2rem;
            background: rgba(139, 69, 19, 0.9);
            color: white;
            padding: 1rem;
            border-radius: 15px;
            text-align: center;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10;
        `;
        
        coffeeSection.style.position = 'relative';
        coffeeSection.appendChild(tempDisplay);
    }
}

// Study Hours Tracker
function addStudyHoursTracker() {
    const studySection = document.querySelector('.study-space');
    if (studySection) {
        const currentHour = new Date().getHours();
        let studyMessage = '';
        
        if (currentHour >= 6 && currentHour < 11) {
            studyMessage = '🌅 Quiet Morning Hours - Perfect for focused work';
        } else if (currentHour >= 11 && currentHour < 14) {
            studyMessage = '☀️ Midday Energy - Great for collaboration';
        } else if (currentHour >= 14 && currentHour < 17) {
            studyMessage = '📚 Afternoon Study Time - Student-friendly atmosphere';
        } else if (currentHour >= 17 && currentHour < 21) {
            studyMessage = '🌆 Evening Vibes - Relaxed study environment';
        } else {
            studyMessage = '🌙 Cozy Evening Hours - Wind down with a book';
        }
        
        const studyBanner = document.createElement('div');
        studyBanner.style.cssText = `
            background: linear-gradient(45deg, var(--secondary), var(--accent));
            color: white;
            text-align: center;
            padding: 0.75rem;
            font-weight: 600;
            border-radius: 10px;
            margin-bottom: 2rem;
        `;
        studyBanner.textContent = studyMessage;
        
        const studyText = studySection.querySelector('.study-text');
        if (studyText) {
            studyText.insertBefore(studyBanner, studyText.querySelector('h2').nextSibling);
        }
    }
}

// Weekend Brunch Banner
function addWeekendBrunchBanner() {
    const today = new Date().getDay(); // 0 = Sunday, 6 = Saturday
    
    if (today === 0 || today === 6) { // Weekend
        const brunchBanner = document.createElement('div');
        brunchBanner.style.cssText = `
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
        
        const day = today === 0 ? 'Sunday' : 'Saturday';
        brunchBanner.innerHTML = `
            🥞 Weekend Brunch is Available! ${day} 8AM - 3PM | Pancakes, Eggs Benedict & Mimosas! 🥂
        `;
        
        document.body.insertBefore(brunchBanner, document.body.firstChild);
    }
}

// Coffee Counter Animation
function animateCounters() {
    const stats = document.querySelectorAll('.stat h4');
    
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const number = parseInt(finalValue.replace(/\D/g, ''));
        
        if (number) {
            let current = 0;
            const increment = number / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + (finalValue.includes('+') ? '+' : '') + (finalValue.includes('%') ? '%' : '');
            }, 40);
        }
    });
}

// Stats Counter Observer
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Coffee Bean Loading Animation
function addBeanLoadingAnimation() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.href && this.href.includes('#')) return; // Skip for anchor links
            
            // Add coffee bean loading animation
            const originalText = this.textContent;
            let dotCount = 0;
            
            this.disabled = true;
            this.style.opacity = '0.7';
            
            const loadingInterval = setInterval(() => {
                dotCount = (dotCount + 1) % 4;
                this.textContent = 'Brewing' + '.'.repeat(dotCount);
            }, 500);
            
            setTimeout(() => {
                clearInterval(loadingInterval);
                this.textContent = originalText;
                this.disabled = false;
                this.style.opacity = '';
            }, 2000);
        });
    });
}

// Add demo data for localhost testing
function addDemoData() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Add demo button to contact form
        const demoButton = document.createElement('button');
        demoButton.textContent = 'Fill Demo Data';
        demoButton.type = 'button';
        demoButton.style.cssText = 'margin-bottom: 1rem; padding: 0.5rem 1rem; background: #8b4513; color: white; border: none; border-radius: 8px; cursor: pointer;';
        
        demoButton.onclick = () => {
            const demoData = {
                'contact-name': 'Sarah Johnson',
                'contact-email': 'sarah.johnson@example.com',
                'contact-phone': '(555) 123-4567',
                'contact-subject': 'events',
                'contact-message': 'Hi! I\'d like to book our book club meeting space for next Wednesday evening. Do you have availability for about 8 people from 7-9 PM?'
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

// Image Gallery Enhancement for About Section
function enhanceImageGallery() {
    const images = document.querySelectorAll('.image-collage img');
    
    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
            img.style.transition = 'transform 0.3s ease';
            img.style.filter = 'brightness(1.1)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
            img.style.filter = 'brightness(1)';
        });
    });
}

// Coffee Shop Sounds (Optional Enhancement)
function addAmbientSounds() {
    // Only on user interaction to comply with browser policies
    document.addEventListener('click', function initAudio() {
        // This would be where you could add subtle coffee shop ambiance
        // For now, we'll just add a visual coffee steam effect
        const coffeeIcons = document.querySelectorAll('.feature-icon');
        coffeeIcons.forEach(icon => {
            if (icon.textContent.includes('☕')) {
                icon.style.animation = 'steam 3s ease-in-out infinite';
            }
        });
        
        document.removeEventListener('click', initAudio);
    }, { once: true });
}

// Event Calendar Integration
function displayUpcomingEvents() {
    const eventItems = document.querySelectorAll('.event-item');
    const today = new Date();
    
    eventItems.forEach((item, index) => {
        const eventDates = [
            new Date(today.getFullYear(), today.getMonth(), 7), // First Wednesday
            new Date(today.getFullYear(), today.getMonth(), today.getDate() + (5 - today.getDay())), // Next Friday
            new Date(today.getFullYear(), today.getMonth() + 1, 1), // Next month
            new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay())) // Next Saturday
        ];
        
        if (eventDates[index]) {
            const eventDate = eventDates[index];
            const dateString = eventDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
            });
            
            const existingText = item.querySelector('p').textContent;
            item.querySelector('p').textContent = existingText + ` - Next: ${dateString}`;
        }
    });
}

// WiFi Password Display (Fun Feature)
function addWiFiInfo() {
    const studySection = document.querySelector('.study-space');
    if (studySection) {
        const wifiInfo = document.createElement('div');
        wifiInfo.style.cssText = `
            background: #f9f7f4;
            border: 2px dashed var(--accent);
            padding: 1rem;
            border-radius: 10px;
            text-align: center;
            margin-top: 2rem;
            font-family: 'Source Sans Pro', sans-serif;
        `;
        wifiInfo.innerHTML = `
            <strong>📶 Free WiFi</strong><br>
            <span style="color: var(--text-light); font-size: 0.9rem;">Network: CafeName_Guest | Password: coffee123</span>
        `;
        
        const studyText = studySection.querySelector('.study-text');
        if (studyText) {
            studyText.appendChild(wifiInfo);
        }
    }
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initCoffeeShopFeatures();
    addCoffeeTemperature();
    addStudyHoursTracker();
    addWeekendBrunchBanner();
    addBeanLoadingAnimation();
    addDemoData();
    enhanceImageGallery();
    addAmbientSounds();
    displayUpcomingEvents();
    addWiFiInfo();
});

// Coffee Shop Hours Status
function updateHoursStatus() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay();
    
    let isOpen = false;
    let statusMessage = '';
    
    // Check opening hours (Mon-Fri: 6AM-9PM, Sat: 7AM-9PM, Sun: 8AM-8PM)
    if (currentDay >= 1 && currentDay <= 5) { // Monday to Friday
        isOpen = currentHour >= 6 && currentHour < 21;
    } else if (currentDay === 6) { // Saturday
        isOpen = currentHour >= 7 && currentHour < 21;
    } else { // Sunday
        isOpen = currentHour >= 8 && currentHour < 20;
    }
    
    statusMessage = isOpen ? '🟢 Open Now' : '🔴 Closed';
    
    // Add status to header if not already present
    const hoursContact = document.querySelector('.hours-contact');
    if (hoursContact && !hoursContact.querySelector('.status')) {
        const statusSpan = document.createElement('span');
        statusSpan.className = 'status';
        statusSpan.textContent = statusMessage;
        statusSpan.style.fontWeight = '700';
        statusSpan.style.color = isOpen ? '#28a745' : '#dc3545';
        hoursContact.appendChild(statusSpan);
    }
}

// Update hours status on page load
document.addEventListener('DOMContentLoaded', updateHoursStatus);