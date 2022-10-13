const router = require('express').Router();
const {User, Company, Team} = require('../../models');
const {op} = require(sequelize);


router.post('/signup', async (req, res) => {
    try {
        const teamData = await Team.findOne({
            where: {
                team_name: {[op.like]: req.body.team_name}
            }
        })
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

/**
 * when aadding a new user we allow them to input their team name->how do we handle this?
 * front end makes a post request to some route
 * req.body => {..., team_name: "Bologna"},
 * operators in sequelize google it.
 * const {op} = require(sequelize);
 * db.Team.findOne({where: 
 *  {team_name:
 *      {[op.like]: req.body.team_name}
 * }}) => the data about that team
 * if (!team) {
 * alert and refresh
 * } else there is a team and now we know its id
 * 
 * so now we know the user name and password and team id and email
 * db,User.create(dataBundledNeatly)
 * 
 */

module.exports = router;



/**
 * 
 * so a post request to the add team route has been made
 * req.body => {company_name: "Bob's Burgers", team_names: ["Winners", "Tacos", "Burritos"]}
 * server receives this
 * const companyInsertedSuccessfully = await db.Company.insert({company_name: req.body.company_name})
 * 
        const companyData = await Company.create({
            company_name: req.body.
        })
 * const allTeams = req.body.team_names.map(team_name => {company_id:companyInsertedSuccessfully.company_id, team_name: team_name})
 * db.Team.bulkCreate(allTeams)
 * 
 */
