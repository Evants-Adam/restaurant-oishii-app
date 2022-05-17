const { ObjectId } = require('mongodb');
const { getDb } = require('../config/mongodb');
const { hashPassword } = require('../helpers/hash');
const collectionName = 'users';

class User {
  static createUser (data) {
    const { email, password, phoneNumber, address } = data;
    const hashedPassword = hashPassword(password);

    return getDb().collection(`${collectionName}`)
    .insertOne({ 
      email, 
      hashedPassword, 
      phoneNumber,
      role: 'Staff',
      address
    });
  };

  static createCustomer (data) {
    const { email, password, phoneNumber, address } = data;
    const hashedPassword = hashPassword(password);

    return getDb().collection(`${collectionName}`)
    .insertOne({ 
      email, 
      password: hashedPassword, 
      phoneNumber,
      role: 'Customer',
      address
    });
  };

  static checkEmail (email) {
    return getDb().collection(`${collectionName}`)
    .find({ email: email }).toArray()
  };

  static findOneCustomer (email) {
    return getDb().collection(`${collectionName}`)
    .find({ 
      $and: [
        { email: email },
        { role: 'Customer' },
      ]}
    ).toArray()
  };

  static findOneUser (email) {
    return getDb().collection(`${collectionName}`)
    .find({ 
      $and: [
        { email: email }, 
        { $or: [
          { role: 'Staff' },
          { role: 'Admin' }
        ]}   
      ]}).toArray()
  };

  static findOne (id) {
    return getDb().collection(`${collectionName}`)
    .find({ _id: new ObjectId(id) }).toArray()
  };
};

module.exports = User;
