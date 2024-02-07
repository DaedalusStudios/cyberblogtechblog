const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'id'
});

Post.belongsTo(User, {
    foreignKey: 'id',
    });

Post.hasMany(Comment, {
    foreignKey: 'id'
});

Comment.belongsTo(Post, {
    foreignKey: 'id',
    });




module.exports = { User, Post, Comment };