// McDonald's Style Template - Mobile-First JavaScript

// App banner functionality
function closeAppBanner() {
    const banner = document.querySelector('.app-banner');
    banner.style.display = 'none';
    // Store preference in localStorage
    localStorage.setItem('appBannerClosed', 'true');
}

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
}

// Location finder functionality
function findLocations() {
    const input = document.getElementById('location-input');
    const query = input.value.trim();
    
    if (!query) {
        alert('Please enter a location to search');
        return;
    }
    
    // In a real implementation, this would make an API call
    console.log('Searching for locations near:', query);
    
    // Simulate loading and updating results
    const results = document.querySelector('.location-results');
    results.innerHTML = '<p>Searching for locations...</p>';
    
    setTimeout(() => {
        results.innerHTML = `
            <div class="location-card">
                <h3>Location found near ${query}</h3>
                <p class="location-address">123 Main Street, ${query}</p>
                <div class="location-features">
                    <span class="feature-tag">Drive-Thru</span>
                    <span class="feature-tag">Mobile Order</span>
                    <span class="feature-tag">Delivery</span>
                </div>
                <div class="location-actions">
                    <a href="#" class="btn btn-outline">Directions</a>
                    <a href="#order" class="btn btn-primary">Order Now</a>
                </div>
            </div>
        `;
    }, 1000);
}

// Filter functionality for locations
function setupLocationFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            console.log('Filtering by:', filter);
            
            // In a real implementation, this would filter the results
        });
    });
}

// Product details modal functionality
function showProductDetails(productId) {
    // In a real implementation, this would show detailed product information
    alert(`Showing details for product: ${productId}`);
}

// Delivery zone checker
function showDeliveryZones() {
    const input = document.getElementById('location-input');
    const location = input.value.trim() || 'your area';
    alert(`Checking delivery availability for ${location}...`);
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 120; // Account for sticky headers
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Order tracking functionality
function trackOrder() {
    const orderNumber = prompt('Enter your order number:');
    if (orderNumber) {
        alert(`Tracking order ${orderNumber}... (This would integrate with order tracking system)`);
    }
}

// Newsletter signup
function setupNewsletterSignup() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                alert(`Thank you for subscribing with email: ${email}`);
                this.reset();
            }
        });
    });
}

// Intersection Observer for animations
function setupScrollAnimations() {
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
    
    // Observe product cards and other elements
    document.querySelectorAll('.product-card, .deal-card, .menu-category').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Handle mobile app redirects
function handleAppRedirect(store) {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        // iOS device
        if (store === 'ios') {
            window.open('https://apps.apple.com/app/mcdonalds', '_blank');
        }
    } else if (/android/i.test(userAgent)) {
        // Android device
        if (store === 'android') {
            window.open('https://play.google.com/store/apps/details?id=com.mcdonalds.app', '_blank');
        }
    }
}

// Setup app download buttons
function setupAppDownloads() {
    document.querySelectorAll('a[href*="apps.apple.com"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            handleAppRedirect('ios');
        });
    });
    
    document.querySelectorAll('a[href*="play.google.com"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            handleAppRedirect('android');
        });
    });
}

// Add to favorites functionality
function addToFavorites(itemId) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (!favorites.includes(itemId)) {
        favorites.push(itemId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Added to favorites!');
    } else {
        alert('Already in favorites!');
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if app banner should be hidden
    if (localStorage.getItem('appBannerClosed') === 'true') {
        const banner = document.querySelector('.app-banner');
        if (banner) banner.style.display = 'none';
    }
    
    // Setup all functionality
    setupLocationFilters();
    setupSmoothScrolling();
    setupNewsletterSignup();
    setupScrollAnimations();
    setupAppDownloads();
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const mobileMenu = document.getElementById('mobile-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (mobileMenu && mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // Handle Enter key in location search
    document.getElementById('location-input')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            findLocations();
        }
    });
    
    // Add click-to-call functionality for phone numbers
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            // Track phone call analytics if needed
            console.log('Phone call initiated:', this.href);
        });
    });
    
    // Handle order button clicks
    document.querySelectorAll('a[href="#order"], .btn-order, .btn-product').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, this would redirect to the ordering system
            alert('Redirecting to online ordering system...');
        });
    });
    
    // Add loading states for buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
    
    console.log('McDonald\'s style template initialized successfully!');
});

// Handle window resize for mobile menu
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
});

// Add some CSS for loading states
const style = document.createElement('style');
style.textContent = `
    .btn.loading {
        opacity: 0.7;
        pointer-events: none;
        position: relative;
    }
    
    .btn.loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16px;
        height: 16px;
        margin: -8px 0 0 -8px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);