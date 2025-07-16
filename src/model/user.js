const db = require('../database/conn');

const { generateHash } = require('../utils/hashProvider');
const uuid = require('uuid')

const { DataTypes } = require('sequelize');

const User = db.define('User', {

    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    }, 

    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 3,
            max: 20
        }
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 3,
            max: 20
        }
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 6,
        }
    },

    contactNumber: {
        type: DataTypes.STRING
    },
    
});

// Antes de criar: criptografa a senha e cria um codigo único para o id
User.beforeCreate( async (user) => {
    const hashedPassword = await generateHash(user.password);
    const hashed_id = uuid.v4();
    user.password = hashedPassword;
    user.id = hashed_id;
});

// Antes de editar: criptografa a senha
User.beforeUpdate( async (user) => {
    const hashedPassword = await generateHash(user.password);
    user.password = hashedPassword;
});

module.exports = User;