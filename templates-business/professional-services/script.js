document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your consultation request! We will contact you within 24 hours to schedule your appointment.');
            contactForm.reset();
        });
    }

    const smoothScroll = document.querySelectorAll('a[href^="#"]');
    smoothScroll.forEach(link => {
        link.addEventListener('click', function(e) {
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

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent;
            const contactSection = document.querySelector('#contact');
            const serviceSelect = document.querySelector('.contact-form select');
            
            if (serviceSelect && serviceName) {
                const options = serviceSelect.querySelectorAll('option');
                options.forEach(option => {
                    if (option.textContent.toLowerCase().includes(serviceName.toLowerCase()) || 
                        serviceName.toLowerCase().includes(option.textContent.toLowerCase())) {
                        option.selected = true;
                    }
                });
            }
            
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    const stats = document.querySelectorAll('.stat h3');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const finalValue = parseInt(stat.textContent);
                animateCounter(stat, finalValue);
                observer.unobserve(stat);
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        observer.observe(stat);
    });

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '+');
        }, 30);
    }
});