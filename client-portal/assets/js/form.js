// Main form functionality and JSON export

class RestaurantFormManager {
    constructor() {
        this.formData = {};
        this.menuCategories = {
            appetizers: [],
            soups: [],
            salads: [],
            mains: [],
            desserts: [],
            wines: [],
            cocktails: []
        };
        this.activeCategory = 'appetizers';
        
        this.initializeForm();
    }

    initializeForm() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupMenuTabs();
            this.addInitialMenuItems();
            this.setupAutoSave();
            this.setupFormValidation();
            this.updateMenuStats();
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
        // Clear existing data
        Object.keys(this.menuCategories).forEach(category => {
            this.menuCategories[category] = [];
        });
        
        // Collect data from all categories
        Object.keys(this.menuCategories).forEach(category => {
            const categoryItems = document.querySelectorAll(`[data-category="${category}"]`);
            
            categoryItems.forEach((item) => {
                const itemId = item.dataset.id;
                const nameField = item.querySelector(`[name="${itemId}_name"]`);
                const descField = item.querySelector(`[name="${itemId}_description"]`);
                const priceField = item.querySelector(`[name="${itemId}_price"]`);
                const imageField = item.querySelector(`[name="${itemId}_image"]`);
                
                if (nameField && descField && priceField) {
                    this.menuCategories[category].push({
                        id: itemId,
                        name: nameField.value,
                        description: descField.value,
                        price: priceField.value,
                        image: imageField?.files[0] || null
                    });
                }
            });
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

    setupMenuTabs() {
        const tabs = document.querySelectorAll('.category-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.dataset.category;
                this.switchCategory(category);
            });
        });
    }

    switchCategory(category) {
        // Update active tab
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        // Update active section
        document.querySelectorAll('.category-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${category}-section`).classList.add('active');
        
        this.activeCategory = category;
    }

    addInitialMenuItems() {
        // Add 2 sample items to appetizers and mains to show how it works
        this.addCategoryItem('appetizers');
        this.addCategoryItem('appetizers');
        this.addCategoryItem('mains');
        this.addCategoryItem('mains');
        this.addCategoryItem('desserts');
    }

    addCategoryItem(category) {
        const itemsList = document.getElementById(`${category}-items`);
        if (!itemsList) return;

        const categoryItems = this.menuCategories[category];
        const itemIndex = categoryItems.length + 1;
        const uniqueId = `${category}_${itemIndex}_${Date.now()}`;
        
        const menuItemDiv = document.createElement('div');
        menuItemDiv.className = 'menu-item';
        menuItemDiv.dataset.category = category;
        menuItemDiv.dataset.id = uniqueId;
        
        const categoryLabel = this.getCategoryLabel(category);
        
        menuItemDiv.innerHTML = `
            <div class="menu-item-header">
                <h4>${categoryLabel} ${itemIndex}</h4>
                <button type="button" class="remove-menu-item" onclick="formManager.removeCategoryItem('${category}', '${uniqueId}')">×</button>
            </div>
            <div class="menu-item-content">
                <div class="menu-item-fields">
                    <div class="form-group">
                        <label>Item Name *</label>
                        <input type="text" name="${uniqueId}_name" maxlength="40" required>
                        <div class="char-counter">0/40 characters</div>
                        <div class="error-message"></div>
                    </div>
                    <div class="form-group">
                        <label>Description *</label>
                        <textarea name="${uniqueId}_description" maxlength="120" rows="2" required></textarea>
                        <div class="char-counter">0/120 characters</div>
                        <div class="error-message"></div>
                    </div>
                    <div class="form-group">
                        <label>Price *</label>
                        <input type="text" name="${uniqueId}_price" placeholder="12.95" required>
                        <div class="error-message"></div>
                    </div>
                </div>
                <div class="menu-item-image">
                    <label>Food Photo (Optional)</label>
                    <div class="menu-upload-row">
                        <div class="menu-upload-box" onclick="formManager.triggerMenuImageUpload('${uniqueId}')">
                            <input type="file" id="${uniqueId}_image" accept=".png,.jpg,.jpeg" style="display: none;">
                            <div class="menu-upload-content">
                                <span class="upload-icon">🍽️</span>
                                <p>Add photo</p>
                                <small>Optional: 400x300px</small>
                            </div>
                        </div>
                        <div class="menu-image-thumbnail" id="${uniqueId}_thumbnail" style="display: none;"></div>
                    </div>
                </div>
            </div>
        `;

        itemsList.appendChild(menuItemDiv);

        // Add to category data
        this.menuCategories[category].push({
            id: uniqueId,
            name: '',
            description: '',
            price: '',
            image: null
        });

        // Setup validation for new fields
        this.setupMenuItemValidation(menuItemDiv, uniqueId);
        
        // Setup image upload for this menu item
        this.setupMenuImageUpload(uniqueId);
        
        // Update stats
        this.updateMenuStats();
    }

    getCategoryLabel(category) {
        const labels = {
            appetizers: 'Appetizer',
            soups: 'Soup',
            salads: 'Salad', 
            mains: 'Main Course',
            desserts: 'Dessert',
            wines: 'Wine',
            cocktails: 'Cocktail'
        };
        return labels[category] || 'Item';
    }

    setupMenuItemValidation(menuItem, itemId) {
        const nameField = menuItem.querySelector(`[name="${itemId}_name"]`);
        const descField = menuItem.querySelector(`[name="${itemId}_description"]`);
        const priceField = menuItem.querySelector(`[name="${itemId}_price"]`);

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

    setupMenuImageUpload(itemId) {
        const uploadInput = document.getElementById(`${itemId}_image`);
        if (uploadInput) {
            uploadInput.addEventListener('change', (e) => {
                this.handleMenuImageUpload(e, itemId);
            });
        }
    }

    triggerMenuImageUpload(itemId) {
        const uploadInput = document.getElementById(`${itemId}_image`);
        if (uploadInput) {
            uploadInput.click();
        }
    }

    handleMenuImageUpload(event, itemId) {
        const file = event.target.files[0];
        if (!file) return;

        // Clear any previous error
        this.clearMenuImageError(itemId);

        // Basic validation
        if (!file.type.startsWith('image/')) {
            this.showMenuImageError(itemId, 'Please upload an image file (JPEG, PNG, or WebP)');
            event.target.value = '';
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            this.showMenuImageError(itemId, 'Image must be less than 5MB');
            event.target.value = '';
            return;
        }

        // Show thumbnail
        this.showMenuImageThumbnail(file, itemId);
    }

    showMenuImageThumbnail(file, itemId) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const thumbnailContainer = document.getElementById(`${itemId}_thumbnail`);
            if (thumbnailContainer) {
                thumbnailContainer.innerHTML = `
                    <img src="${e.target.result}" alt="Menu item photo" class="menu-thumbnail-img">
                    <div class="menu-thumbnail-info">
                        <span class="menu-file-name">${file.name}</span>
                        <button type="button" class="remove-menu-image" onclick="formManager.removeMenuImage('${itemId}')">×</button>
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

    removeMenuImage(itemId) {
        // Clear file input
        const uploadInput = document.getElementById(`${itemId}_image`);
        if (uploadInput) {
            uploadInput.value = '';
        }
        
        // Hide thumbnail
        const thumbnailContainer = document.getElementById(`${itemId}_thumbnail`);
        if (thumbnailContainer) {
            thumbnailContainer.style.display = 'none';
            thumbnailContainer.innerHTML = '';
            
            // Show upload content
            const uploadContent = thumbnailContainer.parentElement.querySelector('.menu-upload-content');
            if (uploadContent) {
                uploadContent.style.display = 'block';
            }
        }
        
        // Clear any error messages
        this.clearMenuImageError(itemId);
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

    showMenuImageError(itemId, message) {
        const menuItem = document.querySelector(`[data-id="${itemId}"]`);
        if (menuItem) {
            const imageSection = menuItem.querySelector('.menu-item-image');
            if (imageSection) {
                // Remove existing error if any
                const existingError = imageSection.querySelector('.menu-upload-error');
                if (existingError) {
                    existingError.remove();
                }
                
                // Add error message
                const errorDiv = document.createElement('div');
                errorDiv.className = 'menu-upload-error';
                errorDiv.innerHTML = `
                    <span class="error-icon">⚠️</span>
                    <span class="error-text">${message}</span>
                `;
                
                // Insert after the upload row
                const uploadRow = imageSection.querySelector('.menu-upload-row');
                if (uploadRow) {
                    uploadRow.insertAdjacentElement('afterend', errorDiv);
                }
                
                // Add error styling to upload box
                const uploadBox = imageSection.querySelector('.menu-upload-box');
                if (uploadBox) {
                    uploadBox.classList.add('upload-error-state');
                }
            }
        }
    }

    clearMenuImageError(itemId) {
        const menuItem = document.querySelector(`[data-id="${itemId}"]`);
        if (menuItem) {
            const imageSection = menuItem.querySelector('.menu-item-image');
            if (imageSection) {
                // Remove error message
                const errorDiv = imageSection.querySelector('.menu-upload-error');
                if (errorDiv) {
                    errorDiv.remove();
                }
                
                // Remove error styling
                const uploadBox = imageSection.querySelector('.menu-upload-box');
                if (uploadBox) {
                    uploadBox.classList.remove('upload-error-state');
                }
            }
        }
    }

    removeCategoryItem(category, itemId) {
        const menuItem = document.querySelector(`[data-id="${itemId}"]`);
        if (menuItem) {
            menuItem.remove();
        }
        
        // Remove from category data
        this.menuCategories[category] = this.menuCategories[category].filter(item => item.id !== itemId);
        
        // Renumber items in this category
        this.renumberCategoryItems(category);
        
        // Update stats
        this.updateMenuStats();
    }

    renumberCategoryItems(category) {
        const categoryItems = document.querySelectorAll(`[data-category="${category}"]`);
        const categoryLabel = this.getCategoryLabel(category);
        
        categoryItems.forEach((item, index) => {
            const header = item.querySelector('.menu-item-header h4');
            if (header) {
                header.textContent = `${categoryLabel} ${index + 1}`;
            }
        });
    }

    updateMenuStats() {
        const totalItems = Object.values(this.menuCategories).reduce((sum, category) => sum + category.length, 0);
        const activeCategoriesCount = Object.values(this.menuCategories).filter(category => category.length > 0).length;
        
        const totalItemsEl = document.getElementById('totalItems');
        const totalCategoriesEl = document.getElementById('totalCategories');
        
        if (totalItemsEl) totalItemsEl.textContent = totalItems;
        if (totalCategoriesEl) totalCategoriesEl.textContent = `${activeCategoriesCount}/7`;
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

        // Generate and download ZIP
        await this.generateAndDownloadZIP();
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
        const totalMenuItems = Object.values(this.menuCategories).reduce((sum, category) => sum + category.length, 0);
        if (totalMenuItems < 6) {
            alert('Please add at least 6 menu items across all categories');
            return false;
        }

        // Check required images
        if (typeof imageManager !== 'undefined' && !imageManager.hasRequiredImages()) {
            alert('Please upload required images (logo, hero, interior)');
            return false;
        }

        return true;
    }

    async generateAndDownloadZIP() {
        try {
            // Show loading
            const submitButton = document.querySelector('.btn-submit');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Processing...';
            submitButton.disabled = true;

            // Format data for restaurant system
            const clientData = await this.formatForRestaurantSystem();
            
            // Create downloadable ZIP file
            await this.downloadZIP(clientData);

            // Show success message
            this.showSuccessMessage();

        } catch (error) {
            console.error('Error generating ZIP:', error);
            alert('Error processing your submission. Please try again.');
        }
    }

    async formatForRestaurantSystem() {
        // Format hours
        const hours = this.formatHours();
        
        // Get images
        const images = await imageManager.processImagesForExport();

        // Format menu items by category
        const formattedMenu = {};
        let globalItemIndex = 1;
        
        // Add general menu items (for backward compatibility)
        Object.values(this.menuCategories).forEach(categoryItems => {
            categoryItems.forEach(item => {
                formattedMenu[`MENU_ITEM_${globalItemIndex}`] = item.name;
                formattedMenu[`MENU_DESCRIPTION_${globalItemIndex}`] = item.description;
                formattedMenu[`PRICE_${globalItemIndex}`] = item.price;
                formattedMenu[`FOOD_IMAGE_${globalItemIndex}`] = `images/food-${globalItemIndex}.jpg`;
                globalItemIndex++;
            });
        });
        
        // Add category-specific menu items
        Object.entries(this.menuCategories).forEach(([category, items]) => {
            items.forEach((item, index) => {
                const categoryIndex = index + 1;
                const categoryUpper = category.toUpperCase();
                
                // Special handling for different categories
                if (category === 'mains') {
                    formattedMenu[`MAIN_${categoryIndex}_NAME`] = item.name;
                    formattedMenu[`MAIN_${categoryIndex}_DESCRIPTION`] = item.description;
                    formattedMenu[`MAIN_${categoryIndex}_PRICE`] = item.price;
                } else if (category === 'appetizers') {
                    formattedMenu[`APPETIZER_${categoryIndex}_NAME`] = item.name;
                    formattedMenu[`APPETIZER_${categoryIndex}_DESCRIPTION`] = item.description;
                    formattedMenu[`APPETIZER_${categoryIndex}_PRICE`] = item.price;
                } else if (category === 'desserts') {
                    formattedMenu[`DESSERT_${categoryIndex}_NAME`] = item.name;
                    formattedMenu[`DESSERT_${categoryIndex}_DESCRIPTION`] = item.description;
                    formattedMenu[`DESSERT_${categoryIndex}_PRICE`] = item.price;
                } else if (category === 'wines') {
                    formattedMenu[`WINE_${categoryIndex}_NAME`] = item.name;
                    formattedMenu[`WINE_${categoryIndex}_DESCRIPTION`] = item.description;
                    formattedMenu[`WINE_${categoryIndex}_PRICE`] = item.price;
                } else if (category === 'cocktails') {
                    formattedMenu[`COCKTAIL_${categoryIndex}_NAME`] = item.name;
                    formattedMenu[`COCKTAIL_${categoryIndex}_DESCRIPTION`] = item.description;
                    formattedMenu[`COCKTAIL_${categoryIndex}_PRICE`] = item.price;
                } else {
                    // Generic format for soups, salads, etc.
                    const singularCategory = category.slice(0, -1).toUpperCase(); // Remove 's'
                    formattedMenu[`${singularCategory}_${categoryIndex}_NAME`] = item.name;
                    formattedMenu[`${singularCategory}_${categoryIndex}_DESCRIPTION`] = item.description;
                    formattedMenu[`${singularCategory}_${categoryIndex}_PRICE`] = item.price;
                }
            });
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
                portal_version: '2.0',
                total_menu_items: Object.values(this.menuCategories).reduce((sum, cat) => sum + cat.length, 0),
                menu_categories: Object.fromEntries(
                    Object.entries(this.menuCategories).map(([cat, items]) => [cat, items.length])
                ),
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

    async downloadZIP(data, filename = null) {
        if (!filename) {
            const restaurantName = this.formData.restaurantName || 'restaurant';
            filename = `${restaurantName.replace(/[^a-zA-Z0-9]/g, '-')}-client-data.zip`;
        }
        
        const zip = new JSZip();
        
        // Add JSON data file
        zip.file('restaurant-data.json', JSON.stringify(data, null, 2));
        
        // Add main restaurant images
        const mainImages = imageManager.getUploadedImages();
        for (const [type, file] of Object.entries(mainImages)) {
            if (file) {
                const extension = file.name.split('.').pop();
                zip.file(`images/${type}.${extension}`, file);
            }
        }
        
        // Add menu item images
        for (const [category, items] of Object.entries(this.menuCategories)) {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const imageInput = document.querySelector(`[name="${item.id}_image"]`);
                if (imageInput && imageInput.files && imageInput.files[0]) {
                    const file = imageInput.files[0];
                    const extension = file.name.split('.').pop();
                    zip.file(`images/menu/${category}/${item.id}.${extension}`, file);
                }
            }
        }
        
        // Generate ZIP file and download
        try {
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            
            const url = URL.createObjectURL(zipBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error creating ZIP file:', error);
            this.showNotification('Error creating ZIP file', 'error');
        }
    }

    showSuccessMessage() {
        const container = document.querySelector('.form-container');
        container.innerHTML = `
            <div class="success-message">
                <div class="success-icon">✅</div>
                <h2>Information Submitted Successfully!</h2>
                <p>Your restaurant information and images have been compiled and downloaded as a ZIP file.</p>
                
                <div class="next-steps">
                    <h3>Next Steps:</h3>
                    <ol>
                        <li>Check your downloads folder for the ZIP file</li>
                        <li>Send the ZIP file to your developer (it contains everything needed)</li>
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
        // Auto-save every 2 minutes (silently)
        setInterval(() => {
            this.saveProgressSilently();
        }, 120000);
    }

    saveProgress() {
        this.saveAllFormData();
        
        const progressData = {
            formData: this.formData,
            menuCategories: this.menuCategories,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('restaurantFormProgress', JSON.stringify(progressData));
        
        // Show save notification
        this.showNotification('Progress saved', 'success');
    }

    saveProgressSilently() {
        this.saveAllFormData();
        
        const progressData = {
            formData: this.formData,
            menuCategories: this.menuCategories,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('restaurantFormProgress', JSON.stringify(progressData));
        
        // No notification for auto-save
    }

    async saveToFile() {
        this.saveAllFormData();
        
        const progressData = {
            formData: this.formData,
            menuCategories: this.menuCategories,
            timestamp: new Date().toISOString(),
            note: 'Restaurant form data with images - continue editing by uploading this ZIP file'
        };
        
        const filename = `restaurant-progress-${new Date().toISOString().split('T')[0]}.zip`;
        await this.downloadZIP(progressData, filename);
        
        this.showNotification('Progress saved to ZIP file', 'success');
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

    // Load data from uploaded ZIP file
    async loadFromZIP(event) {
        const file = event.target.files[0];
        if (!file) return;

        const loadStatus = document.getElementById('loadStatus');
        loadStatus.textContent = 'Loading ZIP file...';
        
        try {
            const zip = await JSZip.loadAsync(file);
            
            // Extract JSON data
            const jsonFile = zip.file('restaurant-data.json');
            if (!jsonFile) {
                throw new Error('restaurant-data.json not found in ZIP file');
            }
            
            const jsonText = await jsonFile.async('text');
            const jsonData = JSON.parse(jsonText);
            
            // Validate JSON structure
            if (!this.validateJSONStructure(jsonData)) {
                throw new Error('Invalid JSON structure');
            }
            
            // Extract and restore images
            await this.extractImagesFromZIP(zip);
            
            // Populate form with JSON data
            this.populateFromJSON(jsonData);
            
            loadStatus.textContent = '✅ Data and images loaded successfully!';
            loadStatus.style.color = '#28a745';
            
            // Hide the load section after successful load
            setTimeout(() => {
                const loadSection = document.querySelector('.load-data-section');
                if (loadSection) {
                    loadSection.style.display = 'none';
                }
            }, 2000);
            
        } catch (error) {
            console.error('Error loading ZIP:', error);
            loadStatus.textContent = '❌ Invalid ZIP file or missing data';
            loadStatus.style.color = '#dc3545';
        }
    }

    async extractImagesFromZIP(zip) {
        // Extract main images (logo, hero, interior)
        for (const type of ['logo', 'hero', 'interior']) {
            const imageFiles = zip.file(new RegExp(`images/${type}\\.(jpg|jpeg|png|webp)$`));
            if (imageFiles.length > 0) {
                const imageFile = imageFiles[0];
                const blob = await imageFile.async('blob');
                const file = new File([blob], imageFile.name, { type: blob.type });
                
                // Create a mock event to trigger the existing image upload handling
                const mockEvent = { target: { files: [file] } };
                imageManager.handleFileUpload(mockEvent, type);
            }
        }
        
        // Extract menu item images
        const menuImageFiles = zip.file(/images\/menu\//);
        for (const imageFile of menuImageFiles) {
            const pathParts = imageFile.name.split('/');
            if (pathParts.length >= 4) {
                const category = pathParts[2];
                const filename = pathParts[3];
                const itemId = filename.split('.')[0];
                
                const blob = await imageFile.async('blob');
                const file = new File([blob], filename, { type: blob.type });
                
                // Set the file to the appropriate input
                const input = document.getElementById(`${itemId}_image`);
                if (input) {
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    input.files = dataTransfer.files;
                    
                    // Trigger the image preview
                    const mockEvent = { target: { files: [file] } };
                    this.handleMenuImageUpload(mockEvent, itemId);
                }
            }
        }
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

function triggerMenuImageUpload(itemId) {
    if (window.formManager) {
        window.formManager.triggerMenuImageUpload(itemId);
    }
}

function addCategoryItem(category) {
    if (window.formManager) {
        window.formManager.addCategoryItem(category);
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


function loadFromZIP(event) {
    if (window.formManager) {
        window.formManager.loadFromZIP(event);
    }
}

// Initialize form manager
const formManager = new RestaurantFormManager();
window.formManager = formManager;