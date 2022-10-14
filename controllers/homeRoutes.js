const router = require("express").Router();
const { News } = require('../models');

// home route for landing page 
router.get('/', async (req, res) => {
    res.render("landingpage");
}
);

// login get route, if the user is logged in, redirect the page to the homepage, if not, then render the login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// signup get route, if the user is logged in, redirect the page to the homepage, if not, then render the sign-up page
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/userDashboard');
        return;
    }
    res.render('signup');
});

// register get route, for companies, redirect the page to the homepage, if not, then render the sign-up page
router.get('/register', (req, res) => {
    res.render('signup-admin');
});

// register get route, for companies, redirect the page to the homepage, if not, then render the sign-up page
router.get('/userDashboard', (req, res) => {
    res.render('userDashboard');
});

// get route for team dashboard. No direct link from homepage or userDashboard yet
router.get('/teamDashboard', (req, res) => {
    res.render('teamDashboard');
});



module.exports = router;
