<script>
    document.addEventListener('DOMContentLoaded', () => {
        const gearIcon = document.getElementById('gear-icon');
        const loginPopup = document.getElementById('login-popup');
        const loginButton = document.getElementById('login-button');
        const welcomeMessage = document.getElementById('welcome-message');
        const menu = document.getElementById('menu');
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const mainMenuItems = [
            { href: "index.html", text: "Home" },
            { href: "our-story.html", text: "Our Story" },
            { href: "info.html", text: "Info" },
            { href: "wedding-party.html", text: "Wedding Party" },
            { href: "registry.html", text: "Registry" },
            { href: "rsvp.html", text: "RSVP" }
        ];

        let users = [];

        // Fetch the users from the users.json file
        fetch('users.json')
            .then(response => response.json())
            .then(data => {
                users = data.users;
                console.log('Users loaded:', users); // Debugging line
            })
            .catch(error => console.error('Error fetching users:', error));

        // Show the login popup when the gear icon is clicked
        gearIcon.addEventListener('click', () => {
            loginPopup.style.display = 'block';
        });

        // Handle login button click
        loginButton.addEventListener('click', () => {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            console.log('Attempting to log in with username:', username); // Debugging line

            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                welcomeMessage.textContent = "Welcome!";
                setTimeout(() => {
                    loginPopup.style.display = 'none';
                    welcomeMessage.textContent = '';
                    localStorage.setItem('loggedIn', 'true');
                    updateMenu(true);
                }, 1000);
            } else {
                welcomeMessage.textContent = "Incorrect credentials. Please try again.";
                setTimeout(() => {
                    welcomeMessage.textContent = '';
                }, 2000);
            }
        });

        // Handle logout
        menu.addEventListener('click', (event) => {
            if (event.target.id === 'logout') {
                localStorage.removeItem('loggedIn');
                updateMenu(false);
            }
        });

        // Update menu based on login status
        function updateMenu(isLoggedIn) {
            menu.innerHTML = '';

            // Always show main menu items
            mainMenuItems.forEach(item => {
                const link = document.createElement('a');
                link.href = item.href;
                link.textContent = item.text;
                menu.appendChild(link);
            });

            if (isLoggedIn) {
                // Show additional options when logged in
                const hiddenDetailsLink = document.createElement('a');
                hiddenDetailsLink.href = 'hidden-details.html';
                hiddenDetailsLink.textContent = 'Hidden Details';
                menu.appendChild(hiddenDetailsLink);

                const spotifyLink = document.createElement('a');
                spotifyLink.href = 'spotify.html';
                spotifyLink.textContent = 'Spotify';
                menu.appendChild(spotifyLink);

                const logoutLink = document.createElement('a');
                logoutLink.href = '#';
                logoutLink.textContent = 'Logout';
                logoutLink.id = 'logout';
                menu.appendChild(logoutLink);

                gearIcon.style.display = 'none'; // Hide gear icon if logged in
            } else {
                // Show login link when not logged in
                const loginLink = document.createElement('a');
                loginLink.href = '#';
                loginLink.textContent = 'Login';
                loginLink.id = 'login-link';
                menu.appendChild(loginLink);
            }
        }

        // Toggle hamburger menu
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            menu.classList.toggle('show');
        });

        // Initialize menu
        updateMenu(localStorage.getItem('loggedIn') === 'true');
    });
</script>
