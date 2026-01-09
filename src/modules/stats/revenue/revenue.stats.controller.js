import handleAsync from "../../../common/utils/async-handler.js";
import createResponse from "../../../common/utils/create-response.js";
import { applyFilter } from "../../../common/utils/query-helper.js";
import {
  getOverviewStatsRevenueService,
  getRevenueHourlyTrendService,
  getRevenueTodayService,
} from "./revenue.stats.service.js";

export const getOverviewStatsRevenue = handleAsync(async (req, res) => {
  const [match] = {};
  Object.entries(req.query).forEach(([key, value]) =>
    applyFilter(key, value, match),
  );

  const data = await getOverviewStatsRevenueService(match);

  return createResponse(res, 200, "OK", data);
});

export const getRevenueHourlyTrend = handleAsync(async (req, res) => {
  const match = {};

  Object.entries(req.query).forEach(([key, value]) =>
    applyFilter(key, value, match),
  );

  const data = await getRevenueHourlyTrendService(match);
  return createResponse(res, 200, "OK", data);
});

export const getRevenueToday = handleAsync(async (_, res) => {
  const data = await getRevenueTodayService();
  return createResponse(res, 200, "OK", data);
});
