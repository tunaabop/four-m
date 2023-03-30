const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class FF extends Model {}

FF.init(
  {
    // define columns
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    follower_id: {
      type: DataTypes.INTEGER,
      references: {
        model:'follower',
        key:'id'
      }
    },
    following_id: {
      type: DataTypes.INTEGER,
      reference: {
        model:'following',
        key:'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'ff',
  }
);

module.exports = FF;