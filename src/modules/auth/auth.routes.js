import { Router } from "express";
import { login } from "./auth.controller.js";

const authRoute = Router();

authRoute.post("/login", login);

export default authRoute;
