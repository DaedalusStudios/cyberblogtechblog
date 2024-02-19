const Posts = require('./Post.js');
const Users = require('./Users');
const Comments = require('./Comments');

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