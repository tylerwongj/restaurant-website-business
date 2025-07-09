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
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Menu category switching
const menuCategories = document.querySelectorAll('.menu-category');
const menuDishes = document.querySelectorAll('.menu-dishes');

menuCategories.forEach(category => {
    category.addEventListener('click', () => {
        // Remove active class from all categories and dishes
        menuCategories.forEach(cat => cat.classList.remove('active'));
        menuDishes.forEach(dish => dish.classList.remove('active'));
        
        // Add active class to clicked category
        category.classList.add('active');
        
        // Show corresponding dishes
        const targetCategory = category.getAttribute('data-category');
        const targetDishes = document.querySelector(`[data-category="${targetCategory}"].menu-dishes`);
        if (targetDishes) {
            targetDishes.classList.add('active');
        }
    });
});

// Reservation form handling
const reservationForm = document.querySelector('.reservation-form');
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(reservationForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Show success message (replace with actual form submission)
        alert('Thank you for your reservation request! We will contact you within 24 hours to confirm your reservation.');
        
        // Reset form
        reservationForm.reset();
    });
}

// Intersection Observer for scroll animations
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

// Observe elements for animation
document.querySelectorAll('.experience-item, .dish-showcase, .ambiance-image, .achievement').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(item);
});

// Hero parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Elegant hover effects for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px)';
        button.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
    });
});

// Smooth reveal animations for sections
function revealSections() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = 200;
        
        if (sectionTop < window.innerHeight - sectionVisible) {
            section.classList.add('revealed');
        }
    });
}

// Add CSS for revealed sections
const style = document.createElement('style');
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    section.revealed,
    section#home {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

window.addEventListener('scroll', revealSections);
document.addEventListener('DOMContentLoaded', revealSections);

// Advanced image loading with fade-in effect
document.querySelectorAll('img').forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    
    img.onload = () => {
        img.style.opacity = '1';
    };
    
    // Set loading attribute for performance
    img.loading = 'lazy';
});

// Elegant typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing animation to hero title on page load
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Smooth staggered animations for menu items
function staggerAnimation(elements, delay = 200) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * delay);
    });
}

// Apply staggered animations to menu categories
document.addEventListener('DOMContentLoaded', () => {
    const menuCategories = document.querySelectorAll('.menu-category');
    menuCategories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    setTimeout(() => {
        staggerAnimation(menuCategories, 150);
    }, 1000);
});

// Enhanced form validation
function validateReservationForm() {
    const form = document.querySelector('.reservation-form');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.style.borderColor = '#e74c3c';
                input.style.backgroundColor = '#ffebee';
            } else {
                input.style.borderColor = '#c9b037';
                input.style.backgroundColor = '#fff';
            }
        });
        
        input.addEventListener('focus', () => {
            input.style.borderColor = '#c9b037';
            input.style.backgroundColor = '#fff';
        });
    });
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', validateReservationForm);

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Focus management for mobile menu
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hamburger.click();
    }
});

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.onclick = scrollToTop;
document.body.appendChild(scrollTopBtn);

// Style scroll to top button
const scrollTopStyle = document.createElement('style');
scrollTopStyle.textContent = `
    .scroll-top-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--secondary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 1000;
    }
    
    .scroll-top-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
    
    .scroll-top-btn.visible {
        opacity: 1;
    }
`;
document.head.appendChild(scrollTopStyle);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Performance optimization
let ticking = false;
function updateOnScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            // Batch scroll-related updates here
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateOnScroll);

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'images/hero-dining-room.jpg',
        'images/chef-portrait.jpg',
        'images/dish-1.jpg',
        'images/dish-2.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

document.addEventListener('DOMContentLoaded', preloadImages);