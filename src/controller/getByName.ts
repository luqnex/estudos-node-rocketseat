import { Request, Response } from "express";
import { client } from "../database";

const dbName = "crud_rocketseat";

export const getByName = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const db = client.db(dbName);

    const col = db.collection("product");

    const myDoc = await col.findOne({ name: name });

    res.json(myDoc);
  } catch (err: any) {
    console.log(err.stack);
  }
};
