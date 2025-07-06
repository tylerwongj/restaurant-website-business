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

// Smooth scrolling for navigation links
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

// Specialties Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.specialty-item');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Event listeners for slider controls
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-advance slider
setInterval(nextSlide, 6000);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
    
    // Floating elements parallax
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach((bubble, index) => {
        const speed = 0.1 + (index * 0.05);
        bubble.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 119, 190, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 119, 190, 0.1)';
    }
});

// Counter animation for stats
const animateCounter = (element, target) => {
    let current = 0;
    const suffix = element.textContent.replace(/[0-9]/g, '');
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 20);
};

// Wave animation for footer
const waves = document.querySelectorAll('.wave-1, .wave-2, .wave-3');
waves.forEach((wave, index) => {
    wave.style.animation = `wave-motion ${3 + index}s infinite ease-in-out`;
    wave.style.animationDelay = `${index * 0.5}s`;
});

// Add wave motion keyframes
const waveStyle = document.createElement('style');
waveStyle.textContent = `
    @keyframes wave-motion {
        0%, 100% { transform: translateX(0) scaleY(1); }
        50% { transform: translateX(-20px) scaleY(1.1); }
    }
`;
document.head.appendChild(waveStyle);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate stats
            if (entry.target.classList.contains('stat-number')) {
                const text = entry.target.textContent;
                const number = parseInt(text);
                if (!isNaN(number)) {
                    animateCounter(entry.target, number);
                }
            }
            
            // General animation
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Special animation for catch items
            if (entry.target.classList.contains('catch-item')) {
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        }
    });
}, observerOptions);

// Form submission handler
document.querySelector('.booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Here you would typically send the data to your server
    console.log('Reservation submitted:', formObject);
    
    // Show success message with ocean theme
    const button = this.querySelector('button[type="submit"]');
    const originalHTML = button.innerHTML;
    
    button.innerHTML = '<span>🌊 Reservation Sent!</span><div class="btn-icon">✓</div>';
    button.style.background = 'linear-gradient(135deg, #00B4A6, #00D4AA)';
    
    // Add ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        width: 0;
        height: 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out;
    `;
    
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    button.style.position = 'relative';
    button.appendChild(ripple);
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.background = '';
        button.style.position = '';
        if (ripple.parentNode) ripple.remove();
        this.reset();
    }, 3000);
});

// Auto-hide mobile menu on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Initialize animations on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.catch-item, .contact-card, .stat, .sustainability-info');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Special animation for catch items
    document.querySelectorAll('.catch-item').forEach(item => {
        item.style.transform = 'translateY(30px) scale(0.95)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Observe stat numbers specifically
    document.querySelectorAll('.stat-number').forEach(stat => {
        observer.observe(stat);
    });
    
    // Set minimum date for reservation form
    const dateInput = document.querySelector('#date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Initialize slider
    showSlide(0);
});

// Add CSS for loading animation and other effects
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    body:not(.loaded) .hero-content {
        opacity: 0;
        transform: translateY(50px);
    }
    
    body.loaded .hero-content {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 1.5s ease, transform 1.5s ease;
    }
    
    /* Enhanced floating animations */
    .floating-elements .bubble {
        animation: float-bubble 6s infinite ease-in-out, drift 12s infinite ease-in-out;
    }
    
    @keyframes drift {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(10px); }
        75% { transform: translateX(-10px); }
    }
    
    /* Catch item hover effects */
    .catch-item:hover {
        animation: float 0.5s ease-in-out;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(-10px); }
        50% { transform: translateY(-15px); }
    }
    
    /* Custom scrollbar with ocean theme */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: var(--background-ocean);
    }
    
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, var(--secondary-color), var(--accent-color));
    }
    
    /* Button loading state */
    .btn.loading {
        pointer-events: none;
        opacity: 0.7;
    }
    
    .btn.loading .btn-icon {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(additionalStyles);

// Add interactive water ripple effect on click
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn, .catch-item, .contact-card')) {
        const ripple = document.createElement('div');
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 212, 230, 0.3);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            animation: water-ripple 0.8s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        if (!document.getElementById('ripple-styles')) {
            const rippleStyles = document.createElement('style');
            rippleStyles.id = 'ripple-styles';
            rippleStyles.textContent = `
                @keyframes water-ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(rippleStyles);
        }
        
        e.target.style.position = 'relative';
        e.target.style.overflow = 'hidden';
        e.target.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) ripple.remove();
        }, 800);
    }
});

// Seaweed swaying animation enhancement
const seaweeds = document.querySelectorAll('.seaweed');
seaweeds.forEach((seaweed, index) => {
    seaweed.style.animation = `sway ${4 + index}s infinite ease-in-out`;
    seaweed.style.animationDelay = `${index * 0.5}s`;
});

// Add tide effect to sections
const sections = document.querySelectorAll('section');
let tideDirection = 1;

setInterval(() => {
    sections.forEach((section, index) => {
        if (section.style.background && section.style.background.includes('ocean')) {
            const opacity = 0.05 + (Math.sin(Date.now() * 0.001 + index) * 0.02);
            section.style.background = `var(--background-ocean)`;
            section.style.backgroundImage = `radial-gradient(circle at 50% 50%, rgba(0, 212, 230, ${opacity}) 0%, transparent 70%)`;
        }
    });
}, 100);