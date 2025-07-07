document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

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

    // Special days carousel rotation
    const specialDays = document.querySelectorAll('.special-day');
    let currentSpecial = 0;

    function rotateSpecials() {
        specialDays.forEach((day, index) => {
            day.classList.remove('active');
            if (index === currentSpecial) {
                day.classList.add('active');
            }
        });
        currentSpecial = (currentSpecial + 1) % specialDays.length;
    }

    // Rotate every 4 seconds
    if (specialDays.length > 0) {
        setInterval(rotateSpecials, 4000);
    }

    // Special day click handlers
    specialDays.forEach((day, index) => {
        day.addEventListener('click', function() {
            specialDays.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
            currentSpecial = index;
        });
    });

    // Location finder functionality
    const zipCodeInput = document.getElementById('zipCode');
    const findButton = document.querySelector('.finder-form button');
    
    if (findButton) {
        findButton.addEventListener('click', function() {
            const zipCode = zipCodeInput.value.trim();
            if (zipCode) {
                // Simulate location search
                alert(`Searching for locations near ${zipCode}...`);
                // In a real implementation, this would make an API call
            } else {
                alert('Please enter a ZIP code to find locations.');
            }
        });
    }

    // Enter key support for location finder
    if (zipCodeInput) {
        zipCodeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                findButton.click();
            }
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .menu-category, .location-card, .order-option').forEach(el => {
        observer.observe(el);
    });

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Feature card hover effects
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Menu category hover effects
    document.querySelectorAll('.menu-category').forEach(category => {
        category.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        category.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // Order option click tracking
    document.querySelectorAll('.order-option .btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const orderType = this.closest('.order-option').querySelector('h3').textContent;
            console.log(`Order clicked: ${orderType}`);
            // In a real implementation, this would redirect to ordering platform
            alert(`Redirecting to ${orderType} ordering...`);
        });
    });

    // Dynamic time-based greeting
    function updateGreeting() {
        const hour = new Date().getHours();
        const greetingElement = document.querySelector('.hero-text h2');
        
        if (greetingElement && greetingElement.textContent.includes('Stack')) {
            if (hour < 11) {
                greetingElement.textContent = "Good Morning! Stack 'Em High!";
            } else if (hour < 17) {
                greetingElement.textContent = "Good Afternoon! Stack 'Em High!";
            } else {
                greetingElement.textContent = "Good Evening! Stack 'Em High!";
            }
        }
    }

    updateGreeting();

    // Social media link tracking
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.textContent;
            console.log(`Social media click: ${platform}`);
        });
    });

    // Rewards signup simulation
    document.querySelectorAll('a[href="#signup"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = prompt('Enter your email to join Pancake Rewards:');
            if (email && email.includes('@')) {
                alert('Welcome to Pancake Rewards! Check your email for your welcome bonus.');
            } else if (email) {
                alert('Please enter a valid email address.');
            }
        });
    });

    // Special offers countdown timer
    function createCountdownTimer() {
        const specialOffers = document.querySelectorAll('.special-day');
        const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
        
        specialOffers.forEach((offer, index) => {
            if (index === today || (today === 0 && index === 5)) { // Sunday = Weekend
                offer.classList.add('today-special');
                const badge = document.createElement('div');
                badge.className = 'today-badge';
                badge.textContent = 'TODAY!';
                offer.appendChild(badge);
            }
        });
    }

    createCountdownTimer();

    // Image lazy loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Stats counter animation
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/\D/g, ''));
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                let displayValue = Math.floor(current);
                if (stat.textContent.includes('+')) {
                    displayValue += '+';
                }
                if (stat.textContent.includes('M')) {
                    displayValue = Math.floor(current) + 'M+';
                }
                stat.textContent = displayValue;
            }, 50);
        });
    }

    // Trigger stats animation when section comes into view
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        });
        statsObserver.observe(statsSection);
    }

    // Accessibility improvements
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.click();
            }
        });
    });

    // Form validation for any forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const inputs = this.querySelectorAll('input[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#dc3545';
                    isValid = false;
                } else {
                    input.style.borderColor = '#28a745';
                }
            });
            
            if (isValid) {
                alert('Form submitted successfully!');
                this.reset();
            } else {
                alert('Please fill out all required fields.');
            }
        });
    });

    // Loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '🥞';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(65, 105, 225, 0.4);
    `;
    
    document.body.appendChild(scrollToTopBtn);

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
        }
    });
});

// CSS animations and additional styles
const style = document.createElement('style');
style.textContent = `
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

    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            opacity: 1;
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }

    .nav.active {
        display: block;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--background-color);
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        padding: 1rem;
    }

    .nav.active .nav-list {
        flex-direction: column;
        gap: 1rem;
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

    .header {
        transition: transform 0.3s ease;
    }

    .menu-category img {
        transition: transform 0.3s ease;
    }

    .feature-card {
        transition: transform 0.3s ease;
    }

    .today-special {
        position: relative;
        border: 3px solid var(--accent-color);
        animation: bounceIn 0.8s ease-out;
    }

    .today-badge {
        position: absolute;
        top: -10px;
        right: -10px;
        background: var(--accent-color);
        color: var(--background-color);
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: bold;
        animation: bounceIn 1s ease-out 0.5s both;
    }

    body:not(.loaded) * {
        animation-play-state: paused !important;
    }

    .scroll-to-top:hover {
        background: var(--secondary-color) !important;
        transform: scale(1.1);
    }

    .monthly-special::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="80" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="60" cy="30" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="30" cy="70" r="1" fill="rgba(255,255,255,0.1)"/></svg>');
        pointer-events: none;
    }

    @media (prefers-reduced-motion: reduce) {
        .animate-in,
        .bounceIn,
        .today-special {
            animation: none;
        }
        
        .feature-card,
        .menu-category {
            transition: none;
        }
    }
`;
document.head.appendChild(style);