import { Router } from 'express';
import { signup, login, logout } from '../controllers/auth/index.js';

const authRoute = Router();

authRoute.post('/signup', signup);
authRoute.post('/login', login);
authRoute.post('/logout', logout);

export default authRoute;
