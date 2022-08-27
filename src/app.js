const express = require("express");

const { randomUUID } = require("crypto");

const cors = require("cors");

const fs = require("fs");

const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://lucas_costa:lucas121216@cluster0.2swgb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

const dbName = "crud_rocketseat";

const app = express();

// connect().catch(console.dir);

// middleware
app.use(express.json());
app.use(cors());

let products = [];

productFile();

app.get("/", (req, res) => {
  res.json({ message: "Oks" });
});

// connect with DB
app.get("/getByName", (req, res) => {
  const name = req.body.name;

  async function connect() {
    try {
      await client.connect();
      console.log("Connected correctly to server");

      const db = client.db(dbName);

      const col = db.collection("product");

      const myDoc = await col.findOne({ name: name });

      res.json(myDoc);
    } catch (err) {
      console.log(err.stack);
    } finally {
      await client.close();
    }
  }

  connect();
});

app.get("/getAll", (req, res) => {
  async function connect() {
    try {
      await client.connect();
      console.log("Connected correctly to server");

      const db = client.db(dbName);

      const col = db.collection("product");

      const myDoc = await col.find({}).toArray();

      res.json(myDoc);
    } catch (err) {
      console.log(err.stack);
    } finally {
      await client.close();
    }
  }

  connect();
});

app.post("/createProduct", (req, res) => {
  const { name, price } = req.body;

  async function connect() {
    try {
      await client.connect();
      console.log("Connected correctly to server");

      const db = client.db(dbName);

      const col = db.collection("product");

      await col.insertOne({ name: name, price: price });

      res.json("Product created from DB");
    } catch (err) {
      console.log(err.stack);
    } finally {
      await client.close();
    }
  }

  connect();
});

// TODO: Delete não está funcionando.
app.delete("/deleteById", (req, res) => {
  const id = req.body.id;
  console.log(id);

  async function connect() {
    try {
      await client.connect();
      console.log("Connected correctly to server");

      const db = client.db(dbName);

      const col = db.collection("product");

      await col.deleteOne({ _id: id });

      res.json("Product deleted from DB");
    } catch (err) {
      console.log(err.stack);
    } finally {
      await client.close();
    }
  }

  connect();
});

/**
 * Body => sempre que for enviar algo para a aplicação
 * Params => /products/:id
 * Query => /products?id=1&value=25
 */

app.post("/products", (req, res) => {
  const { name, price } = req.body;

  const product = {
    id: randomUUID(),
    name,
    price,
  };

  products.push(product);

  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Produto inserido");
    }
  });

  return res.json(product);
});

app.get("/products", (req, res) => {
  return res.json(products);
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;

  const product = products.find((product) => product.id === id);

  return res.json(product);
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const productIndex = products.findIndex((product) => product.id === id);

  products[productIndex] = {
    ...products[productIndex],
    name,
    price,
  };

  productFile();

  return res.json({ message: "Produto alterado com sucesso!" });
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  const productIndex = products.findIndex((product) => product.id === id);

  products.splice(productIndex, 1);

  return res.json({ message: "Produto removido com sucesso!" });
});

function productFile() {
  fs.readFile("products.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      products = JSON.parse(data);
    }
  });
}

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
