import { Router } from "express";
import overviewStatsRoute from "./overview/overview.route.js";

const statsRoute = Router();

statsRoute.get("/overview", overviewStatsRoute);

export default statsRoute;
