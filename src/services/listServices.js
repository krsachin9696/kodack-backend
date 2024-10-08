import * as listRepository from '../repositories/list/index.js';

export const createList = async (data) => {
  return await listRepository.createList(data);
};

export const getAllLists = async () => {
  return await listRepository.getAllLists();
};

export const updateList = async (id, data) => {
  return await listRepository.updateList(id, data);
};

export const softDeleteList = async (id) => {
  return await listRepository.softDeleteList(id);
};

export const getListsByUserId = async (userId) => {
  return await listRepository.getListsByUserId(userId);
};

export const getListDetails = async (listID, userID, { page, limit }) => {
  return await listRepository.getListDetailsRepository(listID, userID, {
    page,
    limit,
  });
};
