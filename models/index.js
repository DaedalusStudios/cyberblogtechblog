const Post = require('./post');
const User = require('./user');
const Comment = require('./comment');

User.hasMany(Post, {
  foreignKey: 'id'
});

Post.belongsTo(User, {
    foreignKey: 'id',
    });

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});






module.exports = { User, Post, Comment };