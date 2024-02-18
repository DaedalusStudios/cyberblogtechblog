const post = require('./post.js');
const user = require('./user');
const comment = require('./comment');

user.hasMany(post, {
  foreignKey: 'id'
});

post.belongsTo(user, {
    foreignKey: 'id',
    });

post.hasMany(comment, {
    foreignKey: 'post_id'
});






module.exports = { user, post, comment };