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

// Gallery Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterCategory = button.getAttribute('data-category');
        
        galleryItems.forEach(item => {
            if (filterCategory === 'all' || item.getAttribute('data-category') === filterCategory) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Initialize gallery items with fade-in animation
galleryItems.forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});

// Lightbox Gallery
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentImageIndex = 0;
const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));

// Open lightbox when clicking on gallery images
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    const currentItem = galleryItems[currentImageIndex];
    const img = currentItem.querySelector('img');
    const overlay = currentItem.querySelector('.gallery-overlay');
    
    lightboxImg.src = img.src;
    lightboxCaption.textContent = overlay.querySelector('h3').textContent + ' - ' + overlay.querySelector('p').textContent;
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    openLightbox();
}

// Lightbox event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    }
});

// Testimonials Slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

// Testimonial navigation
if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);
    
    // Auto-advance testimonials every 6 seconds
    setInterval(nextTestimonial, 6000);
}

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const date = this.querySelector('input[type="date"]').value;
        const service = this.querySelector('select').value;
        const location = this.querySelectorAll('input[type="text"]')[1].value;
        const hours = this.querySelector('input[type="number"]').value;
        const message = this.querySelector('textarea').value;
        const rush = this.querySelector('input[type="checkbox"]').checked;
        
        // Basic validation
        if (!name || !email || !phone || !date || !service || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Date validation (can't be in the past)
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert('Please select a future date for your session.');
            return;
        }
        
        // Show success message (replace with actual form submission)
        const rushText = rush ? ' We\'ll prioritize your request due to the rush timeline.' : '';\n        alert(`Thank you, ${name}! Your ${service} session request for ${date} has been received.${rushText} We'll send you a detailed quote within 24 hours.`);\n        this.reset();\n        \n        // TODO: Replace with actual form submission to your backend\n        console.log('Photography session request:', {\n            name,\n            email,\n            phone,\n            date,\n            service,\n            location,\n            hours,\n            message,\n            rush,\n            timestamp: new Date().toISOString()\n        });\n    });\n}\n\n// Service Card Interactions\ndocument.querySelectorAll('.service-card').forEach(card => {\n    card.addEventListener('click', function() {\n        const serviceName = this.querySelector('h3').textContent;\n        const servicePrice = this.querySelector('.service-price').textContent;\n        \n        // TODO: Replace with actual service booking or detail page\n        alert(`Book your ${serviceName} session ${servicePrice}. Contact us to discuss your needs!`);\n        console.log('Service clicked:', { serviceName, servicePrice });\n    });\n});\n\n// Navbar Background Change on Scroll\nwindow.addEventListener('scroll', () => {\n    const navbar = document.querySelector('.navbar');\n    if (window.scrollY > 100) {\n        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';\n        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';\n    } else {\n        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';\n        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';\n    }\n});\n\n// Animation on Scroll\nconst observerOptions = {\n    threshold: 0.1,\n    rootMargin: '0px 0px -50px 0px'\n};\n\nconst observer = new IntersectionObserver(function(entries) {\n    entries.forEach(entry => {\n        if (entry.isIntersecting) {\n            entry.target.style.opacity = '1';\n            entry.target.style.transform = 'translateY(0)';\n        }\n    });\n}, observerOptions);\n\n// Observe elements for animation\ndocument.querySelectorAll('.service-card, .testimonial-card').forEach(el => {\n    el.style.opacity = '0';\n    el.style.transform = 'translateY(20px)';\n    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';\n    observer.observe(el);\n});\n\n// Statistics Counter Animation\nfunction animateCounter(element, target) {\n    let current = 0;\n    const increment = target / 100;\n    const timer = setInterval(() => {\n        current += increment;\n        if (current >= target) {\n            current = target;\n            clearInterval(timer);\n        }\n        element.textContent = Math.floor(current) + '+';\n    }, 25);\n}\n\n// Animate stats when they come into view\nconst statsObserver = new IntersectionObserver(function(entries) {\n    entries.forEach(entry => {\n        if (entry.isIntersecting) {\n            const statElements = entry.target.querySelectorAll('.stat h3');\n            statElements.forEach(stat => {\n                const text = stat.textContent;\n                const number = parseInt(text.replace(/\\D/g, ''));\n                if (number) {\n                    animateCounter(stat, number);\n                }\n            });\n            statsObserver.unobserve(entry.target);\n        }\n    });\n}, observerOptions);\n\nconst statsSection = document.querySelector('.photographer-stats');\nif (statsSection) {\n    statsObserver.observe(statsSection);\n}\n\n// Service Auto-selection from URL\nconst serviceSelect = document.querySelector('select');\nif (serviceSelect) {\n    // Check if user came from a specific service link\n    const urlParams = new URLSearchParams(window.location.search);\n    const serviceParam = urlParams.get('service');\n    \n    if (serviceParam) {\n        // Auto-select the service based on URL parameter\n        const option = Array.from(serviceSelect.options).find(opt => \n            opt.value.toLowerCase().includes(serviceParam.toLowerCase())\n        );\n        if (option) {\n            option.selected = true;\n        }\n    }\n}\n\n// Gallery Masonry Layout (Simple)\nfunction adjustGalleryLayout() {\n    const galleryGrid = document.querySelector('.gallery-grid');\n    if (!galleryGrid) return;\n    \n    const items = galleryGrid.querySelectorAll('.gallery-item');\n    let tallestItem = 0;\n    \n    items.forEach(item => {\n        const img = item.querySelector('img');\n        if (img.complete) {\n            const height = img.offsetHeight;\n            if (height > tallestItem) tallestItem = height;\n        }\n    });\n    \n    // Adjust grid to accommodate different image heights\n    if (window.innerWidth > 768) {\n        galleryGrid.style.gridAutoRows = `${tallestItem}px`;\n    }\n}\n\n// Load event for gallery images\ndocument.querySelectorAll('.gallery-item img').forEach(img => {\n    img.addEventListener('load', adjustGalleryLayout);\n});\n\n// Form validation feedback\nconst formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');\nformInputs.forEach(input => {\n    input.addEventListener('blur', function() {\n        if (this.hasAttribute('required') && !this.value.trim()) {\n            this.style.borderColor = '#ef4444';\n        } else {\n            this.style.borderColor = '#e5e7eb';\n        }\n    });\n    \n    input.addEventListener('focus', function() {\n        this.style.borderColor = '#6366f1';\n    });\n});\n\n// Portfolio hover effects\ndocument.querySelectorAll('.gallery-item').forEach(item => {\n    item.addEventListener('mouseenter', function() {\n        this.style.zIndex = '10';\n    });\n    \n    item.addEventListener('mouseleave', function() {\n        this.style.zIndex = '1';\n    });\n});\n\n// Lazy loading for gallery images\nconst imageObserver = new IntersectionObserver((entries, observer) => {\n    entries.forEach(entry => {\n        if (entry.isIntersecting) {\n            const img = entry.target;\n            img.src = img.dataset.src;\n            img.classList.remove('lazy');\n            imageObserver.unobserve(img);\n        }\n    });\n});\n\n// Apply lazy loading if data-src attributes exist\ndocument.querySelectorAll('img[data-src]').forEach(img => {\n    imageObserver.observe(img);\n});\n\n// Initialize date picker with minimum date as today\nconst dateInput = document.querySelector('input[type=\"date\"]');\nif (dateInput) {\n    const today = new Date().toISOString().split('T')[0];\n    dateInput.setAttribute('min', today);\n}\n\n// Social media sharing (if needed)\nfunction sharePortfolio(platform) {\n    const url = encodeURIComponent(window.location.href);\n    const text = encodeURIComponent('Check out this amazing photography portfolio!');\n    \n    let shareUrl;\n    switch (platform) {\n        case 'facebook':\n            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;\n            break;\n        case 'twitter':\n            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;\n            break;\n        case 'pinterest':\n            shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`;\n            break;\n    }\n    \n    if (shareUrl) {\n        window.open(shareUrl, '_blank', 'width=600,height=400');\n    }\n}\n\n// Make share function globally available\nwindow.sharePortfolio = sharePortfolio;"}