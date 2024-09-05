const login = document.querySelector(".login-btn");
login.addEventListener("click", (event)=>{
  event.preventDefault();

// const form = document.getElementById('loginForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
const role = document.getElementById('role');


const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const roleError = document.getElementById('role-error');



  if (email.value === '') {
    emailError.textContent = 'Email is required';
  } else if (!email.value.includes('@')) {
    emailError.textContent = 'Invalid email address';
  } else {
    emailError.textContent = '';
  }

  if (password.value === '') {
    passwordError.textContent = 'Password is required';
  } else if (password.value.length < 8) {
    passwordError.textContent = 'Password must be at least 8 characters long';
  } else {
    passwordError.textContent = '';
  }

  if (role.value === '') {
    roleError.textContent = 'Role is required';
  } else {
    roleError.textContent = '';
  }

 
  if (emailError.textContent === '' && passwordError.textContent === '' && roleError.textContent === '') {
  //   Submit the form
  //   form.submit();
  // } else {

  //   alert('Please fill in all required fields');
   }
});