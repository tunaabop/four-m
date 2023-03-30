const User = require('./User');

// Define sequelize associations in this file.
// Posts belongsTo a User
Post.belongsTo(User, {
    foreignKey: 'user_id'
});
// Users have many Posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});
// Posts belongToMany Boards (through PostBoard)
Post.belongsToMany(Board, {
    through: PostBoard,
    as: 'post_in_board',
    foreignKey: 'post_id'
});
// Tags belongToMany Products (through PostBoard)
Board.belongsToMany(Post, {
    through: PostBoard,
    as: 'post_in_board',
    foreignKey: 'post_id'
});
// Follower belongToMany User (through FF)
User.belongsToMany(Follower, {
    through: FF,
    as: 'follower_id',
    foreignKey: 'user_id'
});
// User belongToMany Followers (through FF)
User.belongsToMany(Following, {
    through: FF,
    as: 'following_id',
    foreignKey: 'user_id'
});
module.exports = { 
    User,
    Post,
    Followers,
    Following,
    PostBoard,
};
