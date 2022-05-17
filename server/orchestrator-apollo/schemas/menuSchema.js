const { gql } = require('apollo-server');
const axios = require('axios');
const baseUrl = 'https://oishii-service-app.herokuapp.com';
const Redis = require('ioredis');
const redis = new Redis({
  host: 'redis-12244.c292.ap-southeast-1-1.ec2.cloud.redislabs.com',
  port: 12244,
  password: '2BIc2vVniItNA7PjhKZm0yMxryvdwfqy'
})

const typeDefs = gql`
  type Category {
    id: ID
    name: String
  }

  type Menu {
    id: ID
    UserId: String
    name: String
    description: String
    imgUrl: String
    price: Int
    CategoryId: Int
    Category: Category
  }

  input MenuInput {
    UserId: String!
    name: String
    description: String
    imgUrl: String
    price: Int
    CategoryId: Int
  }

  input MenuEdit {
    UserId: String!
    name: String
    description: String
    imgUrl: String
    price: Int
    CategoryId: Int
  }
  
  type MenuMessage {
    message: String
  }

  type Query {
    menus: [Menu],
    menuDetail(id: ID): Menu
    categories: [Category],
    category(id: ID): Category
  }
  
  type Mutation {
    addMenu(input: MenuInput, access_token: String): Menu
    editMenu(id: ID, input: MenuEdit, access_token: String): Menu
    deleteMenu(id: ID): MenuMessage
  }
`

const resolvers = {
  Query: {
    menus: async () => {
      try {
        const cache = await redis.get('menus')
        if (cache) {
          return JSON.parse(cache);
        } else {
          const { data: menus } = await axios.get(`${baseUrl}/public/menu`);
          if (menus) {
            await redis.set('menus', JSON.stringify(menus))
          };
          return menus;
        }
      } catch (error) {
        console.log(error);
      }
    },
    menuDetail: async (_, args) => {
      try {
        const cache = await redis.get(`menu-${args.id}`)
        if (cache) {
          return JSON.parse(cache);
        } else {
          const { data: menuDetail } = await axios.get(`${baseUrl}/public/menu/${args.id}`);
          if (menuDetail) {
            await redis.set(`menu-${args.id}`, JSON.stringify(menuDetail))
          };
          return menuDetail;
        }
      } catch (error) {
        console.log(error)
      }
    },
    categories: async () => {
      try {
        const cache = await redis.get('categories')
        if (cache) {
          return JSON.parse(cache);
        } else {
          const { data: categories } = await axios.get(`${baseUrl}/categories`);
          if (categories) {
            await redis.set(`categories`, JSON.stringify(categories))
          };
          return categories;
        }
      } catch (error) {
        console.log(error);
      }
    },
    category: async (_, args) => {
      try {
        const cache = await redis.get(`category-${args.id}`)
        if (cache) {
          return JSON.parse(cache);
        } else {
          const { data: category } = await axios.get(`${baseUrl}/categories/${args.id}`);
          if (category) {
            await redis.set(`category-${args.id}`, JSON.stringify(category))
          };
          return category;
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  Mutation: {
    addMenu: async (_, args) => {
      try {
        const { data: menu } = await axios.post(`${baseUrl}/menu`, args.input);
        await redis.del('menus');
        return menu;
      } catch (error) {
        console.log(error)
      }
    },
    editMenu: async (_, args) => {
      try {
        const { id, input, access_token } = args;
        console.log(access_token)
        const { data: menu } = await axios.put(`${baseUrl}/menu/${id}`, input, {
          headers: {
            access_token: access_token
          }
        });
        return menu
      } catch (error) {
        console.log(error);
      }
    },
    deleteMenu: async (_, args) => {
      try {
        const { data: menu } = await axios.delete(`${baseUrl}/menu/${args.id}`);
        return menu;
      } catch (error) {
        console.log(error)
      }
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};