const router = require('express').Router();
const {User, Company, Team} = require('../../models');
const {Op} = require("sequelize");


router.post('/signup', async (req, res) => {
    try {
        const teamData = await Team.findOne({
            where: {
                team_name: {[Op.like]: `%${req.body.team_name}%`}
            }
        });
        if(!teamData) {
            res.redirect('/signup');
            alert('Please enter a correct Team or Company Name.');
            // alert for wrong company or team name entered
        } else {
            const userData = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                team_id: teamData.team_id
            });
console.log(userData)
            // in order to stay logged in, need to make a session with loggedIn info and on the user
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.loggedIn = true;

                res.status(200).json(userData);
            });
        };

    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

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
        console.log(organizedTeamArray);
        Team.bulkCreate(organizedTeamArray);
        res.json('We did it');
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
              email: req.body.email,
              username: req.body.username
        },
      });
  
      if (!user) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password. Please try again!' });
        return;
      }
  
      const validPassword = await user.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password. Please try again!' });
        return;
      }
  
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.username = user.username;
  
        res
          .status(200)
          .json({user: user , message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;




