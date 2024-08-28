document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const menu = document.getElementById('menu');

    // Check login status on page load
    checkLoginStatus();

    // Handle hamburger menu toggle
    hamburgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // Function to show additional menu items when logged in
    function showLoggedInMenuItems() {
        const hiddenDetails = document.createElement('a');
        hiddenDetails.href = 'hiddendetails.html';
        hiddenDetails.textContent = 'Hidden Details';

        const spotify = document.createElement('a');
        spotify.href = 'spotify.html';
        spotify.textContent = 'Spotify';

        const logout = document.createElement('a');
        logout.href = '#';
        logout.textContent = 'Logout';
        logout.addEventListener('click', function() {
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('username');
            location.reload();  // Reload the page to reset the menu
        });

        menu.appendChild(hiddenDetails);
        menu.appendChild(spotify);
        menu.appendChild(logout);
    }

    // Function to check if the user is logged in
    function checkLoginStatus() {
        const loggedIn = localStorage.getItem('loggedIn');

        if (loggedIn === 'true') {
            showLoggedInMenuItems();
        }
    }
});
