const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Preferences extends Model {}
  
  Preferences.init(
    {
      preferences_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'category',
            key: 'category_id',
            // unique: false
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'user_id',
                // unique: false
            },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'preferences'
    }
  );

module.exports = Preferences;
