require('dotenv').config();
const sequelize = require('../config/connection');
const { User, User_Follower, Post } = require('../models');

const userData = require('./userData.json');
const followerData = require('./followerData.json');
const postData = require('./postData.json');


const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    await User_Follower.bulkCreate(followerData, {
      individualHooks: true,
      returning: true,
    });
    await Post.bulkCreate(postData, {
      individualHooks: true,
      returning: true,
    });
    console.log('Finished seeding database.');
  } catch (error) {
    console.error(error);
    console.error(
      'An error occurred attempting to seed the database. Scroll up for additional details.'
    );
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

seedDatabase();
