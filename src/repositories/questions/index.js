import prisma from "../../config/prismaClient.js";

const findQuestionByLink = async (link) => {
  return prisma.question.findUnique({
    where: { link },
  });
};

const createQuestion = async (data) => {
  return prisma.question.create({
    data: {
      title: data.title,
      link: data.link,
      createdBy: { connect: { userID: data.createdById } },
      updatedBy: { connect: { userID: data.updatedById } },
    },
  });
};

const addQuestionToList = async (listID, questionID) => {
  return prisma.listQuestion.create({
    data: { listID, questionID },
  });
};

export {
  findQuestionByLink,
  createQuestion,
  addQuestionToList,
};
