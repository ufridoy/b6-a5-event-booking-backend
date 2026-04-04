import { Request, Response } from "express";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const getMe = (req: Request, res: Response) => {
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User fetched successfully",
    data: {
      user: req.user,
      session: req.session,
    },
  });
};

export const UserController = {
  getMe,
};