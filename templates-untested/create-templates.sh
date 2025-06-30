#!/bin/bash

# Script to create all restaurant templates with variations
# This creates a comprehensive set of templates for the restaurant website business

BASE_DIR="/Users/tyler/p2/restaurant-website-business/templates-untested"

# Template categories and their design variations
declare -A TEMPLATES=(
    ["fine-dining"]="elegant-dark modern-luxury classic-upscale contemporary-chic sophisticated-minimal"
    ["fast-casual"]="vibrant-modern industrial-chic clean-simple bold-colorful urban-fresh"
    ["pizza-italian"]="traditional-rustic modern-italian cozy-family authentic-classic contemporary-wood"
    ["cafe-bistro"]="parisian-chic modern-minimalist warm-cozy artisan-craft european-elegant"
    ["steakhouse"]="dark-masculine western-rustic modern-steakhouse premium-classic bold-industrial"
    ["seafood"]="coastal-fresh nautical-blue ocean-modern marina-elegant lighthouse-classic"
    ["asian-fusion"]="zen-minimal modern-asian bamboo-natural contemporary-fusion traditional-elegant"
    ["mexican"]="vibrant-fiesta warm-hacienda modern-mexican traditional-cantina colorful-festive"
    ["bakery-dessert"]="sweet-pastel artisan-craft french-patisserie modern-bakery cozy-homestyle"
)

# Color schemes for different variations
declare -A COLOR_SCHEMES=(
    ["v1"]="--primary-color: #2c3e50; --secondary-color: #34495e; --accent-color: #95a5a6;"
    ["v2"]="--primary-color: #8e44ad; --secondary-color: #9b59b6; --accent-color: #af7ac5;"
    ["v3"]="--primary-color: #e74c3c; --secondary-color: #c0392b; --accent-color: #ec7063;"
    ["v4"]="--primary-color: #27ae60; --secondary-color: #2ecc71; --accent-color: #58d68d;"
    ["v5"]="--primary-color: #f39c12; --secondary-color: #e67e22; --accent-color: #f8c471;"
)

# Function to create basic template files
create_template() {
    local template_type="$1"
    local variation="$2"
    local dir="$BASE_DIR/${template_type}-${variation}"
    
    echo "Creating ${template_type}-${variation}..."
    
    # Create index.html
    cat > "$dir/index.html" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{RESTAURANT_NAME}} - {{CUISINE_TYPE}} Restaurant</title>
    <meta name="description" content="{{RESTAURANT_NAME}} - {{DESCRIPTION}}">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo">
                <img src="{{LOGO_URL}}" alt="{{RESTAURANT_NAME}} Logo">
                <span class="logo-text">{{RESTAURANT_NAME}}</span>
            </div>
            <ul class="nav-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#menu">Menu</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <div class="hamburger">
                <span></span><span></span><span></span>
            </div>
        </div>
    </nav>

    <section id="home" class="hero">
        <div class="hero-content">
            <h1>{{RESTAURANT_NAME}}</h1>
            <p class="hero-subtitle">{{TAGLINE}}</p>
            <div class="hero-buttons">
                <a href="#menu" class="btn btn-primary">View Menu</a>
                <a href="tel:{{PHONE}}" class="btn btn-secondary">Call Now</a>
            </div>
        </div>
    </section>

    <section id="about" class="about">
        <div class="container">
            <h2>About {{RESTAURANT_NAME}}</h2>
            <p>{{ABOUT_DESCRIPTION}}</p>
        </div>
    </section>

    <section id="menu" class="menu-preview">
        <div class="container">
            <h2>Our Menu</h2>
            <div class="menu-items">
                <div class="menu-item">
                    <img src="{{FOOD_IMAGE_1}}" alt="{{MENU_ITEM_1}}">
                    <h3>{{MENU_ITEM_1}}</h3>
                    <p>{{MENU_DESCRIPTION_1}}</p>
                    <span class="price">${{PRICE_1}}</span>
                </div>
                <div class="menu-item">
                    <img src="{{FOOD_IMAGE_2}}" alt="{{MENU_ITEM_2}}">
                    <h3>{{MENU_ITEM_2}}</h3>
                    <p>{{MENU_DESCRIPTION_2}}</p>
                    <span class="price">${{PRICE_2}}</span>
                </div>
            </div>
            <a href="menu.html" class="btn btn-primary">Full Menu</a>
        </div>
    </section>

    <section id="contact" class="contact">
        <div class="container">
            <h2>Contact Us</h2>
            <div class="contact-info">
                <p>{{FULL_ADDRESS}}</p>
                <p>Phone: <a href="tel:{{PHONE}}">{{PHONE}}</a></p>
                <p>Email: <a href="mailto:{{EMAIL}}">{{EMAIL}}</a></p>
            </div>
            <form class="contact-form">
                <input type="text" name="name" placeholder="Your Name" required>
                <input type="email" name="email" placeholder="Your Email" required>
                <textarea name="message" placeholder="Your Message" required></textarea>
                <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 {{RESTAURANT_NAME}}. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
EOF

    # Create styles.css with variation-specific colors
    local colors="${COLOR_SCHEMES[$variation]}"
    cat > "$dir/styles.css" << EOF
:root {
    $colors
    --text-dark: #2c3e50;
    --text-light: #7f8c8d;
    --background-light: #ffffff;
    --background-section: #f8f9fa;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: var(--text-dark);
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

.navbar {
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
}

.logo { display: flex; align-items: center; gap: 10px; }
.logo img { height: 50px; }
.logo-text { font-size: 1.5rem; font-weight: 700; color: var(--primary-color); }

.nav-menu {
    display: flex;
    list-style: none;
    gap: 30px;
}

.nav-menu a {
    text-decoration: none;
    color: var(--text-dark);
    font-weight: 500;
    transition: color 0.3s ease;
}

.nav-menu a:hover { color: var(--primary-color); }

.hero {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: 150px 0 100px;
    text-align: center;
    margin-top: 70px;
}

.hero h1 { font-size: 3rem; margin-bottom: 20px; }
.hero-subtitle { font-size: 1.2rem; margin-bottom: 30px; }

.btn {
    display: inline-block;
    padding: 12px 30px;
    text-decoration: none;
    border-radius: 5px;
    font-weight: 600;
    margin: 0 10px;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
}

.btn-primary {
    background: var(--primary-color);
    color: white;
}

.btn-secondary {
    background: var(--secondary-color);
    color: white;
}

.btn:hover { transform: translateY(-2px); }

.about, .menu-preview, .contact {
    padding: 80px 0;
}

.about { background: var(--background-section); }

.about h2, .menu-preview h2, .contact h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 50px;
    color: var(--text-dark);
}

.menu-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 50px;
}

.menu-item {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.menu-item:hover { transform: translateY(-5px); }
.menu-item img { width: 100%; height: 200px; object-fit: cover; }
.menu-item h3 { padding: 20px 20px 10px; color: var(--text-dark); }
.menu-item p { padding: 0 20px; color: var(--text-light); }
.menu-price { padding: 20px; font-weight: 700; color: var(--primary-color); }

.contact-form {
    max-width: 600px;
    margin: 0 auto;
}

.contact-form input,
.contact-form textarea {
    width: 100%;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
}

.footer {
    background: var(--text-dark);
    color: white;
    text-align: center;
    padding: 30px 0;
}

.hamburger {
    display: none;
    flex-direction: column;
    cursor: pointer;
}

.hamburger span {
    width: 25px;
    height: 3px;
    background: var(--text-dark);
    margin: 3px 0;
    transition: 0.3s;
}

@media (max-width: 768px) {
    .hamburger { display: flex; }
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background-color: white;
        width: 100%;
        text-align: center;
        transition: 0.3s;
        box-shadow: 0 10px 27px rgba(0,0,0,0.05);
        padding: 20px 0;
    }
    .nav-menu.active { left: 0; }
    .hero h1 { font-size: 2rem; }
    .menu-items { grid-template-columns: 1fr; }
}
EOF

    # Create basic script.js
    cat > "$dir/script.js" << 'EOF'
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}
EOF

    # Create basic menu.html
    cat > "$dir/menu.html" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu - {{RESTAURANT_NAME}}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo">
                <img src="{{LOGO_URL}}" alt="{{RESTAURANT_NAME}} Logo">
                <span class="logo-text">{{RESTAURANT_NAME}}</span>
            </div>
            <ul class="nav-menu">
                <li><a href="index.html">Home</a></li>
                <li><a href="#menu">Menu</a></li>
                <li><a href="index.html#about">About</a></li>
                <li><a href="index.html#contact">Contact</a></li>
            </ul>
            <div class="hamburger">
                <span></span><span></span><span></span>
            </div>
        </div>
    </nav>

    <section class="menu-page" style="margin-top: 70px; padding: 80px 0;">
        <div class="container">
            <h1 style="text-align: center; margin-bottom: 50px;">Our Full Menu</h1>
            
            <div class="menu-category">
                <h2>Appetizers</h2>
                <div class="menu-item-list">
                    <div class="menu-item-full">
                        <div>
                            <h3>{{APPETIZER_1_NAME}}</h3>
                            <p>{{APPETIZER_1_DESCRIPTION}}</p>
                        </div>
                        <span class="price">${{APPETIZER_1_PRICE}}</span>
                    </div>
                </div>
            </div>

            <div class="menu-category">
                <h2>Main Courses</h2>
                <div class="menu-item-list">
                    <div class="menu-item-full">
                        <div>
                            <h3>{{ENTREE_1_NAME}}</h3>
                            <p>{{ENTREE_1_DESCRIPTION}}</p>
                        </div>
                        <span class="price">${{ENTREE_1_PRICE}}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 {{RESTAURANT_NAME}}. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
EOF

    echo "✓ Created ${template_type}-${variation}"
}

# Create all templates
for template_type in "${!TEMPLATES[@]}"; do
    for i in {1..5}; do
        create_template "$template_type" "v$i"
    done
done

echo "All templates created successfully!"
EOF