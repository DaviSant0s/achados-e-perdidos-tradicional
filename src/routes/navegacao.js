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

routes.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return
    }

    res.redirect('/login');
  });
});


module.exports = routes;