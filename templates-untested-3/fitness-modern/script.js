// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
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

// Class Schedule Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const classCards = document.querySelectorAll('.class-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterDay = button.getAttribute('data-day');
        
        classCards.forEach(card => {
            if (filterDay === 'all' || card.getAttribute('data-day') === filterDay) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Initialize class cards with fade-in animation
classCards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const interest = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !interest || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show success message (replace with actual form submission)
        alert('Thank you for your interest! We will contact you soon to schedule your free consultation.');
        this.reset();
        
        // TODO: Replace with actual form submission to your backend
        console.log('Form submitted:', { name, email, phone, interest, message });
    });
}

// Membership Plan Selection
document.querySelectorAll('.membership-card .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const planName = this.closest('.membership-card').querySelector('h3').textContent;
        const planPrice = this.closest('.membership-card').querySelector('.amount').textContent;
        
        // TODO: Replace with actual membership signup process
        alert(`You selected the ${planName} plan at ${planPrice}/month. Contact us to complete your membership signup!`);
        console.log('Plan selected:', { planName, planPrice });
    });
});

// Trainer Card Interactions
document.querySelectorAll('.trainer-card').forEach(card => {
    card.addEventListener('click', function() {
        const trainerName = this.querySelector('h3').textContent;
        const specialty = this.querySelector('.specialty').textContent;
        
        // TODO: Replace with actual trainer profile or booking system
        alert(`Learn more about ${trainerName} - ${specialty}. Contact us to book a session!`);
        console.log('Trainer clicked:', { trainerName, specialty });
    });
});

// Class Card Booking
document.querySelectorAll('.class-card').forEach(card => {
    card.addEventListener('click', function() {
        const className = this.querySelector('h3').textContent;
        const instructor = this.querySelector('.instructor').textContent;
        const time = this.querySelector('.class-time').textContent;
        const day = this.querySelector('.class-day').textContent;
        
        // TODO: Replace with actual class booking system
        alert(`Book your spot in ${className} ${instructor} on ${day} at ${time}!`);
        console.log('Class clicked:', { className, instructor, time, day });
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

// Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.class-card, .trainer-card, .membership-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Statistics Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '+';
    }, 20);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElements = entry.target.querySelectorAll('.stat h3');
            statElements.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number) {
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Hero section parallax effect (subtle)
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        const scrolled = window.pageYOffset;
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Class schedule time highlighting
function highlightCurrentTime() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinutes;
    
    classCards.forEach(card => {
        const timeText = card.querySelector('.class-time').textContent;
        const classTime = parseTime(timeText);
        
        if (Math.abs(currentTime - classTime) <= 30) { // Within 30 minutes
            card.style.borderLeft = '4px solid var(--primary-color)';
            card.style.backgroundColor = '#fef2f2';
        }
    });
}

function parseTime(timeString) {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let hour24 = hours;
    
    if (period === 'PM' && hours !== 12) hour24 += 12;
    if (period === 'AM' && hours === 12) hour24 = 0;
    
    return hour24 * 60 + minutes;
}

// Run time highlighting on page load
highlightCurrentTime();
// Update every minute
setInterval(highlightCurrentTime, 60000);