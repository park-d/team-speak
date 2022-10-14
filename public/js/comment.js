//***************** THESE NEED TO BE UPDATED********************//
const newCommentBtn = $('#new-comment-btn');

// a function that will handle adding a new comment for the user
const commentFormHandler = async function (event) {
    event.preventDefault();

    const post_id = $('input[name="post-id"]').value;
    const body = $('textarea[name="comment-body"]').value;
 // we need to fetch data from the api and make a post request when we click on the new post button
    if(body) {
        await fetch('/api/comment', {
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

newCommentBtn(commentFormHandler);
