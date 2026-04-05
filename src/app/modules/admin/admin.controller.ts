import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { AdminService } from "./admin.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const getAllUsers = catchAsync(
    async (req: Request, res: Response) => {
        const result = await AdminService.getAllUsers()

        return sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "All Users fetched successfully",
            data: result
        })
    }
)

const getAllEvents = catchAsync(
    async (req: Request, res: Response) => {
        const result = await AdminService.getAllEvents()

        return sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "All Events fetched successfully",
            data: result
        })
    }
)

const deleteEventByAdmin = catchAsync(
    async (req: Request, res: Response) => {
        const  eventId  = req.params.id

        const result = await AdminService.deleteEventByAdmin(eventId as string)

        return sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Event deleted successfully",
            data: result
        })
    }
)

const deleteUserByAdmin = catchAsync(
    async (req: Request, res: Response) => {
        const userId  = req.params.id

        const result = await AdminService.deleteUserByAdmin(userId as string)

        return sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "User deleted successfully",
            data: result
        })
    }
)


export const AdminController = {
    getAllUsers,
    getAllEvents,
    deleteEventByAdmin,
    deleteUserByAdmin
}