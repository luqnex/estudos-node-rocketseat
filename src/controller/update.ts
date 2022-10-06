import { Request, Response } from "express";

import { ObjectId } from "mongodb";

import { client } from "../database";

const dbName = "crud_rocketseat";

export const update = async (req: Request, res: Response) => {
  const { id, name, price } = req.body;

  if (!id) {
    return res.send({ message: "ID é obrigatório!" });
  }
  if (!name) {
    return res.send({ message: "Nome é obrigatório!" });
  }
  if (!price) {
    return res.send({ message: "Preço é obrigatório!" });
  }

  try {
    const db = client.db(dbName);

    const col = db.collection("product");

    await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name: name, price: price } }
    );

    res.json("Product updated from DB");
  } catch (err) {
    if (err instanceof Error) {
      res.json({ error: err.message });
    }
  }
};
