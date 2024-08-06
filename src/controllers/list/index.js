import * as listService from '../../services/listServices.js';

export const createList = async (req, res) => {
  try {
    const newList = await listService.createList(req.body);
    res.status(201).json(newList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create list' });
  }
};

export const getAllLists = async (req, res) => {
  try {
    const lists = await listService.getAllLists();
    res.status(200).json(lists);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve lists' });
  }
};

export const getListById = async (req, res) => {
  try {
    const list = await listService.getListById(req.params.id);
    if (list) {
      res.status(200).json(list);
    } else {
      res.status(404).json({ error: 'List not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve list' });
  }
};

export const updateList = async (req, res) => {
  try {
    const updatedList = await listService.updateList(req.params.id, req.body);
    res.status(200).json(updatedList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update list' });
  }
};

export const deleteList = async (req, res) => {
  try {
    await listService.deleteList(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to delete list' });
  }
};
