const { Model, DataTypes } = require('sequelize');
// const bcrypt = require('bcryptjs');
const sequelize = require('../config/connection');
// const { format } = require('prettier');

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
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
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
