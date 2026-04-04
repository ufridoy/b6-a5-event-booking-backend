import slugify from "slugify";
import { prisma } from "../../lib/prisma";
import status from "http-status";

interface ICreateEventPayload {
  title: string;
  description: string;
  dateTime: string;
  venue?: string;
  eventLink?: string;
  coverImage?: string;
  visibility: "PUBLIC" | "PRIVATE";
  registrationFee?: string;
  maxParticipants?: number;
}

const createEvent = async (userId: string, payload: ICreateEventPayload) => {
  const slug = `${slugify(payload.title, { lower: true, strict: true })}-${Date.now()}`;

  const result = await prisma.event.create({
    data: {
      title: payload.title,
      slug,
      description: payload.description,
      dateTime: new Date(payload.dateTime),
      venue: payload.venue,
      eventLink: payload.eventLink,
      coverImage: payload.coverImage,
      visibility: payload.visibility,
      registrationFee: payload.registrationFee ? payload.registrationFee : "0.00",
      maxParticipants: payload.maxParticipants,
      creatorId: userId,
    },
  });

  return result;
};

const getMyEvents = async (userId: string) => {
    const events = await prisma.event.findMany({
        where: {
            creatorId: userId,
            isDeleted: false
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return events;
}

const getAllEvents = async () => {
    const events = await prisma.event.findMany({
        where: {
            visibility: "PUBLIC",
            isDeleted: false
        },
        orderBy: {
            createdAt: "desc"
        }
        
    })
    return events;
}

const getSingleEvent = async (eventId: string) => {
    const event = await prisma.event.findFirst({
        where: {
            id: eventId,
            isDeleted: false
        },
    })

    return event;
}

const updateSingleEvent = async (
  eventId: string,
  userId: string,
  payload: Record<string, unknown>
) => {
  const event = await prisma.event.findFirst({
    where: {
      id: eventId,
      isDeleted: false,
    },
  });

  if (!event) {
    return {
      success: false,
      statusCode: status.NOT_FOUND,
      message: "Event not found",
      data: null,
    };
  }

  if (event.creatorId !== userId) {
    return {
      success: false,
      statusCode: status.FORBIDDEN,
      message: "You are not allowed to update this event",
      data: null,
    };
  }

  const result = await prisma.event.update({
    where: {
      id: eventId,
    },
    data: payload,
  });

  return {
    success: true,
    statusCode: 200,
    message: "Event updated successfully",
    data: result,
  };
};



const deleteEvent = async (eventId: string, userId: string) => {
  const event = await prisma.event.findFirst({
    where: {
      id: eventId,
      isDeleted: false,
    },
  });

  if (!event) {
    return {
      success: false,
      statusCode: status.NOT_FOUND,
      message: "Event not found",
    };
  }

  if (event.creatorId !== userId) {
    return {
      success: false,
      statusCode: status.FORBIDDEN,
      message: "You are not allowed",
    };
  }

  await prisma.event.update({
    where: { id: eventId },
    data: {
      isDeleted: true,
      deletedById: userId,
    },
  });

  return {
    success: true,
    statusCode: status.OK,
    message: "Event deleted successfully",
  };
};

export const EventService = {
  createEvent,
  getMyEvents,
  getAllEvents,
  getSingleEvent,
  updateSingleEvent,
  deleteEvent
};