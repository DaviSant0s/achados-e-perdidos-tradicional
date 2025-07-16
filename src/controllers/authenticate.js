const User = require('../model/user');

const jwt = require('jsonwebtoken');

const { compareHash } = require('../utils/hashProvider');
const { JWT_SECRET } = require('../configs/env');

const signin = async (req, res) => {
  const { password, email } = req.body;

  try {
    // 'raw: true' possibilitar retornar os dados do banco como um objeto javascript simples
    const user = await User.findOne({ raw: true, where: { email } });

    if (!user) throw new Error();

    const isValidPassword = await compareHash(password, user.password);

    if (!isValidPassword) throw new Error();

    const id = user.id;

    const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: 604800 }); // expira em uma semana

    res.cookie('token', token, { expiresIn: '3600ms' }); // criando cookie para guardar informações do token

    const fullName = `${user.firstName} ${user.lastName}`;

    return res.status(200).json({ token, user: { ...user, fullName } });
  } catch (error) {
    return res.status(400).json({
      error: '@authenticate/signin',
      message: error.message || 'Authentication failed',
    });
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

    return res.status(201).json({ message: 'Admin created Successfully' });

  } catch (error) {
    return res.status(400).json({
      error: '@authenticate/signup',
      message: error.message || 'Authentication failed',
    });
  }
};

const signout = async (req, res) => {
  res.clearCookie('token');

  res.status(200).json({
    message: 'Signout successfully!',
  });
};

module.exports = {
  signin,
  signup,
  signout,
};
