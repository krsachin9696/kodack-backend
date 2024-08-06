import express from 'express';
import { addQuestionToListController } from '../controllers/questionController.js';

const questionsRoute = express.Router();

questionsRoute.post('/add-question', addQuestionToListController);

export default questionsRoute;
