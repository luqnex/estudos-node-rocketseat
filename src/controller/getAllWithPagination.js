const { client } = require("../database");

const dbName = "crud_rocketseat";

const getAllWithPagination = async (req, res) => {
  const page = +req.query.page ?? 1;
  const limit = +req.query.limit ?? 10;

  const salt = (page - 1) * limit;

  try {
    const db = client.db(dbName);

    const col = db.collection("product");

    const myDoc = await col.find({}).skip(salt).limit(limit).toArray();

    res.json(myDoc);
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = getAllWithPagination;
