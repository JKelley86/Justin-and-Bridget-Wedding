
    // Handle logout
    menu.addEventListener('click', (event) => {
        if (event.target.id === 'logout') {
            localStorage.removeItem('loggedIn');
            updateMenu(false);
        }
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

    // Initialize menu
    updateMenu(localStorage.getItem('loggedIn') === 'true');
});
