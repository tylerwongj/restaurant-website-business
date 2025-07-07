// Community Breakfast Chain Restaurant Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Location search functionality
    const locationSearch = document.querySelector('.search-form');
    if (locationSearch) {
        const locationInput = locationSearch.querySelector('input');
        const locationButton = locationSearch.querySelector('button');
        
        if (locationButton) {
            locationButton.addEventListener('click', function() {
                const query = locationInput.value.trim();
                if (query) {
                    // In a real implementation, this would call an API
                    console.log('Searching for locations near:', query);
                    showLocationResults(query);
                } else {
                    alert('Please enter a zip code or city name');
                }
            });
        }
        
        if (locationInput) {
            locationInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    locationButton.click();
                }
            });
        }
    }

    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const topic = this.querySelector('select:not([name="location"])').value;
            const location = this.querySelector('select[name="location"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !topic || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // In a real implementation, this would send data to a server
            console.log('Form submitted:', { name, email, phone, topic, location, message });
            
            // Show success message based on topic
            let successMessage = 'Thank you for your message! ';
            switch(topic) {
                case 'feedback':
                    successMessage += 'We appreciate your feedback and will review it with our team.';
                    break;
                case 'complaint':
                    successMessage += 'We take all concerns seriously and will investigate this matter promptly.';
                    break;
                case 'compliment':
                    successMessage += 'We love hearing positive feedback! We\'ll share your kind words with our team.';
                    break;
                case 'franchise':
                    successMessage += 'A franchise representative will contact you within 2 business days.';
                    break;
                case 'community':
                    successMessage += 'Our community outreach team will be in touch soon.';
                    break;
                default:
                    successMessage += 'We will get back to you within 24 hours.';
            }
            
            alert(successMessage);
            this.reset();
        });
    }

    // Promo card hover effects
    const promoCards = document.querySelectorAll('.promo-card');
    promoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('featured')) {
                this.style.transform = 'translateY(-5px) scale(1.05)';
            } else {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Menu item hover effects
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--red-light)';
            this.style.transform = 'scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.transform = 'scale(1)';
        });
    });

    // Initiative card animations
    const initiativeCards = document.querySelectorAll('.initiative-card');
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

    initiativeCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });

    // Value item animations
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat h3, .stat-number');
    stats.forEach(stat => {
        observer.observe(stat);
        
        stat.addEventListener('animationstart', function() {
            const text = this.textContent;
            const number = parseInt(text.replace(/[^\d]/g, ''));
            
            if (number && number > 0) {
                animateCounter(this, 0, number, 2000);
            }
        });
    });

    // Location card interactions
    const locationCards = document.querySelectorAll('.location-card');
    locationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--box-shadow)';
        });
    });

    // Always Open badge pulse animation
    const alwaysOpenBadge = document.querySelector('.always-open-badge');
    if (alwaysOpenBadge) {
        setInterval(() => {
            alwaysOpenBadge.style.animation = 'none';
            setTimeout(() => {
                alwaysOpenBadge.style.animation = 'pulse 2s infinite';
            }, 10);
        }, 10000); // Pulse every 10 seconds
    }

    // Community button interactions
    const communityButton = document.querySelector('.community-button');
    if (communityButton) {
        communityButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Set topic to community partnership
                setTimeout(() => {
                    const topicSelect = document.querySelector('select:not([name="location"])');
                    if (topicSelect) {
                        topicSelect.value = 'community';
                    }
                }, 500);
            }
        });
    }

    // Add loading states for buttons
    const actionButtons = document.querySelectorAll('.location-button, .order-button, .delivery-button');
    actionButtons.forEach(button => {
        if (button.textContent.toLowerCase().includes('order') || 
            button.textContent.toLowerCase().includes('delivery')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.pointerEvents = 'auto';
                    // In a real implementation, this would redirect to ordering system
                    alert('Redirecting to online ordering system...');
                }, 1500);
            });
        }
    });

    // Promotional card cycling
    const promoCardsContainer = document.querySelector('.promotions-grid');
    if (promoCardsContainer) {
        let currentPromoIndex = 0;
        const promoCardsList = Array.from(promoCards);
        
        setInterval(() => {
            // Remove featured class from current
            promoCardsList.forEach(card => card.classList.remove('featured'));
            
            // Add featured class to next
            currentPromoIndex = (currentPromoIndex + 1) % promoCardsList.length;
            promoCardsList[currentPromoIndex].classList.add('featured');
        }, 8000); // Change every 8 seconds
    }

    // Initialize tooltips for features
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.backgroundColor = 'var(--accent-color)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = 'var(--yellow-light)';
        });
    });

    // Hours highlighting based on current time
    const locationHours = document.querySelectorAll('.hours-time');
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    
    locationHours.forEach(hours => {
        const hoursText = hours.textContent.toLowerCase();
        
        // Check if location is currently open (simplified logic)
        if (hoursText.includes('24/7') || hoursText.includes('always open')) {
            hours.style.color = 'var(--green-medium)';
            hours.style.fontWeight = '700';
            
            // Add "OPEN NOW" indicator
            if (!hours.nextElementSibling || !hours.nextElementSibling.classList.contains('open-indicator')) {
                const openIndicator = document.createElement('span');
                openIndicator.className = 'open-indicator';
                openIndicator.textContent = ' • OPEN NOW';
                openIndicator.style.color = 'var(--green-medium)';
                openIndicator.style.fontWeight = '700';
                openIndicator.style.fontSize = '0.9rem';
                hours.parentNode.insertBefore(openIndicator, hours.nextSibling);
            }
        }
    });
});

// Utility functions
function showLocationResults(query) {
    // In a real implementation, this would show actual search results
    const resultMessage = `Found 12 locations near "${query}". Showing closest 3 locations.`;
    
    // Create and show a temporary notification
    const notification = document.createElement('div');
    notification.className = 'location-notification';
    notification.textContent = resultMessage;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: var(--green-medium);
        color: var(--white);
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        z-index: 1001;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const originalText = element.textContent;
    const suffix = originalText.replace(/[\d,]/g, '');
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(start + (end - start) * progress);
        element.textContent = currentValue.toLocaleString() + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Add CSS animations
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
    
    .header.scrolled {
        background-color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .menu-item {
        transition: all 0.3s ease;
    }
    
    .value-item:hover .value-price {
        animation: bounce 0.6s ease;
    }
    
    @keyframes bounce {
        0%, 20%, 60%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        80% { transform: translateY(-5px); }
    }
    
    .always-open-badge .clock-icon {
        animation: tick 2s infinite;
    }
    
    @keyframes tick {
        0%, 50% { transform: rotate(0deg); }
        25% { transform: rotate(15deg); }
        75% { transform: rotate(-15deg); }
    }
`;
document.head.appendChild(style);

// Performance optimization
function debounce(func, wait) {
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

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(function() {
    // Optimized scroll handling can be added here
}, 100));

// Community stats refresh (for dynamic content)
function refreshCommunityStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const currentValue = parseInt(stat.textContent.replace(/[^\d]/g, ''));
        if (currentValue > 0) {
            // Simulate slight increase in community impact
            const newValue = currentValue + Math.floor(Math.random() * 5);
            stat.textContent = newValue.toLocaleString() + stat.textContent.replace(/[\d,]/g, '');
        }
    });
}

// Refresh stats every 30 seconds (for demo purposes)
setInterval(refreshCommunityStats, 30000);