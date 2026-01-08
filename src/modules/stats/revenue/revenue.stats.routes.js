import { Router } from "express";
import { getOverviewStatsRevenue } from "./revenue.stats.controller.js";

const revenueStatsRoute = Router();

revenueStatsRoute.get("/", getOverviewStatsRevenue);

export default revenueStatsRoute;
