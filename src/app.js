import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import './config/passport.js';
import { authRoute, listRoute, questionsRoute } from './routes/index.js';
import isAuthenticated from './middlewares/authMiddleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }),
);

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }, // making this true ensures setting cookies in HTTPS only.
  }),
);

// Initialize passport and session handling
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoute);
app.use('/list', listRoute);
app.use('/question', questionsRoute);

// app.get(
//   '/protected',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     res.json({ message: 'This is a protected route.' });
//   },
// );
app.get(
  '/protected',
  isAuthenticated,
  (req, res) => {
    res.json({ message: 'This is a protected route.' });
  },
);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
