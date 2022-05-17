const { gql } = require('apollo-server');
const axios = require('axios');
const baseUrl = 'https://oishii-service-user.herokuapp.com';

const typeDefs = gql`
  type UserMessage {
    message: String
  }

  input UserRegisterInput {
    email: String
    password: String
    phoneNumber: String
    address: String
  }

  input CustomerRegisterInput {
    email: String
    password: String
    phoneNumber: String
    address: String
  }

  input UserLoginInput {
    email: String
    password: String
  }

  input CustomerLoginInput {
    email: String
    password: String
  }
  
  type Message {
    message: String
  }
  
  type Mutation {
    registerUser(input: UserRegisterInput): UserMessage
    registerCustomer(input: CustomerRegisterInput): UserMessage
    loginUser(input: UserLoginInput): UserMessage
    loginCustomer(input: CustomerLoginInput): UserMessage
  }
`

const resolvers = {
  Mutation: {
    registerUser: async (_, args) => {
      try {
        const { data: userRegister } = await axios.post(`${baseUrl}/user/register`, args.input);
        return { message: userRegister.insertedId };
      } catch (error) {
        console.log(error)
      }
    },
    registerCustomer: async (_, args) => {
      try {
        const { data: customerRegister } = await axios.post(`${baseUrl}/customer/register`, args.input);
        console.log(customerRegister)
        return { message: customerRegister.insertedId };
      } catch (error) {
        console.log(error)
      }
    },
    loginUser: async (_, args) => {
      try {
        const { data: userLogin } = await axios.post(`${baseUrl}/user/login`, args.input);
        console.log(userLogin)
        return { message: userLogin.id };
      } catch (error) {
        console.log(error)
      }
    },
    loginCustomer: async (_, args) => {
      try {
        const { data: customerLogin } = await axios.post(`${baseUrl}/customer/login`, args.input);
        return { message: customerLogin.id };
      } catch (error) {
        console.log(error)
      }
    },
  }
};

module.exports = {
  typeDefs,
  resolvers
};