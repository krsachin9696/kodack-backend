import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const register = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { name, username, email, passwordHash: hashedPassword },
    });
    res.redirect('/login');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error registering user');
  }
};

export default register;
