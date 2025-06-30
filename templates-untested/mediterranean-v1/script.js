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

// Menu Category Switching
document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.category');
    const menuGrids = document.querySelectorAll('.menu-grid');
    
    categories.forEach(category => {
        category.addEventListener('click', () => {
            // Remove active class from all categories
            categories.forEach(cat => cat.classList.remove('active'));
            // Add active class to clicked category
            category.classList.add('active');
            
            // Hide all menu grids
            menuGrids.forEach(grid => grid.classList.add('hidden'));
            
            // Show the selected menu grid
            const selectedCategory = category.dataset.category;
            const targetGrid = document.querySelector(`[data-category="${selectedCategory}"]`);
            if (targetGrid && targetGrid.classList.contains('menu-grid')) {
                targetGrid.classList.remove('hidden');
            }
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            alert('Efcharistó! Thank you for your message. We\'ll get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.feature-item, .menu-item, .specialty-item, .value-item, .info-section');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Mediterranean greeting rotation
document.addEventListener('DOMContentLoaded', () => {
    const greetings = [
        'Γεια σας! (Hello!)',
        'Καλησπέρα! (Good evening!)',
        'Καλημέρα! (Good morning!)',
        'Yamas! (Cheers!)',
        'Buongiorno!',
        '¡Hola!'
    ];
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && window.innerWidth > 768) {
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        
        const greetingEl = document.createElement('div');
        greetingEl.textContent = randomGreeting;
        greetingEl.style.cssText = `
            font-size: 1.2rem;
            color: var(--accent-color);
            font-weight: 600;
            margin-bottom: 1rem;
            opacity: 0;
            animation: fadeInUp 1s ease 0.5s forwards;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        `;
        
        heroContent.insertBefore(greetingEl, heroContent.firstChild);
        
        // Add animation
        const style = document.createElement('style');
        style.textContent = `
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
        `;
        document.head.appendChild(style);
    }
});

// Menu item hover effects with Mediterranean flair
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.02)';
            item.style.boxShadow = '0 15px 30px rgba(46, 89, 132, 0.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
    });
});

// Feature items ocean wave effect
document.addEventListener('DOMContentLoaded', () => {
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            // Create a subtle wave effect with staggered animations
            setTimeout(() => {
                item.style.transform = 'translateY(-10px) rotate(1deg)';
                item.style.background = 'linear-gradient(135deg, var(--bg-light) 0%, rgba(244, 185, 66, 0.1) 100%)';
            }, index * 100);
        });
        
        item.addEventListener('mouseleave', () => {
            setTimeout(() => {
                item.style.transform = 'translateY(0) rotate(0deg)';
                item.style.background = 'var(--bg-light)';
            }, index * 50);
        });
    });
});

// Special Mediterranean hours highlighting
document.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    const currentHour = now.getHours();
    
    // Highlight dinner hours (6-9 PM) with special styling
    if (currentHour >= 18 && currentHour <= 21) {
        const hourItems = document.querySelectorAll('.hour-item');
        hourItems.forEach(item => {
            const timeText = item.querySelector('span:last-child');
            if (timeText && timeText.textContent.includes('PM')) {
                item.style.background = 'linear-gradient(135deg, var(--accent-color) 0%, var(--primary-color) 100%)';
                item.style.color = 'white';
                item.style.borderRadius = '8px';
                item.style.padding = '1rem';
                item.style.margin = '0.5rem 0';
            }
        });
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Dynamic color scheme switcher (hidden feature)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.altKey) {
        const schemes = ['mediterranean', 'greek', 'italian', 'spanish', 'coastal'];
        const currentScheme = document.body.className;
        const currentIndex = schemes.indexOf(currentScheme);
        const nextIndex = (currentIndex + 1) % schemes.length;
        
        document.body.className = schemes[nextIndex];
        
        // Show notification
        const notification = document.createElement('div');
        notification.textContent = `Switched to ${schemes[nextIndex]} theme`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }
});