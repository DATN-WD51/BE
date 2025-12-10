import { Router } from "express";
import {
  changePassword,
  getAllUser,
  getDetailMyTicket,
  getDetailUser,
  getMyTicket,
  getProfile,
  updateProfile,
  updateUser,
} from "./user.controller.js";

const userRoute = Router();

userRoute.get("/private", getProfile);
userRoute.patch("/update", updateProfile);
userRoute.patch("/change-password", changePassword);
userRoute.get("/my-ticket", getMyTicket);
userRoute.get("/my-ticket/detail/:ticketId", getDetailMyTicket);
userRoute.get("/all", getAllUser);
userRoute.get("/detail/:id", getDetailUser);
userRoute.patch("/update-admin/:id", updateUser);

export default userRoute;
