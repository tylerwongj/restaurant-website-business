// Menu page specific functionality

// Animate menu items on scroll
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe menu rows for animation
    const menuRows = document.querySelectorAll('.menu-row');
    menuRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        row.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(row);
    });
    
    // Observe menu sections for animation
    const menuSections = document.querySelectorAll('.menu-section');
    menuSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(section);
    });
});

// Add hover effects to menu items
document.addEventListener('DOMContentLoaded', function() {
    const menuRows = document.querySelectorAll('.menu-row');
    
    menuRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--secondary-color)';
            this.style.borderRadius = '8px';
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.transform = 'translateX(0)';
        });
    });
});

// Menu navigation scroll spy (if needed for menu categories)
document.addEventListener('DOMContentLoaded', function() {
    const menuSections = document.querySelectorAll('.menu-section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    function updateActiveSection() {
        const scrollPos = window.scrollY + 100;
        
        menuSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                const sectionId = section.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveSection);
});

// Price highlighting effect
document.addEventListener('DOMContentLoaded', function() {
    const prices = document.querySelectorAll('.item-price');
    
    prices.forEach(price => {
        price.addEventListener('mouseenter', function() {
            this.style.color = 'var(--primary-color)';
            this.style.fontWeight = '600';
            this.style.transition = 'all 0.3s ease';
        });
        
        price.addEventListener('mouseleave', function() {
            this.style.color = 'var(--accent-color)';
            this.style.fontWeight = '500';
        });
    });
});

// Menu section headers animation
document.addEventListener('DOMContentLoaded', function() {
    const sectionHeaders = document.querySelectorAll('.menu-section h2');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.borderBottom = '2px solid var(--accent-color)';
                entry.target.style.color = 'var(--accent-color)';
                entry.target.style.transition = 'all 0.5s ease';
            }
        });
    }, {
        threshold: 0.5
    });
    
    sectionHeaders.forEach(header => {
        observer.observe(header);
    });
});