const sequelize = require('../config/connection');
const {News, Category} = require('../models');

const newsData = require('./News_Category_Dataset.json');
const categoryData = require('./Category_Data.json');

const seedDatabase = async () => {
    await sequelize.sync({force: true});

    const bulkSuccess = await News.bulkCreate(newsData);
    seedCategories()
    
};

const seedCategories = async () => {
    const bulkCatSuccess = await Category.bulkCreate(categoryData);
    process.exit();
};

seedDatabase()
    // .then(response => {
    //     console.log('news data was added successfuly')
    //     seedCategories()

    // }).then(response => {
    //     console.log('category seed data added successfully')
    //     process.exit();
    // });
