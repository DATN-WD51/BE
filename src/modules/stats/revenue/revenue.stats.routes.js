import { Router } from "express";
import {
  getOverviewStatsRevenue,
  getRevenueHourlyTrend,
  getRevenueToday,
} from "./revenue.stats.controller.js";

const revenueStatsRoute = Router();

revenueStatsRoute.get("/", getOverviewStatsRevenue);
revenueStatsRoute.get("/hourly-trend", getRevenueHourlyTrend);
revenueStatsRoute.get("/today", getRevenueToday);

export default revenueStatsRoute;
