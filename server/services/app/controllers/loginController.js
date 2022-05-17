const { Op } = require('sequelize');
const { comparePassword } = require('../helpers/hash');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models/index');

class LoginController {
  static async postLogin (req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw ({ name: 'LoginBadRequest' });
      const user = await User.findOne({ 
        where: {
          [Op.and]: {
            email: email,
            [Op.or]: [
              { role: 'Admin' },
              { role: 'Staff' }
            ]
          }
        } 
      });

      if (!user) throw ({ name: 'LoginBadRequest' });
      const verify = comparePassword(password, user.password);

      if (!verify) throw ({ name: 'LoginBadRequest' });
      const accessToken = signToken({ id: user.id, email: user.email });
      res.status(200).json({ access_token: accessToken })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = LoginController;