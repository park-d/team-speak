$('.add-team-button').on('click', () => {
    $('.team-list').append(
        '<input type="text" placeholder="Team Name" class="form-input team-el">'
    );
});