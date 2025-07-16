const { Router } = require('express');
const routes = Router();

const { signup, signin, signout } = require('../controllers/authenticate');

const { requiSignin } = require('../middlewares/verifyAuthentication');

const {
  validateSignup,
  validateSignin,
} = require('../middlewares/validation/authenticate');

routes.post('/signup', validateSignup, signup);
routes.post('/signin', validateSignin, signin);
routes.post('/signout', requiSignin, signout);

module.exports = routes;
