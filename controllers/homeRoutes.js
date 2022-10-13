const router = require("express").Router();
const {News} = require('../models');

//test route for data
router.get('/', async (req, res) => {
    try {
        const testNews = await News.findByPk(1);
        const article = testNews.get({plain: true});
        console.log(article)
        res.render("landingpage", {article});
    } catch(err) {
        console.log(err)
    }
});

// login get route, if the user is logged in, redirect the page to the homepage, if not, then render the login page
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// signup get route, if the user is logged in, redirect the page to the homepage, if not, then render the sign-up page
router.get('/signup', (req, res) => {
    if( req.session.loggedIn ) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

// register get route, for companies, redirect the page to the homepage, if not, then render the sign-up page
router.get('/register', (req, res) => {
    res.render('signup-admin');
});

module.exports = router;
