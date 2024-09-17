document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');

  form.addEventListener('submit', function (event) {
    let isValid = true;

    // Clear previous error messages
    emailError.textContent = '';
    passwordError.textContent = '';

    // Email validation
    const emailValue = emailInput.value.trim();
    if (!validateEmail(emailValue)) {
      emailError.textContent = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    const passwordValue = passwordInput.value.trim();
    if (passwordValue.length < 8) {
      passwordError.textContent = 'Password must be at least 8 characters long';
      isValid = false;
    }

    if (!isValid) {
      // Prevent form submission if validation fails
      event.preventDefault();
    }
  });

  // Email validation function using regex
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(String(email).toLowerCase());
  }
});
