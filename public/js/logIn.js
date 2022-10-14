const logInBtn = $('#logInBtn');

// a function that will handle signing in the user
const loginFormHandler = async (event) => {
    event.preventDefault();
    // grabbing the data that is entered
    const email = $('#email-login').val().trim();
    const username = $('#username-login').val().trim();
    const password = $('#password-login').val().trim();
    // we need to fetch data from the api and make a post request when we click on the signup button
    if(email && username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({email, username, password}),
            headers: {'Content-Type': 'application/json'},
        });
        // if login is successful, bring the user to their dashboard page, otherwise alert to sign up error
        if(response.ok) {
            document.location.replace('/userDashboard');
        } else {
            alert('Failed to log in');
        }
    }
};

logInBtn.click(loginFormHandler);
