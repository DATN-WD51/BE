import { Router } from "express";
import { getAllCategory } from "./category.controller.js";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategory);
export default categoryRouter;
