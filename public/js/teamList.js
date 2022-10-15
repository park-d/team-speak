const teamListEl = $('.company-team-signup');
const addTeamBtn = $('.add-team-button');

// Can probably delete
teamListEl.on('change', () => {
    if (teamListEl.val() === '') {
        addTeamBtn.disabled = true;
    } else {
        addTeamBtn.disabled = false;
    }
});




addTeamBtn.on('click', (e) => {
    e.preventDefault();
    console.log('clicked');

    $('#team-list').append(
        '<input type="text" placeholder="Team Name" class="form-input company-team-signup">\n<div class="delete-team"><img class="delete-button" src="./images/icons8-cancel-100.png"/></div>'
    );


});