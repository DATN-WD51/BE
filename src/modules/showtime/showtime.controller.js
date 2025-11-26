import dayjs from "dayjs";
import handleAsync from "../../common/utils/async-handler.js";
import createResponse from "../../common/utils/create-response.js";
import {
  createShowtimeService,
  getAllShowtimeService,
  getDetailShowtimeService,
  getMovieHasShowtimeService,
  updateShowtimeService,
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

export const getDetailShowtime = handleAsync(async (req, res) => {
  const { id } = req.params;
  const data = await getDetailShowtimeService(id);
  return createResponse(res, 200, "OK", data);
});

export const getMovieHasShowtime = handleAsync(async (req, res) => {
  const { query } = req;
  const movies = await getMovieHasShowtimeService(query);
  return createResponse(res, 200, "OK", movies.data, movies.meta);
});

export const updateShowtime = handleAsync(async (req, res) => {
  const { body, params } = req;
  const data = await updateShowtimeService(body, params.id);
  return createResponse(res, 200, "Cập nhật xuất chiếu thành công!", data);
});
