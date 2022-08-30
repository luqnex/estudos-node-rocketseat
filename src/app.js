const express = require("express");

const cors = require("cors");

const { connectToDatabase } = require("./database");

const getAll = require("./controller/getAll");
const getByName = require("./controller/getByName");
const deleteById = require("./controller/deleteById");
const createProduct = require("./controller/createProduct");
const getAllWithPagination = require("./controller/getAllWithPagination");

connectToDatabase();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.json({ message: "Oks" });
});

app.get("/getAll", getAll);

app.get("/getAllWithPagination", getAllWithPagination);

app.get("/getByName", getByName);

app.post("/createProduct", createProduct);

app.delete("/deleteById", deleteById);

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});

/**
 * Body => sempre que for enviar algo para a aplicação
 * Params => /products/:id
 * Query => /products?id=1&value=25
 */
