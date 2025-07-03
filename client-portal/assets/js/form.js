// Main form functionality and JSON export

class RestaurantFormManager {
    constructor() {
        this.formData = {};
        this.menuItems = [];
        
        this.initializeForm();
    }

    initializeForm() {
        document.addEventListener('DOMContentLoaded', () => {
            this.addInitialMenuItems();
            this.setupAutoSave();
            this.setupFormValidation();
        });
    }

    setupFormValidation() {
        // Setup real-time validation for all form fields
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        // Basic validation - can be expanded
        const isRequired = field.hasAttribute('required');
        const isEmpty = !field.value.trim();
        
        if (isRequired && isEmpty) {
            this.showFieldError(field, 'This field is required');
            return false;
        }
        
        this.clearFieldError(field);
        return true;
    }

    showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('has-error');
            const errorDiv = formGroup.querySelector('.error-message');
            if (errorDiv) {
                errorDiv.textContent = message;
                errorDiv.style.display = 'block';
            }
        }
    }

    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('has-error');
            const errorDiv = formGroup.querySelector('.error-message');
            if (errorDiv) {
                errorDiv.style.display = 'none';
            }
        }
    }

    saveAllFormData() {
        // Save all form data from the single page
        const inputs = document.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            if (input.type === 'file') {
                // File inputs are handled by imageManager
                return;
            }
            
            const key = input.name || input.id;
            if (key && input.value) {
                this.formData[key] = input.value;
            }
        });

        // Save menu items and hours data
        this.saveMenuData();
        this.saveHoursData();
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
            <div class="menu-item-content">
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
                <div class="menu-item-image">
                    <label>Food Photo (Optional)</label>
                    <div class="menu-upload-row">
                        <div class="menu-upload-box" onclick="formManager.triggerMenuImageUpload(${itemCount})">
                            <input type="file" id="menuItem${itemCount}Image" accept=".png,.jpg,.jpeg" style="display: none;">
                            <div class="menu-upload-content">
                                <span class="upload-icon">🍽️</span>
                                <p>Add food photo</p>
                                <small>Optional: 400x300px</small>
                            </div>
                        </div>
                        <div class="menu-image-thumbnail" id="menuItem${itemCount}Thumbnail" style="display: none;"></div>
                    </div>
                </div>
            </div>
        `;

        menuContainer.appendChild(menuItemDiv);

        // Setup validation for new fields
        this.setupMenuItemValidation(menuItemDiv, itemCount);
        
        // Setup image upload for this menu item
        this.setupMenuImageUpload(itemCount);
        
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
                this.updateCharCount(e.target, 40);
            });
        }

        if (descField) {
            descField.addEventListener('input', (e) => {
                this.updateCharCount(e.target, 120);
            });
        }

        if (priceField) {
            priceField.addEventListener('input', (e) => {
                this.formatPrice(e.target);
            });
        }
    }

    setupMenuImageUpload(itemCount) {
        const uploadInput = document.getElementById(`menuItem${itemCount}Image`);
        if (uploadInput) {
            uploadInput.addEventListener('change', (e) => {
                this.handleMenuImageUpload(e, itemCount);
            });
        }
    }

    triggerMenuImageUpload(itemCount) {
        const uploadInput = document.getElementById(`menuItem${itemCount}Image`);
        if (uploadInput) {
            uploadInput.click();
        }
    }

    handleMenuImageUpload(event, itemCount) {
        const file = event.target.files[0];
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            event.target.value = '';
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert('Image must be less than 5MB');
            event.target.value = '';
            return;
        }

        // Show thumbnail
        this.showMenuImageThumbnail(file, itemCount);
    }

    showMenuImageThumbnail(file, itemCount) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const thumbnailContainer = document.getElementById(`menuItem${itemCount}Thumbnail`);
            if (thumbnailContainer) {
                thumbnailContainer.innerHTML = `
                    <img src="${e.target.result}" alt="Menu item photo" class="menu-thumbnail-img">
                    <div class="menu-thumbnail-info">
                        <span class="menu-file-name">${file.name}</span>
                        <button type="button" class="remove-menu-image" onclick="formManager.removeMenuImage(${itemCount})">×</button>
                    </div>
                `;
                thumbnailContainer.style.display = 'block';
                
                // Hide upload content
                const uploadContent = thumbnailContainer.parentElement.querySelector('.menu-upload-content');
                if (uploadContent) {
                    uploadContent.style.display = 'none';
                }
            }
        };
        
        reader.readAsDataURL(file);
    }

    removeMenuImage(itemCount) {
        // Clear file input
        const uploadInput = document.getElementById(`menuItem${itemCount}Image`);
        if (uploadInput) {
            uploadInput.value = '';
        }
        
        // Hide thumbnail
        const thumbnailContainer = document.getElementById(`menuItem${itemCount}Thumbnail`);
        if (thumbnailContainer) {
            thumbnailContainer.style.display = 'none';
            thumbnailContainer.innerHTML = '';
            
            // Show upload content
            const uploadContent = thumbnailContainer.parentElement.querySelector('.menu-upload-content');
            if (uploadContent) {
                uploadContent.style.display = 'block';
            }
        }
    }

    updateCharCount(field, maxLength) {
        const counter = field.parentElement.querySelector('.char-counter');
        if (counter) {
            const length = field.value.length;
            counter.textContent = `${length}/${maxLength} characters`;
            
            if (length > maxLength * 0.9) {
                counter.classList.add('warning');
            } else {
                counter.classList.remove('warning');
            }
        }
    }

    formatPrice(field) {
        let value = field.value.replace(/[^\d.]/g, '');
        
        // Ensure only one decimal point
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }
        
        // Limit to 2 decimal places
        if (parts[1] && parts[1].length > 2) {
            value = parts[0] + '.' + parts[1].substring(0, 2);
        }
        
        field.value = value;
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
        if (!this.validateAllFields()) {
            return;
        }

        // Collect all data
        this.saveAllFormData();

        // Generate and download JSON
        await this.generateAndDownloadJSON();
    }

    validateAllFields() {
        // Collect current form data
        this.saveAllFormData();
        
        // Check required fields
        const requiredFields = {
            restaurantName: 'Restaurant Name',
            email: 'Email Address', 
            phone: 'Phone Number',
            address: 'Address',
            tagline: 'Tagline',
            description: 'Description'
        };
        
        const missingFields = [];
        Object.entries(requiredFields).forEach(([key, label]) => {
            if (!this.formData[key]) {
                missingFields.push(label);
            }
        });
        
        if (missingFields.length > 0) {
            alert(`Please fill in the following required fields:\n${missingFields.join('\n')}`);
            return false;
        }

        // Check menu items
        if (this.menuItems.length < 6) {
            alert('Please add at least 6 menu items');
            return false;
        }

        // Check required images
        if (typeof imageManager !== 'undefined' && !imageManager.hasRequiredImages()) {
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

    downloadJSON(data, filename = null) {
        if (!filename) {
            const restaurantName = this.formData.restaurantName || 'restaurant';
            filename = `${restaurantName.replace(/[^a-zA-Z0-9]/g, '-')}-client-data.json`;
        }
        
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
        this.saveAllFormData();
        
        const progressData = {
            formData: this.formData,
            menuItems: this.menuItems,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('restaurantFormProgress', JSON.stringify(progressData));
        
        // Show save notification
        this.showNotification('Progress saved', 'success');
    }

    saveToFile() {
        this.saveAllFormData();
        
        const progressData = {
            formData: this.formData,
            menuItems: this.menuItems,
            timestamp: new Date().toISOString(),
            note: 'Partial restaurant form data - continue editing by uploading this file'
        };
        
        const filename = `restaurant-progress-${new Date().toISOString().split('T')[0]}.json`;
        this.downloadJSON(progressData, filename);
        
        this.showNotification('Progress saved to file', 'success');
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

    // Load data from uploaded JSON file
    loadFromJSON(event) {
        const file = event.target.files[0];
        if (!file) return;

        const loadStatus = document.getElementById('loadStatus');
        loadStatus.textContent = 'Loading...';
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const jsonData = JSON.parse(e.target.result);
                
                // Validate JSON structure
                if (!this.validateJSONStructure(jsonData)) {
                    throw new Error('Invalid JSON structure');
                }
                
                // Populate form with JSON data
                this.populateFromJSON(jsonData);
                
                loadStatus.textContent = '✅ Data loaded successfully!';
                loadStatus.style.color = '#28a745';
                
                // Hide the load section after successful load
                setTimeout(() => {
                    const loadSection = document.querySelector('.load-data-section');
                    if (loadSection) {
                        loadSection.style.display = 'none';
                    }
                }, 2000);
                
            } catch (error) {
                console.error('Error loading JSON:', error);
                loadStatus.textContent = '❌ Invalid JSON file';
                loadStatus.style.color = '#dc3545';
            }
        };
        
        reader.onerror = () => {
            loadStatus.textContent = '❌ Error reading file';
            loadStatus.style.color = '#dc3545';
        };
        
        reader.readAsText(file);
    }

    validateJSONStructure(data) {
        // Check for required fields
        const requiredFields = ['RESTAURANT_NAME', 'PHONE', 'EMAIL'];
        for (const field of requiredFields) {
            if (!data[field]) {
                return false;
            }
        }
        return true;
    }

    populateFromJSON(jsonData) {
        // Clear existing form data
        this.formData = {};
        this.menuItems = [];
        
        // Map JSON fields to form fields
        const fieldMapping = {
            'RESTAURANT_NAME': 'restaurantName',
            'CUISINE_TYPE': 'cuisineType',
            'TAGLINE': 'tagline',
            'DESCRIPTION': 'description',
            'PHONE': 'phone',
            'EMAIL': 'email',
            'FULL_ADDRESS': 'address',
            'GOOGLE_MAPS_URL': 'googleMapsUrl',
            'FACEBOOK_URL': 'facebook',
            'INSTAGRAM_URL': 'instagram',
            'YELP_URL': 'yelp'
        };
        
        // Populate basic form data
        Object.entries(fieldMapping).forEach(([jsonKey, formKey]) => {
            if (jsonData[jsonKey]) {
                this.formData[formKey] = jsonData[jsonKey];
            }
        });
        
        // Populate hours data
        this.populateHoursFromJSON(jsonData);
        
        // Populate menu items
        this.populateMenuFromJSON(jsonData);
        
        // Populate form fields in DOM
        this.populateFormFields();
        
        // Rebuild menu items in DOM
        this.rebuildMenuItems();
        
        // Form is now single page - just show notification
        
        this.showNotification('Restaurant data loaded successfully!', 'success');
    }

    populateHoursFromJSON(jsonData) {
        const dayMapping = {
            'HOURS_MON': 'monday',
            'HOURS_TUE': 'tuesday', 
            'HOURS_WED': 'wednesday',
            'HOURS_THU': 'thursday',
            'HOURS_FRI': 'friday',
            'HOURS_SAT': 'saturday',
            'HOURS_SUN': 'sunday'
        };
        
        Object.entries(dayMapping).forEach(([jsonKey, day]) => {
            if (jsonData[jsonKey]) {
                const timeRange = jsonData[jsonKey];
                if (timeRange === 'Closed') {
                    this.formData[`${day}Open`] = 'closed';
                    this.formData[`${day}Close`] = 'closed';
                } else {
                    // Parse time range like "11:00 AM - 9:00 PM"
                    const times = this.parseTimeRange(timeRange);
                    if (times) {
                        this.formData[`${day}Open`] = times.open;
                        this.formData[`${day}Close`] = times.close;
                    }
                }
            }
        });
    }

    parseTimeRange(timeRange) {
        if (!timeRange || timeRange === 'Closed') return null;
        
        const match = timeRange.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i);
        if (!match) return null;
        
        const [, openHour, openMin, openPeriod, closeHour, closeMin, closePeriod] = match;
        
        const convertTo24Hour = (hour, minute, period) => {
            let h = parseInt(hour);
            if (period.toUpperCase() === 'PM' && h !== 12) h += 12;
            if (period.toUpperCase() === 'AM' && h === 12) h = 0;
            return `${h.toString().padStart(2, '0')}:${minute}`;
        };
        
        return {
            open: convertTo24Hour(openHour, openMin, openPeriod),
            close: convertTo24Hour(closeHour, closeMin, closePeriod)
        };
    }

    populateMenuFromJSON(jsonData) {
        this.menuItems = [];
        
        // Find all menu items in JSON
        let itemIndex = 1;
        while (jsonData[`MENU_ITEM_${itemIndex}`]) {
            this.menuItems.push({
                name: jsonData[`MENU_ITEM_${itemIndex}`] || '',
                description: jsonData[`MENU_DESCRIPTION_${itemIndex}`] || '',
                price: jsonData[`PRICE_${itemIndex}`] || '',
                index: itemIndex
            });
            itemIndex++;
        }
        
        // Ensure minimum 6 items
        while (this.menuItems.length < 6) {
            this.menuItems.push({
                name: '',
                description: '',
                price: '',
                index: this.menuItems.length + 1
            });
        }
    }

    rebuildMenuItems() {
        const menuContainer = document.getElementById('menuItems');
        if (!menuContainer) return;
        
        // Clear existing items
        menuContainer.innerHTML = '';
        
        // Add items from loaded data
        this.menuItems.forEach((item, index) => {
            this.addMenuItem();
            
            // Populate the item after it's created
            setTimeout(() => {
                const itemElement = menuContainer.children[index];
                if (itemElement) {
                    const nameField = itemElement.querySelector(`[name$="Name"]`);
                    const descField = itemElement.querySelector(`[name$="Description"]`);
                    const priceField = itemElement.querySelector(`[name$="Price"]`);
                    
                    if (nameField) nameField.value = item.name;
                    if (descField) descField.value = item.description;
                    if (priceField) priceField.value = item.price;
                }
            }, 100);
        });
    }
}

// Global functions for HTML onclick handlers
function saveToFile() {
    if (window.formManager) {
        window.formManager.saveToFile();
    }
}

function triggerMenuImageUpload(itemCount) {
    if (window.formManager) {
        window.formManager.triggerMenuImageUpload(itemCount);
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


function loadFromJSON(event) {
    if (window.formManager) {
        window.formManager.loadFromJSON(event);
    }
}

// Initialize form manager
const formManager = new RestaurantFormManager();
window.formManager = formManager;