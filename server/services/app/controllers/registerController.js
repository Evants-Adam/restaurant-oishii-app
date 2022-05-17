const { User } = require('../models/index');

class RegisterController {
  static async postRegister (req, res, next) {
    try {
      const { email, password, phoneNumber, address } = req.body;

      const user = await User.create(
        { 
          email, 
          password, 
          phoneNumber, 
          address,
          role: 'Staff'
        }
      );

      res.status(201).json({ id: user.id, email: user.email })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = RegisterController;