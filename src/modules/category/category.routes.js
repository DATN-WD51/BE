import { Router } from "express";
import { getAllCategory, getDetailCategory } from "./category.controller.js";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategory);
categoryRouter.get("/detail/:id", getDetailCategory);

export default categoryRouter;
