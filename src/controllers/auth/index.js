import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import sendEmail from '../../utils/sendEmail.js';

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  const { name, username, email } = req.body;
  try {
    // Check if the username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (
      existingUser &&
      (existingUser.username === username || existingUser.email === email)
    ) {
      return res.status(400).json({ error: 'Username or email already taken' });
    }

    // Generate OTP and expiration time
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // OTP valid for 15 minutes

    // Create the user with OTP details
    await prisma.user.create({
      data: {
        name,
        username,
        email,
        otp,
        otpExpiresAt,
      },
    });

    // Send OTP via email
    await sendEmail(
      email,
      'Your OTP Code',
      `Your OTP code is ${otp}. It is valid for 15 minutes.`,
    );

    res.status(201).json({
      message:
        'Signup successful. Please verify your email with the OTP sent to you.',
    });
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

export const login = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (isPasswordCorrect) {
      const token = jwt.sign({ id: user.userID }, jwtSecret, {
        expiresIn: '1h',
      });

      // If tokens field is null, initialize it as an empty array
      const currentTokens = user.tokens || [];

      // Add the new token to the list
      const updatedTokens = [...currentTokens, token];

      // Update the user with the new list of tokens
      await prisma.user.update({
        where: { email },
        data: { tokens: updatedTokens },
      });

      res.json({ user, token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const logout = async (req, res) => {
  const { userID, email, token } = req.body;

  if (!userID || !email || !token) {
    return res
      .status(400)
      .json({ error: 'User ID, email, and token are required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.userID !== userID) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove the token from the list
    const updatedTokens = (user.tokens || []).filter((t) => t !== token);

    // Update the user with the remaining tokens
    await prisma.user.update({
      where: { email },
      data: { tokens: updatedTokens },
    });

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Logout failed' });
  }
};
