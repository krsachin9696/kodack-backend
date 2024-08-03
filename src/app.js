import express from 'express';
import 'dotenv/config';
import session from 'express-session';
import passport from 'passport';
import './config/passport.js';
import { authRoute } from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  }),
);

// Initialize passport and session handling
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port:
     ${PORT}`);
});
