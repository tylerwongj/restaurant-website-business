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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Show success message (replace with actual form handling)
        alert('Thank you for your reservation request! We will contact you shortly to confirm your farm-to-table dining experience.');
        
        // Reset form
        this.reset();
    });
}

// Animation on scroll
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

// Observe elements for animation
document.querySelectorAll('.farm-item, .menu-card, .contact-item, .highlight').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Staggered animation for farm items
document.querySelectorAll('.farm-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.2}s`;
});

// Staggered animation for menu cards
document.querySelectorAll('.menu-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.3}s`;
});

// Image lazy loading with fade effect
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                const newImg = new Image();
                newImg.onload = () => {
                    img.style.opacity = '1';
                };
                newImg.src = img.src;
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Seasonal badge animation
document.querySelectorAll('.seasonal-tag').forEach(tag => {
    const colors = ['#0d9488', '#059669', '#10b981', '#34d399'];
    let colorIndex = 0;
    
    setInterval(() => {
        tag.style.background = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 3000);
});

// Farm items hover effect with enhanced interaction
document.querySelectorAll('.farm-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.05)';
        this.style.boxShadow = '0 20px 40px rgba(13, 148, 136, 0.2)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
});

// Menu card enhanced interactions
document.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const image = this.querySelector('.menu-image img');
        image.style.transform = 'scale(1.15) rotate(2deg)';
        this.style.boxShadow = '0 25px 50px rgba(13, 148, 136, 0.25)';
    });
    
    card.addEventListener('mouseleave', function() {
        const image = this.querySelector('.menu-image img');
        image.style.transform = 'scale(1) rotate(0deg)';
        this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
});

// Form validation with organic styling
function validateForm() {
    const form = document.querySelector('.contact-form form');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            input.style.background = '#fef2f2';
            isValid = false;
        } else {
            input.style.borderColor = '#0d9488';
            input.style.background = '#f0fdfa';
        }
    });
    
    return isValid;
}

// Real-time validation feedback
document.querySelectorAll('.contact-form input, .contact-form select').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#ef4444';
            this.style.background = '#fef2f2';
        } else {
            this.style.borderColor = '#0d9488';
            this.style.background = '#f0fdfa';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = '#0d9488';
        this.style.background = '#ffffff';
    });
});

// Phone number formatting with organic feel
document.querySelector('input[type="tel"]')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
    }
    e.target.value = value;
});

// Organic growing animation for badges
document.querySelectorAll('.badge').forEach((badge, index) => {
    badge.style.opacity = '0';
    badge.style.transform = 'scale(0.5)';
    
    setTimeout(() => {
        badge.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        badge.style.opacity = '1';
        badge.style.transform = 'scale(1)';
    }, 1000 + (index * 200));
});

// Harvest time countdown (optional feature)
function updateHarvestInfo() {
    const now = new Date();
    const hour = now.getHours();
    const harvestInfo = document.querySelector('.harvest-time');
    
    if (harvestInfo) {
        if (hour >= 6 && hour <= 8) {
            harvestInfo.textContent = '🌅 Currently harvesting fresh vegetables for today\'s menu!';
            harvestInfo.style.color = '#059669';
        } else if (hour >= 9 && hour <= 11) {
            harvestInfo.textContent = '👨‍🍳 Chefs are preparing today\'s harvest in the kitchen';
            harvestInfo.style.color = '#0d9488';
        } else {
            harvestInfo.textContent = '🌱 Tomorrow\'s harvest will be picked at dawn';
            harvestInfo.style.color = '#6b7280';
        }
    }
}

// Update harvest info every minute
updateHarvestInfo();
setInterval(updateHarvestInfo, 60000);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Organic bounce effect for contact items
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function() {
        this.style.animation = 'organicBounce 0.6s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 600);
    });
});

// Add organic bounce keyframes
const organicBounceCSS = `
@keyframes organicBounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0) scale(1);
    }
    40% {
        transform: translateY(-10px) scale(1.05);
    }
    60% {
        transform: translateY(-5px) scale(1.02);
    }
}
`;

const style = document.createElement('style');
style.textContent = organicBounceCSS;
document.head.appendChild(style);