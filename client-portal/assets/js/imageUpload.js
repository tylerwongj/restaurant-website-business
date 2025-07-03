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


    triggerUpload(type) {
        const uploadInput = document.getElementById(`${type}Upload`);
        if (uploadInput) {
            uploadInput.click();
        }
    }

    handleFileUpload(event, type) {
        const file = event.target.files[0];
        if (!file) return;

        // Clear any previous error
        this.clearUploadError(type);

        // Validate file
        const validation = this.validateFile(file, type);
        if (!validation.isValid) {
            this.showUploadError(type, validation.message);
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
            const thumbnailContainer = document.getElementById(`${type}Thumbnail`);
            if (thumbnailContainer) {
                thumbnailContainer.innerHTML = `
                    <img src="${e.target.result}" alt="${type} preview" class="thumbnail-img">
                    <div class="thumbnail-info">
                        <span class="file-name">${file.name}</span>
                        <span class="file-size">${this.formatFileSize(file.size)}</span>
                        <button type="button" class="remove-image" onclick="imageManager.removeImage('${type}')">×</button>
                    </div>
                `;
                thumbnailContainer.style.display = 'block';
                
                // Update upload box state
                const uploadBox = thumbnailContainer.parentElement.querySelector('.upload-box');
                if (uploadBox) {
                    uploadBox.classList.add('has-image');
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
        
        // Hide thumbnail
        const thumbnailContainer = document.getElementById(`${type}Thumbnail`);
        if (thumbnailContainer) {
            thumbnailContainer.style.display = 'none';
            thumbnailContainer.innerHTML = '';
        }
        
        // Clear any error messages
        this.clearUploadError(type);
        
        // Update upload box state
        const uploadBox = document.querySelector(`#${type}Upload`).closest('.upload-box');
        if (uploadBox) {
            uploadBox.classList.remove('has-image');
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

    showUploadError(type, message) {
        const uploadItem = document.querySelector(`#${type}Upload`).closest('.upload-item');
        if (uploadItem) {
            // Remove existing error if any
            const existingError = uploadItem.querySelector('.upload-error');
            if (existingError) {
                existingError.remove();
            }
            
            // Add error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'upload-error';
            errorDiv.innerHTML = `
                <span class="error-icon">⚠️</span>
                <span class="error-text">${message}</span>
            `;
            
            // Insert after the upload-row
            const uploadRow = uploadItem.querySelector('.upload-row');
            if (uploadRow) {
                uploadRow.insertAdjacentElement('afterend', errorDiv);
            }
            
            // Add error styling to upload box
            const uploadBox = uploadItem.querySelector('.upload-box');
            if (uploadBox) {
                uploadBox.classList.add('upload-error-state');
            }
        }
    }

    clearUploadError(type) {
        const uploadItem = document.querySelector(`#${type}Upload`).closest('.upload-item');
        if (uploadItem) {
            // Remove error message
            const errorDiv = uploadItem.querySelector('.upload-error');
            if (errorDiv) {
                errorDiv.remove();
            }
            
            // Remove error styling
            const uploadBox = uploadItem.querySelector('.upload-box');
            if (uploadBox) {
                uploadBox.classList.remove('upload-error-state');
            }
        }
    }
}

// Global functions for HTML onclick handlers
function triggerUpload(type) {
    if (window.imageManager) {
        window.imageManager.triggerUpload(type);
    }
}


// Initialize image manager
const imageManager = new ImageUploadManager();
window.imageManager = imageManager;