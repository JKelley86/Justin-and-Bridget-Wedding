document.addEventListener("DOMContentLoaded", function () {
    const menu = document.getElementById("menu");
    const loggedIn = localStorage.getItem("loggedIn") === "true";

    // Always display these options
    let menuOptions = `
        <a href="index.html">Home</a>
        <a href="ourstory.html">Our Story</a>
        <a href="info.html">Info</a>
        <a href="weddingparty.html">Wedding Party</a>
        <a href="registry.html">Registry</a>
        <a href="rsvp.html">RSVP</a>
    `;

    if (loggedIn) {
        // Add additional options for logged-in users
        menuOptions += `
            <a href="hiddendetails.html">Hidden Details</a>
            <a href="spotify.html">Spotify</a>
            <a href="#" id="logoutButton">Logout</a>
        `;
    } else {
        // Show login option when not logged in
        menuOptions += `
            <a href="#" id="loginButton">Login</a>
        `;
    }

    // Update the menu with the correct options
    menu.innerHTML = menuOptions;

    // Logout functionality
    document.getElementById("logoutButton")?.addEventListener("click", function () {
        localStorage.removeItem("loggedIn");
        window.location.reload();
    });

    // Show login popup
    document.getElementById("loginButton")?.addEventListener("click", function () {
        showLoginPopup();
    });

    function showLoginPopup() {
        const popup = document.createElement("div");
        popup.classList.add("login-popup");
        popup.innerHTML = `
            <div class="login-container">
                <h2>Login</h2>
                <input type="text" id="username" placeholder="Username">
                <input type="password" id="password" placeholder="Password">
                <button id="loginSubmit">Login</button>
                <button id="cancelButton">Cancel</button>
            </div>
        `;
        document.body.appendChild(popup);

        document.getElementById("loginSubmit").addEventListener("click", function () {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username === "yourUsername" && password === "yourPassword") {
                localStorage.setItem("loggedIn", "true");
                popup.innerHTML = "<h2>Welcome!</h2>";
                setTimeout(() => {
                    document.body.removeChild(popup);
                    window.location.reload();
                }, 1000);
            } else {
                alert("Incorrect username or password");
            }
        });

        document.getElementById("cancelButton").addEventListener("click", function () {
            document.body.removeChild(popup);
        });
    }
});
