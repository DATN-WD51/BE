import dayjs from "dayjs";
import { getIO } from "../socket.instance.js";

export const unHoldSeatService = async (userId) => {
  const heldSeats = await SeatStatus.find({
    userId,
    status: SEAT_STATUS.HOLD,
  }).lean();
  if (heldSeats.length === 0) return 0;
  const showtimeIds = [...new Set(heldSeats.map((s) => String(s.showtimeId)))];
  const result = await SeatStatus.deleteMany({
    userId,
    status: SEAT_STATUS.HOLD,
  });
  const io = getIO();

  showtimeIds.forEach((showtimeId) => {
    io.to(showtimeId).emit("seatUpdated", {
      message: "Some held seats have expired",
      deletedCount: result.deletedCount,
      timestamp: dayjs().toISOString(),
    });
  });
  return result.deletedCount;
};
