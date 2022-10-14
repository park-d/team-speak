//***************** THESE NEED TO BE UPDATED********************//
const newPostBtn = $('#new-form-btn');

// a function that will handle adding a new post for the user
const newPostHandler = async (event) => {
    event.preventDefault();
    // grabbing the data that is entered
    const title = $('input[name="post-title"]').val().trim();
    const body = $('textarea[name="post-body"]').val().trim();
    // we need to fetch data from the api and make a post request when we click on the new post button
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({title, body, }),
        headers: {'Content-Type': 'application/json'},
    });
    // if the post is successful, bring the user to their dashboard page to see the post, otherwise alert to post error
    if(response.ok) {
        console.log(response);
        document.location.replace('/dashboard');

    } else {
        alert('Could not post');
    }
};

newPostBtn.click(newPostHandler);
