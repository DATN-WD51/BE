import { Router } from "express";
import overviewStatsRoute from "./overview/overview.route.js";

const statsRoute = Router();

statsRoute.use("/overview", overviewStatsRoute);

export default statsRoute;
