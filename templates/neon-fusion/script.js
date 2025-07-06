// Neon Fusion Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeNavigation();
    initializeMenuTabs();
    initializeParticleSystem();
    initializeScrollEffects();
    initializeFormInteractions();
    initializeNeonEffects();
    initializeGlitchEffect();
    initialize3DViewers();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });
}

// Menu tabs functionality
function initializeMenuTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // Remove active class from all tabs and categories
            tabButtons.forEach(btn => btn.classList.remove('active'));
            menuCategories.forEach(category => category.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding category
            const targetElement = document.getElementById(targetCategory);
            if (targetElement) {
                targetElement.classList.add('active');
                
                // Animate category entrance
                const dishCards = targetElement.querySelectorAll('.dish-card');
                dishCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        card.style.transition = 'all 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    });
}

// Enhanced particle system
function initializeParticleSystem() {
    const particleContainer = document.querySelector('.floating-particles');
    if (!particleContainer) return;
    
    // Create additional floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: ${getRandomNeonColor()};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 5}s linear infinite;
            box-shadow: 0 0 10px currentColor;
        `;
        particleContainer.appendChild(particle);
    }
    
    function getRandomNeonColor() {
        const colors = ['#00ff88', '#ff0080', '#0080ff', '#ffff00', '#8000ff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Parallax effect for hero background
    const heroImg = document.querySelector('.hero-bg img');
    
    if (heroImg) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroImg.style.transform = `translateY(${parallax}px) scale(1.1)`;
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different elements
                if (entry.target.classList.contains('dish-card')) {
                    animateDishCard(entry.target);
                } else if (entry.target.classList.contains('experience-card')) {
                    animateExperienceCard(entry.target);
                } else if (entry.target.classList.contains('tech-item')) {
                    animateTechItem(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.dish-card, .experience-card, .tech-item, .feature-card').forEach(el => {
        observer.observe(el);
    });
}

// Form interactions and validation
function initializeFormInteractions() {
    const bookingForm = document.querySelector('.booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            const requiredFields = ['name', 'email', 'phone', 'date', 'time', 'guests'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!data[field]) {
                    showFieldError(input);
                    isValid = false;
                } else {
                    clearFieldError(input);
                }
            });
            
            if (isValid) {
                // Simulate booking process with neon effects
                submitBooking(data);
            }
        });
        
        // Real-time field validation
        const inputs = bookingForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value) {
                    showFieldError(this);
                } else {
                    clearFieldError(this);
                }
            });
            
            input.addEventListener('focus', function() {
                clearFieldError(this);
            });
        });
    }
}

// Neon glow effects
function initializeNeonEffects() {
    // Dynamic neon pulse for various elements
    const neonElements = document.querySelectorAll('.btn-primary, .neon-text, .neon-title');
    
    neonElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'neonPulse 0.5s ease-in-out';
        });
        
        element.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Interactive glow effect on hover
    const cards = document.querySelectorAll('.dish-card, .experience-card, .feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
            this.style.background = `
                radial-gradient(circle at var(--mouse-x) var(--mouse-y), 
                rgba(0, 255, 136, 0.15) 0%, 
                rgba(0, 255, 136, 0.05) 50%, 
                transparent 100%)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });
}

// Glitch effect enhancements
function initializeGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        // Random glitch trigger
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                element.style.animation = 'glitch 0.3s linear';
                
                setTimeout(() => {
                    element.style.animation = '';
                }, 300);
            }
        }, 3000);
    });
}

// 3D viewer functionality
function initialize3DViewers() {
    const view3DButtons = document.querySelectorAll('.view-3d');
    
    view3DButtons.forEach(button => {
        button.addEventListener('click', function() {
            const dishCard = this.closest('.dish-card');
            const dishName = dishCard.querySelector('h3').textContent;
            
            // Create 3D viewer modal
            create3DModal(dishName);
        });
    });
}

// Animation functions
function animateDishCard(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) rotateX(15deg)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) rotateX(0)';
    }, 100);
}

function animateExperienceCard(card) {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.8) rotateY(15deg)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'scale(1) rotateY(0)';
    }, 100);
}

function animateTechItem(item) {
    const number = item.querySelector('.tech-number');
    const details = item.querySelector('.tech-details');
    
    number.style.opacity = '0';
    number.style.transform = 'scale(0)';
    details.style.opacity = '0';
    details.style.transform = 'translateX(-30px)';
    
    setTimeout(() => {
        number.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        number.style.opacity = '1';
        number.style.transform = 'scale(1)';
        
        setTimeout(() => {
            details.style.transition = 'all 0.5s ease-out';
            details.style.opacity = '1';
            details.style.transform = 'translateX(0)';
        }, 200);
    }, 100);
}

// Form validation helpers
function showFieldError(input) {
    const inputGroup = input.closest('.input-group');
    if (inputGroup) {
        inputGroup.style.borderBottom = '2px solid #ff0080';
        input.style.borderBottomColor = '#ff0080';
        
        // Add error glow
        input.style.boxShadow = '0 0 10px rgba(255, 0, 128, 0.5)';
    }
}

function clearFieldError(input) {
    const inputGroup = input.closest('.input-group');
    if (inputGroup) {
        input.style.borderBottomColor = '';
        input.style.boxShadow = '';
    }
}

// Booking submission
function submitBooking(data) {
    const submitButton = document.querySelector('.booking-form button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state with neon animation
    submitButton.innerHTML = 'Processing...';
    submitButton.style.animation = 'neonPulse 1s infinite';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitButton.innerHTML = 'Reservation Confirmed!';
        submitButton.style.animation = '';
        submitButton.style.background = 'linear-gradient(45deg, #00ff88, #0080ff)';
        
        // Show success notification
        showNotification('Your reservation has been confirmed! We\'ll send details to your email.', 'success');
        
        // Reset form after delay
        setTimeout(() => {
            document.querySelector('.booking-form').reset();
            submitButton.innerHTML = originalText;
            submitButton.style.background = '';
            submitButton.disabled = false;
        }, 3000);
    }, 2000);
}

// 3D Modal creation
function create3DModal(dishName) {
    const modal = document.createElement('div');
    modal.className = '3d-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(10px);
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(255, 0, 128, 0.1));
        padding: 40px;
        border-radius: 15px;
        border: 2px solid #00ff88;
        text-align: center;
        max-width: 500px;
        width: 90%;
        color: white;
    `;
    
    modalContent.innerHTML = `
        <h2 style="color: #00ff88; margin-bottom: 20px; font-family: 'Orbitron', monospace;">${dishName}</h2>
        <p style="margin-bottom: 20px;">3D viewer would be integrated here using WebGL or Three.js</p>
        <div style="width: 100%; height: 200px; background: rgba(0, 255, 136, 0.1); border-radius: 10px; margin: 20px 0; display: flex; align-items: center; justify-content: center; border: 1px solid #00ff88;">
            <span style="color: #00ff88;">Interactive 3D Model</span>
        </div>
        <button onclick="this.closest('.3d-modal').remove()" style="background: #00ff88; color: black; border: none; padding: 10px 20px; border-radius: 25px; font-weight: bold; cursor: pointer;">Close Viewer</button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close modal on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #00ff88, #0080ff)' : 'linear-gradient(45deg, #ff0080, #8000ff)'};
        color: ${type === 'success' ? 'black' : 'white'};
        border-radius: 25px;
        font-family: 'Orbitron', monospace;
        font-weight: 600;
        z-index: 10001;
        animation: slideIn 0.5s ease-out;
        box-shadow: 0 0 20px ${type === 'success' ? 'rgba(0, 255, 136, 0.5)' : 'rgba(255, 0, 128, 0.5)'};
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

// Add CSS animations via JavaScript
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes floatParticle {
        0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(5, 5, 5, 0.98);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 50px;
            transition: left 0.3s ease;
            backdrop-filter: blur(20px);
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 20px 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;

document.head.appendChild(dynamicStyles);