import { Request, Response } from "express";

import { client } from "../database";

const dbName = "crud_rocketseat";

export const getAll = async (req: Request, res: Response) => {
  try {
    const db = client.db(dbName);

    const col = db.collection("product");

    const myDoc = await col.find({}).toArray();

    res.json(myDoc);
  } catch (err: any) {
    console.log(err.stack);
  }
};
