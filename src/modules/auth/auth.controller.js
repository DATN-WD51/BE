import { response } from "express";
import handleAsync from "../../common/utils/async-handler.js";
import createResponse from "../../common/utils/create-response.js";
import { AUTH_MESSAGES } from "./auth.messages.js";
import { loginService } from "./auth.service.js";

export const login = handleAsync(async (req, res, next) => {
  const user = await loginService(req.body);
  return createResponse(res, 200, AUTH_MESSAGES.LOGIN_SUCCESS, response);
});
