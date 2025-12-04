import handleAsync from "../../common/utils/async-handler.js";
import createResponse from "../../common/utils/create-response.js";
import { changePasswordService, getProfileService } from "./user.service.js";

export const getProfile = handleAsync(async (req, res) => {
  const { _id } = req.user;
  const response = await getProfileService(_id);
  return createResponse(res, 200, "OK", response);
});
export const updateProfile = handleAsync(async (req, res) => {
  const { _id } = req.user;
  const response = await updateProfile(req.body, _id);
  return createResponse(res, 200, "Cập nhật thông tin thành công!", response);
});
export const changePassWord = handleAsync(async (req, res) => {
  const { _id } = req.user;
  const response = await changePasswordService(req.body, _id);
  return createResponse(res, 200, "Đổi mật khẩu thành công!", response);
});
