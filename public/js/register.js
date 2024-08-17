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

// register.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const submitBtn = document.getElementById('submitBtn');

    function validateForm() {
        let isValid = true;

        // Clear previous errors
        [firstName, lastName, email, password, confirmPassword].forEach(clearError);

        // Validate First Name
        if (!firstName.value.trim()) {
            showError(firstName, 'First Name is required');
            isValid = false;
        }

        // Validate Last Name
        if (!lastName.value.trim()) {
            showError(lastName, 'Last Name is required');
            isValid = false;
        }

        // Validate Email
        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate Password
        if (!password.value.trim()) {
            showError(password, 'Password is required');
            isValid = false;
        } else if (!validatePassword(password.value)) {
            showError(password, 'Password must be at least 8 characters long and contain both letters and numbers');
            isValid = false;
        }

        // Validate Confirm Password
        if (!confirmPassword.value.trim()) {
            showError(confirmPassword, 'Please confirm your password');
            isValid = false;
        } else if (password.value !== confirmPassword.value) {
            showError(confirmPassword, 'Passwords do not match');
            isValid = false;
        }

        return isValid;
    }

    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            console.log('Form is valid. Submitting...');
            submitBtn.classList.add('active');
            submitBtn.textContent = 'Creating Account...';
            // Here you would typically send the form data to your server
            // For demonstration, we'll just simulate a delay
            setTimeout(() => {
                console.log('Account created successfully!');
                submitBtn.textContent = 'Account Created';
                // Redirect or perform other actions after successful registration
            }, 2000);
        } else {
            console.log('Form is invalid');
        }
    });

    // Clear errors on input
    [firstName, lastName, email, password, confirmPassword].forEach(input => {
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
});