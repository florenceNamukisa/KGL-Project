document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('procurementForm');

  // Listen for the form's submit event
  form.addEventListener('submit', function(event) {
      event.preventDefault();
      const isValid = form.checkValidity();
      if (isValid) {
          form.submit();
          window.location.href = '/produce';
      } else {
          // If the form is not valid, show an alert or handle accordingly
          alert('Please fill out all required fields.');
      }
  });
});
