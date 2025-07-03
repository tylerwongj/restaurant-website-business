// Loyalty/Rewards Template JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 125; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 2px 25px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
        }
    });

    // Rewards signup form handling
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const requiredFields = signupForm.querySelectorAll('input[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc143c';
                } else {
                    field.style.borderColor = '#e0e0e0';
                }
            });
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.innerHTML = `
                    <div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin-top: 20px; text-align: center; border: 1px solid #c3e6cb;">
                        🎉 Welcome to our rewards program! You'll receive a confirmation email shortly with your welcome bonus!
                    </div>
                `;
                signupForm.appendChild(successMessage);
                signupForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // Contact/Reservation form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const requiredFields = contactForm.querySelectorAll('input[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc143c';
                } else {
                    field.style.borderColor = '#e0e0e0';
                }
            });
            
            if (isValid) {
                alert('Thank you for your reservation request! We will contact you within 24 hours to confirm your booking.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // Rewards card animation on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.rewards-card, .celebration-item, .menu-item, .social-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.95)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Counter animation for rewards points
    const counterElements = document.querySelectorAll('.balance-amount');
    counterElements.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + ' Points';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + ' Points';
            }
        };
        
        // Start animation when card is visible
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(updateCounter, 500); // Delay to let card animation finish
                    cardObserver.unobserve(entry.target);
                }
            });
        });
        
        const rewardsCard = counter.closest('.rewards-card');
        if (rewardsCard) {
            cardObserver.observe(rewardsCard);
        }
    });

    // Social media link tracking (optional analytics)
    const socialLinks = document.querySelectorAll('.social-link, .social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.textContent.toLowerCase().trim();
            console.log(`Social media click: ${platform}`);
            // Add analytics tracking here if needed
        });
    });

    // Rewards banner close functionality
    const rewardsBanner = document.querySelector('.rewards-banner');
    if (rewardsBanner) {
        // Add close button to banner
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '×';
        closeButton.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0 10px;
            margin-left: 10px;
        `;
        
        closeButton.addEventListener('click', function() {
            rewardsBanner.style.display = 'none';
            // Adjust navbar position
            const navbar = document.querySelector('.navbar');
            navbar.style.top = '0';
            
            // Adjust hero margin
            const hero = document.querySelector('.hero');
            hero.style.marginTop = '80px';
        });
        
        rewardsBanner.querySelector('.banner-content').appendChild(closeButton);
    }

    // Enhanced form field validation
    const allInputs = document.querySelectorAll('input, select, textarea');
    allInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#dc143c';
                this.style.boxShadow = '0 0 5px rgba(220, 20, 60, 0.3)';
            } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
                this.style.borderColor = '#dc143c';
                this.style.boxShadow = '0 0 5px rgba(220, 20, 60, 0.3)';
            } else {
                this.style.borderColor = '#e0e0e0';
                this.style.boxShadow = 'none';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#dc143c';
            this.style.boxShadow = '0 0 8px rgba(220, 20, 60, 0.2)';
        });
    });

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Add loading states to buttons
    const submitButtons = document.querySelectorAll('button[type="submit"]');
    submitButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'Processing...';
            this.disabled = true;
            
            // Re-enable after form processing
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        });
    });
});

// Mobile menu styles (added via JavaScript for better control)
const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 125px;
            flex-direction: column;
            background-color: rgba(255, 255, 255, 0.98);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.15);
            backdrop-filter: blur(10px);
            padding: 30px 0;
        }

        .nav-menu.active {
            left: 0;
        }

        .nav-menu li {
            margin: 20px 0;
        }

        .nav-menu a {
            font-size: 1.2rem;
            padding: 10px;
            display: block;
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }

        .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        .nav-cta {
            display: none;
        }
        
        .banner-content {
            padding: 0 20px;
        }
        
        .banner-text {
            font-size: 0.9rem;
        }
    }
    
    @media (max-width: 480px) {
        .banner-content {
            flex-direction: column;
            gap: 10px;
        }
        
        .banner-text {
            font-size: 0.8rem;
        }
        
        .banner-cta {
            padding: 6px 12px;
            font-size: 0.8rem;
        }
    }
`;
document.head.appendChild(mobileMenuStyle);