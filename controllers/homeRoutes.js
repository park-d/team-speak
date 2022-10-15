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

router.get('/comments', (req, res) => {
    res.render('comments');
});


// router.get('/comments', async (req, res) => {
//     try {
//         // Get all projects and JOIN with user data
//         const teamPosts = await Post.findByPk({
//             // where: {
    
}
//         });

//         // Serialize data so the template can read it
//         const allPosts = teamPosts.map((post) => post.get({ plain: true }));

//         // Pass serialized data and session flag into template
//         res.render('comments', {
//             allPosts
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }


// });



module.exports = router;
