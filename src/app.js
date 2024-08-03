import express from 'express';
import 'dotenv/config';
import session from 'express-session';
import passport from 'passport';
import { PrismaClient } from '@prisma/client';
import './config/passport.js';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));

// Initialize passport and session handling
app.use(passport.initialize());
app.use(passport.session());[]


app.listen(PORT, () => {
  console.log(`Server is running on port:
     ${PORT}`);
});
