import handleAsync from "../../common/utils/async-handler.js";
import createResponse from "../../common/utils/create-response.js";
import { getAllCategoryService } from "./category.service.js";

export const getAllCategory = handleAsync(async (req, res) => {
  const { query } = req;
  const data = await getAllCategoryService(query);
  return createResponse(res, 200, "OK", data.data, data.meta);
});
