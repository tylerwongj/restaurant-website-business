// Eco Farm Bistro - Interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
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
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Farm gallery thumbnail interactions
    const farmThumbnails = document.querySelectorAll('.thumb-item');
    const mainGalleryImage = document.querySelector('.gallery-main img');
    
    if (farmThumbnails.length > 0 && mainGalleryImage) {
        const galleryImages = [
            '{{INTERIOR_IMAGE_1}}',
            '{{INTERIOR_IMAGE_2}}',
            '{{INTERIOR_IMAGE_3}}'
        ];
        
        farmThumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                if (galleryImages[index]) {
                    mainGalleryImage.src = `images/${galleryImages[index]}`;
                    farmThumbnails.forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                }
            });
        });
    }

    // Contact form handling
    const contactForm = document.querySelector('.reservation-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const date = this.querySelector('input[type="date"]').value;
            const partySize = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !date || !partySize) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Date validation (must be future date)
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate <= today) {
                alert('Please select a future date.');
                return;
            }
            
            // Success message (in real implementation, this would submit to server)
            alert('Thank you for your reservation request! We will contact you within 24 hours to confirm your booking.');
            this.reset();
        });
    }

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            alert('Thank you for subscribing to our weekly harvest newsletter!');
            emailInput.value = '';
        });
    }

    // Animate statistics on scroll
    const statElements = document.querySelectorAll('.stat-value, .metric-number, .impact-metric');
    
    const animateStats = () => {
        statElements.forEach(stat => {
            const rect = stat.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !stat.classList.contains('animated')) {
                stat.classList.add('animated');
                animateNumber(stat);
            }
        });
    };
    
    const animateNumber = (element) => {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const isNegative = target.includes('-');
        const numericValue = parseInt(target.replace(/[^\d]/g, ''));
        
        if (isNaN(numericValue)) return;
        
        let current = 0;
        const increment = numericValue / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isNegative) displayValue = '-' + displayValue;
            if (isPercentage) displayValue += '%';
            if (target.toLowerCase().includes('zero')) displayValue = 'Zero';
            
            element.textContent = displayValue;
        }, 50);
    };

    // Run stats animation on scroll
    window.addEventListener('scroll', animateStats);
    animateStats(); // Run once on load

    // Parallax effect for hero background
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < hero.offsetHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Image lazy loading for better performance
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // Add hover effects to dish cards
    const dishCards = document.querySelectorAll('.dish-card');
    dishCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add seasonal badge animation
    const seasonBadge = document.querySelector('.season-badge');
    if (seasonBadge) {
        setInterval(() => {
            seasonBadge.style.transform = 'scale(1.05)';
            setTimeout(() => {
                seasonBadge.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }

    // Theme color customization (for admin use)
    const createColorCustomizer = () => {
        if (window.location.search.includes('admin=true')) {
            const colorPanel = document.createElement('div');
            colorPanel.innerHTML = `
                <div style="position: fixed; top: 100px; right: 20px; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); z-index: 9999;">
                    <h4>Color Customizer</h4>
                    <div style="margin: 10px 0;">
                        <label>Primary Green:</label>
                        <input type="color" value="#2d5016" data-var="--primary-green">
                    </div>
                    <div style="margin: 10px 0;">
                        <label>Secondary Green:</label>
                        <input type="color" value="#4a7c59" data-var="--secondary-green">
                    </div>
                    <div style="margin: 10px 0;">
                        <label>Accent Gold:</label>
                        <input type="color" value="#d4af37" data-var="--accent-gold">
                    </div>
                    <button onclick="exportColors()" style="margin-top: 10px; padding: 8px 16px; background: #2d5016; color: white; border: none; border-radius: 4px;">Export CSS</button>
                </div>
            `;
            document.body.appendChild(colorPanel);
            
            const colorInputs = colorPanel.querySelectorAll('input[type="color"]');
            colorInputs.forEach(input => {
                input.addEventListener('change', function() {
                    document.documentElement.style.setProperty(this.dataset.var, this.value);
                });
            });
            
            window.exportColors = () => {
                const colors = {};
                colorInputs.forEach(input => {
                    colors[input.dataset.var] = input.value;
                });
                console.log('Updated CSS Variables:', colors);
                alert('Check console for CSS variables to copy');
            };
        }
    };
    
    createColorCustomizer();
});