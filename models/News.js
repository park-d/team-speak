const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class News extends Model {}

News.init(
    {
        article_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        category: {
            type: DataTypes.STRING,
        },
        authors: {
            type: DataTypes.STRING,
        },
        link: {
            type: DataTypes.TEXT,
            defaultValue: DataTypes.NOW,
            
        },
        short_description: {
            type: DataTypes.TEXT,
        },
        date: {
            type: DataTypes.DATE,
            },
        },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'news',
    }
);

module.exports = News;
