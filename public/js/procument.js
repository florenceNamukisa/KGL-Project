document.addEventListener('DOMContentLoaded', function() {
  // Select the form
  const form = document.getElementById('procurementForm');

  // Listen for the form's submit event
  form.addEventListener('submit', function(event) {
      // Prevent the form's default submit action to control it with JavaScript
      event.preventDefault();

      // Perform any necessary form validation or processing here
      // Example: Check if the form fields are filled correctly
      const isValid = form.checkValidity();
      if (isValid) {
          // If the form is valid, simulate form submission via JavaScript
          form.submit();

          // Redirect to the produce list page after form submission
          window.location.href = '/produce';
      } else {
          // If the form is not valid, show an alert or handle accordingly
          alert('Please fill out all required fields.');
      }
  });
});
