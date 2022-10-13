const signupBtn = $('#signup-button');

// a function that will handle signing in the user
const signupFormHandler = async (event) => {
    event.preventDefault();
    // grabbing the data that is entered
    const team_name = $('#user-team').val().trim();
    const username = $('#username-signup').val().trim();
    const email = $('#email-signup').val().trim();
    const password = $('#password-signup').val().trim();
    // we need to fetch data from the api and make a post request when we click on the signup button
    if(username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({username, email, password, team_name}),
            headers: {'Content-Type': 'application/json'},
        });
        // if login is successful, bring the user to their dashboard page, otherwise alert to sign up error
        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Could not log in');
        }
    }
};

signupBtn.click(signupFormHandler);
