const mongodb = require("mongodb");

const { client } = require("../database");

const dbName = "crud_rocketseat";

const deleteById = async (req, res) => {
  const { id } = req.body;

  try {
    const db = client.db(dbName);

    const col = db.collection("product");

    await col.deleteOne({ _id: mongodb.ObjectId(id) });

    res.json("Product deleted from DB");
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = deleteById;
