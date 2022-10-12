const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Company extends Model {}

Company.init(
    {
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
     },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'company',
    }
);


module.exports = Company;