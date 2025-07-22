const { Router } = require('express');
const routes = Router();

const { getObjects, getUserObjects} = require('../controllers/object');

routes.get('/', getObjects);

routes.get('/dashboard', getUserObjects);


routes.get('/login', (req, res) => {
  
  if (req.session.userId) {
    return res.redirect('/dashboard');
  }

  res.render('login');

});

// Página de cadastro
routes.get('/register', (req, res) => {
  res.render('register');
});


module.exports = routes;