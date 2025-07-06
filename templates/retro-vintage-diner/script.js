// Retro Vintage Diner Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, var(--background-light), var(--background-cream))';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // Enhanced neon sign animation
    const neonSign = document.querySelector('.neon-sign');
    if (neonSign) {
        // Add random flicker effect
        setInterval(() => {
            if (Math.random() > 0.95) {
                neonSign.style.animation = 'none';
                setTimeout(() => {
                    neonSign.style.animation = 'neonGlow 2s ease-in-out infinite alternate';
                }, 100);
            }
        }, 2000);
    }

    // Animate retro stars
    const stars = document.querySelectorAll('.retro-star');
    stars.forEach((star, index) => {
        star.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.5) rotate(180deg)';
            this.style.color = getRandomNeonColor();
        });
        
        star.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.color = 'var(--accent-color)';
        });
    });

    // Jukebox interaction
    const jukebox = document.querySelector('.jukebox');
    const jukeboxScreen = document.querySelector('.jukebox-screen');
    
    if (jukebox && jukeboxScreen) {
        const songs = [
            "NOW PLAYING",
            "♪ ROCK AROUND THE CLOCK",
            "♪ BLUE SUEDE SHOES", 
            "♪ GREAT BALLS OF FIRE",
            "♪ JOHNNY B. GOODE",
            "♪ PEGGY SUE"
        ];
        
        let currentSong = 0;
        
        jukebox.addEventListener('click', function() {
            currentSong = (currentSong + 1) % songs.length;
            jukeboxScreen.textContent = songs[currentSong];
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Change jukebox lights color
            const lights = document.querySelector('.jukebox-lights');
            if (lights) {
                lights.style.background = `linear-gradient(90deg, 
                    ${getRandomNeonColor()} 0%, 
                    ${getRandomNeonColor()} 25%, 
                    ${getRandomNeonColor()} 50%, 
                    ${getRandomNeonColor()} 75%, 
                    ${getRandomNeonColor()} 100%
                )`;
            }
        });
    }

    // Retro card hover effects
    const retroCards = document.querySelectorAll('.retro-card');
    retroCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(1deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) rotate(0deg)';
        });
    });

    // Menu item hover effects
    const menuItems = document.querySelectorAll('.menu-item-row');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const price = this.querySelector('.item-price');
            if (price) {
                price.style.transform = 'scale(1.1) rotate(5deg)';
                price.style.background = getRandomNeonColor();
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const price = this.querySelector('.item-price');
            if (price) {
                price.style.transform = 'scale(1) rotate(0deg)';
                price.style.background = 'var(--primary-color)';
            }
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            button.textContent = 'MESSAGE SENT!';
            button.style.background = 'linear-gradient(135deg, var(--secondary-color), var(--neon-green))';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                this.reset();
            }, 3000);
        });
    }

    // Button hover animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Feature items stagger animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.feature-item, .menu-item, .special-day, .hours-item, .contact-item');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Add CSS for slide in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(style);

    // Utility function for random neon colors
    function getRandomNeonColor() {
        const neonColors = [
            '#ff1493', // neon pink
            '#00bfff', // neon blue  
            '#39ff14', // neon green
            '#ffff00', // neon yellow
            '#ff4500', // neon orange
            '#8a2be2', // neon purple
            '#00ffff', // neon cyan
            '#ff69b4', // hot pink
        ];
        return neonColors[Math.floor(Math.random() * neonColors.length)];
    }

    // Add some retro sound effects (visual feedback)
    function createRetroEffect(element) {
        const effect = document.createElement('div');
        effect.style.position = 'absolute';
        effect.style.width = '20px';
        effect.style.height = '20px';
        effect.style.background = getRandomNeonColor();
        effect.style.borderRadius = '50%';
        effect.style.pointerEvents = 'none';
        effect.style.zIndex = '9999';
        
        const rect = element.getBoundingClientRect();
        effect.style.left = (rect.left + Math.random() * rect.width) + 'px';
        effect.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        document.body.appendChild(effect);
        
        effect.animate([
            { transform: 'scale(0) rotate(0deg)', opacity: 1 },
            { transform: 'scale(1) rotate(180deg)', opacity: 0.5 },
            { transform: 'scale(0) rotate(360deg)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => effect.remove();
    }

    // Add retro effects to interactive elements
    document.querySelectorAll('.btn, .menu-item, .feature-item').forEach(element => {
        element.addEventListener('click', () => createRetroEffect(element));
    });

    // Initialize lazy loading for images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                img.onload = () => {
                    img.style.opacity = '1';
                };
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    console.log('🍔 Retro Vintage Diner - Welcome to the 50s! 🍔');
});