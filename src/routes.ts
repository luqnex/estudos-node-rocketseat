import { Request, Response, Router } from "express";

import { getAll } from "./controller/getAll";
import { create } from "./controller/create";
import { update } from "./controller/update";
import { getByName } from "./controller/getByName";
import { deleteById } from "./controller/deleteById";
import { getAllWithPagination } from "./controller/getAllWithPagination";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server started" });
});

router.get("/getAll", getAll);

router.post("/create", create);

router.put("/updateById", update);

router.get("/getByName", getByName);

router.delete("/deleteById", deleteById);

router.get("/getAllWithPagination", getAllWithPagination);

export { router };
