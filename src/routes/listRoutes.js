import express from 'express';
import * as listController from '../controllers/list/index.js';

const listRoute = express.Router();

listRoute.post('/', listController.createList);
listRoute.get('/', listController.getAllLists);
listRoute.put('/:id', listController.updateList);
listRoute.get('/user/:userID', listController.getListsByUserId);
listRoute.delete('/:id', listController.deleteList);
listRoute.get('/:listID', listController.getListDetails);

export default listRoute;
