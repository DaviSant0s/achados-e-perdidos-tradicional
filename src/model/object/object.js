const db = require('../../database/conn');

const uuid = require('uuid');

const { DataTypes } = require('sequelize');
const User = require('../user');

const Object = db.define('Object', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    }, 

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    location_of_loss: {
        type: DataTypes.STRING,
        allowNull: false
    },

    date_of_loss: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    createBy: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'id'
        }
    },

    category: {
        type: DataTypes.ENUM(
            'Eletrônico',
            'Documento',
            'Acessório',
            'Roupas',
            'Outro'
        ),
        allowNull: false
    }

});

Object.beforeCreate(object => {
    const hashed_id = uuid.v4();
    object.id = hashed_id;
});

// Relacionamentos (1-N)

User.hasMany(Object, {
    foreignKey: 'createBy',
    onDelete: 'SET NULL'
});

Object.belongsTo(User, {foreignKey: 'createBy'});

module.exports = Object;