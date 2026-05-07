//Personal data handling is minimised and stored locally (NFR-1, NFR-2, NFR-3)
//System maintenance scheduling would be handled server-side (NFR-10)
if (localStorage.getItem("homeFinderUsers")) {
  users = JSON.parse(localStorage.getItem("homeFinderUsers"));
}

//LOGIN
let loginBox = document.getElementById("loginBox");
let loginMessage = document.getElementById("loginMessage");
let loginButton = document.getElementById("loginButton");
let email = document.getElementById("email");
let password = document.getElementById("password");

//EMAIL TOKEN
let tokenBox = document.getElementById("tokenBox");
let tokenInput = document.getElementById("tokenInput");
let verifyToken = document.getElementById("verifyToken");
let tokenMessage = document.getElementById("tokenMessage");
let currentToken;
let currentUser;

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

//DASHBOARD
let dashboard = document.getElementById("dashboard")
let logOutButton = document.getElementById("logOutButton")
let searchInput = document.querySelector("#searchBox input");
let searchButton = document.getElementById("searchButton");

//ADMIN ACCESS
let adminAccess = document.getElementById("adminAccess");
let propertyName = document.getElementById("propertyName");
let propertyType = document.getElementById("propertyType");
let propertyAddress = document.getElementById("propertyAddress");
let propertyPrice = document.getElementById("propertyPrice");
let propertyBedrooms = document.getElementById("propertyBedrooms");
let propertyBathrooms = document.getElementById("propertyBathrooms");
let propertyAmenities = document.getElementById("propertyAmenities");
let propertyDescription = document.getElementById("propertyDescription");
let addPropertyButton = document.getElementById("addPropertyButton");
let propertyMessage = document.getElementById("propertyMessage");
let propertyList = document.getElementById("propertyList");
let propertyStatus = document.getElementById("propertyStatus");

//INQUIRIES
let inquiryButton = document.getElementById("inquiryButton");
let inquiryProperty = document.getElementById("inquiryProperty");
let inquirySection = document.getElementById("inquirySection");
let inquiryMessage = document.getElementById("inquiryMessage");
let inquiryDate = document.getElementById("inquiryDate");
let inquiryResult = document.getElementById("inquiryResult");


//HANDLE USER LOGIN (FR-6&7)
loginButton.addEventListener("click", function (event) {
    event.preventDefault();

    let userEmail = email.value;
    let userPassword = password.value;

    let matchedUser = users.find(function(account) {
        return account.email === userEmail && account.password === userPassword;
    });

    //TOKEN VERIFICATION (FR-8, NFR-4)
    if (matchedUser) {
        currentUser = matchedUser;

        currentToken = Math.floor(100000 + Math.random() * 900000);

        //Sending token (NFR-8)
        sendVerificationEmail(userEmail, currentToken);

        alert("Verification Token: " + currentToken);

        loginBox.style.display = "none";
        tokenBox.style.display = "block";

    } else if (userEmail === "" || userPassword === "") {
        loginMessage.textContent = "Please complete all fields.";
        loginMessage.className = "error"; 
        
    } else {
        loginMessage.textContent = "Incorrect email or password.";
        loginMessage.className = "error";
    }

});

//EMAIL SYSTEM (NFR-8)
function sendVerificationEmail(email, token) {
    console.log("Sending email to " + email + " with token: " + token);
}

verifyToken.addEventListener("click", function() {
    let enteredToken = tokenInput.value;

    if (enteredToken == currentToken) {
        tokenBox.style.display = "none";
        dashboard.style.display = "block";
        tokenInput.value = "";
    } else {
        tokenMessage.textContent = "Invalid Token.";
    }

    //ROLE ACCESS CONTROL FOR ADMIN/CUSTOMER (NFR-6)
    if (currentUser.role === "admin") {
        adminAccess.style.display = "block";
        inquirySection.style.display = "none";
    } else {
        adminAccess.style.display = "none";
        inquirySection.style.display ="block";
    }
});

//REGISTRATION (FR-1&2)
showSignUp.addEventListener("click", function (event) {
    event.preventDefault();
    loginBox.style.display = "none";
    signUpBox.style.display = "block";
});

createAccount.addEventListener("click", function() {
    let name = fullName.value;
    let email = signUpEmail.value;
    let password = signUpPassword.value;
    let confirm = confirmPassword.value;

    if (name === "" || email === "" || password === "" || confirm === "") {
        signUpMessage.textContent = "Please complete all fields.";
        signUpMessage.className = "error";
    }
    else if (password.length < 8) {
        signUpMessage.textContent = "Password must have a minimum of 8 characters.";
        signUpMessage.className = "error";
    }
    else if (password !== confirm) {
        signUpMessage.textContent = "Passwords do not match.";
        signUpMessage.className = "error";
    }
    else {
        signUpMessage.textContent = "Account created successfully!";
        signUpMessage.className = "success";

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

//SEARCH/BROWSE PROPERTIES (FR-10)
searchButton.addEventListener("click", function() {
    let searchValue = searchInput.value.toLowerCase();
    propertyList.innerHTML = "";

    let filteredProperties = properties.filter(function(property) {
        return property.name.toLowerCase().includes(searchValue) ||
               property.type.toLowerCase().includes(searchValue);
    });

    filteredProperties.forEach(function(property) {
        propertyList.innerHTML += `
            <div class="propertyCard">
                <h4>${property.name}</h4>
                <p>Type: ${property.type}</p>
                <p>Address: ${property.address}</p>
                <p>Price: £${property.price}</p>
                <p>Bedrooms: ${property.bedrooms}</p>
                <p>Bathrooms: ${property.bathrooms}</p>
                <p>Amenities: ${property.amenities}</p>
                <p>Status: ${property.status}</p>
                <p>${property.description}</p>
            </div>`;
    });
});

//LOGOUT
logOutButton.addEventListener("click", function () {
    dashboard.style.display ="none";
    loginBox.style.display = "block";
    loginMessage.textContent = "";
    searchInput.value = "";
    inquiryProperty.value = "";
    inquiryMessage.value = "";
    inquiryResult.textContent = "";   
});

//ADMIN - ADD PROPERTY (FR-26)
addPropertyButton.addEventListener("click", function() {

    let newProperty = {
        name: propertyName.value,
        type: propertyType.value,
        address: propertyAddress.value,
        price: propertyPrice.value,
        bedrooms: propertyBedrooms.value,
        bathrooms: propertyBathrooms.value,
        amenities: propertyAmenities.value,
        description: propertyDescription.value,
        status: propertyStatus.value
    };

    if (propertyName.value === "" || propertyType.value === "" || propertyAddress.value === "" || propertyPrice.value === "" || propertyBedrooms.value === ""|| 
        propertyBathrooms.value === "" || propertyAmenities.value === "" || propertyDescription.value === "" || propertyStatus.value === "") {
        propertyMessage.textContent = "Please complete all required property details.";
        propertyMessage.className = "error";
        return;
    }

    let duplicateProperty = properties.find(function(property){
        return property.name === propertyName.value &&
               property.type === propertyType.value &&
               property.address === propertyAddress.value &&
               property.price === propertyPrice.value &&
               property.bedrooms === propertyBedrooms.value &&
               property.bathrooms === propertyBathrooms.value &&
               property.amenities === propertyAmenities.value &&
               property.description === propertyDescription.value &&
               property.status === propertyStatus.value;
    });

    if (duplicateProperty) {
        propertyMessage.textContent = "A property with the same details already exists.";
        propertyMessage.className = "error";
        return;
    }

    properties.push(newProperty);

    propertyMessage.textContent = "Property added successfully!";
    propertyMessage.className = "success";

    propertyName.value = "";
    propertyType.value = "";
    propertyAddress.value = "";
    propertyPrice.value = "";
    propertyBedrooms.value = "";
    propertyBathrooms.value = "";
    propertyAmenities.value = "";
    propertyDescription.value = "";
    propertyStatus.value = "Available";
});

//GROUP PROPERTY LISTINGS
function groupPropertyListings() {
    //Future implementation for grouping properties by type
}

//SUBMIT INQUIRY (FR-20)
inquiryButton.addEventListener("click",function() {
    let property = inquiryProperty.value;
    let inquiryText = inquiryMessage.value;
    let date = inquiryDate.value;

    if (property === "" || inquiryText === "" || inquiryDate === "") {
        inquiryResult.textContent = "Please fill in all fields.";
        inquiryResult.className = "error";
    } else {
        inquiryResult.textContent = "Inquiry submitted successfully!";
        inquiryResult.className = "success";

        //Store inquiry
        inquiries.push({
            property: property,
            message: inquiryText,
            date: inquiryDate,
            iStatus: "Pending",

            user: currentUser.email
        });

        inquiryProperty.value = "";
        inquiryDate.value = "";
        inquiryMessage.value = "";
    }
});

//PAYMENT SYSTEM (NFR-7)
function processPayment(amount) {
    console.log("Processing payment of £" + amount);
    return "Payment successful!";
}
