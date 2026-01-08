import { TICKET_STATUS } from "../../../common/constants/ticket.js";
import Ticket from "../../ticket/ticket.model.js";
import { normalizeQueryTime, resolveCompareRanges } from "../stats.utils.js";

export const getOverviewStatsRevenueService = async (query) => {
  const { current } = resolveCompareRanges(query?.createdAt || null);

  const [res] = await Ticket.aggregate([
    { $match: current },
    {
      $match: {
        status: { $in: [TICKET_STATUS.PENDING, TICKET_STATUS.CONFIRMED] },
      },
    },
    {
      $facet: {
        summary: [
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: "$totalPrice" },
            },
          },
        ],
        avgPerDay: [
          {
            $group: {
              _id: {
                day: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt",
                  },
                },
              },
              revenuePerDay: { $sum: "$totalPrice" },
            },
          },
          {
            $group: {
              _id: null,
              avgRevenuePerDay: { $avg: "$revenuePerDay" },
            },
          },
        ],

        peakHour: [
          {
            $project: {
              hour: {
                $dateToString: {
                  format: "$H:00",
                  date: "$startTime",
                },
              },
              totalPrice: 1,
            },
          },
          {
            $group: {
              _id: "$hour",
              totalRevenue: { $sum: "$totalPrice" },
            },
          },
          { $sort: { totalRevenue: -1 } },
          { $limit: 1 },
        ],
        topRoom: [
          {
            $group: {
              _id: "$roomName",
              totalRevenue: { $sum: "$totalPrice" },
            },
          },
          { $sort: { totalRevenue: -1 } },
          { $limit: 1 },
        ],
      },
    },
  ]);
  return {
    totalRevenue: res?.summary?.[0]?.totalRevenue || 0,
    avgRevenuePerDay: Math.round(res?.avgPerDay?.[0]?.avgRevenuePerDay || 0),

    peakHour: res?.peakHour[0]
      ? {
          hour: res.peakHour[0]._id,
          totalRevenue: res.peakHour[0].totalRevenue,
        }
      : null,

    topRoom: res?.topRoom[0]?._id || null,

    queryTime: normalizeQueryTime(current),
  };
};
