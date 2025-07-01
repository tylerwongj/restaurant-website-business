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

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your interest! We will contact you soon to schedule your free trial.');
            this.reset();
        });
    }

    const membershipButtons = document.querySelectorAll('.membership-card button');
    membershipButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planName = this.closest('.membership-card').querySelector('h3').textContent;
            alert(`Thank you for choosing the ${planName} plan! We'll contact you to complete your membership.`);
        });
    });

    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach(card => {
        card.addEventListener('click', function() {
            const programName = this.querySelector('h3').textContent;
            alert(`Learn more about our ${programName} program! Contact us for details.`);
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

    const classSlots = document.querySelectorAll('.class-slot');
    classSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            const className = this.querySelector('.class-name').textContent;
            const time = this.querySelector('.time').textContent;
            const instructor = this.querySelector('.instructor').textContent;
            alert(`${className} at ${time} with ${instructor}. Contact us to book your spot!`);
        });
    });
});