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

  type User {
    email: String
    phoneNumber: String
    address: String
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

  type Order {
    id: ID
    UserId: String
    MenuId: Int
    quantity: Int
    totalPrice: Int
    status: String
    Menu: Menu
    User: User
  }

  input OrderInput {
    quantity: Int
  }

  type OrderMessage {
    message: String
  }

  type Query {
    orders(id: ID, access_token: String): [Order]
  }

  type Mutation {
    addOrder(id: ID, input: OrderInput, access_token: String): OrderMessage
  }
`

const resolvers = {
  Query: {
    orders: async (_, args) => {
      try {
        const cache = await redis.get('orders')
        if (cache) {
          return JSON.parse(cache);
        } else {
          const { access_token } = args;
          const { data: orders } = await axios.get(`${baseUrl}/public/order/${args.id}`, {
            headers: {
              access_token: access_token
            }
          })

          if (orders) {
            await redis.set('orders', JSON.stringify(orders))
          };

          const { data: user } = await axios.get(`https://oishii-service-user.herokuapp.com`, {
            headers: {
              id: orders[0].UserId
            }
          })

          const newOrders = orders.map((el) => {
            return {...el, User: {...user}}
          })

          return newOrders
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  Mutation: {
    addOrder: async (_, args) => {
      try {
        const { access_token } = args;
        const { data: order } = await axios.post(`${baseUrl}/public/order/${args.id}`, args.input, {
          headers: {
            access_token: access_token
          }
        })
        await redis.del('orders');
        return order
      } catch (error) {
        console.log(error);
      }
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}