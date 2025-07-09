// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Here you would normally send the data to your server
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// Current location update functionality
function updateCurrentLocation(location, time, mapUrl) {
    const locationInfo = document.querySelector('.location-info p');
    const locationButton = document.querySelector('.location-button a');
    
    if (locationInfo) {
        locationInfo.textContent = `${location} - ${time}`;
    }
    
    if (locationButton) {
        locationButton.href = mapUrl;
    }
}

// Schedule highlighting for current day
function highlightCurrentDay() {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date().getDay();
    const currentDay = days[today];
    
    const scheduleDay = document.querySelector(`.schedule-day:nth-child(${today + 1})`);
    if (scheduleDay) {
        scheduleDay.style.border = '3px solid var(--primary-color)';
        scheduleDay.style.backgroundColor = 'var(--accent-color)';
    }
}

// Initialize current day highlighting
document.addEventListener('DOMContentLoaded', highlightCurrentDay);

// Social media integration
function shareLocation(platform, location, message) {
    const encodedMessage = encodeURIComponent(message);
    const encodedLocation = encodeURIComponent(location);
    
    let shareUrl = '';
    
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${encodedMessage}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${window.location.href}`;
            break;
        case 'instagram':
            alert('Please share on Instagram through the mobile app.');
            return;
        default:
            return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Live location tracking (would integrate with GPS in real implementation)
function trackLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                // Here you would send coordinates to your server
                console.log(`Current truck location: ${lat}, ${lon}`);
                
                // Update location display
                updateLocationDisplay(lat, lon);
            },
            function(error) {
                console.error('Error getting location:', error);
            }
        );
    } else {
        console.log('Geolocation not supported');
    }
}

function updateLocationDisplay(lat, lon) {
    // Convert coordinates to address (would use reverse geocoding API)
    const address = `Current Location: ${lat.toFixed(4)}, ${lon.toFixed(4)}`;
    const time = new Date().toLocaleTimeString();
    
    updateCurrentLocation(address, time, `https://maps.google.com/?q=${lat},${lon}`);
}

// Menu item availability toggle
function toggleMenuAvailability(itemId, available) {
    const menuItem = document.getElementById(itemId);
    if (menuItem) {
        if (available) {
            menuItem.classList.remove('sold-out');
            menuItem.querySelector('.availability').textContent = 'Available';
        } else {
            menuItem.classList.add('sold-out');
            menuItem.querySelector('.availability').textContent = 'Sold Out';
        }
    }
}

// Add sold-out styling
const soldOutStyle = `
.menu-item.sold-out {
    opacity: 0.6;
    position: relative;
}

.menu-item.sold-out::after {
    content: 'SOLD OUT';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--primary-color);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: bold;
    font-size: 1.2rem;
}
`;

// Add the sold-out styles to the document
const style = document.createElement('style');
style.textContent = soldOutStyle;
document.head.appendChild(style);

// Catering booking functionality
function bookCatering() {
    const eventDate = prompt('What date is your event? (MM/DD/YYYY)');
    const eventTime = prompt('What time? (e.g., 12:00 PM)');
    const guestCount = prompt('How many guests?');
    const location = prompt('Event location/address?');
    
    if (!eventDate || !eventTime || !guestCount || !location) {
        alert('Please provide all required information.');
        return;
    }
    
    // Store booking locally (in a real app, this would go to a server)
    const booking = {
        date: eventDate,
        time: eventTime,
        guests: parseInt(guestCount),
        location: location,
        timestamp: new Date().toISOString()
    };
    
    let bookings = JSON.parse(localStorage.getItem('cateringBookings')) || [];
    bookings.push(booking);
    localStorage.setItem('cateringBookings', JSON.stringify(bookings));
    
    alert('Catering request submitted! We will contact you within 24 hours to confirm details and pricing.');
}

// Add event listener for booking button
document.addEventListener('DOMContentLoaded', function() {
    const bookingButton = document.querySelector('.info-card .btn-outline');
    if (bookingButton) {
        bookingButton.addEventListener('click', function(e) {
            e.preventDefault();
            bookCatering();
        });
    }
});

// Newsletter signup
function subscribeNewsletter(email) {
    if (!email) {
        alert('Please enter your email address.');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Store subscription locally
    let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
    subscribers.push({
        email: email,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
    
    alert('Thank you for subscribing! You will receive updates about our locations and special offers.');
}

// Weather-based messaging
function updateWeatherMessage() {
    // In a real implementation, you would fetch weather data from an API
    const weatherConditions = ['sunny', 'rainy', 'snowy', 'cloudy'];
    const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    
    const weatherMessages = {
        sunny: "Perfect weather for food truck dining! See you outside!",
        rainy: "Rain or shine, we're serving up delicious food!",
        snowy: "Warm up with our hot, fresh food on this cold day!",
        cloudy: "Great day to grab some comfort food from our truck!"
    };
    
    const banner = document.querySelector('.current-location');
    if (banner) {
        const weatherDiv = document.createElement('div');
        weatherDiv.className = 'weather-message';
        weatherDiv.textContent = weatherMessages[randomWeather];
        weatherDiv.style.cssText = `
            background-color: var(--success-color);
            color: white;
            padding: 10px;
            text-align: center;
            font-weight: bold;
            margin-top: 10px;
            border-radius: 5px;
        `;
        banner.appendChild(weatherDiv);
    }
}

// Initialize weather message
document.addEventListener('DOMContentLoaded', updateWeatherMessage);

// Social media feed simulation
function loadSocialFeed() {
    const socialPosts = [
        {
            image: 'images/social-1.jpg',
            caption: 'Fresh tacos ready to serve at Downtown Plaza!'
        },
        {
            image: 'images/social-2.jpg',
            caption: 'Thanks to all our customers at the Music Festival!'
        },
        {
            image: 'images/social-3.jpg',
            caption: 'New Korean BBQ bowl - come try it!'
        },
        {
            image: 'images/social-4.jpg',
            caption: 'Beautiful day for food truck service!'
        }
    ];
    
    const socialGrid = document.querySelector('.social-grid');
    if (socialGrid) {
        socialGrid.innerHTML = '';
        
        socialPosts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'social-post';
            postDiv.innerHTML = `
                <img src="${post.image}" alt="Social Media Post">
                <div class="post-overlay">
                    <p>${post.caption}</p>
                </div>
            `;
            socialGrid.appendChild(postDiv);
        });
    }
}

// Real-time order status (would integrate with POS system)
function updateOrderStatus(orderId, status) {
    const statusMessages = {
        'received': 'Order received! Preparing your food...',
        'preparing': 'Your order is being prepared...',
        'ready': 'Your order is ready for pickup!',
        'completed': 'Order completed. Thank you!'
    };
    
    // In a real implementation, this would show notifications
    console.log(`Order ${orderId}: ${statusMessages[status]}`);
}

// Distance calculator for schedule locations
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Find nearest location
function findNearestLocation(userLat, userLon, locations) {
    let nearest = null;
    let minDistance = Infinity;
    
    locations.forEach(location => {
        const distance = calculateDistance(userLat, userLon, location.lat, location.lon);
        if (distance < minDistance) {
            minDistance = distance;
            nearest = location;
        }
    });
    
    return { location: nearest, distance: minDistance };
}

// Add scroll animations
function addScrollAnimations() {
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
    
    // Observe menu items and schedule days
    document.querySelectorAll('.menu-item, .schedule-day').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', addScrollAnimations);

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);