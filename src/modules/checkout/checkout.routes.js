import { Router } from "express";
import { JWT_ACCESS_SECRET } from "../../common/configs/environment.js";
import { authenticate } from "../../common/middlewares/auth.middleware.js";
import { checkoutWithVnpay, returnWithVnpay } from "./checkout.controller.js";

const checkoutRoute = Router();

checkoutRoute.post(
  "/create-vnpay",
  authenticate(JWT_ACCESS_SECRET),
  checkoutWithVnpay,
);
checkoutRoute.use("/return-vnpay", returnWithVnpay);

export default checkoutRoute;
