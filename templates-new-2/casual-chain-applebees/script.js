document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        navActions.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navActions.classList.remove('active');
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
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Featured items animation on scroll
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
    
    // Observe featured cards
    document.querySelectorAll('.featured-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Rewards section animation
    const rewardsSection = document.querySelector('.rewards');
    if (rewardsSection) {
        observer.observe(rewardsSection);
    }
    
    // Order button interactions
    document.querySelectorAll('.btn-order, .btn-card').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.4)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = e.offsetX + 'px';
            ripple.style.top = e.offsetY + 'px';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Simulate order process
            setTimeout(() => {
                alert('Order functionality would be implemented here!');
            }, 100);
        });
    });
    
    // Rewards signup interaction
    document.querySelector('.btn-rewards-large')?.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Rewards signup functionality would be implemented here!');
    });
    
    // Action buttons interaction
    document.querySelectorAll('.action-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const actionText = this.querySelector('.action-text h3').textContent;
            
            switch(actionText) {
                case 'Order':
                    alert('Order functionality would be implemented here!');
                    break;
                case 'Menus':
                    alert('Menu functionality would be implemented here!');
                    break;
                case 'Locations':
                    alert('Location finder would be implemented here!');
                    break;
                case 'Gift Cards':
                    alert('Gift card purchase would be implemented here!');
                    break;
                default:
                    alert('Feature coming soon!');
            }
        });
    });
    
    // Form validation for contact forms (if added)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePhone(phone) {
        const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return re.test(phone);
    }
    
    // Hero section parallax effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
    
    // Loading animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.community-content, .location-grid');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize scroll animations
    document.querySelectorAll('.community-content, .location-grid').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial check for elements in view
    animateOnScroll();
});

// Add ripple animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        flex-direction: column;
        padding: 20px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }
    
    .nav-actions.active {
        display: flex;
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 20px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
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
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .nav-actions {
            display: none;
        }
    }
`;
document.head.appendChild(style);