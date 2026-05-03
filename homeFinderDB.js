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

if (localStorage.getItem("homeFinderUsers")) {
    users = JSON.parse(localStorage.getItem("homeFinderUsers"));
}