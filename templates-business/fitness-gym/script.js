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
            alert('Thank you for your interest! We will contact you soon to get you started.');
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

    const membershipCards = document.querySelectorAll('.membership-card');
    membershipCards.forEach(card => {
        card.addEventListener('click', function() {
            const planName = this.querySelector('h3').textContent;
            const planPrice = this.querySelector('.amount').textContent;
            
            const contactSection = document.querySelector('#contact');
            const membershipSelect = document.querySelector('select[required]');
            
            if (membershipSelect) {
                membershipSelect.value = planName.toLowerCase();
            }
            
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
});