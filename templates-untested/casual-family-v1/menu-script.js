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

// Menu Category Navigation
document.addEventListener('DOMContentLoaded', () => {
    const menuNavBtns = document.querySelectorAll('.menu-nav-btn');
    const menuCategories = document.querySelectorAll('.menu-category');

    menuNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetCategory = btn.getAttribute('data-category');

            // Remove active class from all buttons and categories
            menuNavBtns.forEach(b => b.classList.remove('active'));
            menuCategories.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button and corresponding category
            btn.classList.add('active');
            document.getElementById(targetCategory).classList.add('active');
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// Animation on scroll for menu items
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

// Observe menu items for animation
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item-full');
    
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
});

// Add CSS for menu-specific styles
const menuStyles = `
    .menu-hero {
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        padding: 120px 0 80px;
        text-align: center;
        color: white;
        margin-top: 80px;
    }

    .menu-hero-content h1 {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 20px;
    }

    .menu-hero-content p {
        font-size: 1.2rem;
        opacity: 0.9;
        max-width: 600px;
        margin: 0 auto;
    }

    .menu-section {
        padding: 80px 0;
        background: var(--background-light);
    }

    .menu-nav {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-bottom: 60px;
        flex-wrap: wrap;
    }

    .menu-nav-btn {
        padding: 12px 30px;
        border: 2px solid var(--primary-color);
        background: transparent;
        color: var(--primary-color);
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .menu-nav-btn:hover,
    .menu-nav-btn.active {
        background: var(--primary-color);
        color: white;
        transform: translateY(-2px);
    }

    .menu-category {
        display: none;
    }

    .menu-category.active {
        display: block;
    }

    .menu-category h2 {
        font-size: 2.5rem;
        text-align: center;
        margin-bottom: 50px;
        color: var(--text-dark);
    }

    .menu-items {
        max-width: 800px;
        margin: 0 auto;
    }

    .menu-item-full {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 30px;
        margin-bottom: 20px;
        background: var(--background-card);
        border-radius: 15px;
        box-shadow: 0 5px 15px var(--shadow-light);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .menu-item-full:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 25px var(--shadow-medium);
    }

    .menu-item-info {
        flex: 1;
        margin-right: 20px;
    }

    .menu-item-info h3 {
        font-size: 1.3rem;
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 10px;
    }

    .menu-item-info p {
        color: var(--text-light);
        line-height: 1.6;
        margin-bottom: 10px;
    }

    .menu-item-details {
        margin-top: 10px;
    }

    .allergens {
        font-size: 0.9rem;
        color: var(--text-muted);
        font-style: italic;
    }

    .menu-item-price {
        font-size: 1.4rem;
        font-weight: 700;
        color: var(--primary-color);
        flex-shrink: 0;
    }

    .menu-cta {
        background: var(--background-section);
        padding: 80px 0;
        text-align: center;
    }

    .cta-content h2 {
        font-size: 2.5rem;
        color: var(--text-dark);
        margin-bottom: 15px;
    }

    .cta-content p {
        font-size: 1.1rem;
        color: var(--text-light);
        margin-bottom: 40px;
    }

    .cta-buttons {
        display: flex;
        gap: 20px;
        justify-content: center;
        flex-wrap: wrap;
    }

    .nav-menu a.active {
        color: var(--primary-color) !important;
        font-weight: 600;
    }

    @media (max-width: 768px) {
        .menu-hero-content h1 {
            font-size: 2.5rem;
        }

        .menu-nav {
            gap: 15px;
        }

        .menu-nav-btn {
            padding: 10px 20px;
            font-size: 0.9rem;
        }

        .menu-category h2 {
            font-size: 2rem;
        }

        .menu-item-full {
            flex-direction: column;
            text-align: center;
        }

        .menu-item-info {
            margin-right: 0;
            margin-bottom: 15px;
        }

        .menu-item-price {
            font-size: 1.6rem;
        }

        .cta-buttons {
            flex-direction: column;
            align-items: center;
        }
    }
`;

// Add the styles to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = menuStyles;
document.head.appendChild(styleSheet);