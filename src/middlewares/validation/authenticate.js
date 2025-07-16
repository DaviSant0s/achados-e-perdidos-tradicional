const {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassword,
} = require('../../validators/authenticate');

const validateSignin = (req, res, next) => {
  const { password, email } = req.body;

  const signinErrorMessage = (message) => {
    return {
      error: '@authenticate/signin',
      message: message,
    };
  };

  const errors = [validateEmail(email), validatePassword(password)].filter(
    Boolean
  );

  if (errors.length > 0) {
    return res.status(400).json(signinErrorMessage(errors[0]));
  }

  return next();
};

const validateSignup = (req, res, next) => {
  const { password, email, firstName, lastName, contactNumber } = req.body;

  const signupErrorMessage = (message) => {
    return {
      error: '@authenticate/signup',
      message: message,
    };
  };

  const errors = [
    validateFirstName(firstName),
    validateLastName(lastName),
    validateEmail(email),
    validatePassword(password),
    //validateContactNumber(contactNumber)
  ].filter(Boolean);

  if (errors.length > 0) {
    return res.status(400).json(signupErrorMessage(errors[0]));
  }

  return next();
};

module.exports = {
  validateSignin,
  validateSignup,
};
