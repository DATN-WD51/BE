import dayjs from "dayjs";
import cron from "node-cron";
import Movie from "../movie/movie.model.js";

export const functionUpdateMovie = async () => {
  try {
    const today = dayjs().startOf("day").toDate();
    await Movie.updateMany({}, [
      {
        $set: {
          statusRelease: {
            $switch: {
              branches: [
                { case: { $lt: [today, "$releaseDate"] }, then: "upcoming" },
                { case: { $gt: [today, "$endDate"] }, then: "released" },
              ],
              default: "nowShowing",
            },
          },
        },
      },
    ]);
    console.log("Cập nhật statusRelease thành công!");
  } catch (err) {
    console.err("Lỗi khi cập nhật statusRelease:", err);
  }
};

let isCronStarted = false;

export const movieStatusJob = async () => {
  if (isCronStarted) return;
  isCronStarted = true;
  functionUpdateMovie();
  await functionUpdateMovie();

  cron.schedule(
    "0 0 * * *",
    async () => {
      console.log("CRON: Updating movie status");
      await functionUpdateMovie();
    },
    {
      timezone: "Asia/Ho_Chi_Minh",
    },
  );
};
