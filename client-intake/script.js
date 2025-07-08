/**
 * Client Intake Form JavaScript
 * Handles form validation, submission, and data processing
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('client-form');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Form validation
    function validateForm() {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#dc3545';
            } else {
                field.style.borderColor = '#28a745';
            }
        });
        
        return isValid;
    }
    
    // Real-time validation
    form.addEventListener('input', function(e) {
        const field = e.target;
        if (field.hasAttribute('required')) {
            if (field.value.trim()) {
                field.style.borderColor = '#28a745';
            } else {
                field.style.borderColor = '#dc3545';
            }
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Show loading state
        form.classList.add('loading');
        submitBtn.textContent = 'Processing...';
        
        // Collect form data
        const formData = new FormData(form);
        const clientData = {};
        
        // Basic information
        clientData.restaurant_name = formData.get('restaurant_name');
        clientData.cuisine_type = formData.get('cuisine_type');
        clientData.description = formData.get('description');
        clientData.about_text = formData.get('about_text');
        clientData.phone = formData.get('phone');
        clientData.email = formData.get('email');
        clientData.address = formData.get('address');
        
        // Hours
        clientData.hours = {
            monday: formData.get('hours_monday') || 'Closed',
            tuesday: formData.get('hours_tuesday') || 'Closed',
            wednesday: formData.get('hours_wednesday') || 'Closed',
            thursday: formData.get('hours_thursday') || 'Closed',
            friday: formData.get('hours_friday') || 'Closed',
            saturday: formData.get('hours_saturday') || 'Closed',
            sunday: formData.get('hours_sunday') || 'Closed'
        };
        
        // Social media
        clientData.social_media = {
            facebook: formData.get('facebook_url') || '',
            instagram: formData.get('instagram_url') || '',
            twitter: formData.get('twitter_url') || ''
        };
        
        // Template preferences
        clientData.template_style = formData.get('template_style');
        clientData.color_preference = formData.get('color_preference') || 'warm';
        
        // Agreement status
        clientData.terms_agreed = formData.get('terms_agreed') === 'on';
        clientData.payment_ready = formData.get('payment_ready') === 'on';
        
        // Add submission metadata
        clientData.submission_date = new Date().toISOString();
        clientData.order_id = generateOrderId();
        
        // Process the order
        processOrder(clientData);
    });
    
    function generateOrderId() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 5);
        return `ORD-${timestamp}-${random}`.toUpperCase();
    }
    
    function processOrder(clientData) {
        // Simulate API call delay
        setTimeout(() => {
            try {
                // Save client data (in real implementation, this would go to a server)
                console.log('Client Order Data:', clientData);
                
                // Generate client data file for development
                const dataBlob = new Blob([JSON.stringify(clientData, null, 2)], {
                    type: 'application/json'
                });
                
                // Create download link
                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(dataBlob);
                downloadLink.download = `client-data-${clientData.order_id}.json`;
                
                // Show success message
                showSuccessMessage(clientData);
                
                // Reset form
                form.reset();
                
            } catch (error) {
                console.error('Error processing order:', error);
                showMessage('An error occurred while processing your order. Please try again.', 'error');
            } finally {
                // Remove loading state
                form.classList.remove('loading');
                submitBtn.textContent = 'Submit Order & Get Payment Instructions';
            }
        }, 2000);
    }
    
    function showSuccessMessage(clientData) {
        const successHtml = `
            <div class="success-message">
                <h3>Order Submitted Successfully! 🎉</h3>
                <p><strong>Order ID:</strong> ${clientData.order_id}</p>
                <p><strong>Restaurant:</strong> ${clientData.restaurant_name}</p>
                <p><strong>Style:</strong> ${clientData.template_style}</p>
                <hr style="margin: 20px 0;">
                <h4>Next Steps:</h4>
                <ol style="text-align: left; margin: 15px 0;">
                    <li>You'll receive payment instructions within 24 hours</li>
                    <li>After payment, you'll get asset upload instructions</li>
                    <li>Your website will be delivered in 48-72 hours</li>
                </ol>
                <p><strong>Questions?</strong> Reply to the confirmation email you'll receive shortly.</p>
            </div>
        `;
        
        form.insertAdjacentHTML('afterend', successHtml);
    }
    
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        messageDiv.textContent = message;
        
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.success-message, .error-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Add new message
        form.insertAdjacentElement('afterend', messageDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
        }
        e.target.value = value;
    });
    
    // Template style preview (future enhancement)
    const templateSelect = document.getElementById('template_style');
    templateSelect.addEventListener('change', function() {
        // Could add template preview functionality here
        console.log('Selected template style:', this.value);
    });
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        processOrder,
        generateOrderId
    };
}