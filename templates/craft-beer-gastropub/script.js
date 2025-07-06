// Craft Beer Gastropub Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
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
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(44, 24, 16, 0.98)';
            } else {
                navbar.style.background = 'rgba(44, 24, 16, 0.95)';
            }
        });
    }

    // Beer carousel functionality
    const beerList = document.querySelector('.beer-list');
    const prevBtn = document.querySelector('.beer-nav-btn.prev');
    const nextBtn = document.querySelector('.beer-nav-btn.next');
    
    if (beerList && prevBtn && nextBtn) {
        let currentIndex = 0;
        const beerCards = document.querySelectorAll('.beer-card');
        const cardsToShow = window.innerWidth > 768 ? 4 : window.innerWidth > 480 ? 2 : 1;
        const maxIndex = Math.max(0, beerCards.length - cardsToShow);

        function updateCarousel() {
            const translateX = -(currentIndex * (100 / cardsToShow));
            beerList.style.transform = `translateX(${translateX}%)`;
        }

        prevBtn.addEventListener('click', function() {
            currentIndex = Math.max(0, currentIndex - 1);
            updateCarousel();
        });

        nextBtn.addEventListener('click', function() {
            currentIndex = Math.min(maxIndex, currentIndex + 1);
            updateCarousel();
        });

        // Auto-rotate carousel
        setInterval(function() {
            currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
            updateCarousel();
        }, 5000);
    }

    // Newsletter form handling
    const newsletterForms = document.querySelectorAll('.newsletter-form, .footer-newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                showNotification('Thank you for subscribing! You\'ll receive updates about new beers and events.', 'success');
                this.reset();
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    });

    // Intersection Observer for animations
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
    const animateElements = document.querySelectorAll('.beer-card, .event-card, .value, .menu-item-preview, .stat');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Beer card hover effects
    const beerCards = document.querySelectorAll('.beer-card');
    beerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        });
    });

    // Event card interactions
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('click', function() {
            const eventName = this.querySelector('h3').textContent;
            const eventTime = this.querySelector('.event-time').textContent;
            showNotification(`Interested in ${eventName}? Call us at the restaurant for more details! Time: ${eventTime}`, 'info');
        });
    });

    // Food image lazy loading
    const foodImages = document.querySelectorAll('.food-image img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    foodImages.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const finalValue = stat.textContent;
                const isNumber = /^\d+$/.test(finalValue);
                
                if (isNumber) {
                    animateCounter(stat, 0, parseInt(finalValue), 2000);
                }
                statsObserver.unobserve(stat);
            }
        });
    });

    stats.forEach(stat => statsObserver.observe(stat));

    function animateCounter(element, start, end, duration) {
        const increment = (end - start) / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = end;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#d4af37'};
            color: ${type === 'success' || type === 'error' ? 'white' : '#2c1810'};
            border-radius: 8px;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            font-weight: 600;
            font-size: 0.9rem;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Beer type filtering (if implemented)
    const beerTypeFilters = document.querySelectorAll('.beer-type-filter');
    if (beerTypeFilters.length > 0) {
        beerTypeFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const filterType = this.dataset.type;
                const beerCards = document.querySelectorAll('.beer-card');
                
                // Remove active class from all filters
                beerTypeFilters.forEach(f => f.classList.remove('active'));
                this.classList.add('active');
                
                // Filter beer cards
                beerCards.forEach(card => {
                    const cardType = card.querySelector('.beer-type').textContent.toLowerCase();
                    if (filterType === 'all' || cardType === filterType.toLowerCase()) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease-out';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Beer recommendation system
    function recommendBeer() {
        const beers = [
            { name: "Hoppy Trail IPA", reason: "Perfect for hop lovers!" },
            { name: "Midnight Porter", reason: "Great with our burger!" },
            { name: "Golden Valley Lager", reason: "Refreshing and crisp!" },
            { name: "Sunset Wheat", reason: "Light and citrusy!" }
        ];
        
        const randomBeer = beers[Math.floor(Math.random() * beers.length)];
        return randomBeer;
    }

    // Add beer recommendation button
    const heroButtons = document.querySelector('.hero-buttons');
    if (heroButtons) {
        const recommendBtn = document.createElement('a');
        recommendBtn.href = '#';
        recommendBtn.className = 'btn btn-outline';
        recommendBtn.textContent = 'Surprise Me!';
        recommendBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const recommendation = recommendBeer();
            showNotification(`Try our ${recommendation.name}! ${recommendation.reason}`, 'info');
        });
        heroButtons.appendChild(recommendBtn);
    }

    // Add loading animation class
    document.body.classList.add('loaded');

    // Resize handler for responsive carousel
    window.addEventListener('resize', function() {
        // Update carousel display on resize
        const beerList = document.querySelector('.beer-list');
        if (beerList) {
            beerList.style.transform = 'translateX(0)';
        }
    });
});

// CSS for animations (added via JavaScript)
const animationStyles = `
    <style>
        .loaded {
            opacity: 1;
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
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
        
        body {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        /* Hamburger animation */
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        /* Beer carousel responsive grid */
        .beer-list {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
            transition: transform 0.3s ease;
        }
        
        @media (max-width: 768px) {
            .beer-list {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (max-width: 480px) {
            .beer-list {
                grid-template-columns: 1fr;
            }
        }
        
        /* Lazy loading images */
        .lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        /* Event card cursor */
        .event-card {
            cursor: pointer;
        }
        
        /* Smooth transitions */
        .beer-card,
        .event-card,
        .btn,
        .nav-menu a {
            transition: all 0.3s ease;
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', animationStyles);