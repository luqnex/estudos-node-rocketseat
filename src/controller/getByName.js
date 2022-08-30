const { client } = require("../database");

const dbName = "crud_rocketseat";

const getByName = (req, res) => {
  const { name } = req.body;

  (async function () {
    try {
      const db = client.db(dbName);

      const col = db.collection("product");

      const myDoc = await col.findOne({ name: name });

      res.json(myDoc);
    } catch (err) {
      console.log(err.stack);
    }
  })();
};

module.exports = getByName;
