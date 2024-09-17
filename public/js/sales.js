document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission for validation
  
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(function(el) {
      el.textContent = '';
    });
  
    // Form fields
    const branch = document.getElementById('branch');
    const produceName = document.getElementById('produceName');
    const tonnage = document.getElementById('tonnage');
    const amountPaid = document.getElementById('amountPaid');
    const buyerName = document.getElementById('buyerName');
    const salesAgentName = document.getElementById('salesAgentName');
    const dateTime = document.getElementById('dateTime');
  
    // Regular expressions for validation
    const alphanumericRegex = /^[a-zA-Z0-9\s]+$/;
    const numericRegex = /^[0-9]+$/;
  
    let isValid = true;
  
    // Validation logic
    if (!produceName.value.match(alphanumericRegex)) {
      displayError(produceName, "Invalid Field.");
      isValid = false;
    }
  
    if (produceName.value.length < 2) {
      displayError(produceName, "Invalid field.");
      isValid = false;
    }
  
    if (!tonnage.value.match(numericRegex) || tonnage.value.length < 3) {
      displayError(tonnage, "Tonnage to least 3 characters long.");
      isValid = false;
    }
  
    if (!amountPaid.value.match(numericRegex) || amountPaid.value.length < 5) {
      displayError(amountPaid, "invalid field.");
      isValid = false;
    }
  
    if (!buyerName.value.match(alphanumericRegex) || buyerName.value.length < 2) {
      displayError(buyerName, " Invalid Feild.");
      isValid = false;
    }
  
    if (!salesAgentName.value.match(alphanumericRegex) || salesAgentName.value.length < 2) {
      displayError(salesAgentName, "Invalid Field.");
      isValid = false;
    }
  
    if (!dateTime.value) {
      displayError(dateTime, "Date and time must be selected.");
      isValid = false;
    }
  
    if (isValid) {
      this.submit(); // Proceed with form submission if validation passes
    }
  });
  
  // Function to display error messages
  function displayError(element, message) {
    let errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.style.color = 'red';
    errorElement.textContent = message;
    if (element.nextElementSibling) {
      element.nextElementSibling.textContent = message;
    } else {
      element.parentNode.appendChild(errorElement);
    }
  }
  