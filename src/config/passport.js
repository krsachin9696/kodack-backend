import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import prisma from './prismaClient.js';

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
