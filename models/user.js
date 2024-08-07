const { DataTypes } = require('sequelize');
const sequelize = require('../config/SQL/database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customizations: {
        type: DataTypes.JSON,
        allowNull: true
    }
});

module.exports = User;
