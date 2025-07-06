// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on links
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
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Pizza size selector
    document.querySelectorAll('.size').forEach(size => {
        size.addEventListener('click', function() {
            // Remove active class from siblings
            this.parentNode.querySelectorAll('.size').forEach(s => s.classList.remove('active'));
            // Add active class to clicked size
            this.classList.add('active');
            
            // Update price based on size (optional)
            const priceElement = this.closest('.pizza-card').querySelector('.price');
            const basePrice = parseFloat(priceElement.textContent.replace('$', ''));
            const sizeMultiplier = {
                '12"': 0.7,
                '16"': 1.0,
                '20"': 1.4
            };
            
            const newPrice = (basePrice * (sizeMultiplier[this.textContent] || 1)).toFixed(2);
            priceElement.textContent = '$' + newPrice;
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.pizza-card, .step, .info-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Pizza rotation pause on hover
    const mainPizza = document.querySelector('.main-pizza');
    if (mainPizza) {
        mainPizza.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        mainPizza.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }

    // Oven fire animation intensity on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const fireAnimation = document.querySelector('.fire-animation');
        
        if (fireAnimation) {
            const intensity = Math.min(1, scrolled / 1000);
            fireAnimation.style.opacity = 0.7 + (intensity * 0.3);
        }
    });

    // Temperature badge animation
    document.querySelectorAll('.temperature').forEach(temp => {
        setInterval(() => {
            temp.style.transform = 'scale(1.1)';
            setTimeout(() => {
                temp.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    });

    // Flour dust animation trigger
    const flourDust = document.querySelector('.flour-dust');
    if (flourDust) {
        setInterval(() => {
            flourDust.style.animationDuration = (Math.random() * 2 + 3) + 's';
        }, 5000);
    }

    // Process step hover effects
    document.querySelectorAll('.step').forEach(step => {
        step.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.step-icon');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        step.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.step-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Badge hover effects
    document.querySelectorAll('.badge').forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(244, 162, 97, 0.4)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});

// Contact form handling (if needed)
function handleContactForm(event) {
    event.preventDefault();
    // Add form handling logic here
    alert('Thanks for your message! We\'ll contact you about your pizza order soon.');
}

// Pizza builder function (for future enhancement)
function buildCustomPizza() {
    // Placeholder for custom pizza builder functionality
    console.log('Custom pizza builder coming soon!');
}