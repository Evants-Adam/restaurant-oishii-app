// const { MongoClient } = require("mongodb");
const { MongoClient, ServerApiVersion } = require('mongodb');


// Replace the uri string with your MongoDB deployment's connection string.
// const uri = "mongodb://localhost:27017/";
const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let db;

async function run() {
  try {
    await client.connect()
    const database = client.db('restaurant-oishii');
    db = database;
    return db;
  } catch (error) {
    console.log(error);
  }
};

async function close() {
  try {
    await client.close()
  } catch (error) {
    console.log(error)
  }
}

function getDb() {
  return db;
};

module.exports = { run, getDb, close };

// const { MongoClient, ServerApiVersion } = require('mongodb');


// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });