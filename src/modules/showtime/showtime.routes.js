import { Router } from "express";
import {
  createShowtime,
  getAllShowtime,
  getDetailShowtime,
} from "./showtime.controller.js";

const showtimeRoute = Router();
showtimeRoute.post("/", createShowtime);
showtimeRoute.get("/", getAllShowtime);
showtimeRoute.get("/detail/:id", getDetailShowtime);

export default showtimeRoute;
