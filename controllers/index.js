const router = require('express').Router();

const homeRoutes = require('./homeRoutes.js');

router.use('/', homeRoutes);

module.exports = router;
