import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const register = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email },
        ],
      },
    });

    if (existingUser) {
      return res.status(400).send('Username or email already in use');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    await prisma.user.create({
      data: { name, username, email, passwordHash: hashedPassword },
    });

    // Redirect to the login page or send a success message
    res.redirect('/login');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error registering user');
  }
};

export default register;
