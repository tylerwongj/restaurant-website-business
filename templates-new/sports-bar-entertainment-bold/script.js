// Sports Bar Entertainment Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    let isMenuOpen = false;

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'white';
                navMenu.style.padding = '20px';
                navMenu.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                navMenu.style.gap = '15px';
                
                // Animate hamburger
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                navMenu.style.display = 'none';
                
                // Reset hamburger
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (isMenuOpen) {
                    mobileToggle.click();
                }
            }
        });
    });

    // Deal card hover effects
    const dealCards = document.querySelectorAll('.deal-card');
    dealCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Event day cards animation
    const eventDays = document.querySelectorAll('.event-day');
    eventDays.forEach((day, index) => {
        day.style.opacity = '0';
        day.style.transform = 'translateY(30px)';
        day.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('event-day')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                } else if (entry.target.classList.contains('deal-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                } else {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    eventDays.forEach(day => observer.observe(day));
    dealCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe sections for fade-in
    const sections = document.querySelectorAll('.entertainment-section, .rewards-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Button click effects
    const buttons = document.querySelectorAll('button, .btn-order, .btn-deal, .btn-entertainment, .btn-rewards, .btn-directions');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Order button functionality
    const orderButtons = document.querySelectorAll('.btn-order, .nav-cta, .banner-cta');
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show order modal or redirect
            alert('Order functionality would integrate with your POS system or third-party ordering platform.');
        });
    });

    // Deal buttons functionality
    const dealButtons = document.querySelectorAll('.btn-deal');
    dealButtons.forEach(button => {
        button.addEventListener('click', function() {
            const dealCard = this.closest('.deal-card');
            const dealName = dealCard.querySelector('h3').textContent;
            const dealPrice = dealCard.querySelector('.deal-price').textContent;
            
            alert(`${dealName} - ${dealPrice}\n\nWould you like to add this to your order?`);
        });
    });

    // Rewards signup functionality
    const rewardsButton = document.querySelector('.btn-rewards');
    if (rewardsButton) {
        rewardsButton.addEventListener('click', function() {
            const email = prompt('Enter your email to join our rewards program:');
            if (email && email.includes('@')) {
                alert(`Thank you! We've sent a confirmation to ${email}. Check your inbox to complete your rewards signup!`);
            } else if (email) {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Directions functionality
    const directionsButton = document.querySelector('.btn-directions');
    if (directionsButton) {
        directionsButton.addEventListener('click', function() {
            // In a real implementation, this would open Google Maps with the restaurant location
            alert('Opening directions in Google Maps...');
        });
    }

    // Parallax effect for hero section
    const heroPromo = document.querySelector('.hero-promo');
    if (heroPromo) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            heroPromo.style.transform = `translateY(${rate}px)`;
        });
    }

    // Navigation bar scroll effect
    const nav = document.querySelector('.nav-sports');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.background = 'white';
            nav.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Deal card stagger animation
    const dealCardsForStagger = document.querySelectorAll('.deal-card');
    dealCardsForStagger.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add smooth transitions to all interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .deal-card, .event-day');
    interactiveElements.forEach(element => {
        element.style.transition = 'all 0.3s ease';
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = function() {
                    this.style.opacity = '1';
                };
                
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add loading states to buttons
    function addLoadingState(button) {
        const originalText = button.textContent;
        button.textContent = 'Loading...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 1000);
    }

    // Entertainment section learn more
    const entertainmentButton = document.querySelector('.btn-entertainment');
    if (entertainmentButton) {
        entertainmentButton.addEventListener('click', function() {
            addLoadingState(this);
            setTimeout(() => {
                alert('Learn more about our entertainment options:\n\n• 50+ HD TVs\n• Private party rooms\n• Live sports viewing\n• Game tournaments\n• Special events');
            }, 1000);
        });
    }

    // Form validation for email inputs
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            mobileToggle.click();
        }
    });

    // Performance optimization: debounce scroll events
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

    // Apply debounce to scroll handlers
    const debouncedScrollHandler = debounce(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.background = 'white';
            nav.style.backdropFilter = 'none';
        }
    }, 10);

    window.addEventListener('scroll', debouncedScrollHandler);
});