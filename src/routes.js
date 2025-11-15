import { Router } from "express";
import authRoute from "./modules/auth/auth.routes.js";
import { authenticate } from "./common/middlewares/auth.middleware.js";
import { JWT_ACCESS_SECRET } from "./common/configs/environment.js";
import userRoute from "./modules/user/user.routes.js";
import movieRoute from "./modules/movie/movie.routes.js";
import roomRoute from "./modules/room/room.router.js";
import Seat from "./modules/seat/seat.model.js";

const routes = Router();

routes.use("/auth", authRoute);
routes.use("/movie", movieRoute);
routes.use("/room", roomRoute);

routes.use("/user", authenticate(JWT_ACCESS_SECRET), userRoute);

export default routes;
