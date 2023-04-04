const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const { format } = require('prettier');

class Post extends Model {}

Post.init(
  {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // creation_date: {
    //     type: Date,
    // },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // primaryKey: true,
      // autoIncrement: true,
    },
  },
  {
    sequelize,
    modelName: 'post'
  }
  
);

module.exports = Post;