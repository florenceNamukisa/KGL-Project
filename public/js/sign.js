document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('registrationForm');
    const userName = document.getElementById('userName');
    const role = document.getElementById('role');
    const branch = document.getElementById('branch');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    const errorUserName = document.getElementById('error-userName');
    const errorRole = document.getElementById('error-role');
    const errorBranch = document.getElementById('error-branch');
    const errorEmail = document.getElementById('error-email');
    const errorPassword = document.getElementById('error-password');
    const errorConfirmPassword = document.getElementById('error-confirmPassword');
    
    form.addEventListener('submit', function (event) {
      let isValid = true;
      
      // Clear previous error messages
      errorUserName.textContent = '';
      errorRole.textContent = '';
      errorBranch.textContent = '';
      errorEmail.textContent = '';
      errorPassword.textContent = '';
      errorConfirmPassword.textContent = '';
      
      // User name validation
      if (userName.value.trim() === '') {
        errorUserName.textContent = 'Please enter a valid username';
        isValid = false;
      }
      
      // Role validation
      if (role.value.trim() === '') {
        errorRole.textContent = 'Please select a role';
        isValid = false;
      }
      
      // Branch validation
      if (branch.value.trim() === '') {
        errorBranch.textContent = 'Please select a branch';
        isValid = false;
      }
      
      // Email validation
      const emailValue = email.value.trim();
      if (!validateEmail(emailValue)) {
        errorEmail.textContent = 'Please enter a valid email address';
        isValid = false;
      }
      
      // Password validation
      if (password.value.trim().length < 8) {
        errorPassword.textContent = 'Password must be at least 8 characters long';
        isValid = false;
      }
      
      // Confirm password validation
      if (password.value.trim() !== confirmPassword.value.trim()) {
        errorConfirmPassword.textContent = 'Passwords do not match';
        isValid = false;
      }
      
      // If any validation fails, prevent form submission
      if (!isValid) {
        event.preventDefault();
      }
    });
    
    // Email validation function using regex
    function validateEmail(email) {
      const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ ;
      return re.test(String(email).toLowerCase());
    }
  });
  