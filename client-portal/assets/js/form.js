// Main form functionality and JSON export

class RestaurantFormManager {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 6;
        this.formData = {};
        this.menuItems = [];
        
        this.initializeForm();
    }

    initializeForm() {
        document.addEventListener('DOMContentLoaded', () => {
            this.updateProgress();
            this.addInitialMenuItems();
            this.setupAutoSave();
        });
    }

    nextStep() {
        // Validate current step
        if (!validator.validateStep(this.currentStep)) {
            return;
        }

        // Save current step data
        this.saveStepData(this.currentStep);

        if (this.currentStep < this.totalSteps) {
            this.showStep(this.currentStep + 1);
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.showStep(this.currentStep - 1);
        }
    }

    showStep(stepNumber) {
        // Hide current step
        const currentStepElement = document.getElementById(`step${this.currentStep}`);
        if (currentStepElement) {
            currentStepElement.classList.remove('active');
        }

        // Show new step
        const newStepElement = document.getElementById(`step${stepNumber}`);
        if (newStepElement) {
            newStepElement.classList.add('active');
            this.currentStep = stepNumber;
            this.updateProgress();

            // Special handling for review step
            if (stepNumber === 6) {
                this.populateReview();
            }
        }
    }

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill && progressText) {
            const percentage = (this.currentStep / this.totalSteps) * 100;
            progressFill.style.width = `${percentage}%`;
            progressText.textContent = `Step ${this.currentStep} of ${this.totalSteps}`;
        }
    }

    saveStepData(stepNumber) {
        const stepElement = document.getElementById(`step${stepNumber}`);
        const inputs = stepElement.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            if (input.type === 'file') {
                // File inputs are handled by imageManager
                return;
            }
            
            const key = input.name || input.id;
            this.formData[key] = input.value;
        });

        // Save menu items separately
        if (stepNumber === 4) {
            this.saveMenuData();
        }

        // Save hours data
        if (stepNumber === 3) {
            this.saveHoursData();
        }
    }

    saveMenuData() {
        this.menuItems = [];
        const menuItemElements = document.querySelectorAll('.menu-item');
        
        menuItemElements.forEach((item, index) => {
            const nameField = item.querySelector('[name$="Name"]');
            const descField = item.querySelector('[name$="Description"]');
            const priceField = item.querySelector('[name$="Price"]');
            
            if (nameField && descField && priceField) {
                this.menuItems.push({
                    name: nameField.value,
                    description: descField.value,
                    price: priceField.value,
                    index: index + 1
                });
            }
        });
    }

    saveHoursData() {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        
        days.forEach(day => {
            const openSelect = document.querySelector(`[name="${day}Open"]`);
            const closeSelect = document.querySelector(`[name="${day}Close"]`);
            
            if (openSelect && closeSelect) {
                this.formData[`${day}Open`] = openSelect.value;
                this.formData[`${day}Close`] = closeSelect.value;
            }
        });
    }

    addInitialMenuItems() {
        // Add 6 initial menu items
        for (let i = 0; i < 6; i++) {
            this.addMenuItem();
        }
    }

    addMenuItem() {
        const menuContainer = document.getElementById('menuItems');
        if (!menuContainer) return;

        const itemCount = menuContainer.children.length + 1;
        const menuItemDiv = document.createElement('div');
        menuItemDiv.className = 'menu-item';
        menuItemDiv.innerHTML = `
            <div class="menu-item-header">
                <h4>Menu Item ${itemCount}</h4>
                <button type="button" class="remove-menu-item" onclick="formManager.removeMenuItem(this)">×</button>
            </div>
            <div class="menu-item-fields">
                <div class="form-group">
                    <label>Item Name *</label>
                    <input type="text" name="menuItem${itemCount}Name" maxlength="40" required>
                    <div class="char-counter">0/40 characters</div>
                    <div class="error-message"></div>
                </div>
                <div class="form-group">
                    <label>Description *</label>
                    <textarea name="menuItem${itemCount}Description" maxlength="120" rows="2" required></textarea>
                    <div class="char-counter">0/120 characters</div>
                    <div class="error-message"></div>
                </div>
                <div class="form-group">
                    <label>Price *</label>
                    <input type="text" name="menuItem${itemCount}Price" placeholder="12.95" required>
                    <div class="error-message"></div>
                </div>
            </div>
        `;

        menuContainer.appendChild(menuItemDiv);

        // Setup validation for new fields
        this.setupMenuItemValidation(menuItemDiv, itemCount);
        
        // Update counter
        this.updateMenuCounter();

        // Update remove button visibility
        this.updateMenuRemoveButtons();
    }

    setupMenuItemValidation(menuItem, itemCount) {
        const nameField = menuItem.querySelector(`[name="menuItem${itemCount}Name"]`);
        const descField = menuItem.querySelector(`[name="menuItem${itemCount}Description"]`);
        const priceField = menuItem.querySelector(`[name="menuItem${itemCount}Price"]`);

        if (nameField) {
            nameField.addEventListener('input', (e) => {
                validator.validateField('MENU_ITEM_NAME', e.target.value, e.target);
                validator.updateCharCount(e.target, 40);
            });
        }

        if (descField) {
            descField.addEventListener('input', (e) => {
                validator.validateField('MENU_DESCRIPTION', e.target.value, e.target);
                validator.updateCharCount(e.target, 120);
            });
        }

        if (priceField) {
            priceField.addEventListener('input', (e) => {
                validator.formatPrice(e.target);
                validator.validateField('PRICE', e.target.value, e.target);
            });
        }
    }

    removeMenuItem(button) {
        const menuItem = button.closest('.menu-item');
        if (menuItem) {
            menuItem.remove();
            this.updateMenuCounter();
            this.updateMenuRemoveButtons();
            this.renumberMenuItems();
        }
    }

    renumberMenuItems() {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach((item, index) => {
            const header = item.querySelector('.menu-item-header h4');
            if (header) {
                header.textContent = `Menu Item ${index + 1}`;
            }
        });
    }

    updateMenuCounter() {
        const menuItems = document.querySelectorAll('.menu-item');
        const counter = document.getElementById('menuCount');
        
        if (counter) {
            counter.textContent = menuItems.length;
        }

        // Update add button visibility
        const addButton = document.querySelector('.btn-add-menu');
        if (addButton) {
            if (menuItems.length >= 12) {
                addButton.style.display = 'none';
            } else {
                addButton.style.display = 'block';
            }
        }
    }

    updateMenuRemoveButtons() {
        const menuItems = document.querySelectorAll('.menu-item');
        const removeButtons = document.querySelectorAll('.remove-menu-item');
        
        // Hide remove buttons if only 6 items remain
        removeButtons.forEach(button => {
            if (menuItems.length <= 6) {
                button.style.display = 'none';
            } else {
                button.style.display = 'block';
            }
        });
    }

    populateReview() {
        const reviewContainer = document.getElementById('reviewContent');
        if (!reviewContainer) return;

        // Collect all current data
        this.saveStepData(this.currentStep - 1);

        const review = this.generateReviewHTML();
        reviewContainer.innerHTML = review;
    }

    generateReviewHTML() {
        const data = this.formData;
        const menu = this.menuItems;

        return `
            <div class="review-section">
                <h3>Restaurant Information</h3>
                <div class="review-grid">
                    <div class="review-item">
                        <label>Restaurant Name:</label>
                        <span>${data.restaurantName || 'Not provided'}</span>
                    </div>
                    <div class="review-item">
                        <label>Cuisine Type:</label>
                        <span>${data.cuisineType || 'Not provided'}</span>
                    </div>
                    <div class="review-item">
                        <label>Tagline:</label>
                        <span>${data.tagline || 'Not provided'}</span>
                    </div>
                    <div class="review-item full-width">
                        <label>Description:</label>
                        <span>${data.description || 'Not provided'}</span>
                    </div>
                </div>
            </div>

            <div class="review-section">
                <h3>Contact Information</h3>
                <div class="review-grid">
                    <div class="review-item">
                        <label>Phone:</label>
                        <span>${data.phone || 'Not provided'}</span>
                    </div>
                    <div class="review-item">
                        <label>Email:</label>
                        <span>${data.email || 'Not provided'}</span>
                    </div>
                    <div class="review-item full-width">
                        <label>Address:</label>
                        <span>${data.address || 'Not provided'}</span>
                    </div>
                </div>
            </div>

            <div class="review-section">
                <h3>Menu Items</h3>
                <div class="review-menu">
                    ${menu.map(item => `
                        <div class="review-menu-item">
                            <div class="menu-name">${item.name}</div>
                            <div class="menu-description">${item.description}</div>
                            <div class="menu-price">$${item.price}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="review-section">
                <h3>Images</h3>
                <div class="review-images">
                    ${this.generateImageReview()}
                </div>
            </div>
        `;
    }

    generateImageReview() {
        const images = imageManager.getUploadedImages();
        const imageTypes = {
            logo: 'Logo',
            hero: 'Hero Image',
            interior: 'Interior Photo'
        };

        let html = '';
        
        // Required images
        Object.entries(imageTypes).forEach(([type, label]) => {
            const hasImage = images[type] ? '✅' : '❌';
            html += `<div class="review-image-item">${hasImage} ${label}</div>`;
        });

        // Food images
        const foodImages = imageManager.getFoodImages();
        html += `<div class="review-image-item">🍽️ Food Photos: ${Object.keys(foodImages).length}</div>`;

        return html;
    }

    async submitForm() {
        // Final validation
        if (!this.validateAllSteps()) {
            return;
        }

        // Collect all data
        this.saveStepData(this.currentStep);

        // Generate and download JSON
        await this.generateAndDownloadJSON();
    }

    validateAllSteps() {
        // Check required fields
        if (!this.formData.restaurantName || !this.formData.email || !this.formData.phone) {
            alert('Please fill in all required information');
            return false;
        }

        // Check menu items
        if (this.menuItems.length < 6) {
            alert('Please add at least 6 menu items');
            return false;
        }

        // Check required images
        if (!imageManager.hasRequiredImages()) {
            alert('Please upload required images (logo, hero, interior)');
            return false;
        }

        return true;
    }

    async generateAndDownloadJSON() {
        try {
            // Show loading
            const submitButton = document.querySelector('.btn-submit');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Processing...';
            submitButton.disabled = true;

            // Format data for restaurant system
            const clientData = await this.formatForRestaurantSystem();
            
            // Create downloadable file
            this.downloadJSON(clientData);

            // Show success message
            this.showSuccessMessage();

        } catch (error) {
            console.error('Error generating JSON:', error);
            alert('Error processing your submission. Please try again.');
        }
    }

    async formatForRestaurantSystem() {
        // Format hours
        const hours = this.formatHours();
        
        // Get images
        const images = await imageManager.processImagesForExport();

        // Format menu items
        const formattedMenu = {};
        this.menuItems.forEach((item, index) => {
            const num = index + 1;
            formattedMenu[`MENU_ITEM_${num}`] = item.name;
            formattedMenu[`MENU_DESCRIPTION_${num}`] = item.description;
            formattedMenu[`PRICE_${num}`] = item.price;
            formattedMenu[`FOOD_IMAGE_${num}`] = `images/food-${num}.jpg`;
        });

        // Main client data object
        const clientData = {
            // Basic info
            RESTAURANT_NAME: this.formData.restaurantName,
            TAGLINE: this.formData.tagline,
            DESCRIPTION: this.formData.description,
            CUISINE_TYPE: this.formData.cuisineType,

            // Contact
            PHONE: this.formData.phone,
            EMAIL: this.formData.email,
            FULL_ADDRESS: this.formData.address,

            // Hours
            ...hours,

            // Social media
            FACEBOOK_URL: this.formData.facebook || '',
            INSTAGRAM_URL: this.formData.instagram || '',
            YELP_URL: this.formData.yelp || '',

            // Location
            GOOGLE_MAPS_URL: this.formData.googleMapsUrl || '',
            GOOGLE_MAPS_EMBED: this.generateMapsEmbed(),

            // Menu
            ...formattedMenu,

            // Image paths
            HERO_IMAGE: 'images/hero.jpg',
            LOGO_URL: 'images/logo.png',
            INTERIOR_IMAGE_1: 'images/interior.jpg',

            // Metadata
            _GENERATED: {
                timestamp: new Date().toISOString(),
                portal_version: '1.0',
                total_menu_items: this.menuItems.length,
                images_provided: Object.keys(images).length
            },

            // Images (base64 encoded)
            _IMAGES: images
        };

        return clientData;
    }

    formatHours() {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const hours = {};
        
        days.forEach(day => {
            const openTime = this.formData[`${day}Open`];
            const closeTime = this.formData[`${day}Close`];
            
            if (openTime === 'closed' || closeTime === 'closed') {
                hours[`HOURS_${day.slice(0, 3).toUpperCase()}`] = 'Closed';
            } else {
                const formatted = this.formatTimeRange(openTime, closeTime);
                hours[`HOURS_${day.slice(0, 3).toUpperCase()}`] = formatted;
            }
        });

        // Add summary hours
        hours.WEEKDAY_HOURS = this.generateSummaryHours(['monday', 'tuesday', 'wednesday', 'thursday']);
        hours.WEEKEND_HOURS = this.generateSummaryHours(['friday', 'saturday']);
        hours.SUNDAY_HOURS = hours.HOURS_SUN;

        return hours;
    }

    formatTimeRange(openTime, closeTime) {
        if (!openTime || !closeTime) return 'Closed';
        
        const formatTime = (time) => {
            const [hours, minutes] = time.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
            return `${displayHour}:${minutes} ${ampm}`;
        };

        return `${formatTime(openTime)} - ${formatTime(closeTime)}`;
    }

    generateSummaryHours(days) {
        // Simple implementation - in production you'd check for common patterns
        const firstDay = days[0];
        const openTime = this.formData[`${firstDay}Open`];
        const closeTime = this.formData[`${firstDay}Close`];
        
        if (openTime === 'closed') return 'Closed';
        
        return this.formatTimeRange(openTime, closeTime);
    }

    generateMapsEmbed() {
        const address = this.formData.address;
        if (!address) return '';
        
        // Generate basic Google Maps embed URL
        const encodedAddress = encodeURIComponent(address);
        return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}`;
    }

    downloadJSON(data) {
        const filename = `${this.formData.restaurantName.replace(/[^a-zA-Z0-9]/g, '-')}-client-data.json`;
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    showSuccessMessage() {
        const container = document.querySelector('.form-container');
        container.innerHTML = `
            <div class="success-message">
                <div class="success-icon">✅</div>
                <h2>Information Submitted Successfully!</h2>
                <p>Your restaurant information has been compiled and downloaded as a JSON file.</p>
                
                <div class="next-steps">
                    <h3>Next Steps:</h3>
                    <ol>
                        <li>Check your downloads folder for the JSON file</li>
                        <li>Send the JSON file and any additional images to your developer</li>
                        <li>Your website will be ready in 48-72 hours</li>
                        <li>You'll receive a complete package with hosting instructions</li>
                    </ol>
                </div>

                <div class="contact-info">
                    <p>Questions? Contact us at <strong>support@restaurantwebsites.com</strong></p>
                </div>

                <button type="button" class="btn-primary" onclick="location.reload()">Submit Another Restaurant</button>
            </div>
        `;
    }

    setupAutoSave() {
        // Auto-save every 30 seconds
        setInterval(() => {
            this.saveProgress();
        }, 30000);
    }

    saveProgress() {
        this.saveStepData(this.currentStep);
        
        const progressData = {
            currentStep: this.currentStep,
            formData: this.formData,
            menuItems: this.menuItems,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('restaurantFormProgress', JSON.stringify(progressData));
        
        // Show save notification
        this.showNotification('Progress saved', 'success');
    }

    loadProgress() {
        const saved = localStorage.getItem('restaurantFormProgress');
        if (!saved) {
            this.showNotification('No saved progress found', 'info');
            return;
        }

        try {
            const progressData = JSON.parse(saved);
            
            // Restore form data
            this.formData = progressData.formData || {};
            this.menuItems = progressData.menuItems || [];
            
            // Populate form fields
            this.populateFormFields();
            
            // Go to saved step
            this.showStep(progressData.currentStep || 1);
            
            this.showNotification('Progress loaded successfully', 'success');
            
        } catch (error) {
            console.error('Error loading progress:', error);
            this.showNotification('Error loading saved progress', 'error');
        }
    }

    populateFormFields() {
        Object.entries(this.formData).forEach(([key, value]) => {
            const field = document.querySelector(`[name="${key}"], #${key}`);
            if (field) {
                field.value = value;
            }
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Global functions for HTML onclick handlers
function nextStep() {
    if (window.formManager) {
        window.formManager.nextStep();
    }
}

function prevStep() {
    if (window.formManager) {
        window.formManager.prevStep();
    }
}

function addMenuItem() {
    if (window.formManager) {
        window.formManager.addMenuItem();
    }
}

function submitForm() {
    if (window.formManager) {
        window.formManager.submitForm();
    }
}

function saveProgress() {
    if (window.formManager) {
        window.formManager.saveProgress();
    }
}

function loadProgress() {
    if (window.formManager) {
        window.formManager.loadProgress();
    }
}

// Initialize form manager
const formManager = new RestaurantFormManager();
window.formManager = formManager;