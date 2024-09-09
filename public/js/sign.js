document.addEventListener("DOMContentLoaded", ()=>{
const register = document.querySelector(".register-btn");
register.addEventListener("click", (event)=>{
event.preventDefault();
//GETTING THE VALUES
const userName = document.getElementById("userName").value;
const role = document.getElementById("role").value;
const branch = document.getElementById("branch").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const confirmPassword = document.getElementById("confirmPassword").value;

//Setting conditions

if (!userName){
    alert("Please enter your name");
    return;
}

if (!validateUserName(userName)){
    alert("Please enter a username with  both upper and lower case");
    return;
}
if (!role){
    alert("Please select your role");
    return;
}
if (!branch){
    alert("Please select your branch");
    return;
}
if (!email){
    alert("Please enter your email");
    return;
}

if (!validateEmail(email)){
    alert("Please enter a valid email address");
    return;
}
if (!password){
    alert("Please enter your password");
    return;
}

if (!validatePassword(password)){
    alert("Password must be at least 8 characters long and contain both letters and numbers");
    return;
}
if (!confirmPassword){
    alert("Please confirm your password");
    return;
}

if (password!== confirmPassword){
    alert("Passwords do not match");
    return;
}
function validateEmail(email){
    const re =/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(email);
}
function validateUserName(userName){
    const re = /^[a-zA-Z]+$/;
    return re.test(userName);
}

function validatePassword(password){
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
}
});
});
