const Posts = require('./Post.js');
const Users = require('./users.js');
const Comments = require('./comments.js');

    Users.hasMany(Posts, {
      foreignKey: 'id'
    });

    Posts.belongsTo(Users, {
        foreignKey: 'id',
    });

    Posts.hasMany(Comments, {
      foreignKey: 'post_id'
    });
    
    Comments.belongsTo(Posts, {
      foreignKey: '_id'
    });






module.exports = { Users, Posts, Comments };