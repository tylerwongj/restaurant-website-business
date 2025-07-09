// Brewery/Pub Restaurant Template - JavaScript

// Mobile Navigation
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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
    }
});

// Beer card hover effects
document.querySelectorAll('.beer-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Event form submission handler
const eventForm = document.getElementById('eventForm');
if (eventForm) {
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });
        
        // Simple validation
        if (!formDataObj.name || !formDataObj.email || !formDataObj.phone || 
            !formDataObj['event-type'] || !formDataObj.date || !formDataObj.guests || !formDataObj.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formDataObj.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Date validation (not in the past)
        const selectedDate = new Date(formDataObj.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert('Please select a future date.');
            return;
        }
        
        // Guest count validation
        const guestCount = parseInt(formDataObj.guests);
        if (guestCount < 10 || guestCount > 200) {
            alert('Please enter a guest count between 10 and 200.');
            return;
        }
        
        // Success message
        alert('Thank you for your event inquiry! We will contact you within 24 hours to discuss your private event.');
        
        // Reset form
        this.reset();
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Beer card stagger animation
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.beer-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }
    });
}, observerOptions);

// Age verification popup (for brewery/pub)
function showAgeVerification() {
    const ageVerificationHtml = `
        <div id="age-verification" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        ">
            <div style="
                background-color: white;
                padding: 2rem;
                border-radius: 10px;
                text-align: center;
                max-width: 400px;
                margin: 20px;
            ">
                <h2 style="color: #2c1810; margin-bottom: 1rem;">Age Verification</h2>
                <p style="color: #666; margin-bottom: 2rem;">Are you of legal drinking age?</p>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button id="age-yes" style="
                        background-color: #d4af37;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 1rem;
                    ">Yes</button>
                    <button id="age-no" style="
                        background-color: #666;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 1rem;
                    ">No</button>
                </div>
                <p style="font-size: 0.9rem; color: #999; margin-top: 1rem;">
                    You must be 21 or older to enter this site.
                </p>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', ageVerificationHtml);
    
    document.getElementById('age-yes').addEventListener('click', () => {
        document.getElementById('age-verification').remove();
        localStorage.setItem('ageVerified', 'true');
    });
    
    document.getElementById('age-no').addEventListener('click', () => {
        window.location.href = 'https://www.google.com';
    });
}

// Color scheme switcher (for testing purposes)
function switchColorScheme(scheme) {
    const body = document.body;
    const schemes = ['color-scheme-business', 'color-scheme-warm', 'color-scheme-cool', 'color-scheme-bold'];
    
    schemes.forEach(s => body.classList.remove(s));
    
    if (scheme && scheme !== 'default') {
        body.classList.add(`color-scheme-${scheme}`);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check age verification
    if (!localStorage.getItem('ageVerified')) {
        setTimeout(() => {
            showAgeVerification();
        }, 1000);
    }
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Observe beer grid for stagger animation
    const beerGrid = document.querySelector('.beer-grid');
    if (beerGrid) {
        const beerCards = beerGrid.querySelectorAll('.beer-card');
        beerCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        staggerObserver.observe(beerGrid);
    }
    
    // Add color scheme switcher to page (for demo purposes)
    const colorSchemeSwitcher = document.createElement('div');
    colorSchemeSwitcher.innerHTML = `
        <div style="position: fixed; top: 100px; right: 20px; z-index: 1001; background: white; padding: 10px; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <label style="display: block; margin-bottom: 5px; font-size: 12px;">Color Scheme:</label>
            <select id="colorSchemeSelector" style="width: 100%; padding: 5px; font-size: 12px;">
                <option value="default">Default</option>
                <option value="business">Business</option>
                <option value="warm">Warm</option>
                <option value="cool">Cool</option>
                <option value="bold">Bold</option>
            </select>
        </div>
    `;
    
    document.body.appendChild(colorSchemeSwitcher);
    
    const selector = document.getElementById('colorSchemeSelector');
    selector.addEventListener('change', (e) => {
        switchColorScheme(e.target.value);
    });
});