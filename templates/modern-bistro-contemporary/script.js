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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Hero slider functionality (if multiple images are provided)
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto-advance slides every 5 seconds
if (slides.length > 1) {
    setInterval(nextSlide, 5000);
}

// Gallery lightbox functionality
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${img.src}" alt="${img.alt}">
                <button class="lightbox-close">&times;</button>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        // Close lightbox
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
            }
        });
    });
});

// Form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Here you would typically send the data to your server
        console.log('Form submitted:', data);
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Menu category filtering (for menu page)
const categoryButtons = document.querySelectorAll('.category-btn');
const menuSections = document.querySelectorAll('.menu-section');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        
        // Update active button
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Show/hide menu sections
        menuSections.forEach(section => {
            if (category === 'all' || section.dataset.category === category) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
});

// Intersection Observer for animations
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
document.querySelectorAll('.menu-item, .feature, .gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// CSS for lightbox and animations
const additionalStyles = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 100%;
        border-radius: 10px;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: -40px;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        transition: opacity 0.3s ease;
    }
    
    .lightbox-close:hover {
        opacity: 0.7;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .loaded {
        animation: pageLoad 0.8s ease;
    }
    
    @keyframes pageLoad {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .menu-hero {
        min-height: 60vh;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: white;
    }
    
    .menu-hero .hero-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }
    
    .menu-hero .hero-background img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .menu-hero .hero-content {
        position: relative;
        z-index: 3;
    }
    
    .menu-categories {
        padding: 50px 0;
        background-color: var(--background-light);
        border-bottom: 1px solid var(--border-color);
    }
    
    .category-nav {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem;
    }
    
    .category-btn {
        background: none;
        border: 2px solid var(--border-color);
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 500;
        color: var(--text-dark);
    }
    
    .category-btn:hover,
    .category-btn.active {
        background-color: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
    }
    
    .menu-content {
        padding: 50px 0;
    }
    
    .menu-section {
        margin-bottom: 60px;
    }
    
    .menu-items {
        display: grid;
        gap: 2rem;
    }
    
    .menu-item-detailed {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 2rem;
        align-items: center;
        padding: 2rem;
        background-color: var(--background-light);
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s ease;
    }
    
    .menu-item-detailed:hover {
        transform: translateY(-2px);
    }
    
    .menu-item-image {
        width: 200px;
        height: 150px;
        border-radius: 8px;
        overflow: hidden;
    }
    
    .menu-item-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .menu-item-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
    }
    
    .menu-item-header h3 {
        margin: 0;
        color: var(--text-dark);
    }
    
    .menu-item-description {
        color: var(--text-light);
        line-height: 1.6;
        margin: 0;
    }
    
    .cta {
        background-color: var(--primary-color);
        color: white;
        padding: 80px 0;
        text-align: center;
    }
    
    .cta-content h2 {
        color: white;
        margin-bottom: 1rem;
    }
    
    .cta-content p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        opacity: 0.9;
    }
    
    .cta-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
    }
    
    .cta .btn-outline {
        border-color: white;
        color: white;
    }
    
    .cta .btn-outline:hover {
        background-color: white;
        color: var(--primary-color);
    }
    
    @media (max-width: 768px) {
        .menu-item-detailed {
            grid-template-columns: 1fr;
            text-align: center;
        }
        
        .menu-item-image {
            width: 100%;
            height: 200px;
        }
        
        .menu-item-header {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
        }
        
        .category-nav {
            justify-content: center;
        }
        
        .category-btn {
            padding: 8px 16px;
            font-size: 0.9rem;
        }
    }
`;

// Add the styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);