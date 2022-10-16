const router = require('express').Router();
const {Comment} = require('../../models/');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        console.log(newComment)
        res.json(newComment);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
