const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class PostBoard extends Model {}

PostBoard.init(
{
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model:'post',
        key:'id'
      }
    },
    board_id: {
      type: DataTypes.INTEGER,
      reference: {
        model:'board',
        key:'id'
      }
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post_board',
});

module.exports = PostBoard;