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
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.12)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
        }
    }
});

// Menu Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide categories
            menuCategories.forEach(category => {
                const categoryType = category.getAttribute('data-category');
                if (filter === 'all' || filter === categoryType) {
                    category.style.display = 'block';
                    category.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    category.style.display = 'none';
                }
            });
        });
    });
});

// Newsletter Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const email = this.querySelector('input[type="email"]').value;
            const agreement = this.querySelector('input[type="checkbox"]').checked;
            
            // Basic validation
            if (!email) {
                showPlantNotification('Please enter your email address', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showPlantNotification('Please enter a valid email address', 'error');
                return;
            }
            
            if (!agreement) {
                showPlantNotification('Please agree to receive updates', 'error');
                return;
            }
            
            // Success message
            showPlantNotification('Welcome to our plant-based community! 🌱', 'success');
            this.reset();
        });
    }
});

// Plant-Based Notification System
function showPlantNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `plant-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '🌱' : '⚠️'}</span>
            <span class="notification-text">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #2e7d32, #4caf50)' : '#ff6b6b'};
        color: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        font-family: 'Poppins', sans-serif;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 15px;
    `;
    
    notification.querySelector('.notification-icon').style.fontSize = '1.5rem';
    notification.querySelector('.notification-text').style.flex = '1';
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification
    const hideNotification = () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    };
    
    notification.querySelector('.notification-close').addEventListener('click', hideNotification);
    setTimeout(hideNotification, 5000);
}

// Intersection Observer for Animations
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.dish-card, .value-item, .menu-item, .feature-item, .impact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Nutrition Icons Interaction
document.addEventListener('DOMContentLoaded', function() {
    const nutritionIcons = document.querySelectorAll('.nutrition-icons span');
    nutritionIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const title = this.getAttribute('title');
            if (title) {
                showPlantNotification(`This dish is ${title.toLowerCase()}! 💚`, 'success');
            }
        });
    });
});

// Diet Badge Interactions
document.addEventListener('DOMContentLoaded', function() {
    const dietBadges = document.querySelectorAll('.diet-badge');
    dietBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            const badgeText = this.textContent.trim();
            let message = '';
            
            switch(badgeText.toLowerCase()) {
                case 'gf':
                case 'gluten-free':
                    message = 'This dish is completely gluten-free! 🌾';
                    break;
                case 'raw':
                    message = 'This dish is prepared without cooking to preserve nutrients! 🥗';
                    break;
                case 'high protein':
                    message = 'Packed with plant-based protein for sustained energy! 💪';
                    break;
                case 'keto':
                case 'keto friendly':
                    message = 'Perfect for a ketogenic lifestyle! 🥑';
                    break;
                case 'superfood':
                    message = 'Loaded with nutrient-dense superfoods! ✨';
                    break;
                default:
                    message = 'Specially crafted for your dietary needs! 🌱';
            }
            
            showPlantNotification(message, 'success');
        });
    });
});

// Dynamic Impact Stats Animation
function animateImpactStats() {
    const impactNumbers = document.querySelectorAll('.impact-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                const finalValue = number.textContent;
                
                if (finalValue.includes('%')) {
                    const numValue = parseInt(finalValue);
                    animateNumber(number, 0, numValue, '%');
                } else if (finalValue.toLowerCase() === 'zero') {
                    number.textContent = 'Zero';
                    number.classList.add('pulse');
                }
                
                observer.unobserve(number);
            }
        });
    });
    
    impactNumbers.forEach(num => observer.observe(num));
}

function animateNumber(element, start, end, suffix = '') {
    const duration = 2000;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Initialize impact stats animation
document.addEventListener('DOMContentLoaded', animateImpactStats);

// Hero Badge Interactions
document.addEventListener('DOMContentLoaded', function() {
    const ecoBadges = document.querySelectorAll('.eco-badge');
    ecoBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            const text = this.textContent.trim();
            if (text.includes('Plant-Powered')) {
                showPlantNotification('100% plant-based ingredients in every dish! 🌱', 'success');
            } else if (text.includes('Earth-Friendly')) {
                showPlantNotification('Our practices help protect the planet! 🌍', 'success');
            }
        });
    });
});

// Dish Card Hover Effects Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const dishCards = document.querySelectorAll('.dish-card');
    dishCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
        });
        
        // Click interaction
        card.addEventListener('click', function() {
            const dishName = this.querySelector('h3').textContent;
            showPlantNotification(`${dishName} sounds delicious! 🌱`, 'success');
        });
    });
});

// Sustainability Feature Interactions
document.addEventListener('DOMContentLoaded', function() {
    const sustainabilityFeatures = document.querySelectorAll('.feature-item');
    sustainabilityFeatures.forEach(feature => {
        feature.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            let message = '';
            
            switch(title.toLowerCase()) {
                case 'organic farming':
                    message = 'We support farms that regenerate soil and biodiversity! 🌾';
                    break;
                case 'plastic-free packaging':
                    message = 'All our packaging is compostable and plastic-free! 📦';
                    break;
                case 'local sourcing':
                    message = 'Fresh ingredients from farms within 50 miles! 🚛';
                    break;
                case 'renewable energy':
                    message = 'Our restaurant runs on 100% solar power! ⚡';
                    break;
                default:
                    message = 'Thank you for caring about sustainability! 🌍';
            }
            
            showPlantNotification(message, 'success');
        });
    });
});

// Value Item Pulse Animation
document.addEventListener('DOMContentLoaded', function() {
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('pulse');
            setTimeout(() => item.classList.remove('pulse'), 2000);
        }, index * 500);
    });
});

// Phone Number Formatting
function formatPhoneNumber(input) {
    const value = input.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    input.value = formattedValue;
}

// Apply phone formatting to phone inputs
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', () => formatPhoneNumber(input));
        input.setAttribute('placeholder', '(555) 123-4567');
    });
});

// Color Scheme Switcher for Testing
function switchVeganColorScheme(scheme) {
    const body = document.body;
    // Remove existing color classes
    body.classList.remove('color-classic', 'color-business', 'color-warm', 'color-cool', 'color-bold');
    // Add new color class
    if (scheme !== 'natural') {
        body.classList.add(`color-${scheme}`);
    }
}

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        // Observe all images with data-src attribute
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => imageObserver.observe(img));
    }
});

// Plant-Based Tips Generator
function generatePlantTip() {
    const tips = [
        "Plants provide all essential amino acids when eaten in variety! 💪",
        "Eating plant-based can reduce your carbon footprint by up to 73%! 🌍",
        "Beans and legumes are protein powerhouses! 🌱",
        "Colorful vegetables provide different antioxidants - eat the rainbow! 🌈",
        "Plant-based diets are linked to better heart health! ❤️",
        "Nuts and seeds are great sources of healthy fats! 🥜",
        "Whole grains provide sustained energy throughout the day! ⚡",
        "Plant-based eating supports biodiversity! 🦋"
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    showPlantNotification(randomTip, 'success');
}

// Add tip generator to navigation badges
document.addEventListener('DOMContentLoaded', function() {
    const veganBadge = document.querySelector('.badge-vegan');
    const organicBadge = document.querySelector('.badge-organic');
    
    if (veganBadge) {
        veganBadge.addEventListener('click', generatePlantTip);
    }
    
    if (organicBadge) {
        organicBadge.addEventListener('click', function() {
            showPlantNotification('Organic farming protects soil, water, and wildlife! 🌾', 'success');
        });
    }
});

// Time-based Personalization
function personalizeVeganExperience() {
    const hour = new Date().getHours();
    let timeMessage = '';
    
    if (hour < 10) {
        timeMessage = 'Start your day with plant power! 🌅';
    } else if (hour < 14) {
        timeMessage = 'Perfect time for a nourishing plant-based lunch! 🥗';
    } else if (hour < 18) {
        timeMessage = 'Afternoon energy boost with plants! ⚡';
    } else {
        timeMessage = 'Unwind with wholesome plant-based dinner! 🌙';
    }
    
    // Show personalized message after page loads
    setTimeout(() => {
        showPlantNotification(timeMessage, 'success');
    }, 2000);
}

// Initialize personalization
document.addEventListener('DOMContentLoaded', personalizeVeganExperience);