if (localStorage.getItem("homeFinderUsers")) {
  users = JSON.parse(localStorage.getItem("homeFinderUsers"));
}

//LOGIN
let loginBox = document.getElementById("loginBox");
let message = document.getElementById("message");
let button = document.getElementById("loginButton");
let email = document.getElementById("email");
let password = document.getElementById("password");

//SIGNUP
let showSignUp = document.getElementById("showSignUp");
let signUpBox = document.getElementById("signUpBox");
let backToLogin = document.getElementById("backToLogin");
let createAccount = document.getElementById("createAccount");
let fullName = document.getElementById("fullName");
let signUpEmail = document.getElementById("signUpEmail");
let signUpPassword = document.getElementById("signUpPassword");
let confirmPassword = document.getElementById("confirmPassword");
let signUpMessage = document.getElementById("signUpMessage");

//EMAIL TOKEN
let tokenBox = document.getElementById("tokenBox");
let tokenInput = document.getElementById("tokenInput");
let verifyToken = document.getElementById("verifyToken");
let tokenMessage = document.getElementById("tokenMessage");
let currentToken;
let currentUser;

//INQUIRIES
let inquiryButton = document.getElementById("inquiryButton");
let inquiryProperty = document.getElementById("inquiryProperty");
let inquiryMessage = document.getElementById("inquiryMessage");
let inquiryResult = document.getElementById("inquiryResult");

//DASHBOARD
let dashboard = document.getElementById("dashboard")
let logOutButton = document.getElementById("logOutButton")

//ADMIN ACCESS
let adminAccess = document.getElementById("adminAccess");
let propertyName = document.getElementById("propertyName");
let propertyType = document.getElementById("propertyType");
let propertyPrice = document.getElementById("propertyPrice");
let propertyDescription = document.getElementById("propertyDescription");
let addPropertyButton = document.getElementById("addPropertyButton");
let propertyMessage = document.getElementById("propertyMessage");
let propertyList = document.getElementById("propertyList");
let propertyStatus = document.getElementById("propertyStatus");
let properties = [];


//Login
button.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("clicked");
    let userEmail = email.value;
    let userPassword = password.value;
    console.log(userEmail);
    console.log(userPassword);

    let matchedUser = users.find(function(account) {
        return account.email === userEmail && account.password === userPassword;
    });

    if (matchedUser) {
        currentUser = matchedUser;
        console.log("login success");
        currentToken = Math.floor(100000 + Math.random() * 900000);
        loginBox.style.display = "none";
        tokenBox.style.display = "block";

        tokenMessage.textContent = "Token:" + currentToken;

    } else {
        console.log("login fail");
        message.textContent = "Invalid credentials";
    }

});

verifyToken.addEventListener("click", function() {
    let enteredToken = tokenInput.value;

    if (enteredToken == currentToken) {
        tokenMessage.textContent = "Verification Successful!";

        tokenBox.style.display = "none";
        dashboard.style.display = "block";
    } else {
        tokenMessage.textContent = "Invalid Token."
    }
    //Dashboard display based on user role
    if (currentUser.role === "admin") {
    adminAccess.style.display = "block";
    } else {
        adminAccess.style.display = "none";
    }

});

//SignUp

showSignUp.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("clicked");
    loginBox.style.display = "none";
    signUpBox.style.display = "block";

});

//Signup
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
        users.push({
            fullName: name,
            email: email,
            password: password,
            role: "customer"
        });

        localStorage.setItem("homeFinderUsers", JSON.stringify(users));
        signUpBox.style.display = "none";
        loginBox.style.display = "block";
    }

});

backToLogin.addEventListener("click", function () {
    signUpBox.style.display ="none";
    loginBox.style.display = "block";
});

//Dashboard
logOutButton.addEventListener("click", function () {
    dashboard.style.display ="none";
    loginBox.style.display = "block";
});

//Admin - Adding Properties
addPropertyButton.addEventListener("click", function() {
    console.log("add button clicked");
    console.log(propertyName.value);
    console.log(propertyType.value);
    console.log(propertyPrice.value);
    console.log(propertyDescription.value);
    console.log(propertyStatus.value);

    let newProperty = {
        name: propertyName.value,
        type: propertyType.value,
        price: propertyPrice.value,
        description: propertyDescription.value,
        status: propertyStatus.value
    };

    //Incomplete Details
    if (propertyName.value === "" || propertyType.value === "" || propertyPrice.value === "" ||
         propertyDescription.value === "" || propertyStatus.value === "") {
        propertyMessage.textContent = "Please complete all required property details.";
        return;
    }

    //Property Duplication
    let duplicateProperty = properties.find(function(property){
        return property.name === propertyName.value && property.type === propertyType.value && property.price === propertyPrice.value &&
        property.description === propertyDescription.value && property.status === propertyStatus.value;
    });

    if (duplicateProperty) {
        propertyMessage.textContent = "A property with the same details already exists.";
        return;
    }

    //Add Successful
    properties.push(newProperty);
    console.log(properties);
    propertyMessage.textContent = "Property added successfully!"
});

//inquiries
inquiryButton.addEventListener("click",function() {
    let property = inquiryProperty.value;
    let message = inquiryMessage.value;
    if (property === "" || message === "") {
    inquiryResult.textContent = "Please fill in all fields";
    } else {
    inquiryResult.textContent = "Inquiry submitted successfully";
    }



});