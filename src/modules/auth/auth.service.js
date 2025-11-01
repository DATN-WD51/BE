import {
  API_URL,
  JWT_ACCESS_EXPIRED,
  JWT_ACCESS_SECRET,
  JWT_VERIFY_EXPIRED,
  JWT_VERIFY_SECRET,
} from "../../common/configs/environment.js";
import {
  throwError,
  throwIfDuplicate,
} from "../../common/utils/create-response.js";
import { MAIL_MESSAGES } from "../mail/mail.messages.js";
import { getVerifyTemplateMail } from "../mail/mail.template.js";
import { sendMail } from "../mail/sendMail.js";
import User from "../user/user.model.js";
import { AUTH_MESSAGES } from "./auth.messages.js";
import { comparePassword, generateToken, hashPassword } from "./auth.utils.js";
import jwt from "jsonwebtoken";

export const registerService = async (payload) => {
  const { email, password } = payload;
  const existingUser = await User.findOne({
    $or: [{ email }],
  });

  if (existingUser) {
    const { email: existingEmail } = existingUser;
    throwIfDuplicate(email, existingEmail, AUTH_MESSAGES.CONFLICT_EMAIL);
  }
  const hashedPassword = await hashPassword(password);
  const user = await User.create({
    ...payload,
    password: hashedPassword,
  });
  const payloadJwt = {
    _id: user._id,
    role: user.role,
  };
  const verifyToken = generateToken(
    payloadJwt,
    JWT_VERIFY_SECRET,
    JWT_VERIFY_EXPIRED,
  );
  user.verifyToken = verifyToken;
  await user.save();
  await sendMail(
    email,
    MAIL_MESSAGES.VERIFY_SEND,
    getVerifyTemplateMail({
      email,
      link: `${API_URL}/auth/verify/${verifyToken}`,
    }),
  );
  await user.save();
  return user;
};

export const loginService = async (payload) => {
  const { email, password } = payload;
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    throwError(400, AUTH_MESSAGES.NOTFOUND_EMAIL);
  }
  console.log(foundUser);
  const checkPassword = await comparePassword(password, foundUser.password);
  if (!checkPassword) {
    throwError(400, AUTH_MESSAGES.WRONG_PASSWORD);
  }
  if (!foundUser.isVerified) {
    throwError(400, AUTH_MESSAGES.NOT_VERIFIED);
  }
  const payloadToken = {
    _id: foundUser._id,
    role: foundUser.role,
  };
  const accessToken = generateToken(
    payloadToken,
    JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRED,
  );

  return { user: foundUser, accessToken };
};

export const verifyUserService = async (token) => {
  try {
    const user = await User.findOne({ verifyToken: token });
    if (!user)
      return {
        success: false,
        data: "invalid",
        message: "Tài khoản không tồn tại hoặc đã xác thực",
      };
    jwt.verify(token, JWT_VERIFY_SECRET);
    user.isVerified = true;
    user.set("verifyToken", undefined);
    await user.save();
    return { success: true, data: "success" };
  } catch (error) {
    const messages = {
      TokenExpiredError: {
        data: "expired",
        message: "Mail xác thực đã hết hạn",
      },
      JsonWebTokenError: {
        data: "invalid",
        message: "Mail xác thực không hợp lệ",
      },
    };
    return {
      success: false,
      ...(messages[error.name] || {
        data: "error",
        message: "Xác thực thất bại",
      }),
    };
  }
};

export const sendVerifyService = async (email) => {
  const findUser = await User.findOne({ email });
  if (!findUser) {
    throwError(400, AUTH_MESSAGES.NOTFOUND_USER);
  }
  if (findUser.isVerified) {
    throwError(400, AUTH_MESSAGES.IS_VERIFIED);
  }
  const payload = {
    _id: findUser._id,
    role: findUser.role,
  };
  const token = generateToken(payload, JWT_VERIFY_SECRET, JWT_VERIFY_EXPIRED);
  findUser.verifyToken = token;
  await findUser.save();
  await sendMail(
    email,
    MAIL_MESSAGES.VERIFY_SEND,
    getVerifyTemplateMail({
      email,
      link: `${API_URL}/auth/verify/${token}`,
    }),
  );
  return findUser;
};
