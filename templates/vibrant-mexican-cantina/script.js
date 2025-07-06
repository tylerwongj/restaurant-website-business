// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Smooth Scrolling with festive bounce
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

// Navbar background change on scroll with vibrant effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.borderBottom = '3px solid var(--primary-color)';
    } else {
        navbar.style.backgroundColor = 'var(--background-light)';
        navbar.style.backdropFilter = 'none';
        navbar.style.borderBottom = 'none';
    }
});

// Contact Form Handling with Mexican flair
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                service: formData.get('service'),
                message: formData.get('message')
            };
            
            // Basic validation
            if (!data.name || !data.email || !data.phone || !data.service || !data.message) {
                showAlert('¡Por favor llena todos los campos!', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showAlert('¡Por favor ingresa un email válido!', 'error');
                return;
            }
            
            // Show success message with festive animation
            showAlert('¡Gracias! Te contactaremos pronto. ¡Viva México!', 'success');
            
            // Reset form
            this.reset();
            
            console.log('Contact form submitted:', data);
        });
    }
});

// Newsletter subscription
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                showAlert('¡Ingresa tu email!', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('¡Email no válido!', 'error');
                return;
            }
            
            showAlert('¡Suscripción exitosa! ¡Ofertas especiales en camino!', 'success');
            this.querySelector('input[type="email"]').value = '';
        });
    }
});

// Custom alert function with Mexican styling
function showAlert(message, type) {
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = 'custom-alert';
    
    const backgroundColor = type === 'success' 
        ? 'linear-gradient(45deg, var(--green-accent), var(--accent-color))'
        : 'linear-gradient(45deg, var(--primary-color), var(--orange-accent))';
    
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 20px 30px;
        border-radius: 25px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 700;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 350px;
        border: 3px solid white;
    `;
    
    // Add festive emoji based on type
    const emoji = type === 'success' ? '🎉' : '⚠️';
    alert.innerHTML = `${emoji} ${message}`;
    
    document.body.appendChild(alert);
    
    // Animate in
    setTimeout(() => {
        alert.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        alert.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (alert.parentElement) {
                alert.remove();
            }
        }, 400);
    }, 4000);
}

// Animate elements on scroll with festive timing
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, observerOptions);

// Observe elements for festive animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.menu-item, .feature, .special, .cantina-images img');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.9)';
        el.style.transition = `opacity 0.8s ease ${index * 0.15}s, transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.15}s`;
        observer.observe(el);
    });
});

// Menu item hover effects with Mexican flair
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotate(1deg)';
            this.style.boxShadow = '0 20px 40px rgba(214, 48, 49, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });
});

// Form field focus effects with vibrant styling
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.querySelectorAll('input, select, textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-color)';
            this.style.boxShadow = '0 0 0 3px rgba(214, 48, 49, 0.2)';
            this.style.transform = 'translateY(-3px)';
        });
        
        field.addEventListener('blur', function() {
            this.style.borderColor = 'var(--border-color)';
            this.style.boxShadow = 'none';
            this.style.transform = 'translateY(0)';
        });
    });
});

// Spice level interactive effects
document.addEventListener('DOMContentLoaded', function() {
    const spiceIndicators = document.querySelectorAll('.spice-indicators');
    
    spiceIndicators.forEach(container => {
        const spices = container.querySelectorAll('.spice');
        
        container.addEventListener('mouseenter', function() {
            spices.forEach((spice, index) => {
                setTimeout(() => {
                    spice.style.transform = 'scale(1.2) rotate(10deg)';
                    spice.style.transition = 'transform 0.2s ease';
                }, index * 100);
            });
        });
        
        container.addEventListener('mouseleave', function() {
            spices.forEach(spice => {
                spice.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const heroImage = document.querySelector('.hero-main-image img');
    const heroAccents = document.querySelectorAll('.accent-circle, .accent-pattern');
    
    if (heroImage) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
    
    // Animate accent elements
    heroAccents.forEach((accent, index) => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * (0.2 + index * 0.1);
        accent.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Active navigation highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Button hover effects with Mexican flair
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Random color accent animation for decorative elements
document.addEventListener('DOMContentLoaded', function() {
    const decorativeElements = document.querySelectorAll('.decoration, .accent-circle');
    
    function animateColors() {
        decorativeElements.forEach((element, index) => {
            setTimeout(() => {
                const colors = [
                    'linear-gradient(45deg, var(--primary-color), var(--accent-color))',
                    'linear-gradient(45deg, var(--green-accent), var(--orange-accent))',
                    'linear-gradient(45deg, var(--accent-color), var(--primary-color))'
                ];
                
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                element.style.background = randomColor;
                element.style.transition = 'background 2s ease';
            }, index * 500);
        });
    }
    
    // Initial animation
    setTimeout(animateColors, 2000);
    
    // Repeat every 10 seconds
    setInterval(animateColors, 10000);
});

// Mexican-style loading animation
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.8s ease';
    
    // Create a festive loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        color: white;
        font-size: 2rem;
        font-weight: bold;
    `;
    
    loadingOverlay.innerHTML = '🌮 ¡Cargando sabores auténticos! 🌶️';
    document.body.appendChild(loadingOverlay);
    
    setTimeout(() => {
        body.style.opacity = '1';
        loadingOverlay.style.opacity = '0';
        loadingOverlay.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            loadingOverlay.remove();
        }, 500);
    }, 1000);
});

// Special effects for cantina section
document.addEventListener('DOMContentLoaded', function() {
    const cantinaSection = document.querySelector('.cantina');
    
    if (cantinaSection) {
        const cantinaObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add sparkle effect
                    addSparkles(cantinaSection);
                    cantinaObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        cantinaObserver.observe(cantinaSection);
    }
});

function addSparkles(container) {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--accent-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: sparkle 2s ease-out forwards;
            `;
            
            container.style.position = 'relative';
            container.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }, i * 200);
    }
}

// Add CSS for sparkle animation
const sparkleStyles = `
    @keyframes sparkle {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = sparkleStyles;
document.head.appendChild(styleSheet);