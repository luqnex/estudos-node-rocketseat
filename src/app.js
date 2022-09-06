const express = require("express");

const cors = require("cors");

const { connectToDatabase } = require("./database");

const getAll = require("./controller/getAll");
const create = require("./controller/create");
const update = require("./controller/update");
const getByName = require("./controller/getByName");
const deleteById = require("./controller/deleteById");
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

app.post("/create", create);

app.put("/updateById", update);

app.get("/getByName", getByName);

app.delete("/deleteById", deleteById);

app.get("/getAllWithPagination", getAllWithPagination);

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});

/**
 * Body => sempre que for enviar algo para a aplicação
 * Params => /products/:id
 * Query => /products?id=1&value=25
 */
