const registerBtn = $('#company-signup-button');

// a function that will handle registering a new company
const registerFormHandler = async (event) => {
    event.preventDefault();
    // grabbing the data that is entered
    const company_name = $('#company-name-signup').val().trim();
    const teamObject = $('.company-team-signup');
    let team_names = [];
    for(let index = 0; index < teamObject.length; index++) {
        if(teamObject.eq(0).val() != "") {
            team_names.push(teamObject.eq(index).val());
        }
    };
    // we need to fetch data from the api and make a post request when we click on the signup button
    console.log(team_names.length)
    if(company_name && team_names.length > 0) {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            body: JSON.stringify({ company_name, team_names }),
            headers: { 'Content-Type': 'application/json' },
        });
        // if login is successful, bring the user to their dashboard page, otherwise alert to sign up error
        if (response.ok) {
            document.location.replace('/companyMessage');
        } else {
            $("#message").text("Sorry...your data did not save to the database. Please try again.")
        }
    } else {
        $("#message").text("You must enter both Company and Team names.")
    }
};

registerBtn.click(registerFormHandler);
