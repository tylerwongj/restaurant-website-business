// Age Verification Modal
document.addEventListener('DOMContentLoaded', function() {
    const ageModal = document.getElementById('age-modal');
    const body = document.body;
    
    // Check if user has already verified age
    if (localStorage.getItem('ageVerified') === 'true') {
        ageModal.classList.add('hidden');
    } else {
        // Prevent scrolling when modal is open
        body.style.overflow = 'hidden';
    }
});

function confirmAge() {
    const ageModal = document.getElementById('age-modal');
    const body = document.body;
    
    // Store age verification
    localStorage.setItem('ageVerified', 'true');
    
    // Hide modal and restore scrolling
    ageModal.classList.add('hidden');
    body.style.overflow = 'auto';
}

function rejectAge() {
    // Redirect to another site or show alternative message
    window.location.href = 'https://www.google.com';
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Here you would normally send the data to your server
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// Scroll animations for beer cards
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScrollAnimations() {
    const beerCards = document.querySelectorAll('.beer-card');
    const eventCards = document.querySelectorAll('.event-card');
    
    beerCards.forEach(card => {
        if (isElementInViewport(card)) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
    
    eventCards.forEach(card => {
        if (isElementInViewport(card)) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const beerCards = document.querySelectorAll('.beer-card');
    const eventCards = document.querySelectorAll('.event-card');
    
    // Set initial state
    beerCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    eventCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Check on page load
    handleScrollAnimations();
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(13, 13, 13, 0.95)';
    } else {
        navbar.style.backgroundColor = 'var(--background-darker)';
    }
});

// Cookie consent handling (if needed)
function acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
    const cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner) {
        cookieBanner.style.display = 'none';
    }
}

// Add to cart functionality for beer merchandise (if applicable)
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('breweryCart')) || [];
    cart.push(item);
    localStorage.setItem('breweryCart', JSON.stringify(cart));
    
    // Show confirmation
    alert(`${item.name} added to cart!`);
}

// Newsletter signup
function subscribeNewsletter(email) {
    if (!email) {
        alert('Please enter your email address.');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Here you would send the email to your server
    alert('Thank you for subscribing to our newsletter!');
}

// Event RSVP functionality
function rsvpEvent(eventId, eventName) {
    const userEmail = prompt('Please enter your email to RSVP:');
    
    if (!userEmail) {
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Store RSVP locally (in a real app, this would go to a server)
    let rsvps = JSON.parse(localStorage.getItem('eventRSVPs')) || [];
    rsvps.push({
        eventId: eventId,
        eventName: eventName,
        email: userEmail,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('eventRSVPs', JSON.stringify(rsvps));
    
    alert(`Thanks for your RSVP to ${eventName}! We'll send you more details soon.`);
}

// Brewery tour booking
function bookTour() {
    const tourDate = prompt('What date would you like to book a tour? (MM/DD/YYYY)');
    const tourTime = prompt('What time would you prefer? (e.g., 2:00 PM)');
    const groupSize = prompt('How many people in your group?');
    
    if (!tourDate || !tourTime || !groupSize) {
        alert('Please provide all required information.');
        return;
    }
    
    // Store tour booking locally
    let tourBookings = JSON.parse(localStorage.getItem('tourBookings')) || [];
    tourBookings.push({
        date: tourDate,
        time: tourTime,
        groupSize: parseInt(groupSize),
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('tourBookings', JSON.stringify(tourBookings));
    
    alert('Tour booking request submitted! We will contact you to confirm details.');
}

// Hours display helper
function formatHours(hours) {
    if (hours === 'Closed') {
        return 'Closed';
    }
    
    // Convert 24-hour format to 12-hour format if needed
    return hours;
}

// Social media sharing
function shareOnSocial(platform, url, text) {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);
    
    let shareUrl = '';
    
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
            break;
        case 'instagram':
            alert('Please share on Instagram through the mobile app.');
            return;
        default:
            return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for any additional interactive elements
    const tourButton = document.querySelector('.book-tour-btn');
    if (tourButton) {
        tourButton.addEventListener('click', bookTour);
    }
    
    // Add RSVP buttons to event cards
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach((card, index) => {
        const rsvpButton = document.createElement('button');
        rsvpButton.className = 'btn btn-outline btn-small';
        rsvpButton.textContent = 'RSVP';
        rsvpButton.style.marginTop = '10px';
        rsvpButton.addEventListener('click', () => {
            const eventName = card.querySelector('h3').textContent;
            rsvpEvent(index, eventName);
        });
        card.querySelector('.event-info').appendChild(rsvpButton);
    });
});