import dayjs from "dayjs";
import { queryHelper } from "../../common/utils/query-helper.js";
import Showtime from "./showtime.model.js";
import { throwError } from "../../common/utils/create-response.js";
import {
  calculatorEndTime,
  checkAvaiableMovie,
  checkAvaiableRoom,
  checkConflictShowime,
} from "./showtime.utils.js";

export const createShowtimeService = async (payload) => {
  const { movieId, roomId, startTime } = payload;
  if (dayjs(startTime).isBefore(dayjs()))
    throwError(400, "Thời gian chiếu phải là ngày trong tương lai!");
  if (dayjs(startTime).isBefore(dayjs().add(30, "minute")))
    throwError(400, "Thời gian chiếu phải ít nhất 30 phút từ bây giờ!");
  const [movie] = await Promise.all([
    checkAvaiableMovie(movieId),
    checkAvaiableRoom(roomId),
  ]);
  const { dayOfWeek, endTime } = calculatorEndTime(movie.duration, startTime);
  const conflict = await checkConflictShowime(roomId, startTime, endTime);
  console.log(conflict);
  if (conflict) {
    throwError(
      400,
      `Phòng chiếu ${conflict.roomId.name} đã có xuất chiếu vào lúc ${dayjs(conflict.startTime).format("HH:mm, [Ngày] DD [Tháng] MM [Năm] YYYY")}`,
    );
  }
  const showtime = await Showtime.create({ ...payload, dayOfWeek, endTime });
  return showtime;
};

export const getAllShowtimeService = async (query) => {
  const showtimes = await queryHelper(Showtime, query, {
    populate: [{ path: "movieId" }, { path: "roomId" }],
  });
  return showtimes;
};
