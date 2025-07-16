const { compare, hash } = require('bcrypt');

const generateHash = (password) => {
  return hash(password, 10);
}

const compareHash = (password, hashedPassword) => {
  return compare(password, hashedPassword);
}

module.exports = {
  generateHash,
  compareHash
}