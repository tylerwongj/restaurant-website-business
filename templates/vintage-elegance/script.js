document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 90;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect with elegant fade
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(250, 248, 245, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(44, 24, 16, 0.1)';
        } else {
            navbar.style.background = 'rgba(250, 248, 245, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Form validation and submission with elegant styling
    const form = document.querySelector('.reservation-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Elegant validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#c62828';
                    field.style.boxShadow = '0 0 0 3px rgba(198, 40, 40, 0.1)';
                } else {
                    field.style.borderColor = '#e8ddd4';
                    field.style.boxShadow = 'none';
                }
            });
            
            if (isValid) {
                // Elegant form submission feedback
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending Request...';
                submitBtn.disabled = true;
                submitBtn.style.background = '#a89485';
                
                setTimeout(() => {
                    // Create elegant success message
                    const successMsg = document.createElement('div');
                    successMsg.innerHTML = `
                        <div style="
                            background: white;
                            border: 2px solid #d4af37;
                            border-radius: 8px;
                            padding: 30px;
                            text-align: center;
                            box-shadow: 0 15px 40px rgba(44, 24, 16, 0.2);
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 10000;
                            max-width: 400px;
                        ">
                            <h3 style="color: #8b5a3c; font-family: 'Playfair Display', serif; margin-bottom: 15px;">Reservation Request Received</h3>
                            <p style="color: #6d5a47; margin-bottom: 20px;">Thank you for your reservation request. We will contact you within 24 hours to confirm your booking.</p>
                            <button onclick="this.parentElement.parentElement.remove()" style="
                                background: #d4af37;
                                color: #2c1810;
                                border: none;
                                padding: 12px 24px;
                                border-radius: 8px;
                                font-weight: 600;
                                cursor: pointer;
                            ">Close</button>
                        </div>
                    `;
                    document.body.appendChild(successMsg);
                    
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);
            } else {
                // Elegant error message
                const errorMsg = document.createElement('div');
                errorMsg.innerHTML = `
                    <div style="
                        background: #c62828;
                        color: white;
                        padding: 15px 25px;
                        border-radius: 8px;
                        position: fixed;
                        top: 120px;
                        right: 20px;
                        z-index: 10000;
                        box-shadow: 0 8px 30px rgba(198, 40, 40, 0.3);
                    ">
                        Please fill in all required fields
                    </div>
                `;
                document.body.appendChild(errorMsg);
                setTimeout(() => errorMsg.remove(), 3000);
            }
        });
    }
    
    // Intersection Observer for elegant animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.menu-showcase-item, .contact-card, .stat');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Parallax effect for hero section
    const heroBackground = document.querySelector('.hero-background img');
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.3;
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(1.1)`;
        });
    }
    
    // Elegant hover effects for menu showcase
    const menuItems = document.querySelectorAll('.menu-showcase-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Phone number formatting with elegant styling
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{1,3})/, '($1) $2');
            }
            e.target.value = value;
        });
    });
    
    // Date input minimum date (today)
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Elegant loading states for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });
    
    // Smooth reveal animations for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'all 1s cubic-bezier(0.25, 0.8, 0.25, 1)';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 200);
            }
        });
    }, {
        threshold: 0.05
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Elegant cursor effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.letterSpacing = '1px';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.letterSpacing = '0.5px';
        });
    });
    
    // Theme switcher (optional advanced feature)
    const createThemeSwitcher = () => {
        const themes = ['theme-classic', 'theme-royal', 'theme-emerald', 'theme-crimson'];
        let currentTheme = 0;
        
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 't') {
                e.preventDefault();
                currentTheme = (currentTheme + 1) % themes.length;
                document.body.className = themes[currentTheme];
                localStorage.setItem('vintage-theme', themes[currentTheme]);
            }
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('vintage-theme');
        if (savedTheme && themes.includes(savedTheme)) {
            document.body.className = savedTheme;
        }
    };
    
    createThemeSwitcher();
    
    // Elegant scroll progress indicator
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #8b5a3c, #d4af37);
            z-index: 10001;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    };
    
    createScrollProgress();
});