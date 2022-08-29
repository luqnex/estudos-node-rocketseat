const express = require("express");

const cors = require("cors");

const { client, connectToDatabase } = require("./database");

connectToDatabase();

const app = express();

const dbName = "crud_rocketseat";

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Oks" });
});

// connect with DB
app.get("/getByName", (req, res) => {
  const name = req.body.name;

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
});

app.get("/getAll", (req, res) => {
  (async function () {
    try {
      const db = client.db(dbName);

      const col = db.collection("product");

      const myDoc = await col.find({}).toArray();

      res.json(myDoc);
    } catch (err) {
      console.log(err.stack);
    }
  })();
});

app.post("/createProduct", (req, res) => {
  const { name, price } = req.body;

  (async function () {
    try {
      const db = client.db(dbName);

      const col = db.collection("product");

      await col.insertOne({ name: name, price: price });

      res.json("Product created from DB");
    } catch (err) {
      console.log(err.stack);
    }
  })();
});

// TODO: Delete não está funcionando.
app.delete("/deleteById", (req, res) => {
  const id = req.body.id;

  (async function connect() {
    try {
      const db = client.db(dbName);

      const col = db.collection("product");

      await col.deleteOne({ _id: id });

      res.json("Product deleted from DB");
    } catch (err) {
      console.log(err.stack);
    }
  })();
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});

/**
 * Body => sempre que for enviar algo para a aplicação
 * Params => /products/:id
 * Query => /products?id=1&value=25
 */
