const axios = require('axios');
const menusUrl = 'http://localhost:5000/public/menu';
const baseUrl = 'http://localhost:5000/menu'
const Redis = require('ioredis');
const redis = new Redis();

class MenuController {
  static async getMenus(req, res) {
    try {
      const cache = await redis.get('menus')

      if (cache) {
        console.log('<<< cache')
        res.status(200).json(JSON.parse(cache));

      } else {
        console.log('<<< call API')
        const { data } = await axios(menusUrl)
        
        if (data) {
          await redis.set('menus', JSON.stringify(data))
        };

        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }

  static async createMenu(req, res) {
    try {
      const { access_token } = req.headers
      const { name, description, price, imgUrl, CategoryId } = req.body;
      await axios.post(baseUrl, { name, description, price, imgUrl, CategoryId }, {
        headers: {
          access_token: access_token
        }
      })
      await redis.del('menus');
      res.status(201).json({ message: 'Menu has been added' });
    } catch (error) {
      res.status(500).json(error.response.data)
    }
  }

  static async deleteMenu(req, res) {
    try {
      const { id } = req.params;
      await axios.delete(`${baseUrl}/${id}`)
      await redis.del('menus');
      res.status(200).json({ message: 'Menu has been deleted' })
    } catch (error) {
      res.status(500).json(error.response.data)
    }
  }

  static async getMenuDetail(req, res) {
    try {
      const { id } = req.params;
      const cache = await redis.get(`menu-${id}`);

      if (cache) {
        console.log('<<< cache')
        res.status(200).json(JSON.parse(cache));
      } else {
        console.log('<<< call API')
        const { data } = await axios(`${menusUrl}/${id}`)

        if (data) {
          await redis.set(`${menusUrl}/${id}`, JSON.stringify(data))
        };

        res.status(200).json(data);
      }
      
    } catch (error) {
      res.status(500).json(error.response.data)
    }
  }
}

module.exports = MenuController;