const { verifyToken } = require('../helpers/jwt');
const axios = require('axios');

async function authenticationMiddleware (req, res, next) {
  try {
    const { access_token } = req.headers;
    console.log(access_token)
    if (!access_token) throw ({ name: 'MissingAccessToken' });
    // // console.log(id)
    
    // const response = await axios.get(`http://localhost:6000`, {
    //   headers: {
    //     id: UserId
    //   }
    // })

    // if (response.data.message !== 'Ok') throw ({ name: 'InvalidToken' });
    // const { id, email, role } = verifyToken(access_token);
    // console.log(_id, email, role)

    req.user = { id: access_token }
    next();
  } catch (error) {
    next(error)
  }
}

module.exports = authenticationMiddleware;