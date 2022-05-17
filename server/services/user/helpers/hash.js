const bcrypt = require('bcrypt');

function hashPassword (password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function comparePassword (passwordUser, passwordDb) {
  return bcrypt.compareSync(passwordUser, passwordDb);
}

module.exports = {
  hashPassword,
  comparePassword
}