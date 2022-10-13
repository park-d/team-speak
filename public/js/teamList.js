const teamListEl = $('.company-team-signup');
const addTeamBtn = $('.add-team-button');


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
        '<input type="text" placeholder=".medium-6.cell" class="form-input company-team-signup">'
    );


});