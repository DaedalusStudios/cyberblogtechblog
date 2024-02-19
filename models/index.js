const Posts = require('./post');
const Users = require('./users');
const Comments = require('./comments');

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