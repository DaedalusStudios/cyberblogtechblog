const Posts = require('./posts.js');
const Users = require('./users.js');
const Comments = require('./comments.js');

// Define associations
Users.hasMany(Posts, {
  foreignKey: 'user_id' // Foreign key in the Posts table referencing Users table
});

Posts.belongsTo(Users, {
  foreignKey: 'user_id' // Foreign key in the Posts table referencing Users table
});

Posts.hasMany(Comments, {
  foreignKey: 'post_id' // Foreign key in the Comments table referencing Posts table
});

Comments.belongsTo(Posts, {
  foreignKey: 'post_id' // Foreign key in the Comments table referencing Posts table
});

module.exports = { Users, Posts, Comments };