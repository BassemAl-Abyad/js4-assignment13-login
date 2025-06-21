// global variables
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");

// welcome message and email display
var username = localStorage.getItem("sessionUsername");
var email = localStorage.getItem("sessionEmail");
if (username) {
  document.getElementById("username").innerHTML = `Welcome ${username}!`;
  document.getElementById("email").innerHTML = `Email: ${email}`;
}

// check if user is logged in
var signUpArray = [];
if (localStorage.getItem("users") == null) {
  signUpArray = [];
} else {
  signUpArray = JSON.parse(localStorage.getItem("users"));
}

// Only run email validation on signup and index pages
if (
  location.pathname.endsWith("signup.html") ||
  location.pathname.endsWith("index.html") ||
  location.pathname === "/"
) {
  var emailInput = document.getElementById("signinEmail");
  var emailError = document.getElementById("emailError");
  if (emailInput && emailError) {
    emailInput.addEventListener("input", function () {
      if (isValidEmail(emailInput.value)) {
        emailError.classList.remove("d-block");
        emailError.classList.add("d-none");
      } else {
        emailError.classList.remove("d-none");
        emailError.classList.add("d-block");
      }
    });
  }
}

// Function to validate email format
function isValidEmail(email) {
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Function to check if the signup fields are empty
function isEmpty() {
  if (
    signupName.value == "" ||
    signupEmail.value == "" ||
    signupPassword.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

// Function to check if the email already exists in the signUpArray
function isEmailExist() {
  for (var i = 0; i < signUpArray.length; i++) {
    if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
      return false;
    }
  }
}

// signup function
function signUp() {
  if (isEmpty() == false) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">Email, username and password are required.</span>';
    return false;
  }
  if (!isValidEmail(signupEmail.value)) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">Please enter a valid email address.</span>';
    return false;
  }
  var signUp = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };
  if (signUpArray.length == 0) {
    signUpArray.push(signUp);
    localStorage.setItem("users", JSON.stringify(signUpArray));
    document.getElementById("exist").innerHTML =
      '<span class="text-success m-3">Success!</span>';
    return true;
  }
  if (isEmailExist() == false) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">Email already exists, please login.</span>';
  } else {
    signUpArray.push(signUp);
    localStorage.setItem("users", JSON.stringify(signUpArray));
    document.getElementById("exist").innerHTML =
      '<span class="text-success m-3">Success!</span>';
  }
}

// Function to check if the email and password fields are empty
function isLoginEmpty() {
  if (signinPassword.value == "" || signinEmail.value == "") {
    return false;
  } else {
    return true;
  }
}

// login function
function login() {
  if (isLoginEmpty() == false) {
    document.getElementById("incorrect").innerHTML =
      '<span class="text-danger m-3">Email and password are required.</span>';
    return false;
  }
  var password = signinPassword.value;
  var email = signinEmail.value;
  if (!isValidEmail(email)) {
    document.getElementById("incorrect").innerHTML =
      '<span class="text-danger m-3">Please enter a valid email address.</span>';
    return false;
  }
  var found = false;
  for (var i = 0; i < signUpArray.length; i++) {
    if (
      signUpArray[i].email.toLowerCase() == email.toLowerCase() &&
      signUpArray[i].password == password
    ) {
      localStorage.setItem("sessionUsername", signUpArray[i].name);
      localStorage.setItem("sessionEmail", signUpArray[i].email);
      location.replace("home.html");
      found = true;
      break;
    }
  }
  if (!found) {
    document.getElementById("incorrect").innerHTML =
      '<span class="p-2 text-danger">Incorrect email or password.</span>';
  }
}

// Function to log out the user
function logout() {
  localStorage.removeItem("sessionUsername");
  localStorage.removeItem("sessionEmail");
  location.replace("index.html");
}
