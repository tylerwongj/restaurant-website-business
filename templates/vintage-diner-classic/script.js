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

    // Vintage diner animations
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
    document.querySelectorAll('.menu-item-classic, .feature-badge, .polaroid').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Neon sign flicker effect
    const neonSign = document.querySelector('.neon-sign');
    if (neonSign) {
        setInterval(() => {
            if (Math.random() > 0.9) {
                neonSign.style.opacity = '0.7';
                setTimeout(() => {
                    neonSign.style.opacity = '1';
                }, 100);
            }
        }, 2000);
    }

    // Polaroid hover effects
    document.querySelectorAll('.polaroid').forEach(polaroid => {
        polaroid.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(0deg) scale(1.05)';
        });
        
        polaroid.addEventListener('mouseleave', function() {
            const isEven = Array.from(this.parentNode.children).indexOf(this) % 2 === 1;
            this.style.transform = isEven ? 'rotate(2deg)' : 'rotate(-2deg)';
        });
    });
});

// Contact form handling (if needed)
function handleContactForm(event) {
    event.preventDefault();
    // Add form handling logic here
    alert('Thanks for your message! We\'ll get back to you soon.');
}