const { verifyToken } = require('../helpers/jwt');
const axios = require('axios');
const UserController = require('../controllers/usersController');

async function authenticationMiddleware (req, res, next) {
  try {
    const { access_token } = req.headers;
    // console.log(id)
    
    const response = await axios.get('http://localhost:6000', {
      headers : {
        access_token: access_token
      }
    })

    if (response.data.message !== 'Ok') throw ({ name: 'InvalidToken' });
    next();
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = authenticationMiddleware;