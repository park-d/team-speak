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
    if (email && username && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, email, password, team_name, company_name }),
            headers: { 'Content-Type': 'application/json' },
        });
        // if sign up is successful, bring the user to their dashboard page, otherwise alert to sign up error
        if (response.ok) {
            document.location.replace('/userDashboard');
        } else {
            $("#message").text("Company or team is not a member of TeamSpeak.")
        }
    } else($("#message").text("You must enter email, username, and at least 8 character length password."))
};

signupBtn.click(signupFormHandler);
