// Five Guys Inspired Restaurant Template JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Location Finder Functionality
    const locationInput = document.querySelector('.location-input');
    const findLocationBtn = document.querySelector('.location-search .btn');
    
    if (locationInput && findLocationBtn) {
        findLocationBtn.addEventListener('click', function() {
            const location = locationInput.value.trim();
            if (location) {
                // Simulate location search
                showLocationResults(location);
            } else {
                alert('Please enter a ZIP code or city name');
            }
        });
        
        // Enter key support for location search
        locationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                findLocationBtn.click();
            }
        });
    }
    
    // Allergy Warning Banner Dismiss
    const allergyBanner = document.querySelector('.allergy-banner');
    if (allergyBanner) {
        // Add close button if not present
        if (!allergyBanner.querySelector('.close-btn')) {
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '×';
            closeBtn.className = 'close-btn';
            closeBtn.style.cssText = 'float: right; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #856404; margin-left: 10px;';
            allergyBanner.appendChild(closeBtn);
            
            closeBtn.addEventListener('click', function() {
                allergyBanner.style.display = 'none';
            });
        }
    }
    
    // Animate elements on scroll
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
    const animateElements = document.querySelectorAll('.quality-item, .menu-category, .heritage-text, .heritage-image');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Order button click tracking
    const orderButtons = document.querySelectorAll('.btn-order, .btn-primary');
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 100);
            
            // If it's an order button, you can add tracking here
            if (button.textContent.toLowerCase().includes('order')) {
                console.log('Order button clicked');
                // Add analytics tracking here if needed
            }
        });
    });
    
    // Phone number formatting for display
    const phoneNumbers = document.querySelectorAll('.location-phone');
    phoneNumbers.forEach(phone => {
        const phoneText = phone.textContent.replace(/\D/g, '');
        if (phoneText.length === 10) {
            const formatted = `(${phoneText.slice(0, 3)}) ${phoneText.slice(3, 6)}-${phoneText.slice(6)}`;
            phone.textContent = formatted;
        }
    });
    
    // Quality items hover effect
    const qualityItems = document.querySelectorAll('.quality-item');
    qualityItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Menu item hover effects
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.boxShadow = '0 4px 15px rgba(214, 45, 32, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const navbar = document.querySelector('.navbar');
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add CSS for navbar transition
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.transition = 'transform 0.3s ease';
    }
});

// Location Search Simulation
function showLocationResults(searchTerm) {
    const resultsHTML = `
        <div class="location-results" style="margin-top: 20px; padding: 20px; background: #f8f8f8; border-radius: 8px;">
            <h3 style="color: #d62d20; margin-bottom: 15px;">Locations near "${searchTerm}"</h3>
            <div class="location-result-item" style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px;">
                <h4 style="color: #333; margin-bottom: 5px;">Store #1234</h4>
                <p style="color: #666; margin-bottom: 5px;">123 Main Street, ${searchTerm}</p>
                <p style="color: #d62d20; font-weight: bold;">Open Now - Closes at 10:00 PM</p>
                <div style="margin-top: 10px;">
                    <button class="btn btn-primary" style="margin-right: 10px;">Get Directions</button>
                    <button class="btn btn-outline">Call Store</button>
                </div>
            </div>
            <div class="location-result-item" style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px;">
                <h4 style="color: #333; margin-bottom: 5px;">Store #5678</h4>
                <p style="color: #666; margin-bottom: 5px;">456 Oak Avenue, ${searchTerm}</p>
                <p style="color: #d62d20; font-weight: bold;">Open Now - Closes at 11:00 PM</p>
                <div style="margin-top: 10px;">
                    <button class="btn btn-primary" style="margin-right: 10px;">Get Directions</button>
                    <button class="btn btn-outline">Call Store</button>
                </div>
            </div>
        </div>
    `;
    
    const locationSection = document.querySelector('.locations .container');
    let existingResults = locationSection.querySelector('.location-results');
    
    if (existingResults) {
        existingResults.remove();
    }
    
    locationSection.insertAdjacentHTML('beforeend', resultsHTML);
    
    // Scroll to results
    const newResults = locationSection.querySelector('.location-results');
    newResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Utility function to format phone numbers
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
}

// Utility function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add loading state to buttons
function addLoadingState(button, originalText) {
    button.disabled = true;
    button.textContent = 'Loading...';
    button.style.opacity = '0.7';
    
    setTimeout(() => {
        button.disabled = false;
        button.textContent = originalText;
        button.style.opacity = '1';
    }, 1000);
}