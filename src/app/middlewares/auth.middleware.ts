import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { sendResponse } from "../shared/sendResponse";
import status from "http-status";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        })

        if (!session) {
            return sendResponse(res, {
                httpStatusCode: status.UNAUTHORIZED,
                success: false,
                message: "Unauthorized"
            })
        }

        req.user = session.user;
        req.session = session.session;

        next();
    } catch (error) {

        console.error(error);
        return sendResponse(res, {
            httpStatusCode: status.INTERNAL_SERVER_ERROR,
            success: false,
            message: "Authentication failed",
            data : null
        })
    }
}