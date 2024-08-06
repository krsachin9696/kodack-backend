import express from 'express';
import 'dotenv/config';
import session from 'express-session';
import passport from 'passport';
import './config/passport.js';
import { authRoute, listRoute, questionsRoute } from './routes/index.js';

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
app.use('/list', listRoute);
app.use('/question', questionsRoute);

app.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ message: 'This is a protected route.' });
  },
);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
