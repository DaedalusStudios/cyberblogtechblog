const posts = require('./post');
const users = require('./users');
const comments = require('./comments');

users.hasMany(posts, {
  foreignKey: 'id'
});

posts.belongsTo(users, {
    foreignKey: 'id',
    });

    posts.hasMany(comments, {
      foreignKey: 'post_id'
    });
    
    comments.belongsTo(posts, {
      foreignKey: 'post_id'
    });






module.exports = { users, posts, comments };