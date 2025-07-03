document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Reservation modal functionality
    const modal = document.getElementById('reservationModal');
    const reserveBtn = document.getElementById('reserveBtn');
    const heroReserveBtn = document.getElementById('heroReserveBtn');
    const closeBtn = document.querySelector('.close');

    function openModal() {
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    if (reserveBtn) {
        reserveBtn.addEventListener('click', openModal);
    }

    if (heroReserveBtn) {
        heroReserveBtn.addEventListener('click', openModal);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside of it
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    // Reservation form handling
    const reservationForm = document.querySelector('.reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(reservationForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.date || !data.time || !data.party || !data.name || !data.phone || !data.email) {
                alert('Please fill in all required fields.');
                return;
            }

            // Simulate reservation submission
            alert(`Thank you ${data.name}! Your reservation request for ${data.party} guest(s) on ${data.date} at ${data.time} has been received. We will contact you at ${data.phone} to confirm your reservation.`);
            
            // Close modal and reset form
            closeModal();
            reservationForm.reset();
        });
    }

    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission
            alert(`Thank you ${data.name}! Your message has been sent. We will respond to ${data.email} within 24 hours.`);
            
            // Reset form
            contactForm.reset();
        });
    }

    // Smooth scrolling for navigation links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Fade in animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections for fade-in animation
    const animatedElements = document.querySelectorAll('section');
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // Set minimum date for reservation to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        // Set default date to today
        dateInput.value = today;
    }

    // Dynamic time slots based on day
    const timeSelect = document.getElementById('time');
    if (timeSelect && dateInput) {
        function updateTimeSlots() {
            const selectedDate = new Date(dateInput.value);
            const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
            
            // Clear existing options except the first one
            while (timeSelect.children.length > 1) {
                timeSelect.removeChild(timeSelect.lastChild);
            }
            
            let timeSlots = [];
            
            // Different time slots based on day
            if (dayOfWeek === 1) { // Monday - Closed
                timeSlots = [];
                const option = document.createElement('option');
                option.value = '';
                option.textContent = 'Closed on Mondays';
                option.disabled = true;
                timeSelect.appendChild(option);
            } else if (dayOfWeek === 0) { // Sunday
                timeSlots = ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'];
            } else if (dayOfWeek === 5 || dayOfWeek === 6) { // Friday, Saturday
                timeSlots = ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];
            } else { // Tuesday, Wednesday, Thursday
                timeSlots = ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];
            }
            
            timeSlots.forEach(time => {
                const option = document.createElement('option');
                option.value = time;
                option.textContent = formatTime(time);
                timeSelect.appendChild(option);
            });
        }
        
        function formatTime(timeStr) {
            const [hours, minutes] = timeStr.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
            return `${displayHour}:${minutes} ${ampm}`;
        }
        
        dateInput.addEventListener('change', updateTimeSlots);
        
        // Initialize time slots for today
        updateTimeSlots();
    }

    // Add loading states for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });

    // Color scheme switcher (for testing purposes)
    function addColorSchemeSwitcher() {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            const switcher = document.createElement('div');
            switcher.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: white;
                padding: 10px;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                z-index: 1000;
                font-size: 12px;
            `;
            switcher.innerHTML = `
                <div>Color Scheme:</div>
                <button onclick="document.body.className='color-scheme-neutral'">Neutral</button>
                <button onclick="document.body.className='color-scheme-dark'">Dark</button>
                <button onclick="document.body.className='color-scheme-earth'">Earth</button>
            `;
            document.body.appendChild(switcher);
        }
    }
    
    // Enable color scheme switcher in development
    addColorSchemeSwitcher();
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
}, 250));

// Performance optimizations
if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading is supported
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
        img.loading = 'lazy';
    });
} else {
    // Fallback for browsers that don't support native lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}