const sequelize = require('../config/connection');
const { user, post, comments } = require('../models');



const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await user.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });
  
  await comments.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });
  

  process.exit(0);
};

seedDatabase();
