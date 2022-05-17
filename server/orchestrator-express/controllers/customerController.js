const axios = require('axios');
const baseUrl = 'http://localhost:3000';
const Redis = require('ioredis');
const redis = new Redis();

class CustomerController {
  static async loginCustomer(req, res, next) {
    try {
      const { email, password } = req.body;
      const { data } = await axios.post(`${baseUrl}/customer/login`, { email, password })
      res.status(200).json(data)    
    } catch (error) {
      res.status(500).json(error.response.data)
    }
  }

  static async createCustomer(req, res) {
    try {
      const { email, password, phoneNumber, address } = req.body;
      await axios.post(`${baseUrl}/customer/register`, { email, password, phoneNumber, address });
      res.status(201).json({ message: 'Register success!' });
    } catch (error) {
      console.log(error)
      res.status(500).json(error.response.data)
    }
  }
}

module.exports = CustomerController;