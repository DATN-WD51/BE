import { Router } from "express";
import {
  createShowtime,
  getAllShowtime,
  getDetailShowtime,
  getMovieHasShowtime,
} from "./showtime.controller.js";

const showtimeRoute = Router();
showtimeRoute.post("/", createShowtime);
showtimeRoute.get("/", getAllShowtime);
showtimeRoute.get("/detail/:id", getDetailShowtime);
showtimeRoute.get("/movie", getMovieHasShowtime);

export default showtimeRoute;
