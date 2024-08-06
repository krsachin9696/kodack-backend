import express from 'express';
import { addQuestion } from '../controllers/questions/index.js';

const questionsRoute = express.Router();

questionsRoute.post('/add-question', addQuestion);

export default questionsRoute;
