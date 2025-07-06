// Modern Sushi Zen Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    const loadingScreen = document.getElementById('loadingScreen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
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
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.1)';
        }
    });

    // Menu tabs functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Reservation form handling
    const reservationForm = document.querySelector('.contact-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Validate required fields
            const requiredFields = ['name', 'email', 'phone', 'date', 'time', 'party_size'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!input.value.trim()) {
                    input.style.borderColor = '#E74C3C';
                    isValid = false;
                } else {
                    input.style.borderColor = '#E8E8E8';
                }
            });

            if (!isValid) {
                showNotification('必須項目を入力してください (Please fill in all required fields)', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailInput = this.querySelector('[name="email"]');
            if (!emailRegex.test(emailInput.value)) {
                emailInput.style.borderColor = '#E74C3C';
                showNotification('有効なメールアドレスを入力してください (Please enter a valid email address)', 'error');
                return;
            }

            // Date validation (not in the past)
            const selectedDate = new Date(this.querySelector('[name="date"]').value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                this.querySelector('[name="date"]').style.borderColor = '#E74C3C';
                showNotification('未来の日付を選択してください (Please select a future date)', 'error');
                return;
            }

            // Omakase experience validation
            const experienceType = this.querySelector('[name="experience_type"]').value;
            const partySize = parseInt(this.querySelector('[name="party_size"]').value);
            
            if (experienceType.includes('omakase') && partySize > 8) {
                showNotification('おまかせ体験は8名様まで承ります (Omakase experience is limited to 8 guests)', 'warning');
            }

            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = '処理中... (Processing...)';
            submitButton.disabled = true;

            setTimeout(() => {
                showNotification('ご予約リクエストを承りました。24時間以内にご連絡いたします。(Reservation request received. We will contact you within 24 hours)', 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Scroll animations
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

    // Add fade-in animation to elements
    document.querySelectorAll('.omakase-tier, .menu-item, .info-card, .principle').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            const rate = scrolled * -0.3;
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });

    // Counter animation for credentials
    function animateCounters() {
        const counters = document.querySelectorAll('.credential-number');
        counters.forEach(counter => {
            const text = counter.textContent;
            if (text.includes('+')) {
                const number = parseInt(text.replace('+', ''));
                animateNumber(counter, 0, number, 2000, '+');
            }
        });
    }

    function animateNumber(element, start, end, duration, suffix = '') {
        const range = end - start;
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + range * progress);
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    }

    // Trigger counter animation when credentials section is visible
    const credentialsSection = document.querySelector('.chef-credentials');
    if (credentialsSection) {
        const credentialsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    credentialsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        credentialsObserver.observe(credentialsSection);
    }

    // Menu item hover effects with sound simulation
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
    });

    // Zen philosophy reveal animation
    const principles = document.querySelectorAll('.principle');
    principles.forEach((principle, index) => {
        principle.style.opacity = '0';
        principle.style.transform = 'translateX(-30px)';
        principle.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        
        const principleObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.5 });
        
        principleObserver.observe(principle);
    });

    // Omakase tier highlighting
    document.querySelectorAll('.omakase-tier').forEach(tier => {
        tier.addEventListener('click', function() {
            // Remove previous selection
            document.querySelectorAll('.omakase-tier').forEach(t => t.classList.remove('selected'));
            
            // Add selection to clicked tier
            this.classList.add('selected');
            
            // Pre-fill reservation form if visible
            const experienceSelect = document.querySelector('[name="experience_type"]');
            if (experienceSelect) {
                const tierType = this.querySelector('h3').textContent.toLowerCase();
                const optionValue = `omakase-${tierType}`;
                
                // Find matching option
                const option = experienceSelect.querySelector(`option[value="${optionValue}"]`);
                if (option) {
                    experienceSelect.value = optionValue;
                    experienceSelect.style.borderColor = '#E67E22';
                    setTimeout(() => {
                        experienceSelect.style.borderColor = '#E8E8E8';
                    }, 2000);
                }
            }
            
            showNotification(`${this.querySelector('h3').textContent} experience selected`, 'info');
        });
    });

    // Image lazy loading with fade effect
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.6s ease';
                
                const newImg = new Image();
                newImg.onload = function() {
                    img.style.opacity = '1';
                };
                newImg.src = img.src;
                
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Zen moment - breathing animation for scroll indicator
    const scrollLine = document.querySelector('.scroll-line');
    if (scrollLine) {
        setInterval(() => {
            scrollLine.style.transform = 'scaleY(1.5)';
            setTimeout(() => {
                scrollLine.style.transform = 'scaleY(1)';
            }, 1000);
        }, 3000);
    }

    // Japanese cultural elements
    const kanjiElement = document.querySelector('.kanji');
    if (kanjiElement) {
        kanjiElement.addEventListener('click', function() {
            this.style.transform = 'rotateY(360deg)';
            this.style.transition = 'transform 1s ease';
            setTimeout(() => {
                this.style.transform = 'rotateY(0deg)';
            }, 1000);
        });
    }
});

// Utility function for notifications with Japanese styling
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27AE60' : type === 'error' ? '#E74C3C' : type === 'warning' ? '#F39C12' : '#3498DB'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.4s ease;
        font-family: 'Noto Sans JP', sans-serif;
        border-left: 4px solid rgba(255,255,255,0.3);
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 5000);

    // Click to dismiss
    notification.addEventListener('click', function() {
        this.style.opacity = '0';
        this.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        }, 400);
    });
}

// Keyboard navigation with Japanese cultural respect
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Close any modals or overlays
        const selectedTiers = document.querySelectorAll('.omakase-tier.selected');
        selectedTiers.forEach(tier => tier.classList.remove('selected'));
    }
});

// Performance optimization - Debounce scroll events
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
const debouncedScrollHandler = debounce(function() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.1)';
    }
    
    // Parallax effect for hero
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const rate = scrolled * -0.3;
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);