import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { EventService } from "./event.service";


const createEvent = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  if (!req.user?.id) {
    return sendResponse(res, {
      httpStatusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized",
      data: null,
    });
  }

  const result = await EventService.createEvent(req.user.id, payload);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Event created successfully",
    data: result,
  });
});

const getMyEvents = catchAsync(
    async (req: Request, res: Response) => {
        if (!req.user?.id) {
            return sendResponse(res, {
                httpStatusCode: status.UNAUTHORIZED,
                success: false,
                message: "Unauthorized",
                data: null,
            })
        }

        const result = await EventService.getMyEvents(req.user.id)

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Events fetched successfully",
            data: result
        })
    }
)

const getAllEvents = catchAsync(
    async (req: Request, res: Response) => {
        if (req.user) {
            return sendResponse(res, {
                httpStatusCode: status.OK,
                success: true,
                message: "Events fetched successfully",
                data: null
            })
        }

        const result = await EventService.getAllEvents()

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Events fetched successfully",
            data: result
        })
    }
)

const getSingleEvent = catchAsync(
    async (req: Request, res: Response) => {
        const eventId = req.params.id;

        const result = await EventService.getSingleEvent(eventId as string)

        if (!result) {
            return sendResponse(res, {
                httpStatusCode: status.NOT_FOUND,
                success: false,
                message: "Event not found",
                data: null,
            });
        }

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Event fetched successfully",
            data: result
        })
    }
)

const updateSingleEvent = catchAsync(async (req: Request, res: Response) => {
  const eventId = req.params.id;
  const userId = req.user?.id;

  if (!userId) {
    return sendResponse(res, {
      httpStatusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized",
      data: null,
    });
  }

  const payload = req.body;

  const result = await EventService.updateSingleEvent(eventId as string, userId, payload);

  return sendResponse(res, {
    httpStatusCode: result.statusCode,
    success: result.success,
    message: result.message,
    data: result.data,
  });
});



const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  const eventId = req.params.id;
  const userId = req.user?.id;

  if (!userId) {
    return sendResponse(res, {
      httpStatusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized",
    });
  }

  const result = await EventService.deleteEvent(eventId as string, userId);

  return sendResponse(res, {
    httpStatusCode: result.statusCode,
    success: result.success,
    message: result.message,
  });
});



export const EventController = {
    createEvent,
    getMyEvents,
    getAllEvents,
    getSingleEvent,
    updateSingleEvent,
    deleteEvent
};