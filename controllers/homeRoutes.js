const router = require("express").Router();
const sequelize = require('../config/connection');
const {QueryTypes} = require('sequelize');
const {News, Preferences, Category, Post, Comment, User} = require('../models');

// home route for landing page 
router.get('/', async (req, res) => {
    res.render("landingpage", {
        loggedIn: req.session.loggedIn
    });
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

// get route for team dashboard. No direct link from homepage or userDashboard yet
router.get('/teamDashboard', async (req, res) => {
    try {
        const posts = await sequelize.query("SELECT post.*, user.username, news.headline, news.link, news.short_description from post INNER JOIN user on user.user_id = post.user_id LEFT JOIN news on news.article_id = post.article_id WHERE post.team_id = ?", {
            replacements: [req.session.team_id],
            type: QueryTypes.SELECT
        });
        console.log(posts);
        res.render('teamDashboard', { posts });
    } catch (err) {
        res.status(500).json(err);
    }

});

router.get('/posts/:id', async (req, res) => {
    try {
        const currentPosts = await Post.findByPk(req.params.id, {
            include: [User, {model: Comment, include: [User]},],
        });
        const post = currentPosts.get({plain: true});
        const currentNews = await News.findByPk(post.article_id);
        const news = currentNews.get({plain: true});
        var postData = {...post, ...news}; 
        console.log(postData)
        res.render('comments', {postData});
    } catch(err) {
        res.status(500).json(err);
    }
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
        const catIDtoName = await Category.findAll({
            attributes: ['category_name'],
            where: {
                category_id: organizedCatArray
            }
        });
        const plainPreferences = catIDtoName.map((pref) => pref.get({ plain: true }));

        const categoryParams = plainPreferences.map(pref => {
            return pref.category_name.toUpperCase();
        });

        if (!categoryParams) {
            alert('You have not set your preferences.');
            res.redirect('/userDashboard');
        } else {
            const allNews = await News.findAll({
                where: {
                    category: categoryParams,
                    article_id: [130, 132, 2000]
                }
            }
            );

            //because of the way sequelize returns data, we have to trim unwanted formatting (nested objects) with plain: true
            const article = allNews.map((news) => news.get({ plain: true }));
            // rendering the all-posts handlebars view and passing the reformatted data to it

            res.render("userDashboard", {article});

        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// logout get route... redirect the logout page.
router.get('/logout', (req, res) => {
    res.render('logout');
});

module.exports = router;
