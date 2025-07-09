// Dark Luxury Steakhouse Interactive Features

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(n => 
        n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        })
    );
}

// Smooth Scrolling for Navigation Links
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

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menu Tab Navigation (for menu.html)
const tabButtons = document.querySelectorAll('.tab-btn');
const menuCategories = document.querySelectorAll('.menu-category');

if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and categories
            tabButtons.forEach(btn => btn.classList.remove('active'));
            menuCategories.forEach(category => category.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding category
            const categoryId = button.getAttribute('data-category');
            const targetCategory = document.getElementById(categoryId);
            if (targetCategory) {
                targetCategory.classList.add('active');
            }
        });
    });
}

// Form Submission Handler
const contactForms = document.querySelectorAll('form');
contactForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        button.textContent = 'Message Sent!';
        button.style.background = 'var(--gold-primary)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            form.reset();
        }, 3000);
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        const rate = scrolled * 0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.menu-item, .feature, .contact-item, .wine-item').forEach(el => {
    observer.observe(el);
});

// Counter Animation for Impact Metrics (if they exist)
const counters = document.querySelectorAll('.metric-number, .stat-value');

const animateCounter = (counter) => {
    const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
    const increment = target / 200;
    let current = 0;
    
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    updateCounter();
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// Image Lazy Loading
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Enhanced Menu Item Hover Effects (for menu page)
const menuItems = document.querySelectorAll('.menu-item-detailed, .menu-item-card');
menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
        item.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.2)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = '';
    });
});

// Wine Pairing Suggestions (interactive feature)
const steakItems = document.querySelectorAll('#steaks .menu-item-detailed');
steakItems.forEach(item => {
    item.addEventListener('click', () => {
        // Show wine pairing suggestion
        const winePairings = {
            'ribeye': 'Cabernet Sauvignon',
            'filet': 'Pinot Noir',
            'strip': 'Malbec',
            'tomahawk': 'Bordeaux Blend'
        };
        
        // This could be enhanced to show actual pairing suggestions
        console.log('Wine pairing suggestions available');
    });
});

// Reservation Form Enhancement
const reservationForm = document.querySelector('.contact-form');
if (reservationForm) {
    // Add real-time validation
    const inputs = reservationForm.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.checkValidity()) {
                input.style.borderColor = 'var(--gold-primary)';
            } else {
                input.style.borderColor = '#ff6b6b';
            }
        });
    });
}

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.classList.add('scroll-to-top');
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: var(--gold-primary);
    color: var(--primary-bg);
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
    } else {
        scrollToTopBtn.style.opacity = '0';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeInUp 0.6s ease forwards;
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
        background: rgba(10, 10, 10, 0.98);
        backdrop-filter: blur(15px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
    }
    
    .lazy {
        filter: blur(5px);
        transition: filter 0.3s;
    }
`;
document.head.appendChild(style);