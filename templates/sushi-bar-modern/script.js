// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced navbar scroll effect with Japanese aesthetic
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY;
    
    if (scrolled > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(25px)';
        navbar.style.borderBottom = '1px solid rgba(198, 45, 66, 0.2)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.borderBottom = '1px solid var(--border-color)';
    }
});

// Menu tab functionality
function initMenuTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and content
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetElement = document.getElementById(targetTab);
            if (targetElement) {
                targetElement.classList.add('active');
                
                // Animate menu items with Japanese-inspired timing
                const menuItems = targetElement.querySelectorAll('.menu-item, .sashimi-set, .appetizer-item');
                menuItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 150);
                });
            }
        });
    });
}

// Sushi counter animation
function initSushiCounterAnimation() {
    const sushiPieces = document.querySelectorAll('.sushi-piece');
    
    // Observer for when the omakase section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                sushiPieces.forEach((piece, index) => {
                    setTimeout(() => {
                        piece.style.opacity = '1';
                        piece.style.transform = 'translateY(0)';
                    }, index * 500);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const omakaseSection = document.querySelector('.omakase');
    if (omakaseSection) {
        observer.observe(omakaseSection);
    }
    
    // Set initial state
    sushiPieces.forEach(piece => {
        piece.style.opacity = '0';
        piece.style.transform = 'translateY(50px)';
        piece.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
}

// Reservation form functionality
function initReservationForm() {
    const form = document.querySelector('.reservation-form form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = form.querySelector('#name').value.trim();
            const email = form.querySelector('#email').value.trim();
            const phone = form.querySelector('#phone').value.trim();
            const guests = form.querySelector('#guests').value;
            const date = form.querySelector('#date').value;
            const time = form.querySelector('#time').value;
            const experience = form.querySelector('#experience').value;
            
            // Basic validation
            if (!name || !email || !phone || !guests || !date || !time || !experience) {
                showNotification('すべての必須項目を入力してください。 (Please fill in all required fields.)', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('有効なメールアドレスを入力してください。 (Please enter a valid email address.)', 'error');
                return;
            }
            
            // Date validation (must be in the future)
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showNotification('将来の日付を選択してください。 (Please select a future date.)', 'error');
                return;
            }
            
            // Check if it's Monday (restaurant closed)
            if (selectedDate.getDay() === 1) {
                showNotification('申し訳ございませんが、月曜日は定休日です。 (Sorry, we are closed on Mondays.)', 'error');
                return;
            }
            
            // Success message with Japanese touch
            showNotification('ご予約ありがとうございます！2時間以内に確認のご連絡を差し上げます。 (Thank you for your reservation! We will confirm within 2 hours.)', 'success');
            
            // Reset form
            form.reset();
        });
    }
}

// Notification system with Japanese aesthetic
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 20px 25px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: 500;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-size: 14px;
        line-height: 1.5;
        border-left: 4px solid var(--primary-color);
    `;
    notification.innerHTML = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 6 seconds (longer for Japanese text)
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 6000);
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(`
        .feature-item,
        .price-option,
        .menu-item,
        .sashimi-set,
        .appetizer-item,
        .credential,
        .contact-card,
        .option
    `);
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add CSS for animations with Japanese timing
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .feature-item.animate-in {
        animation: slideInLeft 0.8s ease forwards;
    }
    
    .price-option.animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    .menu-item.animate-in {
        animation: fadeInScale 0.7s ease forwards;
    }
    
    .credential.animate-in {
        animation: bounceIn 0.8s ease forwards;
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-40px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
    
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            transform: scale(1.1);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(animationStyles);

// Phone number formatting
function formatPhoneNumber(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
        }
        e.target.value = value;
    });
}

// Enhanced menu item hover effects
function initMenuInteractions() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.zIndex = '10';
            
            // Special effects for premium items
            if (this.classList.contains('premium')) {
                this.style.boxShadow = '0 20px 50px rgba(255, 215, 0, 0.3)';
            } else if (this.classList.contains('signature')) {
                this.style.boxShadow = '0 20px 50px rgba(198, 45, 66, 0.3)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
            this.style.boxShadow = '0 8px 25px var(--shadow-color)';
        });
    });
}

// Omakase pricing hover effects
function initOmakasePricing() {
    const priceOptions = document.querySelectorAll('.price-option');
    
    priceOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            if (this.classList.contains('premium')) {
                this.style.boxShadow = '0 15px 40px rgba(255, 215, 0, 0.3)';
            }
        });
        
        option.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px var(--shadow-color)';
        });
    });
}

// Beverage item interactions
function initBeverageInteractions() {
    const beverageItems = document.querySelectorAll('.sake-item, .tea-item');
    
    beverageItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--background-section)';
            this.style.transform = 'translateX(8px)';
            this.style.borderRadius = '6px';
            this.style.padding = '18px 12px';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.transform = 'translateX(0)';
            this.style.borderRadius = '0';
            this.style.padding = '15px 0';
        });
    });
}

// Time slot management for reservations (closed Mondays)
function initTimeSlotManagement() {
    const dateInput = document.querySelector('#date');
    const timeSelect = document.querySelector('#time');
    
    if (dateInput && timeSelect) {
        dateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const dayOfWeek = selectedDate.getDay();
            
            // Clear existing options
            timeSelect.innerHTML = '<option value="">Select Time</option>';
            
            // Check if Monday (closed)
            if (dayOfWeek === 1) {
                const option = document.createElement('option');
                option.value = '';
                option.textContent = 'Closed on Mondays';
                option.disabled = true;
                timeSelect.appendChild(option);
                return;
            }
            
            // Define time slots based on day
            let timeSlots = [];
            if (dayOfWeek === 0) { // Sunday
                timeSlots = ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00'];
            } else if (dayOfWeek >= 2 && dayOfWeek <= 4) { // Tuesday to Thursday
                timeSlots = ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];
            } else { // Friday and Saturday
                timeSlots = ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];
            }
            
            // Add time slots as options
            timeSlots.forEach(time => {
                const option = document.createElement('option');
                option.value = time;
                const hour = parseInt(time.split(':')[0]);
                const minute = time.split(':')[1];
                const displayHour = hour > 12 ? hour - 12 : hour;
                option.textContent = `${displayHour}:${minute} PM`;
                timeSelect.appendChild(option);
            });
        });
    }
}

// Scroll-to-top with Japanese symbol
function initScrollToTop() {
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = '上';
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.title = 'Back to top';
    scrollToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 55px;
        height: 55px;
        border: none;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        font-size: 18px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        font-family: 'Noto Sans JP', sans-serif;
        font-weight: 500;
    `;
    
    scrollToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = 'var(--secondary-color)';
        this.style.boxShadow = '0 12px 35px rgba(0,0,0,0.3)';
    });
    
    scrollToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = 'var(--primary-color)';
        this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
    });
    
    document.body.appendChild(scrollToTop);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTop.style.display = 'block';
        } else {
            scrollToTop.style.display = 'none';
        }
    });
    
    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Form field enhancements
function initFormEnhancements() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-color)';
            this.style.boxShadow = '0 0 0 3px rgba(198, 45, 66, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            if (this.value) {
                this.style.borderColor = 'var(--primary-color)';
            } else {
                this.style.borderColor = 'var(--border-color)';
            }
            this.style.boxShadow = 'none';
        });
    });
}

// Lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Japanese time greeting
function initJapaneseGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting = '';
    
    if (hour < 12) {
        greeting = 'おはようございます (Good Morning)';
    } else if (hour < 17) {
        greeting = 'こんにちは (Good Afternoon)';
    } else {
        greeting = 'こんばんは (Good Evening)';
    }
    
    // Add greeting to console for developers
    console.log(`%c${greeting}`, 'color: #c62d42; font-size: 16px; font-weight: bold;');
}

// Social media link tracking
function initSocialTracking() {
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.textContent.toLowerCase();
            console.log(`Social media engagement: ${platform}`);
            // Here you would typically send analytics data
        });
    });
}

// Menu category analytics
function initMenuAnalytics() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-tab');
            console.log(`Menu category viewed: ${category}`);
            // Here you would typically send analytics data
        });
    });
}

// Parallax effect for hero section (subtle)
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background img');
        
        if (heroBackground) {
            const speed = 0.3;
            heroBackground.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMenuTabs();
    initSushiCounterAnimation();
    initReservationForm();
    initScrollAnimations();
    initMenuInteractions();
    initOmakasePricing();
    initBeverageInteractions();
    initTimeSlotManagement();
    initScrollToTop();
    initFormEnhancements();
    initLazyLoading();
    initJapaneseGreeting();
    initSocialTracking();
    initMenuAnalytics();
    initParallaxEffect();
    
    // Format phone number inputs
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(formatPhoneNumber);
    
    // Set minimum date for reservation form (tomorrow, no Mondays)
    const dateInput = document.querySelector('#date');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }
});

// Add zen-like floating elements animation
document.addEventListener('DOMContentLoaded', function() {
    // Create floating sushi elements for ambiance
    const createFloatingElement = (emoji, delay) => {
        const element = document.createElement('div');
        element.innerHTML = emoji;
        element.style.cssText = `
            position: fixed;
            font-size: 24px;
            opacity: 0.1;
            pointer-events: none;
            z-index: 1;
            animation: zenFloat 8s ease-in-out ${delay}s infinite;
        `;
        document.body.appendChild(element);
        
        // Random position
        element.style.left = Math.random() * window.innerWidth + 'px';
        element.style.top = window.innerHeight + 'px';
        
        // Remove after animation
        setTimeout(() => {
            element.remove();
        }, 8000 + delay * 1000);
    };
    
    // Add zen float animation
    const zenFloatStyle = document.createElement('style');
    zenFloatStyle.textContent = `
        @keyframes zenFloat {
            0% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0.1;
            }
            50% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(zenFloatStyle);
    
    // Create floating elements periodically
    const sushiEmojis = ['🍣', '🍱', '🥢', '🍶', '🐟'];
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance
            const emoji = sushiEmojis[Math.floor(Math.random() * sushiEmojis.length)];
            createFloatingElement(emoji, Math.random() * 2);
        }
    }, 3000);
});