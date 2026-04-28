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

    if (userEmail === user[0].email && userPassword === user[0].password) {
        console.log("login success");
        message.textContent = "Login successful";
        loginBox.style.display = "none";
        dashboard.style.display = "block";

    } else {
        console.log("login fail");
        message.textContent = "Invalid credentials";
    }
});