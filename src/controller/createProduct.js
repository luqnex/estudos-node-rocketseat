const { client } = require("../database");

const dbName = "crud_rocketseat";

const createProduct = async (req, res) => {
  const { name, price } = req.body;

  try {
    const db = client.db(dbName);

    const col = db.collection("product");

    await col.insertOne({ name: name, price: price });

    res.json("Product created from DB");
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = createProduct;
