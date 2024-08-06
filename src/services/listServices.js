import prisma from '../config/prismaClient.js';
import { findListWithDetails } from '../repositories/list/index.js';

export const createList = async (data) => {
  return await prisma.list.create({
    data,
  });
};

export const getAllLists = async () => {
  return await prisma.list.findMany({
    where: { isDeleted: false },
  });
};

export const getListById = async (id) => {
  return await prisma.list.findUnique({
    where: { listID: id },
    where: { isDeleted: false },
  });
};

export const updateList = async (id, data) => {
  return await prisma.list.update({
    where: { listID: id },
    data,
  });
};

export const softDeleteList = async (id) => {
  return await prisma.list.update({
    where: { listID: id },
    data: { isDeleted: true },
  });
};

export const getListsByUserId = async (userId) => {
  return await prisma.list.findMany({
    where: { userID: userId, isDeleted: false },
  });
};


export const getListDetails = async (listID) => {
    return findListWithDetails(listID);
  };