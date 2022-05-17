const { ApolloServer } = require('apollo-server');
const menuSchema = require('./schemas/menuSchema');
const userSchema = require('./schemas/userSchema');
const orderSchema = require('./schemas/orderSchema');

const typeDefs = [menuSchema.typeDefs, userSchema.typeDefs, orderSchema.typeDefs]
const resolvers = [menuSchema.resolvers, userSchema.resolvers, orderSchema.resolvers]

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})