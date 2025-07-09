// Modern Steakhouse Premium Template JavaScript

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(15, 15, 15, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 15, 15, 0.95)';
        }
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

    // Menu category switching
    const menuCategories = document.querySelectorAll('.menu-category');
    const menuGrids = document.querySelectorAll('.menu-grid');

    menuCategories.forEach(category => {
        category.addEventListener('click', function() {
            // Remove active class from all categories
            menuCategories.forEach(cat => cat.classList.remove('active'));
            // Add active class to clicked category
            this.classList.add('active');

            // Hide all menu grids
            menuGrids.forEach(grid => {
                grid.style.display = 'none';
                grid.classList.remove('active');
            });

            // Show selected category grid
            const targetCategory = this.getAttribute('data-category');
            const targetGrid = document.getElementById(targetCategory);
            if (targetGrid) {
                targetGrid.style.display = 'grid';
                targetGrid.classList.add('active');
                
                // Animate menu items
                const menuItems = targetGrid.querySelectorAll('.menu-item');
                menuItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.transition = 'all 0.5s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100);
                });
            }
        });
    });

    // Reservation form handling
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Simple form validation
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                } else {
                    field.style.borderColor = '#333333';
                }
            });

            if (isValid) {
                // Show success message
                showNotification('Reservation request submitted! We will contact you shortly to confirm.', 'success');
                this.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.experience-content, .experience-image, .menu-item, .wine-info, .wine-image, .private-content, .private-image, .contact-info, .contact-form').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-background');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Menu item hover effects
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Wine counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.wine-number');
        
        counters.forEach(counter => {
            const target = counter.innerText;
            const numericTarget = parseInt(target.replace(/\D/g, ''));
            
            if (numericTarget) {
                let current = 0;
                const increment = numericTarget / 100;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericTarget) {
                        counter.innerText = target;
                        clearInterval(timer);
                    } else {
                        counter.innerText = Math.floor(current) + (target.includes('+') ? '+' : '');
                    }
                }, 20);
            }
        });
    }

    // Trigger counter animation when wine section is visible
    const wineSection = document.querySelector('.wine-section');
    if (wineSection) {
        const wineObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    wineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        wineObserver.observe(wineSection);
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        margin-left: 10px;
    `;

    closeBtn.addEventListener('click', function() {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);

    document.body.appendChild(notification);
}

// Add keyframe animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .animate-in {
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

    .menu-item {
        transition: all 0.3s ease;
    }

    .menu-item:hover .menu-item-image img {
        transform: scale(1.05);
        transition: transform 0.3s ease;
    }

    .hero-background img {
        transition: transform 0.1s ease-out;
    }
`;

document.head.appendChild(style);