//***************** THESE NEED TO BE UPDATED********************//
const commentBtn = $('#submit-comment');

// a function that will handle adding a new comment for the user
const commentHandler = async function (event) {
    event.preventDefault();

    const post_id = $('#post-id').attr("data-id");
    const body = $('textarea[name="comment-input"]').val();
    console.log(post_id,body)
    // we need to fetch data from the api and make a post request when we click on the new post button
    if (body) {
        await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                body
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        document.location.reload();
    }
};

commentBtn.click(commentHandler);
