import { queryHelper } from "../../common/utils/query-helper.js";
import Movie from "../movie/movie.model.js";
import Category from "./category.model.js";

export const getAllCategoryService = async (query) => {
  const { movieCount = "true", ...queryOther } = query;
  const categories = await queryHelper(Category, queryOther);
  if (movieCount === "true") {
    const categoriesWithCount = await Promise.all(
      categories?.data.map(async (category) => {
        const movieCount = await Movie.countDocuments({
          category: category.id,
        });
        return {
          ...category.toObject(),
          movieCount,
        };
      }),
    );
    return { ...categories, data: categoriesWithCount };
  }
  return categories;
};

export const getDetailCategoryService = async (id) => {
  const category = await Category.findById(id);
  return category;
};
