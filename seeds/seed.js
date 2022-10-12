const sequelize = require('../config/connection');
const {News} = require('../models');

const newsData = require('./News_Category_Dataset.json');

const seedDatabase = async () => {
    await sequelize.sync({force: true});

    await News.bulkCreate(newsData);

    process.exit(0);
};

seedDatabase();
