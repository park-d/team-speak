const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const postRoutes = require('./postRoutes.js');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
