import handleAsync from "../../common/utils/async-handler.js";
import createResponse from "../../common/utils/create-response.js";
import {
  createCategoryService,
  getAllCategoryService,
  getDetailCategoryService,
} from "./category.service.js";

export const getAllCategory = handleAsync(async (req, res) => {
  const { query } = req;
  const data = await getAllCategoryService(query);
  return createResponse(res, 200, "OK", data.data, data.meta);
});

export const getDetailCategory = handleAsync(async (req, res) => {
  const { id } = req.params;
  const data = await getDetailCategoryService(id);
  return createResponse(res, 200, "OK", data);
});

export const createCategory = handleAsync(async (req, res) => {
  const { body } = req;
  const data = await createCategoryService(body);
  return createResponse(res, 201, "Tạo thể loại thành công!", data);
});
