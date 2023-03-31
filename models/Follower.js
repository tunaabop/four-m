const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Follower extends Model {}

Follower.init(
  {
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
    modelName: 'follower',
  }
);

module.exports = Follwer;