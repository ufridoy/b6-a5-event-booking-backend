import { NextFunction, Request, Response } from "express"
import { sendResponse } from "../shared/sendResponse"
import status from "http-status"

export const requireRole = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.user?.role

        if (!userRole) {
            return sendResponse(res, {
                httpStatusCode: status.UNAUTHORIZED,
                success: false,
                message: "Unauthorized: You don't have permission to access this resource",
                data: null
            })
        }

        if (!roles.includes(userRole)) {
            return sendResponse(res, {
                httpStatusCode: status.FORBIDDEN,
                success: false,
                message: "Forbidden: You don't have permission to access this resource",
                data: null
            })
        }

        next();
    }
}