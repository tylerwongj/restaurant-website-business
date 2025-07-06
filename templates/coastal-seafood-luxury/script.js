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

    // Ocean wave animations
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
    document.querySelectorAll('.catch-card, .feature, .info-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Floating bubble animation
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.position = 'fixed';
        bubble.style.bottom = '-100px';
        bubble.style.left = Math.random() * window.innerWidth + 'px';
        bubble.style.width = (Math.random() * 60 + 20) + 'px';
        bubble.style.height = bubble.style.width;
        bubble.style.background = 'rgba(78,205,196,0.3)';
        bubble.style.borderRadius = '50%';
        bubble.style.pointerEvents = 'none';
        bubble.style.zIndex = '10';
        bubble.style.animation = 'float 6s ease-in-out forwards';
        
        document.body.appendChild(bubble);
        
        setTimeout(() => {
            bubble.remove();
        }, 6000);
    }

    // Create bubbles periodically
    setInterval(createBubble, 3000);

    // Wave animation on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const waveElements = document.querySelectorAll('.wave-animation');
        
        waveElements.forEach(wave => {
            wave.style.transform = `translateX(${scrolled * 0.1}px)`;
        });
    });

    // Tide information update (simulated)
    function updateTideInfo() {
        const tideInfo = document.querySelector('.tide-info');
        if (tideInfo) {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            
            // Simple simulation of tide times
            const nextHigh = hours < 6 ? '6:42 AM' : hours < 19 ? '7:18 PM' : '6:42 AM (Tomorrow)';
            const nextLow = hours < 12 ? '12:30 PM' : '12:55 AM (Tomorrow)';
            
            const tideContent = tideInfo.querySelector('p');
            if (tideContent) {
                tideContent.innerHTML = `High Tide: ${nextHigh}<br>Low Tide: ${nextLow}`;
            }
        }
    }

    // Update tide info on load
    updateTideInfo();

    // Card hover effects for catch display
    document.querySelectorAll('.catch-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-bg');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
});

// Contact form handling (if needed)
function handleContactForm(event) {
    event.preventDefault();
    // Add form handling logic here
    alert('Thanks for your message! We\'ll get back to you with the tide times and availability.');
}