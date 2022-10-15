const router = require('express').Router();
const {User, Company, Team, Preferences} = require('../../models');
const {Op} = require("sequelize");
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req,res) => {
    const userNews = req.body;
    try {
        const newNews = await User.create({ ...userNews, preferences_id: req.sesssion.preferences_id 
        })
        res.json(newNews)
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})