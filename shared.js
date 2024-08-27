// shared.js

// Function to show the login popup
function showLoginPopup() {
    document.getElementById("login-popup").style.display = "block";
}

// Function to hide the login popup
function hideLoginPopup() {
    document.getElementById("login-popup").style.display = "none";
}

// Function to check user credentials
function checkCredentials(username, password, callback) {
    fetch('users.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.username === username && u.password === password);
            callback(user);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            callback(null);
        });
}

// Function to handle login
function handleLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    checkCredentials(username, password, function(user) {
        if (user) {
            sessionStorage.setItem("loggedInUser", JSON.stringify(user));
            alert("Welcome " + username + "!");
            hideLoginPopup();
            updateMenu();
        } else {
            alert("Incorrect username or password. Please try again.");
        }
    });
}

// Function to handle logout
function handleLogout() {
    sessionStorage.removeItem("loggedInUser");
    alert("You have been logged out.");
    updateMenu(); // Update menu to reflect logout state
}

// Function to update menu based on login state
function updateMenu() {
    const menu = document.getElementById("menu");
    const loggedInUser = sessionStorage.getItem("loggedInUser");

    if (loggedInUser) {
        menu.innerHTML = `
            <a href="index.html">Home</a>
            <a href="ourstory.html">Our Story</a>
            <a href="info.html">Info</a>
            <a href="weddingparty.html">Wedding Party</a>
            <a href="registry.html">Registry</a>
            <a href="rsvp.html">RSVP</a>
            <a href="spotify.html">Spotify</a>
            <a href="secret.html">Hidden Details</a>
            <a href="#" id="logout-button">Logout</a>
        `;
        document.getElementById("logout-button").addEventListener("click", handleLogout);
    } else {
        menu.innerHTML = `
            <a href="index.html">Home</a>
            <a href="ourstory.html">Our Story</a>
            <a href="info.html">Info</a>
            <a href="weddingparty.html">Wedding Party</a>
            <a href="registry.html">Registry</a>
            <a href="rsvp.html">RSVP</a>
        `;
    }
}

// Event listener for login button
document.getElementById("login-button").addEventListener("click", handleLogin);

// Check if user is logged in on page load
document.addEventListener("DOMContentLoaded", updateMenu);
