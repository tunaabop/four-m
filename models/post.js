const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const { format } = require('prettier');

class Post extends Model {}

//define col
Post.init(
  {
    Post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Image_path: {
      type: DataTypes.STRING,
      allowNull: false,
      image_path:varchar(255).NOTNULL,

    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creation_date: {
        date: Date,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  }
);

module.exports = Post;