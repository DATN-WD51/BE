import { Router } from "express";
import overviewStatsRoute from "./overview/overview.route.js";
import ticketStatsRoute from "./ticket/ticket.stats.routes.js";
import revenueStatsRoute from "./revenue/revenue.stats.routes.js";

const statsRoute = Router();

statsRoute.use("/overview", overviewStatsRoute);
statsRoute.use("/ticket", ticketStatsRoute);
statsRoute.use("revenue", revenueStatsRoute);

export default statsRoute;
