const post = require('./post.js');
const user = require('./user');
const comments = require('./comment');

user.hasMany(post, {
  foreignKey: 'id'
});

post.belongsTo(user, {
    foreignKey: 'id',
    });

    post.hasMany(comments, {
      foreignKey: 'post_id'
    });
    
    comments.belongsTo(post, {
      foreignKey: 'post_id'
    });






module.exports = { user, post, comments };