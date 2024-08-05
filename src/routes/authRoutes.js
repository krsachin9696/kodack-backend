import { Router } from 'express';
import {
  signup,
  login,
  logout,
  verifyOtp,
  setupPassword,
} from '../controllers/auth/index.js';

const authRoute = Router();

authRoute.post('/signup', signup);
authRoute.post('/login', login);
authRoute.post('/verify-otp', verifyOtp);
authRoute.post('/setup-password', setupPassword);
authRoute.post('/logout', logout);

export default authRoute;
