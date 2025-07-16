const db = require('../../database/conn');

const uuid = require('uuid');

const { DataTypes } = require('sequelize');
const Object = require('./object');

const Picture = db.define('Picture', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    }, 

    img: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    objectId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Object,
            key: 'id'
        }
    },
});

// antes de criar uma imagem vai gerar um id único
Picture.beforeCreate(picture => {
    const hashed_id = uuid.v4();
    picture.id = hashed_id;
});

// um objeto pode ter varias imagens
Object.hasMany(Picture, { onDelete: 'cascade', foreignKey: 'objectId', });

// e uma imagem pertence a um objeto
Picture.belongsTo(Object, {foreignKey: 'objectId'});

module.exports = Picture;