// Rooftop Dining Luxury Restaurant Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Enhanced reservation form handling for luxury restaurant
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const date = this.querySelector('input[type="date"]').value;
            const time = this.querySelector('input[type="time"]').value;
            const partySize = this.querySelectorAll('select')[0].value;
            const seatingPref = this.querySelectorAll('select')[1].value;
            const occasion = this.querySelectorAll('select')[2].value;
            const requests = this.querySelector('textarea').value;
            
            // Validation
            if (!name || !email || !phone || !date || !time || !partySize) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Date validation
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                alert('Please select a future date.');
                return;
            }
            
            // Time validation for luxury dining hours
            const selectedTime = time.split(':');
            const hour = parseInt(selectedTime[0]);
            
            if (hour < 17 || hour > 22) {
                alert('Dinner service is available from 5:00 PM to 10:00 PM.');
                return;
            }
            
            // Advanced booking notice for luxury restaurant
            const timeDiff = selectedDate.getTime() - today.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            
            if (daysDiff < 1) {
                alert('We recommend booking at least 24 hours in advance for the best table availability.');
            }
            
            // Personalized success message
            let message = `Thank you for your reservation request, ${name}!`;
            
            if (seatingPref === 'terrace') {
                message += ' We\'ve noted your preference for outdoor terrace seating with city views.';
            } else if (seatingPref === 'window') {
                message += ' We\'ve noted your preference for window seating with panoramic views.';
            }
            
            if (occasion) {
                message += ` Our team will ensure your ${occasion} celebration is truly memorable.`;
            }
            
            message += ' Our reservations manager will contact you within 2 hours to confirm your table and discuss any special arrangements.';
            
            alert(message);
            this.reset();
        });
    }
    
    // Luxury navbar with premium styling
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(26, 26, 46, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.3)';
                navbar.style.borderBottom = '2px solid #D4AF37';
            } else {
                navbar.style.background = 'rgba(26, 26, 46, 0.95)';
                navbar.style.boxShadow = 'none';
                navbar.style.borderBottom = '1px solid #D4AF37';
            }
        });
    }
    
    // Intersection Observer for luxury fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature, .dining-card, .cocktail-item, .testimonial, .view-highlight, .event-feature');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 1s ease, transform 1s ease';
        observer.observe(el);
    });
    
    // Luxury feature hover effects with premium animations
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) scale(1.05)';
            this.style.boxShadow = '0 30px 60px rgba(26, 26, 46, 0.25)';
            
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.filter = 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.7))';
            }
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
            
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.filter = 'none';
            }
        });
    });
    
    // Dining card premium hover effects
    const diningCards = document.querySelectorAll('.dining-card');
    diningCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 25px 60px rgba(212, 175, 55, 0.4)';
            
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1)';
                img.style.filter = 'brightness(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
            
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
                img.style.filter = 'brightness(1)';
            }
        });
    });
    
    // Cocktail item sophisticated hover effects
    const cocktailItems = document.querySelectorAll('.cocktail-item');
    cocktailItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px) scale(1.02)';
            this.style.boxShadow = '0 12px 30px rgba(26, 26, 46, 0.2)';
            this.style.borderLeftWidth = '6px';
            this.style.borderLeftColor = '#FFD700';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = 'none';
            this.style.borderLeftWidth = '4px';
            this.style.borderLeftColor = '#D4AF37';
        });
    });
    
    // Testimonial hover effects
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach(testimonial => {
        testimonial.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.03)';
            this.style.boxShadow = '0 25px 60px rgba(26, 26, 46, 0.3)';
            
            const stars = this.querySelector('.stars');
            if (stars) {
                stars.style.transform = 'scale(1.2)';
                stars.style.filter = 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.8))';
            }
        });
        
        testimonial.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(26, 26, 46, 0.15)';
            
            const stars = this.querySelector('.stars');
            if (stars) {
                stars.style.transform = 'scale(1)';
                stars.style.filter = 'none';
            }
        });
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroVideo = document.querySelector('.hero-video img');
    
    if (hero && heroContent && heroVideo) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            const videoParallax = scrolled * 0.3;
            
            if (scrolled < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${parallax}px)`;
                heroVideo.style.transform = `translateY(${videoParallax}px) scale(1.1)`;
            }
        });
    }
    
    // Time-based greeting and ambiance
    function updateTimeBasedContent() {
        const hour = new Date().getHours();
        const heroDescription = document.querySelector('.hero-description');
        
        if (heroDescription) {
            if (hour >= 17 && hour < 19) {
                heroDescription.textContent = 'Experience golden hour dining with spectacular sunset views';
            } else if (hour >= 19 && hour < 22) {
                heroDescription.textContent = 'Elevated dining with breathtaking city lights';
            } else if (hour >= 22 || hour < 5) {
                heroDescription.textContent = 'Late night luxury with stunning nighttime panoramas';
            } else {
                heroDescription.textContent = 'Elevated dining with breathtaking city views';
            }
        }
    }
    
    updateTimeBasedContent();
    
    // Premium image lazy loading with fade effect
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                
                img.onload = function() {
                    this.style.opacity = '1';
                    this.style.transform = 'scale(1)';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Luxury button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
            
            if (this.classList.contains('btn-primary')) {
                this.style.boxShadow = '0 12px 30px rgba(212, 175, 55, 0.6)';
                this.style.filter = 'brightness(1.1)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.filter = 'brightness(1)';
        });
    });
    
    // Premium section title animations
    const sectionTitles = document.querySelectorAll('h2');
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target;
                title.style.transform = 'translateY(0)';
                title.style.opacity = '1';
                
                // Add gold shimmer effect
                setTimeout(() => {
                    title.style.textShadow = '0 0 20px rgba(212, 175, 55, 0.8)';
                    setTimeout(() => {
                        title.style.textShadow = 'none';
                    }, 1000);
                }, 500);
                
                titleObserver.unobserve(title);
            }
        });
    }, { threshold: 0.5 });
    
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        titleObserver.observe(title);
    });
    
    // Reservation urgency indicator
    function showReservationUrgency() {
        const reservationBtn = document.querySelector('.btn-primary');
        if (reservationBtn && reservationBtn.textContent.includes('Reserve')) {
            const hour = new Date().getHours();
            
            // Peak dining hours
            if ((hour >= 17 && hour <= 20) || (hour >= 12 && hour <= 14)) {
                reservationBtn.style.animation = 'pulse 2s infinite';
                reservationBtn.title = 'Peak dining hours - Reserve now for best availability';
            }
        }
    }
    
    // Add pulse animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3); }
            50% { box-shadow: 0 8px 25px rgba(212, 175, 55, 0.6), 0 0 30px rgba(212, 175, 55, 0.4); }
            100% { box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3); }
        }
    `;
    document.head.appendChild(style);
    
    showReservationUrgency();
    
    // Weather-based messaging (simulation)
    function updateWeatherMessage() {
        const weatherNote = document.createElement('div');
        weatherNote.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: rgba(26, 26, 46, 0.95);
            color: #D4AF37;
            padding: 15px 20px;
            border-radius: 10px;
            border: 1px solid #D4AF37;
            font-size: 0.9rem;
            z-index: 999;
            max-width: 300px;
            transition: all 0.3s ease;
        `;
        
        const hour = new Date().getHours();
        if (hour >= 17 && hour <= 19) {
            weatherNote.innerHTML = '🌅 Perfect sunset viewing conditions tonight!';
            document.body.appendChild(weatherNote);
            
            setTimeout(() => {
                weatherNote.style.opacity = '0';
                setTimeout(() => weatherNote.remove(), 300);
            }, 5000);
        }
    }
    
    // Show weather message after page load
    setTimeout(updateWeatherMessage, 3000);
    
    // Luxury service indicators
    const serviceIndicators = document.querySelectorAll('.contact-note p');
    serviceIndicators.forEach(indicator => {
        indicator.addEventListener('mouseenter', function() {
            this.style.color = '#D4AF37';
            this.style.transform = 'translateX(10px)';
            this.style.fontSize = '1.05em';
        });
        
        indicator.addEventListener('mouseleave', function() {
            this.style.color = '#1A1A2E';
            this.style.transform = 'translateX(0)';
            this.style.fontSize = '1em';
        });
    });
    
    // Enhanced scroll effects for luxury feel
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax for various elements
        const parallaxElements = document.querySelectorAll('.views-image img, .events-image img');
        parallaxElements.forEach(el => {
            el.style.transform = `translateY(${rate * 0.3}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
});