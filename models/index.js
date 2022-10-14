const News = require('./News');
const Company = require('./Company');
const Team = require('./Team');
const User = require('./User');
const Preferences = require('./Preferences');
const Category = require('./Category');
const Post = require('./Post');
const Comment = require('./Comment');

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

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = {
    News,
    Company,
    Team,
    User,
    Preferences,
    Comment,
    Post,
    Category,
};


