import { Request, Response } from "express";
import mongodb, { ObjectId } from "mongodb";

import { client } from "../database";

const dbName = "crud_rocketseat";

export const deleteById = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const db = client.db(dbName);

    const col = db.collection("product");

    await col.deleteOne({ _id: new ObjectId(id) });

    res.json("Product deleted from DB");
  } catch (err: any) {
    console.log(err.stack);
  }
};
