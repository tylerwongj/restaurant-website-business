document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

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

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Portfolio item clicks
    const portfolioItemsClick = document.querySelectorAll('.portfolio-item');
    portfolioItemsClick.forEach(item => {
        item.addEventListener('click', function() {
            const projectName = this.querySelector('h3').textContent;
            const category = this.querySelector('p').textContent;
            alert(`View full ${projectName} gallery - ${category}. Contact me for the complete project showcase!`);
        });
    });

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your inquiry! I will respond within 24 hours with pricing and availability.');
            this.reset();
        });
    }

    const serviceButtons = document.querySelectorAll('.service-card button');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.closest('.service-card').querySelector('h3').textContent;
            alert(`Learn more about ${serviceName}. Contact me for detailed information and custom quotes!`);
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    });

    const packageButtons = document.querySelectorAll('.package-card button');
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.closest('.package-card').querySelector('h3').textContent;
            alert(`Choose the ${packageName}! Contact me to book this package or discuss customizations.`);
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    });

    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectName = this.closest('.portfolio-overlay').querySelector('h3').textContent;
            alert(`Opening ${projectName} gallery... Contact me to see the full collection!`);
        });
    });

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'var(--background-color)';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Set minimum date for booking to tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }

    // Add hover effects to testimonials
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach(testimonial => {
        testimonial.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        testimonial.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click effects to process steps
    const processSteps = document.querySelectorAll('.step');
    processSteps.forEach(step => {
        step.addEventListener('click', function() {
            const stepTitle = this.querySelector('h3').textContent;
            alert(`${stepTitle}: Contact me to learn more about this part of my photography process!`);
        });
    });

    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat .number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const finalValue = stat.textContent.replace('+', '');
                let currentValue = 0;
                const increment = finalValue / 50;
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        stat.textContent = finalValue + '+';
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(currentValue) + '+';
                    }
                }, 30);
                
                observer.unobserve(stat);
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        observer.observe(stat);
    });
});