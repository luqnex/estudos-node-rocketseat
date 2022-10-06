import { Request, Response } from "express";

import { client } from "../database";

const dbName = "crud_rocketseat";

export const create = async (req: Request, res: Response) => {
  const { name, price } = req.body;

  if (!name) {
    return res.send({ message: "Nome é obrigatório!" });
  }
  if (!price) {
    return res.send({ message: "Preço é obrigatório!" });
  }

  try {
    const db = client.db(dbName);

    const col = db.collection("product");

    await col.insertOne({ name: name, price: price });

    res.json("Product created from DB");
  } catch (err) {
    if (err instanceof Error) {
      res.json({ error: err.message });
    }
  }
};
