const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    });

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'id',
    });




module.exports = { User, Post, Comment };