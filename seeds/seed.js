const sequelize = require('../config/connection');
const {News, Category} = require('../models');

const newsData = require('./News_Category_Dataset.json');
const categoryData = require('./Category_Data.json');

const seedDatabase = async () => {
    await sequelize.sync({force: true});

    await News.bulkCreate(newsData);

    process.exit(0);
};

const seedCategories = async () => {
    await sequelize.sync({force: true});

    await Category.bulkCreate(categoryData);

    process.exit(0);
};

seedDatabase();
seedCategories();
