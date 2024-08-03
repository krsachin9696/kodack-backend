import express from 'express';
import passport from 'passport';
import { register } from '../controllers/authController.js';

const authRoute = express.Router();

authRoute.post('/register', register);
authRoute.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

export default authRoute;
