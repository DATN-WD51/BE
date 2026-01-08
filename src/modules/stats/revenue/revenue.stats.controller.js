import handleAsync from "../../../common/utils/async-handler.js";
import createResponse from "../../../common/utils/create-response.js";
import { applyFilter } from "../../../common/utils/query-helper.js";
import { getOverviewStatsRevenueService } from "./revenue.stats.service.js";

export const getOverviewStatsRevenue = handleAsync(async (req, res) => {
  const [match] = {};
  Object.entries(req.query).forEach(([key, value]) =>
    applyFilter(key, value, match),
  );

  const data = await getOverviewStatsRevenueService(match);

  return createResponse(res, 200, "OK", data);
});
