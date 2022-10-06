import { MongoClient } from "mongodb";

require("dotenv").config();

const url = process.env.DATA_BASE_URL;

export const client = new MongoClient(url ?? "");

export const connectToDatabase = () => {
  client.connect(() => console.log("connected to the database"));
};
