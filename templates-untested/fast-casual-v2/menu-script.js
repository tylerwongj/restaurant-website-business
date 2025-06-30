// Fast Casual v2 - Menu Page Script

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('nav-open');
            mobileToggle.classList.toggle('active');
        });
    }

    // Category Navigation
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show target category
            menuCategories.forEach(category => {
                category.classList.remove('active');
                if (category.id === targetCategory) {
                    category.classList.add('active');
                }
            });
            
            // Animate category change
            const targetElement = document.getElementById(targetCategory);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav && nav.classList.contains('nav-open')) {
                    nav.classList.remove('nav-open');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Menu Item Add Button Animation
    const addButtons = document.querySelectorAll('.btn-add');
    
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.style.background = '#48BB78';
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
                this.style.transform = '';
            }, 1500);
        });
    });

    // Menu Item Hover Effects
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        const price = item.querySelector('.price');
        
        item.addEventListener('mouseenter', function() {
            if (price) {
                price.style.transform = 'scale(1.1)';
                price.style.color = '#38A169';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (price) {
                price.style.transform = 'scale(1)';
                price.style.color = '';
            }
        });
    });

    // Badge Animation on Scroll
    const badgeItems = document.querySelectorAll('.item-badge');
    
    const badgeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pulse 0.6s ease';
            }
        });
    }, { threshold: 0.5 });
    
    badgeItems.forEach(badge => {
        badgeObserver.observe(badge);
    });

    // Category Auto-Update on Scroll
    const categoryObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const categoryId = entry.target.id;
                const correspondingButton = document.querySelector(`[data-category="${categoryId}"]`);
                
                if (correspondingButton) {
                    categoryButtons.forEach(btn => btn.classList.remove('active'));
                    correspondingButton.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    });
    
    menuCategories.forEach(category => {
        categoryObserver.observe(category);
    });

    // Order Button Click Tracking
    const orderButtons = document.querySelectorAll('.btn-primary, .btn-order');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Order button clicked:', this.textContent);
        });
    });

    // Menu Item Animation on Load
    const menuItemsForAnimation = document.querySelectorAll('.menu-item');
    
    const itemObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    menuItemsForAnimation.forEach(item => {
        itemObserver.observe(item);
    });

    // Keyboard Navigation for Categories
    document.addEventListener('keydown', function(e) {
        const activeButton = document.querySelector('.category-btn.active');
        const buttons = Array.from(categoryButtons);
        const currentIndex = buttons.indexOf(activeButton);
        
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            e.preventDefault();
            buttons[currentIndex - 1].click();
        } else if (e.key === 'ArrowRight' && currentIndex < buttons.length - 1) {
            e.preventDefault();
            buttons[currentIndex + 1].click();
        }
    });
});

// CSS for menu page specific styles (added via JavaScript)
const menuStyle = document.createElement('style');
menuStyle.textContent = `
    /* Menu Header */
    .menu-header {
        padding: 120px 0 60px;
        background: linear-gradient(135deg, var(--surface-color) 0%, white 100%);
        text-align: center;
    }
    
    .menu-header h1 {
        font-size: 3rem;
        font-weight: 600;
        color: var(--primary-color);
        margin-bottom: 1rem;
    }
    
    .menu-header p {
        font-size: 1.25rem;
        color: var(--text-light);
        margin-bottom: 2rem;
    }
    
    .menu-highlights {
        display: flex;
        justify-content: center;
        gap: 2rem;
        flex-wrap: wrap;
    }
    
    .highlight {
        background: var(--background-color);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        color: var(--text-color);
        box-shadow: var(--shadow);
    }
    
    /* Category Navigation */
    .category-nav {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 3rem;
        padding: 2rem 0;
        background: var(--surface-color);
        border-radius: 12px;
        overflow-x: auto;
    }
    
    .category-btn {
        background: transparent;
        border: 2px solid var(--border-color);
        color: var(--text-color);
        padding: 0.75rem 1.5rem;
        border-radius: 25px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
    }
    
    .category-btn:hover {
        border-color: var(--accent-color);
        color: var(--accent-color);
    }
    
    .category-btn.active {
        background: var(--accent-color);
        border-color: var(--accent-color);
        color: white;
    }
    
    /* Menu Categories */
    .menu-category {
        display: none;
        margin-bottom: 4rem;
    }
    
    .menu-category.active {
        display: block;
    }
    
    .category-header {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .category-header h2 {
        font-size: 2rem;
        font-weight: 600;
        color: var(--primary-color);
        margin-bottom: 0.5rem;
    }
    
    .category-header p {
        color: var(--text-light);
        font-size: 1.1rem;
    }
    
    /* Menu Grid Variations */
    .sides-grid {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
    
    .sides-grid .menu-item {
        background: var(--surface-color);
    }
    
    .sides-grid .menu-item-content {
        padding: 1.5rem;
    }
    
    /* Item Details */
    .item-details {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        font-size: 0.9rem;
    }
    
    .calories {
        color: var(--accent-color);
        font-weight: 500;
    }
    
    .prep-time {
        color: var(--text-light);
    }
    
    /* Item Badges */
    .item-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 500;
        color: white;
    }
    
    .item-badge.popular {
        background: #F56565;
    }
    
    .item-badge.new {
        background: var(--accent-color);
    }
    
    /* Order CTA */
    .order-cta {
        padding: 80px 0;
        background: var(--primary-color);
        color: white;
        text-align: center;
    }
    
    .order-cta h2 {
        font-size: 2.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }
    
    .order-cta p {
        font-size: 1.125rem;
        margin-bottom: 2rem;
        opacity: 0.9;
    }
    
    .order-options {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }
    
    .btn-primary.large {
        font-size: 1.25rem;
        padding: 1.25rem 3rem;
    }
    
    .delivery-apps {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
    }
    
    .delivery-apps span {
        opacity: 0.8;
    }
    
    .delivery-apps a {
        color: var(--accent-color);
        text-decoration: none;
        font-weight: 500;
    }
    
    /* Animations */
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .menu-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.4s ease;
    }
    
    .menu-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Mobile Responsive */
    @media (max-width: 768px) {
        .menu-header h1 {
            font-size: 2rem;
        }
        
        .menu-highlights {
            gap: 1rem;
        }
        
        .category-nav {
            padding: 1rem;
            gap: 0.5rem;
        }
        
        .category-btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
        }
        
        .delivery-apps {
            flex-direction: column;
            gap: 0.5rem;
        }
    }
`;

document.head.appendChild(menuStyle);