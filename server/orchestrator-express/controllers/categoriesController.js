const axios = require('axios');
const categoriesUrl = 'http://localhost:5000/categories';
const Redis = require('ioredis');
const redis = new Redis();

class CategoriesController {
  static async getCategories(req, res) {
    try {
      const cache = await redis.get('categories')

      if (cache) {
        console.log('<<< cache')
        res.status(200).json(JSON.parse(cache));

      } else {
        console.log('<<< call API')
        const { data } = await axios(categoriesUrl)
        
        if (data) {
          await redis.set('categories', JSON.stringify(data))
        };

        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error.response.data)
      next(error)
    }
  }

  static async getCategory(req, res) {
    try {
      const { id } = req.params;
      const cache = await redis.get(`category${id}`)

      if (cache) {
        console.log('<<< cache')
        res.status(200).json(JSON.parse(cache));

      } else {
        console.log('<<< call API')
        const { data } = await axios(`${categoriesUrl}/${id}`)
        
        if (data) {
          await redis.set(`category${id}`, JSON.stringify(data))
        };

        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error.response.data)
      next(error)
    }
  }
}

module.exports = CategoriesController;