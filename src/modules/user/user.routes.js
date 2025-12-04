import { Router } from "express";
import {
  changePassWord,
  getProfile,
  updateProfile,
} from "./user.controller.js";

const userRoute = Router();

userRoute.get("/private", getProfile);
userRoute.patch("/update", updateProfile);
userRoute.patch("/change-password", changePassWord);

export default userRoute;
