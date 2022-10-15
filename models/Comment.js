const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');

class Comment extends Model {}

Comment.init(
    {
        comment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'post',
                key: 'post_id',
                // unique: false
            },
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'user_id',
                // unique: false
            },
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;
