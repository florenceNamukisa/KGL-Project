try {
document.addEventListener("DOMContentLoaded", ()=>{
const register = document.querySelector(".register-btn");
register.addEventListener("click", (event)=>{

//GETTING THE VALUES
const userName = document.getElementById("userName").value;
const role = document.getElementById("role").value;
const branch = document.getElementById("branch").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const confirmPassword = document.getElementById("confirmPassword").value;

//Setting conditions

let error = 0

if (!userName){
    alert("Please enter your name");
    error++;
    return;
    
}
function validateUserName(userName){
    const re = /^[a-zA-Z]+$/;
    return re.test(userName);
}
if (!validateUserName(userName)){
    alert("Please enter a username with  both upper and lower case");
    error++;
    return;
   
}
if (!role){
    alert("Please select your role");
    error++;
    return;
}
if (!branch){
    alert("Please select your branch");
    error++;
    return;
}
if (!email){
    alert("Please enter your email");
    error++;
    return;
}
function validateEmail(email){
    const re =/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(email);
}

if (!validateEmail(email)){
    alert("Please enter a valid email address");
    error++;
    return;
}
if (!password){
    alert("Please enter your password");
    error++;
    return;
}

function validatePassword(password){
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
}
if (!validatePassword(password)){
    alert("Password must be at least 8 characters long and contain both letters and numbers");
    error++;
    return;
}
if (!confirmPassword){
    alert("Please confirm your password");
    error++;
    return;
}

if (password!== confirmPassword){
    alert("Passwords do not match");
    error++;
    return;
}

if (error > 0){
    event.preventDefault();
}

});
});
} catch (error){
    console.error(error);
    alert("An error occurred");
 
}
