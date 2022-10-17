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
router.get('/teamDashboard', async (req, res) => {
    try {
        const posts = await sequelize.query("SELECT post.*, user.username, news.headline, news.link, news.short_description from post INNER JOIN user on user.user_id = post.user_id LEFT JOIN news on news.article_id = post.article_id WHERE post.team_id = ?", {
            replacements: [req.session.team_id],
            type: QueryTypes.SELECT
        });
        console.log(posts);
        res.render('teamDashboard', {posts});
    } catch(err) {
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
        console.log(postData);
        res.render('comments', {postData});
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/userDashboard', async (req, res) => {
    try {
        // first we gather all the preferences that a user likes
        const currentUserPreferences = await Preferences.findAll({
            where: {
                user_id: req.session.user_id
            }
        });
        // serialize that data
        const selectedpreferences = currentUserPreferences.map((pref) => pref.get({plain: true}));
        // return just the category id to give to the category database
        const organizedCatArray = selectedpreferences.map(pref => {
            return pref.category_id;
        });
        // query the cactegory name based on the users category_id preferences
        const catIDtoName = await Category.findAll({
            attributes: ['category_name'],
            where: {
                category_id: organizedCatArray
            }
        });

        // serialize that data
        const plainPreferences = catIDtoName.map((pref) => pref.get({plain: true}));
        // return that value in uppercase because that is how the data is in NEWS
        const categoryParams = plainPreferences.map(pref => {
            return pref.category_name.toUpperCase();
        });
        // if no params exist, tell them that
        if(!categoryParams) {
            alert('You have not set your preferences.');
            res.redirect('/userDashboard');
            // query the news DB based on the selected categories
        } else {
            const allNews = await News.findAll({
                where: {
                    category: categoryParams,
                    article_id: [130, 132, 2000, 893]
                }
            });
            //because of the way sequelize returns data, we have to trim unwanted formatting (nested objects) with plain: true
            const article = allNews.map((news) => news.get({plain: true}));

            const sportsArticles = [];
            const politicsArticles = [];
            const wellnessArticles = [];
            const travelArticles = [];
            const stylebeautyArticles = [];
            const healthylivingArticles = [];
            const parentingArticles = [];
            const queervoicesArticles = [];
            const fooddrinkArticles = [];
            const businessArticles = [];
            const comedyArticles = [];
            const blackvoicesArticles = [];
            const homelivingArticles = [];
            const parentsArticles = [];
            const entertainmentArticles = [];

            for(let i = 0; i < article.length; i++) {
                switch(article[i].category) {
                    case "SPORTS":
                        sportsArticles.push(article[i]);
                        break;
                    case "POLITICS":
                        politicsArticles.push(article[i]);
                        break;
                    case "WELLNESS":
                        wellnessArticles.push(article[i]);
                        break;
                    case "TRAVEL":
                        travelArticles.push(article[i]);
                        break;
                    case "STYLE & BEAUTY":
                        stylebeautyArticles.push(article[i]);
                        break;
                    case "HEALTHY LIVING":
                        healthylivingArticles.push(article[i]);
                        break;
                    case "PARENTING":
                        parentingArticles.push(article[i]);
                        break;
                    case "QUEER VOICES":
                        queervoicesArticles.push(article[i]);
                        break;
                    case "FOOD & DRINK":
                        fooddrinkArticles.push(article[i]);
                        break;
                    case "BUSINESS":
                        businessArticles.push(article[i]);
                        break;
                    case "COMEDY":
                        comedyArticles.push(article[i]);
                        break;
                    case "BLACK VOICES":
                       blackvoicesArticles.push(article[i]);
                        break;
                    case "HOME & LIVING":
                        homelivingArticles.push(article[i]);
                        break;
                    case "PARENTS":
                        parentsArticles.push(article[i]);
                        break;
                    case "ENTERTAINMENT":
                        entertainmentArticles.push(article[i]);
                        break;
                    default:
                        break;
                }
            }
            // rendering the userDashboard handlebars view and passing the reformatted data to it
            res.render("userDashboard", {sportsArticles, politicsArticles, wellnessArticles, travelArticles, stylebeautyArticles, healthylivingArticles, parentingArticles, queervoicesArticles, fooddrinkArticles, businessArticles, comedyArticles, blackvoicesArticles, homelivingArticles, parentsArticles, entertainmentArticles});
            // res.render("test", {sportsArticles, politicsArticles, wellnessArticles, travelArticles, stylebeautyArticles, healthylivingArticles, parentingArticles, queervoicesArticles, fooddrinkArticles, businessArticles, comedyArticles, blackvoicesArticles, homelivingArticles, parentsArticles, entertainmentArticles});


        }
    } catch(err) {
        res.status(500).json(err);
    }
});

// logout get route... redirect the logout page.
router.get('/logout', (req, res) => {
    res.render('logout');
});

module.exports = router;
