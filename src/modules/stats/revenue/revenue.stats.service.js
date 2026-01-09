import dayjs from "dayjs";
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

export const getRevenueHourlyTrendService = async (query) => {
  const { current } = resolveCompareRanges(query?.createdAt || null);

  const data = await Ticket.aggregate([
    { $match: current },
    {
      $match: {
        status: { $in: [TICKET_STATUS.PENDING, TICKET_STATUS.CONFIRMED] },
      },
    },
    {
      $project: {
        hour: {
          $dateToString: { format: "%H:00", date: "$createdAt" },
        },
        totalPrice: 1,
      },
    },
    {
      $group: {
        _id: "$hour",
        revenue: { $sum: "$totalPrice" },
      },
    },
    {
      $project: {
        _id: 0,
        hour: "$_id",
        revenue: 1,
      },
    },
    { $sort: { hour: 1 } },
  ]);

  const peak =
    data.length > 0
      ? data.reduce((max, cur) => (cur.revenue > max.revenue ? cur : max))
      : null;

  return {
    data,
    peakHour: peak,
    queryTime: normalizeQueryTime(current),
  };
};

export const getRevenueTodayService = async () => {
  const from = dayjs().startOf("day").toDate();
  const to = dayjs().endOf("day").add(1, "ms").toDate();

  const rawData = await Ticket.aggregate([
    {
      $match: {
        createdAt: { $gte: from, $lte: to },
        status: { $in: [TICKET_STATUS.PENDING, TICKET_STATUS.CONFIRMED] },
      },
    },
    {
      $project: {
        hour: {
          $dateToString: { format: "%H:00", date: "$createdAt" },
        },
        totalPrice: 1,
      },
    },
    {
      $group: {
        _id: "$hour",
        revenue: { $sum: "$totalPrice" },
      },
    },
  ]);

  const hours = Array.from({ length: 24 }, (_, i) =>
    dayjs().hour(i).format("HH:00"),
  );

  const data = hours.map((hour) => {
    const found = rawData.find((i) => i._id === hour);
    return {
      hour,
      revenue: found ? found.revenue : 0,
    };
  });

  const peakHour =
    data.length > 0
      ? data.reduce((max, cur) => (cur.revenue > max.revenue ? cur : max))
      : null;

  return {
    data,
    peakHour,
    queryTime: { from, to },
  };
};

export const getRevenueByTicketTypeService = async (query) => {
  const { current } = resolveCompareRanges(query?.createdAt || null);

  const data = await Ticket.aggregate([
    { $match: current },
    {
      $match: {
        status: { $in: [TICKET_STATUS.PENDING, TICKET_STATUS.CONFIRMED] },
      },
    },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.type",
        revenue: { $sum: "$items.price" },
      },
    },
    {
      $project: {
        _id: 0,
        type: "$_id",
        revenue: 1,
      },
    },
  ]);

  const totalRevenue = data.reduce((s, i) => s + i.revenue, 0);

  return {
    totalRevenue,
    data: data.map((i) => ({
      ...i,
      percentage: Number(((i.revenue / totalRevenue) * 100).toFixed(1)),
    })),
    queryTime: normalizeQueryTime(current),
  };
};
