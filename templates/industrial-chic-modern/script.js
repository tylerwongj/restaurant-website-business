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

// Smooth Scrolling
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

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(25px)';
        navbar.style.borderBottom = '2px solid var(--primary-color)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.borderBottom = '2px solid var(--primary-color)';
    }
});

// Industrial Animation Effects
function initIndustrialAnimations() {
    // Geometric shapes floating animation
    const shapes = document.querySelectorAll('.geometric-shape');
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.3);
        const amplitude = 10 + (index * 5);
        
        let startTime = Date.now();
        
        function animateShape() {
            const elapsed = (Date.now() - startTime) / 1000;
            const offset = Math.sin(elapsed * speed) * amplitude;
            
            if (shape.classList.contains('shape-1')) {
                shape.style.transform = `rotate(${45 + offset}deg)`;
            } else if (shape.classList.contains('shape-2')) {
                shape.style.transform = `translateY(${offset}px)`;
            } else if (shape.classList.contains('shape-3')) {
                shape.style.transform = `translateX(${offset}px)`;
            }
            
            requestAnimationFrame(animateShape);
        }
        
        animateShape();
    });
}

// Timeline Animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const connectors = document.querySelectorAll('.timeline-connector');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Animate timeline items sequentially
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animate connector after item
                    const nextConnector = connectors[index];
                    if (nextConnector) {
                        setTimeout(() => {
                            nextConnector.style.width = '100%';
                            nextConnector.style.opacity = '1';
                        }, 300);
                    }
                }, index * 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    connectors.forEach(connector => {
        connector.style.width = '0';
        connector.style.opacity = '0';
        connector.style.transition = 'width 0.8s ease, opacity 0.8s ease';
    });
}

// Menu Cards Industrial Hover Effects
function initMenuCardEffects() {
    const menuCards = document.querySelectorAll('.menu-card');
    
    menuCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add industrial scanning effect
            const scanLine = document.createElement('div');
            scanLine.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background: var(--primary-color);
                animation: scan 0.6s ease-in-out;
                z-index: 10;
            `;
            
            // Add CSS animation for scan line
            if (!document.querySelector('#scan-animation')) {
                const style = document.createElement('style');
                style.id = 'scan-animation';
                style.textContent = `
                    @keyframes scan {
                        0% { transform: translateY(0); opacity: 1; }
                        100% { transform: translateY(250px); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.style.position = 'relative';
            this.appendChild(scanLine);
            
            setTimeout(() => {
                if (scanLine.parentNode) {
                    scanLine.remove();
                }
            }, 600);
        });
    });
}

// Industrial Counter Animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number, .stat-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const text = counter.textContent;
                const numbers = text.match(/\d+/);
                
                if (numbers) {
                    const finalValue = parseInt(numbers[0]);
                    let currentValue = 0;
                    const increment = finalValue / 60; // 60 frames for smooth animation
                    
                    const updateCounter = () => {
                        currentValue += increment;
                        if (currentValue >= finalValue) {
                            counter.textContent = text;
                        } else {
                            counter.textContent = text.replace(/\d+/, Math.floor(currentValue));
                            requestAnimationFrame(updateCounter);
                        }
                    };
                    
                    updateCounter();
                }
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Contact Form with Industrial Styling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const phone = contactForm.querySelector('input[type="tel"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Validation
            if (!name || !email || !message) {
                showIndustrialMessage('REQUIRED FIELDS MISSING', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showIndustrialMessage('INVALID EMAIL FORMAT', 'error');
                return;
            }
            
            // Industrial-style form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Processing animation
            let dots = 0;
            submitBtn.textContent = 'PROCESSING';
            submitBtn.disabled = true;
            
            const loadingInterval = setInterval(() => {
                dots = (dots + 1) % 4;
                submitBtn.textContent = 'PROCESSING' + '.'.repeat(dots);
            }, 200);
            
            setTimeout(() => {
                clearInterval(loadingInterval);
                showIndustrialMessage('MESSAGE TRANSMITTED SUCCESSFULLY', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2500);
        });
    }
    
    // Initialize all animations
    initIndustrialAnimations();
    initTimelineAnimation();
    initMenuCardEffects();
    initCounterAnimation();
    initIndustrialEffects();
});

// Industrial Message Display
function showIndustrialMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.industrial-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const message = document.createElement('div');
    message.className = `industrial-message ${type}`;
    message.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? 'var(--primary-color)' : '#dc3545'};
        color: white;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9rem;
        z-index: 10000;
        border: 2px solid var(--text-dark);
        box-shadow: 5px 5px 0 var(--text-dark);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    message.textContent = text;
    
    document.body.appendChild(message);
    
    // Animate in
    setTimeout(() => {
        message.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        message.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 300);
    }, 5000);
}

// Additional Industrial Effects
function initIndustrialEffects() {
    // Parallax effect for hero elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroElements = document.querySelector('.hero-elements');
        
        if (heroElements) {
            heroElements.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        // Industrial grid overlay effect on scroll
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const opacity = Math.max(0, Math.min(1, 1 - Math.abs(rect.top) / window.innerHeight));
                section.style.setProperty('--scroll-opacity', opacity);
            }
        });
    });
    
    // Industrial loading effect
    const industrialElements = document.querySelectorAll('.menu-card, .feature-item, .info-block');
    
    const loadObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add industrial scan effect
                    const scanEffect = document.createElement('div');
                    scanEffect.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 1px;
                        background: var(--primary-color);
                        animation: industrialScan 0.8s ease-out;
                        z-index: 10;
                    `;
                    
                    entry.target.style.position = 'relative';
                    entry.target.appendChild(scanEffect);
                    
                    setTimeout(() => {
                        if (scanEffect.parentNode) {
                            scanEffect.remove();
                        }
                    }, 800);
                    
                }, index * 100);
                
                loadObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    industrialElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        loadObserver.observe(element);
    });
    
    // Add industrial scan animation CSS
    if (!document.querySelector('#industrial-animations')) {
        const style = document.createElement('style');
        style.id = 'industrial-animations';
        style.textContent = `
            @keyframes industrialScan {
                0% { width: 0; opacity: 1; }
                100% { width: 100%; opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Industrial sound effects (optional)
function addIndustrialSounds() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Create industrial "click" sound using Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Industrial-style click sound
            oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.05);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.05);
        });
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Uncomment to enable industrial sound effects
    // addIndustrialSounds();
});