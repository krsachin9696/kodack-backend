import { Router } from 'express';
import { signup, login } from '../controllers/auth/index.js';

const authRoute = Router();

authRoute.post('/signup', signup);
authRoute.post('/login', login);

export default authRoute;
