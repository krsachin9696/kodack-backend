import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    // Check if the username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    });

    if (existingUser && (existingUser.username === username || existingUser.email === email)) {
        return res.status(400).json({ error: 'Username or email already taken' });
    }

    // Proceed with user creation if no conflicts
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, username, email, passwordHash: hashedPassword }
    });

    res.status(201).json({ id: user.userID, username: user.username, email: user.email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'User registration failed' });
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
      const token = jwt.sign({ id: user.userID }, jwtSecret, { expiresIn: '1h' });
      
      // Add the token to the user's tokens array
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          tokens: {
            push: token
          }
        }
      });

      res.json({ updatedUser, token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const logout = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'No token provided' });
  }

  try {
    // Find the user with the provided token
    const user = await prisma.user.findFirst({
      where: {
        tokens: {
          has: token
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'Token not found' });
    }

    // Remove the token from the user's tokens array
    await prisma.user.update({
      where: { email: user.email },
      data: {
        tokens: {
          set: user.tokens.filter(t => t !== token)
        }
      }
    });

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Logout failed' });
  }
};
