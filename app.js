const express = require("express");

const { randomUUID } = require("crypto");

const cors = require("cors");

const fs = require("fs");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

let products = [];

productFile();

app.get("/", (req, res) => {
  res.json({ message: "Oks" });
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
