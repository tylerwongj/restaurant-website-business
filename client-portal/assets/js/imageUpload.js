// Image upload and preview functionality

class ImageUploadManager {
    constructor() {
        this.uploadedImages = {};
        this.maxFileSize = 5 * 1024 * 1024; // 5MB
        this.allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        this.foodUploadCount = 0;
        
        this.initializeUploads();
    }

    initializeUploads() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupMainUploads();
            this.addInitialFoodUploads();
        });
    }

    setupMainUploads() {
        // Setup main image uploads
        const mainUploads = ['logo', 'hero', 'interior'];
        
        mainUploads.forEach(type => {
            const uploadInput = document.getElementById(`${type}Upload`);
            if (uploadInput) {
                uploadInput.addEventListener('change', (e) => {
                    this.handleFileUpload(e, type);
                });
            }
        });
    }

    addInitialFoodUploads() {
        // Add 4 initial food upload slots
        for (let i = 0; i < 4; i++) {
            this.addFoodUpload();
        }
    }

    triggerUpload(type) {
        const uploadInput = document.getElementById(`${type}Upload`);
        if (uploadInput) {
            uploadInput.click();
        }
    }

    handleFileUpload(event, type) {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file
        const validation = this.validateFile(file, type);
        if (!validation.isValid) {
            alert(validation.message);
            event.target.value = '';
            return;
        }

        // Show preview
        this.showImagePreview(file, type);
        
        // Store file reference
        this.uploadedImages[type] = file;
        
        // Update UI
        this.updateUploadStatus(type, true);
    }

    validateFile(file, type) {
        // Check file type
        if (!this.allowedTypes.includes(file.type)) {
            return {
                isValid: false,
                message: 'Please upload a JPEG, PNG, or WebP image'
            };
        }

        // Check file size
        if (file.size > this.maxFileSize) {
            return {
                isValid: false,
                message: 'File size must be less than 5MB'
            };
        }

        // Type-specific validation
        const typeValidation = this.validateImageType(file, type);
        if (!typeValidation.isValid) {
            return typeValidation;
        }

        return { isValid: true };
    }

    validateImageType(file, type) {
        const recommendations = {
            logo: {
                preferredType: 'image/png',
                message: 'Logo should preferably be PNG with transparent background'
            },
            hero: {
                minWidth: 1000,
                minHeight: 600,
                message: 'Hero image should be at least 1000x600 pixels'
            },
            interior: {
                minWidth: 600,
                minHeight: 400,
                message: 'Interior image should be at least 600x400 pixels'
            },
            food: {
                minWidth: 400,
                minHeight: 300,
                message: 'Food images should be at least 400x300 pixels'
            }
        };

        const rec = recommendations[type];
        if (!rec) return { isValid: true };

        // For now, just return valid (in production, you'd check dimensions)
        return { isValid: true };
    }

    showImagePreview(file, type) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const previewContainer = document.getElementById(`${type}Preview`);
            if (previewContainer) {
                previewContainer.innerHTML = `
                    <img src="${e.target.result}" alt="${type} preview" style="max-width: 100%; max-height: 200px; object-fit: cover;">
                    <div class="preview-info">
                        <span class="file-name">${file.name}</span>
                        <span class="file-size">${this.formatFileSize(file.size)}</span>
                        <button type="button" class="remove-image" onclick="imageManager.removeImage('${type}')">×</button>
                    </div>
                `;
                previewContainer.style.display = 'block';
                
                // Hide upload content
                const uploadContent = previewContainer.parentElement.querySelector('.upload-content');
                if (uploadContent) {
                    uploadContent.style.display = 'none';
                }
            }
        };
        
        reader.readAsDataURL(file);
    }

    removeImage(type) {
        // Remove from stored images
        delete this.uploadedImages[type];
        
        // Clear file input
        const uploadInput = document.getElementById(`${type}Upload`);
        if (uploadInput) {
            uploadInput.value = '';
        }
        
        // Hide preview
        const previewContainer = document.getElementById(`${type}Preview`);
        if (previewContainer) {
            previewContainer.style.display = 'none';
            previewContainer.innerHTML = '';
            
            // Show upload content
            const uploadContent = previewContainer.parentElement.querySelector('.upload-content');
            if (uploadContent) {
                uploadContent.style.display = 'block';
            }
        }
        
        // Update UI
        this.updateUploadStatus(type, false);
    }

    updateUploadStatus(type, hasImage) {
        const uploadBox = document.querySelector(`#${type}Upload`).closest('.upload-box');
        if (uploadBox) {
            if (hasImage) {
                uploadBox.classList.add('has-image');
            } else {
                uploadBox.classList.remove('has-image');
            }
        }
    }

    addFoodUpload() {
        this.foodUploadCount++;
        const foodContainer = document.getElementById('foodUploads');
        
        if (!foodContainer) return;
        
        const foodUploadDiv = document.createElement('div');
        foodUploadDiv.className = 'upload-item food-upload';
        foodUploadDiv.innerHTML = `
            <label>Food Photo ${this.foodUploadCount}</label>
            <div class="upload-box" onclick="imageManager.triggerFoodUpload(${this.foodUploadCount})">
                <input type="file" id="food${this.foodUploadCount}Upload" accept=".png,.jpg,.jpeg" style="display: none;">
                <div class="upload-content">
                    <span class="upload-icon">🍽️</span>
                    <p>Click to upload food photo</p>
                    <small>Recommended: 500x400px</small>
                </div>
                <div class="image-preview" id="food${this.foodUploadCount}Preview" style="display: none;"></div>
            </div>
            <button type="button" class="remove-upload" onclick="imageManager.removeFoodUpload(${this.foodUploadCount})">Remove</button>
        `;
        
        foodContainer.appendChild(foodUploadDiv);
        
        // Setup event listener
        const uploadInput = document.getElementById(`food${this.foodUploadCount}Upload`);
        uploadInput.addEventListener('change', (e) => {
            this.handleFileUpload(e, `food${this.foodUploadCount}`);
        });
        
        // Update button visibility
        this.updateAddFoodButton();
    }

    triggerFoodUpload(index) {
        const uploadInput = document.getElementById(`food${index}Upload`);
        if (uploadInput) {
            uploadInput.click();
        }
    }

    removeFoodUpload(index) {
        const uploadDiv = document.querySelector(`#food${index}Upload`).closest('.food-upload');
        if (uploadDiv) {
            uploadDiv.remove();
        }
        
        // Remove from stored images
        delete this.uploadedImages[`food${index}`];
        
        // Update button visibility
        this.updateAddFoodButton();
    }

    updateAddFoodButton() {
        const foodUploads = document.querySelectorAll('.food-upload');
        const addButton = document.querySelector('.btn-add-food');
        
        if (addButton) {
            if (foodUploads.length >= 12) {
                addButton.style.display = 'none';
            } else {
                addButton.style.display = 'block';
            }
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    getUploadedImages() {
        return this.uploadedImages;
    }

    hasRequiredImages() {
        const required = ['logo', 'hero', 'interior'];
        return required.every(type => this.uploadedImages[type]);
    }

    getFoodImages() {
        const foodImages = {};
        Object.keys(this.uploadedImages).forEach(key => {
            if (key.startsWith('food')) {
                foodImages[key] = this.uploadedImages[key];
            }
        });
        return foodImages;
    }

    async processImagesForExport() {
        const processedImages = {};
        
        for (const [type, file] of Object.entries(this.uploadedImages)) {
            try {
                // Convert to base64 for JSON export
                const base64 = await this.fileToBase64(file);
                processedImages[type] = {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    data: base64
                };
            } catch (error) {
                console.error(`Error processing ${type} image:`, error);
            }
        }
        
        return processedImages;
    }

    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
}

// Global functions for HTML onclick handlers
function triggerUpload(type) {
    if (window.imageManager) {
        window.imageManager.triggerUpload(type);
    }
}

function addFoodUpload() {
    if (window.imageManager) {
        window.imageManager.addFoodUpload();
    }
}

// Initialize image manager
const imageManager = new ImageUploadManager();
window.imageManager = imageManager;