const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');

class Comment extends Model {}

Comment.init(
    {
        body: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;
