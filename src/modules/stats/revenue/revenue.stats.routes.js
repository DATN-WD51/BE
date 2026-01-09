import { Router } from "express";
import {
  getOverviewStatsRevenue,
  getRevenueByTicketType,
  getRevenueHourlyTrend,
  getRevenueToday,
} from "./revenue.stats.controller.js";

const revenueStatsRoute = Router();

revenueStatsRoute.get("/", getOverviewStatsRevenue);
revenueStatsRoute.get("/hourly-trend", getRevenueHourlyTrend);
revenueStatsRoute.get("/today", getRevenueToday);
revenueStatsRoute.get("/type-seat", getRevenueByTicketType);

export default revenueStatsRoute;
