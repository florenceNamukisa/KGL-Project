document.getElementById('procurementForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission until validation passes

  // Clear previous error messages
  document.querySelectorAll('.error-message').forEach(function(el) {
    el.textContent = '';
  });

  // Form fields
  const produceName = document.getElementById('produceName');
  const produceType = document.getElementById('produceType');
  const date = document.getElementById('date');
  const time = document.getElementById('time');
  const tonnage = document.getElementById('tonnage');
  const cost = document.getElementById('cost');
  const dealerName = document.getElementById('dealerName');
  const branch = document.getElementById('branch');
  const contact = document.getElementById('contact');
  const sellingPrice = document.getElementById('sellingPrice');

  // Regular expressions for validation
  const alphanumericRegex = /^[a-zA-Z0-9\s]+$/;
  const numericRegex = /^[0-9]+$/;

  let isValid = true;

  // Produce Name validation
  if (!produceName.value.match(alphanumericRegex) || produceName.value.length < 2) {
    displayError(produceName, "Produce name must be alphanumeric and at least 2 characters.");
    isValid = false;
  }

  // Produce Type validation
  if (!produceType.value.match(alphanumericRegex) || produceType.value.length < 2) {
    displayError(produceType, "Produce type must be alphanumeric and at least 2 characters.");
    isValid = false;
  }

  // Date validation
  if (!date.value) {
    displayError(date, "Please select a date.");
    isValid = false;
  }

  // Time validation
  if (!time.value) {
    displayError(time, "Please select a time.");
    isValid = false;
  }

  // Tonnage validation
  if (!tonnage.value.match(numericRegex) || tonnage.value <= 0) {
    displayError(tonnage, "Tonnage must be a positive number.");
    isValid = false;
  }

  // Cost validation
  if (!cost.value.match(numericRegex) || cost.value <= 0) {
    displayError(cost, "Cost must be a positive number.");
    isValid = false;
  }

  // Dealer Name validation
  if (!dealerName.value.match(alphanumericRegex) || dealerName.value.length < 2) {
    displayError(dealerName, "Dealer's name must be alphanumeric and at least 2 characters.");
    isValid = false;
  }

  // Branch validation
  if (!branch.value) {
    displayError(branch, "Please select a branch.");
    isValid = false;
  }

  // Contact validation (10 digits)
  if (!contact.value.match(/^[0-9]{10}$/)) {
    displayError(contact, "Please enter a valid 10-digit phone number.");
    isValid = false;
  }

  // Selling Price validation
  if (!sellingPrice.value.match(numericRegex) || sellingPrice.value <= 0) {
    displayError(sellingPrice, "Selling price must be a positive number.");
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
