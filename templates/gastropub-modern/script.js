// Gastropub Modern Restaurant Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const date = this.querySelector('input[type="date"]').value;
            const time = this.querySelector('input[type="time"]').value;
            const partySize = this.querySelector('select').value;
            
            if (!name || !email || !phone || !date || !time || !partySize) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Date validation - ensure it's not in the past
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                alert('Please select a future date.');
                return;
            }
            
            // Here you would typically send the form data to your server
            alert('Thank you for your reservation request! We will contact you soon to confirm your table.');
            this.reset();
        });
    }
    
    // Enhanced navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(44, 62, 80, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    // Intersection Observer for fade-in animations
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
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.beer-feature, .menu-item, .event-card, .about-text, .contact-info');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Beer feature hover effects
    const beerFeatures = document.querySelectorAll('.beer-feature');
    beerFeatures.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
            this.style.boxShadow = '0 20px 50px rgba(44, 62, 80, 0.2)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 20px rgba(44, 62, 80, 0.1)';
        });
    });
    
    // Menu item enhanced hover effects
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(44, 62, 80, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Beer list item hover effects
    const beerItems = document.querySelectorAll('.beer-item');
    beerItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.2)';
            this.style.transform = 'translateY(-3px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.1)';
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Event card hover effects
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.03)';
            this.style.boxShadow = '0 15px 40px rgba(44, 62, 80, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            if (scrolled < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${parallax}px)`;
            }
        });
    }
    
    // Dynamic beer tap rotation simulation
    const beerList = document.querySelector('.beer-list');
    if (beerList) {
        const beerTypes = [
            { name: 'Local IPA', desc: 'Hoppy, citrusy, 6.5% ABV', price: '$7' },
            { name: 'Craft Stout', desc: 'Rich, creamy, 5.2% ABV', price: '$8' },
            { name: 'Wheat Ale', desc: 'Light, refreshing, 4.8% ABV', price: '$6' },
            { name: 'Seasonal Porter', desc: 'Smooth, malty, 5.8% ABV', price: '$7' },
            { name: 'Belgian Tripel', desc: 'Complex, spicy, 8.2% ABV', price: '$9' },
            { name: 'Sour Ale', desc: 'Tart, fruity, 4.5% ABV', price: '$8' },
            { name: 'Double IPA', desc: 'Bold, hoppy, 7.8% ABV', price: '$9' },
            { name: 'Brown Ale', desc: 'Nutty, caramel, 5.5% ABV', price: '$7' }
        ];
        
        // Simulate rotating tap list (for demo purposes)
        setInterval(function() {
            const beerItems = document.querySelectorAll('.beer-item');
            if (beerItems.length > 0 && Math.random() < 0.1) { // 10% chance every interval
                const randomItem = beerItems[Math.floor(Math.random() * beerItems.length)];
                const randomBeer = beerTypes[Math.floor(Math.random() * beerTypes.length)];
                
                // Smooth transition
                randomItem.style.opacity = '0.5';
                setTimeout(() => {
                    randomItem.querySelector('.beer-info h4').textContent = randomBeer.name;
                    randomItem.querySelector('.beer-info p').textContent = randomBeer.desc;
                    randomItem.querySelector('.beer-price').textContent = randomBeer.price;
                    randomItem.style.opacity = '1';
                }, 500);
            }
        }, 30000); // Check every 30 seconds
    }
    
    // Image lazy loading with fade effect
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = function() {
                    this.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Add click-to-call functionality
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // On desktop, show a confirmation dialog
            if (window.innerWidth > 768) {
                const phoneNumber = this.getAttribute('href').replace('tel:', '');
                if (!confirm(`Call ${phoneNumber}?`)) {
                    e.preventDefault();
                }
            }
        });
    });
    
    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});