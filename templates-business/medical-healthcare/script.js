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

    const appointmentForm = document.querySelector('.appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your appointment request! We will contact you within 24 hours to confirm your appointment.');
            this.reset();
        });
    }

    const serviceButtons = document.querySelectorAll('.service-card button');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.closest('.service-card').querySelector('h3').textContent;
            alert(`Learn more about our ${serviceName} service. Please contact us at the number provided for detailed information.`);
        });
    });

    const doctorCards = document.querySelectorAll('.doctor-card');
    doctorCards.forEach(card => {
        card.addEventListener('click', function() {
            const doctorName = this.querySelector('h3').textContent;
            const specialty = this.querySelector('.specialty').textContent;
            alert(`Schedule an appointment with ${doctorName}, ${specialty}. Please call our office or use the appointment form.`);
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

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }

    const insuranceItems = document.querySelectorAll('.insurance-item');
    insuranceItems.forEach(item => {
        item.addEventListener('click', function() {
            const insuranceName = this.textContent;
            alert(`${insuranceName} is accepted. Please bring your insurance card to your appointment.`);
        });
    });
});