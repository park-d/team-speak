const router = require("express").Router();
const sequelize = require("../config/connection");
const {News, Preferences, User, Category} = require('../models');

// home route for landing page 
router.get('/', async (req, res) => {
    res.render("landingpage");
}
);

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
    if(req.session.loggedIn) {
        res.redirect('/userDashboard');
        return;
    }
    res.render('signup');
});

// register get route, for companies, redirect the page to the homepage, if not, then render the sign-up page
router.get('/register', (req, res) => {
    res.render('signup-admin');
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
    
// }
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

router.get('/userDashboard', async (req, res) => {
    try {
        const currentUserPreferences = await Preferences.findAll({
            where: {
                user_id: req.session.user_id
            }
        }
        );
        const selectedpreferences = currentUserPreferences.map((pref) => pref.get({plain: true}));

        const organizedCatArray = selectedpreferences.map(pref => {
            return pref.category_id
                ;
        });
        console.log(organizedCatArray);
        const catIDtoName = await Category.findAll({
            attributes: ['category_name'],
            where: {
                category_id: organizedCatArray
            }
        });
        const plainPreferences = catIDtoName.map((pref) => pref.get({plain: true}));


        const categoryParams = plainPreferences.map(pref => {
            return pref.category_name.toUpperCase();
        });
        console.log(categoryParams);

        if(!categoryParams) {
            alert('You have not set your preferences.');
            res.redirect('/userDashboard');
        } else {
            const allNews = await News.findAll({
                where: {
                    category: categoryParams,
                    article_id: 130
                }
            }
            );

            //because of the way sequelize returns data, we have to trim unwanted formatting (nested objects) with plain: true
            const article = allNews.map((news) => news.get({plain: true}));
            // rendering the all-posts handlebars view and passing the reformatted data to it
            console.log(article[0]);
            res.render("userDashboard", {article});
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
