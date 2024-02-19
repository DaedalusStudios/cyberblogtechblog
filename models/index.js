const Posts = require('/Post.js');
const Users = require('/Users.js');
const Comments = require('/Comments.js');

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