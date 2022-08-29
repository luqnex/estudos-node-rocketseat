const { MongoClient } = require("mongodb");

require("dotenv").config();

const url = process.env.DATA_BASE_URL;

const client = new MongoClient(url);

const connectToDatabase = () => {
  client.connect(() => console.log("connected to the database"));
};

module.exports = { connectToDatabase, client };
