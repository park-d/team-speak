// grabbing DOM variables with jQuery
//***************** THESE NEED TO BE UPDATED********************//
const postId = $('input[name="post-id"]').val();
const editBtn = $('#edit-btn');
const deleteBtn = $('#delete-btn');

// a function that will handle deleting the posts, did not have time to add error checking
const deletePostHandler = async (event) => {
    event.preventDefault();
    await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    });
    
    document.location.replace('/dashboard');
};

// a function that will handle editing the posts
const editPostHandler = async (event) => {
    event.preventDefault();
    // grabbing the data that is entered
    const title = $('input[name="post-title"]').val().trim();
    const body = $('textarea[name="post-body"]').val().trim();
    // we need to fetch data from the api and make a put request to update this data when the update button is clicked
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({title, body}),
        headers: {'Content-Type': 'application/json'}
    });
    // if there are no issues, reload the dashboard page, otherwise alert to the issue
    if(response.ok) {
        console.log(response);
        document.location.replace('/dashboard/my-news');

    } else {
        alert('Could not post edit');
    }
};

editBtn.click(editPostHandler);
deleteBtn.click(deletePostHandler);
