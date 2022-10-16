const preferencesBtn = $('#select-preferences-btn');


// a function that will handle saving user preferences
const preferencesHandler = async (event) => {
    event.preventDefault();
    // grabbing the data that is entered
    const preferencesSection = $('input[type = "checkbox"]:checked')
    let user_preferences = [];
    for(let index = 0; index < preferencesSection.length; index++) {
        user_preferences.push(preferencesSection.eq(index).val());
    };
    // we need to fetch data from the api and make a post request when we click on the signup button
        const response = await fetch('/api/users/preferences', {
            method: 'POST',
            body: JSON.stringify({user_preferences}),
            headers: {'Content-Type': 'application/json'},
        });
        // if sign up is successful, bring the user to their dashboard page, otherwise alert to sign up error
        if(response.ok) {
            document.location.replace('/dashboard/my-news');
        } else {
            alert('Preferences did not save, please try again.');
        }
    };

preferencesBtn.click(preferencesHandler);
