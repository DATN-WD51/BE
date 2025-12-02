import { Router } from "express";
import {
  createManyShowtime,
  createShowtime,
  getAllShowtime,
  getDetailShowtime,
  getMovieHasShowtime,
  updateShowtime,
} from "./showtime.controller.js";

const showtimeRoute = Router();
showtimeRoute.post("/", createShowtime);
showtimeRoute.get("/", getAllShowtime);
showtimeRoute.get("/detail/:id", getDetailShowtime);
showtimeRoute.get("/movie", getMovieHasShowtime);
showtimeRoute.patch("/update/:id", updateShowtime);
showtimeRoute.post("/many", createManyShowtime);

export default showtimeRoute;
