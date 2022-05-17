const axios = require('axios');
const baseUrl = 'http://localhost:3000';
const Redis = require('ioredis');
const redis = new Redis();

class UserController {
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const { data } = await axios.post(`${baseUrl}/user/login`, { email, password })
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json(error.response.data)
    }
  }

  static async createUser(req, res) {
    try {
      const { email, password, phoneNumber, address } = req.body;
      await axios.post(`${baseUrl}/user/register`, { email, password, phoneNumber, address });
      res.status(201).json({ message: 'Register success!' });
    } catch (error) {
      res.status(500).json(error.response.data)
    }
  }

  static async getCredentials(req, res) {
    try {
      const { access_token } = req.headers;

      const response = await axios.get(`${baseUrl}`, {
        headers: {
          id: access_token
        }
      })
      
      if (response.data.message !== 'Ok') throw ({ name: 'Invalid Token'})

      res.status(200).json(response.data)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = UserController;