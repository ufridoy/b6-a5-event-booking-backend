import { prisma } from "../../lib/prisma"

const getAllUsers = async () => {
    const result = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            image: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return result
}

const getAllEvents = async () => {
    const result = await prisma.event.findMany({
        include: {
            creator: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return result
}

const deleteEventByAdmin = async (eventId: string) => {
  return await prisma.event.delete({
    where: {
      id: eventId,
    },
  });
};

const deleteUserByAdmin = async (userId: string) => {
    const result = await prisma.user.delete({
    where: {
      id: userId,
      isDeleted: false,
    },
    });

    if (!result) {
        throw new Error("User not found or already deleted");
    }

    return result
}

export const AdminService = {
    getAllUsers,
    getAllEvents,
    deleteEventByAdmin,
    deleteUserByAdmin
}
