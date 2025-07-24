const User = require('../model/user');

const { compareHash } = require('../utils/hashProvider');

const signin = async (req, res) => {
  const { password, email } = req.body;

  try {
    // 'raw: true' possibilitar retornar os dados do banco como um objeto javascript simples
    const user = await User.findOne({ raw: true, where: { email } });

    if (!user) throw new Error();

    const isValidPassword = await compareHash(password, user.password);

    if (!isValidPassword) throw new Error();

    // Ao invés de criar token, você cria a sessão:
    req.session.userId = user.id;

    // Salva a sessão ANTES de redirecionar
    req.session.save((err) => {
      if (err) {
        console.error('Erro ao salvar a sessão:', err);
        return res.redirect('/login');
      }

      return res.redirect('/dashboard');
    });
    
  } catch (error) {
    
    res.render('login', { error: 'Usuário ou senha inválidos' });

  }
};

const signup = async (req, res) => {
  const { password, email, firstName, lastName, contactNumber } = req.body;

  const userData = {
    password,
    email,
    firstName,
    lastName,
    contactNumber,
  };

  try {
    const _user = await User.findOne({ raw: true, where: { email } });

    if (_user) throw new Error('Admin already registered');

    const user = await User.create(userData);

    if (!user) throw new Error();

    res.status(201).redirect('/login')

    // return res.status(201).json({ message: 'Admin created Successfully' });

  } catch (error) {
    return res.status(400).json({
      error: '@authenticate/signup',
      message: error.message || 'Authentication failed',
    });
  }
};

module.exports = {
  signin,
  signup,
};
