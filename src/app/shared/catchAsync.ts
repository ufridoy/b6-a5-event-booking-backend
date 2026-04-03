import { NextFunction, Request, RequestHandler, Response } from "express"

export const catchAsync = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await fn(req, res, next)
    }
}