import { Request, Response } from "express";

import { client } from "../database";

const dbName = "crud_rocketseat";

export const deleteAll = async (req: Request, res: Response) => {
  try {
    const db = client.db(dbName);

    const col = db.collection("product");

    await col.deleteMany({});

    res.json("All products deleted from DB");
  } catch (err) {
    if (err instanceof Error) {
      res.json({ error: err.message });
    }
  }
};
