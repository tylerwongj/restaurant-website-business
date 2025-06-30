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

    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your booking request! We will contact you within 2 hours to confirm your appointment.');
            this.reset();
        });
    }

    const serviceButtons = document.querySelectorAll('.service-card button');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.closest('.service-card').querySelector('h3').textContent;
            alert(`Book your ${serviceName} experience! Please use our booking form or call us directly.`);
            document.querySelector('#booking').scrollIntoView({ behavior: 'smooth' });
        });
    });

    const packageButtons = document.querySelectorAll('.package-card button');
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.closest('.package-card').querySelector('h3').textContent;
            alert(`Book the ${packageName} package! Please use our booking form or call us directly.`);
            document.querySelector('#booking').scrollIntoView({ behavior: 'smooth' });
        });
    });

    const treatmentItems = document.querySelectorAll('.treatment-item');
    treatmentItems.forEach(item => {
        item.addEventListener('click', function() {
            const treatmentName = this.querySelector('h3').textContent;
            const price = this.querySelector('.price').textContent;
            alert(`${treatmentName} - ${price}. Book this specialty treatment using our booking form!`);
            document.querySelector('#booking').scrollIntoView({ behavior: 'smooth' });
        });
    });

    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('click', function() {
            const name = this.querySelector('h3').textContent;
            const specialty = this.querySelector('.specialty').textContent;
            alert(`Book with ${name}, specializing in ${specialty}. You can request this therapist in our booking form.`);
        });
    });

    const giftCardButton = document.querySelector('.gift-cards button');
    if (giftCardButton) {
        giftCardButton.addEventListener('click', function() {
            alert('Gift cards available in various amounts! Call us or visit our spa to purchase.');
        });
    }

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

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }

    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            const serviceName = this.querySelector('.name').textContent;
            const price = this.querySelector('.price').textContent;
            alert(`${serviceName} - ${price}. Book this service using our booking form!`);
            document.querySelector('#booking').scrollIntoView({ behavior: 'smooth' });
        });
    });

    const amenityItems = document.querySelectorAll('.amenity-item');
    amenityItems.forEach(item => {
        item.addEventListener('click', function() {
            const amenityName = this.querySelector('h3').textContent;
            alert(`Enjoy our ${amenityName} during your visit! Book your spa experience to access all amenities.`);
        });
    });
});