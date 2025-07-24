const { Router } = require('express');
const routes = Router();

const { signup, signin } = require('../controllers/authenticate');

const {
  validateSignup,
  validateSignin,
} = require('../middlewares/validation/authenticate');

routes.post('/signup', validateSignup, signup);
routes.post('/signin', validateSignin, signin);

module.exports = routes;