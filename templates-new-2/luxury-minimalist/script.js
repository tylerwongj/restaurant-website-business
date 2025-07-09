// Luxury Minimalist Template JavaScript

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove background blur based on scroll position
    if (scrollTop > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Reservation Modal
const modal = document.getElementById('reservationModal');
const reservationBtns = document.querySelectorAll('.btn-primary');
const closeBtn = document.querySelector('.close');

// Open modal when clicking reservation buttons
reservationBtns.forEach(btn => {
    if (btn.textContent.toLowerCase().includes('reservation') || btn.textContent.toLowerCase().includes('reserve')) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
});

// Close modal
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Reservation form handling
const reservationForm = document.querySelector('.reservation-form');
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(reservationForm);
        const reservationData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            date: formData.get('date'),
            time: formData.get('time'),
            guests: formData.get('guests'),
            requests: formData.get('requests')
        };
        
        // Basic validation
        if (!reservationData.name || !reservationData.email || !reservationData.phone || 
            !reservationData.date || !reservationData.time || !reservationData.guests) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(reservationData.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\d\s\-\(\)\+]+$/;
        if (!phoneRegex.test(reservationData.phone)) {
            alert('Please enter a valid phone number.');
            return;
        }
        
        // Date validation (not in the past)
        const selectedDate = new Date(reservationData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert('Please select a future date.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = reservationForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your reservation request! We will contact you shortly to confirm.');
            reservationForm.reset();
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Image lazy loading
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.menu-item, .option, .about-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax effect for hero image
const heroImage = document.querySelector('.hero-image img');
if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Preload critical images
const criticalImages = [
    'images/hero-dish.jpg',
    'images/logo.png'
];

criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Page loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loading');
});

// Touch gestures for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    if (!touchStartX || !touchStartY) return;
    
    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
    
    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;
    
    // Horizontal swipe detection
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 50) {
            // Swipe left
            console.log('Swipe left detected');
        } else if (deltaX < -50) {
            // Swipe right
            console.log('Swipe right detected');
        }
    }
    
    touchStartX = 0;
    touchStartY = 0;
});

// Performance optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    // Any scroll-based functionality that doesn't need to run on every scroll event
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
        this.alt = 'Image not available';
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set minimum date for reservation form
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }
    
    // Initialize any other components
    console.log('Luxury Minimalist Template Initialized');
});