// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll with industrial effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY;
    
    if (scrolled > 50) {
        navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.querySelector('.nav-container').style.borderBottom = '1px solid rgba(231, 76, 60, 0.5)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        navbar.style.backdropFilter = 'none';
        navbar.querySelector('.nav-container').style.borderBottom = 'none';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Industrial-style animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add industrial animation class
            if (entry.target.classList.contains('feature-item')) {
                entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                entry.target.classList.add('animate-slide-up');
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-item, .menu-showcase-item, .about-content, .about-images').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Menu page navigation highlighting
function updateMenuNavigation() {
    const menuNavLinks = document.querySelectorAll('.menu-nav-link');
    const sections = document.querySelectorAll('.menu-category');
    
    if (menuNavLinks.length === 0) return;
    
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        menuNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Form submission handling with industrial styling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'PROCESSING...';
        submitBtn.disabled = true;
        
        // Simulate form processing
        setTimeout(() => {
            alert('Reservation request submitted! We\'ll contact you within 24 hours to confirm your industrial dining experience.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Industrial counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .feature-number');
    
    counters.forEach(counter => {
        const updateCounter = () => {
            const target = +counter.getAttribute('data-target') || parseInt(counter.textContent);
            const count = +counter.innerText;
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCounter, 50);
            } else {
                counter.innerText = target;
            }
        };
        
        // Start animation when element is visible
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counterObserver.observe(counter);
    });
}

// Image hover effects for industrial theme
function addImageEffects() {
    const images = document.querySelectorAll('.menu-showcase-item img, .about-image-main img');
    
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.filter = 'grayscale(0%) contrast(1.2) brightness(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.filter = 'grayscale(30%) contrast(1.1)';
        });
    });
}

// Industrial loading animation
function showLoadingAnimation() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-bars">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>
            <p>LOADING INDUSTRIAL EXPERIENCE...</p>
        </div>
    `;
    
    // Add loading styles
    const loadingStyles = document.createElement('style');
    loadingStyles.textContent = `
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(44, 62, 80, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            color: white;
        }
        
        .loading-content {
            text-align: center;
        }
        
        .loading-bars {
            display: flex;
            gap: 5px;
            margin-bottom: 20px;
            justify-content: center;
        }
        
        .bar {
            width: 4px;
            height: 40px;
            background: #e74c3c;
            animation: loading-bars 1s infinite ease-in-out;
        }
        
        .bar:nth-child(2) { animation-delay: 0.2s; }
        .bar:nth-child(3) { animation-delay: 0.4s; }
        .bar:nth-child(4) { animation-delay: 0.6s; }
        .bar:nth-child(5) { animation-delay: 0.8s; }
        
        @keyframes loading-bars {
            0%, 40%, 100% { transform: scaleY(0.4); }
            20% { transform: scaleY(1); }
        }
    `;
    
    document.head.appendChild(loadingStyles);
    document.body.appendChild(loadingOverlay);
    
    // Remove loading overlay after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.remove();
            loadingStyles.remove();
        }, 1000);
    });
}

// Color scheme switcher for industrial themes
function switchColorScheme(scheme) {
    const body = document.body;
    body.className = body.className.replace(/color-\w+/g, '');
    if (scheme !== 'default') {
        body.classList.add(`color-${scheme}`);
    }
    
    // Save preference
    localStorage.setItem('industrialColorScheme', scheme);
}

// Load saved color scheme
function loadColorScheme() {
    const saved = localStorage.getItem('industrialColorScheme');
    if (saved && saved !== 'default') {
        document.body.classList.add(`color-${saved}`);
    }
}

// Add industrial sound effects (optional)
function addSoundEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Create a subtle click sound effect
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiS1/LNeSsFJHTF8N2QQAoUXrPp66hVFAoPgMAAgIAAAAQAHgBZAAEAgIAFACQAWQABAICABQAkAFkAAQCAgAUAJABZAAEAgIAFACQAWQABAICABQAkAFkAAQCAgAUAJABZAAEAgIAFACQAWQABAICABQAkAFkAAQCAgAUAJABZAAEAgIAFACQAWQABAICABQAkAFkAAQCAgAUAJABZAAEAgIAFACQAWQABAICABQAkAFkAAQCAgAUAJABZAAEAgIAFACQAWQABAICABQAkAFkAAQCAgAUAJABZAAEAgIAFACQAWQABAICABQAkAFkAAQCAgAUAJABZAAEAgIAFACQAWQABAICABQAkAFkAAQCAgAUAJABZAAEAgIAFACQAWQABAICABQAkAFkAAQCAgAUAJABZAAEAgIAFACQAWQABAICABQAkAFkAAQCAgAUAJABZAAEAgIAFACQAWQABAICABQAkAFkAAQCAgAUAJABZAAEAgIAFACQAWQABAICABQAkAFkAAQCAgAUAJABZAAEAgIAFACQAWQABAICABQAkAFkAAQCAgAUAJABZAAEAgIAFACQAWQABAICABQAkAFkAAQCAgAUAJABZAAEAgIAFACQAWQABAICABQAkAFkAAQCAgAUAJABZAAEAgIAFACQAWQABAICABQAkAFkAAQCAgAUAJABZAAEAgIAFACQAWQABAICABQAkAFkAAQCAgAUAJABZAAEAgIAFACQAWQABAICABQAkAFkAAQCAgAUAJABZAAEAgIAFACQAWQABAICABQAkAFkAAQCAgAUAJABZAAEAgIAFACQAWQABAICABQAkAFkAAQCAgAUAJABZAAEA==');
            audio.volume = 0.1;
            audio.play().catch(() => {}); // Ignore errors if audio can't play
        });
    });
}

// Performance monitoring for industrial sites
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                
                // Log performance for industrial efficiency
                console.log(`🏭 Industrial site loaded in ${loadTime}ms`);
                
                if (loadTime > 3000) {
                    console.warn('🔧 Site loading slower than industrial standards. Consider optimization.');
                }
            }, 0);
        });
    }
}

// Error handling with industrial messaging
window.addEventListener('error', (e) => {
    console.error('🏭 Industrial system error:', e.error);
});

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadColorScheme();
    updateMenuNavigation();
    animateCounters();
    addImageEffects();
    addSoundEffects();
    monitorPerformance();
    
    // Show loading animation on first visit
    if (!sessionStorage.getItem('visited')) {
        showLoadingAnimation();
        sessionStorage.setItem('visited', 'true');
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Industrial hotkeys
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'm':
                e.preventDefault();
                window.location.href = 'menu.html';
                break;
            case 'h':
                e.preventDefault();
                window.location.href = 'index.html';
                break;
        }
    }
});

// Service worker for industrial caching
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('🏭 Industrial service worker registered');
            })
            .catch(function(err) {
                console.log('🔧 Service worker registration failed');
            });
    });
}

// Industrial-themed cursor effects (optional)
function addCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'industrial-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #e74c3c;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });
}