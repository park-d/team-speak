// grabbing DOM variables with jQuery
const logoutBtn = $('#logout-btn');

// a function that will handle logging out the user
const logoutFunction = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    // making post request to the api to destroy the session if valid, otherwise alert to error
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    });
    // if logout is successful, bring the user to the homepage, otherwise alert to logout error
    if(response.ok) {
        document.location.replace('/');
    } else {
        alert('Could not log out');
    }
};

logoutBtn.click(logoutFunction);
