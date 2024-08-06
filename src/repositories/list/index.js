import prisma from "../../config/prismaClient.js";

const findListWithDetails = async (listID) => {
    return prisma.list.findUnique({
      where: { listID },
      include: {
        user: true, 
        createdBy: true,
        updatedBy: true,
        questions: {
          where: {
            isDeleted: false, 
          },
          include: {
            question: true,
          },
        },
      },
    });
  };


export { findListWithDetails };