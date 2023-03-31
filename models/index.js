const User = require('./models/User');
const Post = require('./models/Post');
const Follower = require('./models/Follower');
const PostBoard = require('./models/PostBoard');
const Board = require('./models/Board');

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
// Boards belongToMany Posts (through PostBoard)
Board.belongsToMany(Post, {
    through: PostBoard,
    as: 'post_in_board',
    foreignKey: 'post_id'
});

// Define Follower/Following relationships
const User_Follower = sequelize.define('User_Follower', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    selfGranted: DataTypes.BOOLEAN
  }, { timestamps: false });

// Follower belongToMany User (through User_Follower)
User.belongsToMany(Follower, {
    through: User_Follower,
    as: 'follower_id',
    foreignKey: 'user_id'
});
// User belongToMany Followers (through User_Follower)
Follower.belongsToMany(User, {
    through: User_Follower,
    as: 'follower_id',
    foreignKey: 'user_id'
});

module.exports = { 
    User,
    Post,
    Board,
    Follower,
    User_Follower,
    PostBoard,
};
