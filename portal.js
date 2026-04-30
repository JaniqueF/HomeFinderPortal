//Login
let loginBox = document.getElementById("loginBox");
let message = document.getElementById("message");
let button = document.getElementById("loginButton");
let email = document.getElementById("email");
let password = document.getElementById("password");
let dashboard = document.getElementById("dashboard");

button.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("clicked");
    let userEmail = email.value;
    let userPassword = password.value;
    console.log(userEmail);
    console.log(userPassword);

    let matchedUser = user.find(function(account) {
        return account.email === userEmail && account.password === userPassword;
    });

    if (matchedUser) {
        console.log("login success");
        loginBox.style.display = "none";
        dashboard.style.display = "block";

    } else {
        console.log("login fail");
        message.textContent = "Invalid credentials";
    }

});

//SignUp
let showSignUp = document.getElementById("showSignUp");
let signUpBox = document.getElementById("signUpBox");
let backToLogin = document.getElementById("backToLogin");
let createAccount = document.getElementById("createAccount");
let fullName = document.getElementById("fullName");
let signUpEmail = document.getElementById("signUpEmail");
let signUpPassword = document.getElementById("signUpPassword");
let confirmPassword = document.getElementById("confirmPassword");
let signUpMessage = document.getElementById("signUpMessage");

showSignUp.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("clicked");
    loginBox.style.display = "none";
    signUpBox.style.display = "block";

});

createAccount.addEventListener("click", function() {
    console.log("signup link clicked");
    let name = fullName.value;
    let email = signUpEmail.value;
    let password = signUpPassword.value;
    let confirm = confirmPassword.value;

    if (name === "" || email === "" || password === "" || confirm === "") {
        signUpMessage.textContent = "Please complete all fields.";
    }
    else if (password.length < 8) {
        signUpMessage.textContent = "Password must have a minimum of 8 characters.";

    }

    else if (password !== confirm) {
        signUpMessage.textContent = "Passwords do not match.";

    }

    else {
        signUpMessage.textContent = "Account created successfully!";
        user.push({
            fullName: name,
            email: email,
            password: password,
            role: "customer"
        });

        signUpBox.style.display = "none";
        loginBox.style.display = "block";
    }

});

backToLogin.addEventListener("click", function () {
    signUpBox.style.display ="none";
    loginBox.style.display = "block";
});


let inquiryButton = document.getElementById("inquiryButton");
let inquiryProperty = document.getElementById("inquiryProperty");
let inquiryMessage = document.getElementById("inquiryMessage");
let inquiryResult = document.getElementById("inquiryResult");

inquiryButton.addEventListener("click",function() {
    let property = inquiryProperty.value;
    let message = inquiryMessage.value;
    if (property === "" || message === "") {
    inquiryResult.textContent = "Please fill in all fields";
    } else {
    inquiryResult.textContent = "Inquiry submitted successfully";
    }



});