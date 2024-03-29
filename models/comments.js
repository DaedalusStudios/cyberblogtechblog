const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model {}

Comments.init(
    {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        email: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'email'
        },
        comment: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'comment'
        },
        date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'date'
        },
        post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'posts',
            key: 'id'
        },
        field: 'post_id'
        }
    },
    {
        sequelize,
        modelName: 'Comments',
        tableName: 'comments',
        freezeTableName: true,
        underscored: true,
    }
    );



module.exports = Comments;