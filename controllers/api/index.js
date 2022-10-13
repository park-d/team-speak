const router = require('express').Router();

const userRoutes = require('./userRoutes.js');

router.use('/users', userRoutes);

module.exports = router;
