import { ROOT_MESSAGES } from "../constants/messages";
import { throwError } from "../utils/create-response";

export const validRole = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!userRole) {
      console.log("Not Role");
      throwError(401, ROOT_MESSAGES.UNAUTHORIZED);
    }
    if (!roles.includes(userRole)) {
      console.log("Not accept");
      throwError(403, ROOT_MESSAGES.FORBIDDEN);
    }
    next();
  };
};
