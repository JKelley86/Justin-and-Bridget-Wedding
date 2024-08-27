// shared.js

// Function to check user credentials
async function checkCredentials(username, password) {
    try {
        const response = await fetch('users.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const users = await response.json();
        return users.find(user => user.username === username && user.password === password);
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
}

// Handle login
function handleLogin() {
    document.getElementById("login-button").onclick = async function() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const user = await checkCredentials(username, password);
        const welcomeMessage = document.getElementById("welcome-message");

        if (user) {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('username', username);
            welcomeMessage.textContent = "Welcome " + username + "!";
            setTimeout(() => {
                document.getElementById("login-popup").style.display = "none";
                updateMenu();
            }, 1000); // Show welcome message for 1 second
        } else {
            welcomeMessage.textContent = "Incorrect username or password. Please try again.";
            welcomeMessage.style.color = "red";
        }
    };
}

// Update menu based on login status
function updateMenu() {
    if (localStorage.getItem('loggedIn') === 'true') {
        var menu = document.getElementById("menu");
        if (!document.getElementById("secret-link")) {
            var newLink1 = document.createElement("a");
            newLink1.id = "secret-link";
            newLink1.href = "secret.html";
            newLink1.textContent = "Hidden Details";
            
            var newLink2 = document.createElement("a");
            newLink2.id = "spotify-link";
            newLink2.href = "spotify.html";
            newLink2.textContent = "Spotify";
            
            menu.appendChild(newLink1);
            menu.appendChild(newLink2);
        }
    }
}

// Show login popup when gear icon is clicked
function setupGearIcon() {
    document.getElementById("gear-icon").onclick = function() {
        if (localStorage.getItem('loggedIn') !== 'true') {
            document.getElementById("login-popup").style.display = "block";
        }
    };
}

// Check login status on page load
window.onload = function() {
    updateMenu();
    if (localStorage.getItem('loggedIn') === 'true') {
        document.getElementById("gear-icon").style.display = 'none'; // Hide gear icon if already logged in
    }
    handleLogin();
    setupGearIcon();
};
