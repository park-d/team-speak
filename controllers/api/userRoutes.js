const router = require('express').Router();
const {User, Company, Team, Preferences} = require('../../models');
const {Op} = require("sequelize");
const withAuth = require('../../utils/auth');

// company register post route, insert entered data in company table first, then using that data, insert the rest of the team data into the team table.
router.post('/register', async (req, res) => {
    try {
        const companyInsertedSuccessfully = await Company.create(
            {company_name: req.body.company_name}
        );
        const organizedTeamArray = req.body.team_names.map(teamName => {
            return {
                company_id: companyInsertedSuccessfully.company_id,
                team_name: teamName
            };
        });
        Team.bulkCreate(organizedTeamArray);
        res.json('Thank you for registering your organization!');
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// signup post route, if the company name enetered doesnt exist, alert user, then if team name entered doesnt exist, alert the user, then if they both exist, create the user and make a session.
router.post('/signup', async (req, res) => {
    try {
        const companyData = await Company.findOne({
            where: {
                company_name: {[Op.like]: `%${req.body.company_name}%`}
            }
        });
        if(!companyData) {
            alert('This company is not a customer with TeamSpeak. Speak to an administrator to register.');
            res.redirect('/signup');
        } else {
            const teamData = await Team.findOne({
                where: {
                    team_name: {[Op.like]: `%${req.body.team_name}%`}
                }
            });
            if(!teamData) {
                alert('Team does not exist, please try again.');
                res.redirect('/signup');
            } else {
                const userData = await User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    team_id: teamData.team_id
                });

                const userLoggedInData = await User.findOne({
                    where: {
                        email: userData.email
                    }
                });
                // in order to stay logged in, need to make a session with loggedIn info and on the user
                req.session.save(() => {
                    req.session.user_id = userLoggedInData.user_id;
                    req.session.username = userLoggedInData.username;
                    req.session.loggedIn = true;

                    res.status(200).json(userData);
                });
            };
        }
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// login post route, if username and email are entered correctly move on to password validation, if that is correct, save session
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            },
        });

        if(!user) {
            res
                .status(400)
                .json({message: 'Incorrect email or password. Please try again!'});
            return;
        }

        const validPassword = await user.checkPassword(req.body.password);

        if(!validPassword) {
            res
                .status(400)
                .json({message: 'Incorrect username or password. Please try again!'});
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = user.user_id;
            req.session.username = user.username;

            res
                .status(200)
                .json({user: user, message: 'You are now logged in!'});
        });
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/preferences', async (req, res) => {
    try {
        console.log(req.session.user_id);
        const organizedPreferenceArray = req.body.user_preferences.map(preference => {
            return {
                category_id: parseInt(preference),
                user_id: req.session.user_id,
            };
        });
        console.log(organizedPreferenceArray);
        Preferences.bulkCreate(organizedPreferenceArray);
        res.json('Thank you for saving your preference!');
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;




