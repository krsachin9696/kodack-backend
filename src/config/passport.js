import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import bcrypt from 'bcryptjs';
import prisma from './prismaClient.js';
import 'dotenv/config';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordCorrect) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

// Google strategy configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { email: profile.emails[0].value },
        });

        if (user) {
          // If user exists, log them in
          return done(null, user);
        } else {
          // If user doesn't exist, create a new user
          const newUser = await prisma.user.create({
            data: {
              name: profile.displayName,
              email: profile.emails[0].value,
              username: profile.emails[0].value.split('@')[0], // Create a username from the email
              googleId: profile.id, // Store Google ID for future reference
            },
          });
          return done(null, newUser);
        }
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);


// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.userID);
});

// Deserialize user from session
passport.deserializeUser(async (userID, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { userID } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
