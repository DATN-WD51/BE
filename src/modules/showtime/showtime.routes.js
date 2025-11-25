import { Router } from "express";
import { createShowtime } from "./showtime.controller.js";

const showtimeRoute = Router();
showtimeRoute.post("/", createShowtime);

export default showtimeRoute;
