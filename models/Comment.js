const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class comments extends Model {}

comments.init(
    {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        email: {
        type: DataTypes.STRING,
        allowNull: false
        },
        comment: {
        type: DataTypes.TEXT,
        allowNull: false
        },
        date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
        },
        post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'post',
            key: 'id'
        }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comments',
    }
    );



module.exports = comments;