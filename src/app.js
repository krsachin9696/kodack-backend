import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import connectPgSimple from 'connect-pg-simple';
import './config/passport.js';
import { authRoute, listRoute, questionsRoute } from './routes/index.js';
import isAuthenticated from './middlewares/authMiddleware.js';

const PgSession = connectPgSimple(session);

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
    store: new PgSession({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: false, // making this true ensures setting cookies in HTTPS only.
    },
  }),
);

// Initialize passport and session handling
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoute);
app.use('/list', listRoute);
app.use('/question', questionsRoute);

app.get('/protected', isAuthenticated, (req, res) => {
  res.json({ message: 'This is a protected route.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
