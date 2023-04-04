const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const { format } = require('prettier');

class Post extends Model {}

//define col
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
      image_path:varchar(255).NOTNULL,

    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
<<<<<<< HEAD
    creation_date: {
        date: Date,
=======
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
>>>>>>> c1365ebcac449715783e508dfaf86c950a41a0f9
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