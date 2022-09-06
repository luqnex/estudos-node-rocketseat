const mongodb = require("mongodb");

const { client } = require("../database");

const dbName = "crud_rocketseat";

const update = async (req, res) => {
  const { id, name, price } = req.body;

  try {
    const db = client.db(dbName);

    const col = db.collection("product");

    await col.updateOne(
      { _id: mongodb.ObjectId(id) },
      { $set: { name: name, price: price } }
    );

    res.json("Product updated from DB");
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = update;
