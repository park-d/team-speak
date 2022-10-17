//***************** THESE NEED TO BE UPDATED********************//
const newPostBtn = $('#submit-post');

// a function that will handle adding a new post for the user
const newPostHandler = async (event) => {
    event.preventDefault();
    
    // grabbing the data that is entered
    const currentArticle = event.target.parentNode
    const article_id = currentArticle.children[0].getAttribute("data-id");
    const title = currentArticle.children[1].value;
    const body = currentArticle.children[2].value;
    // we need to fetch data from the api and make a post request when we click on the new post button
    console.log(title, body, article_id);
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

$(document).on("click", "button", newPostHandler);
