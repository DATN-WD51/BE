import { Router } from "express";
import authRoute from "./modules/auth/auth.routes.js";
import movieRoute from "./modules/movie/movie.routes.js";

const routes = Router();

routes.use("/auth", authRoute);
routes.use("/movie", movieRoute);

export default routes;
