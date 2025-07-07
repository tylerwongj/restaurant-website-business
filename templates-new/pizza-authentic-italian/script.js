// Authentic Italian Pizza Template JavaScript

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    });
});

// Form submission handling
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Grazie! Your reservation request has been received. We will contact you shortly to confirm.');
        this.reset();
    });
});

// Menu tabs functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        
        // Remove active class from all tabs and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        this.classList.add('active');
        document.getElementById(targetTab)?.classList.add('active');
    });
});

// Set minimum date for reservations (today)
const today = new Date().toISOString().split('T')[0];
document.querySelectorAll('input[type="date"]').forEach(input => {
    input.setAttribute('min', today);
});

// Pizza card hover effects with Italian flair
document.querySelectorAll('.pizza-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
        this.style.boxShadow = '0 15px 40px rgba(200,16,46,0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
});

// Scroll animations for various elements
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

// Apply scroll animations
document.querySelectorAll('.specialty-card, .pizza-card, .menu-item, .wine-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Italian greeting based on time of day
function updateItalianGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting = '';
    
    if (hour < 12) {
        greeting = 'Buongiorno! ';
    } else if (hour < 17) {
        greeting = 'Buon pomeriggio! ';
    } else {
        greeting = 'Buonasera! ';
    }
    
    // Update hero subtitle if it exists
    const heroSubtitle = document.querySelector('.hero-content p');
    if (heroSubtitle && !heroSubtitle.textContent.includes('Buon')) {
        heroSubtitle.textContent = greeting + heroSubtitle.textContent;
    }
}

// Pizza cooking timer simulation
function addPizzaCookingEffect() {
    document.querySelectorAll('.pizza-time').forEach(timeElement => {
        timeElement.addEventListener('click', function() {
            const cookTime = this.textContent;
            alert(`Your pizza will be ready in ${cookTime}! It's cooking in our authentic wood-fired oven at 900°F.`);
            
            // Add a visual cooking effect
            this.style.background = '#f4c430';
            this.style.color = '#2c1810';
            this.textContent = 'Cooking...';
            
            setTimeout(() => {
                this.style.background = '#009246';
                this.style.color = 'white';
                this.textContent = cookTime;
            }, 3000);
        });
    });
}

// Wine pairing suggestions
function addWinePairingSuggestions() {
    const pizzaCards = document.querySelectorAll('.pizza-card');
    pizzaCards.forEach(card => {
        card.addEventListener('click', function() {
            const pizzaName = this.querySelector('h3').textContent;
            let pairing = '';
            
            if (pizzaName.toLowerCase().includes('margherita')) {
                pairing = 'Pairs beautifully with Chianti Classico or Sangiovese';
            } else if (pizzaName.toLowerCase().includes('marinara')) {
                pairing = 'Perfect with Pinot Grigio or Soave';
            } else if (pizzaName.toLowerCase().includes('quattro')) {
                pairing = 'Excellent with Barbera d\'Alba or Nero d\'Avola';
            } else {
                pairing = 'Ask our sommelier for the perfect Italian wine pairing!';
            }
            
            alert(`${pizzaName} - ${pairing}`);
        });
    });
}

// Order button enhancements
document.querySelectorAll('.order-option .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.textContent.includes('Order Now')) {
            e.preventDefault();
            alert('Ordinazione online coming soon! Please call us for now: ' + document.querySelector('.order-option p').textContent);
        }
    });
});

// Italian flag animation on scroll
function addItalianFlagEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        document.querySelectorAll('.specialty-icon').forEach(icon => {
            if (icon.textContent === '🔥') {
                icon.style.transform = `translateY(${rate}px)`;
            }
        });
    });
}

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Initialize all functions
updateItalianGreeting();
addPizzaCookingEffect();
addWinePairingSuggestions();
addItalianFlagEffect();

// Enable smooth scrolling for the whole document
document.documentElement.style.scrollBehavior = 'smooth';

// Special Italian touch - add "Mamma mia!" exclamation
document.querySelectorAll('.specialty-card').forEach(card => {
    card.addEventListener('click', function() {
        const specialty = this.querySelector('h3').textContent;
        alert(`Mamma mia! ${specialty} is what makes our pizza truly authentic! 🇮🇹`);
    });
});