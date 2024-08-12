import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import passport from 'passport';
import 'dotenv/config';
import prisma from '../../config/prismaClient.js';
import sendEmail from '../../utils/sendEmail.js';

const jwtSecret = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  const { name, username, email } = req.body;
  try {
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already taken' });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.user.create({
      data: {
        name,
        username,
        email,
        otp,
        otpExpiresAt,
      },
    });

    await sendEmail(
      email,
      'Your OTP Code',
      `Your OTP code is ${otp}. It is valid for 15 minutes.`,
    );

    res.status(201).json({ message: 'Signup successful. Please verify your email with the OTP sent to you.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'User registration failed' });
  }
};


export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if OTP is correct and not expired
    if (user.otp === otp && user.otpExpiresAt > new Date()) {
      // Mark OTP as verified
      await prisma.user.update({
        where: { email },
        data: {
          otpVerified: true,
          otp: null,
          otpExpiresAt: null,
        },
      });

      res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ error: 'Invalid or expired OTP' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'OTP verification failed' });
  }
};

export const setupPassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  try {
    if (password != confirmPassword) {
      return res
        .status(404)
        .json({ error: 'password & confirm password does not match.' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.otpVerified) {
      return res.status(400).json({ error: 'Email not verified' });
    }

    // Update the user's password
    await prisma.user.update({
      where: { email },
      data: {
        passwordHash: await bcrypt.hash(password, 10),
      },
    });

    res.status(200).json({ message: 'Password has been set successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Password setup failed' });
  }
};


export const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred during login.' });
    }
    if (!user) {
      return res.status(401).json({ error: info.message || 'Login failed.' });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Login failed.' });
      }
      return res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res, next);
};


// export const logout = (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return res.status(500).json({ error: 'Logout failed' });
//     }
//     // res.clearCookie('connect.sid');
//     res.clearCookie('connect.sid', { path: '/' });
//     res.status(200).json({ message: 'Logout successful' });
//   });
// };



export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed.' });
    }
    // Explicitly clear the session cookie
    res.clearCookie('connect.sid', { path: '/' });
    // Optionally: Destroy the session explicitly
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed.' });
      }
      res.status(200).json({ message: 'Logout successful' });
    });
  });
};
