// Validation system for restaurant client data collection

class RestaurantValidator {
    constructor() {
        this.rules = {
            RESTAURANT_NAME: {
                required: true,
                maxLength: 50,
                minLength: 2,
                pattern: /^[a-zA-Z0-9\s'&.-]+$/,
                message: 'Restaurant name can only contain letters, numbers, spaces, and basic punctuation'
            },
            TAGLINE: {
                required: true,
                maxLength: 80,
                minLength: 10,
                message: 'Tagline should be 10-80 characters'
            },
            DESCRIPTION: {
                required: true,
                maxLength: 200,
                minLength: 50,
                message: 'Description should be 50-200 characters'
            },
            PHONE: {
                required: true,
                pattern: /^\(\d{3}\) \d{3}-\d{4}$/,
                message: 'Phone number must be in format: (555) 123-4567'
            },
            EMAIL: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            ADDRESS: {
                required: true,
                minLength: 10,
                maxLength: 100,
                message: 'Please enter a complete address'
            },
            MENU_ITEM_NAME: {
                required: true,
                maxLength: 40,
                minLength: 2,
                message: 'Menu item name should be 2-40 characters'
            },
            MENU_DESCRIPTION: {
                required: true,
                maxLength: 120,
                minLength: 10,
                message: 'Menu description should be 10-120 characters'
            },
            PRICE: {
                required: true,
                pattern: /^\d+\.\d{2}$/,
                min: 0.01,
                max: 999.99,
                message: 'Price must be in format: 12.95 (maximum $999.99)'
            }
        };

        this.errors = {};
        this.initializeValidation();
    }

    initializeValidation() {
        // Add real-time validation to form fields
        document.addEventListener('DOMContentLoaded', () => {
            this.setupFieldValidation();
            this.setupCharacterCounters();
            this.setupPhoneFormatting();
            this.setupPriceFormatting();
        });
    }

    setupFieldValidation() {
        // Restaurant name validation
        const restaurantName = document.getElementById('restaurantName');
        if (restaurantName) {
            restaurantName.addEventListener('input', (e) => {
                this.validateField('RESTAURANT_NAME', e.target.value, e.target);
                this.updateCharCount(e.target, 50);
            });
        }

        // Tagline validation
        const tagline = document.getElementById('tagline');
        if (tagline) {
            tagline.addEventListener('input', (e) => {
                this.validateField('TAGLINE', e.target.value, e.target);
                this.updateCharCount(e.target, 80);
            });
        }

        // Description validation
        const description = document.getElementById('description');
        if (description) {
            description.addEventListener('input', (e) => {
                this.validateField('DESCRIPTION', e.target.value, e.target);
                this.updateCharCount(e.target, 200);
            });
        }

        // Phone validation
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', (e) => {
                this.formatPhone(e.target);
                this.validateField('PHONE', e.target.value, e.target);
            });
        }

        // Email validation
        const email = document.getElementById('email');
        if (email) {
            email.addEventListener('input', (e) => {
                this.validateField('EMAIL', e.target.value, e.target);
            });
        }

        // Address validation
        const address = document.getElementById('address');
        if (address) {
            address.addEventListener('input', (e) => {
                this.validateField('ADDRESS', e.target.value, e.target);
            });
        }
    }

    setupCharacterCounters() {
        const fields = ['restaurantName', 'tagline', 'description'];
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                const maxLength = field.getAttribute('maxlength');
                if (maxLength) {
                    this.updateCharCount(field, parseInt(maxLength));
                }
            }
        });
    }

    setupPhoneFormatting() {
        const phoneField = document.getElementById('phone');
        if (phoneField) {
            phoneField.addEventListener('keypress', (e) => {
                // Only allow numbers
                if (!/\d/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Enter'].includes(e.key)) {
                    e.preventDefault();
                }
            });
        }
    }

    setupPriceFormatting() {
        // Price formatting for menu items will be handled when menu items are added
    }

    validateField(ruleKey, value, element) {
        const rule = this.rules[ruleKey];
        const errors = [];

        // Required validation
        if (rule.required && (!value || value.trim() === '')) {
            errors.push('This field is required');
        }

        if (value && value.trim() !== '') {
            // Length validation
            if (rule.minLength && value.length < rule.minLength) {
                errors.push(`Minimum ${rule.minLength} characters required`);
            }
            if (rule.maxLength && value.length > rule.maxLength) {
                errors.push(`Maximum ${rule.maxLength} characters allowed`);
            }

            // Pattern validation
            if (rule.pattern && !rule.pattern.test(value)) {
                errors.push(rule.message || 'Invalid format');
            }

            // Numeric validation
            if (rule.min !== undefined) {
                const numValue = parseFloat(value);
                if (numValue < rule.min) {
                    errors.push(`Minimum value: ${rule.min}`);
                }
            }
            if (rule.max !== undefined) {
                const numValue = parseFloat(value);
                if (numValue > rule.max) {
                    errors.push(`Maximum value: ${rule.max}`);
                }
            }
        }

        // Update UI
        this.updateFieldValidation(element, errors);
        
        // Store errors
        const fieldName = element.name || element.id;
        if (errors.length > 0) {
            this.errors[fieldName] = errors;
        } else {
            delete this.errors[fieldName];
        }

        return errors.length === 0;
    }

    updateFieldValidation(element, errors) {
        const formGroup = element.closest('.form-group');
        const errorElement = formGroup?.querySelector('.error-message');
        
        if (errorElement) {
            if (errors.length > 0) {
                errorElement.textContent = errors[0];
                errorElement.style.display = 'block';
                element.classList.add('error');
                formGroup.classList.add('has-error');
            } else {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
                element.classList.remove('error');
                formGroup.classList.remove('has-error');
            }
        }
    }

    updateCharCount(element, maxLength) {
        const formGroup = element.closest('.form-group');
        const counter = formGroup?.querySelector('.char-counter');
        
        if (counter) {
            const currentLength = element.value.length;
            counter.textContent = `${currentLength}/${maxLength} characters`;
            
            if (currentLength > maxLength * 0.9) {
                counter.classList.add('warning');
            } else {
                counter.classList.remove('warning');
            }
        }
    }

    formatPhone(element) {
        let value = element.value.replace(/\D/g, '');
        
        if (value.length >= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        } else if (value.length >= 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        }
        
        element.value = value;
    }

    formatPrice(element) {
        let value = element.value.replace(/[^\d.]/g, '');
        
        // Ensure only one decimal point
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }
        
        // Limit to 2 decimal places
        if (parts[1] && parts[1].length > 2) {
            value = parts[0] + '.' + parts[1].slice(0, 2);
        }
        
        element.value = value;
    }

    validateStep(stepNumber) {
        const stepElement = document.getElementById(`step${stepNumber}`);
        const requiredFields = stepElement.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            const fieldName = field.name || field.id;
            let ruleKey = 'RESTAURANT_NAME'; // default

            // Map field names to validation rules
            switch (fieldName) {
                case 'restaurantName':
                    ruleKey = 'RESTAURANT_NAME';
                    break;
                case 'tagline':
                    ruleKey = 'TAGLINE';
                    break;
                case 'description':
                    ruleKey = 'DESCRIPTION';
                    break;
                case 'phone':
                    ruleKey = 'PHONE';
                    break;
                case 'email':
                    ruleKey = 'EMAIL';
                    break;
                case 'address':
                    ruleKey = 'ADDRESS';
                    break;
            }

            if (!this.validateField(ruleKey, field.value, field)) {
                isValid = false;
            }
        });

        // Step-specific validation
        switch (stepNumber) {
            case 4: // Menu validation
                isValid = this.validateMenu() && isValid;
                break;
            case 5: // Image validation
                isValid = this.validateImages() && isValid;
                break;
        }

        return isValid;
    }

    validateMenu() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        if (menuItems.length < 6) {
            this.showError('Please add at least 6 menu items');
            return false;
        }

        if (menuItems.length > 12) {
            this.showError('Maximum 12 menu items allowed');
            return false;
        }

        let isValid = true;
        menuItems.forEach((item, index) => {
            const nameField = item.querySelector('[name$="Name"]');
            const descField = item.querySelector('[name$="Description"]');
            const priceField = item.querySelector('[name$="Price"]');

            if (!this.validateField('MENU_ITEM_NAME', nameField.value, nameField)) {
                isValid = false;
            }
            if (!this.validateField('MENU_DESCRIPTION', descField.value, descField)) {
                isValid = false;
            }
            if (!this.validateField('PRICE', priceField.value, priceField)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateImages() {
        const requiredImages = ['logo', 'hero', 'interior'];
        let isValid = true;

        requiredImages.forEach(imageType => {
            const upload = document.getElementById(`${imageType}Upload`);
            if (!upload.files || upload.files.length === 0) {
                this.showError(`${imageType.charAt(0).toUpperCase() + imageType.slice(1)} image is required`);
                isValid = false;
            }
        });

        return isValid;
    }

    showError(message) {
        // Create or update error notification
        let errorNotification = document.querySelector('.error-notification');
        if (!errorNotification) {
            errorNotification = document.createElement('div');
            errorNotification.className = 'error-notification';
            document.querySelector('.form-container').prepend(errorNotification);
        }
        
        errorNotification.textContent = message;
        errorNotification.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorNotification.style.display = 'none';
        }, 5000);
    }

    getValidationSummary() {
        return {
            isValid: Object.keys(this.errors).length === 0,
            errors: this.errors,
            errorCount: Object.keys(this.errors).length
        };
    }
}

// Initialize validator
const validator = new RestaurantValidator();