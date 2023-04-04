const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class User_Follower extends Model {}

User_Follower.init(
{
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key:'id'
      }
    },
    follower_id: {
      type: DataTypes.INTEGER,
      reference: {
        model:'user',
        key:'id'
      }
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_follower',
});

module.exports = User_Follower;