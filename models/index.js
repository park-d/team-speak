const News = require('./News');
const Company = require('./Company');
const Team = require('./Team');
const User = require('./User');
const Preferences = require('./Preferences');
const Category = require('./Category');

User.hasMany(Preferences,{
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

Preferences.belongsTo(User, { 
    through: Category,
    foreignKey: 'category_id',
})

Company.hasMany(Team, {
    foreignKey: 'company_id',
    onDelete: 'CASCADE',
})

Team.belongsTo(Company, {
    foreignKey: 'company_id',
})

Team.hasMany(User, {
    foreignKey: 'team_id',
    onDelete: 'CASCADE',
})

User.belongsTo(Team, {
    foreignKey: 'team_id',
})

module.exports = {News, Company, Team, User, Preferences};
