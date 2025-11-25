import dayjs from "dayjs";
import { throwError } from "../../common/utils/create-response.js";
import Movie from "../movie/movie.model.js";
import Room from "../room/room.model.js";
import Showtime from "./showtime.model.js";

export const checkAvaiableMovie = async (movieId) => {
  const movie = await Movie.findById(movieId);
  if (!movie) throwError(400, "Phim không tồn tại!");
  if (!movie.status) throwError(400, "Phim hiện không khả dụng!");
  return movie;
};

export const checkAvaiableRoom = async (roomId) => {
  const room = await Room.findById(roomId);
  if (!room) throwError(400, "Không tìm thấy phòng chiếu!");
  if (!room.status) throwError(400, "Phòng chiếu hiện không khả dụng!");
  return room;
};

export const calculatorEndTime = (durationMinute, startTime) => {
  const start = dayjs(startTime);
  const endTime = start.add(durationMinute, "minute").toDate();
  const dayOfWeek = start.day();
  return { endTime, dayOfWeek };
};

export const checkConflictShowime = async (
  roomId,
  startTime,
  endTime,
  exId = null,
) => {
  const condition = {
    roomId,
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
  };
  if (exId) {
    condition._id = { $ne: exId };
  }
  const conflict = await Showtime.findOne(condition).populate("roomId");
  return conflict;
};
