const mongodb = require("mongodb");

const { client } = require("../database");

const dbName = "crud_rocketseat";

const deleteById = (req, res) => {
  const { id } = req.body;

  (async function connect() {
    try {
      const db = client.db(dbName);

      const col = db.collection("product");

      await col.deleteOne({ _id: mongodb.ObjectId(id) });

      res.json("Product deleted from DB");
    } catch (err) {
      console.log(err.stack);
    }
  })();
};

module.exports = deleteById;
