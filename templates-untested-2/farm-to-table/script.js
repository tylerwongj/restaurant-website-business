// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--background-light)';
        navbar.style.backdropFilter = 'none';
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#e74c3c';
            } else {
                field.style.borderColor = 'var(--border-color)';
            }
        });
        
        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Thank you for your reservation! We will contact you soon to confirm your farm-to-table dining experience.');
            this.reset();
        } else {
            alert('Please fill out all required fields.');
        }
    });
}

// Update harvest date display
function updateHarvestDate() {
    const today = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const formattedDate = today.toLocaleDateString('en-US', options);
    
    const harvestDate = document.getElementById('harvest-date');
    if (harvestDate) {
        harvestDate.textContent = `Week of ${formattedDate} - Fresh from our partner farms`;
    }
}

// Update current season display
function updateCurrentSeason() {
    const currentMonth = new Date().getMonth() + 1; // 1-12
    let season;
    
    if (currentMonth >= 3 && currentMonth <= 5) {
        season = 'Spring';
    } else if (currentMonth >= 6 && currentMonth <= 8) {
        season = 'Summer';
    } else if (currentMonth >= 9 && currentMonth <= 11) {
        season = 'Fall';
    } else {
        season = 'Winter';
    }
    
    const currentSeasonElement = document.getElementById('current-season');
    if (currentSeasonElement) {
        currentSeasonElement.textContent = `${season} 2024`;
    }
}

// Farm source hover effects
function addFarmSourceInteractivity() {
    const farmSources = document.querySelectorAll('.farm-source');
    
    farmSources.forEach(source => {
        source.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
            this.style.textDecoration = 'underline';
            
            // Show farm info tooltip (mock functionality)
            const tooltip = document.createElement('div');
            tooltip.className = 'farm-tooltip';
            tooltip.textContent = `${this.textContent} - Organic certified since 2010`;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--primary-color);
                color: white;
                padding: 8px 12px;
                border-radius: 5px;
                font-size: 0.8rem;
                z-index: 1000;
                pointer-events: none;
                transform: translateY(-100%);
                margin-top: -5px;
            `;
            
            this.style.position = 'relative';
            this.appendChild(tooltip);
        });
        
        source.addEventListener('mouseleave', function() {
            this.style.textDecoration = 'none';
            const tooltip = this.querySelector('.farm-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Seasonal menu badge animation
function animateSeasonalBadges() {
    const badges = document.querySelectorAll('.harvest-badge');
    
    badges.forEach((badge, index) => {
        // Stagger the animation
        setTimeout(() => {
            badge.style.animation = 'pulse 2s infinite';
        }, index * 200);
    });
    
    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Farm tour interest handler
function handleFarmTourInterest() {
    const occasionSelect = document.querySelector('select:not([required])');
    if (occasionSelect) {
        occasionSelect.addEventListener('change', function() {
            const form = this.closest('form');
            
            // Remove existing farm tour info
            const existingInfo = form.querySelector('.farm-tour-info');
            if (existingInfo) {
                existingInfo.remove();
            }
            
            if (this.value === 'farm-tour') {
                const farmTourInfo = document.createElement('div');
                farmTourInfo.className = 'farm-tour-info';
                farmTourInfo.style.cssText = `
                    background: var(--background-cream);
                    padding: 15px;
                    border-radius: 8px;
                    margin-top: 10px;
                    border-left: 4px solid var(--primary-color);
                `;
                farmTourInfo.innerHTML = `
                    <h4 style="margin-bottom: 10px; color: var(--text-dark);">Farm Tour Experience</h4>
                    <p style="color: var(--text-light); font-size: 0.9rem; margin-bottom: 10px;">
                        Join us for a guided tour of our partner farms before your meal! Tours include:
                    </p>
                    <ul style="color: var(--text-light); font-size: 0.9rem; margin-left: 20px;">
                        <li>Meet the farmers and learn about sustainable practices</li>
                        <li>See where your ingredients are grown</li>
                        <li>Harvest activities (seasonal)</li>
                        <li>Farm-to-table lunch following the tour</li>
                    </ul>
                `;
                
                this.parentNode.appendChild(farmTourInfo);
            }
        });
    }
}

// Organic certification badges interaction
function addCertificationInteractivity() {
    const certifications = document.querySelectorAll('.certification');
    
    certifications.forEach(cert => {
        cert.addEventListener('click', function() {
            // Mock certification details
            const certInfo = {
                '🌱 Certified Organic': 'USDA Organic certified since 2015. All ingredients meet strict organic standards.',
                '🚜 Local Partnership': 'Direct partnerships with 15 local farms within 50 miles of our restaurant.',
                '♻️ Zero Waste': 'Comprehensive composting and recycling program with 95% waste diversion.'
            };
            
            const info = certInfo[this.textContent];
            if (info) {
                alert(info);
            }
        });
        
        cert.style.cursor = 'pointer';
        cert.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        cert.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Newsletter subscription handling
function handleNewsletterSignup() {
    const newsletterCheckbox = document.getElementById('newsletter');
    if (newsletterCheckbox) {
        newsletterCheckbox.addEventListener('change', function() {
            if (this.checked) {
                // Show subscription benefits
                if (!document.querySelector('.newsletter-benefits')) {
                    const benefits = document.createElement('div');
                    benefits.className = 'newsletter-benefits';
                    benefits.style.cssText = `
                        background: var(--accent-color);
                        color: var(--text-dark);
                        padding: 10px;
                        border-radius: 5px;
                        margin-top: 10px;
                        font-size: 0.9rem;
                    `;
                    benefits.textContent = 'Great! You\'ll receive weekly updates about our seasonal menu changes and special farm events.';
                    
                    this.parentNode.appendChild(benefits);
                }
            } else {
                const benefits = document.querySelector('.newsletter-benefits');
                if (benefits) {
                    benefits.remove();
                }
            }
        });
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Special animation for farmer cards
            if (entry.target.classList.contains('farmer-card')) {
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            }
        }
    });
}, observerOptions);

// Product tag interactions
function addProductTagInteractivity() {
    const productTags = document.querySelectorAll('.product-tag');
    
    productTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Mock seasonal availability info
            const seasonalInfo = {
                'Lettuce': 'Available year-round from our greenhouse operations',
                'Tomatoes': 'Peak season: June-October, greenhouse varieties available year-round',
                'Herbs': 'Fresh daily from our indoor herb gardens',
                'Beef': 'Grass-fed cattle, processed monthly',
                'Pork': 'Heritage breed pigs, available seasonally',
                'Eggs': 'Fresh daily from free-range chickens',
                'Apples': 'Peak season: September-November, stored varieties until spring',
                'Pears': 'Peak season: August-October',
                'Stone Fruits': 'Peak season: June-August'
            };
            
            const info = seasonalInfo[this.textContent];
            if (info) {
                // Create info popup
                const popup = document.createElement('div');
                popup.className = 'product-info-popup';
                popup.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--background-light);
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 10px 30px var(--shadow-medium);
                    z-index: 1000;
                    max-width: 300px;
                    text-align: center;
                `;
                
                popup.innerHTML = `
                    <h4 style="margin-bottom: 10px; color: var(--primary-color);">${this.textContent}</h4>
                    <p style="color: var(--text-light); margin-bottom: 15px;">${info}</p>
                    <button onclick="this.parentElement.remove()" style="
                        background: var(--primary-color);
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 5px;
                        cursor: pointer;
                    ">Close</button>
                `;
                
                document.body.appendChild(popup);
                
                // Remove popup after 5 seconds
                setTimeout(() => {
                    if (popup.parentNode) {
                        popup.remove();
                    }
                }, 5000);
            }
        });
        
        tag.style.cursor = 'pointer';
        tag.addEventListener('mouseenter', function() {
            this.style.background = 'var(--primary-color)';
            this.style.color = 'var(--text-white)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.background = 'var(--background-section)';
            this.style.color = 'var(--text-dark)';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateHarvestDate();
    updateCurrentSeason();
    addFarmSourceInteractivity();
    animateSeasonalBadges();
    handleFarmTourInterest();
    addCertificationInteractivity();
    handleNewsletterSignup();
    addProductTagInteractivity();
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.value-card, .harvest-item, .menu-item, .farmer-card, .about-text, .contact-info');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .harvest-item:hover .harvest-badge {
            transform: scale(1.1);
            transition: transform 0.3s ease;
        }
        
        .farmer-card:hover .product-tag {
            transform: translateY(-2px);
            transition: transform 0.3s ease;
        }
        
        .value-card:hover .value-icon {
            transform: scale(1.1);
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});

// Seasonal menu rotation (mock functionality)
function rotateSeasonalItems() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Mock seasonal rotation every 10 seconds for demo
    setInterval(() => {
        menuItems.forEach(item => {
            const farmSource = item.querySelector('.farm-source');
            if (farmSource) {
                farmSource.style.opacity = '0.5';
                setTimeout(() => {
                    farmSource.style.opacity = '1';
                }, 500);
            }
        });
    }, 10000);
}

// Start seasonal rotation after page load
setTimeout(rotateSeasonalItems, 3000);

// Image lazy loading fallback
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lozad.js/1.16.0/lozad.min.js';
    document.head.appendChild(script);
    
    script.onload = () => {
        const lazyObserver = lozad();
        lazyObserver.observe();
    };
}