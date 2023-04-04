const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Follower extends Model {}

Follower.init(
  {
    follower_id: {
      type: DataTypes.INTEGER,
      references: {
        model:'user',
        key:'user_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      reference: {
        model:'user',
        key:'user_id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'follower',
  }
);

module.exports = Follower;