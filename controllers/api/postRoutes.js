// requiring our models, utils, etc
const router = require('express').Router();
const {Post} = require('../../models/');
const withAuth = require('../../utils/auth');

// post route for creating a new post
router.post('/', withAuth, async (req, res) => {
    const postBody = req.body;
    try {
        const newPost = await Post.create({...postBody, user_id: req.session.user_id});
        res.json(newPost);
    } catch(err) {
        res.status(500).json(err);
    }
});

// put route for updating the post, this DOES NOT work as of now, but if I comment it out, it loads with an error
router.put('/:id', withAuth, async (req, res) => {
    console.log(req.body);
    try {
        const updatePost = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if(!updatePost) {
            res.status(404).json({
                message: 'No post found with this id'
            }).end();
        } else {
            res.json(updatePost);
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

// delete route for when the user clicks on the delete button
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletePost = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if(!deletePost) {
            res.status(404).json({
                message: 'No post found with this id'
            }).end();
        } else {
            res.json(deletePost);
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
