import { Request, Response } from "express";
import { client } from "../database";

const dbName = "crud_rocketseat";

export const getAllWithPagination = async (req: Request, res: Response) => {
  const page = Number(req.query.page) ?? 1;
  const limit = Number(req.query.limit) ?? 10;

  const salt = (page - 1) * limit;

  try {
    const db = client.db(dbName);

    const col = db.collection("product");

    const size = await col.find({}).toArray();
    const myDoc = await col.find({}).skip(salt).limit(limit).toArray();

    res.status(200).json({ data: myDoc, size: size.length });
  } catch (err) {
    if (err instanceof Error) {
      res.json({ error: err.message });
    }
  }
};
