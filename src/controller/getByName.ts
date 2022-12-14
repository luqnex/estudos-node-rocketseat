import { Request, Response } from "express";
import { client } from "../database";

const dbName = "crud_rocketseat";

export const getByName = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.send({ message: "Digite um nome" });
  }

  try {
    const db = client.db(dbName);

    const col = db.collection("product");

    const myDoc = await col.findOne({ name: name });

    res.json(myDoc);
  } catch (err) {
    if (err instanceof Error) {
      res.json({ error: err.message });
    }
  }
};
