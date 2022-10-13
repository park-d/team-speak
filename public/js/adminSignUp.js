const signupBtn = $('#company-signup-button');

// a function that will handle signing in the user
const registerFormHandler = async (event) => {
    event.preventDefault();
    // grabbing the data that is entered
    const company_name = $('#company-name-signup').val().trim();
    const teamObject = $('.company-team-signup');
    let team_names = []
     for (let index = 0; index < teamObject.length; index++) {
         team_names.push(teamObject.eq(index).val());
    };
    // we need to fetch data from the api and make a post request when we click on the signup button
    if(company_name && team_names) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({company_name, team_names}),
            headers: {'Content-Type': 'application/json'},
        });
        // if login is successful, bring the user to their dashboard page, otherwise alert to sign up error
        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Please enter both Company and Team names');
        }
    }
};

signupBtn.click(registerFormHandler);
