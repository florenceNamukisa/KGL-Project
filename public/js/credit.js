document.getElementById('creditForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission until validation passes
  
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(function(el) {
      el.textContent = '';
    });
  
    // Form fields
    const buyerName = document.getElementById('buyerName');
    const nationalId = document.getElementById('nationalId');
    const location = document.getElementById('location');
    const contact = document.getElementById('contact');
    const amountDue = document.getElementById('amountDue');
    const salesAgent = document.getElementById('salesAgent');
    const dueDate = document.getElementById('dueDate');
    const produceName = document.getElementById('produceName');
    const produceType = document.getElementById('produceType');
    const tonnage = document.getElementById('tonnage');
    const dispatchDate = document.getElementById('dispatchDate');
  
    // Regular expressions for validation
    const alphanumericRegex = /^[a-zA-Z0-9\s]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const nationalIdRegex = /^[A-Z]{3}[0-9]{8}[A-Z]{1}$/; // Example format for NIN, adjust as needed
    const numericRegex = /^[0-9]+$/;
  
    let isValid = true;
  
    // Buyer's Name validation
    if (!buyerName.value.match(alphanumericRegex) || buyerName.value.length < 2) {
      displayError(buyerName, "Buyer's name must be alphanumeric and at least 2 characters.");
      isValid = false;
    }
  
    // National ID validation
    // if (!nationalId.value.match(nationalIdRegex)) {
    //   displayError(nationalId, "Please enter a valid National ID.");
    //   isValid = false;
    // }
  
    // Location validation
    if (!location.value.match(alphanumericRegex) || location.value.length < 2) {
      displayError(location, "Invalid feild.");
      isValid = false;
    }
  
    // Contact validation
    if (!contact.value.match(phoneRegex)) {
      displayError(contact, "Please enter a valid 10-digit phone number.");
      isValid = false;
    }
  
    // Amount Due validation
    if (!amountDue.value.match(numericRegex) || amountDue.value.length < 5) {
      displayError(amountDue, "Invalid feild.");
      isValid = false;
    }
  
    // Sales Agent Name validation
    if (!salesAgent.value.match(alphanumericRegex) || salesAgent.value.length < 2) {
      displayError(salesAgent, "Sales agent's name Invalid.");
      isValid = false;
    }
  
    // Due Date validation
    if (!dueDate.value) {
      displayError(dueDate, "Due date must be selected.");
      isValid = false;
    }
  
    // Produce Name validation
    if (!produceName.value.match(alphanumericRegex) || produceName.value.length < 2) {
      displayError(produceName, "Invalid Field.");
      isValid = false;
    }
  
    // Produce Type validation
    if (!produceType.value.match(alphanumericRegex) || produceType.value.length < 2) {
      displayError(produceType, "Field Required.");
      isValid = false;
    }
  
    // Tonnage validation
    if (!tonnage.value.match(numericRegex) || tonnage.value <= 0) {
      displayError(tonnage, "Tonnage must be a positive number.");
      isValid = false;
    }
  
    // Dispatch Date validation
    if (!dispatchDate.value) {
      displayError(dispatchDate, "Date of dispatch must be selected.");
      isValid = false;
    }
  
    // Submit the form if validation passes
    if (isValid) {
      this.submit();
    }
  });
  
  // Function to display error messages
  function displayError(element, message) {
    let errorElement = element.nextElementSibling;
    errorElement.style.color = 'red';
    errorElement.textContent = message;
  }
  