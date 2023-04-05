const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Post = require('./Post');
const Follower = require('./Follower');
const User_Follower = require('./User_Follower');
// const PostBoard = require('./PostBoard');
// const Board = require('./Board');

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
// Post.belongsToMany(Board, {
//     through: PostBoard,
//     as: 'post_in_board',
//     foreignKey: 'post_id'
// });
// // Boards belongToMany Posts (through PostBoard)
// Board.belongsToMany(Post, {
//     through: PostBoard,
//     as: 'post_in_board',
//     foreignKey: 'post_id'
// });

// Define Follower/Following relationships
// const User_Follower = sequelize.define('User_Follower', {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false
//     },
//     selfGranted: DataTypes.BOOLEAN
//   }, { timestamps: false });

// Follower belongToMany User (through User_Follower)
// User.belongsToMany(User, {
//     through: 'User_Follower',
//     as: 'followed_user',
//     // foreignKey: 'user_id'
// });

User.belongsToMany(User, { as: 'follower', foreignKey: 'user_id', through: User_Follower });
User.belongsToMany(User, { as: 'following', foreignKey: 'follower_id', through: User_Follower });

// User belongToMany Followers (through User_Follower)
// Follower.belongsToMany(User, {
//     through: User_Follower,
//     as: 'followed_user',
//     foreignKey: 'user_id'
// });

module.exports = { 
    User,
    Post,
    User_Follower,
};