// form-validation.js
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    // At least 8 characters, containing both letters and numbers
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
}

function showError(inputElement, errorMessage) {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add('invalid');
}

function clearError(inputElement) {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove('invalid');
}
// login.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submitBtn');

    function validateForm() {
        let isValid = true;

        clearError(emailInput);
        clearError(passwordInput);

        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        if (!passwordInput.value.trim()) {
            showError(passwordInput, 'Password is required');
            isValid = false;
        } else if (!validatePassword(passwordInput.value)) {
            showError(passwordInput, 'Password must be at least 8 characters long and contain both letters and numbers');
            isValid = false;
        }

        return isValid;
    }

    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            console.log('Form is valid. Submitting...');
            submitBtn.classList.add('active');
            submitBtn.textContent = 'Logging in...';
            // Here you would typically send the form data to your server
            // For demonstration, we'll just simulate a delay
            setTimeout(() => {
                console.log('Login successful!');
                submitBtn.textContent = 'Logged In';
                // Redirect or perform other actions after successful login
            }, 2000);
        } else {
            console.log('Form is invalid');
        }
    });

    // Clear errors on input
    emailInput.addEventListener('input', function() {
        clearError(this);
    });

    passwordInput.addEventListener('input', function() {
        clearError(this);
    });
});