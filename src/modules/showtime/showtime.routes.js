import { Router } from "express";
import { createShowtime, getAllShowtime } from "./showtime.controller.js";

const showtimeRoute = Router();
showtimeRoute.post("/", createShowtime);
showtimeRoute.get("/", getAllShowtime);

export default showtimeRoute;
