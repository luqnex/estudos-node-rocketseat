const { client } = require("../database");

const dbName = "crud_rocketseat";

const getAll = async (req, res) => {
  try {
    const db = client.db(dbName);

    const col = db.collection("product");

    const myDoc = await col.find({}).toArray();

    res.json(myDoc);
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = getAll;
