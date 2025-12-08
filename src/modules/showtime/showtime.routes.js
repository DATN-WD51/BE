import { Router } from "express";
import {
  createManyShowtime,
  createShowtime,
  getAllMovieShowtimes,
  getAllShowtime,
  getDetailShowtime,
  getMovieHasShowtime,
  getShowtimesByWeekday,
  updateShowtime,
} from "./showtime.controller.js";

const showtimeRoute = Router();
showtimeRoute.post("/", createShowtime);
showtimeRoute.get("/", getAllShowtime);
showtimeRoute.get("/movie-showtime", getAllMovieShowtimes);

showtimeRoute.get("/detail/:id", getDetailShowtime);
showtimeRoute.get("/weekday", getShowtimesByWeekday);
showtimeRoute.get("/movie", getMovieHasShowtime);
showtimeRoute.patch("/update/:id", updateShowtime);
showtimeRoute.post("/many", createManyShowtime);

export default showtimeRoute;
