const signupBtn = $('#signup-button');

// a function that will handle signing a user up
const signupFormHandler = async (event) => {
    event.preventDefault();
    // grabbing the data that is entered
    const company_name = $('#user-company').val().trim();
    const team_name = $('#user-team').val().trim();
    const username = $('#username-signup').val().trim();
    const email = $('#email-signup').val().trim();
    const password = $('#password-signup').val().trim();
    // we need to fetch data from the api and make a post request when we click on the signup button
    if (username && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, email, password, team_name, company_name }),
            headers: { 'Content-Type': 'application/json' },
        });
        // if sign up is successful, bring the user to their dashboard page, otherwise alert to sign up error
        if (response.ok) {
            document.location.replace('/dashboard/my-news');
        } else {
            alert('Sign-up failed, please try again.');
        }
    }
};

signupBtn.click(signupFormHandler);
