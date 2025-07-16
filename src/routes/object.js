const { Router } = require('express');
const routes = Router();

const { createObject, getObjects, updateObject, deleteObject, getObjectById, getUserObjects} = require('../controllers/object');
const { requiSignin } = require('../middlewares/verifyAuthentication');
const { validateCreateObject, validateUpdateObject } = require('../middlewares/validation/object');

const upload = require('../configs/multer');

// rotas públicas
routes.get('/object/getObjects', getObjects);


// rotas privadas
routes.post('/object/create', 
    requiSignin, 
    upload.array('objectPicture'), 
    validateCreateObject, 
    createObject
);

routes.post('/object/updateObject/:id', 
    requiSignin, 
    upload.array('objectPicture'), 
    validateUpdateObject, 
    updateObject
);

routes.post('/object/deleteObject/:id', requiSignin, deleteObject);
routes.get('/object/getObjectById/:id', requiSignin, getObjectById);
routes.get('/object/getUserObjects/', requiSignin, getUserObjects);

module.exports = routes;