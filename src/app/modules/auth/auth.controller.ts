import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const applyAuthCookies = (res: Response, headers: Headers) => {
    const setCookies = typeof headers.getSetCookie === "function"
    ? headers.getSetCookie() : [];

    if (setCookies.length > 0) {
        res.setHeader("Set-Cookie", setCookies)
    }
}

const registerUser = catchAsync(
    async (req: Request, res: Response) => {
    const payload = req.body;

    const {headers, response} = await AuthService.registerUser(payload)

    applyAuthCookies(res, headers)

    console.log(response)

    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message : "User registered successfully",
        data: response
    })
  }
)


const loginUser = catchAsync(
    async (req: Request, res: Response) => {
    const payload = req.body;

    const {headers, response} = await AuthService.loginUser(payload)

    applyAuthCookies(res, headers)

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "User logged in successfully",
        data: response
    })
  }
)


export const AuthController = {
    registerUser,
    loginUser
}