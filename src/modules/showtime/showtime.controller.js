import dayjs from "dayjs";
import handleAsync from "../../common/utils/async-handler.js";
import createResponse from "../../common/utils/create-response.js";
import {
  createShowtimeService,
  getAllShowtimeService,
} from "./showtime.service.js";

export const createShowtime = handleAsync(async (req, res) => {
  const { body } = req;
  const created = await createShowtimeService(body);
  return createResponse(
    res,
    201,
    `Tạo lịch chiếu ${dayjs(created.startTime).format("HH:mm [Ngày] DD [Tháng] MM [Năm] YYYY")} thành công`,
    created,
  );
});

export const getAllShowtime = handleAsync(async (req, res) => {
  const { query } = req;
  const showtimes = await getAllShowtimeService(query);
  return createResponse(res, 200, "OK", showtimes.data, showtimes.meta);
});
