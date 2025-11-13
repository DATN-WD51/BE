import { Router } from "express";
import {
  createCategory,
  getAllCategory,
  getDetailCategory,
} from "./category.controller.js";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategory);
categoryRouter.get("/detail/:id", getDetailCategory);
categoryRouter.post("/", createCategory);

export default categoryRouter;
