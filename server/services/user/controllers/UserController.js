const { comparePassword } = require('../helpers/hash');
const User = require('../models/user');

class UserController {
  static async createUser(req, res, next) {
    try {
      const { email, password, phoneNumber, address } = req.body;

      // Check all inputs
      if (!email || !password || !phoneNumber || !address) throw ({ name: 'RegisterBadRequest' })

      // Check email format
      if (!email.includes('@')) throw ({ name: 'EmailNotValid' })
      // Check email (should be unique)
      const check = await User.checkEmail(email);
      if (check.length !== 0) throw ({ name: 'EmailIsUsed' })
      
      const register = await User.createUser({ email, password, phoneNumber, address });
      res.status(201).json(register);
    } catch (err) {
      next(err)
    }
  }

  static async createCustomer(req, res, next) { 
    try {
      const { email, password, phoneNumber, address } = req.body;

      // Check all inputs
      if (!email || !password || !phoneNumber || !address) throw ({ name: 'RegisterBadRequest' })

      // Check email format
      if (!email.includes('@')) throw ({ name: 'EmailNotValid' })
      // Check email (should be unique)
      const check = await User.checkEmail(email);
      if (check.length !== 0) throw ({ name: 'EmailIsUsed' })
      
      const register = await User.createCustomer({ email, password, phoneNumber, address });
      res.status(201).json(register);
    } catch (err) {
      next(err)
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw ({ name: 'LoginBadRequest' });
      
      const user = await User.findOneUser(email);
      if (user.length === 0) throw ({ name: 'LoginBadRequest' });

      const verify = comparePassword(password, user[0].hashedPassword);
      if (!verify) throw ({ name: 'LoginBadRequest' });
      
      res.status(200).json({ id: user[0]._id })
    } catch (error) {
      next(error)
    }
  }

  static async loginCustomer(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw ({ name: 'LoginBadRequest' });
      
      const user = await User.findOneCustomer(email);
      if (user.length === 0) throw ({ name: 'LoginBadRequest' });

      const verify = comparePassword(password, user[0].hashedPassword);
      if (!verify) throw ({ name: 'LoginBadRequest' });
      res.status(200).json({ id: user[0]._id })
    } catch (error) {
      next(error)
    }
  }

  static async getCredentials(req, res, next) {
    try {
      const { id } = req.headers;
      if (!id) throw ({ name: 'InvalidToken' })

      const user = await User.findOne(id)
      const email = user[0].email;
      const phoneNumber = user[0].phoneNumber
      const address = user[0].address

      if (!user) throw ({ name: 'InvalidToken' });
      res.status(200).json({ email, phoneNumber, address })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController;