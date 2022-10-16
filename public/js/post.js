//***************** THESE NEED TO BE UPDATED********************//
const newPostBtn = $('#submit-post');

// a function that will handle adding a new post for the user
const newPostHandler = async (event) => {
    event.preventDefault();
    // grabbing the data that is entered
    const article_id = $('#article-id').attr("data-id");
    const title = $('input[name="post-title"]').val();
    const body = $('textarea[name="post-input"]').val();
    // we need to fetch data from the api and make a post request when we click on the new post button
    console.log(title, body, article_id)
    const response = await fetch('/api/posts/new', {
        method: 'POST',
        body: JSON.stringify({title, body, article_id}),
        headers: {'Content-Type': 'application/json'},
    });
    // if the post is successful, bring the user to their dashboard page to see the post, otherwise alert to post error
    if(response.ok) {
        console.log(response);
        document.location.replace('/teamDashboard');

    } else {
        alert('Could not post');
    }
};

newPostBtn.click(newPostHandler);
