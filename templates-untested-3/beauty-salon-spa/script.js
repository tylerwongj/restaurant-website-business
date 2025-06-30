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

// Smooth Scrolling
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

// Service Category Tabs
const categoryButtons = document.querySelectorAll('.category-btn');
const serviceCategories = document.querySelectorAll('.service-category');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and categories
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        serviceCategories.forEach(category => category.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding service category
        const targetCategory = button.getAttribute('data-category');
        const targetElement = document.querySelector(`[data-category="${targetCategory}"].service-category`);
        if (targetElement) {
            targetElement.classList.add('active');
        }
    });
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formInputs = this.querySelectorAll('input[type="text"]');
        const name = formInputs[0].value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const date = this.querySelector('input[type="date"]').value;
        const serviceCategory = this.querySelectorAll('select')[0].value;
        const preferredStylist = this.querySelectorAll('select')[1].value;
        const preferredTime = this.querySelectorAll('select')[2].value;
        const occasion = formInputs[1].value;
        const message = this.querySelector('textarea').value;
        const newsletter = this.querySelector('input[type="checkbox"]').checked;
        
        // Basic validation
        if (!name || !email || !phone || !date || !serviceCategory || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Date validation (can't be in the past)
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert('Please select a future date for your appointment.');
            return;
        }
        
        // Show success message (replace with actual form submission)
        const stylistText = preferredStylist ? ` with ${preferredStylist}` : '';
        const timeText = preferredTime ? ` in the ${preferredTime}` : '';
        const newsletterText = newsletter ? ' You\'ve also been subscribed to our newsletter for beauty tips and special offers.' : '';
        
        alert(`Thank you, ${name}! Your ${serviceCategory} appointment${stylistText} for ${date}${timeText} has been requested.${newsletterText} We'll contact you within 24 hours to confirm the details.`);
        this.reset();
        
        // TODO: Replace with actual form submission to your backend
        console.log('Appointment request:', {
            name,
            email,
            phone,
            date,
            serviceCategory,
            preferredStylist,
            preferredTime,
            occasion,
            message,
            newsletter,
            timestamp: new Date().toISOString()
        });
    });
}\n\n// Service Card Interactions\ndocument.querySelectorAll('.service-card').forEach(card => {\n    card.addEventListener('click', function() {\n        const serviceName = this.querySelector('h3').textContent;\n        const servicePrice = this.querySelector('.service-price').textContent;\n        const serviceDuration = this.querySelector('.service-duration').textContent;\n        \n        // TODO: Replace with actual service booking or detail page\n        alert(`Book your ${serviceName} service for ${servicePrice} (${serviceDuration}). Contact us to schedule your appointment!`);\n        console.log('Service clicked:', { serviceName, servicePrice, serviceDuration });\n    });\n});\n\n// Team Member Interactions\ndocument.querySelectorAll('.team-member').forEach(member => {\n    member.addEventListener('click', function() {\n        const memberName = this.querySelector('h3').textContent;\n        const memberTitle = this.querySelector('.member-title').textContent;\n        \n        // TODO: Replace with actual stylist booking or profile page\n        alert(`Book an appointment with ${memberName}, ${memberTitle}. Contact us to schedule your session!`);\n        console.log('Team member clicked:', { memberName, memberTitle });\n    });\n});\n\n// Gallery Image Interactions\ndocument.querySelectorAll('.gallery-item').forEach(item => {\n    item.addEventListener('click', function() {\n        const title = this.querySelector('h3').textContent;\n        const category = this.querySelector('p').textContent;\n        \n        // TODO: Replace with actual gallery lightbox or detail view\n        alert(`Viewing ${title} - ${category}. Inspired by this look? Book an appointment to achieve a similar style!`);\n        console.log('Gallery item clicked:', { title, category });\n    });\n});\n\n// Navbar Background Change on Scroll\nwindow.addEventListener('scroll', () => {\n    const navbar = document.querySelector('.navbar');\n    if (window.scrollY > 100) {\n        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';\n        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';\n    } else {\n        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';\n        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';\n    }\n});\n\n// Animation on Scroll\nconst observerOptions = {\n    threshold: 0.1,\n    rootMargin: '0px 0px -50px 0px'\n};\n\nconst observer = new IntersectionObserver(function(entries) {\n    entries.forEach(entry => {\n        if (entry.isIntersecting) {\n            entry.target.style.opacity = '1';\n            entry.target.style.transform = 'translateY(0)';\n        }\n    });\n}, observerOptions);\n\n// Observe elements for animation\ndocument.querySelectorAll('.service-card, .team-member, .gallery-item, .testimonial-card').forEach(el => {\n    el.style.opacity = '0';\n    el.style.transform = 'translateY(20px)';\n    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';\n    observer.observe(el);\n});\n\n// Statistics Counter Animation\nfunction animateCounter(element, target) {\n    let current = 0;\n    const increment = target / 100;\n    const timer = setInterval(() => {\n        current += increment;\n        if (current >= target) {\n            current = target;\n            clearInterval(timer);\n        }\n        element.textContent = Math.floor(current) + '+';\n    }, 25);\n}\n\n// Animate stats when they come into view\nconst statsObserver = new IntersectionObserver(function(entries) {\n    entries.forEach(entry => {\n        if (entry.isIntersecting) {\n            const statElements = entry.target.querySelectorAll('.stat h3');\n            statElements.forEach(stat => {\n                const text = stat.textContent;\n                const number = parseInt(text.replace(/\\D/g, ''));\n                if (number) {\n                    animateCounter(stat, number);\n                }\n            });\n            statsObserver.unobserve(entry.target);\n        }\n    });\n}, observerOptions);\n\nconst statsSection = document.querySelector('.salon-stats');\nif (statsSection) {\n    statsObserver.observe(statsSection);\n}\n\n// Service Category Auto-selection from URL\nconst serviceCategorySelect = document.querySelector('select');\nif (serviceCategorySelect) {\n    // Check if user came from a specific service link\n    const urlParams = new URLSearchParams(window.location.search);\n    const serviceParam = urlParams.get('service');\n    \n    if (serviceParam) {\n        // Auto-select the service category based on URL parameter\n        const option = Array.from(serviceCategorySelect.options).find(opt => \n            opt.value.toLowerCase().includes(serviceParam.toLowerCase())\n        );\n        if (option) {\n            option.selected = true;\n        }\n        \n        // Also switch to the corresponding tab\n        const correspondingTab = document.querySelector(`[data-category=\"${serviceParam}\"]`);\n        if (correspondingTab && correspondingTab.classList.contains('category-btn')) {\n            correspondingTab.click();\n        }\n    }\n}\n\n// Form validation feedback\nconst formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');\nformInputs.forEach(input => {\n    input.addEventListener('blur', function() {\n        if (this.hasAttribute('required') && !this.value.trim()) {\n            this.style.borderColor = '#ef4444';\n        } else {\n            this.style.borderColor = '#e5e7eb';\n        }\n    });\n    \n    input.addEventListener('focus', function() {\n        this.style.borderColor = '#e91e63';\n    });\n});\n\n// Special Offers Highlight\ndocument.querySelectorAll('.offer').forEach(offer => {\n    offer.addEventListener('mouseenter', function() {\n        this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';\n        this.style.borderRadius = '8px';\n        this.style.padding = '1rem';\n        this.style.margin = '0.5rem 0';\n    });\n    \n    offer.addEventListener('mouseleave', function() {\n        this.style.backgroundColor = 'transparent';\n        this.style.padding = '0';\n        this.style.margin = '0 0 1.5rem 0';\n    });\n});\n\n// Testimonial Star Rating Animation\ndocument.querySelectorAll('.stars').forEach(stars => {\n    stars.addEventListener('mouseenter', function() {\n        this.style.transform = 'scale(1.1)';\n        this.style.transition = 'transform 0.3s ease';\n    });\n    \n    stars.addEventListener('mouseleave', function() {\n        this.style.transform = 'scale(1)';\n    });\n});\n\n// Initialize date picker with minimum date as today\nconst dateInput = document.querySelector('input[type=\"date\"]');\nif (dateInput) {\n    const today = new Date().toISOString().split('T')[0];\n    dateInput.setAttribute('min', today);\n    \n    // Set max date to 3 months from now\n    const maxDate = new Date();\n    maxDate.setMonth(maxDate.getMonth() + 3);\n    dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);\n}\n\n// Service recommendation based on time of day\nfunction recommendService() {\n    const hour = new Date().getHours();\n    let recommendation = '';\n    \n    if (hour >= 9 && hour < 12) {\n        recommendation = 'Morning appointments are perfect for facial treatments!';\n    } else if (hour >= 12 && hour < 17) {\n        recommendation = 'Afternoon is ideal for hair styling and nail services!';\n    } else if (hour >= 17 && hour < 20) {\n        recommendation = 'Evening appointments are great for spa treatments and relaxation!';\n    }\n    \n    if (recommendation) {\n        // You could display this recommendation somewhere on the page\n        console.log('Service recommendation:', recommendation);\n    }\n}\n\n// Call recommendation function\nrecommendService();\n\n// Social media sharing for gallery items\nfunction shareGalleryItem(platform, title, imageUrl) {\n    const url = encodeURIComponent(window.location.href);\n    const text = encodeURIComponent(`Check out this amazing ${title} at our salon!`);\n    \n    let shareUrl;\n    switch (platform) {\n        case 'instagram':\n            // Instagram doesn't support direct sharing via URL, so we'll copy to clipboard\n            navigator.clipboard.writeText(`${title} - ${window.location.href}`);\n            alert('Link copied to clipboard! Share it on Instagram.');\n            return;\n        case 'facebook':\n            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;\n            break;\n        case 'pinterest':\n            shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${text}&media=${encodeURIComponent(imageUrl)}`;\n            break;\n    }\n    \n    if (shareUrl) {\n        window.open(shareUrl, '_blank', 'width=600,height=400');\n    }\n}\n\n// Make share function globally available\nwindow.shareGalleryItem = shareGalleryItem;\n\n// Booking time slot availability (simple simulation)\nfunction checkTimeAvailability(date, time) {\n    // This is a simple simulation - in reality, you'd check with your booking system\n    const unavailableTimes = {\n        '2024-07-01': ['morning'],\n        '2024-07-02': ['afternoon'],\n        '2024-07-03': ['evening']\n    };\n    \n    const dateStr = new Date(date).toISOString().split('T')[0];\n    const unavailable = unavailableTimes[dateStr] || [];\n    \n    return !unavailable.includes(time);\n}\n\n// Update time slot availability when date changes\nif (dateInput) {\n    dateInput.addEventListener('change', function() {\n        const selectedDate = this.value;\n        const timeSelect = document.querySelector('select:nth-of-type(3)');\n        \n        if (timeSelect && selectedDate) {\n            Array.from(timeSelect.options).forEach(option => {\n                if (option.value) {\n                    const isAvailable = checkTimeAvailability(selectedDate, option.value);\n                    option.disabled = !isAvailable;\n                    option.textContent = option.textContent.replace(' (Unavailable)', '');\n                    if (!isAvailable) {\n                        option.textContent += ' (Unavailable)';\n                    }\n                }\n            });\n        }\n    });\n}"