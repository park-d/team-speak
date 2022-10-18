const teamListEl = $('.company-team-signup');
const addTeamBtn = $('.add-team-button');

addTeamBtn.on('click', (e) => {
    e.preventDefault();
    console.log('clicked');

    $('#team-list').append(
        '<input type="text" placeholder="Team Name" class="form-input company-team-signup">'
    );


});