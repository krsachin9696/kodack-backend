import prisma from "../config/prismaClient.js";

export const createList = async (data) => {
  return await prisma.list.create({
    data,
  });
};

export const getAllLists = async () => {
  return await prisma.list.findMany();
};

export const getListById = async (id) => {
  return await prisma.list.findUnique({
    where: { listID: id },
  });
};

export const updateList = async (id, data) => {
  return await prisma.list.update({
    where: { listID: id },
    data,
  });
};

export const deleteList = async (id) => {
  return await prisma.list.delete({
    where: { listID: id },
  });
};
