// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Menu tab functionality for menu.html
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuCategories = document.querySelectorAll('.menu-category');

    if (tabButtons.length > 0 && menuCategories.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and categories
                tabButtons.forEach(btn => btn.classList.remove('active'));
                menuCategories.forEach(category => category.classList.remove('active'));
                
                // Add active class to clicked button and corresponding category
                this.classList.add('active');
                const targetCategory = document.getElementById(targetTab);
                if (targetCategory) {
                    targetCategory.classList.add('active');
                }
            });
        });
    }

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Show success message (in a real implementation, you'd send to a server)
            alert('¡Gracias! Your message has been sent. We\'ll get back to you soon!');
            this.reset();
        });
    }

    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(button => {
        if (button.getAttribute('href') && button.getAttribute('href').startsWith('tel:')) {
            button.addEventListener('click', function() {
                const originalText = this.textContent;
                this.textContent = 'Calling...';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        }
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navbar.style.background = 'linear-gradient(135deg, rgba(231, 76, 60, 0.95), rgba(243, 156, 18, 0.95))';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
                navbar.style.backdropFilter = 'none';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // Animate menu items on scroll (for main page)
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

    // Observe menu items and other sections
    document.querySelectorAll('.menu-item, .special-item, .feature').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Add hover effects to menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Price highlight animation
    document.querySelectorAll('.price-badge, .item-price').forEach(price => {
        price.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        price.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Add fiesta mode toggle (fun easter egg)
    let fiestaMode = false;
    let clickCount = 0;
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('logo') || e.target.closest('.logo')) {
            clickCount++;
            if (clickCount >= 5 && !fiestaMode) {
                activateFiestaMode();
                clickCount = 0;
            }
        } else {
            clickCount = 0;
        }
    });

    function activateFiestaMode() {
        fiestaMode = true;
        document.body.classList.add('fiesta-mode');
        
        // Add dancing animation to elements
        const style = document.createElement('style');
        style.textContent = `
            .fiesta-mode .menu-item {
                animation: dance 2s infinite alternate;
            }
            .fiesta-mode .price-badge {
                animation: spin 1s infinite linear;
            }
            @keyframes dance {
                0% { transform: rotate(-1deg); }
                100% { transform: rotate(1deg); }
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);

        // Show fiesta message
        const fiestaMessage = document.createElement('div');
        fiestaMessage.textContent = '¡FIESTA MODE ACTIVATED! 🎉🌮🎊';
        fiestaMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #e74c3c, #f39c12);
            color: white;
            padding: 20px 40px;
            border-radius: 20px;
            font-size: 24px;
            font-weight: bold;
            z-index: 10000;
            animation: pulse 1s ease-in-out 3;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(fiestaMessage);
        
        setTimeout(() => {
            document.body.removeChild(fiestaMessage);
            fiestaMode = false;
            document.body.classList.remove('fiesta-mode');
        }, 6000);
    }

    // Add keyboard navigation for menu tabs
    document.addEventListener('keydown', function(e) {
        if (e.target.classList.contains('tab-btn')) {
            const tabs = Array.from(document.querySelectorAll('.tab-btn'));
            const currentIndex = tabs.indexOf(e.target);
            
            let nextIndex;
            if (e.key === 'ArrowRight') {
                nextIndex = (currentIndex + 1) % tabs.length;
            } else if (e.key === 'ArrowLeft') {
                nextIndex = currentIndex - 1 < 0 ? tabs.length - 1 : currentIndex - 1;
            }
            
            if (nextIndex !== undefined) {
                tabs[nextIndex].focus();
                tabs[nextIndex].click();
            }
        }
    });
});