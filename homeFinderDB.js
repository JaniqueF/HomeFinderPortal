//SERVER STORAGE(NFR-9)

let users = [
    {
        email: "customer@gmail.com",
        password: "password",
        role: "customer"
    },
    {
        email: "admin@homefinder.com",
        password: "admin1234",
        role: "admin"
    }
];

//PROPERTY STORAGE (SIMULATED DATABASE)
var properties = [];

//INQUIRY STORAGE (SIMULATED DATABASE)
var inquiries = [];

//Load users from localStorage
if (localStorage.getItem("homeFinderUsers")) {
    users = JSON.parse(localStorage.getItem("homeFinderUsers"));
}