// Age Verification
document.addEventListener('DOMContentLoaded', function() {
    const ageModal = document.getElementById('ageVerification');
    const ageConfirm = document.getElementById('ageConfirm');
    const ageDecline = document.getElementById('ageDecline');
    
    // Check if age verification was already completed
    if (localStorage.getItem('ageVerified') === 'true') {
        ageModal.style.display = 'none';
    }
    
    ageConfirm.addEventListener('click', function() {
        localStorage.setItem('ageVerified', 'true');
        ageModal.style.display = 'none';
    });
    
    ageDecline.addEventListener('click', function() {
        alert('You must be 21 or older to view this website.');
        window.location.href = 'https://www.google.com';
    });
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
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

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Beer Card Hover Effects
document.querySelectorAll('.beer-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Event Card Animations
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

document.querySelectorAll('.event-card, .beer-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Dynamic Current Time Display
function updateCurrentTime() {
    const now = new Date();
    const options = {
        timeZone: 'America/New_York', // Adjust based on brewery location
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };
    
    const timeString = now.toLocaleTimeString('en-US', options);
    const currentTimeElement = document.getElementById('currentTime');
    
    if (currentTimeElement) {
        currentTimeElement.textContent = `Current Time: ${timeString}`;
    }
}

// Update time every minute
setInterval(updateCurrentTime, 60000);
updateCurrentTime();

// Taproom Status (Open/Closed)
function updateTaproomStatus() {
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    
    // Default hours - can be customized per brewery
    const hours = {
        1: { open: 16, close: 22 }, // Monday
        2: { open: 16, close: 22 }, // Tuesday
        3: { open: 16, close: 22 }, // Wednesday
        4: { open: 16, close: 22 }, // Thursday
        5: { open: 16, close: 24 }, // Friday
        6: { open: 14, close: 24 }, // Saturday
        0: { open: 14, close: 21 }  // Sunday
    };
    
    const todayHours = hours[currentDay];
    const statusElement = document.getElementById('taproomStatus');
    
    if (statusElement && todayHours) {
        const isOpen = currentHour >= todayHours.open && currentHour < todayHours.close;
        statusElement.textContent = isOpen ? 'OPEN NOW' : 'CLOSED';
        statusElement.className = `taproom-status ${isOpen ? 'open' : 'closed'}`;
    }
}

updateTaproomStatus();

// Form Handling (if contact form exists)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const message = this.querySelector('textarea[name="message"]').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send the form data to your server
        alert('Thank you for your message! We\'ll get back to you soon.');
        this.reset();
    });
}

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Social Media Share Functions
function shareOnFacebook(url) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
}

function shareOnTwitter(url, text) {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
}

// Add click handlers for social sharing if elements exist
document.addEventListener('DOMContentLoaded', function() {
    const facebookShare = document.getElementById('facebookShare');
    const twitterShare = document.getElementById('twitterShare');
    
    if (facebookShare) {
        facebookShare.addEventListener('click', function(e) {
            e.preventDefault();
            shareOnFacebook(window.location.href);
        });
    }
    
    if (twitterShare) {
        twitterShare.addEventListener('click', function(e) {
            e.preventDefault();
            shareOnTwitter(window.location.href, 'Check out this awesome brewery!');
        });
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Beer ABV Color Coding
document.addEventListener('DOMContentLoaded', function() {
    const abvElements = document.querySelectorAll('.beer-abv');
    
    abvElements.forEach(element => {
        const abvText = element.textContent;
        const abvValue = parseFloat(abvText);
        
        if (abvValue < 4) {
            element.style.color = '#4CAF50'; // Green for low ABV
        } else if (abvValue < 6) {
            element.style.color = '#FFC107'; // Yellow for medium ABV
        } else if (abvValue < 8) {
            element.style.color = '#FF9800'; // Orange for high ABV
        } else {
            element.style.color = '#F44336'; // Red for very high ABV
        }
    });
});

// Age Verification Styles
const ageVerificationStyles = `
    .age-modal {
        backdrop-filter: blur(10px);
    }
    
    .age-modal-content {
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        animation: fadeInUp 0.5s ease;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .navbar.scrolled {
        background: rgba(15, 15, 15, 0.95);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
    
    .taproom-status {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .taproom-status.open {
        background: #4CAF50;
        color: white;
    }
    
    .taproom-status.closed {
        background: #F44336;
        color: white;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            right: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(15, 15, 15, 0.95);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: right 0.3s ease;
        }
        
        .nav-menu.active {
            right: 0;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = ageVerificationStyles;
document.head.appendChild(styleSheet);