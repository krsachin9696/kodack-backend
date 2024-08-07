import express from 'express';
import * as tagController from '../controllers/tags/index.js';

const tagRoutes = express.Router();

tagRoutes.get('/suggestions', tagController.getTagSuggestions);
tagRoutes.post('/add-to-list', tagController.addTagsToList);

export default tagRoutes;
