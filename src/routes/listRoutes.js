import express from 'express';
import * as listController from '../controllers/list/index.js';

const listRoute = express.Router();

listRoute.post('/', listController.createList);
listRoute.get('/', listController.getAllLists);
listRoute.get('/:id', listController.getListById);
listRoute.get('/user/:userID', listController.getListsByUserId);
listRoute.put('/:id', listController.updateList);
listRoute.delete('/:id', listController.deleteList);
listRoute.get('/list-details/:listID', listController.getListDetails);

export default listRoute;
